import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的收藏",
  description: "查看收藏的学习路线",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        我的收藏
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          登录后可查看收藏的路线
        </p>
      </div>
    </div>
  );
}
