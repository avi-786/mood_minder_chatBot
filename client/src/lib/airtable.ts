import { type Mood } from "@shared/schema";
import { apiRequest } from "./queryClient";

// Type for Airtable record
interface AirtableRecord {
  id: number;
  mood: Mood;
  step?: number;
  completed: boolean;
  timestampCreated: string;
  timestampUpdated: string;
}

// Interface for session data logging
export interface SessionLog {
  mood: Mood;
  step?: number;
  completed: boolean;
}

/**
 * Creates a new meditation session in the backend
 */
export async function createSession(mood: Mood): Promise<AirtableRecord> {
  const response = await apiRequest("POST", "/api/sessions", {
    mood,
    step: 1,
    completed: false,
  });
  
  return await response.json();
}

/**
 * Updates an existing session with new step or completion status
 */
export async function updateSession(
  id: number,
  data: { step?: number; completed?: boolean }
): Promise<AirtableRecord> {
  const response = await apiRequest("PATCH", `/api/sessions/${id}`, data);
  return await response.json();
}

/**
 * Retrieves a session by ID
 */
export async function getSession(id: number): Promise<AirtableRecord> {
  const response = await apiRequest("GET", `/api/sessions/${id}`);
  return await response.json();
}

/**
 * Retrieves all sessions
 */
export async function getSessions(): Promise<AirtableRecord[]> {
  const response = await apiRequest("GET", "/api/sessions");
  return await response.json();
}

/**
 * Retrieves sessions by mood
 */
export async function getSessionsByMood(mood: Mood): Promise<AirtableRecord[]> {
  const response = await apiRequest("GET", `/api/sessions/mood/${mood}`);
  return await response.json();
}

/**
 * Retrieves all completed sessions
 */
export async function getCompletedSessions(): Promise<AirtableRecord[]> {
  const response = await apiRequest("GET", "/api/sessions/completed");
  return await response.json();
}
