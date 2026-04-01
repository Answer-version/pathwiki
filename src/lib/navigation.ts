import type { ResourceType } from "@/types/roadmap";

// Resource type to icon mapping
export const resourceTypeIcons: Record<ResourceType, string> = {
  article: "📄",
  video: "🎬",
  course: "🎓",
  book: "📚",
  project: "🚀",
  exercise: "💪",
  community: "👥",
};

// Resource type to label mapping
export const resourceTypeLabels: Record<ResourceType, string> = {
  article: "文章",
  video: "视频",
  course: "课程",
  book: "书籍",
  project: "项目",
  exercise: "练习",
  community: "社区",
};

// Get icon for resource type
export function getResourceIcon(type: ResourceType): string {
  return resourceTypeIcons[type] || "📄";
}

// Get label for resource type
export function getResourceLabel(type: ResourceType): string {
  return resourceTypeLabels[type] || "资源";
}

// Format duration string (e.g., "2小时30分钟" or "10分钟")
export function formatDuration(duration: string | undefined): string {
  if (!duration) return "";
  return duration;
}

// Format rating stars
export function formatRating(rating: number | undefined): string {
  if (!rating) return "";
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars);
}

// Platform color mapping
export const platformColors: Record<string, string> = {
  "MDN": "text-blue-600",
  "Bilibili": "text-pink-500",
  "YouTube": "text-red-500",
  "慕课网": "text-green-500",
  "腾讯课堂": "text-blue-400",
  "极客时间": "text-green-600",
  "网易云课堂": "text-red-400",
  "Coursera": "text-blue-500",
  "Udemy": "text-purple-500",
  "freeCodeCamp": "text-green-500",
};

// Get color for platform
export function getPlatformColor(platform: string | undefined): string {
  if (!platform) return "text-slate-500";
  return platformColors[platform] || "text-slate-500";
}
