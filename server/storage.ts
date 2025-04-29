import { sessions, type Session, type InsertSession, type UpdateSession, type Mood, type Step } from "@shared/schema";

// Interface for session storage operations
export interface IStorage {
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: number, session: UpdateSession): Promise<Session | undefined>;
  getSession(id: number): Promise<Session | undefined>;
  listSessions(): Promise<Session[]>;
  getSessionsByMood(mood: Mood): Promise<Session[]>;
  getSessionsByStep(step: Step): Promise<Session[]>;
  getCompletedSessions(): Promise<Session[]>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private sessions: Map<number, Session>;
  private currentId: number;

  constructor() {
    this.sessions = new Map();
    this.currentId = 1;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentId++;
    const now = new Date();
    const session: Session = { 
      ...insertSession,
      id,
      timestampCreated: now,
      timestampUpdated: now 
    };
    
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: number, updateSession: UpdateSession): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    
    if (!session) {
      return undefined;
    }
    
    const updatedSession: Session = {
      ...session,
      ...updateSession,
      timestampUpdated: new Date()
    };
    
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async getSession(id: number): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async listSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values());
  }

  async getSessionsByMood(mood: Mood): Promise<Session[]> {
    return Array.from(this.sessions.values()).filter(session => session.mood === mood);
  }

  async getSessionsByStep(step: Step): Promise<Session[]> {
    return Array.from(this.sessions.values()).filter(session => session.step === step);
  }

  async getCompletedSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values()).filter(session => session.completed);
  }
}

// Export an instance of the storage implementation
export const storage = new MemStorage();
