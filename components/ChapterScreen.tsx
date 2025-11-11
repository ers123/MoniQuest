import React, { useState } from 'react';
import { Chapter, Term } from '../types';
import { useApp } from '../App';
import TermModal from './TermModal';

const TermCard: React.FC<{ term: Term; onClick: () => void }> = ({ term, onClick }) => (
  <button onClick={onClick} className="bg-white/80 p-4 rounded-xl shadow-sm text-left w-full hover:bg-purple-50 transition">
    <h3 className="text-xl font-bold text-pink-600 font-gamja">{term.term}</h3>
    <p className="text-sm text-gray-500 mb-2">{term.term_english}</p>
    <p className="text-gray-700">{term.kid_friendly_explanation}</p>
  </button>
);

interface ChapterScreenProps {
  chapter: Chapter;
}

const ChapterScreen: React.FC<ChapterScreenProps> = ({ chapter }) => {
  const { goToHome, startQuiz } = useApp();
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  return (
    <div className="p-4 animate-fade-in-up">
       {selectedTerm && <TermModal term={selectedTerm} onClose={() => setSelectedTerm(null)} />}
      <button onClick={goToHome} className="mb-4 text-purple-600 font-semibold">&larr; 챕터 선택으로</button>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-gamja text-purple-700">{chapter.title}</h1>
        <p className="text-gray-600 mt-2">{chapter.theme}</p>
      </header>

      <div className="bg-white/60 p-6 rounded-2xl shadow-inner mb-8">
        <h2 className="text-2xl font-bold font-gamja text-purple-800 mb-3">이야기 시간 📖</h2>
        <p className="text-gray-700 leading-relaxed">
          {chapter.terms[0]?.example_story || '이 챕터의 이야기가 곧 도착할 거예요! 조금만 기다려주세요.'}
          {chapter.terms.length > 1 && chapter.terms[1]?.example_story && ` ${chapter.terms[1].example_story}`}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold font-gamja text-purple-800 mb-3">핵심 용어 🔑</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.terms.map(term => (
            <TermCard key={term.term} term={term} onClick={() => setSelectedTerm(term)} />
          ))}
        </div>
      </div>
      
      <div className="text-center my-6 p-3 bg-blue-100 border border-blue-200 rounded-lg">
        <p className="text-blue-800">💡 퀴즈에서 70% 이상 맞히면 다음 챕터가 열릴 거야!</p>
      </div>

      <button 
        onClick={startQuiz}
        className="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-xl text-xl hover:bg-pink-600 transition-transform transform hover:scale-105"
      >
        퀴즈 시작!
      </button>
    </div>
  );
};

export default ChapterScreen;