import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的",
  description: "个人中心",
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          个人中心
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          登录后可以收藏路线、跟踪学习进度、同步笔记。
        </p>
        <button className="h-11 px-6 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors">
          登录 / 注册
        </button>
      </div>
    </div>
  );
}
