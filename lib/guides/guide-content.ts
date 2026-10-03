export interface GuideArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  category: 'shipping-guides' | 'cargo-rates' | 'customs-documentation' | 'packing-guides' | 'destinations-guide' | 'cargo-types';
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  seoTitle: string;
  seoDescription: string;
  searchIntent: 'informational' | 'commercial-investigation' | 'transactional-support';
  primaryTopic: string;
  containsRegulatoryClaims: boolean;
  verificationNotes?: string;
  supportedServices: string[];
  supportedOrigins: string[];
  supportedDestinations: string[];
  status: 'published' | 'draft' | 'review' | 'needs_update' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
  isFeatured?: boolean;
  faqs?: Array<{ question: string; answer: string }>;
}

export const staticArticles: GuideArticleData[] = [];

export function getPublishedStaticArticles(): GuideArticleData[] {
  return staticArticles.filter(
    (art) => art.status === 'published' && art.isVerified === true && art.isIndexable === true
  );
}

export function getStaticArticleBySlug(slug: string): GuideArticleData | undefined {
  const article = staticArticles.find((a) => a.slug === slug);
  if (
    article &&
    article.status === 'published' &&
    article.isVerified === true &&
    article.isIndexable === true
  ) {
    return article;
  }
  return undefined;
}
