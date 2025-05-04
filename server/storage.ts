import { 
  users, 
  User, 
  InsertUser, 
  moodEntries, 
  MoodEntry, 
  InsertMoodEntry,
  thoughtPosts,
  ThoughtPost,
  InsertThoughtPost,
  selfCareChecklist,
  SelfCareChecklist,
  InsertSelfCareChecklist,
  chatConversations,
  ChatConversation,
  InsertChatConversation
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Mood entry methods
  getMoodEntries(userId: number, limit?: number): Promise<MoodEntry[]>;
  getMoodEntriesByDateRange(userId: number, startDate: Date, endDate: Date): Promise<MoodEntry[]>;
  createMoodEntry(moodEntry: InsertMoodEntry): Promise<MoodEntry>;
  
  // Thought post methods
  getThoughtPosts(limit?: number): Promise<ThoughtPost[]>;
  createThoughtPost(thoughtPost: InsertThoughtPost): Promise<ThoughtPost>;
  likeThoughtPost(id: number): Promise<ThoughtPost | undefined>;
  
  // Self-care checklist methods
  getSelfCareChecklist(userId: number, date: Date): Promise<SelfCareChecklist | undefined>;
  updateSelfCareChecklist(id: number, data: Partial<InsertSelfCareChecklist>): Promise<SelfCareChecklist | undefined>;
  createSelfCareChecklist(checklist: InsertSelfCareChecklist): Promise<SelfCareChecklist>;
  
  // Chat conversation methods
  getChatConversation(userId: number): Promise<ChatConversation | undefined>;
  createChatConversation(conversation: InsertChatConversation): Promise<ChatConversation>;
  updateChatConversation(id: number, messages: any[]): Promise<ChatConversation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private moodEntries: Map<number, MoodEntry>;
  private thoughtPosts: Map<number, ThoughtPost>;
  private selfCareChecklists: Map<number, SelfCareChecklist>;
  private chatConversations: Map<number, ChatConversation>;
  
  private userCurrentId: number;
  private moodEntryCurrentId: number;
  private thoughtPostCurrentId: number;
  private selfCareChecklistCurrentId: number;
  private chatConversationCurrentId: number;

  constructor() {
    this.users = new Map();
    this.moodEntries = new Map();
    this.thoughtPosts = new Map();
    this.selfCareChecklists = new Map();
    this.chatConversations = new Map();
    
    this.userCurrentId = 1;
    this.moodEntryCurrentId = 1;
    this.thoughtPostCurrentId = 1;
    this.selfCareChecklistCurrentId = 1;
    this.chatConversationCurrentId = 1;
    
    // Add some dummy data for thought posts
    this.createThoughtPost({
      userId: 0,
      content: "I was struggling with anxiety for months, but practicing daily mindfulness has been life-changing. If you're going through it too, know that it gets better. ❤️"
    });
    this.thoughtPosts.get(1)!.likes = 24;
    this.thoughtPosts.get(1)!.createdAt = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    
    this.createThoughtPost({
      userId: 0,
      content: "I've been using this app for a month now, and tracking my moods has helped me realize I feel best after exercise and social time. Small habits really do add up!"
    });
    this.thoughtPosts.get(2)!.likes = 18;
    this.thoughtPosts.get(2)!.createdAt = new Date(Date.now() - 4 * 60 * 60 * 1000); // 4 hours ago
    
    this.createThoughtPost({
      userId: 0,
      content: "Does anyone else find that listening to rain sounds helps with anxiety? It's been my go-to when feeling overwhelmed with school work."
    });
    this.thoughtPosts.get(3)!.likes = 32;
    this.thoughtPosts.get(3)!.createdAt = new Date(Date.now() - 24 * 60 * 60 * 1000); // Yesterday
    
    this.createThoughtPost({
      userId: 0,
      content: "Just wanted to say thank you to whoever created this app. Having a safe space to track my emotions without judgment has been so helpful during my finals."
    });
    this.thoughtPosts.get(4)!.likes = 45;
    this.thoughtPosts.get(4)!.createdAt = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Mood entry methods
  async getMoodEntries(userId: number, limit: number = 7): Promise<MoodEntry[]> {
    const entries = Array.from(this.moodEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    return entries;
  }
  
  async getMoodEntriesByDateRange(userId: number, startDate: Date, endDate: Date): Promise<MoodEntry[]> {
    const entries = Array.from(this.moodEntries.values())
      .filter(entry => entry.userId === userId && 
               entry.createdAt >= startDate && 
               entry.createdAt <= endDate)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return entries;
  }
  
  async createMoodEntry(insertMoodEntry: InsertMoodEntry): Promise<MoodEntry> {
    const id = this.moodEntryCurrentId++;
    const now = new Date();
    const moodEntry: MoodEntry = { ...insertMoodEntry, id, createdAt: now };
    this.moodEntries.set(id, moodEntry);
    return moodEntry;
  }
  
  // Thought post methods
  async getThoughtPosts(limit: number = 10): Promise<ThoughtPost[]> {
    const posts = Array.from(this.thoughtPosts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    return posts;
  }
  
  async createThoughtPost(insertThoughtPost: InsertThoughtPost): Promise<ThoughtPost> {
    const id = this.thoughtPostCurrentId++;
    const now = new Date();
    const thoughtPost: ThoughtPost = { 
      ...insertThoughtPost, 
      id, 
      likes: 0, 
      createdAt: now 
    };
    this.thoughtPosts.set(id, thoughtPost);
    return thoughtPost;
  }
  
  async likeThoughtPost(id: number): Promise<ThoughtPost | undefined> {
    const post = this.thoughtPosts.get(id);
    if (!post) return undefined;
    
    post.likes += 1;
    this.thoughtPosts.set(id, post);
    return post;
  }
  
  // Self-care checklist methods
  async getSelfCareChecklist(userId: number, date: Date): Promise<SelfCareChecklist | undefined> {
    // Find a checklist for the specified user and date (same day)
    const dateString = date.toISOString().split('T')[0];
    return Array.from(this.selfCareChecklists.values())
      .find(checklist => 
        checklist.userId === userId && 
        checklist.date.toISOString().split('T')[0] === dateString
      );
  }
  
  async updateSelfCareChecklist(id: number, data: Partial<InsertSelfCareChecklist>): Promise<SelfCareChecklist | undefined> {
    const checklist = this.selfCareChecklists.get(id);
    if (!checklist) return undefined;
    
    const updatedChecklist: SelfCareChecklist = {
      ...checklist,
      ...data,
    };
    this.selfCareChecklists.set(id, updatedChecklist);
    return updatedChecklist;
  }
  
  async createSelfCareChecklist(insertChecklist: InsertSelfCareChecklist): Promise<SelfCareChecklist> {
    const id = this.selfCareChecklistCurrentId++;
    const now = new Date();
    const checklist: SelfCareChecklist = { ...insertChecklist, id, date: now };
    this.selfCareChecklists.set(id, checklist);
    return checklist;
  }
  
  // Chat conversation methods
  async getChatConversation(userId: number): Promise<ChatConversation | undefined> {
    return Array.from(this.chatConversations.values())
      .find(conversation => conversation.userId === userId);
  }
  
  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    const id = this.chatConversationCurrentId++;
    const now = new Date();
    const conversation: ChatConversation = { 
      ...insertConversation, 
      id, 
      createdAt: now,
      updatedAt: now 
    };
    this.chatConversations.set(id, conversation);
    return conversation;
  }
  
  async updateChatConversation(id: number, messages: any[]): Promise<ChatConversation | undefined> {
    const conversation = this.chatConversations.get(id);
    if (!conversation) return undefined;
    
    const updatedConversation: ChatConversation = {
      ...conversation,
      messages,
      updatedAt: new Date()
    };
    this.chatConversations.set(id, updatedConversation);
    return updatedConversation;
  }
}

export const storage = new MemStorage();
