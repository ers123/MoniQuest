import React, { useState, useEffect, MouseEvent } from 'react';
import { Chapter, Term } from '../types';
import { useApp } from '../App';
import { getQuizExplanation } from '../services/geminiService';
import Confetti from './Confetti';

interface QuizProps {
  chapter: Chapter;
}

const shuffleArray = <T,>(items: T[]): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const pickRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const MOTIVATION_MESSAGES = [
  '이번 문제는 어떤 경제 모험일까? 상상력을 발휘해봐! ✨',
  '리라와 함께 새로운 단어를 탐험해보자! 🧭',
  '단서를 잘 모으면 정답이 더 가까워져! 🔍',
  '차근차근 생각하면 어떤 문제든 해결할 수 있어! 💡',
  '오늘도 한 걸음 성장 중! 다음 힌트를 찾아볼까? 🚀'
];

const CORRECT_MESSAGES = [
  '멋지다! 이번엔 경제 탐험가답게 해결했어! 🌟',
  '와, 정확해! 너의 경제 감각이 빛나고 있어! 🎉',
  '완벽해! 다음 모험도 기대돼! 🏆',
  '굿잡! 네 판단력이 정말 날카롭다! ⚡',
  '정답! 경제 요정들도 깜짝 놀랐어! 🧚'
];

const ENCOURAGEMENT_MESSAGES = [
  '괜찮아! 잠깐 숨을 고르고, 다른 단서를 찾아보자! 🍀',
  '이번에는 아쉽지만, 다음엔 더 멋지게 할 수 있어! 💪',
  '실수는 성장의 친구야! 함께 다시 도전해보자! 🌈',
  '이제 힌트를 얻었으니 다음엔 꼭 맞힐 수 있어! 🔁',
  '조금만 더 생각해보면 정답이 보일 거야! 🔎'
];

const renderMarkdown = (text: string) => {
    if (!text) return null;
    return text.split('**').map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
    );
};

const Quiz: React.FC<QuizProps> = ({ chapter }) => {
  const { userName, chapters, updateChapterScore, goToHome, goToChapter } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [shuffledTerms, setShuffledTerms] = useState<Term[]>([]);
  const [confettiPosition, setConfettiPosition] = useState<{ x: number; y: number } | null>(null);
  const [questionPrompts, setQuestionPrompts] = useState<string[]>(() => shuffleArray(MOTIVATION_MESSAGES));
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<'correct' | 'incorrect' | null>(null);


  useEffect(() => {
    const randomizedTerms = shuffleArray(
      chapter.terms.map(term => ({
        ...term,
        quiz_options: shuffleArray(term.quiz_options),
      }))
    );
    setShuffledTerms(randomizedTerms);
  }, [chapter]);

  useEffect(() => {
    setQuestionPrompts(shuffleArray(MOTIVATION_MESSAGES));
  }, [chapter.id]);

  useEffect(() => {
    if (isFinished) {
      updateChapterScore(chapter.id, score, shuffledTerms.length);
    }
  }, [isFinished, score, chapter.id, shuffledTerms.length, updateChapterScore]);

  const handleAnswer = async (answer: string, event: MouseEvent<HTMLButtonElement>) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === currentTerm.quiz_answer;
    setIsCorrect(correct);
    setFeedbackTone(correct ? 'correct' : 'incorrect');
    setFeedbackMessage(correct ? pickRandom(CORRECT_MESSAGES) : pickRandom(ENCOURAGEMENT_MESSAGES));

    if (correct) {
      setScore(s => s + 1);
      setConfettiPosition({ x: event.clientX, y: event.clientY });
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    } else {
      setShowExplanation(true);
      setIsLoadingExplanation(true);
      setExplanation('');
      try {
        const explanationText = await getQuizExplanation(currentTerm, chapter, userName);
        setExplanation(explanationText);
      } catch (error) {
        console.error("Error generating explanation:", error);
        setExplanation("이런! AI 선생님이 지금 조금 아픈가 봐요. 다시 시도해 주세요!");
      } finally {
        setIsLoadingExplanation(false);
      }
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setExplanation('');
    setConfettiPosition(null);
    setFeedbackMessage(null);
    setFeedbackTone(null);
    if (currentQuestionIndex < shuffledTerms.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (shuffledTerms.length === 0) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
             <div className="flex items-center text-purple-700">
                <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>퀴즈를 준비하고 있어...</span>
            </div>
        </div>
    );
  }

  const currentTerm = shuffledTerms[currentQuestionIndex];
  const currentPrompt = questionPrompts[currentQuestionIndex % questionPrompts.length];

  if (isFinished) {
    const mastery = score / shuffledTerms.length;
    const isLastChapter = chapter.id === chapters.length;
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4 animate-fade-in relative">
        {mastery >= 0.7 && <Confetti />}
        <h2 className="text-3xl font-gamja text-purple-700 mb-4 animate-bounce">참 잘했어, {userName}!</h2>
        <p className="text-2xl font-bold text-gray-800">
          {chapter.title} 퀴즈 완료!
        </p>
        <p className="text-4xl my-6 font-bold">
          {score} / {shuffledTerms.length}
        </p>
        {mastery >= 0.7 ? (
          <p className="text-lg text-green-600 mb-8">🎉 다음 챕터가 열렸어! 🎉</p>
        ) : (
          <p className="text-lg text-orange-600 mb-8">아쉽다! 70% 이상 맞혀야 통과야. 다시 도전해볼까?</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-sm">
            <button
                onClick={goToHome}
                className="w-full bg-purple-500 text-white font-bold py-3 px-6 rounded-xl text-lg hover:bg-purple-600 transition-transform transform hover:scale-105"
                >
                챕터 선택으로
            </button>
            {mastery >= 0.7 && !isLastChapter && (
                <button
                onClick={() => goToChapter(chapter.id + 1)}
                className="w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-xl text-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
                >
                다음 챕터로! &rarr;
                </button>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 animate-fade-in-up relative">
      {confettiPosition && <Confetti clickPosition={confettiPosition} />}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-gamja text-purple-700">{chapter.title}: 퀴즈</h1>
        <p className="text-gray-600 mt-2">
          문제 {currentQuestionIndex + 1} / {shuffledTerms.length}
        </p>
        <p className="text-sm text-purple-500 mt-1">{currentPrompt}</p>
      </header>

      <div className="bg-white/70 p-6 rounded-2xl shadow-md">
        <p className="text-xl text-gray-800 font-semibold mb-6 text-center">{currentTerm.quiz_question}</p>
        <div className="grid grid-cols-1 gap-4">
          {currentTerm.quiz_options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => handleAnswer(option, e)}
              disabled={!!selectedAnswer}
              className={`
                w-full p-4 rounded-lg text-left transition-all text-lg
                ${!selectedAnswer ? 'bg-white hover:bg-purple-100' : ''}
                ${selectedAnswer && option === currentTerm.quiz_answer ? 'bg-green-200 text-green-800 ring-2 ring-green-500 transform scale-105' : ''}
                ${selectedAnswer && option !== currentTerm.quiz_answer && option === selectedAnswer ? 'bg-red-200 text-red-800 ring-2 ring-red-500 animate-shake' : ''}
                ${selectedAnswer && option !== currentTerm.quiz_answer && option !== selectedAnswer ? 'bg-gray-100 text-gray-400' : ''}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {feedbackTone === 'correct' && feedbackMessage && (
        <p className="mt-4 text-center text-green-600 font-semibold animate-fade-in">
          {feedbackMessage}
        </p>
      )}

      {showExplanation && (
        <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg animate-fade-in">
          <h3 className="font-bold text-yellow-800 font-gamja text-xl">리라의 힌트! ✨</h3>
          {feedbackTone === 'incorrect' && feedbackMessage && (
            <p className="text-yellow-900 mt-2 font-semibold">{feedbackMessage}</p>
          )}
          {isLoadingExplanation ? (
             <div className="flex items-center text-yellow-700 mt-2">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>리라가 열심히 생각하고 있어...</span>
            </div>
          ) : (
            <p className="text-yellow-800 mt-2 leading-relaxed">{renderMarkdown(explanation)}</p>
          )}
           <button
            onClick={nextQuestion}
            className="mt-4 bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
          >
            다음 문제로
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;