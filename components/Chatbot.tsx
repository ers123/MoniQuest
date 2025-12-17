import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { getChatbotResponse } from '../services/geminiService';
import LiraMascot from './LiraMascot';

const renderMarkdown = (text: string) => {
  if (!text) return null;
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-bold text-purple-700">{part}</strong> : part
  );
};

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatbotModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { userName } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: `안녕, ${userName}! 나는 경제 요정 리라야. 궁금한 경제 용어가 있으면 뭐든지 물어봐! ✨` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageTemplate: Message = { sender: 'ai', text: '' };
    setMessages(prev => [...prev, aiMessageTemplate]);

    try {
      const responseText = await getChatbotResponse(input, userName);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { ...aiMessageTemplate, text: responseText };
        return newMessages;
      });
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { ...aiMessageTemplate, text: '미안, 지금은 대답하기가 조금 힘들어. 나중에 다시 물어봐 줄래?' };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 modal-backdrop flex items-end justify-center z-40 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg h-[85vh] max-h-[700px] rounded-t-3xl shadow-2xl flex flex-col animate-fade-in-up overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 border-b bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LiraMascot size="sm" mood="happy" animate={false} />
              <div>
                <h2 className="text-lg font-gamja text-white">리라에게 물어봐!</h2>
                <p className="text-purple-100 text-xs">경제 용어 궁금증 해결사</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-purple-50 to-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 mb-1">
                  <LiraMascot size="sm" mood="happy" animate={false} />
                </div>
              )}
              <div
                className={`
                  p-3 rounded-2xl max-w-[80%] shadow-sm
                  ${msg.sender === 'user'
                    ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-br-md'
                    : 'glass text-gray-800 rounded-bl-md'
                  }
                `}
              >
                {renderMarkdown(msg.text)}
                {isLoading && msg.sender === 'ai' && index === messages.length - 1 && (
                  <span className="inline-flex gap-1 ml-1">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t bg-white">
            <p className="text-xs text-gray-400 mb-2">이런 것도 물어볼 수 있어요:</p>
            <div className="flex flex-wrap gap-2">
              {['물가가 뭐야?', '주식이 뭐야?', '은행은 왜 필요해?'].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-600 text-sm hover:bg-purple-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <footer className="p-4 border-t bg-white pb-safe">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="경제 용어를 물어보세요..."
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-800 placeholder-gray-400 rounded-full
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="btn-secondary w-12 h-12 rounded-full font-bold disabled:opacity-50 disabled:transform-none
                flex items-center justify-center touch-feedback"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 btn-primary w-16 h-16 rounded-full shadow-lg
          flex items-center justify-center touch-feedback z-30 pb-safe"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))' }}
        aria-label="궁금한 거 물어보기"
      >
        <LiraMascot size="sm" mood="waving" animate={false} />
      </button>
    </>
  );
};

export default Chatbot;
