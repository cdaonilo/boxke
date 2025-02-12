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
  const [showToneIndicator, setShowToneIndicator] = useState(false);
  const [toneIndicatorTimeout, setToneIndicatorTimeout] =
    useState<NodeJS.Timeout>();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        setShowSettings((prev) => !prev);
      } else if (e.key.toLowerCase() === "c" && isPlaying) {
        setIsPlaying(false);
        setCurrentSong(null);
      } else if (e.key.toLowerCase() === "w") {
        setCredits((prev) => prev + 1);
      } else if (e.key.toLowerCase() === "t" && currentSong) {
        setCurrentSong((prev) => ({
          ...prev!,
          tone: ((prev?.tone || 0) + 1) % 12,
        }));
        setShowToneIndicator(true);

        // Clear existing timeout
        if (toneIndicatorTimeout) {
          clearTimeout(toneIndicatorTimeout);
        }

        // Set new timeout
        const timeout = setTimeout(() => {
          setShowToneIndicator(false);
        }, 5000);

        setToneIndicatorTimeout(timeout);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
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
      {showToneIndicator && currentSong && (
        <ToneIndicator tone={currentSong.tone || 0} />
      )}
    </div>
  );
};

export default Home;
