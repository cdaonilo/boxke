import React, { useState, useEffect } from "react";
import NumericInput from "./karaoke/NumericInput";
import InfoBar from "./karaoke/InfoBar";
import VideoPlayer from "./karaoke/VideoPlayer";
import SettingsMenu from "./karaoke/SettingsMenu";
import AnimatedBackground from "./karaoke/AnimatedBackground";
import ScoreDisplay from "./karaoke/ScoreDisplay";
import QueueDisplay from "./karaoke/QueueDisplay";
import ErrorMessage from "./karaoke/ErrorMessage";
import CreditsDisplay from "./karaoke/CreditsDisplay";
import { Coins } from "lucide-react";
import { Button } from "./ui/button";
import ToneIndicator from "./karaoke/ToneIndicator";
import { SongQueue, type QueuedSong } from "@/lib/songQueue";
import { songLibrary } from "@/lib/songLibrary";

interface SongInfo {
  code: string;
  artist: string;
  title: string;
  verse: string;
  videoUrl?: string;
  tone?: number;
}

const songQueue = new SongQueue();

const Home = () => {
  const [currentSong, setCurrentSong] = useState<SongInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState({ score: 0, accuracy: 0 });
  const [queue, setQueue] = useState<QueuedSong[]>([]);
  const [error, setError] = useState<string>("");
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    // Handle Android back button
    const handleBackButton = () => {
      if (window.navigator.app) {
        window.navigator.app.exitApp();
      }
    };

    document.addEventListener("backbutton", handleBackButton);

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        setShowSettings((prev) => !prev);
      } else if (e.key.toLowerCase() === "c") {
        setCredits((prev) => prev + 1);
      } else if (e.key.toLowerCase() === "w") {
        // Return to initial screen
        setIsPlaying(false);
        setCurrentSong(null);
        setShowScore(false);
        setError("");
      } else if (e.key.toLowerCase() === "t" && currentSong) {
        // Shift + T decreases tone, T increases tone
        const toneChange = e.shiftKey ? -1 : 1;
        setCurrentSong((prev) => {
          const newTone = (prev?.tone || 0) + toneChange;
          // Keep tone between -12 and +12 semitones
          if (newTone > 12 || newTone < -12) return prev;
          return {
            ...prev!,
            tone: newTone,
          };
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("backbutton", handleBackButton);
    };
  }, [currentSong, isPlaying]);

  const handleCodeChange = (code: string) => {
    if (code.length === 5) {
      const song = songLibrary.findSong(code);
      if (song) {
        const newSong = {
          ...song,
          videoUrl: songLibrary.getSongUrl(song.filename),
          tone: 0,
        };

        if (!currentSong && !isPlaying) {
          setCurrentSong(newSong);
          setError("");
        } else {
          songQueue.addToQueue(newSong);
          setQueue(songQueue.getQueue());
        }
      }
    } else if (!currentSong) {
      setCurrentSong(null);
    }
  };

  const handleCodeSubmit = (code: string) => {
    if (credits <= 0) {
      setError("No credits available");
      return;
    }
    if (currentSong) {
      setCredits((prev) => prev - 1);
      setIsPlaying(true);
    } else {
      setError("Song Not Found");
    }
  };

  const handleVideoEnd = () => {
    const randomScore = Math.floor(Math.random() * 10000);
    const randomAccuracy = Math.floor(Math.random() * 100);

    setScore({
      score: randomScore,
      accuracy: randomAccuracy,
    });
    setShowScore(true);
    setIsPlaying(false);

    const nextSong = songQueue.getNextSong();
    if (nextSong) {
      setCurrentSong(nextSong);
      setQueue(songQueue.getQueue());
    } else {
      setCurrentSong(null);
    }
  };

  const handleRemoveFromQueue = (index: number) => {
    songQueue.removeFromQueue(index);
    setQueue(songQueue.getQueue());
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <AnimatedBackground isActive={!isPlaying} />

      {!isPlaying && !showScore && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setCredits((prev) => prev + 1)}
            >
              <Coins className="h-8 w-8 text-yellow-500" />
            </Button>
          </div>
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
          tone={currentSong.tone}
          autoPlay
        />
      )}

      <InfoBar
        songCode={currentSong?.code}
        artistName={currentSong?.artist}
        songTitle={currentSong?.title}
        firstVerse={currentSong?.verse}
        tone={currentSong?.tone}
      />

      <SettingsMenu
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        showNotes={showNotes}
        onShowNotesChange={setShowNotes}
      />

      {showScore && (
        <ScoreDisplay
          score={score.score}
          accuracy={score.accuracy}
          showNotes={showNotes}
          onClose={() => {
            setShowScore(false);
            if (currentSong) {
              setIsPlaying(true);
            }
          }}
        />
      )}

      <QueueDisplay queue={queue} onRemove={handleRemoveFromQueue} />

      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      <CreditsDisplay credits={credits} />
    </div>
  );
};

export default Home;
