import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  isActive?: boolean;
}

const AnimatedBackground = ({ isActive = true }: AnimatedBackgroundProps) => {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 1s",
        }}
      >
        {/* Simple gradient background instead of animated elements */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, rgba(76, 29, 149, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%)",
          }}
        />

        {/* Static particles instead of animated ones */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
