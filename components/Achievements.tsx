import React from 'react';
import { useApp } from '../App';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (stats: any, chapters: any[]) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_quiz',
    name: '첫 걸음',
    description: '첫 번째 퀴즈를 완료했어요!',
    icon: '🎯',
    requirement: (stats) => stats.totalQuizzesTaken >= 1,
    rarity: 'common',
  },
  {
    id: 'perfect_score',
    name: '완벽한 점수',
    description: '퀴즈에서 100점을 받았어요!',
    icon: '💯',
    requirement: (stats, chapters) => chapters.some(c => c.score === c.totalQuestions),
    rarity: 'rare',
  },
  {
    id: 'streak_3',
    name: '연속 학습자',
    description: '3일 연속 퀴즈를 풀었어요!',
    icon: '🔥',
    requirement: (stats) => stats.currentStreak >= 3,
    rarity: 'rare',
  },
  {
    id: 'streak_7',
    name: '일주일의 달인',
    description: '7일 연속 퀴즈를 풀었어요!',
    icon: '🌟',
    requirement: (stats) => stats.currentStreak >= 7,
    rarity: 'epic',
  },
  {
    id: 'all_chapters',
    name: '챕터 정복자',
    description: '모든 챕터를 완료했어요!',
    icon: '👑',
    requirement: (stats, chapters) => chapters.every(c => c.status === 'completed'),
    rarity: 'legendary',
  },
  {
    id: 'quiz_master',
    name: '퀴즈 마스터',
    description: '10개의 퀴즈를 완료했어요!',
    icon: '🎓',
    requirement: (stats) => stats.totalQuizzesTaken >= 10,
    rarity: 'epic',
  },
  {
    id: 'accuracy_pro',
    name: '정확도 프로',
    description: '전체 정답률이 80% 이상이에요!',
    icon: '🎯',
    requirement: (stats) => stats.totalQuestionsAnswered > 0 &&
      (stats.totalCorrectAnswers / stats.totalQuestionsAnswered) >= 0.8,
    rarity: 'epic',
  },
  {
    id: 'early_bird',
    name: '얼리버드',
    description: '오전 중에 퀴즈를 풀었어요!',
    icon: '🌅',
    requirement: (stats) => {
      if (!stats.lastPlayedAt) return false;
      const hour = new Date(stats.lastPlayedAt).getHours();
      return hour >= 6 && hour < 12;
    },
    rarity: 'common',
  },
  {
    id: 'night_owl',
    name: '올빼미',
    description: '저녁 늦게 퀴즈를 풀었어요!',
    icon: '🦉',
    requirement: (stats) => {
      if (!stats.lastPlayedAt) return false;
      const hour = new Date(stats.lastPlayedAt).getHours();
      return hour >= 21 || hour < 6;
    },
    rarity: 'common',
  },
  {
    id: 'speed_runner',
    name: '스피드 러너',
    description: '50개 이상의 문제를 풀었어요!',
    icon: '⚡',
    requirement: (stats) => stats.totalQuestionsAnswered >= 50,
    rarity: 'rare',
  },
];

const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common':
      return 'from-gray-400 to-gray-500';
    case 'rare':
      return 'from-blue-400 to-blue-600';
    case 'epic':
      return 'from-purple-400 to-purple-600';
    case 'legendary':
      return 'from-amber-400 to-amber-600';
  }
};

const getRarityGlow = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common':
      return 'shadow-gray-400/50';
    case 'rare':
      return 'shadow-blue-500/50';
    case 'epic':
      return 'shadow-purple-500/50';
    case 'legendary':
      return 'shadow-amber-500/50';
  }
};

const Achievements: React.FC = () => {
  const { stats, chapters } = useApp();

  const unlockedAchievements = ACHIEVEMENTS.filter(achievement =>
    achievement.requirement(stats, chapters)
  );

  const lockedAchievements = ACHIEVEMENTS.filter(achievement =>
    !achievement.requirement(stats, chapters)
  );

  const completionPercentage = Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100);

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-gamja gradient-text">🏆 업적</h2>
          <div className="text-right">
            <div className="text-sm text-gray-600">달성률</div>
            <div className="text-2xl font-bold gradient-text">
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">{completionPercentage}% 완료</div>
      </div>

      {/* Unlocked achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span>✨</span>
            <span>획득한 업적</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {unlockedAchievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`achievement-badge rounded-xl p-4 text-center animate-badge-pop bg-gradient-to-br ${getRarityColor(achievement.rarity)} ${getRarityGlow(achievement.rarity)} shadow-lg`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2 animate-bounce-soft">{achievement.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{achievement.name}</div>
                <div className="text-xs text-white/80">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-600 mb-3 flex items-center gap-2">
            <span>🔒</span>
            <span>잠긴 업적</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {lockedAchievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="achievement-locked rounded-xl p-4 text-center"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-4xl mb-2 grayscale opacity-50">{achievement.icon}</div>
                <div className="font-bold text-gray-600 text-sm mb-1">{achievement.name}</div>
                <div className="text-xs text-gray-500">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
