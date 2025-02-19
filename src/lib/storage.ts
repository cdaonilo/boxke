import { Capacitor } from "@capacitor/core";
import type { FileReadResult } from "@capacitor/filesystem";

export interface StorageAdapter {
  readFile(path: string): Promise<string | null>;
  writeFile(path: string, content: string): Promise<void>;
  fileExists(path: string): boolean;
}

class LocalStorageAdapter implements StorageAdapter {
  private async readExternalStorage(path: string): Promise<string | null> {
    // Check if external storage is enabled in settings
    const useExternalStorage =
      localStorage.getItem("useExternalStorage") === "true";
    if (!useExternalStorage || !Capacitor.isNativePlatform()) return null;

    try {
      const { Filesystem, Directory } = await import("@capacitor/filesystem");
      const result = await Filesystem.readFile({
        path,
        directory: Directory.ExternalStorage,
        encoding: "utf8",
      });

      // Type guard for FileReadResult
      if (!result || typeof result.data !== "string") {
        throw new Error("Invalid file data format");
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `External storage read error for ${path}:`,
          error.message,
        );
      } else {
        console.error(`Unknown error reading ${path} from external storage`);
      }
      return null;
    }
  }

  async readFile(path: string): Promise<string | null> {
    try {
      // Try external storage first if on native platform
      if (Capacitor.isNativePlatform()) {
        const externalContent = await this.readExternalStorage(path);
        if (externalContent !== null) {
          return externalContent;
        }
      }

      // Fallback to localStorage
      return localStorage.getItem(path);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading file ${path}:`, error.message);
      } else {
        console.error(`Unknown error reading file ${path}`);
      }
      return null;
    }
  }

  async writeFile(path: string, content: string): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        const { Filesystem, Directory } = await import("@capacitor/filesystem");
        await Filesystem.writeFile({
          path,
          data: content,
          directory: Directory.ExternalStorage,
          encoding: "utf8",
        });
      } else {
        localStorage.setItem(path, content);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error writing file ${path}:`, error.message);
      } else {
        console.error(`Unknown error writing file ${path}`);
      }
      throw error; // Re-throw to allow error handling by caller
    }
  }

  fileExists(path: string): boolean {
    return localStorage.getItem(path) !== null;
  }
}

export const storage = new LocalStorageAdapter();
