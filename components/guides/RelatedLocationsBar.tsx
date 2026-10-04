import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { getPublishedStaticLocations } from '@/lib/locations/location-content';

export interface RelatedLocationsBarProps {
  supportedOrigins?: string[];
}

export const RelatedLocationsBar: React.FC<RelatedLocationsBarProps> = ({
  supportedOrigins = [],
}) => {
  const publishedLocations = getPublishedStaticLocations();

  const related = supportedOrigins.length > 0
    ? publishedLocations.filter((l) => supportedOrigins.includes(l.slug))
    : publishedLocations.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="py-8 border-t border-[#17201B]/15 space-y-4">
      <div className="text-xs font-mono font-bold uppercase text-[#1F8A5B] tracking-widest">
        PAKISTAN PICKUP ORIGIN HUBS
      </div>

      <div className="divide-y divide-[#17201B]/15 border-t border-b border-[#17201B]/15">
        {related.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}`}
            className="py-4 flex items-center justify-between hover:pl-2 transition-all group"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#1F8A5B] shrink-0" />
              <span className="text-sm sm:text-base font-serif font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors">
                PICKUP IN {loc.name.toUpperCase()} ({loc.province})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#17201B] group-hover:text-[#1F8A5B]">
              <span>VIEW ORIGIN</span>
              <ArrowRight className="w-4 h-4 text-[#17201B]/40 group-hover:text-[#1F8A5B] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
