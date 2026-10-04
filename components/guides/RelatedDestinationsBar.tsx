import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { getPublishedStaticDestinations } from '@/lib/destinations/destination-content';

export interface RelatedDestinationsBarProps {
  supportedDestinations?: string[];
}

export const RelatedDestinationsBar: React.FC<RelatedDestinationsBarProps> = ({
  supportedDestinations = [],
}) => {
  const publishedDestinations = getPublishedStaticDestinations();

  const related = supportedDestinations.length > 0
    ? publishedDestinations.filter((d) => supportedDestinations.includes(d.slug))
    : publishedDestinations.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="py-8 border-t border-[#17201B]/15 space-y-4">
      <div className="text-xs font-mono font-bold uppercase text-[#1F8A5B] tracking-widest">
        RELATED TRADE CORRIDORS
      </div>

      <div className="divide-y divide-[#17201B]/15 border-t border-b border-[#17201B]/15">
        {related.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="py-4 flex items-center justify-between hover:pl-2 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#1F8A5B] shrink-0" />
              <span className="text-sm sm:text-base font-serif font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors">
                PAKISTAN → {dest.name.toUpperCase()} ({dest.region})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#17201B] group-hover:text-[#1F8A5B]">
              <span>VIEW CORRIDOR</span>
              <ArrowRight className="w-4 h-4 text-[#17201B]/40 group-hover:text-[#1F8A5B] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
