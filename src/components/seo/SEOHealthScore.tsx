
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface SEOHealthScoreProps {
  score: number;
  label?: string;
}

const SEOHealthScore: React.FC<SEOHealthScoreProps> = ({ score, label = "SEO Health Score" }) => {
  // Determine the color based on the score
  const getColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{label}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This score represents the overall health of your SEO based on various factors.
                  80-100: Excellent, 60-79: Good, Below 60: Needs improvement.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Updated today at {new Date().toLocaleTimeString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-2">
          <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className={`${getProgressColor()} stroke-current`}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${score * 2.51} 251.2`}
                strokeDashoffset="0"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl font-bold ${getColor()}`}>{score}</span>
            </div>
          </div>
        </div>
        <Progress value={score} className="h-2" />
        <div className="flex justify-between mt-2 text-xs">
          <span>Critical</span>
          <span>Average</span>
          <span>Excellent</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOHealthScore;
