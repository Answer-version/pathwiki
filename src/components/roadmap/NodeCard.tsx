"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, ExternalLink, Check, Circle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import NodeNote from "./NodeNote";
import type { RoadmapNode, Difficulty } from "@/types/roadmap";
import { getResourceIcon, getResourceLabel, formatDuration, getPlatformColor } from "@/lib/navigation";

interface NodeCardProps {
  node: RoadmapNode;
  index: number;
  isLast?: boolean;
  roadmapId: string;
  isCompleted: boolean;
  onToggleComplete: (nodeId: string) => void;
  note: string;
  onSaveNote: (nodeId: string, note: string) => void;
}

function getDifficultyColor(difficulty: Difficulty) {
  const colors = {
    beginner: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    intermediate: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    advanced: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  };
  return colors[difficulty] || colors.intermediate;
}

function getDifficultyLabel(difficulty: Difficulty) {
  const labels = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  };
  return labels[difficulty] || labels.intermediate;
}

export default function NodeCard({
  node,
  index,
  isLast = false,
  roadmapId,
  isCompleted,
  onToggleComplete,
  note,
  onSaveNote,
}: NodeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasResources = node.resources && node.resources.length > 0;
  const hasSubNodes = node.subNodes && node.subNodes.length > 0;
  const difficulty = (node as any).difficulty || "intermediate";

  // Extract key points from description
  const getKeyPoints = (desc?: string): string[] => {
    if (!desc) return [];
    return desc.split(/[,，、]/).filter(Boolean).slice(0, 4);
  };

  const keyPoints = getKeyPoints(node.description);

  return (
    <div className="relative pl-12 pb-4">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
      )}

      {/* Node number / completion status */}
      <button
        onClick={() => onToggleComplete(node.id)}
        className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 transition-all duration-200 ${
          isCompleted
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
            : getDifficultyColor(difficulty)
        } hover:scale-110`}
        title={isCompleted ? "标记为未完成" : "标记为已完成"}
      >
        {isCompleted ? (
          <Check className="w-4 h-4" />
        ) : (
          <span>{index + 1}</span>
        )}
      </button>

      {/* Card */}
      <div
        className={`ml-6 bg-white dark:bg-slate-800 rounded-xl border transition-all duration-150 ${
          isCompleted
            ? "border-emerald-200 dark:border-emerald-800"
            : "border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700"
        }`}
      >
        {/* Header - always visible */}
        <button
          className="w-full flex items-center justify-between text-left p-3"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {node.icon && <span className="text-lg">{node.icon}</span>}
              <h4 className={`text-sm font-medium truncate ${
                isCompleted
                  ? "text-emerald-700 dark:text-emerald-400 line-through decoration-emerald-500/50"
                  : "text-slate-900 dark:text-slate-100"
              }`}>
                {node.title}
              </h4>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-medium">
                  <Check className="w-3 h-3" />
                  已完成
                </span>
              )}
              {node.isOptional && (
                <Badge className="text-[10px] px-1.5 py-0.5">可选</Badge>
              )}
              <Badge variant="custom" className={`text-[10px] px-1.5 py-0.5 ${getDifficultyColor(difficulty)}`}>
                {getDifficultyLabel(difficulty)}
              </Badge>
            </div>
            {node.estimatedTime && (
              <p className="text-xs text-slate-400 mt-0.5 ml-7">
                预计 {node.estimatedTime.value}
                {node.estimatedTime.unit === "hours" ? "小时" : node.estimatedTime.unit === "days" ? "天" : "周"}
                {node.estimatedTime.note && ` · ${node.estimatedTime.note}`}
              </p>
            )}
          </div>
          {(hasResources || hasSubNodes || keyPoints.length > 0) && (
            <ChevronDown
              className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-250 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-3 pb-3 space-y-3">
            {/* Description */}
            {node.description && (
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {node.description}
                </p>
              </div>
            )}

            {/* Key Points / Core Skills */}
            {keyPoints.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1.5">核心要点</p>
                <div className="flex flex-wrap gap-1.5">
                  {keyPoints.map((point, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded text-xs"
                    >
                      {point.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-nodes */}
            {hasSubNodes && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-slate-500">子节点</p>
                {node.subNodes?.map((subNode) => (
                  <div
                    key={subNode.id}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-slate-200 dark:border-slate-600"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="flex-1 truncate">{subNode.title}</span>
                    {subNode.estimatedTime && (
                      <span className="text-slate-400 whitespace-nowrap">
                        {subNode.estimatedTime.value}
                        {subNode.estimatedTime.unit === "hours" ? "h" : subNode.estimatedTime.unit === "days" ? "d" : "w"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Resources */}
            {hasResources && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  推荐资源 ({node.resources.length})
                </p>
                <div className="space-y-1">
                  {node.resources.slice(0, 5).map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <span className="text-sm flex-shrink-0 mt-0.5">
                        {getResourceIcon(resource.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate">
                            {resource.title}
                          </span>
                          <Badge variant={resource.isFree ? "free" : "paid"} className="text-[10px] px-1 py-0" />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                          {resource.platform && (
                            <span className={getPlatformColor(resource.platform)}>
                              {resource.platform}
                            </span>
                          )}
                          {resource.duration && (
                            <span className="flex items-center gap-0.5">
                              <Circle className="w-1 h-1 fill-current" />
                              {formatDuration(resource.duration)}
                            </span>
                          )}
                          {resource.rating && (
                            <span className="text-amber-500">
                              {"★".repeat(Math.floor(resource.rating))}{"☆".repeat(5 - Math.floor(resource.rating))}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                  {node.resources.length > 5 && (
                    <p className="text-xs text-slate-400 text-center py-1">
                      还有 {node.resources.length - 5} 个资源...
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Note Section */}
            <NodeNote
              nodeId={node.id}
              roadmapId={roadmapId}
              initialNote={note}
              onSave={onSaveNote}
            />

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {!isCompleted ? (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => onToggleComplete(node.id)}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  标记完成
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onToggleComplete(node.id)}
                  className="flex items-center gap-1"
                >
                  <Circle className="w-3 h-3" />
                  取消完成
                </Button>
              )}
              {node.resources && node.resources.length > 0 && node.resources[0].url && (
                <a
                  href={node.resources[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button size="sm" variant="secondary" className="w-full">
                    开始学习 →
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
