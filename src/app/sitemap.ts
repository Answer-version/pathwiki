import { MetadataRoute } from "next";
import { getAllRoadmaps, getAllCategories } from "@/lib/roadmaps";
import { SITE_CONFIG } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const roadmaps = getAllRoadmaps();
  const categories = getAllCategories();

  const roadmapUrls = roadmaps.map((r) => ({
    url: `${baseUrl}/roadmaps/${r.slug}`,
    lastModified: new Date(r.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/roadmaps`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...roadmapUrls,
    ...categoryUrls,
  ];
}
