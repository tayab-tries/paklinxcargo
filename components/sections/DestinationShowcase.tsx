import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Plane, Ship } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface DestinationCardData {
  name: string;
  countryCode?: string;
  flagImage?: string;
  shortText?: string;
  href?: string;
}

export interface DestinationShowcaseProps {
  badge?: string;
  heading?: string;
  description?: string;
  destinations?: DestinationCardData[];
  blockData?: Record<string, unknown>;
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({
  badge: propBadge,
  heading: propHeading,
  description: propDescription,
  destinations: propDestinations,
  blockData,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'GLOBAL DESTINATIONS';
  const title = propHeading || (blockData?.title as string) || 'Key International Freight Corridors';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Direct door-to-door air and sea cargo routes connecting Pakistan with major commercial markets worldwide.';

  const defaultCorridors: DestinationCardData[] = [
    { name: 'UK', countryCode: 'uk', shortText: 'London & UK Nationwide', href: '/destinations/uk' },
    { name: 'UAE', countryCode: 'uae', shortText: 'Dubai & UAE Nationwide', href: '/destinations/uae' },
    { name: 'Saudi Arabia', countryCode: 'ksa', shortText: 'Riyadh, Jeddah & KSA', href: '/destinations/ksa' },
    { name: 'Canada', countryCode: 'canada', shortText: 'Toronto & Canada Nationwide', href: '/destinations/canada' },
    { name: 'USA', countryCode: 'usa', shortText: 'New York & USA Nationwide', href: '/destinations/usa' },
  ];

  const corridors: DestinationCardData[] =
    propDestinations && propDestinations.length > 0
      ? propDestinations
      : defaultCorridors;

  if (!corridors || corridors.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#12372A] text-[#F6F2E9] py-20 lg:py-28 relative overflow-hidden border-b border-[#12372A]/10">
      {/* Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(198,161,91,0.12),transparent_70%)]" />

      <Container className="relative z-10 space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1F8A5B]/30 border border-[#C6A15B]/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#C6A15B]">
              {badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#F6F2E9]/80 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Stacked Corridor List */}
        <div className="bg-[#17201B] rounded-2xl border border-[#C6A15B]/30 divide-y divide-[#C6A15B]/20 shadow-2xl overflow-hidden">
          {corridors.map((item, idx) => {
            const targetHref = item.href || `/destinations/${item.countryCode || item.name.toLowerCase()}`;

            return (
              <Link
                key={idx}
                href={targetHref}
                className="p-6 sm:p-7 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#0E281F] transition-all duration-300 group"
              >
                {/* Route Header */}
                <div className="space-y-1.5 md:w-5/12">
                  <div className="text-xs font-mono uppercase tracking-wider flex items-center gap-2 text-[#C6A15B]">
                    <span className="font-bold text-white">Pakistan</span>
                    <span className="text-[#C6A15B] font-bold">&rarr;</span>
                    <span className="font-bold text-[#C6A15B]">{item.name} Corridor</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#C6A15B] transition-colors tracking-tight">
                    Cargo to {item.name}
                  </h3>
                </div>

                {/* Service Specs */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 sm:gap-8 text-xs font-mono text-[#F6F2E9]/80 md:w-5/12">
                  <div className="space-y-1">
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Destination Coverage</span>
                    <span className="font-bold text-white text-xs sm:text-sm">{item.shortText || 'Nationwide Delivery'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Modes Supported</span>
                    <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs sm:text-sm">
                      <Plane className="w-3.5 h-3.5" />
                      <Ship className="w-3.5 h-3.5" />
                      <span>Air Express & Sea Freight</span>
                    </div>
                  </div>
                </div>

                {/* Action Link */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C6A15B] group-hover:text-white transition-colors shrink-0 pt-2 md:pt-0">
                  <span>Explore Corridor</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A15B] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Global Destination Hub Link */}
        <div className="text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-[#C6A15B] hover:text-white transition-colors py-3 px-6 rounded-xl border border-[#C6A15B]/30 hover:border-[#C6A15B]/60 bg-[#17201B]"
          >
            <Globe className="w-4 h-4 text-[#C6A15B]" />
            <span>Explore All Global Destinations From Pakistan &rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
