import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Sparkles, User, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { MOCK_HOLDINGS, MOCK_TRANSACTIONS, USER_NAME, PLAN_NAME } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello ${USER_NAME.split(' ')[0]}! I'm your Fidelity Virtual Assistant. I can help you understand your ${PLAN_NAME} account, explain financial terms, or analyze your current holdings. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare context for the AI
    const totalBalance = MOCK_HOLDINGS.reduce((acc, curr) => acc + curr.balance, 0);
    const contextData = `
      User Name: ${USER_NAME}
      Plan Name: ${PLAN_NAME}
      Total Balance: $${totalBalance.toLocaleString()}
      
      Holdings:
      ${MOCK_HOLDINGS.map(h => `- ${h.name} (${h.ticker}): $${h.balance.toLocaleString()} (${h.assetClass})`).join('\n')}
      
      Recent Transactions:
      ${MOCK_TRANSACTIONS.slice(0, 3).map(t => `- ${t.date}: ${t.description} $${t.amount}`).join('\n')}
    `;

    try {
      // Simulate "Thinking" time for better UX if API is too fast, or just natural delay
      const aiResponseText = await sendMessageToGemini(messages, userMsg.text, contextData);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiResponseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#5d9632] text-white p-4 rounded-full shadow-lg hover:bg-[#4a7a28] transition-all hover:scale-105 z-50 flex items-center gap-2 group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="font-medium pr-1 group-hover:block hidden transition-all duration-300">Virtual Assistant</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-0 right-4 md:right-8 bg-white shadow-2xl rounded-t-lg border border-gray-200 z-50 transition-all duration-300 flex flex-col ${isMinimized ? 'h-14 w-72' : 'h-[600px] w-[400px] max-w-[90vw]'}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 bg-[#5d9632] text-white rounded-t-lg cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-sm">Fidelity Virtual Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
            className="p-1 hover:bg-white/20 rounded"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-300' : 'bg-[#e8f5e9]'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-gray-600" /> : <Bot className="w-5 h-5 text-[#5d9632]" />}
                </div>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#5d9632] text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#5d9632]" />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about your portfolio..."
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5d9632] focus:border-transparent resize-none h-10 min-h-[40px] max-h-24 scrollbar-hide text-sm"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#5d9632] hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex justify-center">
               <span className="text-[10px] text-gray-400">AI responses are for educational purposes only.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;