import { GoogleGenAI } from "@google/genai";
import { Term, Chapter } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getQuizExplanationStream = async (term: Term, chapter: Chapter, userName: string) => {
  try {
    const prompt = `
      너는 10살짜리 한국 여자아이를 위한 친절하고 다정한 경제 선생님이야. 
      '${userName}'라는 학생이 방금 '${term.term}'에 대한 퀴즈 문제를 틀렸어.
      
      이 용어에 대한 정보는 다음과 같아:
      - 간단 정의: ${term.simple_definition}
      - 어린이용 비유: ${term.kid_friendly_explanation}
      - 관련 이야기: ${term.example_story}

      그리고 이 챕터에서 함께 배우는 다른 중요한 단어들은 '${chapter.secondary_terms.join(', ')}'가 있어. 이 단어들도 자연스럽게 활용해서 설명해주면 '${userName}'가 더 잘 이해할 수 있을 거야.

      학생의 눈높이에 맞춰서, '${userName}'의 이름을 부르면서 아주 쉽고 재미있게, 새로운 비유나 예시를 들어 2~3문장으로 짧게 설명해줘. 
      괜찮다고 격려하면서 시작해줘. 예를 들면: "${userName}아, 괜찮아! '${term.term}'는 말이야..." 처럼 말이야.
      반드시 한국어로 대답해줘.
    `;
    
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response;
  } catch (error) {
    console.error("Error generating explanation stream:", error);
    throw new Error("AI 선생님이 지금 조금 아픈가 봐요. 다시 시도해 주세요!");
  }
};


export const getChatbotResponseStream = async (question: string, userName: string) => {
  try {
    const prompt = `
      너는 '리라'라는 이름의 AI 경제 선생님이야. 10살짜리 '${userName}'와 대화하고 있어.
      '${userName}'가 경제 용어에 대해 질문했어: "${question}"

      다음 규칙을 꼭 지켜서 대답해줘:
      1. 경제 용어에 대해서만 대답해야 해.
      2. 만약 경제와 관련 없는 질문을 하면, "나는 경제 이야기만 들려줄 수 있어! 궁금한 경제 용어가 있니?"라고 귀엽게 대답해줘.
      3. 답변은 항상 2~3문장으로, 아주 쉽고 재미있는 비유를 들어서 설명해줘.
      4. 항상 '${userName}'의 이름을 부르며 친근하게 말해줘.
      5. 반드시 한국어로만 대답해.
    `;
    
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response;
  } catch (error) {
    console.error("Error generating chatbot response stream:", error);
    throw new Error("AI 선생님이 지금 조금 아픈가 봐요. 다시 시도해 주세요!");
  }
};