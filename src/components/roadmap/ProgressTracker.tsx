"use client";

import { useState, useEffect } from "react";

interface ProgressTrackerProps {
  totalNodes: number;
  completedNodes?: number[];
  roadmapId: string;
}

export default function ProgressTracker({
  totalNodes,
  completedNodes = [],
  roadmapId,
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Try to get from localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`progress-${roadmapId}`);
      if (stored) {
        const completed = JSON.parse(stored) as string[];
        setProgress(Math.round((completed.length / totalNodes) * 100));
      } else {
        setProgress(Math.round((completedNodes.length / totalNodes) * 100));
      }
    }
  }, [totalNodes, completedNodes, roadmapId]);

  return (
    <div className="sticky top-[56px] md:top-[64px] z-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
          {progress}%
        </span>
      </div>
    </div>
  );
}
