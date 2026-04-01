"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { RoadmapNode, Difficulty } from "@/types/roadmap";

interface NodeCardProps {
  node: RoadmapNode;
  index: number;
  isLast?: boolean;
}

function getDifficultyColor(difficulty: Difficulty) {
  const colors = {
    beginner: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    intermediate: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    advanced: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  };
  return colors[difficulty] || colors.intermediate;
}

export default function NodeCard({ node, index, isLast = false }: NodeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasResources = node.resources && node.resources.length > 0;
  const hasSubNodes = node.subNodes && node.subNodes.length > 0;

  return (
    <div className="relative pl-12 pb-4">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
      )}

      {/* Node number */}
      <div
        className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${getDifficultyColor(
          "intermediate"
        )}`}
      >
        {index + 1}
      </div>

      {/* Card */}
      <div className="ml-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-3 transition-all duration-150 hover:border-indigo-200 dark:hover:border-indigo-700">
        {/* Header - always visible */}
        <button
          className="w-full flex items-center justify-between text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {node.icon && <span className="text-lg">{node.icon}</span>}
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {node.title}
              </h4>
              {node.isOptional && (
                <Badge className="text-[10px] px-1.5 py-0.5">可选</Badge>
              )}
            </div>
            {node.estimatedTime && (
              <p className="text-xs text-slate-400 mt-0.5 ml-7">
                预计 {node.estimatedTime.value}
                {node.estimatedTime.unit === "hours" ? "小时" : node.estimatedTime.unit === "days" ? "天" : "周"}
                {node.estimatedTime.note && ` · ${node.estimatedTime.note}`}
              </p>
            )}
          </div>
          {(hasResources || hasSubNodes) && (
            <ChevronDown
              className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-250 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {/* Expanded content */}
        {isExpanded && (hasResources || hasSubNodes) && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3">
            {/* Description */}
            {node.description && (
              <p className="text-xs text-slate-600 dark:text-slate-400">{node.description}</p>
            )}

            {/* Sub-nodes */}
            {hasSubNodes && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500">子节点：</p>
                {node.subNodes?.map((subNode) => (
                  <div key={subNode.id} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span>{subNode.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Resources */}
            {hasResources && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  推荐资源：
                </p>
                {node.resources?.slice(0, 3).map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge variant={resource.isFree ? "free" : "paid"} />
                      <span className="text-xs text-slate-700 dark:text-slate-300 truncate">
                        {resource.title}
                      </span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="primary">
                开始学习
              </Button>
              <Button size="sm" variant="outline">
                收藏
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
