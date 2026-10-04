import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
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
  const publishedCities = cities.filter(
    (c) => c.status === 'published' && c.isVerified === true && c.isIndexable === true
  );

  if (publishedCities.length === 0) return null;

  return (
    <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              Destination Network
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
              Key Destination Cities in {countryName}
            </h2>
            <p className="font-sans text-base text-[#17201B]/75">
              Direct airport receiving and door-to-door delivery hubs in {countryName}.
            </p>
          </div>

          <div className="bg-[#FAF8F3] rounded-2xl border border-[#12372A]/15 divide-y divide-[#12372A]/10 shadow-2xs overflow-hidden">
            {publishedCities.map((city) => (
              <div
                key={city.slug}
                className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#12372A] hover:text-white transition-all duration-200 group"
              >
                <div className="space-y-1 md:w-1/2">
                  <div className="text-xs font-mono text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase tracking-wider font-bold transition-colors">
                    {countryName} City Corridor
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#17201B] group-hover:text-white transition-colors flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-[#1F8A5B] group-hover:text-[#C6A15B] shrink-0 transition-colors" />
                    <Link href={`/destinations/${countrySlug}/${city.slug}`}>{city.name}</Link>
                  </h3>
                  <p className="font-sans text-sm text-[#17201B]/75 group-hover:text-[#F6F2E9]/80 leading-relaxed font-normal transition-colors">
                    {city.introduction}
                  </p>
                </div>

                <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                  <Link
                    href={`/destinations/${countrySlug}/${city.slug}`}
                    className="font-mono text-xs font-bold text-[#12372A] group-hover:text-[#C6A15B] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                  >
                    <span>View City Specification</span>
                    <ArrowRight className="w-4 h-4 text-[#1F8A5B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href={`/quote?destination=${countrySlug}`}>
                    <span className="px-4 py-2 bg-white group-hover:bg-[#C6A15B] text-[#17201B] rounded-lg border border-[#12372A]/15 group-hover:border-[#C6A15B] font-mono text-xs font-bold uppercase transition-all shadow-2xs">
                      Quote
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
