import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { PartyPopper, Frown, Star } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  accuracy: number;
  onClose: () => void;
  showNotes?: boolean;
}

const ScoreDisplay = ({
  score,
  accuracy,
  onClose,
  showNotes = true,
}: ScoreDisplayProps) => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (showNotes && !audioPlayed) {
      const audio = new Audio();
      try {
        if (accuracy >= 90) {
          audio.src =
            "https://storage.googleapis.com/tempo-public-assets/note90-100.mp3";
        } else if (accuracy >= 60) {
          audio.src =
            "https://storage.googleapis.com/tempo-public-assets/note60-80.mp3";
        } else {
          audio.src =
            "https://storage.googleapis.com/tempo-public-assets/note40-50.mp3";
        }
        audio.play().catch(console.error);
        setAudioPlayed(true);
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    }

    // Auto-close after 5 seconds
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showNotes, accuracy, audioPlayed, onClose]);

  const getScoreAnimation = () => {
    if (accuracy >= 90) {
      return (
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <PartyPopper className="w-16 h-16 text-yellow-500 mx-auto" />
        </motion.div>
      );
    } else if (accuracy >= 60) {
      return (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Star className="w-16 h-16 text-blue-500 mx-auto" />
        </motion.div>
      );
    } else {
      return (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Frown className="w-16 h-16 text-red-500 mx-auto" />
        </motion.div>
      );
    }
  };
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
    >
      <Card className="w-[400px] p-6 bg-zinc-900 border-zinc-800 text-white">
        <div className="text-center space-y-4">
          {showNotes && getScoreAnimation()}
          <h2 className="text-4xl font-bold">Score</h2>
          <div className="text-6xl font-bold text-primary">{score}</div>
          <div className="text-xl">Accuracy: {accuracy}%</div>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            Continue
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ScoreDisplay;
