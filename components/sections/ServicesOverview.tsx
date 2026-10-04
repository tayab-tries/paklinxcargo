import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Plane, Ship, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export interface ServiceCardData {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  featureBullets?: string[];
  cta?: { label?: string; href?: string };
}

export interface ServicesOverviewProps {
  badge?: string;
  heading?: string;
  description?: string;
  airCargo?: ServiceCardData;
  seaCargo?: ServiceCardData;
  blockData?: Record<string, unknown>;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  badge: propBadge,
  heading: propHeading,
  description: propDescription,
  airCargo: propAir,
  seaCargo: propSea,
  blockData,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'SERVICES PORTFOLIO';
  const title = propHeading || (blockData?.title as string) || 'Air & Ocean Freight Services';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Direct air cargo flights and economical ocean freight container sailings operating door-to-door from Pakistan.';

  // Air Cargo Data
  const airTitle = propAir?.title || (blockData?.air_cargo_title as string) || 'Air Freight Express';
  const airDesc =
    propAir?.description ||
    (blockData?.air_cargo_description as string) ||
    'Rapid air shipping for commercial cargo, personal boxes, excess baggage, and urgent documentation with guaranteed transit schedules.';
  const airImage = propAir?.image || (blockData?.air_cargo_image as string) || IMAGE_SLOTS.serviceAir.src;

  // Sea Cargo Data
  const seaTitle = propSea?.title || (blockData?.sea_cargo_title as string) || 'Ocean Container Cargo';
  const seaDesc =
    propSea?.description ||
    (blockData?.sea_cargo_description as string) ||
    'Economical full container (FCL) and consolidated parcel (LCL) ocean freight shipping for heavy commercial goods and household moves.';
  const seaImage = propSea?.image || (blockData?.sea_cargo_image as string) || IMAGE_SLOTS.serviceSea.src;

  return (
    <section className="w-full bg-[#FAF8F3] text-[#17201B] py-16 sm:py-24 lg:py-28 relative overflow-hidden border-b border-[#12372A]/10">
      <Container className="space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#12372A]/15 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F8A5B]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#1F8A5B]">
              {badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17201B] tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Asymmetrical Editorial Portfolio Rows */}
        <div className="space-y-8 lg:space-y-12">
          {/* Row 1: Air Cargo (Large Photo Left, Editorial Copy Right) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={airImage}
                alt={airTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#12372A] text-[#C6A15B] font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-xs">
                  PRIORITY AIR MODE
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1F8A5B] uppercase tracking-wider">
                  <Plane className="w-4 h-4" />
                  <span>Door-to-Door Flight Departures</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17201B]">
                  {airTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {airDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-700 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>Direct Airport Departures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>Doorstep Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>Pre-Cleared Customs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>Destination Delivery</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">10 – 15 Days Indicative</span>
                <Link href="/cargo-services">
                  <Button
                    variant="primary"
                    size="md"
                    className="rounded-full bg-[#1F8A5B] hover:bg-[#12372A] text-white font-medium px-6 py-2 text-xs border-none"
                    rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
                  >
                    Air Cargo Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Row 2: Sea Freight (Editorial Copy Left, Large Photo Right) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1F8A5B] uppercase tracking-wider">
                  <Ship className="w-4 h-4" />
                  <span>High-Capacity Ocean Freight</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17201B]">
                  {seaTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {seaDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-700 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>FCL & LCL Ocean Freight</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>Port-to-Door Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>Commercial Trade Cargo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>Economical Rates</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">1.5 – 2.5 Months Indicative</span>
                <Link href="/cargo-services">
                  <Button
                    variant="primary"
                    size="md"
                    className="rounded-full bg-[#12372A] hover:bg-[#1F8A5B] text-white font-medium px-6 py-2 text-xs border-none"
                    rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
                  >
                    Sea Freight Details
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 order-1 lg:order-2">
              <Image
                src={seaImage}
                alt={seaTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#12372A] font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-xs border border-slate-200">
                  CONTAINER FREIGHT
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
