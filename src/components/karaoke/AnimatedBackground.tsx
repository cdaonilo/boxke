import React from "react";

interface AnimatedBackgroundProps {
  isActive?: boolean;
}

const useCustomBackground =
  localStorage.getItem("useCustomBackground") === "true";

const AnimatedBackground = ({ isActive = true }: AnimatedBackgroundProps) => {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        ...(useCustomBackground
          ? {
              backgroundImage: "url(/background.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { backgroundColor: "#1a365d" }),
        opacity: isActive ? 1 : 0,
        transition: "opacity 1s",
      }}
    >
      <div className="absolute top-4 left-4 text-white/70 text-sm font-mono">
        v1.1
      </div>
    </div>
  );
};

export default AnimatedBackground;
