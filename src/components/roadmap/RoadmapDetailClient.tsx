"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart, Share2, BarChart3, Zap, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import ProgressTracker from "@/components/roadmap/ProgressTracker";
import RoadmapTree from "@/components/roadmap/RoadmapTree";
import { useFavorites } from "@/hooks/useLearningProgress";
import type { Difficulty, RoadmapNode } from "@/types/roadmap";

function getDifficultyLabel(difficulty: Difficulty) {
  const labels = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  };
  return labels[difficulty] || labels.intermediate;
}

// Calculate difficulty distribution
function getDifficultyDistribution(nodes: RoadmapNode[]) {
  const distribution = { beginner: 0, intermediate: 0, advanced: 0 };
  nodes.forEach((node) => {
    const difficulty = (node as any).difficulty || "intermediate";
    if (difficulty in distribution) {
      distribution[difficulty as keyof typeof distribution]++;
    }
  });
  return distribution;
}

interface RoadmapDetailClientProps {
  roadmapId: string;
  roadmapTitle: string;
  roadmapDescription: string;
  roadmapSlug: string;
  totalNodes: number;
  estimatedTime: number;
  suitableFor?: string[];
  difficulty: Difficulty;
  nodes: RoadmapNode[];
}

export default function RoadmapDetailClient({
  roadmapId,
  roadmapTitle,
  roadmapDescription,
  roadmapSlug,
  totalNodes,
  estimatedTime,
  suitableFor,
  difficulty,
  nodes,
}: RoadmapDetailClientProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const { toggleFavorite } = useFavorites();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("pathwiki-favorites") || "[]");
    setIsFavorite(favorites.includes(roadmapId));
  }, [roadmapId]);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(roadmapId);
    setIsFavorite(!isFavorite);
  }, [roadmapId, isFavorite, toggleFavorite]);

  const handleShare = useCallback(async () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/roadmaps/${roadmapSlug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: roadmapTitle,
          text: roadmapDescription,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed, fall back to copy
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  }, [roadmapSlug, roadmapTitle, roadmapDescription]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const difficultyDistribution = getDifficultyDistribution(nodes);

  // Estimate total time from nodes
  const totalEstimatedHours = nodes.reduce((sum, node) => {
    if (node.estimatedTime && node.estimatedTime.unit === "hours") {
      return sum + node.estimatedTime.value;
    }
    return sum;
  }, 0);

  return (
    <>
      {/* Progress Tracker */}
      <ProgressTracker totalNodes={totalNodes} roadmapId={roadmapId} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {roadmapTitle}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-4">{roadmapDescription}</p>

          {/* Learning Roadmap Overview */}
          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">难度分布</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500">{difficultyDistribution.beginner}</span>
                  <span className="text-slate-300 dark:text-slate-600 mx-0.5">/</span>
                  <span className="text-blue-500">{difficultyDistribution.intermediate}</span>
                  <span className="text-slate-300 dark:text-slate-600 mx-0.5">/</span>
                  <span className="text-violet-500">{difficultyDistribution.advanced}</span>
                </p>
              </div>
            </div>
            {totalEstimatedHours > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">预估时长</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {totalEstimatedHours}小时
                  </p>
                </div>
              </div>
            )}
            {suitableFor && suitableFor.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">适合</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {suitableFor[0]}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Difficulty Legend */}
          <div className="flex items-center gap-4 mb-4 text-xs">
            <span className="text-slate-500">难度等级：</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {getDifficultyLabel("beginner")} ({difficultyDistribution.beginner})
            </span>
            <span className="text-blue-500 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {getDifficultyLabel("intermediate")} ({difficultyDistribution.intermediate})
            </span>
            <span className="text-violet-500 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {getDifficultyLabel("advanced")} ({difficultyDistribution.advanced})
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1">
              开始学习
            </Button>
            <Button
              variant={isFavorite ? "primary" : "outline"}
              onClick={handleToggleFavorite}
              className={`flex items-center gap-2 ${isFavorite ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "已收藏" : "收藏"}
            </Button>
            <Button variant="ghost" onClick={handleShare} className="flex items-center gap-2 relative">
              <Share2 className="w-4 h-4" />
              {showCopied ? "已复制" : "分享"}
            </Button>
          </div>
        </div>

        {/* Roadmap Tree */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            学习路线图
          </h2>
          <RoadmapTree nodes={nodes} roadmapId={roadmapId} />
        </div>
      </div>
    </>
  );
}
