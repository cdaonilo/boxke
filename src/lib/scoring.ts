export interface SongScore {
  songCode: string;
  score: number;
  accuracy: number;
  timestamp: Date;
}

export const calculateScore = (pitchMatches: number[], totalNotes: number) => {
  const accuracy =
    (pitchMatches.filter((match) => match > 0.8).length / totalNotes) * 100;
  const score = Math.round(accuracy * 1000);

  return {
    score,
    accuracy: Math.round(accuracy),
  };
};
