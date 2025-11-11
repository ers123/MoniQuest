import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, LiraAvatarIcon } from './icons';
import { useApp } from '../App';
import { getChatbotResponseStream } from '../services/geminiService';

const renderMarkdown = (text: string) => {
  if (!text) return null;
  // Bolder markdown for **text**
  return text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
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
            const stream = await getChatbotResponseStream(input, userName);
            let responseText = '';
            for await (const chunk of stream) {
                responseText += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...aiMessageTemplate, text: responseText };
                    return newMessages;
                });
            }
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-40 animate-fadeIn" onClick={onClose}>
            <div
                className="bg-white w-full max-w-lg h-[80vh] max-h-[700px] rounded-t-3xl shadow-2xl flex flex-col animate-fadeInUp"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b flex justify-between items-center bg-purple-50 rounded-t-3xl">
                    <h2 className="text-xl font-gamja text-purple-700">리라에게 물어봐!</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <LiraAvatarIcon className="w-8 h-8 text-purple-400" />}
                            <div className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'user' ? 'bg-pink-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {renderMarkdown(msg.text)}
                                {isLoading && msg.sender === 'ai' && index === messages.length -1 && <span className="inline-block w-1 h-4 bg-gray-600 animate-pulse ml-1 align-bottom"></span> }
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <footer className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="경제 용어를 물어보세요..."
                            className="flex-1 px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-pink-500 text-white w-12 h-12 rounded-full font-bold hover:bg-pink-600 disabled:bg-gray-400 transition-transform transform hover:scale-110 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
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
                className="fixed bottom-6 right-6 bg-purple-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-transform transform hover:scale-110 animate-pulse"
                aria-label="궁금한 거 물어보기"
            >
                <ChatIcon className="w-8 h-8" />
            </button>
        </>
    );
};

export default Chatbot;