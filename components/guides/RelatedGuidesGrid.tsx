import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
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
    <div className="py-10 border-t border-[#17201B]/15 space-y-6">
      <div className="text-xs font-mono font-bold uppercase text-[#1F8A5B] tracking-widest">
        FURTHER READING & RELATED GUIDES
      </div>

      <div className="divide-y divide-[#17201B]/15 border-t border-b border-[#17201B]/15">
        {displayArticles.map((art) => (
          <Link
            key={art.slug}
            href={`/guides/${art.slug}`}
            className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:pl-2 transition-all group block"
          >
            <div className="space-y-2 md:w-3/4">
              <div className="flex items-center gap-3 text-xs font-mono text-[#17201B]/60">
                <span className="uppercase font-bold text-[#1F8A5B]">{art.category.replace('-', ' ')}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#1F8A5B]" />
                  {art.readingTimeMinutes} MIN READ
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors leading-snug">
                {art.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#17201B]/75 line-clamp-2 font-normal">
                {art.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#17201B] group-hover:text-[#1F8A5B] shrink-0">
              <span>READ GUIDE</span>
              <ArrowRight className="w-4 h-4 text-[#17201B]/40 group-hover:text-[#1F8A5B] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
