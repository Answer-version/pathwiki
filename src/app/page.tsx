import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import RoadmapCard from "@/components/roadmap/RoadmapCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getAllRoadmaps, getAllCategories } from "@/lib/roadmaps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PathWiki - 全球学习路线平台",
  description: "任何人都能在这里找到从零到精通的成长路线图。探索各行业、职业技能的完整学习路线。",
};

export default function HomePage() {
  const roadmaps = getAllRoadmaps();
  const categories = getAllCategories();
  const featuredRoadmaps = roadmaps.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-50 via-white to-slate-50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            发现你的成长路线
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            找到你的<span className="text-indigo-500">成长路线</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            从零基础到专业水平，我们为每个领域精心设计了完整的学习路径。
            无论你是想转行、晋升还是纯粹学习，都能找到适合自己的路线。
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <div>
              <span className="text-2xl font-bold text-indigo-500">{roadmaps.length}</span>
              <span className="ml-1">条学习路线</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-indigo-500">{categories.length}</span>
              <span className="ml-1">个专业分类</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-indigo-500">100%</span>
              <span className="ml-1">免费内容</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">浏览分类</h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Roadmaps */}
      <section className="py-12 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">热门路线</h2>
            <Link
              href="/roadmaps"
              className="text-sm text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-500 dark:bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            准备好开始你的学习之旅了吗？
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            加入数千名学习者，开始系统化学习，提升你的职业技能。
            所有内容完全免费。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/roadmaps">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto">
                浏览全部路线
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-indigo-400 w-full sm:w-auto">
                了解更多
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
