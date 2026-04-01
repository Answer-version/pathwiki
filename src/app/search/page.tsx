import type { Metadata } from "next";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import { searchRoadmaps } from "@/lib/roadmaps";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索学习路线、技能或行业",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const results = query ? searchRoadmaps(query) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          搜索
        </h1>
        <SearchBar defaultValue={query} className="max-w-2xl" />
      </div>

      {/* Results */}
      {query ? (
        <SearchResults results={results} query={query} />
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            输入关键词搜索学习路线
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            可以搜索路线名称、技能、行业分类等
          </p>
        </div>
      )}
    </div>
  );
}
