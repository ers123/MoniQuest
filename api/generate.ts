import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL_NAME = 'gemini-2.5-flash-lite';
const DEFAULT_GENERATION_CONFIG = {
  temperature: 0.9,
  topP: 0.8,
  topK: 40,
};

const DEFAULT_ALLOWED_ORIGINS = new Set([
  'https://ers123.github.io',
  'https://ers123.github.io/MoniQuest',
  'https://ers123.github.io/MoniQuest/',
  'https://moniquest.vercel.app',
]);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

interface QuizExplanationPayload {
  purpose: 'quiz-explanation';
  userName: string;
  term: {
    term: string;
    simple_definition: string;
    kid_friendly_explanation: string;
    example_story: string;
  };
  chapter: {
    secondary_terms: string[];
  };
}

interface ChatResponsePayload {
  purpose: 'chat-response';
  userName: string;
  question: string;
}

type GenerateRequest = QuizExplanationPayload | ChatResponsePayload;

type ErrorCode =
  | 'method_not_allowed'
  | 'missing_api_key'
  | 'invalid_origin'
  | 'invalid_payload'
  | 'rate_limited'
  | 'generation_failed';

interface ErrorBody {
  error: {
    code: ErrorCode;
    message: string;
  };
}

const getAllowedOrigins = () => {
  const origins = new Set(DEFAULT_ALLOWED_ORIGINS);
  const extra = process.env.EXTRA_ALLOWED_ORIGINS;
  if (extra) {
    extra
      .split(',')
      .map(value => value.trim())
      .filter(Boolean)
      .forEach(origin => origins.add(origin));
  }
  return origins;
};

const withCors = (res: VercelResponse, origin: string | null) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
};

const sendError = (res: VercelResponse, status: number, code: ErrorCode, message: string, origin: string | null) => {
  withCors(res, origin);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json({ error: { code, message } } satisfies ErrorBody);
};

const sendJson = (res: VercelResponse, body: Record<string, unknown>, origin: string | null) => {
  withCors(res, origin);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json(body);
};

const getClient = (() => {
  let client: GoogleGenAI | null = null;
  return () => {
    if (client) return client;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY environment variable.');
    }
    client = new GoogleGenAI({ apiKey });
    return client;
  };
})();

const checkRateLimit = (identifier: string) => {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  rateLimitStore.set(identifier, entry);
  return true;
};

const extractIdentifier = (req: VercelRequest) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }
  const ipHeader = req.headers['x-real-ip'];
  if (typeof ipHeader === 'string' && ipHeader.trim()) {
    return ipHeader.trim();
  }
  return req.socket.remoteAddress ?? 'unknown';
};

const buildQuizPrompt = (payload: QuizExplanationPayload) => {
  const { term, chapter, userName } = payload;
  return [
    '너는 10살짜리 한국 여자아이를 위한 친절하고 다정한 경제 선생님이야.',
    `"${userName}"라는 학생이 방금 "${term.term}"에 대한 퀴즈 문제를 틀렸어.`,
    '',
    '이 용어에 대한 정보는 다음과 같아:',
    `- 간단 정의: ${term.simple_definition}`,
    `- 어린이용 비유: ${term.kid_friendly_explanation}`,
    `- 관련 이야기: ${term.example_story}`,
    '',
    chapter.secondary_terms.length
      ? `같은 챕터에서 배우는 다른 중요한 단어들은 "${chapter.secondary_terms.join(', ')}"야.`
      : '',
    `이 단어들도 자연스럽게 활용해서 설명해주면 "${userName}"가 더 잘 이해할 수 있을 거야.`,
    '',
    '학생의 눈높이에 맞춰서 이름을 직접 불러 주고, 새로운 비유나 예시를 들어 2~3문장으로 짧게 설명해줘.',
    '설명할 때마다 감탄사와 말투에 변화를 줘서 반복되는 느낌이 들지 않도록 해줘.',
    `항상 "${userName}아, 괜찮아!" 같은 따뜻한 격려로 시작해 줘.`,
    '반드시 한국어로 대답해줘.',
  ]
    .filter(Boolean)
    .join('\n');
};

const buildChatPrompt = (payload: ChatResponsePayload) => {
  const { question, userName } = payload;
  return [
    "너는 '리라'라는 이름의 AI 경제 선생님이야.",
    `10살짜리 "${userName}"와 대화하고 있어.`,
    `"${userName}"가 경제 용어에 대해 질문했어: "${question}"`,
    '',
    '다음 규칙을 꼭 지켜서 대답해줘:',
    '1. 경제 용어에 대해서만 대답해야 해.',
    '2. 경제와 관련 없는 질문을 하면, "나는 경제 이야기만 들려줄 수 있어! 궁금한 경제 용어가 있니?"라고 귀엽게 대답해줘.',
    '3. 답변은 항상 2~3문장으로, 아주 쉽고 재미있는 비유를 들어서 설명해줘.',
    '4. 매번 같은 표현이나 이모지를 반복하지 말고, 표현과 어투에 자연스러운 변화를 줘.',
    `5. 언제나 "${userName}"의 이름을 부르며 친근하게 말해줘.`,
    '6. 반드시 한국어로만 대답해.',
  ].join('\n');
};

const generateContent = async (prompt: string) => {
  const client = getClient();
  const response = await client.models.generateContent({
    model: GEMINI_MODEL_NAME,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: DEFAULT_GENERATION_CONFIG,
  });
  const text = response.text;
  if (!text) {
    throw new Error('Gemini response did not include text.');
  }
  return text.trim();
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const originHeader = req.headers.origin;
  const origin = typeof originHeader === 'string' ? originHeader : null;
  const allowed = origin ? getAllowedOrigins().has(origin) : true;

  if (req.method === 'OPTIONS') {
    withCors(res, allowed ? origin : null);
    return res.status(204).end();
  }

  if (!allowed) {
    return sendError(res, 403, 'invalid_origin', 'This origin is not allowed.', null);
  }

  if (req.method !== 'POST') {
    return sendError(res, 405, 'method_not_allowed', 'Only POST requests are supported.', origin);
  }

  if (!process.env.GEMINI_API_KEY) {
    return sendError(res, 500, 'missing_api_key', 'Gemini API key is not configured on the server.', origin);
  }

  const identifier = extractIdentifier(req);
  if (!checkRateLimit(identifier)) {
    return sendError(res, 429, 'rate_limited', 'Too many requests. Try again in a minute.', origin);
  }

  let body: Partial<GenerateRequest> | null = null;
  try {
    if (req.body && typeof req.body === 'object') {
      body = req.body as Partial<GenerateRequest>;
    } else if (typeof req.body === 'string') {
      body = JSON.parse(req.body) as Partial<GenerateRequest>;
    } else if (req.body !== undefined && req.body !== null) {
      body = JSON.parse(String(req.body)) as Partial<GenerateRequest>;
    } else {
      body = {};
    }
  } catch (error) {
    console.error('Failed to parse request body', error);
    return sendError(res, 400, 'invalid_payload', 'Request body must be valid JSON.', origin);
  }

  if (!body || typeof body !== 'object') {
    return sendError(res, 400, 'invalid_payload', 'Request body must be valid JSON.', origin);
  }

  if (body.purpose === 'quiz-explanation') {
    if (!body.userName || !body.term || !body.chapter) {
      return sendError(res, 400, 'invalid_payload', 'Missing quiz explanation parameters.', origin);
    }
    try {
      const prompt = buildQuizPrompt(body as QuizExplanationPayload);
      const result = await generateContent(prompt);
      return sendJson(res, { result }, origin);
    } catch (error) {
      console.error('Quiz explanation generation failed', error);
      return sendError(res, 502, 'generation_failed', 'AI 선생님이 지금 조금 아픈가 봐요. 다시 시도해 주세요!', origin);
    }
  }

  if (body.purpose === 'chat-response') {
    if (!body.userName || !body.question) {
      return sendError(res, 400, 'invalid_payload', 'Missing chat question parameters.', origin);
    }
    try {
      const prompt = buildChatPrompt(body as ChatResponsePayload);
      const result = await generateContent(prompt);
      return sendJson(res, { result }, origin);
    } catch (error) {
      console.error('Chat generation failed', error);
      return sendError(res, 502, 'generation_failed', 'AI 선생님이 지금 조금 아픈가 봐요. 다시 시도해 주세요!', origin);
    }
  }

  return sendError(res, 400, 'invalid_payload', 'Unknown purpose provided.', origin);
}

export const config = {
  runtime: 'nodejs',
};
