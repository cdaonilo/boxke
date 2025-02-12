import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
      onClick={onClose}
    >
      <Card className="w-[400px] p-6 bg-zinc-900 border-red-800 text-white">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-red-500">{message}</h2>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            OK
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ErrorMessage;
