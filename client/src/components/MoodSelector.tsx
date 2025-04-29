import { motion } from "framer-motion";
import { type Mood } from "@shared/schema";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const handleSelect = (mood: Mood) => {
    onMoodSelect(mood);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-6 mb-4">
      <MoodButton
        emoji="😊"
        mood="happy"
        label="Happy"
        bgColor="bg-happy"
        ringColor="ring-happy"
        onSelect={handleSelect}
      />
      
      <MoodButton
        emoji="😐"
        mood="okay"
        label="Okay"
        bgColor="bg-okay"
        ringColor="ring-okay"
        onSelect={handleSelect}
      />
      
      <MoodButton
        emoji="😥"
        mood="stressed"
        label="Stressed"
        bgColor="bg-stressed"
        ringColor="ring-stressed"
        onSelect={handleSelect}
      />
    </div>
  );
}

interface MoodButtonProps {
  emoji: string;
  mood: Mood;
  label: string;
  bgColor: string;
  ringColor: string;
  onSelect: (mood: Mood) => void;
}

function MoodButton({ emoji, mood, label, bgColor, ringColor, onSelect }: MoodButtonProps) {
  return (
    <motion.button
      className={`mood-button flex flex-col items-center justify-center ${bgColor} bg-opacity-10 hover:bg-opacity-20 p-4 rounded-full w-20 h-20 focus:outline-none focus:ring-2 ${ringColor}`}
      onClick={() => onSelect(mood)}
      aria-label={`I'm feeling ${label.toLowerCase()}`}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-4xl mb-1">{emoji}</span>
      <span className="text-xs text-neutral-700 font-medium">{label}</span>
    </motion.button>
  );
}
