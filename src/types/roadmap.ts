export type Difficulty = "beginner" | "intermediate" | "advanced";
export type NodeType = "phase" | "module" | "lesson" | "checkpoint";
export type ResourceType = "article" | "video" | "course" | "book" | "project" | "exercise" | "community";
export type Locale = "zh-CN" | "en-US";

export interface EstimatedTime {
  value: number;
  unit: "days" | "weeks" | "months" | "hours";
  note?: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: ResourceType;
  url?: string;
  isFree: boolean;
  isExternal?: boolean;
  description?: string;
  author?: string;
  platform?: string;
  language?: Locale;
  duration?: string;
  level?: Difficulty;
  rating?: number;
}

export interface RoadmapNode {
  id: string;
  type: NodeType;
  title: string;
  description?: string;
  icon?: string;
  resources: LearningResource[];
  subNodes?: RoadmapNode[];
  estimatedTime?: EstimatedTime;
  isOptional?: boolean;
  prerequisiteNodeIds?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  icon?: string;
  parentId?: string;
  order: number;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  title?: string;
  bio?: string;
  links?: { label: string; url: string }[];
}

export interface Metadata {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  estimatedTime: EstimatedTime;
  description: string;
  coverImage?: ImageAsset;
  author?: Author;
  metadata: Metadata;
  nodes: RoadmapNode[];
  relatedRoadmaps?: string[];
  locale: Locale;
  publishedAt: string;
  updatedAt: string;
  version: string;
  suitableFor?: string[];
  totalNodes?: number;
}
