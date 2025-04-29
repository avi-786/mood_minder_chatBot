import { useEffect, useRef } from "react";
import MoodSelector from "@/components/MoodSelector";
import ChatContainer from "@/components/ChatContainer";
import ProgressTracker from "@/components/ProgressTracker";
import NavigationControls from "@/components/NavigationControls";
import StatusMessage from "@/components/StatusMessage";
import { useMindfulChat } from "@/hooks/useMindfulChat";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const {
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
  } = useMindfulChat();

  // Show toast messages when status changes
  useEffect(() => {
    if (statusMessage && showStatus) {
      // Using a ref to prevent duplicate toasts
      const messageRef = { current: statusMessage.text };
      
      toast({
        title: messageRef.current,
        variant: statusMessage.type === "success" ? "default" : "destructive",
      });
    }
  }, [statusMessage?.text, showStatus, toast]);

  return (
    <div className="container mx-auto max-w-md px-4 py-6 min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-primary-700">Mindful Chatflow</h1>
        <p className="text-neutral-500 text-sm">A mindful chat experience</p>
      </header>

      {/* Progress Tracker */}
      <ProgressTracker currentStep={currentStep} />

      {/* Main Chat Container */}
      <div className="flex-grow flex flex-col">
        {/* Chat Messages Area */}
        <ChatContainer
          currentStep={currentStep}
          selectedMood={selectedMood}
          isSessionStarted={isSessionStarted}
          messages={messages}
          onMoodSelect={handleMoodSelect}
          onRestart={handleRestart}
          onComplete={handleComplete}
        />

        {/* Navigation Controls */}
        {isSessionStarted && (
          <NavigationControls
            currentStep={currentStep}
            totalSteps={3}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        )}
      </div>

      {/* Status Message */}
      <StatusMessage message={statusMessage} showStatus={showStatus} />
    </div>
  );
}
