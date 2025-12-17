import React, { useState } from 'react';
import { Chapter, Term } from '../types';
import { useApp } from '../App';
import TermModal from './TermModal';
import LiraMascot from './LiraMascot';

const TermCard: React.FC<{ term: Term; onClick: () => void; index: number }> = ({ term, onClick, index }) => (
  <button
    onClick={onClick}
    className="glass p-4 rounded-xl text-left w-full card-hover touch-feedback animate-fade-in-up"
    style={{
      opacity: 0,
      animationFillMode: 'forwards',
      animationDelay: `${index * 0.1}s`
    }}
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-lg">📖</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-pink-600 font-gamja truncate">{term.term}</h3>
        <p className="text-xs text-gray-400 mb-1">{term.term_english}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{term.kid_friendly_explanation}</p>
      </div>
      <div className="text-purple-300 flex-shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </button>
);

interface ChapterScreenProps {
  chapter: Chapter;
}

const ChapterScreen: React.FC<ChapterScreenProps> = ({ chapter }) => {
  const { goToHome, startQuiz } = useApp();
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  return (
    <div className="animate-fade-in pb-safe">
      {selectedTerm && <TermModal term={selectedTerm} onClose={() => setSelectedTerm(null)} />}

      {/* Header */}
      <header className="mb-6">
        <button
          onClick={goToHome}
          className="mb-4 text-purple-600 font-medium flex items-center gap-1 hover:text-purple-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>챕터 선택으로</span>
        </button>

        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            {chapter.icon('w-10 h-10 text-white')}
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-2">
            Chapter {chapter.id}
          </span>
          <h1 className="text-3xl font-gamja gradient-text mb-2">{chapter.title}</h1>
          <p className="text-gray-600">{chapter.theme}</p>
        </div>
      </header>

      {/* Story Section */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📖</span>
          <h2 className="text-xl font-bold font-gamja text-purple-800">이야기 시간</h2>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <LiraMascot size="sm" mood="happy" animate={false} className="flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              {chapter.terms[0]?.example_story || '이 챕터의 이야기가 곧 도착할 거예요! 조금만 기다려주세요.'}
              {chapter.terms.length > 1 && chapter.terms[1]?.example_story && ` ${chapter.terms[1].example_story}`}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🔑</span>
          <h2 className="text-xl font-bold font-gamja text-purple-800">핵심 용어</h2>
          <span className="ml-auto text-sm text-gray-400">{chapter.terms.length}개</span>
        </div>
        <div className="space-y-3">
          {chapter.terms.map((term, index) => (
            <TermCard
              key={term.term}
              term={term}
              onClick={() => setSelectedTerm(term)}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Quiz Info */}
      <div className="glass-purple rounded-xl p-4 mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-3xl">💡</div>
          <div>
            <p className="text-purple-700 font-medium">퀴즈 통과 조건</p>
            <p className="text-purple-600 text-sm">70% 이상 맞히면 다음 챕터가 열려요!</p>
          </div>
        </div>
      </div>

      {/* Quiz Button */}
      <button
        onClick={startQuiz}
        className="w-full btn-secondary text-white font-bold py-4 px-6 rounded-2xl text-xl flex items-center justify-center gap-3 touch-feedback"
      >
        <span>퀴즈 시작!</span>
        <span className="text-2xl">🎯</span>
      </button>

      {/* Terms count info */}
      <p className="text-center text-gray-400 text-sm mt-4">
        총 {chapter.terms.length}개의 문제가 준비되어 있어요
      </p>
    </div>
  );
};

export default ChapterScreen;
