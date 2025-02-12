import React from "react";
import { motion } from "framer-motion";

interface ToneIndicatorProps {
  tone: number;
}

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const ToneIndicator = ({ tone }: ToneIndicatorProps) => {
  const getNote = (semitones: number) => {
    const baseIndex = notes.indexOf("A"); // Starting from A
    let newIndex = (baseIndex + semitones) % 12;
    if (newIndex < 0) newIndex += 12;
    return notes[newIndex];
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-yellow-500/90 text-black px-6 py-3 rounded-full font-bold text-xl"
    >
      Tone: {getNote(tone)} {tone > 0 ? `+${tone}` : tone}
    </motion.div>
  );
};

export default ToneIndicator;
