import React from "react";
import { Card } from "../ui/card";
import { Coins } from "lucide-react";

interface CreditsDisplayProps {
  credits: number;
}

const CreditsDisplay = ({ credits }: CreditsDisplayProps) => {
  return (
    <Card className="fixed top-4 right-4 bg-zinc-900/90 border-zinc-800 text-white px-4 py-2 flex items-center gap-2">
      <Coins className="w-5 h-5 text-yellow-500" />
      <span className="text-xl font-bold">{credits}</span>
    </Card>
  );
};

export default CreditsDisplay;
