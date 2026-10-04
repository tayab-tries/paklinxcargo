import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface LocationDestinationGridProps {
  cityName: string;
  supportedDestinations?: string[];
}

const destinationMap: Record<string, { country: string; hub: string; mode: string }> = {
  uk: { country: 'United Kingdom', hub: 'London Heathrow (LHR) & Regional Hubs', mode: 'Air: 10–12 Days • Sea: 1.5–2.5 Months' },
  uae: { country: 'United Arab Emirates', hub: 'Dubai (DXB / DWC) & Port Rashid', mode: 'Air: 10–17 Days • Sea: 1.5–2.5 Months' },
  usa: { country: 'United States', hub: 'New York (JFK) & Major Ports', mode: 'Air: 10–15 Days • Sea: 2–2.5 Months' },
  canada: { country: 'Canada', hub: 'Toronto Pearson (YYZ)', mode: 'Air: 10–15 Days • Sea: 2–3 Months' },
  ksa: { country: 'Saudi Arabia', hub: 'Riyadh (RUH) & Jeddah Port', mode: 'Air: 10–20 Days • Sea: 1.5–2.5 Months' },
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
    <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              Corridor Connections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
              From {cityName} to International Destinations
            </h2>
            <p className="font-sans text-base text-[#17201B]/75">
              Direct trade corridors connecting origin cargo dispatches in {cityName} with global markets.
            </p>
          </div>

          <div className="bg-[#FAF8F3] rounded-2xl border border-[#12372A]/15 divide-y divide-[#12372A]/10 shadow-2xs overflow-hidden">
            {activeDestinations.map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#12372A] hover:text-white transition-all duration-200 group"
              >
                <div className="space-y-1 md:w-1/3">
                  <div className="font-mono text-xs text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase tracking-wider font-bold transition-colors flex items-center gap-2">
                    <span>{cityName}</span>
                    <span className="opacity-60">→</span>
                    <span>{item.country}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#17201B] group-hover:text-white transition-colors">
                    Cargo to {item.country}
                  </h3>
                </div>

                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 font-mono text-xs md:w-1/2">
                  <div className="space-y-0.5">
                    <span className="text-[#17201B]/60 group-hover:text-[#F6F2E9]/60 block uppercase tracking-wider text-[10px]">
                      Destination Hubs
                    </span>
                    <span className="font-bold text-[#17201B] group-hover:text-white transition-colors">
                      {item.hub}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[#17201B]/60 group-hover:text-[#F6F2E9]/60 block uppercase tracking-wider text-[10px]">
                      Indicative Transit
                    </span>
                    <span className="font-bold text-[#1F8A5B] group-hover:text-[#C6A15B] transition-colors">
                      {item.mode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#12372A] group-hover:text-[#C6A15B] uppercase tracking-wider transition-colors shrink-0">
                  <span>Explore Corridor</span>
                  <ArrowRight className="w-4 h-4 text-[#1F8A5B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#12372A] hover:text-[#1F8A5B] uppercase tracking-wider underline"
            >
              <Globe className="w-4 h-4 text-[#1F8A5B]" />
              <span>Explore All Global Destination Corridors Served from Pakistan →</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
