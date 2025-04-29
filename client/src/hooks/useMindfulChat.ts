import { useState, useEffect, useCallback } from "react";
import { type Mood } from "@shared/schema";
import { createSession, updateSession } from "@/lib/airtable";
import { StatusMessageType } from "@/components/StatusMessage";
import { getChatContent, MessageType } from "@/data/chatContent";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export function useMindfulChat() {
  // Session state
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessageType | null>(null);
  const [showStatus, setShowStatus] = useState(false);

  // Chat messages
  const [messages, setMessages] = useState<MessageType[]>([]);

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: (mood: Mood) => createSession(mood),
    onSuccess: (data) => {
      setSessionId(data.id);
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
    },
    onError: () => {
      showStatusMessage(
        "Failed to create session record. Please try again.",
        "error"
      );
    }
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { step?: number; completed?: boolean } }) => 
      updateSession(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
    },
    onError: () => {
      showStatusMessage(
        "Failed to update session record. Please try again.",
        "error"
      );
    }
  });

  // Show status message and auto-hide after delay
  const showStatusMessage = useCallback((text: string, type: "success" | "error" | "info") => {
    setStatusMessage({ text, type });
    setShowStatus(true);
    
    setTimeout(() => {
      setShowStatus(false);
      
      // Clear message after animation completes
      setTimeout(() => {
        setStatusMessage(null);
      }, 300);
    }, 3000);
  }, []);

  // Load chat content when step changes
  useEffect(() => {
    if (isSessionStarted && selectedMood && currentStep > 0) {
      const chatContent = getChatContent(selectedMood, currentStep);
      setMessages(chatContent);
      
      // Update session step in the backend
      if (sessionId) {
        updateSessionMutation.mutate({
          id: sessionId,
          data: { step: currentStep }
        });
      }
    }
  }, [currentStep, selectedMood, isSessionStarted, sessionId, updateSessionMutation]);

  // Handle mood selection
  const handleMoodSelect = useCallback((mood: Mood) => {
    setSelectedMood(mood);
    setCurrentStep(1);
    setIsSessionStarted(true);
    
    // Create a new session in the backend
    createSessionMutation.mutate(mood);
  }, [createSessionMutation]);

  // Navigate to next step
  const handleNext = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  }, [currentStep]);

  // Navigate to previous step
  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  }, [currentStep]);

  // Restart the flow
  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setSelectedMood(null);
    setIsSessionStarted(false);
    setMessages([]);
    setSessionId(null);
  }, []);

  // Complete the session
  const handleComplete = useCallback(() => {
    if (sessionId) {
      updateSessionMutation.mutate({
        id: sessionId,
        data: { completed: true }
      });
      
      showStatusMessage("Session recorded successfully", "success");
      
      // Restart after a delay
      setTimeout(handleRestart, 2000);
    }
  }, [sessionId, handleRestart, showStatusMessage, updateSessionMutation]);

  // Log session to Airtable (used for testing)
  const logSessionToAirtable = useCallback(() => {
    if (sessionId) {
      updateSessionMutation.mutate({
        id: sessionId,
        data: { completed: true }
      });
      
      showStatusMessage("Session recorded successfully", "success");
    } else {
      showStatusMessage("No active session to record", "error");
    }
  }, [sessionId, showStatusMessage, updateSessionMutation]);

  return {
    currentStep,
    selectedMood,
    isSessionStarted,
    messages,
    statusMessage,
    showStatus,
    handleMoodSelect,
    handleNext,
    handlePrevious,
    handleRestart,
    handleComplete,
    logSessionToAirtable,
  };
}
