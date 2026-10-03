import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getPublishedLocations } from '@/lib/locations/location-content';

export interface DestinationOriginGridProps {
  countryName: string;
  countrySlug: string;
  supportedOrigins?: string[];
}

export const DestinationOriginGrid: React.FC<DestinationOriginGridProps> = async ({
  countryName,
  countrySlug,
  supportedOrigins,
}) => {
  const publishedLocations = await getPublishedLocations();

  const activeOrigins =
    supportedOrigins && supportedOrigins.length > 0
      ? publishedLocations.filter(
          (loc) =>
            supportedOrigins.includes(loc.slug) ||
            supportedOrigins.includes(loc.name.toLowerCase()) ||
            supportedOrigins.some((so) => loc.slug.includes(so.toLowerCase()))
        )
      : publishedLocations;

  if (activeOrigins.length === 0) return null;

  return (
    <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Pakistan Dispatch Hubs"
          title={`Origin Dispatch Cities to ${countryName}`}
          subtitle={`Doorstep collection and export handling available from key origin cities in Pakistan connecting with ${countryName}.`}
          className="mb-14"
        />

        <div className="bg-surface-subtle rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {activeOrigins.map((loc) => (
            <div
              key={loc.slug}
              className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface/80 transition-colors group"
            >
              <div className="space-y-1 md:w-1/2">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <span>{loc.province}</span>
                  <span className="text-slate-400 font-bold">→</span>
                  <span className="font-semibold text-brand-black">{countryName}</span>
                </div>
                <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                  <Link href={`/locations/${loc.slug}`}>{loc.name}</Link>
                </h3>
              </div>

              <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                >
                  <span>Explore Origin Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                </Link>
                <Link href={`/quote?origin=${loc.slug}&destination=${countrySlug}`}>
                  <span className="px-3 py-1.5 bg-surface rounded border border-border text-xs font-mono font-semibold hover:border-slate-400 transition-colors">
                    Quote Route
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
