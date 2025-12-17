import React from 'react';
import { useApp } from '../App';

const StatsBoard: React.FC = () => {
  const { stats, chapters, levelInfo } = useApp();

  const accuracy = stats.totalQuestionsAnswered > 0
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100)
    : 0;

  const completedChapters = chapters.filter(c => c.status === 'completed').length;
  const totalChapters = chapters.length;

  const getStreakEmoji = (streak: number) => {
    if (streak >= 7) return '🔥🔥🔥';
    if (streak >= 3) return '🔥🔥';
    if (streak >= 1) return '🔥';
    return '❄️';
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 90) return 'text-green-600';
    if (acc >= 75) return 'text-blue-600';
    if (acc >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getAccuracyGrade = (acc: number) => {
    if (acc >= 95) return 'S';
    if (acc >= 90) return 'A+';
    if (acc >= 85) return 'A';
    if (acc >= 80) return 'B+';
    if (acc >= 75) return 'B';
    if (acc >= 70) return 'C+';
    if (acc >= 65) return 'C';
    return 'D';
  };

  // Calculate XP progress percentage
  const xpPercentage = (levelInfo.xp / levelInfo.xpToNext) * 100;

  return (
    <div className="animate-fade-in-up space-y-4">
      {/* Level & XP Card */}
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-9xl opacity-5">⭐</div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm text-gray-600 mb-1">레벨</h2>
              <div className="flex items-center gap-2">
                <div className="level-badge px-4 py-2 rounded-full animate-glow-pulse">
                  <span className="text-2xl font-bold text-white">Lv.{levelInfo.level}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl animate-rotate-scale">💎</div>
              <div className="text-xs text-gray-500 mt-1">총 XP</div>
              <div className="text-lg font-bold text-purple-700">{levelInfo.totalXP}</div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">다음 레벨까지</span>
              <span className="font-bold text-purple-700">{levelInfo.xp} / {levelInfo.xpToNext} XP</span>
            </div>
            <div className="xp-bar-container h-4">
              <div className="xp-bar-fill h-full" style={{ width: `${xpPercentage}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Streak Card */}
        <div className="stat-card rounded-xl p-4 text-center">
          <div className={`text-4xl mb-2 ${stats.currentStreak >= 3 ? 'streak-flame' : ''} inline-block px-3 py-2 rounded-full`}>
            {getStreakEmoji(stats.currentStreak)}
          </div>
          <div className="text-sm text-gray-600">연속 학습</div>
          <div className="text-2xl font-bold gradient-text">{stats.currentStreak}일</div>
          <div className="text-xs text-gray-500 mt-1">최장 {stats.longestStreak}일</div>
        </div>

        {/* Accuracy Card */}
        <div className="stat-card rounded-xl p-4 text-center">
          <div className="relative inline-block mb-2">
            <svg className="w-16 h-16 progress-ring">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="none"
              />
              <circle
                className="progress-ring-circle"
                cx="32"
                cy="32"
                r="28"
                stroke="url(#gradient)"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - accuracy / 100)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-bold ${getAccuracyColor(accuracy)}`}>
                {getAccuracyGrade(accuracy)}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">정답률</div>
          <div className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>{accuracy}%</div>
        </div>

        {/* Quiz Count Card */}
        <div className="stat-card rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">📚</div>
          <div className="text-sm text-gray-600">완료한 퀴즈</div>
          <div className="text-2xl font-bold text-purple-700">{stats.totalQuizzesTaken}</div>
          <div className="text-xs text-gray-500 mt-1">{stats.totalQuestionsAnswered}개 문제</div>
        </div>

        {/* Chapters Card */}
        <div className="stat-card rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-sm text-gray-600">완료한 챕터</div>
          <div className="text-2xl font-bold text-purple-700">
            {completedChapters}/{totalChapters}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((completedChapters / totalChapters) * 100)}% 진행
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="glass rounded-xl p-5">
        <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
          <span>📊</span>
          <span>상세 통계</span>
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">맞힌 문제</span>
            <span className="font-bold text-green-600">{stats.totalCorrectAnswers}개</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">틀린 문제</span>
            <span className="font-bold text-red-600">
              {stats.totalQuestionsAnswered - stats.totalCorrectAnswers}개
            </span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">총 문제 수</span>
            <span className="font-bold text-purple-700">{stats.totalQuestionsAnswered}개</span>
          </div>
          {stats.lastPlayedAt && (
            <>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">마지막 플레이</span>
                <span className="text-xs text-gray-500">
                  {new Date(stats.lastPlayedAt).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mastery Visualization */}
      <div className="glass rounded-xl p-5">
        <h3 className="font-bold text-purple-700 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>챕터별 숙련도</span>
        </h3>
        <div className="space-y-3">
          {chapters
            .filter(c => c.status !== 'locked')
            .map((chapter) => {
              const mastery = chapter.score && chapter.totalQuestions
                ? (chapter.score / chapter.totalQuestions) * 100
                : 0;
              const masteryColor =
                mastery >= 90 ? 'text-green-600' :
                mastery >= 70 ? 'text-blue-600' :
                mastery >= 50 ? 'text-yellow-600' :
                'text-orange-600';

              return (
                <div key={chapter.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{chapter.title}</span>
                    <span className={`text-sm font-bold ${masteryColor}`}>
                      {Math.round(mastery)}%
                    </span>
                  </div>
                  <div className="mastery-meter">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StatsBoard;
