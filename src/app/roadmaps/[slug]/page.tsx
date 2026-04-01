import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, BookOpen, Users, Heart, Share2, ArrowLeft } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/layout/Breadcrumb";
import RoadmapTree from "@/components/roadmap/RoadmapTree";
import ProgressTracker from "@/components/roadmap/ProgressTracker";
import { RoadmapJsonLd } from "@/components/seo/JsonLd";
import { getRoadmapBySlug, getAllRoadmapSlugs } from "@/lib/roadmaps";
import { SITE_CONFIG } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllRoadmapSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) {
    return { title: "路线未找到" };
  }

  return {
    title: roadmap.metadata.metaTitle || `${roadmap.title} | PathWiki`,
    description: roadmap.metadata.metaDescription || roadmap.description,
    keywords: roadmap.metadata.keywords || roadmap.tags,
    openGraph: {
      title: roadmap.metadata.metaTitle || roadmap.title,
      description: roadmap.metadata.metaDescription || roadmap.description,
      images: roadmap.metadata.ogImage ? [roadmap.metadata.ogImage] : [],
      type: "article",
    },
    alternates: {
      canonical: roadmap.metadata.canonicalUrl,
    },
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) {
    notFound();
  }

  const totalNodes = roadmap.nodes?.length || roadmap.totalNodes || 0;
  const url = `${SITE_CONFIG.url}/roadmaps/${slug}`;

  return (
    <>
      <RoadmapJsonLd roadmap={roadmap} url={url} />

      {/* Progress Tracker */}
      <ProgressTracker totalNodes={totalNodes} roadmapId={roadmap.id} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "路线", href: "/roadmaps" },
            { label: roadmap.category.name, href: `/category/${roadmap.category.slug}` },
            { label: roadmap.title },
          ]}
          className="mb-6"
        />

        {/* Back Button (Mobile) */}
        <Link
          href="/roadmaps"
          className="md:hidden flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-500 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          返回路线列表
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="difficulty" difficulty={roadmap.difficulty} />
                {roadmap.estimatedTime && (
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    约{roadmap.estimatedTime.value}小时
                  </span>
                )}
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {totalNodes}个阶段
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {roadmap.title}
              </h1>
              {roadmap.subtitle && (
                <p className="text-slate-500 dark:text-slate-400 mt-1">{roadmap.subtitle}</p>
              )}
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-4">{roadmap.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {roadmap.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-600 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Suitable For */}
          {roadmap.suitableFor && roadmap.suitableFor.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-slate-500 mb-2">适合人群：</p>
              <div className="flex flex-wrap gap-2">
                {roadmap.suitableFor.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded text-xs text-indigo-600 dark:text-indigo-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1">
              开始学习
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              收藏
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              分享
            </Button>
          </div>
        </div>

        {/* Roadmap Tree */}
        <div className="bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            学习路线图
          </h2>
          <RoadmapTree nodes={roadmap.nodes} />
        </div>

        {/* Related Roadmaps placeholder */}
        {roadmap.relatedRoadmaps && roadmap.relatedRoadmaps.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              相关路线
            </h2>
            {/* Related roadmaps would go here */}
          </div>
        )}
      </div>
    </>
  );
}
