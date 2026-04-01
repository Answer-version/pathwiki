import type { Roadmap } from "@/types/roadmap";

interface JsonLdProps {
  type: "Article" | "BreadcrumbList" | "Course";
  data: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface RoadmapJsonLdProps {
  roadmap: Roadmap;
  url: string;
}

export function RoadmapJsonLd({ roadmap, url }: RoadmapJsonLdProps) {
  const articleData = {
    "@type": "Article",
    headline: roadmap.title,
    description: roadmap.description,
    image: roadmap.coverImage?.src,
    author: roadmap.author
      ? { "@type": "Person", name: roadmap.author.name }
      : undefined,
    datePublished: roadmap.publishedAt,
    dateModified: roadmap.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbData = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: url.split("/roadmaps")[0] || url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: roadmap.category.name,
        item: `${url.split("/roadmaps")[0]}/category/${roadmap.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: roadmap.title,
      },
    ],
  };

  const courseData = {
    "@type": "Course",
    name: roadmap.title,
    description: roadmap.description,
    provider: { "@type": "Organization", name: "PathWiki" },
    ...(roadmap.estimatedTime
      ? {
          estimatedCost: {
            "@type": "MonetaryAmount",
            value: 0,
            currency: "USD",
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd type="Article" data={articleData} />
      <JsonLd type="BreadcrumbList" data={breadcrumbData} />
      <JsonLd type="Course" data={courseData} />
    </>
  );
}
