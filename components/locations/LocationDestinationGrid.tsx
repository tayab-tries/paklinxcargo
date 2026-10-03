import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface LocationDestinationGridProps {
  cityName: string;
  supportedDestinations?: string[];
}

const destinationMap: Record<string, { country: string; hub: string; mode: string }> = {
  uk: { country: 'United Kingdom', hub: 'London Heathrow (LHR) & Regional Hubs', mode: 'Direct Air & Sea Cargo' },
  uae: { country: 'United Arab Emirates', hub: 'Dubai (DXB / DWC) & Port Rashid', mode: 'Express Air & Doorstep Delivery' },
  usa: { country: 'United States', hub: 'New York (JFK) & Major Ports', mode: 'Commercial Air & Container Shipping' },
  canada: { country: 'Canada', hub: 'Toronto Pearson (YYZ)', mode: 'Air Cargo & Consolidated Ocean' },
  ksa: { country: 'Saudi Arabia', hub: 'Riyadh (RUH) & Jeddah Port', mode: 'Direct Air Cargo & Doorstep Delivery' },
};

export const LocationDestinationGrid: React.FC<LocationDestinationGridProps> = ({
  cityName,
  supportedDestinations = ['uk', 'uae', 'usa', 'canada', 'ksa'],
}) => {
  const activeDestinations = supportedDestinations
    .map((slug) => ({ slug, ...destinationMap[slug] }))
    .filter((d) => d.country);

  if (activeDestinations.length === 0) return null;

  return (
    <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Trade Corridors"
          title={`International Shipping Routes from ${cityName}`}
          subtitle={`Direct cargo trade corridors connecting export dispatch in ${cityName} with global markets.`}
          className="mb-14"
        />

        {/* Clean Trade Route Rows */}
        <div className="bg-surface-subtle rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {activeDestinations.map((item) => (
            <Link
              key={item.slug}
              href={`/destinations/${item.slug}`}
              className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface/80 transition-colors group"
            >
              {/* Route Direction & Country */}
              <div className="space-y-1 md:w-1/3">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <span>{cityName}</span>
                  <span className="text-slate-400 font-bold">→</span>
                  <span className="font-semibold text-brand-black">{item.country}</span>
                </div>
                <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors">
                  Cargo from {cityName} to {item.country}
                </h3>
              </div>

              {/* Hub & Transit Mode Metadata */}
              <div className="flex flex-wrap md:flex-nowrap items-center gap-6 text-xs font-mono text-slate-600 md:w-1/2">
                <div className="space-y-0.5">
                  <span className="text-slate-400 block">Destination Hubs</span>
                  <span className="font-medium text-slate-800">{item.hub}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 block">Available Service</span>
                  <span className="font-medium text-slate-800">{item.mode}</span>
                </div>
              </div>

              {/* Action Link Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-black group-hover:text-accent transition-colors shrink-0">
                <span>View Corridor</span>
                <ArrowRight className="w-4 h-4 text-brand-black group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-black hover:text-accent transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>Explore All Destination Corridors Served from Pakistan →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
