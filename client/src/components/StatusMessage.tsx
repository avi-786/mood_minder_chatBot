import { motion, AnimatePresence } from "framer-motion";

export interface StatusMessageType {
  text: string;
  type: "success" | "error" | "info";
}

interface StatusMessageProps {
  message: StatusMessageType | null;
  showStatus: boolean;
}

export default function StatusMessage({ message, showStatus }: StatusMessageProps) {
  if (!message) return null;

  let bgColor = "bg-primary-500";
  if (message.type === "success") {
    bgColor = "bg-secondary-500";
  } else if (message.type === "error") {
    bgColor = "bg-red-500";
  }

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          className="fixed bottom-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-medium`}>
            <span>{message.text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
