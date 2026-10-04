import React from 'react';
import { Calendar, Clock, User, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface GuideHeroProps {
  title: string;
  excerpt: string;
  category: string;
  authorName: string;
  publishedAt: string;
  readingTimeMinutes: number;
  containsRegulatoryClaims?: boolean;
  breadcrumbs?: Array<{ label: string; url?: string; href?: string }>;
}

export const GuideHero: React.FC<GuideHeroProps> = ({
  title,
  excerpt,
  category,
  authorName,
  publishedAt,
  readingTimeMinutes,
  containsRegulatoryClaims,
  breadcrumbs = [],
}) => {
  const formattedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.label,
    href: b.url || b.href,
  }));

  return (
    <section className="w-full bg-[#12372A] text-white py-16 lg:py-24 border-b border-[#17201B]/20">
      <Container size="narrow">
        {formattedBreadcrumbs.length > 0 && (
          <Breadcrumbs items={formattedBreadcrumbs} variantSurface="dark" className="mb-8" />
        )}

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-[#1F8A5B]/30 text-[#C6A15B] border border-[#C6A15B]/30 rounded-xs">
              {category.replace('-', ' ')}
            </span>
            {containsRegulatoryClaims && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F6F2E9]/90 bg-white/10 px-3 py-1 rounded-xs border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F8A5B]" />
                <span>VERIFIED COMPLIANCE ADVISORY</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.12]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[#F6F2E9]/85 leading-relaxed font-normal">
            {excerpt}
          </p>

          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#F6F2E9]/70">
            <div className="flex items-center gap-6">
              {authorName && (
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{authorName}</span>
                </span>
              )}
              {publishedAt && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{publishedAt}</span>
                </span>
              )}
            </div>

            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{readingTimeMinutes} MIN READ</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
