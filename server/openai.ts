import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "YOUR_OPENAI_API_KEY" });

interface Message {
  role: string;
  content: string;
}

export async function generateAIResponse(messages: Message[]): Promise<string> {
  try {
    // Prepare system message for mental health support
    const systemMessage = {
      role: "system", 
      content: `You are MindMate, an empathetic AI mental wellness companion. 
      Your purpose is to provide emotional support, practical advice, and encourage 
      healthy coping mechanisms. Be kind, non-judgmental, and conversational in your responses. 
      If someone appears to be in crisis, gently suggest professional resources but never 
      claim to provide medical or professional psychological advice. You should offer 
      supportive, evidence-based suggestions for managing stress, anxiety, low mood, 
      and other common emotional challenges.`
    };

    // Add the system message at the beginning if not already present
    const conversationMessages = messages[0]?.role === "system" 
      ? messages 
      : [systemMessage, ...messages];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversationMessages,
      max_tokens: 500,
      temperature: 0.7, // Slightly creative but still focused
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
}

// Function to analyze mood based on journal entry
export async function analyzeMoodFromJournal(journalText: string): Promise<{
  suggestedMood: string;
  insights: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are a mental wellness AI that analyzes journal entries to identify emotions and provide helpful insights. " +
            "Based on the journal text, identify the primary mood (choosing from: happy, calm, neutral, sad, stressed) " +
            "and provide brief, thoughtful insights that might help the person. " +
            "Respond with JSON in this format: { 'suggestedMood': string, 'insights': string }"
        },
        {
          role: "user",
          content: journalText
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      suggestedMood: result.suggestedMood,
      insights: result.insights
    };
  } catch (error) {
    console.error("Error analyzing mood from journal:", error);
    return {
      suggestedMood: "neutral",
      insights: "I couldn't analyze your journal entry right now. Please try again later."
    };
  }
}

// Function to generate a personalized motivational quote
export async function generateMotivationalQuote(userContext?: string): Promise<{
  text: string;
  author: string;
}> {
  try {
    const contextPrompt = userContext 
      ? `Consider this context about the user: ${userContext}`
      : "Generate an inspiring quote that would be helpful for someone working on their mental wellness";
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are a quote generator that creates uplifting and motivational quotes for mental wellness. " +
            "Generate a meaningful, concise quote with an attributed author (real or 'Anonymous'). " +
            "The quote should be inspiring but realistic and grounded. " +
            "Respond with JSON in this format: { 'text': string, 'author': string }"
        },
        {
          role: "user",
          content: contextPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      text: result.text,
      author: result.author
    };
  } catch (error) {
    console.error("Error generating motivational quote:", error);
    return {
      text: "Every moment is a fresh beginning.",
      author: "T.S Eliot"
    };
  }
}
