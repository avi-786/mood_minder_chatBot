# MindfulMoment: A Mood-Responsive Meditation App

MindfulMoment is an intuitive, chat-based meditation application that adapts to your emotional state in real-time. The app guides users through a personalized three-step journey based on their current mood, offering tailored meditation experiences.

![MindfulMoment App](https://i.imgur.com/example-screenshot.png)

## Features

- **Mood-Responsive Experience**: Choose from three emotional states (Happy, Okay, Stressed) to receive personalized content
- **Three-Step Journey**:
  1. Centering introduction to establish presence
  2. Personalized meditation/affirmation based on selected mood
  3. Closing reflection with actionable suggestions
- **Chat-Based Interface**: Clean, intuitive design with rounded chat bubbles for a conversational feel
- **Session Tracking**: All meditation sessions are logged to enable analytics on engagement and wellbeing trends
- **Responsive Design**: Optimized for use on all devices

## Technology Stack

- **Frontend**: React, Tailwind CSS, shadcn/ui components
- **Backend**: Node.js with Express
- **Database**: In-memory storage with Airtable integration capability
- **State Management**: React Hooks and TanStack Query
- **Animation**: Framer Motion for smooth transitions

## Getting Started

### Prerequisites

- Node.js v20+ and npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mindful-moment.git
   cd mindful-moment
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser to [http://localhost:5000](http://localhost:5000)

## Usage Guide

1. **Start a Session**: Open the app and you'll be greeted with a welcome message
2. **Select Your Mood**: Choose the emoji that best represents your current emotional state
3. **Follow the Journey**: Progress through the three-step meditation journey
4. **Complete Session**: Finish your meditation session and reflect on your experience
5. **Track Progress**: Return regularly to experience different mood-based meditation sessions

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - UI components including MoodSelector, ChatContainer, etc.
  - `/src/hooks` - Custom React hooks for state management
  - `/src/lib` - Utility functions and API integration
- `/server` - Express backend server
  - `/routes.ts` - API endpoints
  - `/storage.ts` - Data storage implementation
- `/shared` - Shared TypeScript schemas and types

## Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Chat UI inspired by modern messaging applications
- Meditation content developed with guidance from mindfulness practices

---
