"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ defaultValue = "", className = "", autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索路线、技能或行业..."
        className="w-full h-12 pl-12 pr-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 shadow-sm transition-all duration-200"
        autoFocus={autoFocus}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-14 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
      >
        搜索
      </button>
    </form>
  );
}
