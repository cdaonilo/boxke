import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { X } from "lucide-react";
import type { QueuedSong } from "@/lib/songQueue";

interface QueueDisplayProps {
  queue: QueuedSong[];
  onRemove: (index: number) => void;
}

const QueueDisplay = ({ queue, onRemove }: QueueDisplayProps) => {
  if (queue.length === 0) return null;

  return (
    <Card className="fixed right-4 top-4 w-80 bg-zinc-900/90 border-zinc-800 text-white z-40">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Next Songs</h3>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {queue.map((song, index) => (
              <div
                key={`${song.code}-${index}`}
                className="flex items-center justify-between p-2 bg-zinc-800 rounded-md"
              >
                <div className="flex-1">
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-zinc-400">{song.artist}</div>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="p-1 hover:bg-zinc-700 rounded-md"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default QueueDisplay;
