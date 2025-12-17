import React, { useState, useEffect } from 'react';
import LiraMascot from './LiraMascot';

interface OnboardingProps {
  onLogin: (name: string) => void;
  existingUserName?: string;
  onResume?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onLogin, existingUserName, onResume }) => {
  const [name, setName] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [liraMood, setLiraMood] = useState<'waving' | 'happy' | 'excited'>('waving');

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setLiraMood('happy'), 1500);
    const timer2 = setTimeout(() => setShowForm(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setLiraMood('excited');
      setTimeout(() => onLogin(name), 500);
    }
  };

  const handleResume = () => {
    setLiraMood('excited');
    setTimeout(() => onResume?.(), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 pb-safe">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float">💰</div>
      <div className="absolute top-20 right-8 text-3xl opacity-20 animate-float-slow">✨</div>
      <div className="absolute bottom-32 left-8 text-2xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🪙</div>
      <div className="absolute bottom-20 right-12 text-3xl opacity-20 animate-float-slow" style={{ animationDelay: '2s' }}>💎</div>

      {/* Main content card */}
      <div className="glass p-8 rounded-3xl shadow-2xl max-w-md w-full animate-scale-in relative overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer opacity-50 pointer-events-none" />

        {/* Lira Mascot */}
        <div className="relative z-10">
          <LiraMascot
            size="xl"
            mood={liraMood}
            className="mx-auto mb-6"
          />

          {/* Title */}
          <h1 className="text-5xl font-gamja gradient-text mb-2 animate-fade-in-down">
            MoniQuest
          </h1>
          <h2 className="text-2xl font-bold text-purple-700 mb-4 animate-fade-in">
            경제탐험대
          </h2>

          {/* Welcome message */}
          {showWelcome && (
            <div className="mb-6 animate-fade-in-up">
              <p className="text-gray-600 text-lg leading-relaxed">
                안녕! 나는 경제 요정 <span className="text-purple-600 font-bold">리라</span>야! ✨
              </p>
              <p className="text-gray-500 mt-2">
                신비한 경제의 세계로 모험을 떠나볼까?
              </p>
            </div>
          )}

          {/* Returning user option */}
          {existingUserName && onResume && (
            <div className={`mb-6 transition-all duration-500 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={handleResume}
                className="w-full btn-primary text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all transform hover:scale-105 mb-4"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>👋</span>
                  <span>다시 만나서 반가워, {existingUserName}!</span>
                </span>
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/70 text-gray-500">또는 새로 시작하기</span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 transition-all duration-500 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <label htmlFor="name" className="text-lg font-semibold text-gray-700">
              {existingUserName ? '새로운 탐험대원 이름은?' : '탐험대원! 너의 이름은 뭐야?'}
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 text-center bg-white/90 text-gray-800 placeholder-gray-400
                  border-2 border-purple-200 rounded-2xl focus:border-pink-400 focus:ring-4 focus:ring-pink-200
                  transition-all text-lg font-medium"
                placeholder="이름을 알려줘!"
                autoComplete="off"
                autoFocus={!existingUserName}
              />
              {name && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl animate-bounce-soft">
                  🌟
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full btn-secondary text-white font-bold py-4 px-6 rounded-2xl text-xl
                transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none
                disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              <span>탐험 시작!</span>
              <span className="text-2xl">🚀</span>
            </button>
          </form>

          {/* Features preview */}
          <div className={`mt-8 pt-6 border-t border-purple-100 transition-all duration-500 delay-300 ${showForm ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">📚</span>
                <span>12개 챕터</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">🎯</span>
                <span>50+ 퀴즈</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">🤖</span>
                <span>AI 선생님</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <p className="mt-8 text-gray-400 text-sm animate-fade-in" style={{ animationDelay: '1s' }}>
        경제를 배우면서 레벨업! 🎮
      </p>
    </div>
  );
};

export default Onboarding;
