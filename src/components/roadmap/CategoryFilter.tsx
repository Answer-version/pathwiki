"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/types/roadmap";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = useCallback(
    (categorySlug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (categorySlug) {
        params.set("category", categorySlug);
      } else {
        params.delete("category");
      }
      router.push(`/roadmaps?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
          !selectedCategory
            ? "bg-indigo-500 text-white"
            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        全部
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === category.slug
              ? "bg-indigo-500 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  );
}
