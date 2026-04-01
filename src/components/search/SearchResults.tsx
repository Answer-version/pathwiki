import RoadmapCard from "@/components/roadmap/RoadmapCard";
import type { Roadmap } from "@/types/roadmap";

interface SearchResultsProps {
  results: Roadmap[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400 mb-2">未找到与&quot;{query}&quot;相关的路线</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">尝试使用不同的关键词搜索</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        找到 {results.length} 条与&quot;{query}&quot;相关的路线
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
