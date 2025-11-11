import React from 'react';
import { Term } from '../types';

interface TermModalProps {
  term: Term;
  onClose: () => void;
}

const TermModal: React.FC<TermModalProps> = ({ term, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full m-4 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
            <h2 className="text-3xl font-gamja text-purple-600">{term.term}</h2>
            <p className="text-lg text-gray-400 mb-4">{term.term_english}</p>
        </div>
        
        <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-xl">
                <h3 className="font-bold text-purple-800 mb-1">쉽게 말하면? 🎈</h3>
                <p className="text-gray-700">{term.kid_friendly_explanation}</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-xl">
                <h3 className="font-bold text-pink-800 mb-1">조금 더 자세히! 🧐</h3>
                <p className="text-gray-700">{term.simple_definition}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl">
                <h3 className="font-bold text-indigo-800 mb-1">함께 알면 좋은 친구들 🤝</h3>
                <p className="text-gray-700">{term.related_terms}</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TermModal;
