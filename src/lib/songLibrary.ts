import { mockSongs } from "./mockSongs";
import { storage } from "./storage";

export interface SongData {
  code: string;
  artist: string;
  title: string;
  verse: string;
  filename: string;
}

export class SongLibrary {
  private songs: Map<string, SongData> = new Map();
  private mediaPath: string;

  constructor() {
    this.mediaPath = "/media/karaoke";
    this.loadDatabase();
  }

  private loadDatabase() {
    // For development, use mock songs
    if (import.meta.env.DEV) {
      mockSongs.forEach((song) => {
        this.songs.set(song.code, song);
      });
      return;
    }

    // For production, try to load from storage
    try {
      const content = storage.readFile("db.ini");
      if (content) {
        const lines = content.split("\n");
        lines.forEach((line) => {
          const [code, artist, title, filename] = line
            .split("|")
            .map((s) => s.trim());
          if (code && artist && title && filename) {
            this.songs.set(code, {
              code,
              artist,
              title,
              verse: "", // Verse is optional
              filename,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error loading database:", error);
    }
  }

  findSong(code: string): SongData | null {
    return this.songs.get(code) || null;
  }

  getSongUrl(filename: string): string {
    if (import.meta.env.DEV) {
      return "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    }
    return `${this.mediaPath}/${filename}`;
  }
}

export const songLibrary = new SongLibrary();
