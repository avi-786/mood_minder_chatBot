import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, updateSessionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new session
  app.post('/api/sessions', async (req, res) => {
    try {
      const sessionData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid session data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to create session' });
      }
    }
  });

  // Update a session by ID
  app.patch('/api/sessions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid session ID' });
      }
      
      const sessionData = updateSessionSchema.parse(req.body);
      const session = await storage.updateSession(id, sessionData);
      
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid session data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to update session' });
      }
    }
  });

  // Get a session by ID
  app.get('/api/sessions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid session ID' });
      }
      
      const session = await storage.getSession(id);
      
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve session' });
    }
  });

  // List all sessions
  app.get('/api/sessions', async (_req, res) => {
    try {
      const sessions = await storage.listSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve sessions' });
    }
  });

  // Get sessions by mood
  app.get('/api/sessions/mood/:mood', async (req, res) => {
    try {
      const { mood } = req.params;
      if (!['happy', 'okay', 'stressed'].includes(mood)) {
        return res.status(400).json({ message: 'Invalid mood' });
      }
      
      const sessions = await storage.getSessionsByMood(mood as any);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve sessions by mood' });
    }
  });

  // Get completed sessions
  app.get('/api/sessions/completed', async (_req, res) => {
    try {
      const sessions = await storage.getCompletedSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve completed sessions' });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
