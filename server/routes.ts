import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertMoodEntrySchema,
  insertThoughtPostSchema,
  insertSelfCareChecklistSchema,
  insertChatConversationSchema
} from "@shared/schema";
import { generateAIResponse } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  });

  // Mood entry routes
  app.post("/api/mood-entries", async (req, res) => {
    try {
      const validatedData = insertMoodEntrySchema.parse(req.body);
      const moodEntry = await storage.createMoodEntry(validatedData);
      res.status(201).json(moodEntry);
    } catch (error) {
      res.status(400).json({ message: "Invalid mood entry data", error });
    }
  });

  app.get("/api/mood-entries/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const entries = await storage.getMoodEntries(userId, limit);
    res.json(entries);
  });

  app.get("/api/mood-entries/:userId/range", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const startDate = req.query.start ? new Date(req.query.start as string) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endDate = req.query.end ? new Date(req.query.end as string) : new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const entries = await storage.getMoodEntriesByDateRange(userId, startDate, endDate);
    res.json(entries);
  });

  // Thought post routes
  app.post("/api/thought-posts", async (req, res) => {
    try {
      const validatedData = insertThoughtPostSchema.parse(req.body);
      const thoughtPost = await storage.createThoughtPost(validatedData);
      res.status(201).json(thoughtPost);
    } catch (error) {
      res.status(400).json({ message: "Invalid thought post data", error });
    }
  });

  app.get("/api/thought-posts", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const posts = await storage.getThoughtPosts(limit);
    res.json(posts);
  });

  app.post("/api/thought-posts/:id/like", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const updatedPost = await storage.likeThoughtPost(id);
    if (!updatedPost) {
      return res.status(404).json({ message: "Thought post not found" });
    }

    res.json(updatedPost);
  });

  // Self-care checklist routes
  app.post("/api/self-care", async (req, res) => {
    try {
      const validatedData = insertSelfCareChecklistSchema.parse(req.body);
      const checklist = await storage.createSelfCareChecklist(validatedData);
      res.status(201).json(checklist);
    } catch (error) {
      res.status(400).json({ message: "Invalid self-care checklist data", error });
    }
  });

  app.get("/api/self-care/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const date = req.query.date ? new Date(req.query.date as string) : new Date();
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }

    const checklist = await storage.getSelfCareChecklist(userId, date);
    if (!checklist) {
      return res.status(404).json({ message: "Self-care checklist not found" });
    }

    res.json(checklist);
  });

  app.patch("/api/self-care/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid checklist ID" });
    }

    const updatedChecklist = await storage.updateSelfCareChecklist(id, req.body);
    if (!updatedChecklist) {
      return res.status(404).json({ message: "Self-care checklist not found" });
    }

    res.json(updatedChecklist);
  });

  // Chat conversation routes
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatConversationSchema.parse(req.body);
      const conversation = await storage.createChatConversation(validatedData);
      res.status(201).json(conversation);
    } catch (error) {
      res.status(400).json({ message: "Invalid chat conversation data", error });
    }
  });

  app.get("/api/chat/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const conversation = await storage.getChatConversation(userId);
    if (!conversation) {
      return res.status(404).json({ message: "Chat conversation not found" });
    }

    res.json(conversation);
  });

  app.post("/api/chat/:id/message", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid conversation ID" });
    }

    const { message, messages } = req.body;
    if (!message && !messages) {
      return res.status(400).json({ message: "Message is required" });
    }

    const conversation = await storage.getChatConversation(id);
    if (!conversation) {
      return res.status(404).json({ message: "Chat conversation not found" });
    }

    let updatedMessages;
    if (messages) {
      updatedMessages = messages;
    } else {
      updatedMessages = [
        ...conversation.messages,
        { role: "user", content: message }
      ];
    }

    // Generate AI response
    try {
      const aiResponse = await generateAIResponse(updatedMessages);
      updatedMessages = [
        ...updatedMessages,
        { role: "assistant", content: aiResponse }
      ];

      const updatedConversation = await storage.updateChatConversation(id, updatedMessages);
      res.json(updatedConversation);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate AI response", error });
    }
  });

  // Routes for utility endpoints

  // Get a random quote
  app.get("/api/quotes/random", (req, res) => {
    const quotes = [
      {
        text: "You don't have to see the whole staircase, just take the first step.",
        author: "Martin Luther King Jr."
      },
      {
        text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
        author: "Albus Dumbledore"
      },
      {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
      },
      {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
      },
      {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs"
      }
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
  });

  const httpServer = createServer(app);
  return httpServer;
}
