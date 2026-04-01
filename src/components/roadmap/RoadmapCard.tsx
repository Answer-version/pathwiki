"use client";

import Link from "next/link";
import { Heart, Clock, BookOpen } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Roadmap } from "@/types/roadmap";

interface RoadmapCardProps {
  roadmap: Roadmap;
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const totalNodes = roadmap.nodes?.length || roadmap.totalNodes || 0;

  return (
    <Link href={`/roadmaps/${roadmap.slug}`}>
      <article className="group bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-150 hover:shadow-card-hover hover:scale-[1.02] cursor-pointer">
        {/* Cover Image */}
        <div className="relative h-40 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
            {roadmap.category.icon || "📚"}
          </div>
          {/* Favorite Button */}
          <button
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="difficulty" difficulty={roadmap.difficulty} />
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              约{roadmap.estimatedTime.value}小时
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {roadmap.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
            {roadmap.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {totalNodes}个阶段
            </span>
            <span>{roadmap.category.name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
