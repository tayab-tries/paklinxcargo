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
    <div className="py-8 border-t border-border space-y-4">
      <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
        Related Destination Corridors
      </div>

      <div className="divide-y divide-border rounded border border-border bg-surface overflow-hidden">
        {related.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="p-4 flex items-center justify-between hover:bg-surface-subtle transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors" />
              <span className="text-body-sm font-bold text-brand-black group-hover:text-accent transition-colors">
                Cargo to {dest.name} ({dest.region})
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};
