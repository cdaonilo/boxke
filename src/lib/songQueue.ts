export interface QueuedSong {
  code: string;
  artist: string;
  title: string;
  videoUrl?: string;
  verse?: string;
}

import { storage } from "./storage";

export class SongQueue {
  private queue: QueuedSong[] = [];

  constructor() {
    this.loadQueue().catch(console.error);
  }

  private async loadQueue() {
    try {
      const content = await storage.readFile("musicas.txt");
      if (content) {
        this.queue = content
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => {
            const [code, artist, title] = line.split("|").map((s) => s.trim());
            return { code, artist, title };
          });
      }
    } catch (error) {
      console.error("Error loading queue:", error);
    }
  }

  private saveQueue() {
    try {
      const content = this.queue
        .map((song) => `${song.code}|${song.artist}|${song.title}`)
        .join("\n");
      storage.writeFile("musicas.txt", content);
    } catch (error) {
      console.error("Error saving queue:", error);
    }
  }

  addToQueue(song: QueuedSong) {
    this.queue.push(song);
    this.saveQueue();
  }

  removeFromQueue(index: number) {
    if (index >= 0 && index < this.queue.length) {
      this.queue.splice(index, 1);
      this.saveQueue();
    }
  }

  getNextSong(): QueuedSong | null {
    const song = this.queue.shift() || null;
    this.saveQueue();
    return song;
  }

  getQueue(): QueuedSong[] {
    return [...this.queue];
  }

  clear() {
    this.queue = [];
    this.saveQueue();
  }
}
