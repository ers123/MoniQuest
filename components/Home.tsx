import React from 'react';
import { useApp } from '../App';
import { StarIcon } from './icons';

const Home: React.FC = () => {
  const { userName, chapters, goToChapter } = useApp();

  return (
    <div className="animate-fade-in">
      <header className="text-center my-8">
        <h1 className="text-3xl font-gamja text-purple-700">어서와, {userName} 탐험대원!</h1>
        <p className="text-gray-600 mt-2">탐험하고 싶은 챕터를 골라봐!</p>
      </header>
      <main className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="relative">
            <button
              onClick={() => chapter.status !== 'locked' && goToChapter(chapter.id)}
              disabled={chapter.status === 'locked'}
              className={`
                aspect-square w-full p-4 flex flex-col justify-center items-center 
                rounded-2xl transition-all duration-300 transform 
                ${chapter.status === 'locked'
                  ? 'bg-white/60 cursor-not-allowed'
                  : 'bg-white/80 backdrop-blur-sm text-purple-600 shadow-md hover:shadow-xl hover:-translate-y-1'
                }
                ${chapter.status === 'completed' ? 'border-2 border-yellow-400' : 'border-2 border-transparent'}
              `}
            >
              <div className={`filter ${chapter.status === 'locked' ? 'grayscale' : ''}`}>
                {chapter.icon("h-10 w-10 mb-2")}
              </div>
              <span className={`font-bold text-sm text-center ${chapter.status === 'locked' ? 'text-gray-400' : ''}`}>{chapter.id}. {chapter.title}</span>
              {chapter.status === 'completed' && chapter.score !== null && (
                <p className="text-xs text-gray-500 mt-1">{chapter.score} / {chapter.totalQuestions}</p>
              )}
            </button>
            {chapter.status === 'locked' && (
              <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm-2.5 8V5.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V9h-5z" clipRule="evenodd" />
                </svg>
              </div>
            )}
             {chapter.status === 'completed' && (
              <div className="absolute top-2 right-2 transform translate-x-1/4 -translate-y-1/4">
                <StarIcon className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;