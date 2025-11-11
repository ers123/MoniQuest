import React, { useState, createContext, useContext, useCallback } from 'react';
import { Chapter } from './types';
import { CHAPTER_DATA } from './constants';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import ChapterScreen from './components/ChapterScreen';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';

type Screen = 'onboarding' | 'home' | 'chapter' | 'quiz';

interface AppContextType {
  userName: string;
  chapters: Chapter[];
  updateChapterScore: (chapterId: number, score: number, totalQuestions: number) => void;
  goToChapter: (chapterId: number) => void;
  goToHome: () => void;
  startQuiz: () => void;
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
  const [userName, setUserName] = useState<string>('');
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [chapters, setChapters] = useState<Chapter[]>(CHAPTER_DATA);
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);

  // Persistence logic has been removed. The app will now reset on every refresh.

  const handleLogin = (name: string) => {
    if (name.trim()) {
      setUserName(name);
      // Initialize chapters for the new session
      const initialChapters = CHAPTER_DATA.map((c, i) => ({ ...c, score: null, status: i === 0 ? 'unlocked' : 'locked' })) as Chapter[];
      setChapters(initialChapters);
      setScreen('home');
    }
  };

  const updateChapterScore = useCallback((chapterId: number, score: number, totalQuestions: number) => {
    setChapters(prevChapters => {
      const mastery = score / totalQuestions;
      const isCompleted = mastery >= 0.7;

      return prevChapters.map(c => {
        // Update the current chapter's status and score
        if (c.id === chapterId) {
          const newStatus: Chapter['status'] = isCompleted ? 'completed' : c.status;
          return { ...c, score, status: newStatus };
        }
        // Unlock the next chapter if the current one is completed
        if (c.id === chapterId + 1 && isCompleted && c.status === 'locked') {
          return { ...c, status: 'unlocked' };
        }
        return c;
      });
    });
  }, []);


  const goToChapter = (chapterId: number) => {
    setCurrentChapterId(chapterId);
    setScreen('chapter');
  };

  const goToHome = () => {
    setCurrentChapterId(null);
    setScreen('home');
  };

  const startQuiz = () => {
    if (currentChapterId) {
      setScreen('quiz');
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <Onboarding onLogin={handleLogin} />;
      case 'home':
        return <Home />;
      case 'chapter':
        const chapter = chapters.find(c => c.id === currentChapterId);
        return chapter ? <ChapterScreen chapter={chapter} /> : <Home />;
      case 'quiz':
        const quizChapter = chapters.find(c => c.id === currentChapterId);
        return quizChapter ? <Quiz chapter={quizChapter} /> : <Home />;
      default:
        return <Onboarding onLogin={handleLogin} />;
    }
  };

  const contextValue: AppContextType = {
    userName,
    chapters,
    updateChapterScore,
    goToChapter,
    goToHome,
    startQuiz,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100">
        <div className="container mx-auto p-4 max-w-2xl">
          {renderScreen()}
        </div>
      </div>
      {screen !== 'onboarding' && <Chatbot />}
    </AppContext.Provider>
  );
};

export default App;