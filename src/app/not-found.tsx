import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          页面未找到
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          抱歉，您访问的页面不存在或已被删除。
        </p>
        <Link href="/">
          <Button variant="primary">返回首页</Button>
        </Link>
      </div>
    </div>
  );
}
