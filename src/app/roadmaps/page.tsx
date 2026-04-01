import { Suspense } from "react";
import type { Metadata } from "next";
import RoadmapCard from "@/components/roadmap/RoadmapCard";
import CategoryFilter from "@/components/roadmap/CategoryFilter";
import { getAllRoadmaps, getAllCategories } from "@/lib/roadmaps";

export const metadata: Metadata = {
  title: "学习路线",
  description: "浏览所有学习路线，找到适合你的成长路径。",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function RoadmapsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || null;

  const roadmaps = getAllRoadmaps();
  const categories = getAllCategories();

  // Filter roadmaps by category
  const filteredRoadmaps = selectedCategory
    ? roadmaps.filter((roadmap) => roadmap.category.slug === selectedCategory)
    : roadmaps;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          所有学习路线
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          共 {filteredRoadmaps.length} 条路线，覆盖技术、产品、设计、商业等多个领域
        </p>
      </div>

      {/* Categories Filter */}
      <Suspense fallback={<div className="h-12 mb-8" />}>
        <CategoryFilter categories={categories} selectedCategory={selectedCategory} />
      </Suspense>

      {/* Roadmaps Grid */}
      {filteredRoadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">
            该分类下暂无路线
          </p>
        </div>
      )}
    </div>
  );
}
