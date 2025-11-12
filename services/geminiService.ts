import { Chapter, Term } from '../types';

type Purpose = 'quiz-explanation' | 'chat-response';

interface GenerateResponse {
  result?: string;
  error?: {
    code: string;
    message: string;
  };
}

const inferApiBase = () => {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  const explicit = metaEnv.VITE_API_BASE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, '');
  }

  if (typeof window === 'undefined') {
    return '';
  }

  const origin = window.location.origin;

  if (origin.includes('moniquest.vercel.app')) {
    return '';
  }

  if (origin.includes('github.io')) {
    return 'https://moniquest.vercel.app';
  }

  if (origin.includes('localhost')) {
    return 'https://moniquest.vercel.app';
  }

  return '';
};

const API_BASE = inferApiBase();

const getEndpoint = (path: string) => {
  if (API_BASE) {
    return `${API_BASE}${path}`;
  }
  return path;
};

const postGenerate = async (body: Record<string, unknown>) => {
  let response: Response;
  try {
    response = await fetch(getEndpoint('/api/generate'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Failed to contact AI proxy', error);
    throw new Error('AI 서버에 연결하지 못했어요. 네트워크 상태를 확인해 주세요.');
  }

  let data: GenerateResponse | null = null;
  try {
    data = (await response.json()) as GenerateResponse;
  } catch (error) {
    console.error('Failed to parse AI response', error);
    throw new Error('AI 응답을 해석하지 못했어요. 잠시 후 다시 시도해 주세요.');
  }

  if (!response.ok) {
    const message = data?.error?.message ?? 'AI 선생님이 지금 조금 아픈가 봐요. 다시 시도해 주세요!';
    throw new Error(message);
  }

  if (!data?.result) {
    throw new Error('AI 응답이 비어 있습니다. 다시 시도해 주세요.');
  }

  return data.result;
};

export const getQuizExplanation = async (term: Term, chapter: Chapter, userName: string) => {
  return postGenerate({
    purpose: 'quiz-explanation' satisfies Purpose,
    userName,
    term: {
      term: term.term,
      simple_definition: term.simple_definition,
      kid_friendly_explanation: term.kid_friendly_explanation,
      example_story: term.example_story,
    },
    chapter: {
      secondary_terms: chapter.secondary_terms,
    },
  });
};

export const getChatbotResponse = async (question: string, userName: string) => {
  return postGenerate({
    purpose: 'chat-response' satisfies Purpose,
    userName,
    question,
  });
};
