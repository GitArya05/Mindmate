import { useState, useEffect } from 'react';
import { ChatMessage } from '@/types';
import { sendMessageToAI } from '@/lib/openai';

export const useChatStore = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  // Load messages from localStorage on initialization
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = localStorage.getItem('mindmate_chat_messages');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
        
        // If no saved messages, create a welcome message
        if (!savedMessages) {
          const welcomeMessage: ChatMessage = {
            role: 'assistant',
            content: "Hi there! I'm your MindMate AI companion. How can I help you today?"
          };
          setMessages([welcomeMessage]);
          localStorage.setItem('mindmate_chat_messages', JSON.stringify([welcomeMessage]));
        }
      } catch (error) {
        console.error('Error loading chat messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMessages();
  }, []);
  
  // Save messages to localStorage when updated
  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      localStorage.setItem('mindmate_chat_messages', JSON.stringify(messages));
    }
  }, [messages, isLoading]);
  
  // Send a new message to the AI
  const sendMessage = async (content: string) => {
    if (!content.trim()) return false;
    
    try {
      setIsSending(true);
      
      // Add user message to state
      const userMessage: ChatMessage = { role: 'user', content };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      // Send to AI and get response
      const assistantMessage = await sendMessageToAI(content, messages);
      
      // Add AI response to state
      setMessages([...updatedMessages, assistantMessage]);
      
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    } finally {
      setIsSending(false);
    }
  };
  
  // Clear all messages
  const clearMessages = () => {
    const welcomeMessage: ChatMessage = {
      role: 'assistant',
      content: "Hi there! I'm your MindMate AI companion. How can I help you today?"
    };
    setMessages([welcomeMessage]);
    localStorage.setItem('mindmate_chat_messages', JSON.stringify([welcomeMessage]));
  };
  
  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    clearMessages
  };
};
