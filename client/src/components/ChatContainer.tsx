import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Mood } from "@shared/schema";
import MoodSelector from "./MoodSelector";
import { MessageType } from "@/data/chatContent";

interface ChatContainerProps {
  currentStep: number;
  selectedMood: Mood | null;
  isSessionStarted: boolean;
  messages: MessageType[];
  onMoodSelect: (mood: Mood) => void;
  onRestart: () => void;
  onComplete: () => void;
}

export default function ChatContainer({
  currentStep,
  selectedMood,
  isSessionStarted,
  messages,
  onMoodSelect,
  onRestart,
  onComplete,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFinalOptions, setShowFinalOptions] = useState(false);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show final options when reaching the end of step 3
  useEffect(() => {
    if (currentStep === 3 && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setShowFinalOptions(lastMessage.text.includes("another session") || lastMessage.text.includes("Would you like to"));
    } else {
      setShowFinalOptions(false);
    }
  }, [currentStep, messages]);

  return (
    <div className="flex-grow bg-neutral-100 rounded-2xl p-4 overflow-y-auto mb-4 flex flex-col relative">
      {!isSessionStarted ? (
        // Initial state - Mood Selection
        <div className="flex flex-col h-full">
          <ChatBubble type="system" text="Hello! 👋 How are you feeling today?" />
          <MoodSelector onMoodSelect={onMoodSelect} />
        </div>
      ) : (
        // Session started - Show chat messages
        <div className="flex flex-col h-full">
          <AnimatePresence mode="sync">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                type={message.sender}
                text={message.text}
                delay={index * 0.2}
              />
            ))}
          </AnimatePresence>

          {showFinalOptions && (
            <motion.div
              className="flex justify-center space-x-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-6 py-2 rounded-full text-sm font-medium transition-colors"
                onClick={onRestart}
              >
                Start Again
              </button>
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                onClick={onComplete}
              >
                Finish Session
              </button>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

interface ChatBubbleProps {
  type: "system" | "user";
  text: string;
  delay?: number;
}

function ChatBubble({ type, text, delay = 0 }: ChatBubbleProps) {
  const bubbleClass = type === "system" ? "system-bubble self-start" : "user-bubble self-end";
  
  // Process text for lists if needed
  const hasListItems = text.includes("<li>");
  let processedText = text;
  let listItems: string[] = [];
  
  if (hasListItems) {
    // Extract list items
    const listRegex = /<ul.*?>(.*?)<\/ul>/s;
    const match = text.match(listRegex);
    
    if (match && match[1]) {
      processedText = text.replace(listRegex, "");
      const itemRegex = /<li>(.*?)<\/li>/g;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(match[1])) !== null) {
        listItems.push(itemMatch[1]);
      }
    }
  }
  
  return (
    <motion.div
      className={`chat-bubble ${bubbleClass} p-4 mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <p>{processedText}</p>
      
      {listItems.length > 0 && (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
