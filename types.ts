import type { ReactNode } from 'react';

export interface Term {
  term: string;
  term_english: string;
  chapter: number;
  theme: string;
  simple_definition: string;
  kid_friendly_explanation: string;
  example_story: string;
  quiz_question: string;
  quiz_options: string[];
  quiz_answer: string;
  related_terms: string;
  difficulty_level: number;
  reference: string;
}

export interface Chapter {
  id: number;
  title: string;
  theme: string;
  terms: Term[];
  secondary_terms: string[];
  status: 'locked' | 'unlocked' | 'completed';
  icon: (className: string) => ReactNode;
  score: number | null;
  totalQuestions: number;
}
