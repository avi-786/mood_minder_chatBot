import { motion } from "framer-motion";

interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

export default function NavigationControls({
  currentStep,
  totalSteps,
  onNext,
  onBack,
}: NavigationControlsProps) {
  return (
    <motion.div
      className="flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className={`bg-neutral-200 hover:bg-neutral-300 text-neutral-700 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentStep <= 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onBack}
        disabled={currentStep <= 1}
      >
        <i className="fas fa-arrow-left mr-1"></i> Back
      </button>

      <div className="text-xs text-neutral-500">
        Step <span>{currentStep}</span> of {totalSteps}
      </div>

      <button
        className={`bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentStep >= totalSteps ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onNext}
        disabled={currentStep >= totalSteps}
      >
        Next <i className="fas fa-arrow-right ml-1"></i>
      </button>
    </motion.div>
  );
}
