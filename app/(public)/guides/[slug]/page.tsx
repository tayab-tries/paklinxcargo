import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import {
  getPublishedStaticArticles,
  getStaticArticleBySlug,
  GuideArticleData,
} from '@/lib/guides/guide-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { GuideHero } from '@/components/guides/GuideHero';
import { ArticleSummaryCallout } from '@/components/guides/ArticleSummaryCallout';
import { ArticleBody } from '@/components/guides/ArticleBody';
import { ArticleConsiderations } from '@/components/guides/ArticleConsiderations';
import { RelatedServicesBar } from '@/components/guides/RelatedServicesBar';
import { RelatedDestinationsBar } from '@/components/guides/RelatedDestinationsBar';
import { RelatedLocationsBar } from '@/components/guides/RelatedLocationsBar';
import { RelatedGuidesGrid } from '@/components/guides/RelatedGuidesGrid';
import { ArticleFaq } from '@/components/guides/ArticleFaq';
import { ArticleCta } from '@/components/guides/ArticleCta';
import { getSanityGuideBySlug, getSanityGuidesList, SanityGuideDocument } from '@/sanity/lib/fetch';

interface GuideArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sanityGuides = await getSanityGuidesList();
  if (sanityGuides && sanityGuides.length > 0) {
    return sanityGuides.map((guide) => ({ slug: guide.slug }));
  }
  const publishedArticles = getPublishedStaticArticles();
  return publishedArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: GuideArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const sanityGuide = await getSanityGuideBySlug(slug, { stega: false });
  const fallbackArticle = getStaticArticleBySlug(slug);

  if (!sanityGuide && !fallbackArticle) {
    return {
      title: `Article Not Found | ${siteConfig.name}`,
    };
  }

  const title =
    sanityGuide?.seo?.metaTitle ||
    (fallbackArticle ? `${fallbackArticle.seoTitle} | ${siteConfig.name}` : `Shipping Guide | ${siteConfig.name}`);

  const description =
    sanityGuide?.seo?.metaDescription ||
    fallbackArticle?.seoDescription ||
    'Customs and shipping guide for international cargo from Pakistan.';

  const canonicalUrl = `${siteConfig.domain}/guides/${slug}`;
  const publishedTime = sanityGuide?.publishedAt || fallbackArticle?.publishedAt || '2026-08-01';
  const authorName = sanityGuide?.authorName || fallbackArticle?.authorName || 'Logistics Editorial Team';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime,
      authors: [authorName],
      images: sanityGuide?.seo?.socialImage ? [{ url: sanityGuide.seo.socialImage }] : [],
    },
  };
}

export default async function GuideArticleDetailPage({ params }: GuideArticlePageProps) {
  const { slug } = await params;
  const sanityGuide: SanityGuideDocument | null = await getSanityGuideBySlug(slug);
  const fallbackArticle = getStaticArticleBySlug(slug);

  // Authoritative Verification Check
  if (!sanityGuide && !fallbackArticle) {
    notFound();
  }

  const article: GuideArticleData = {
    id: sanityGuide?._id || fallbackArticle?.id || slug,
    title: sanityGuide?.title || fallbackArticle?.title || 'Shipping Guide',
    slug,
    excerpt: sanityGuide?.excerpt || fallbackArticle?.excerpt || '',
    contentMarkdown: sanityGuide?.contentMarkdown || fallbackArticle?.contentMarkdown || '',
    category: sanityGuide?.category || fallbackArticle?.category || 'shipping-guides',
    authorName: sanityGuide?.authorName || fallbackArticle?.authorName || 'Logistics Editorial Team',
    publishedAt: sanityGuide?.publishedAt || fallbackArticle?.publishedAt || '2026-08-01',
    updatedAt: sanityGuide?.updatedAt || fallbackArticle?.updatedAt,
    readingTimeMinutes: sanityGuide?.readingTimeMinutes || fallbackArticle?.readingTimeMinutes || 5,
    seoTitle: sanityGuide?.seo?.metaTitle || fallbackArticle?.seoTitle || sanityGuide?.title || 'Shipping Guide',
    seoDescription: sanityGuide?.seo?.metaDescription || fallbackArticle?.seoDescription || sanityGuide?.excerpt || '',
    searchIntent: fallbackArticle?.searchIntent || 'informational',
    primaryTopic: fallbackArticle?.primaryTopic || sanityGuide?.title || 'Logistics Guide',
    containsRegulatoryClaims: sanityGuide?.containsRegulatoryClaims ?? fallbackArticle?.containsRegulatoryClaims ?? false,
    verificationNotes: sanityGuide?.verificationNotes || fallbackArticle?.verificationNotes,
    supportedServices: sanityGuide?.supportedServices || fallbackArticle?.supportedServices || [],
    supportedOrigins: sanityGuide?.supportedOrigins || fallbackArticle?.supportedOrigins || [],
    supportedDestinations: sanityGuide?.supportedDestinations || fallbackArticle?.supportedDestinations || [],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    isFeatured: sanityGuide?.isFeatured ?? fallbackArticle?.isFeatured ?? false,
    faqs: sanityGuide?.faqs || fallbackArticle?.faqs || [],
  };

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Guides', url: '/guides' },
    { label: article.title, url: `/guides/${article.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Schema.org Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription,
    author: {
      '@type': 'Organization',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: `${siteConfig.domain}/guides/${article.slug}`,
  };

  // Schema.org FAQPage JSON-LD if FAQs exist
  const faqJsonLd =
    article.faqs && article.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="w-full bg-[#F6F2E9] text-[#17201B]">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 01 Guide Hero Block */}
      <GuideHero
        title={article.title}
        excerpt={article.excerpt}
        category={article.category}
        authorName={article.authorName}
        publishedAt={article.publishedAt}
        readingTimeMinutes={article.readingTimeMinutes}
        containsRegulatoryClaims={article.containsRegulatoryClaims}
        breadcrumbs={breadcrumbs}
      />

      {/* 02 Article Main Reading Container (Max ~65–72ch) */}
      <section className="w-full py-16 lg:py-24 bg-white border-b border-[#17201B]/15">
        <Container size="narrow">
          {/* Executive Summary Callout */}
          <ArticleSummaryCallout summaryText={article.excerpt} />

          {/* Article Main Body (Portable Text from Sanity, or Markdown fallback) */}
          <ArticleBody body={sanityGuide?.body} contentMarkdown={article.contentMarkdown} />

          {/* Regulatory Considerations */}
          <ArticleConsiderations
            containsRegulatoryClaims={article.containsRegulatoryClaims}
            verificationNotes={article.verificationNotes}
          />

          {/* Publication-Aware Related Inter-Links */}
          <RelatedServicesBar supportedServices={article.supportedServices} />
          <RelatedDestinationsBar supportedDestinations={article.supportedDestinations} />
          <RelatedLocationsBar supportedOrigins={article.supportedOrigins} />

          {/* Related Guides */}
          <RelatedGuidesGrid currentSlug={article.slug} category={article.category} />

          {/* Article FAQ */}
          <ArticleFaq faqs={article.faqs} />
        </Container>
      </section>

      {/* 03 High-Impact Quote CTA */}
      <ArticleCta />
    </article>
  );
}
