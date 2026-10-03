import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getSafeImageSrc, ImageSlotKey } from '@/lib/constants/images';

export interface ServiceHeroProps {
  title?: string;
  description?: string;
  quoteUrl?: string;
  category?: string;
  breadcrumbs?: Array<{ label: string; url?: string; href?: string }>;
  slug?: string;
  service?: {
    title: string;
    short_description: string;
    slug: string;
    category?: string;
  };
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  description,
  quoteUrl = '/quote',
  category = 'Commercial Service',
  breadcrumbs = [],
  slug,
  service,
}) => {
  const displayTitle = title || service?.title || 'International Freight Service';
  const displayDesc = description || service?.short_description || 'Commercial export freight shipping originating in Pakistan.';
  const displayCategory = category || service?.category || 'Commercial Freight';
  const currentSlug = slug || service?.slug || 'air-freight';

  // Map slug to corresponding image slot key
  let imageSlotKey: ImageSlotKey = 'serviceAir';
  if (currentSlug.includes('sea')) imageSlotKey = 'serviceSea';
  else if (currentSlug.includes('door')) imageSlotKey = 'serviceDoor';
  else if (currentSlug.includes('commercial')) imageSlotKey = 'pakistanHub';
  else if (currentSlug.includes('baggage')) imageSlotKey = 'serviceDoor';
  else if (currentSlug.includes('international') || currentSlug.includes('forwarding')) imageSlotKey = 'heroBackground';

  const formattedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.label,
    href: b.url || b.href,
  }));

  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[600px] bg-brand-black-deep text-white py-16 lg:py-24 border-b border-border-dark overflow-hidden flex flex-col justify-center">
      {/* 1. Substantial Photographic Image Background */}
      <div className="absolute inset-0 z-0 bg-brand-black-deep">
        <Image
          src={getSafeImageSrc(imageSlotKey)}
          alt={displayTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right opacity-60"
        />

        {/* Directional Translucent Dark Overlay */}
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

      {/* 2. Content Stack Layered ABOVE Image (relative z-20) */}
      <Container className="relative z-20">
        {formattedBreadcrumbs.length > 0 && (
          <Breadcrumbs items={formattedBreadcrumbs} variantSurface="dark" className="mb-6" />
        )}

        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline-dark" size="md" className="text-slate-300 border-border-dark bg-brand-black/60 backdrop-blur-xs">
              {displayCategory === 'core' ? 'Core Freight Mode' : 'Specialized Freight Solution'}
            </Badge>
          </div>

          <h1 className="text-display-xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            {displayTitle}
          </h1>

          <p className="text-body-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl font-normal">
            {displayDesc}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href={quoteUrl}>
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto h-[46px]"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
              >
                Get a Shipping Quote
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
            <span>Verified Freight Forwarding & Export Customs Clearance</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
