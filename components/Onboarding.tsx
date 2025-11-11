import React, { useState } from 'react';
import { QuestIcon } from './icons';

interface OnboardingProps {
  onLogin: (name: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg max-w-sm w-full animate-fade-in-up">
        <QuestIcon className="w-20 h-20 text-pink-400 mx-auto mb-4" />
        <h1 className="text-4xl font-gamja text-purple-600 mb-2">EcoQuest</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">경제탐험대</h2>
        <p className="text-gray-600 mb-8">신비한 경제의 세계를 탐험할 준비가 되었니?</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name" className="text-lg font-semibold text-gray-700">너의 이름은 뭐야?</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-center bg-gray-700 text-white placeholder-gray-400 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 transition-all text-lg"
            placeholder="이름을 알려줘!"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-pink-600 transition-transform transform hover:scale-105 disabled:bg-gray-300"
            disabled={!name.trim()}
          >
            탐험 시작!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;