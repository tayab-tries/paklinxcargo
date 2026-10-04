import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export interface PickupCityData {
  name: string;
  href?: string;
}

export interface PakistanReachSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  cities?: PickupCityData[];
  blockData?: Record<string, unknown>;
}

export const PakistanReachSection: React.FC<PakistanReachSectionProps> = ({
  badge: propBadge,
  heading: propHeading,
  description: propDescription,
  cities: propCities,
  blockData,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'ORIGIN DEPARTURE NETWORK';
  const title = propHeading || (blockData?.title as string) || 'One Origin Network. Global Reach.';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Scheduled doorstep cargo collection available across all major industrial and residential centers in Pakistan.';

  const defaultCities: PickupCityData[] = [
    { name: 'Lahore', href: '/locations/lahore' },
    { name: 'Karachi', href: '/locations/karachi' },
    { name: 'Islamabad', href: '/locations/islamabad' },
    { name: 'Rawalpindi', href: '/locations/rawalpindi' },
    { name: 'Faisalabad', href: '/locations/faisalabad' },
    { name: 'Sialkot', href: '/locations/sialkot' },
    { name: 'Multan', href: '/locations/multan' },
    { name: 'Peshawar', href: '/locations/peshawar' },
  ];

  const verifiedCities: PickupCityData[] =
    propCities && propCities.length > 0
      ? propCities
      : defaultCities;

  return (
    <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 text-[#17201B] relative overflow-hidden border-b border-[#12372A]/10">
      <Container className="space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#12372A]/5 border border-[#12372A]/15 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F8A5B]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#1F8A5B]">
              {badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17201B] tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Network Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visual: Network Map Image (7 cols) */}
          <div className="lg:col-span-7 bg-[#12372A] p-4 sm:p-6 rounded-2xl border border-[#12372A]/20 shadow-xl relative overflow-hidden group">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0E281F]">
              <Image
                src={IMAGE_SLOTS.connectingPakistanMap.src}
                alt="Connecting Pakistan Logistics Network Map"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12372A] via-transparent to-transparent opacity-60" />
            </div>

            <div className="pt-4 flex items-center justify-between font-mono text-xs text-[#F6F2E9]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
                <span className="font-bold">Nationwide Doorstep Pickup Network</span>
              </div>
              <span className="text-[#C6A15B] text-[10px] uppercase font-bold">100% Verified Pickup</span>
            </div>
          </div>

          {/* Right Cities List (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#12372A]/15 shadow-2xs space-y-6">
            <div className="border-b border-[#12372A]/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1F8A5B] font-bold block mb-1">
                Primary Collection Hubs
              </span>
              <h3 className="font-serif text-xl font-bold text-[#17201B]">
                Supported Pickup Cities
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {verifiedCities.map((city, idx) => {
                const targetHref = city.href || `/locations/${city.name.toLowerCase()}`;
                return (
                  <Link
                    key={idx}
                    href={targetHref}
                    className="p-3 bg-[#F6F2E9]/60 hover:bg-[#12372A] hover:text-white rounded-xl border border-[#12372A]/10 transition-all font-mono text-xs font-bold flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1F8A5B] group-hover:text-[#C6A15B]" />
                      <span>{city.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C6A15B] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#12372A]/10 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                <span>Doorstep pickup scheduled at your convenience</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                <span>Export customs documentation & packing support</span>
              </div>
            </div>

            <Link
              href="/locations"
              className="flex items-center justify-between w-full py-3 px-4 bg-[#12372A] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#1F8A5B] transition-colors"
            >
              <span>Explore All Origin Locations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
