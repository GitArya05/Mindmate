import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/hooks/useChatStore';

const ChatWithAI = () => {
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    isSending 
  } = useChatStore();
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputMessage.trim() || isSending) return;
    
    await sendMessage(inputMessage);
    setInputMessage('');
  };
  
  return (
    <div className="card bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 col-span-1 md:col-span-2 lg:col-span-1">
      <h3 className="font-heading font-medium text-lg mb-4 dark:text-white">
        Chat with MindMate AI
      </h3>
      
      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 h-[320px] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Default welcome message if no messages */}
              {messages.length === 0 && (
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                    </svg>
                  </div>
                  <div className="ml-3 bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-neutral-800 dark:text-neutral-200">
                      Hi there! I'm your MindMate AI companion. How can I help you today?
                    </p>
                  </div>
                </div>
              )}
              
              {/* Actual messages */}
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex items-start ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                      </svg>
                    </div>
                  )}
                  
                  <div 
                    className={`${
                      message.role === 'user' 
                        ? 'mr-3 bg-primary-100 dark:bg-primary-900 p-3 rounded-lg rounded-tr-none max-w-[80%]' 
                        : 'ml-3 bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none max-w-[80%]'
                    }`}
                  >
                    <p className={`${
                      message.role === 'user' 
                        ? 'text-primary-800 dark:text-primary-200' 
                        : 'text-neutral-800 dark:text-neutral-200'
                    }`}>
                      {message.content}
                    </p>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">You</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator when sending */}
              {isSending && (
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                    </svg>
                  </div>
                  <div className="ml-3 bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <form 
          onSubmit={handleSendMessage}
          className="p-3 border-t border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isSending}
              className="flex-1 px-4 py-2 rounded-l-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none transition disabled:opacity-60" 
              placeholder="Type your message..."
            />
            <button 
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-r-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWithAI;
