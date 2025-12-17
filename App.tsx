import React, { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { Chapter } from './types';
import { CHAPTER_DATA } from './constants';
import { useGameProgress } from './hooks/useGameProgress';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import ChapterScreen from './components/ChapterScreen';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';
import AnimatedBackground from './components/AnimatedBackground';

type Screen = 'onboarding' | 'home' | 'chapter' | 'quiz';

interface LevelInfo {
  level: number;
  xp: number;
  xpToNext: number;
  totalXP?: number;
}

interface Stats {
  totalQuizzesTaken: number;
  totalCorrectAnswers: number;
  totalQuestionsAnswered: number;
  longestStreak: number;
  currentStreak: number;
  lastPlayedAt: string | null;
}

interface QuizSession {
  chapterId: number;
  currentQuestionIndex: number;
  score: number;
  shuffledTermIds: number[];
  answeredQuestions: {
    termId: number;
    isCorrect: boolean;
    selectedAnswer: string;
  }[];
  startedAt: string;
}

interface AppContextType {
  userName: string;
  chapters: Chapter[];
  updateChapterScore: (chapterId: number, score: number, totalQuestions: number) => void;
  goToChapter: (chapterId: number) => void;
  goToHome: () => void;
  startQuiz: () => void;
  levelInfo: LevelInfo;
  stats: Stats;
  saveQuizSession: (session: QuizSession) => void;
  loadQuizSession: () => QuizSession | null;
  clearQuizSession: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const App: React.FC = () => {
  const {
    progress,
    isLoaded,
    hasExistingProgress,
    userName: savedUserName,
    stats,
    initializeUser,
    resumeExistingUser,
    updateChapterProgress,
    getChaptersWithData,
    calculateLevel,
    saveQuizSessionState,
    loadQuizSessionState,
    clearQuizSessionState,
  } = useGameProgress();

  const [userName, setUserName] = useState<string>('');
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [chapters, setChapters] = useState<Chapter[]>(CHAPTER_DATA);
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);

  // Initialize from saved progress
  useEffect(() => {
    if (isLoaded && hasExistingProgress) {
      // Don't auto-resume, let user choose
    }
  }, [isLoaded, hasExistingProgress]);

  const handleLogin = (name: string) => {
    if (name.trim()) {
      initializeUser(name);
      setUserName(name);
      const initialChapters = CHAPTER_DATA.map((c, i) => ({
        ...c,
        score: null,
        status: (i === 0 ? 'unlocked' : 'locked') as Chapter['status'],
        totalQuestions: c.terms.length,
      }));
      setChapters(initialChapters);
      setScreen('home');
    }
  };

  const handleResume = () => {
    if (hasExistingProgress && savedUserName) {
      resumeExistingUser();
      setUserName(savedUserName);
      setChapters(getChaptersWithData());
      setScreen('home');
    }
  };

  const updateChapterScore = useCallback((chapterId: number, score: number, totalQuestions: number) => {
    // Update localStorage
    updateChapterProgress(chapterId, score, totalQuestions);

    // Update local state
    setChapters(prevChapters => {
      const mastery = score / totalQuestions;
      const isCompleted = mastery >= 0.7;

      return prevChapters.map(c => {
        if (c.id === chapterId) {
          const newStatus: Chapter['status'] = isCompleted ? 'completed' : c.status;
          return { ...c, score, status: newStatus };
        }
        if (c.id === chapterId + 1 && isCompleted && c.status === 'locked') {
          return { ...c, status: 'unlocked' };
        }
        return c;
      });
    });
  }, [updateChapterProgress]);

  const goToChapter = (chapterId: number) => {
    setCurrentChapterId(chapterId);
    setScreen('chapter');
  };

  const goToHome = () => {
    // Refresh chapters from saved data
    if (hasExistingProgress) {
      setChapters(getChaptersWithData());
    }
    setCurrentChapterId(null);
    setScreen('home');
  };

  const startQuiz = () => {
    if (currentChapterId) {
      setScreen('quiz');
    }
  };

  const levelInfo = calculateLevel();

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return (
          <Onboarding
            onLogin={handleLogin}
            existingUserName={hasExistingProgress ? savedUserName : undefined}
            onResume={hasExistingProgress ? handleResume : undefined}
          />
        );
      case 'home':
        return <Home />;
      case 'chapter':
        const chapter = chapters.find(c => c.id === currentChapterId);
        return chapter ? <ChapterScreen chapter={chapter} /> : <Home />;
      case 'quiz':
        const quizChapter = chapters.find(c => c.id === currentChapterId);
        return quizChapter ? <Quiz chapter={quizChapter} /> : <Home />;
      default:
        return (
          <Onboarding
            onLogin={handleLogin}
            existingUserName={hasExistingProgress ? savedUserName : undefined}
            onResume={hasExistingProgress ? handleResume : undefined}
          />
        );
    }
  };

  // Show loading state while checking for saved progress
  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-purple-600 font-medium">로딩 중...</p>
        </div>
      </div>
    );
  }

  const contextValue: AppContextType = {
    userName,
    chapters,
    updateChapterScore,
    goToChapter,
    goToHome,
    startQuiz,
    levelInfo,
    stats,
    saveQuizSession: saveQuizSessionState,
    loadQuizSession: loadQuizSessionState,
    clearQuizSession: clearQuizSessionState,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 relative overflow-hidden">
        {/* Animated background */}
        <AnimatedBackground />

        {/* Main content */}
        <div className="relative z-10">
          <div className="container mx-auto p-4 max-w-2xl pt-safe">
            {renderScreen()}
          </div>
        </div>
      </div>
      {screen !== 'onboarding' && <Chatbot />}
    </AppContext.Provider>
  );
};

export default App;
