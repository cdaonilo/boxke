import React from "react";
import { Separator } from "../ui/separator";

interface InfoBarProps {
  songCode?: string;
  artistName?: string;
  songTitle?: string;
  firstVerse?: string;
  tone?: number;
}

const InfoBar = ({
  songCode = "1234",
  artistName = "Unknown Artist",
  songTitle = "Untitled Song",
  firstVerse = "First verse preview will appear here...",
  tone = 0,
}: InfoBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black text-white">
      <div className="flex h-full">
        {/* Left section - Song Code */}
        <div className="flex-none w-48 bg-black flex items-center justify-center border-r border-gray-800">
          <div className="text-center">
            <div className="text-xs uppercase">CÓDIGO</div>
            <div className="text-2xl font-bold">{songCode || "000000"}</div>
          </div>
        </div>

        {/* Middle section - Artist */}
        <div className="flex-1 bg-black flex items-center px-4 border-r border-gray-800">
          <div>
            <div className="text-xs uppercase">CANTOR:</div>
            <div className="text-xl truncate">{artistName}</div>
          </div>
        </div>

        {/* Right section - Song Title */}
        <div className="flex-1 bg-black flex items-center px-4">
          <div>
            <div className="text-xs uppercase">MUSICA:</div>
            <div className="text-xl truncate">{songTitle}</div>
          </div>
        </div>
      </div>
      {tone !== 0 && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-sm font-medium">
          Tone: {tone > 0 ? `+${tone}` : tone}
        </div>
      )}
    </div>
  );
};

export default InfoBar;
