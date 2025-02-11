import React, { useState, useEffect } from "react";
import NumericInput from "./karaoke/NumericInput";
import InfoBar from "./karaoke/InfoBar";
import VideoPlayer from "./karaoke/VideoPlayer";
import SettingsMenu from "./karaoke/SettingsMenu";
import AnimatedBackground from "./karaoke/AnimatedBackground";

interface SongInfo {
  code: string;
  artist: string;
  title: string;
  verse: string;
  videoUrl?: string;
}

const Home = () => {
  const [currentSong, setCurrentSong] = useState<SongInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        setShowSettings((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleCodeChange = (code: string) => {
    // Simulate song lookup based on code
    if (code.length === 4) {
      setCurrentSong({
        code,
        artist: "Demo Artist",
        title: "Sample Song",
        verse: "Here comes the first verse of the song...",
        videoUrl: "https://example.com/sample-video.mp4",
      });
    } else {
      setCurrentSong(null);
    }
  };

  const handleCodeSubmit = (code: string) => {
    if (currentSong) {
      // Only set isPlaying to true after user interaction (Enter key press)
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setCurrentSong(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <AnimatedBackground isActive={!isPlaying} />

      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <NumericInput
            onCodeChange={handleCodeChange}
            onCodeSubmit={handleCodeSubmit}
          />
        </div>
      )}

      {isPlaying && currentSong && (
        <VideoPlayer
          videoUrl={currentSong.videoUrl}
          onVideoEnd={handleVideoEnd}
          autoPlay
        />
      )}

      <InfoBar
        songCode={currentSong?.code}
        artistName={currentSong?.artist}
        songTitle={currentSong?.title}
        firstVerse={currentSong?.verse}
      />

      <SettingsMenu
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default Home;
