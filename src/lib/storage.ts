import { mockSongs } from "./mockSongs";

export interface StorageAdapter {
  readFile(path: string): string | null;
  writeFile(path: string, content: string): void;
  fileExists(path: string): boolean;
}

class LocalStorageAdapter implements StorageAdapter {
  readFile(path: string): string | null {
    return localStorage.getItem(path);
  }

  writeFile(path: string, content: string): void {
    localStorage.setItem(path, content);
  }

  fileExists(path: string): boolean {
    return localStorage.getItem(path) !== null;
  }
}

export const storage = new LocalStorageAdapter();
