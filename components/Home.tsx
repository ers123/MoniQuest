import React from 'react';
import { useApp } from '../App';
import { StarIcon } from './icons';
import LiraMascot from './LiraMascot';

const Home: React.FC = () => {
  const { userName, chapters, goToChapter, levelInfo, stats } = useApp();

  // Calculate completion percentage
  const completedChapters = chapters.filter(c => c.status === 'completed').length;
  const completionPercentage = Math.round((completedChapters / chapters.length) * 100);

  return (
    <div className="animate-fade-in pb-safe">
      {/* Header Section with Level & Stats */}
      <header className="mb-6">
        {/* User greeting card */}
        <div className="glass rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LiraMascot size="sm" mood="happy" animate={false} />
              <div>
                <h1 className="text-xl font-gamja text-purple-700">
                  어서와, {userName}!
                </h1>
                <p className="text-sm text-gray-500">오늘도 경제 모험을 떠나볼까?</p>
              </div>
            </div>
            {/* Level badge */}
            <div className="level-badge px-3 py-1 rounded-full text-white font-bold text-sm">
              Lv.{levelInfo.level}
            </div>
          </div>

          {/* XP Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>경험치</span>
              <span>{levelInfo.xp} / {levelInfo.xpToNext} XP</span>
            </div>
            <div className="xp-bar-container h-2">
              <div
                className="xp-bar-fill h-full"
                style={{ width: `${(levelInfo.xp / levelInfo.xpToNext) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-lg font-bold text-orange-500">{stats.currentStreak}</div>
            <div className="text-xs text-gray-500">연속 학습</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-lg font-bold text-purple-600">{completedChapters}/{chapters.length}</div>
            <div className="text-xs text-gray-500">완료 챕터</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-lg font-bold text-pink-500">{stats.totalCorrectAnswers}</div>
            <div className="text-xs text-gray-500">정답 수</div>
          </div>
        </div>
      </header>

      {/* Progress Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-gamja text-purple-700">탐험 진행률</h2>
          <span className="text-sm text-gray-500">{completionPercentage}%</span>
        </div>
        <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-1000"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Chapter Selection - Adventure Map Style */}
      <section>
        <h2 className="text-lg font-gamja text-purple-700 mb-4">챕터 선택</h2>
        <div className="space-y-3">
          {chapters.map((chapter, index) => {
            const isLocked = chapter.status === 'locked';
            const isCompleted = chapter.status === 'completed';
            const isUnlocked = chapter.status === 'unlocked';
            const staggerClass = `stagger-${index + 1}`;

            return (
              <div
                key={chapter.id}
                className={`relative animate-fade-in-up ${staggerClass}`}
                style={{ opacity: 0, animationFillMode: 'forwards' }}
              >
                {/* Connection line to next chapter */}
                {index < chapters.length - 1 && (
                  <div
                    className={`absolute left-8 top-full w-1 h-3 rounded-full z-0
                      ${chapters[index + 1].status === 'locked' ? 'bg-gray-200' : 'bg-gradient-to-b from-purple-300 to-pink-300'}`}
                  />
                )}

                <button
                  onClick={() => !isLocked && goToChapter(chapter.id)}
                  disabled={isLocked}
                  className={`
                    w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300
                    touch-feedback card-hover relative overflow-hidden
                    ${isLocked
                      ? 'bg-gray-100 cursor-not-allowed opacity-60'
                      : isCompleted
                        ? 'glass border-2 border-yellow-300'
                        : 'glass border-2 border-purple-200 hover:border-purple-400'
                    }
                  `}
                >
                  {/* Chapter number badge */}
                  <div
                    className={`
                      w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                      transition-all duration-300
                      ${isLocked
                        ? 'bg-gray-200'
                        : isCompleted
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg'
                      }
                    `}
                  >
                    {isLocked ? (
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm-2.5 8V5.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V9h-5z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <div className={`${isLocked ? 'grayscale' : ''}`}>
                        {chapter.icon('w-8 h-8 text-white')}
                      </div>
                    )}
                  </div>

                  {/* Chapter info */}
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                        ${isLocked ? 'bg-gray-200 text-gray-500' : 'bg-purple-100 text-purple-600'}`}>
                        Ch.{chapter.id}
                      </span>
                      {isCompleted && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                          완료!
                        </span>
                      )}
                      {isUnlocked && !isCompleted && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 animate-pulse-soft">
                          도전 가능
                        </span>
                      )}
                    </div>
                    <h3 className={`font-bold text-lg truncate mt-1
                      ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
                      {chapter.title}
                    </h3>
                    <p className={`text-sm truncate
                      ${isLocked ? 'text-gray-300' : 'text-gray-500'}`}>
                      {chapter.theme}
                    </p>
                  </div>

                  {/* Right side - Score or arrow */}
                  <div className="flex-shrink-0">
                    {isCompleted && chapter.score !== null ? (
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-5 h-5 text-yellow-400" />
                          <span className="font-bold text-gray-700">
                            {chapter.score}/{chapter.totalQuestions}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {Math.round((chapter.score / chapter.totalQuestions) * 100)}%
                        </div>
                      </div>
                    ) : !isLocked ? (
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-300">?</span>
                      </div>
                    )}
                  </div>

                  {/* Shimmer effect for unlocked chapters */}
                  {isUnlocked && !isCompleted && (
                    <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Encouragement message */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          {completionPercentage === 100
            ? '🎉 축하해! 모든 챕터를 완료했어!'
            : completionPercentage >= 50
              ? '💪 절반 이상 완료! 조금만 더 힘내자!'
              : '🚀 멋진 시작이야! 계속 도전해봐!'}
        </p>
      </div>
    </div>
  );
};

export default Home;
