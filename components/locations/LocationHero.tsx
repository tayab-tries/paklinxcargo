import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Search, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface LocationHeroProps {
  cityName?: string;
  province?: string;
  h1?: string;
  introduction?: string;
  quoteUrl?: string;
  breadcrumbs?: Array<{ label: string; url?: string; href?: string }>;
  location?: {
    name: string;
    description?: string;
    slug: string;
    service_available: boolean;
    collection_available: boolean;
    has_physical_branch: boolean;
  };
}

export const LocationHero: React.FC<LocationHeroProps> = ({
  cityName,
  province,
  h1,
  introduction,
  quoteUrl = '/quote',
  breadcrumbs = [],
  location,
}) => {
  const name = cityName || location?.name || 'Pakistan Location';
  const displayH1 = h1 || `International Cargo Pickup from ${name}`;
  const displayIntro =
    introduction ||
    location?.description ||
    `Doorstep cargo collection and export dispatch services operating across ${name}.`;
  const displayProvince = province || 'Pakistan Origin';

  const formattedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.label,
    href: b.url || b.href || '#',
  }));

  return (
    <section className="relative w-full bg-[#12372A] py-16 lg:py-24 border-b border-[#C6A15B]/30 text-[#F6F2E9] overflow-hidden">
      {/* Ambient Gold Glow */}
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
                PAKISTAN PICKUP → {name.toUpperCase()}
              </span>
              <span className="text-xs text-emerald-200/80 font-mono tracking-wide">
                • {displayProvince} Origin
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight flex items-start gap-3">
              <MapPin className="w-8 h-8 text-[#C6A15B] shrink-0 mt-1" />
              <span>{displayH1}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#F6F2E9]/85 font-sans font-normal leading-relaxed">
              {displayIntro}
            </p>

            {/* HERO BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href={quoteUrl} className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto h-13 px-8 bg-[#C6A15B] hover:bg-[#b5924e] text-[#17201B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#C6A15B] cursor-pointer"
                >
                  <span>Request a Quote</span>
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
              <span>Doorstep Pickup & Export Customs Handling Operational in {name}</span>
            </div>
          </div>

          {/* HERO RIGHT PHOTO FRAME (5 COLS) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/40 shadow-2xl bg-[#17201B] group">
              <div className="aspect-[4/3] relative w-full overflow-hidden">
                <Image
                  src="/images/hero-freight.jpg"
                  alt={`International cargo collection and logistics dispatch in ${name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4 bg-[#17201B]/95 border-t border-[#C6A15B]/20 flex items-center justify-between text-xs font-mono text-[#F6F2E9]/80">
                <span className="text-[#C6A15B] uppercase font-bold tracking-wider">Origin Receiving</span>
                <span>Air & Ocean Linehaul</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
