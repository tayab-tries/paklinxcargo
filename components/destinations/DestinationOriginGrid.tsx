import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { getPublishedStaticLocations } from '@/lib/locations/location-content';

export interface DestinationOriginGridProps {
  countryName: string;
  countrySlug: string;
  supportedOrigins?: string[];
}

export const DestinationOriginGrid: React.FC<DestinationOriginGridProps> = ({
  countryName,
  countrySlug,
  supportedOrigins = ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'faisalabad', 'sialkot', 'multan', 'peshawar'],
}) => {
  const publishedLocations = getPublishedStaticLocations();

  const activeOrigins = publishedLocations.filter((loc) =>
    supportedOrigins.includes(loc.slug)
  );

  if (activeOrigins.length === 0) return null;

  return (
    <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              Pakistan Dispatch Hubs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
              Origin Dispatch Cities to {countryName}
            </h2>
            <p className="font-sans text-base text-[#17201B]/75">
              Doorstep collection and export handling available from key origin cities in Pakistan connecting with {countryName}.
            </p>
          </div>

          <div className="bg-[#FAF8F3] rounded-2xl border border-[#12372A]/15 divide-y divide-[#12372A]/10 shadow-2xs overflow-hidden">
            {activeOrigins.map((loc) => (
              <div
                key={loc.slug}
                className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#12372A] hover:text-white transition-all duration-200 group"
              >
                <div className="space-y-1 md:w-1/2">
                  <div className="font-mono text-xs text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase tracking-wider font-bold transition-colors flex items-center gap-2">
                    <span>{loc.province}</span>
                    <span className="opacity-60">→</span>
                    <span>{countryName}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#17201B] group-hover:text-white transition-colors flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-[#1F8A5B] group-hover:text-[#C6A15B] shrink-0 transition-colors" />
                    <Link href={`/locations/${loc.slug}`}>{loc.name}</Link>
                  </h3>
                </div>

                <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="font-mono text-xs font-bold text-[#12372A] group-hover:text-[#C6A15B] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                  >
                    <span>Explore Origin Hub</span>
                    <ArrowRight className="w-4 h-4 text-[#1F8A5B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href={`/quote?origin=${loc.slug}&destination=${countrySlug}`}>
                    <span className="px-4 py-2 bg-white group-hover:bg-[#C6A15B] text-[#17201B] rounded-lg border border-[#12372A]/15 group-hover:border-[#C6A15B] font-mono text-xs font-bold uppercase transition-all shadow-2xs">
                      Quote Route
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
