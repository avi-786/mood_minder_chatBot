import { motion } from "framer-motion";

interface ProgressTrackerProps {
  currentStep: number;
}

export default function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-2">
        {[1, 2, 3].map((step) => (
          <motion.div
            key={step}
            className={`progress-step w-3 h-3 rounded-full ${
              step <= currentStep && currentStep > 0
                ? "bg-primary-500"
                : "bg-neutral-200"
            }`}
            initial={false}
            animate={{
              scale: step === currentStep ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
