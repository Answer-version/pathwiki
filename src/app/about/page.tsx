import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "了解 PathWiki 全球学习路线平台",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          关于 PathWiki
        </h1>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              我们的使命
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              PathWiki 致力于为每个人提供清晰、系统化的学习路径。我们相信，无论你是想转行、晋升还是纯粹学习，都应该有一条清晰的道路可循。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              我们的特点
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>权威内容</strong> — 路线内容由行业从业者精心编排</li>
              <li><strong>结构化学习</strong> — 每个路线以清晰的阶段呈现</li>
              <li><strong>实用资源</strong> — 每个节点标注推荐资源</li>
              <li><strong>免费先行</strong> — 核心路线免费开放</li>
              <li><strong>移动优先</strong> — 手机上流畅浏览和学习</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              技术栈
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              使用 Next.js 14、TypeScript、Tailwind CSS 构建，支持 SSG/ISR 静态生成，
              确保最佳的加载性能和 SEO 效果。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              联系方式
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              如有问题或建议，欢迎通过 GitHub Issues 与我们联系。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
