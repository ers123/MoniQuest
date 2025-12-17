import React, { useState, useEffect, MouseEvent } from 'react';
import { Chapter, Term } from '../types';
import { useApp } from '../App';
import { getQuizExplanation } from '../services/geminiService';
import Confetti from './Confetti';
import LiraMascot from './LiraMascot';

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
  '이번 문제는 어떤 경제 모험일까? 상상력을 발휘해봐!',
  '리라와 함께 새로운 단어를 탐험해보자!',
  '단서를 잘 모으면 정답이 더 가까워져!',
  '차근차근 생각하면 어떤 문제든 해결할 수 있어!',
  '오늘도 한 걸음 성장 중! 다음 힌트를 찾아볼까?'
];

const CORRECT_MESSAGES = [
  '멋지다! 이번엔 경제 탐험가답게 해결했어!',
  '와, 정확해! 너의 경제 감각이 빛나고 있어!',
  '완벽해! 다음 모험도 기대돼!',
  '굿잡! 네 판단력이 정말 날카롭다!',
  '정답! 경제 요정들도 깜짝 놀랐어!'
];

const ENCOURAGEMENT_MESSAGES = [
  '괜찮아! 잠깐 숨을 고르고, 다른 단서를 찾아보자!',
  '이번에는 아쉽지만, 다음엔 더 멋지게 할 수 있어!',
  '실수는 성장의 친구야! 함께 다시 도전해보자!',
  '이제 힌트를 얻었으니 다음엔 꼭 맞힐 수 있어!',
  '조금만 더 생각해보면 정답이 보일 거야!'
];

const renderMarkdown = (text: string) => {
  if (!text) return null;
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-bold text-purple-700">{part}</strong> : part
  );
};

// Haptic feedback helper
const vibrate = (pattern: number | number[]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
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
  const [showLiraHint, setShowLiraHint] = useState(false);

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
      vibrate(50); // Short vibration for correct
      setScore(s => s + 1);
      setConfettiPosition({ x: event.clientX, y: event.clientY });
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    } else {
      vibrate([50, 50, 50]); // Pattern vibration for incorrect
      setShowExplanation(true);
      setShowLiraHint(true);
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
    setShowLiraHint(false);
    if (currentQuestionIndex < shuffledTerms.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (shuffledTerms.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="glass rounded-2xl p-8 text-center animate-pulse-soft">
          <LiraMascot size="lg" mood="thinking" className="mx-auto mb-4" />
          <p className="text-purple-700 font-medium">퀴즈를 준비하고 있어...</p>
        </div>
      </div>
    );
  }

  const currentTerm = shuffledTerms[currentQuestionIndex];
  const currentPrompt = questionPrompts[currentQuestionIndex % questionPrompts.length];
  const progressPercentage = ((currentQuestionIndex) / shuffledTerms.length) * 100;

  if (isFinished) {
    const mastery = score / shuffledTerms.length;
    const isLastChapter = chapter.id === chapters.length;
    const passed = mastery >= 0.7;

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4 animate-fade-in relative pb-safe">
        {passed && <Confetti />}

        <div className="glass rounded-3xl p-8 max-w-md w-full animate-scale-in">
          {/* Result mascot */}
          <LiraMascot
            size="lg"
            mood={passed ? 'excited' : 'happy'}
            className="mx-auto mb-4"
          />

          <h2 className="text-3xl font-gamja gradient-text mb-2">
            {passed ? '대단해!' : '아쉽다!'}
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            {chapter.title} 퀴즈 완료!
          </p>

          {/* Score display */}
          <div className="my-6">
            <div className="text-6xl font-bold gradient-text mb-2">
              {Math.round(mastery * 100)}%
            </div>
            <div className="text-lg text-gray-600">
              {score} / {shuffledTerms.length} 정답
            </div>
          </div>

          {/* Stars display */}
          <div className="flex justify-center gap-2 mb-6">
            {[0.3, 0.5, 0.7].map((threshold, i) => (
              <span
                key={i}
                className={`text-4xl transition-all duration-500 ${
                  mastery >= threshold
                    ? 'star-filled scale-110'
                    : 'star-empty scale-90'
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Message */}
          <p className={`text-lg mb-8 ${passed ? 'text-green-600' : 'text-orange-600'}`}>
            {passed
              ? '🎉 다음 챕터가 열렸어! 🎉'
              : '70% 이상 맞혀야 통과야. 다시 도전해볼까?'}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={goToHome}
              className="w-full btn-primary text-white font-bold py-4 px-6 rounded-2xl text-lg"
            >
              챕터 선택으로
            </button>
            {passed && !isLastChapter && (
              <button
                onClick={() => goToChapter(chapter.id + 1)}
                className="w-full btn-secondary text-white font-bold py-4 px-6 rounded-2xl text-lg flex items-center justify-center gap-2"
              >
                <span>다음 챕터로!</span>
                <span>→</span>
              </button>
            )}
            {!passed && (
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 text-gray-700 font-bold py-4 px-6 rounded-2xl text-lg hover:bg-gray-200 transition-all"
              >
                다시 도전하기
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in relative pb-safe">
      {confettiPosition && <Confetti clickPosition={confettiPosition} />}

      {/* Header with progress */}
      <header className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={goToHome}
            className="text-purple-600 font-medium flex items-center gap-1 hover:text-purple-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>나가기</span>
          </button>
          <div className="text-sm text-gray-500">
            {currentQuestionIndex + 1} / {shuffledTerms.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Chapter title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-gamja text-purple-700">{chapter.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{currentPrompt}</p>
      </div>

      {/* Question card */}
      <div className="glass rounded-2xl p-6 mb-6 animate-scale-in">
        <p className="text-xl text-gray-800 font-semibold text-center leading-relaxed">
          {currentTerm.quiz_question}
        </p>
      </div>

      {/* Answer options */}
      <div className="space-y-3 mb-6">
        {currentTerm.quiz_options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === currentTerm.quiz_answer;
          const showResult = selectedAnswer !== null;

          let optionClass = 'quiz-option glass';
          if (showResult) {
            if (isCorrectAnswer) {
              optionClass = 'quiz-option-correct';
            } else if (isSelected && !isCorrectAnswer) {
              optionClass = 'quiz-option-incorrect animate-shake';
            } else {
              optionClass = 'bg-gray-50 opacity-50';
            }
          }

          return (
            <button
              key={index}
              onClick={(e) => handleAnswer(option, e)}
              disabled={!!selectedAnswer}
              className={`
                w-full p-4 rounded-xl text-left transition-all text-lg font-medium
                touch-feedback ${optionClass}
              `}
              style={{
                opacity: 0,
                animation: `fadeInUp 0.4s ease-out forwards ${index * 0.1}s`
              }}
            >
              <div className="flex items-center gap-3">
                <span className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold
                  ${showResult && isCorrectAnswer
                    ? 'bg-green-500 text-white'
                    : showResult && isSelected && !isCorrectAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-100 text-purple-600'
                  }
                `}>
                  {showResult && isCorrectAnswer ? '✓' : showResult && isSelected ? '✗' : String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrectAnswer && (
                  <span className="text-2xl animate-bounce-soft">🎉</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback message */}
      {feedbackTone === 'correct' && feedbackMessage && (
        <div className="glass-purple rounded-xl p-4 mb-6 animate-fade-in-up text-center">
          <p className="text-green-600 font-semibold flex items-center justify-center gap-2">
            <span className="text-2xl">🌟</span>
            {feedbackMessage}
          </p>
        </div>
      )}

      {/* Explanation panel */}
      {showExplanation && (
        <div className="glass rounded-2xl p-5 animate-fade-in-up overflow-hidden">
          <div className="flex items-start gap-3 mb-4">
            {showLiraHint && (
              <LiraMascot size="sm" mood="thinking" className="flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-purple-700 font-gamja text-xl mb-1">
                리라의 힌트!
              </h3>
              {feedbackTone === 'incorrect' && feedbackMessage && (
                <p className="text-orange-600 font-medium text-sm mb-2">
                  {feedbackMessage}
                </p>
              )}
            </div>
          </div>

          {isLoadingExplanation ? (
            <div className="flex items-center gap-3 text-purple-600">
              <div className="w-5 h-5 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
              <span>리라가 열심히 생각하고 있어...</span>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed">{renderMarkdown(explanation)}</p>
          )}

          <button
            onClick={nextQuestion}
            className="mt-4 w-full btn-gold text-white font-bold py-3 px-6 rounded-xl text-lg"
          >
            다음 문제로 →
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
