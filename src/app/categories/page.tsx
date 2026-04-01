import Link from "next/link";
import type { Metadata } from "next";
import { getAllCategories, getRoadmapsByCategory } from "@/lib/roadmaps";

export const metadata: Metadata = {
  title: "分类",
  description: "浏览所有学习路线分类",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          所有分类
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          按领域浏览学习路线，找到你感兴趣的方向
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const roadmaps = getRoadmapsByCategory(category.slug);
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 p-6 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {category.nameEn}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {roadmaps.length} 条路线
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
