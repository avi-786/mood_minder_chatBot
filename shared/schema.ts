import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define user mood options
export const MOODS = ['happy', 'okay', 'stressed'] as const;
export type Mood = typeof MOODS[number];

// Define session steps
export const STEPS = [1, 2, 3] as const;
export type Step = typeof STEPS[number];

// Sessions table definition
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  mood: text("mood").notNull().$type<Mood>(),
  step: integer("step").$type<Step>(),
  completed: boolean("completed").default(false).notNull(),
  timestampCreated: timestamp("timestamp_created").defaultNow().notNull(),
  timestampUpdated: timestamp("timestamp_updated").defaultNow().notNull(),
});

// Schema for inserting a new session
export const insertSessionSchema = createInsertSchema(sessions).pick({
  mood: true,
  step: true,
  completed: true,
});

// Schema for updating a session
export const updateSessionSchema = createInsertSchema(sessions).pick({
  step: true,
  completed: true,
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;
export type Session = typeof sessions.$inferSelect;
