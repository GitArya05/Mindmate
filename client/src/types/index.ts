// User types
export interface User {
  id: number;
  username: string;
  displayName?: string;
}

// Mood types
export type MoodType = "happy" | "calm" | "neutral" | "sad" | "stressed";

export interface MoodEntry {
  id: number;
  userId: number;
  mood: MoodType;
  note?: string;
  createdAt: Date;
}

// Community thought types
export interface ThoughtPost {
  id: number;
  userId: number;
  content: string;
  likes: number;
  createdAt: Date;
}

// Self-care checklist types
export interface SelfCareItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface SelfCareChecklist {
  id: number;
  userId: number;
  water: boolean;
  exercise: boolean;
  sleep: boolean;
  journal: boolean;
  mindfulness: boolean;
  date: Date;
}

// Chat message types
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatConversation {
  id: number;
  userId: number;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Quote type
export interface Quote {
  text: string;
  author: string;
}

// Sound/Relaxation types
export interface Sound {
  id: string;
  name: string;
  src: string;
  image: string;
  isPlaying: boolean;
  progress: number;
}
