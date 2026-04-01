export const SITE_CONFIG = {
  name: "PathWiki",
  description: "全球学习路线平台 - 任何人都能在这里找到从零到精通的成长路线图",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pathwiki.example.com",
  locale: "zh-CN",
  author: "PathWiki Team",
};

export const NAV_ITEMS = [
  { label: "首页", href: "/" },
  { label: "路线", href: "/roadmaps" },
  { label: "分类", href: "/categories" },
  { label: "关于", href: "/about" },
];
