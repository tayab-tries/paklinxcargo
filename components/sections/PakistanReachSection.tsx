import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
  const badge = propBadge || (blockData?.badge as string) || 'Home Pickup';
  const title = propHeading || (blockData?.title as string) || 'WE PICK UP CARGO ACROSS PAKISTAN';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Doorstep collection available across major commercial cities in Pakistan.';

  const defaultCities: PickupCityData[] = [
    { name: 'Lahore', href: '/locations/international-cargo-services-in-lahore' },
    { name: 'Karachi', href: '/locations/international-cargo-services-in-karachi' },
    { name: 'Islamabad', href: '/locations/international-cargo-services-in-islamabad' },
    { name: 'Rawalpindi', href: '/locations/international-cargo-services-in-rawalpindi' },
    { name: 'Faisalabad', href: '/locations/international-cargo-services-in-faisalabad' },
    { name: 'Sialkot', href: '/locations/international-cargo-services-in-sialkot' },
    { name: 'Multan', href: '/locations/international-cargo-services-in-multan' },
    { name: 'Peshawar', href: '/locations/international-cargo-services-in-peshawar' },
  ];

  const verifiedCities: PickupCityData[] =
    propCities && propCities.length > 0
      ? propCities
      : defaultCities;

  if (!verifiedCities || verifiedCities.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-brand-black py-16 lg:py-24 border-b border-border-dark text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <SectionHeading
              badge={badge}
              badgeVariant="outline-dark"
              title={title}
              subtitle={subtitle}
              className="[&_h2]:text-white [&_p]:text-slate-300"
            />
            <p className="text-body-md text-slate-300 leading-relaxed font-normal">
              We arrange scheduled doorstep cargo pickup directly from your home or business address across Pakistan, handling customs declaration and international shipping to your destination.
            </p>

            <div className="relative aspect-[16/9] rounded-md border border-border-dark overflow-hidden bg-brand-black-deep mt-4">
              <Image
                src={IMAGE_SLOTS.pakistanHub.src}
                alt="Pakistan Export Cargo Pickup Operations"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-mono text-slate-300 font-semibold">
                Home Cargo Pickup Operations Across Pakistan
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-brand-navy/60 border border-border-dark rounded-md p-6 lg:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-border-dark pb-3">
              <span className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider">
                Available Pickup Cities
              </span>
              <span className="text-xs font-mono text-accent font-semibold">Doorstep Pickup</span>
            </div>

            <div className="divide-y divide-border-dark">
              {verifiedCities.map((city, idx) => {
                const targetHref = city.href || `/locations/${city.name.toLowerCase()}`;

                return (
                  <Link
                    key={idx}
                    href={targetHref}
                    className="py-3 px-2 flex items-center justify-between hover:bg-brand-black-deep/60 rounded transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                        Cargo Pickup in {city.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 hidden sm:inline">Doorstep Available</span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border-dark flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Coverage Active</span>
              <Link href="/locations" className="text-accent hover:underline font-semibold flex items-center gap-1">
                <span>View All Locations</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
