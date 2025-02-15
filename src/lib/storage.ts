import { mockSongs } from "./mockSongs";

export interface StorageAdapter {
  readFile(path: string): Promise<string | null>;
  writeFile(path: string, content: string): void;
  fileExists(path: string): boolean;
}

class LocalStorageAdapter implements StorageAdapter {
  private async readExternalStorage(path: string): Promise<string | null> {
    if (typeof window !== "undefined" && "Capacitor" in window) {
      try {
        const { Filesystem, Directory } = await import("@capacitor/filesystem");
        const result = await Filesystem.readFile({
          path: path,
          directory: Directory.ExternalStorage,
        });
        return result.data;
      } catch (error) {
        console.error("Error reading external file:", error);
        return null;
      }
    }
    return null;
  }

  async readFile(path: string): Promise<string | null> {
    // Primeiro tenta ler do armazenamento externo
    const externalContent = await this.readExternalStorage(path);
    if (externalContent) return externalContent;

    // Se não encontrar, usa o localStorage como fallback
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
