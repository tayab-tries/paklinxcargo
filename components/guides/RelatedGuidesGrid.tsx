import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { getPublishedStaticArticles } from '@/lib/guides/guide-content';

export interface RelatedGuidesGridProps {
  currentSlug?: string;
  category?: string;
}

export const RelatedGuidesGrid: React.FC<RelatedGuidesGridProps> = ({
  currentSlug,
  category,
}) => {
  const published = getPublishedStaticArticles();

  const related = published
    .filter((a) => a.slug !== currentSlug)
    .filter((a) => !category || a.category === category)
    .slice(0, 2);

  const fallbackArticles = published.filter((a) => a.slug !== currentSlug).slice(0, 2);
  const displayArticles = related.length > 0 ? related : fallbackArticles;

  if (displayArticles.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-20 border-t border-b border-border text-brand-black">
      <div className="max-w-prose space-y-6">
        <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
          Further Reading & Related Guides
        </div>

        <div className="space-y-4">
          {displayArticles.map((art) => (
            <Link
              key={art.slug}
              href={`/guides/${art.slug}`}
              className="p-6 bg-surface rounded-md border border-border flex flex-col justify-between space-y-4 hover:border-slate-400 transition-colors group block shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="uppercase">{art.category.replace('-', ' ')}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {art.readingTimeMinutes} min read
                  </span>
                </div>
                <h3 className="text-heading-sm font-bold text-brand-black group-hover:text-accent transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-body-sm text-slate-600 line-clamp-2 font-normal">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono font-semibold text-brand-black group-hover:text-accent transition-colors">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                  Read Guide
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
