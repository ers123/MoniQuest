import { useState, useEffect, useCallback } from 'react';
import { Chapter } from '../types';
import { CHAPTER_DATA } from '../constants';

const STORAGE_KEY = 'moniquest_progress';
const QUIZ_SESSION_KEY = 'moniquest_quiz_session';
const STORAGE_VERSION = 1;

interface QuizSession {
  chapterId: number;
  currentQuestionIndex: number;
  score: number;
  shuffledTermIds: number[]; // Store term IDs in shuffled order
  answeredQuestions: {
    termId: number;
    isCorrect: boolean;
    selectedAnswer: string;
  }[];
  startedAt: string;
}

interface GameProgress {
  version: number;
  userName: string;
  chapters: {
    id: number;
    status: Chapter['status'];
    score: number | null;
    bestScore: number | null;
    completedAt: string | null;
  }[];
  stats: {
    totalQuizzesTaken: number;
    totalCorrectAnswers: number;
    totalQuestionsAnswered: number;
    longestStreak: number;
    currentStreak: number;
    lastPlayedAt: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

const getInitialChaptersProgress = () =>
  CHAPTER_DATA.map((c, i) => ({
    id: c.id,
    status: (i === 0 ? 'unlocked' : 'locked') as Chapter['status'],
    score: null,
    bestScore: null,
    completedAt: null,
  }));

const getDefaultProgress = (): GameProgress => ({
  version: STORAGE_VERSION,
  userName: '',
  chapters: getInitialChaptersProgress(),
  stats: {
    totalQuizzesTaken: 0,
    totalCorrectAnswers: 0,
    totalQuestionsAnswered: 0,
    longestStreak: 0,
    currentStreak: 0,
    lastPlayedAt: null,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const loadProgress = (): GameProgress | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved) as GameProgress;

    // Version migration if needed
    if (parsed.version !== STORAGE_VERSION) {
      // Handle migration in future versions
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load game progress:', error);
    return null;
  }
};

const saveProgress = (progress: GameProgress): void => {
  try {
    progress.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save game progress:', error);
  }
};

const loadQuizSession = (): QuizSession | null => {
  try {
    const saved = localStorage.getItem(QUIZ_SESSION_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as QuizSession;
  } catch (error) {
    console.error('Failed to load quiz session:', error);
    return null;
  }
};

const saveQuizSession = (session: QuizSession): void => {
  try {
    localStorage.setItem(QUIZ_SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save quiz session:', error);
  }
};

const clearQuizSession = (): void => {
  try {
    localStorage.removeItem(QUIZ_SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear quiz session:', error);
  }
};

export const useGameProgress = () => {
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress on mount
  useEffect(() => {
    const saved = loadProgress();
    setProgress(saved);
    setIsLoaded(true);
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (progress && isLoaded) {
      saveProgress(progress);
    }
  }, [progress, isLoaded]);

  const initializeUser = useCallback((userName: string) => {
    const newProgress = getDefaultProgress();
    newProgress.userName = userName;
    setProgress(newProgress);
    return newProgress;
  }, []);

  const resumeExistingUser = useCallback(() => {
    return progress;
  }, [progress]);

  const updateChapterProgress = useCallback((
    chapterId: number,
    score: number,
    totalQuestions: number
  ) => {
    setProgress(prev => {
      if (!prev) return prev;

      const mastery = score / totalQuestions;
      const isCompleted = mastery >= 0.7;
      const now = new Date().toISOString();

      const newChapters = prev.chapters.map(c => {
        if (c.id === chapterId) {
          return {
            ...c,
            status: isCompleted ? 'completed' as const : c.status,
            score,
            bestScore: c.bestScore === null ? score : Math.max(c.bestScore, score),
            completedAt: isCompleted && !c.completedAt ? now : c.completedAt,
          };
        }
        // Unlock next chapter
        if (c.id === chapterId + 1 && isCompleted && c.status === 'locked') {
          return { ...c, status: 'unlocked' as const };
        }
        return c;
      });

      const newStats = {
        ...prev.stats,
        totalQuizzesTaken: prev.stats.totalQuizzesTaken + 1,
        totalCorrectAnswers: prev.stats.totalCorrectAnswers + score,
        totalQuestionsAnswered: prev.stats.totalQuestionsAnswered + totalQuestions,
        lastPlayedAt: now,
      };

      // Update streak
      if (prev.stats.lastPlayedAt) {
        const lastPlayed = new Date(prev.stats.lastPlayedAt);
        const today = new Date();
        const diffDays = Math.floor((today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
          newStats.currentStreak = prev.stats.currentStreak + 1;
          newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);
        } else {
          newStats.currentStreak = 1;
        }
      } else {
        newStats.currentStreak = 1;
        newStats.longestStreak = 1;
      }

      return {
        ...prev,
        chapters: newChapters,
        stats: newStats,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(null);
  }, []);

  const getChaptersWithData = useCallback((): Chapter[] => {
    if (!progress) {
      return CHAPTER_DATA.map((c, i) => ({
        ...c,
        status: (i === 0 ? 'unlocked' : 'locked') as Chapter['status'],
        score: null,
        totalQuestions: c.terms.length,
      }));
    }

    return CHAPTER_DATA.map(chapter => {
      const savedChapter = progress.chapters.find(c => c.id === chapter.id);
      return {
        ...chapter,
        status: savedChapter?.status || 'locked',
        score: savedChapter?.score ?? null,
        totalQuestions: chapter.terms.length,
      };
    });
  }, [progress]);

  const calculateLevel = useCallback(() => {
    if (!progress) return { level: 1, xp: 0, xpToNext: 100 };

    const totalXP = progress.stats.totalCorrectAnswers * 10 +
                    progress.chapters.filter(c => c.status === 'completed').length * 100;

    // Level formula: Each level requires progressively more XP
    let level = 1;
    let xpRemaining = totalXP;
    let xpForCurrentLevel = 100;

    while (xpRemaining >= xpForCurrentLevel) {
      xpRemaining -= xpForCurrentLevel;
      level++;
      xpForCurrentLevel = Math.floor(100 * Math.pow(1.5, level - 1));
    }

    return {
      level,
      xp: xpRemaining,
      xpToNext: xpForCurrentLevel,
      totalXP,
    };
  }, [progress]);

  const saveQuizSessionState = useCallback((session: QuizSession) => {
    saveQuizSession(session);
  }, []);

  const loadQuizSessionState = useCallback((): QuizSession | null => {
    return loadQuizSession();
  }, []);

  const clearQuizSessionState = useCallback(() => {
    clearQuizSession();
  }, []);

  return {
    progress,
    isLoaded,
    hasExistingProgress: progress !== null && progress.userName !== '',
    userName: progress?.userName || '',
    stats: progress?.stats || getDefaultProgress().stats,
    initializeUser,
    resumeExistingUser,
    updateChapterProgress,
    resetProgress,
    getChaptersWithData,
    calculateLevel,
    saveQuizSessionState,
    loadQuizSessionState,
    clearQuizSessionState,
  };
};

export default useGameProgress;
