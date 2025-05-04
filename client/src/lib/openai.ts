import { ChatMessage } from '@/types';

// Function to send a message to the AI assistant
export const sendMessageToAI = async (
  message: string,
  messages: ChatMessage[] = []
): Promise<ChatMessage> => {
  try {
    // If we have existing messages, send them along
    let payload;
    if (messages.length > 0) {
      // Add the new user message
      const updatedMessages = [
        ...messages,
        { role: 'user', content: message }
      ];
      payload = { messages: updatedMessages };
    } else {
      // Just send the single message
      payload = { message };
    }

    // Use a relative URL to hit our backend API
    const response = await fetch('/api/chat/1/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the latest assistant message from the conversation
    const assistantMessages = data.messages.filter(
      (msg: ChatMessage) => msg.role === 'assistant'
    );
    return assistantMessages[assistantMessages.length - 1];
  } catch (error) {
    console.error('Error sending message to AI:', error);
    return {
      role: 'assistant',
      content: 'I apologize, but I am having trouble connecting right now. Please try again later.'
    };
  }
};

// Function to get a random quote
export const getRandomQuote = async (): Promise<{ text: string; author: string }> => {
  try {
    const response = await fetch('/api/quotes/random');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return {
      text: 'Every moment is a fresh beginning.',
      author: 'T.S Eliot'
    };
  }
};

// Function to analyze mood from journal entry
export const analyzeMoodFromJournal = async (
  journalText: string
): Promise<{ suggestedMood: string; insights: string }> => {
  try {
    const response = await fetch('/api/journal/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: journalText }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing journal:', error);
    return {
      suggestedMood: 'neutral',
      insights: 'Unable to analyze your journal entry at this time.'
    };
  }
};
