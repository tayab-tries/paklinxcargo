import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface DestinationHeroProps {
  countryName?: string;
  cityName?: string;
  region?: string;
  h1?: string;
  introduction?: string;
  quoteUrl?: string;
  breadcrumbs?: Array<{ label: string; url?: string; href?: string }>;
}

export const DestinationHero: React.FC<DestinationHeroProps> = ({
  countryName = 'International Destination',
  cityName,
  region,
  h1,
  introduction,
  quoteUrl = '/quote',
  breadcrumbs = [],
}) => {
  const displayTitle = h1 || `Cargo Shipping to ${cityName ? `${cityName}, ${countryName}` : countryName}`;
  const displayIntro =
    introduction ||
    `Direct commercial air freight, ocean sea cargo, and doorstep collection connecting Pakistan with ${countryName}.`;
  const displayEyebrow = cityName
    ? `PAKISTAN → ${cityName.toUpperCase()}, ${countryName.toUpperCase()}`
    : `PAKISTAN → ${countryName.toUpperCase()}`;

  const formattedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.label,
    href: b.url || b.href || '#',
  }));

  // Country-specific indicative transit badges
  const countrySlug = countryName.toLowerCase();
  let indicativeTransitBadge = 'Air (20 KG Min) • Sea (70–100 KG Min)';
  if (countrySlug.includes('uk') || countrySlug.includes('united kingdom')) {
    indicativeTransitBadge = 'Air: 10–12 Days • Sea: 1.5–2.5 Months';
  } else if (
    countrySlug.includes('uae') ||
    countrySlug.includes('united arab emirates') ||
    countrySlug.includes('dubai')
  ) {
    indicativeTransitBadge = 'Air: 10–17 Days • Sea: 1.5–2.5 Months';
  } else if (countrySlug.includes('usa') || countrySlug.includes('united states')) {
    indicativeTransitBadge = 'Air: 10–15 Days • Sea: 2–2.5 Months';
  } else if (countrySlug.includes('canada')) {
    indicativeTransitBadge = 'Air: 10–15 Days • Sea: 2–3 Months';
  } else if (countrySlug.includes('saudi') || countrySlug.includes('ksa')) {
    indicativeTransitBadge = 'Air: 10–20 Days • Sea: 1.5–2.5 Months';
  }

  return (
    <section className="relative w-full bg-[#12372A] py-16 lg:py-24 border-b border-[#C6A15B]/30 text-[#F6F2E9] overflow-hidden">
      {/* Ambient Gold Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,161,91,0.15),transparent_70%)] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* HERO LEFT COPY (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            {formattedBreadcrumbs.length > 0 && (
              <Breadcrumbs items={formattedBreadcrumbs} className="text-slate-300" />
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3.5 py-1.5 bg-[#1F8A5B]/30 border border-[#C6A15B]/30 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#C6A15B]">
                {displayEyebrow}
              </span>
              {region && (
                <span className="text-xs text-emerald-200/80 font-mono tracking-wide">
                  • {region} Corridor
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight flex items-start gap-3">
              <Globe className="w-8 h-8 text-[#C6A15B] shrink-0 mt-1" />
              <span>{displayTitle}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#F6F2E9]/85 font-sans font-normal leading-relaxed">
              {displayIntro}
            </p>

            {/* INDICATIVE TRANSIT BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#17201B]/90 rounded-lg border border-[#C6A15B]/40 text-xs font-mono text-[#F6F2E9] shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
              <span>Indicative Transit: {indicativeTransitBadge}</span>
            </div>

            {/* HERO BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href={quoteUrl} className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto h-13 px-8 bg-[#C6A15B] hover:bg-[#b5924e] text-[#17201B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#C6A15B] cursor-pointer"
                >
                  <span>Get Shipping Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#17201B] shrink-0" />
                </button>
              </Link>

              <Link href="/track" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto h-13 px-7 bg-transparent hover:bg-white/10 text-[#F6F2E9] font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-[#F6F2E9]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#F6F2E9] shrink-0" />
                  <span>Track Shipment</span>
                </button>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#F6F2E9]/15 flex items-center gap-2 text-xs font-mono text-[#F6F2E9]/70">
              <ShieldCheck className="w-4 h-4 text-[#1F8A5B] shrink-0" />
              <span>Export Customs Declaration & Scheduled Linehaul Dispatch Active</span>
            </div>
          </div>

          {/* HERO RIGHT PHOTO FRAME (5 COLS) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/40 shadow-2xl bg-[#17201B] group">
              <div className="aspect-[4/3] relative w-full overflow-hidden">
                <Image
                  src="/images/hero-freight.jpg"
                  alt={`International cargo shipping corridor connecting Pakistan with ${countryName}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4 bg-[#17201B]/95 border-t border-[#C6A15B]/20 flex items-center justify-between text-xs font-mono text-[#F6F2E9]/80">
                <span className="text-[#C6A15B] uppercase font-bold tracking-wider">Verified Corridor</span>
                <span>Air & Ocean Linehaul</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
