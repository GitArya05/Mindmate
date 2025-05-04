import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/hooks/useChatStore';
import FeatureContainer from './FeatureContainer';

// Chat AI icon for the feature container
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
  </svg>
);

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
    <FeatureContainer title="Chat with MindMate AI" icon={<ChatIcon />}>
      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-primary/10 dark:border-primary/20 h-[320px] md:h-[400px] lg:h-[500px] flex flex-col shadow-inner">
        <div className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Default welcome message if no messages */}
              {messages.length === 0 && (
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                    </svg>
                  </div>
                  <div className="ml-3 bg-white dark:bg-neutral-800 p-4 rounded-xl rounded-tl-none max-w-[80%] shadow-sm">
                    <p className="text-foreground dark:text-neutral-200">
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
                    <div className="h-10 w-10 rounded-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                      </svg>
                    </div>
                  )}
                  
                  <div 
                    className={`${
                      message.role === 'user' 
                        ? 'mr-3 bg-highlight/20 dark:bg-highlight/30 p-4 rounded-xl rounded-tr-none max-w-[80%] shadow-sm' 
                        : 'ml-3 bg-white dark:bg-neutral-800 p-4 rounded-xl rounded-tl-none max-w-[80%] shadow-sm'
                    }`}
                  >
                    <p className={`${
                      message.role === 'user' 
                        ? 'text-foreground dark:text-foreground' 
                        : 'text-foreground dark:text-neutral-200'
                    }`}>
                      {message.content}
                    </p>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="h-10 w-10 rounded-full bg-secondary/20 dark:bg-secondary/30 text-secondary-foreground dark:text-secondary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-sm font-medium">You</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator when sending */}
              {isSending && (
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                    </svg>
                  </div>
                  <div className="ml-3 bg-white dark:bg-neutral-800 p-4 rounded-xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 bg-primary/50 dark:bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-primary/50 dark:bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-primary/50 dark:bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
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
          className="p-4 border-t border-primary/10 dark:border-primary/20"
        >
          <div className="flex items-center">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isSending}
              className="flex-1 px-4 py-3 rounded-l-xl border border-primary/20 dark:border-primary/30 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all disabled:opacity-60" 
              placeholder="Type your message..."
            />
            <button 
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </FeatureContainer>
  );
};

export default ChatWithAI;
