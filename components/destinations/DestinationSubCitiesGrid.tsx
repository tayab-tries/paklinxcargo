import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DestinationCityData } from '@/lib/destinations/destination-content';

export interface DestinationSubCitiesGridProps {
  countryName: string;
  countrySlug: string;
  cities?: DestinationCityData[];
}

export const DestinationSubCitiesGrid: React.FC<DestinationSubCitiesGridProps> = ({
  countryName,
  countrySlug,
  cities = [],
}) => {
  // Filter published, verified, indexable cities
  const publishedCities = cities.filter(
    (c) => c.status === 'published' && c.isVerified === true && c.isIndexable === true
  );

  if (publishedCities.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Destination Network"
          title={`Key Destination Cities in ${countryName}`}
          subtitle={`Direct airport receiving and door-to-door delivery hubs in ${countryName}.`}
          className="mb-14"
        />

        <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {publishedCities.map((city) => (
            <div
              key={city.slug}
              className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
            >
              <div className="space-y-1 md:w-1/2">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  {countryName} City Hub
                </div>
                <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                  <Link href={`/destinations/${countrySlug}/${city.slug}`}>{city.name}</Link>
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed font-normal">
                  {city.introduction}
                </p>
              </div>

              <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                <Link
                  href={`/destinations/${countrySlug}/${city.slug}`}
                  className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                >
                  <span>City Specification</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                </Link>
                <Link href={`/quote?destination=${countrySlug}`}>
                  <span className="px-3 py-1.5 bg-surface-subtle rounded border border-border text-xs font-mono font-semibold hover:border-slate-400 transition-colors">
                    Quote
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
