import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              PathWiki
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              任何人都能在这里找到从零到精通的成长路线图。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              快速链接
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/roadmaps"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  学习路线
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  浏览分类
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              法律信息
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  使用条款
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} PathWiki. 学习路上，与你同行。
          </p>
        </div>
      </div>
    </footer>
  );
}
