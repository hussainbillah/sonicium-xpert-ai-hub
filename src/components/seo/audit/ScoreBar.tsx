
import React from 'react';
import { Progress } from "@/components/ui/progress";

// Component for showing score with progress bar
const ScoreBar: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-2">
      <Progress value={score} className={`h-2 w-24 ${getColor()}`} />
      <span className="text-sm">{score}/100</span>
    </div>
  );
};

export default ScoreBar;
