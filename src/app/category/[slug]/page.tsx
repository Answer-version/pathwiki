import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RoadmapCard from "@/components/roadmap/RoadmapCard";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  getRoadmapsByCategory,
  getAllCategories,
  getAllCategorySlugs,
} from "@/lib/roadmaps";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "分类未找到" };
  }

  return {
    title: `${category.name}路线 | PathWiki`,
    description: `浏览${category.name}领域的所有学习路线，找到适合你的成长路径。`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const roadmaps = getRoadmapsByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "分类" }, { label: category.name }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {category.name}学习路线
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          共 {roadmaps.length} 条路线
        </p>
      </div>

      {/* All Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              cat.slug === slug
                ? "bg-indigo-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat.icon} {cat.name}
          </a>
        ))}
      </div>

      {/* Roadmaps Grid */}
      {roadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          该分类下暂无路线
        </div>
      )}
    </div>
  );
}
