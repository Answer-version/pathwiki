import { Suspense } from "react";
import type { Metadata } from "next";
import RoadmapCard from "@/components/roadmap/RoadmapCard";
import { getAllRoadmaps, getAllCategories } from "@/lib/roadmaps";

export const metadata: Metadata = {
  title: "学习路线",
  description: "浏览所有学习路线，找到适合你的成长路径。",
};

export default function RoadmapsPage() {
  const roadmaps = getAllRoadmaps();
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          所有学习路线
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          共 {roadmaps.length} 条路线，覆盖技术、产品、设计、商业等多个领域
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium whitespace-nowrap">
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
