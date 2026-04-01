"use client";

import NodeCard from "./NodeCard";
import type { RoadmapNode } from "@/types/roadmap";
import { useLearningProgress } from "@/hooks/useLearningProgress";

interface RoadmapTreeProps {
  nodes: RoadmapNode[];
  roadmapId: string;
}

export default function RoadmapTree({ nodes, roadmapId }: RoadmapTreeProps) {
  const {
    isLoaded,
    toggleCompleted,
    isCompleted,
    getProgress,
    saveNote,
    getNote,
  } = useLearningProgress(roadmapId);

  if (!isLoaded) {
    return (
      <div className="relative">
        {nodes.map((node, index) => (
          <div key={node.id} className="relative pl-12 pb-4">
            {!index && (
              <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 animate-pulse" />
            )}
            <div className="ml-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-3 h-16 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {nodes.map((node, index) => (
        <NodeCard
          key={node.id}
          node={node}
          index={index}
          isLast={index === nodes.length - 1}
          roadmapId={roadmapId}
          isCompleted={isCompleted(node.id)}
          onToggleComplete={toggleCompleted}
          note={getNote(node.id)}
          onSaveNote={saveNote}
        />
      ))}
    </div>
  );
}
