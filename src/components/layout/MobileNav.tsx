"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Heart, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "首页" },
  { href: "/roadmaps", icon: BookOpen, label: "路线" },
  { href: "/profile/collections", icon: Heart, label: "收藏" },
  { href: "/profile", icon: User, label: "我的" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-100 dark:border-slate-800 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-14 relative ${
                isActive ? "text-indigo-500" : "text-slate-400"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 bg-indigo-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
