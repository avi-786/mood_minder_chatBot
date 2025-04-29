import { type Mood } from "@shared/schema";

export type MessageType = {
  sender: "system" | "user";
  text: string;
};

// Content for the happy path
const happyContent: Record<number, MessageType[]> = {
  1: [
    {
      sender: "system",
      text: "I see you're feeling happy today. Let's build on that positive energy.",
    },
    {
      sender: "system",
      text: "Take a moment to smile, and notice how that feels in your body. Allow your breath to deepen naturally.",
    },
    {
      sender: "user",
      text: "I'm ready to continue.",
    },
  ],
  2: [
    {
      sender: "system",
      text: "Wonderful! Here's a joy-enhancing affirmation for you:",
    },
    {
      sender: "system",
      text: "\"I am grateful for this moment of joy, and I choose to carry this feeling with me throughout my day.\"",
    },
    {
      sender: "system",
      text: "Repeat this affirmation to yourself, and notice how it amplifies your positive feelings.",
    },
    {
      sender: "user",
      text: "I've done the affirmation.",
    },
  ],
  3: [
    {
      sender: "system",
      text: "How do you feel after our session today?",
    },
    {
      sender: "user",
      text: "I feel even more positive now.",
    },
    {
      sender: "system",
      text: "That's wonderful! When you're already feeling good, it's a perfect time to:",
    },
    {
      sender: "system",
      text: "<ul><li>Share your positive energy with others</li><li>Tackle a challenge you've been postponing</li><li>Express gratitude to someone important to you</li></ul>",
    },
    {
      sender: "system",
      text: "Happiness is a resource you can draw from and share freely.",
    },
    {
      sender: "user",
      text: "Thank you for this session.",
    },
    {
      sender: "system",
      text: "Would you like to start another session or end here?",
    },
  ],
};

// Content for the okay path
const okayContent: Record<number, MessageType[]> = {
  1: [
    {
      sender: "system",
      text: "I see you're feeling okay today. Let's take a moment to center ourselves.",
    },
    {
      sender: "system",
      text: "Take a deep breath in... and out. Feel your body relax with each breath.",
    },
    {
      sender: "user",
      text: "I'm ready to continue.",
    },
  ],
  2: [
    {
      sender: "system",
      text: "Here's a helpful affirmation for when you're feeling balanced but could use a boost:",
    },
    {
      sender: "system",
      text: "\"I acknowledge where I am right now, and I know I have the power to move toward where I want to be.\"",
    },
    {
      sender: "system",
      text: "Take a moment to repeat this to yourself, either out loud or mentally.",
    },
    {
      sender: "user",
      text: "I've done the affirmation.",
    },
  ],
  3: [
    {
      sender: "system",
      text: "How do you feel after our session today?",
    },
    {
      sender: "user",
      text: "I feel more centered now.",
    },
    {
      sender: "system",
      text: "That's wonderful to hear! Here are some things you might consider for the rest of your day:",
    },
    {
      sender: "system",
      text: "<ul><li>Take short mindfulness breaks</li><li>Stay hydrated</li><li>Connect with a friend or loved one</li></ul>",
    },
    {
      sender: "system",
      text: "Remember, each moment is an opportunity to check in with yourself.",
    },
    {
      sender: "user",
      text: "Thank you, this was helpful.",
    },
    {
      sender: "system",
      text: "You're welcome! Would you like to start another session or end here?",
    },
  ],
};

// Content for the stressed path
const stressedContent: Record<number, MessageType[]> = {
  1: [
    {
      sender: "system",
      text: "I see you're feeling stressed today. Let's take a moment to acknowledge that and create some space for relief.",
    },
    {
      sender: "system",
      text: "Take a slow, deep breath in through your nose for a count of 4... hold for 1... and exhale through your mouth for a count of 6. Let's repeat this three times.",
    },
    {
      sender: "user",
      text: "I've completed the breathing exercise.",
    },
  ],
  2: [
    {
      sender: "system",
      text: "When we're feeling stressed, it helps to ground ourselves with a calming affirmation:",
    },
    {
      sender: "system",
      text: "\"This feeling is temporary. I am stronger than my stress, and I can choose peace in this moment.\"",
    },
    {
      sender: "system",
      text: "As you repeat this affirmation, place a hand on your heart and feel the connection between your words and your body.",
    },
    {
      sender: "user",
      text: "I've practiced the affirmation.",
    },
  ],
  3: [
    {
      sender: "system",
      text: "How are you feeling now compared to when we started?",
    },
    {
      sender: "user",
      text: "I'm feeling calmer than before.",
    },
    {
      sender: "system",
      text: "I'm glad to hear that. When stress is present, these simple practices can help you regain balance:",
    },
    {
      sender: "system",
      text: "<ul><li>Take a short walk outside if possible</li><li>Limit caffeine and stay hydrated</li><li>Write down what's on your mind</li><li>Reach out to a supportive person</li></ul>",
    },
    {
      sender: "system",
      text: "Remember that managing stress is an ongoing practice, not a one-time solution.",
    },
    {
      sender: "user",
      text: "I appreciate these suggestions.",
    },
    {
      sender: "system",
      text: "Would you like to start another session or end here?",
    },
  ],
};

export function getChatContent(mood: Mood, step: number): MessageType[] {
  if (mood === "happy") {
    return happyContent[step] || [];
  } else if (mood === "okay") {
    return okayContent[step] || [];
  } else if (mood === "stressed") {
    return stressedContent[step] || [];
  }
  return [];
}
