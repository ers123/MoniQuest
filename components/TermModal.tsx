import React from 'react';
import { Term } from '../types';

interface TermModalProps {
  term: Term;
  onClose: () => void;
}

const TermModal: React.FC<TermModalProps> = ({ term, onClose }) => {
  return (
    <div
      className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass rounded-3xl shadow-2xl p-6 max-w-md w-full relative animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient blur */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
            text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold mb-2">
              경제 용어
            </div>
            <h2 className="text-3xl font-gamja gradient-text">{term.term}</h2>
            <p className="text-gray-400">{term.term_english}</p>
          </div>

          {/* Info cards */}
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎈</span>
                <h3 className="font-bold text-purple-800">쉽게 말하면?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{term.kid_friendly_explanation}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-4 rounded-xl border border-pink-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🧐</span>
                <h3 className="font-bold text-pink-800">조금 더 자세히!</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{term.simple_definition}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-4 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🤝</span>
                <h3 className="font-bold text-indigo-800">함께 알면 좋은 친구들</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {term.related_terms.split(',').map((relatedTerm, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/70 rounded-full text-indigo-600 text-sm"
                  >
                    {relatedTerm.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Difficulty indicator */}
          {term.difficulty && (
            <div className="mt-4 flex items-center justify-center gap-1">
              <span className="text-xs text-gray-400 mr-2">난이도:</span>
              {[1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= term.difficulty! ? 'bg-purple-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermModal;
