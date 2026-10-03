import React from 'react';
import { Calendar, Clock, User, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
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
    <section className="w-full bg-surface text-brand-black py-12 lg:py-16 border-b border-border">
      <Container size="narrow">
        {formattedBreadcrumbs.length > 0 && (
          <Breadcrumbs items={formattedBreadcrumbs} className="mb-6" />
        )}

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="navy" className="uppercase font-mono text-[11px] tracking-wider">
              {category.replace('-', ' ')}
            </Badge>
            {containsRegulatoryClaims && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-surface-subtle px-2.5 py-1 rounded border border-border">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Compliance Guide</span>
              </span>
            )}
          </div>

          <h1 className="text-display-md sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight leading-[1.1]">
            {title}
          </h1>

          <p className="text-body-lg text-slate-700 leading-relaxed font-normal">
            {excerpt}
          </p>

          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{authorName}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{publishedAt}</span>
              </span>
            </div>

            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{readingTimeMinutes} min read</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
