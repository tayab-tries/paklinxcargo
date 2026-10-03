import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { getPublishedLocations } from '@/lib/locations/location-content';

export interface RelatedLocationsBarProps {
  supportedOrigins?: string[];
}

export const RelatedLocationsBar: React.FC<RelatedLocationsBarProps> = async ({
  supportedOrigins = [],
}) => {
  const publishedLocations = await getPublishedLocations();

  const related = supportedOrigins.length > 0
    ? publishedLocations.filter(
        (l) =>
          supportedOrigins.includes(l.slug) ||
          supportedOrigins.includes(l.name.toLowerCase()) ||
          supportedOrigins.some((so) => l.slug.includes(so.toLowerCase()))
      )
    : publishedLocations.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="py-8 border-t border-border space-y-4">
      <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
        Pakistan Pickup Origin Hubs
      </div>

      <div className="divide-y divide-border rounded border border-border bg-surface overflow-hidden">
        {related.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}`}
            className="p-4 flex items-center justify-between hover:bg-surface-subtle transition-colors group"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors" />
              <span className="text-body-sm font-bold text-brand-black group-hover:text-accent transition-colors">
                Cargo Pickup in {loc.name} ({loc.province})
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};
