import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Plane, Ship } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
  const badge = propBadge || (blockData?.badge as string) || 'Our Services';
  const title = propHeading || (blockData?.title as string) || 'Air & Sea Cargo Services';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Fast air cargo and economical sea cargo with complete door-to-door delivery from Pakistan.';

  // Air Cargo Data
  const airTitle = propAir?.title || (blockData?.air_cargo_title as string) || 'AIR CARGO';
  const airDesc =
    propAir?.description ||
    (blockData?.air_cargo_description as string) ||
    'Air cargo shipping with door-to-door delivery. Fast air dispatches for boxes, gifts, excess baggage, and urgent shipments.';
  const airImage = propAir?.image || (blockData?.air_cargo_image as string) || IMAGE_SLOTS.serviceAir.src;
  const airAlt = propAir?.imageAlt || `${airTitle} Delivery Services`;
  const airCtaLabel = propAir?.cta?.label || 'Explore Air Cargo';
  const airCtaHref = propAir?.cta?.href || '/cargo-services';

  // Sea Cargo Data
  const seaTitle = propSea?.title || (blockData?.sea_cargo_title as string) || 'SEA CARGO';
  const seaDesc =
    propSea?.description ||
    (blockData?.sea_cargo_description as string) ||
    'Sea cargo shipping with door-to-door delivery. Economical ocean container shipping for heavy goods and large household shipments.';
  const seaImage = propSea?.image || (blockData?.sea_cargo_image as string) || IMAGE_SLOTS.serviceSea.src;
  const seaAlt = propSea?.imageAlt || `${seaTitle} Delivery Services`;
  const seaCtaLabel = propSea?.cta?.label || 'Explore Sea Cargo';
  const seaCtaHref = propSea?.cta?.href || '/cargo-services';

  return (
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white">
      <Container>
        <SectionHeading
          badge={badge}
          title={title}
          subtitle={subtitle}
          className="mb-12 [&_h2]:text-white [&_p]:text-slate-300"
          badgeVariant="outline-dark"
        />

        {/* Balanced 2-Column Grid: AIR CARGO & SEA CARGO ONLY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Service 1: AIR CARGO */}
          <div className="bg-brand-black-deep rounded-md border border-border-dark overflow-hidden p-6 lg:p-8 flex flex-col justify-between space-y-6 group hover:border-slate-700 transition-colors shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="accent">Air Shipping</Badge>
                <Plane className="w-6 h-6 text-accent shrink-0" />
              </div>

              <div className="space-y-2">
                <h3 className="text-display-sm font-bold text-white group-hover:text-accent transition-colors">
                  {airTitle}
                </h3>
                <p className="text-body-md text-slate-300 leading-relaxed font-normal">{airDesc}</p>
              </div>

              {/* Service Photo Anchor */}
              <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-brand-black border border-border-dark mt-4">
                <Image
                  src={airImage}
                  alt={airAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 600px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-slate-200 flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Door-to-door delivery included</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-border-dark flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Fast Air Shipping</span>
              <Link href={airCtaHref}>
                <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                  {airCtaLabel}
                </Button>
              </Link>
            </div>
          </div>

          {/* Service 2: SEA CARGO */}
          <div className="bg-brand-black-deep rounded-md border border-border-dark overflow-hidden p-6 lg:p-8 flex flex-col justify-between space-y-6 group hover:border-slate-700 transition-colors shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline-dark">Sea Shipping</Badge>
                <Ship className="w-6 h-6 text-accent shrink-0" />
              </div>

              <div className="space-y-2">
                <h3 className="text-display-sm font-bold text-white group-hover:text-accent transition-colors">
                  {seaTitle}
                </h3>
                <p className="text-body-md text-slate-300 leading-relaxed font-normal">{seaDesc}</p>
              </div>

              {/* Service Photo Anchor */}
              <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-brand-black border border-border-dark mt-4">
                <Image
                  src={seaImage}
                  alt={seaAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 600px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-slate-200 flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Door-to-door delivery included</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-border-dark flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Ocean Container Cargo</span>
              <Link href={seaCtaHref}>
                <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                  {seaCtaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
