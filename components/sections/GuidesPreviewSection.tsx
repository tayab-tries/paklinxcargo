import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export interface GuidesPreviewSectionProps {
  blockData?: Record<string, unknown>;
}

export const GuidesPreviewSection: React.FC<GuidesPreviewSectionProps> = ({ blockData }) => {
  const badge = (blockData?.badge as string) || 'Resources & Knowledge';
  const title = (blockData?.title as string) || 'Cargo & Export Educational Guides';
  const subtitle =
    (blockData?.subtitle as string) ||
    'Practical guidance on packaging standards, export documentation rules, and transit mode selection.';

  const guides = [
    {
      slug: 'air-vs-sea-cargo',
      title: 'Air Cargo vs Sea Cargo: Choosing the Right Transit Mode',
      category: 'Shipping Guide',
      readTime: '6 min read',
      excerpt: 'Comprehensive comparison of volumetric weight calculations, transit speeds, and cost structures for commercial exports.',
      isFeatured: true,
    },
    {
      slug: 'export-customs-documentation-guide',
      title: 'Pakistan Export Customs Documentation Checklist',
      category: 'Customs & Compliance',
      readTime: '8 min read',
      excerpt: 'Essential commercial invoice preparation, packing lists, and export declaration procedures.',
      isFeatured: false,
    },
    {
      slug: 'packing-cargo-guide',
      title: 'International Cargo Packaging & Wooden Crating Rules',
      category: 'Packaging',
      readTime: '5 min read',
      excerpt: 'Standardized crating requirements to prevent cargo damage during international air and ocean transit.',
      isFeatured: false,
    },
  ];

  const featured = guides.find((g) => g.isFeatured);
  const supporting = guides.filter((g) => !g.isFeatured);

  return (
    <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-14" />

        {/* 1 Dominant Featured Article + 2 Editorial Supporting Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Dominant Featured Article */}
          {featured && (
            <div className="lg:col-span-7 bg-surface rounded-md border border-border overflow-hidden p-8 flex flex-col justify-between space-y-6 group hover:border-accent transition-colors shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{featured.category}</Badge>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featured.readTime}</span>
                  </div>
                </div>

                <h3 className="text-heading-xl font-bold text-brand-black group-hover:text-accent transition-colors">
                  <Link href="/services/air-freight">{featured.title}</Link>
                </h3>

                <p className="text-body-md text-slate-600 leading-relaxed font-normal">{featured.excerpt}</p>

                {/* Featured Photo Slot */}
                <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-brand-black-deep mt-4 border border-border">
                  <Image
                    src={IMAGE_SLOTS.guideCover.src}
                    alt={IMAGE_SLOTS.guideCover.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">Featured Service Comparison</span>
                <Link
                  href="/services/air-freight"
                  className="text-xs font-mono font-semibold text-brand-black group-hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  <span>Compare Air & Sea Cargo</span>
                  <ArrowRight className="w-4 h-4 text-brand-black group-hover:text-accent" />
                </Link>
              </div>
            </div>
          )}

          {/* Supporting Articles */}
          <div className="lg:col-span-5 bg-surface rounded-md border border-border p-8 flex flex-col justify-between divide-y divide-border shadow-xs">
            <div className="text-xs font-mono font-semibold uppercase text-slate-400 tracking-wider pb-4">
              Supporting Guides & Documentation
            </div>

            {supporting.map((guide) => (
              <div key={guide.slug} className="py-6 space-y-3 group first:pt-4 last:pb-0">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-medium text-slate-600">{guide.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h3 className="text-heading-sm font-bold text-brand-black group-hover:text-accent transition-colors">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h3>

                <p className="text-body-sm text-slate-600 leading-relaxed line-clamp-2">{guide.excerpt}</p>

                <div className="pt-1">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-xs font-mono font-semibold text-brand-black group-hover:text-accent flex items-center gap-1 transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-black hover:text-accent transition-colors"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Explore All Educational Resources & Articles →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
