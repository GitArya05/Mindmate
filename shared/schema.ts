import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
});

// Mood entries schema
export const moodEntries = pgTable("mood_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  mood: text("mood").notNull(), // happy, calm, neutral, sad, stressed
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMoodEntrySchema = createInsertSchema(moodEntries).pick({
  userId: true,
  mood: true,
  note: true,
});

// Thought board posts schema
export const thoughtPosts = pgTable("thought_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertThoughtPostSchema = createInsertSchema(thoughtPosts).pick({
  userId: true,
  content: true,
});

// Self-care checklist schema
export const selfCareChecklist = pgTable("self_care_checklist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  water: boolean("water").default(false),
  exercise: boolean("exercise").default(false),
  sleep: boolean("sleep").default(false),
  journal: boolean("journal").default(false),
  mindfulness: boolean("mindfulness").default(false),
  date: timestamp("date").defaultNow(),
});

export const insertSelfCareChecklistSchema = createInsertSchema(selfCareChecklist).pick({
  userId: true,
  water: true,
  exercise: true,
  sleep: true,
  journal: true,
  mindfulness: true,
});

// AI Chat conversations
export const chatConversations = pgTable("chat_conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  messages: jsonb("messages").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertChatConversationSchema = createInsertSchema(chatConversations).pick({
  userId: true,
  messages: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type MoodEntry = typeof moodEntries.$inferSelect;
export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;

export type ThoughtPost = typeof thoughtPosts.$inferSelect;
export type InsertThoughtPost = z.infer<typeof insertThoughtPostSchema>;

export type SelfCareChecklist = typeof selfCareChecklist.$inferSelect;
export type InsertSelfCareChecklist = z.infer<typeof insertSelfCareChecklistSchema>;

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = z.infer<typeof insertChatConversationSchema>;
