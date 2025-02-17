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
  private initialized: boolean = false;

  constructor() {
    this.mediaPath = "/media/karaoke";
    this.loadDatabase().catch(console.error);
  }

  private async loadDatabase() {
    if (this.initialized) return;

    try {
      // Try to load from db.ini first
      const content = await storage.readFile("db.ini");
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
              verse: "",
              filename,
            });
          }
        });
        this.initialized = true;
        return;
      }
    } catch (error) {
      console.error("Error loading database:", error);
    }

    // Fallback to mock songs if db.ini not found or error
    mockSongs.forEach((song) => {
      this.songs.set(song.code, song);
    });
    this.initialized = true;
  }

  findSong(code: string): SongData | null {
    // If not initialized, use mock songs temporarily
    if (!this.initialized) {
      const mockSong = mockSongs.find((s) => s.code === code);
      return mockSong || null;
    }
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
