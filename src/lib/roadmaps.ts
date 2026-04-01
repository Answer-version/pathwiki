import fs from "fs";
import path from "path";
import type { Roadmap, Category } from "@/types/roadmap";

const roadmapsDir = path.join(process.cwd(), "data", "roadmaps");

export function getAllRoadmaps(): Roadmap[] {
  const files = fs.readdirSync(roadmapsDir).filter((f) => f.endsWith(".json"));
  const roadmaps: Roadmap[] = [];

  for (const file of files) {
    const filePath = path.join(roadmapsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const roadmap = JSON.parse(content) as Roadmap;
    roadmaps.push(roadmap);
  }

  return roadmaps;
}

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  const filePath = path.join(roadmapsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Roadmap;
}

export function getAllCategories(): Category[] {
  const filePath = path.join(process.cwd(), "data", "categories.json");
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Category[];
}

export function getRoadmapsByCategory(categorySlug: string): Roadmap[] {
  return getAllRoadmaps().filter((r) => r.category.slug === categorySlug);
}

export function searchRoadmaps(query: string): Roadmap[] {
  const lowerQuery = query.toLowerCase();
  return getAllRoadmaps().filter(
    (r) =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.description.toLowerCase().includes(lowerQuery) ||
      r.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      r.category.name.toLowerCase().includes(lowerQuery)
  );
}

export function getAllRoadmapSlugs(): string[] {
  return getAllRoadmaps().map((r) => r.slug);
}

export function getAllCategorySlugs(): string[] {
  return getAllCategories().map((c) => c.slug);
}
