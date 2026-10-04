import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export interface DestinationOverviewProps {
  countryName: string;
  shippingOverview?: string;
}

export const DestinationOverview: React.FC<DestinationOverviewProps> = ({
  countryName,
  shippingOverview,
}) => {
  if (!shippingOverview) return null;

  return (
    <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT OVERVIEW COPY */}
          <div className="lg:col-span-7 space-y-6">
            <span className="px-3 py-1 bg-[#1F8A5B]/15 text-[#1F8A5B] font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block">
              Trade Corridor Overview
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A] leading-tight">
              Export Logistics & Freight Dispatch to {countryName}
            </h2>

            <div className="w-16 h-0.5 bg-[#C6A15B] opacity-70" />

            <p className="font-sans text-base sm:text-lg text-[#17201B]/80 leading-relaxed">
              {shippingOverview}
            </p>
          </div>

          {/* RIGHT PHOTO FRAME */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/30 shadow-2xl bg-[#17201B] group">
              <div className="aspect-[4/3] relative w-full overflow-hidden">
                <Image
                  src="/images/service-sea.jpg"
                  alt={`Export cargo dispatch overview to ${countryName}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4 bg-[#17201B] border-t border-[#C6A15B]/20 flex justify-between items-center text-xs font-mono text-[#F6F2E9]/80">
                <span className="text-[#C6A15B] font-bold uppercase">Destination Logistics</span>
                <span>Air & Ocean Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
