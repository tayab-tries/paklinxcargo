import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Search, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IMAGE_SLOTS } from '@/lib/constants/images';

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
  const displayH1 = h1 || `International Cargo Shipping in ${name}`;
  const displayIntro = introduction || location?.description || `Doorstep cargo pickup and export dispatch services operating across ${name}.`;
  const displayProvince = province || 'Pakistan Origin';

  const formattedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.label,
    href: b.url || b.href,
  }));

  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[600px] bg-brand-black-deep text-white py-16 lg:py-24 border-b border-border-dark overflow-hidden flex flex-col justify-center">
      {/* Background Image Slot & Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-brand-black-deep">
        <Image
          src={IMAGE_SLOTS.pakistanHub.src}
          alt={`Cargo logistics in ${name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right opacity-50"
        />

        {/* Directional Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden md:block"
          style={{
            background: `linear-gradient(
              90deg,
              rgba(7,10,15,0.96) 0%,
              rgba(7,10,15,0.88) 30%,
              rgba(7,10,15,0.65) 60%,
              rgba(7,10,15,0.30) 85%,
              rgba(7,10,15,0.20) 100%
            )`,
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none md:hidden"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(7,10,15,0.88) 0%,
              rgba(7,10,15,0.65) 50%,
              rgba(7,10,15,0.80) 100%
            )`,
          }}
        />
      </div>

      {/* Content Stack Layered ABOVE Image */}
      <Container className="relative z-20">
        {formattedBreadcrumbs.length > 0 && (
          <Breadcrumbs items={formattedBreadcrumbs} variantSurface="dark" className="mb-6" />
        )}

        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] px-3 py-1 bg-brand-navy/60 text-slate-300 border border-border-dark rounded-xs">
              INTERNATIONAL CARGO FROM {name.toUpperCase()}
            </span>
            <Badge variant="outline-dark" className="text-slate-400 border-border-dark">
              {displayProvince}
            </Badge>
          </div>

          <h1 className="text-display-xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] flex items-start gap-3">
            <MapPin className="w-8 h-8 text-accent shrink-0 mt-1" />
            <span>{displayH1}</span>
          </h1>

          <p className="text-body-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl font-normal">
            {displayIntro}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href={quoteUrl}>
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto h-[46px]"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
              >
                Get Shipping Quote from {name}
              </Button>
            </Link>

            <Link href="/track">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto h-[46px]"
                leftIcon={<Search className="w-4 h-4 text-slate-300 shrink-0" />}
              >
                Track Shipment
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t border-border-dark/80 flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
            <span>Origin Collection & Export Clearance Operational in {name}</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
