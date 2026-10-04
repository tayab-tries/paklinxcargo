import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, ShieldCheck, Plane, FileText, Package, Luggage } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getPublishedStaticArticles, GuideArticleData } from '@/lib/guides/guide-content';
import { siteConfig } from '@/config/site.config';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import { getSanityGuidesList, SanityGuideDocument } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: `Customs & Shipping Educational Guides | ${siteConfig.name}`,
  description:
    'Educational resources, export compliance advice, packing guidelines, and shipping mode comparisons for cargo originating in Pakistan.',
  alternates: {
    canonical: `${siteConfig.domain}/guides`,
  },
  openGraph: {
    title: `Customs & International Cargo Shipping Guides | ${siteConfig.name}`,
    description:
      'Practical guidance on packaging standards, export documentation rules, air vs sea freight selection, and international transit.',
    url: `${siteConfig.domain}/guides`,
    type: 'website',
  },
};

interface GuidesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GuidesHubPage({ searchParams }: GuidesPageProps) {
  const { category: activeCategory } = await searchParams;

  const [sanityGuides, fallbackGuides] = await Promise.all([
    getSanityGuidesList(),
    getPublishedStaticArticles(),
  ]);

  const allArticles: GuideArticleData[] =
    sanityGuides.length > 0
      ? sanityGuides.map((doc: SanityGuideDocument) => {
          const fallback = fallbackGuides.find((f) => f.slug === doc.slug);
          return {
            id: doc._id || doc.slug,
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt || fallback?.excerpt || '',
            contentMarkdown: doc.contentMarkdown || fallback?.contentMarkdown || '',
            category: doc.category || fallback?.category || 'shipping-guides',
            authorName: doc.authorName || fallback?.authorName || 'Logistics Editorial Team',
            publishedAt: doc.publishedAt || fallback?.publishedAt || '2026-08-01',
            updatedAt: doc.updatedAt || fallback?.updatedAt,
            readingTimeMinutes: doc.readingTimeMinutes || fallback?.readingTimeMinutes || 5,
            seoTitle: doc.seo?.metaTitle || fallback?.seoTitle || doc.title,
            seoDescription: doc.seo?.metaDescription || fallback?.seoDescription || doc.excerpt,
            searchIntent: fallback?.searchIntent || 'informational',
            primaryTopic: fallback?.primaryTopic || doc.title,
            containsRegulatoryClaims: doc.containsRegulatoryClaims ?? fallback?.containsRegulatoryClaims ?? false,
            verificationNotes: doc.verificationNotes || fallback?.verificationNotes,
            supportedServices: doc.supportedServices || fallback?.supportedServices || [],
            supportedOrigins: doc.supportedOrigins || fallback?.supportedOrigins || [],
            supportedDestinations: doc.supportedDestinations || fallback?.supportedDestinations || [],
            status: 'published',
            isVerified: true,
            isIndexable: true,
            isFeatured: doc.isFeatured ?? fallback?.isFeatured ?? false,
            faqs: doc.faqs || fallback?.faqs || [],
          };
        })
      : fallbackGuides;

  const filteredArticles = activeCategory
    ? allArticles.filter((a) => a.category === activeCategory)
    : allArticles;

  const featuredArticle = allArticles.find((a) => a.isFeatured) || allArticles[0];
  const supportingArticles = filteredArticles.filter((a) => a.slug !== featuredArticle?.slug);

  const categories = [
    { label: 'ALL GUIDES', slug: '' },
    { label: 'SHIPPING GUIDES', slug: 'shipping-guides' },
    { label: 'CARGO RATES', slug: 'cargo-rates' },
    { label: 'CUSTOMS & DOCS', slug: 'customs-documentation' },
    { label: 'PACKING GUIDES', slug: 'packing-guides' },
    { label: 'DESTINATIONS', slug: 'destinations-guide' },
    { label: 'CARGO TYPES', slug: 'cargo-types' },
  ];

  const quickStartTopics = [
    {
      step: '01',
      icon: Plane,
      title: 'Decide Air vs Sea Transit',
      slug: 'air-vs-sea-cargo',
      description: 'Compare volumetric rate structures, transit timelines, and weight minimums for air freight vs ocean sea cargo.',
    },
    {
      step: '02',
      icon: FileText,
      title: 'Understand Export Documentation',
      slug: 'export-customs-documentation-guide',
      description: 'Review invoice preparation, itemized packing lists, shipper identification, and Pakistan customs clearance rules.',
    },
    {
      step: '03',
      icon: Package,
      title: 'Prepare & Pack Your Shipment',
      slug: 'packing-cargo-guide',
      description: 'Learn double-wall export box standards, cushioning techniques, and wooden crating compliance rules.',
    },
    {
      step: '04',
      icon: Luggage,
      title: 'Excess Baggage Requirements',
      slug: 'excess-baggage-guide',
      description: 'Cost-effective cargo alternatives for personal luggage, student moves, and family relocation items.',
    },
  ];

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Guides', url: '/guides' },
  ];

  return (
    <div className="w-full bg-[#F6F2E9] text-[#17201B]">
      {/* 1. EDITORIAL HERO */}
      <section className="relative w-full bg-[#12372A] text-white py-20 lg:py-28 border-b border-[#17201B]/20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#12372A]">
          <Image
            src="/images/hero-freight.jpg"
            alt="International Cargo Educational Knowledge Center"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-15 mix-blend-overlay"
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, rgba(18,55,42,0.95) 0%, rgba(18,55,42,0.98) 100%)`,
            }}
          />
        </div>

        <Container className="relative z-20">
          <Breadcrumbs items={breadcrumbs} variantSurface="dark" className="mb-8" />

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 bg-[#1F8A5B]/30 text-[#C6A15B] border border-[#C6A15B]/30 rounded-xs">
                LOGISTICS GUIDES
              </span>
              <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                TECHNICAL ADVISORY & COMPLIANCE
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08]">
              Know what to ship. <br className="hidden sm:inline" />
              Know how to prepare.
            </h1>

            <p className="text-base sm:text-lg text-[#F6F2E9]/85 leading-relaxed font-normal max-w-2xl">
              Practical guides on international cargo, customs documentation, packaging standards, air vs sea freight selection, and doorstep pickup from Pakistan.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/quote">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto h-[52px] bg-[#C6A15B] hover:bg-[#b08e4d] text-[#17201B] font-bold px-8"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#17201B] shrink-0" />}
                >
                  REQUEST A QUOTE
                </Button>
              </Link>
              <a href="#directory">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto h-[52px] border-white/30 text-white hover:bg-white/10 font-mono text-xs uppercase tracking-wider px-8"
                >
                  BROWSE GUIDES
                </Button>
              </a>
            </div>

            <div className="pt-8 border-t border-white/15 flex items-center gap-2 text-xs font-mono text-[#F6F2E9]/70">
              <ShieldCheck className="w-4 h-4 text-[#1F8A5B] shrink-0" />
              <span>Verified Customs Compliance Advice • Packaging Guidelines • Freight Mode Analysis</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. EDITORIAL CATEGORY NAVIGATION */}
      <section className="w-full bg-[#F6F2E9] border-b border-[#17201B]/15 sticky top-16 z-30 shadow-2xs">
        <Container>
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4 text-xs font-mono tracking-wider">
            {categories.map((cat) => {
              const isActive = (activeCategory || '') === cat.slug;
              const href = cat.slug ? `/guides?category=${cat.slug}` : '/guides';
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className={`shrink-0 pb-1.5 border-b-2 font-bold transition-all ${
                    isActive
                      ? 'border-[#1F8A5B] text-[#12372A]'
                      : 'border-transparent text-[#17201B]/60 hover:text-[#17201B]'
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. FEATURED COVER STORY */}
      {!activeCategory && featuredArticle && (
        <section className="w-full bg-white py-20 lg:py-28 border-b border-[#17201B]/15">
          <Container>
            <div className="mb-10 flex items-center justify-between border-b border-[#17201B]/15 pb-4">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                FEATURED PUBLICATION
              </span>
              <span className="font-mono text-xs text-[#17201B]/60 uppercase">
                COVER STORY
              </span>
            </div>

            <div className="bg-[#F6F2E9] border border-[#17201B]/15 p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Featured Visual Area */}
              <div className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden bg-[#12372A] border border-[#17201B]/15 shadow-sm">
                <Image
                  src={IMAGE_SLOTS.guideCover.src}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-center"
                />
              </div>

              {/* Featured Editorial Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono text-[#17201B]/60">
                  <span className="px-2.5 py-1 bg-[#1F8A5B]/15 text-[#1F8A5B] font-bold uppercase tracking-wider">
                    {featuredArticle.category.replace('-', ' ')}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.readingTimeMinutes} MIN READ</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#17201B] leading-tight hover:text-[#1F8A5B] transition-colors">
                  <Link href={`/guides/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                </h2>

                <p className="text-sm sm:text-base text-[#17201B]/80 leading-relaxed font-normal">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-6 border-t border-[#17201B]/15 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-xs font-mono text-[#17201B]/60">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#1F8A5B]" />
                      {featuredArticle.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1F8A5B]" />
                      {featuredArticle.authorName}
                    </span>
                  </div>

                  <Link href={`/guides/${featuredArticle.slug}`}>
                    <Button
                      variant="accent"
                      size="md"
                      className="bg-[#12372A] hover:bg-[#17201B] text-white font-mono text-xs font-bold uppercase tracking-wider px-6"
                      rightIcon={<ArrowRight className="w-4 h-4 text-[#C6A15B]" />}
                    >
                      READ GUIDE →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. TYPOGRAPHIC GUIDE DIRECTORY */}
      <section id="directory" className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#17201B]/15">
        <Container>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#17201B]/15 pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest block mb-2">
                ARTICLE DIRECTORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                {activeCategory ? `Guides in "${activeCategory.replace('-', ' ')}"` : 'Logistics Articles & Advisory Documents'}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#17201B]/60 uppercase">
              {supportingArticles.length} ARTICLES AVAILABLE
            </span>
          </div>

          {supportingArticles.length === 0 ? (
            <div className="p-12 bg-white border border-[#17201B]/15 text-center text-[#17201B]/60 font-mono text-xs">
              No additional guides found in this category.
            </div>
          ) : (
            <div className="divide-y divide-[#17201B]/15 border-t border-b border-[#17201B]/15">
              {supportingArticles.map((art, idx) => {
                const indexFormatted = String(idx + 1).padStart(2, '0');
                return (
                  <Link
                    key={art.slug}
                    href={`/guides/${art.slug}`}
                    className="py-8 lg:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/50 transition-colors group px-4"
                  >
                    <div className="flex items-start gap-6 md:w-3/4">
                      <span className="font-mono text-xl lg:text-2xl font-bold text-[#1F8A5B] shrink-0 pt-0.5">
                        {indexFormatted}
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs font-mono text-[#17201B]/60">
                          <span className="uppercase font-bold text-[#1F8A5B]">
                            {art.category.replace('-', ' ')}
                          </span>
                          <span>•</span>
                          <span>{art.readingTimeMinutes} MIN READ</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors leading-tight">
                          {art.title}
                        </h3>

                        <p className="text-sm text-[#17201B]/75 leading-relaxed line-clamp-2 font-normal">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:justify-end shrink-0 pl-12 md:pl-0">
                      <span className="font-mono text-xs font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors">
                        READ ARTICLE
                      </span>
                      <ArrowRight className="w-5 h-5 text-[#17201B]/40 group-hover:text-[#1F8A5B] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* 5. START HERE / PRACTICAL GUIDANCE */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#17201B]/15">
        <Container>
          <div className="mb-14 text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              NEW TO INTERNATIONAL CARGO?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
              Essential Preparation Workflow
            </h2>
            <p className="text-sm text-[#17201B]/75 font-normal">
              Follow these recommended advisory topics prior to dispatching your cargo from Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStartTopics.map((topic) => {
              const IconComp = topic.icon;
              return (
                <Link
                  key={topic.slug}
                  href={`/guides/${topic.slug}`}
                  className="bg-[#F6F2E9] border border-[#17201B]/15 p-8 flex flex-col justify-between hover:border-[#1F8A5B] transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1F8A5B]">
                        {topic.step}
                      </span>
                      <div className="p-2.5 bg-[#12372A] text-[#C6A15B]">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-[#17201B]/75 leading-relaxed font-normal">
                      {topic.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#17201B]/10 flex items-center justify-between text-xs font-mono font-bold text-[#17201B] group-hover:text-[#1F8A5B] mt-6">
                    <span>READ TOPIC</span>
                    <ArrowRight className="w-4 h-4 text-[#17201B]/40 group-hover:text-[#1F8A5B] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6. CONVERSION SECTION */}
      <FinalCtaSection
        eyebrow="Still Unsure How to Ship It?"
        heading="Let Us Recommend the Right Cargo Solution."
        description="Describe your cargo, destination, and timeline. Our export desk will guide your freight selection and documentation."
      />
    </div>
  );
}

