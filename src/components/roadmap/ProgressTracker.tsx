"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useLearningProgress } from "@/hooks/useLearningProgress";

interface ProgressTrackerProps {
  totalNodes: number;
  roadmapId: string;
}

export default function ProgressTracker({ totalNodes, roadmapId }: ProgressTrackerProps) {
  const { isLoaded, getProgress } = useLearningProgress(roadmapId);
  const [progress, setProgress] = useState({ completed: 0, total: totalNodes, percentage: 0 });

  useEffect(() => {
    if (isLoaded) {
      setProgress(getProgress(totalNodes));
    }
  }, [isLoaded, getProgress, totalNodes]);

  return (
    <div className="sticky top-[56px] md:top-[64px] z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 px-4 py-2.5 max-w-4xl mx-auto">
        <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          {progress.percentage === 100 && (
            <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full text-white">
              <Check className="w-3 h-3" />
            </span>
          )}
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{progress.completed}</span>
            <span className="mx-0.5">/</span>
            <span>{progress.total}</span>
            <span className="ml-1 text-slate-400">({progress.percentage}%)</span>
          </span>
        </div>
      </div>
    </div>
  );
}
