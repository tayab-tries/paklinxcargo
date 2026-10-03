import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Plane, Ship, Truck, FileText, Building2, Luggage, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getEnabledServices, ServiceConfigItem } from '@/config/services.config';
import { siteConfig } from '@/config/site.config';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import { getSanityServicesList, SanityServiceDocument } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: `Core Cargo & Logistics Services | ${siteConfig.name}`,
  description:
    'Explore international air freight, ocean sea cargo, door-to-door shipping, and commercial cargo services originating from Pakistan.',
  alternates: {
    canonical: `${siteConfig.domain}/services`,
  },
};

const iconMap: Record<string, React.ElementType> = {
  Package,
  Plane,
  Ship,
  Truck,
  FileText,
  Building2,
  Luggage,
};

export default async function ServicesHubPage() {
  const [sanityServices, fallbackServices] = await Promise.all([
    getSanityServicesList(),
    Promise.resolve(getEnabledServices()),
  ]);

  // Combine Sanity data with fallbacks if Sanity records exist
  const services: ServiceConfigItem[] =
    sanityServices.length > 0
      ? sanityServices.map((doc: SanityServiceDocument) => {
          const fallback = fallbackServices.find((f) => f.slug === doc.slug);
          return {
            slug: doc.slug,
            name: doc.name || fallback?.name || doc.title,
            h1: doc.title || fallback?.h1 || '',
            shortDescription: doc.shortDescription || fallback?.shortDescription || '',
            enabled: true,
            isVerified: true,
            quoteCargoType: (doc.quoteCargoType as ServiceConfigItem['quoteCargoType']) || fallback?.quoteCargoType,
            contentPath: fallback?.contentPath || '',
            iconName: (doc.iconName as ServiceConfigItem['iconName']) || fallback?.iconName || 'Package',
            category: doc.category || fallback?.category || 'core',
            relatedServices: fallback?.relatedServices || [],
            relatedDestinations: fallback?.relatedDestinations || [],
            relatedLocations: fallback?.relatedLocations || [],
            seo: {
              title: doc.seo?.metaTitle || fallback?.seo.title || '',
              description: doc.seo?.metaDescription || fallback?.seo.description || '',
            },
          };
        })
      : fallbackServices;

  const specializedServices = services.filter((s) => s.slug !== 'air-freight' && s.slug !== 'sea-cargo');

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
  ];

  return (
    <div className="w-full bg-background">
      {/* 1. Services Hero Header */}
      <section className="relative w-full bg-brand-black text-white py-16 lg:py-24 border-b border-border-dark overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand-black-deep">
          <Image
            src={IMAGE_SLOTS.heroBackground.src}
            alt="International Cargo & Freight Services"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none hidden md:block"
            style={{
              background: `linear-gradient(
                90deg,
                rgba(7,10,15,0.96) 0%,
                rgba(7,10,15,0.88) 35%,
                rgba(7,10,15,0.65) 65%,
                rgba(7,10,15,0.30) 100%
              )`,
            }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none md:hidden"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(7,10,15,0.88) 0%,
                rgba(7,10,15,0.70) 50%,
                rgba(7,10,15,0.85) 100%
              )`,
            }}
          />
        </div>

        <Container className="relative z-20">
          <Breadcrumbs items={breadcrumbs} variantSurface="dark" className="mb-6" />

          <div className="max-w-3xl space-y-6">
            <Badge variant="outline-dark" size="md" className="text-slate-300 border-border-dark bg-brand-black/60 backdrop-blur-xs">
              Verified Logistics Portfolio
            </Badge>

            <h1 className="text-display-xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              Core Cargo & Logistics Services
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Commercial air cargo forwarding, ocean sea freight, and doorstep collection connecting shippers across Pakistan with destination corridors worldwide.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/quote">
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
          </div>
        </Container>
      </section>

      {/* 2. Core Freight Modes (Balanced 2-Column Grid: AIR CARGO & SEA CARGO EXACT SAME SIZE) */}
      <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white">
        <Container>
          <SectionHeading
            badge="Primary Capabilities"
            title="Core Commercial Freight Modes"
            subtitle="Scheduled airline carrier capacity, ocean container shipping, and integrated door-to-door forwarding."
            className="mb-14 [&_h2]:text-white [&_p]:text-slate-300"
            badgeVariant="outline-dark"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* AIR CARGO CARD */}
            <div className="bg-brand-black-deep rounded-md border border-border-dark overflow-hidden p-8 lg:p-10 flex flex-col justify-between space-y-8 group hover:border-slate-700 transition-colors shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">Air Shipping</Badge>
                  <Plane className="w-6 h-6 text-accent shrink-0" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-display-sm font-bold text-white group-hover:text-accent transition-colors">
                    Air Cargo Services
                  </h2>
                  <p className="text-body-md text-slate-300 leading-relaxed">
                    Scheduled airline carrier allocations optimized for high-value commercial goods, urgent parcels, clothing, and export shipments originating from Pakistan.
                  </p>
                </div>

                {/* Service Image Anchor */}
                <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-brand-black border border-border-dark mt-4">
                  <Image
                    src={IMAGE_SLOTS.serviceAir.src}
                    alt={IMAGE_SLOTS.serviceAir.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-300 flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Airport-to-Airport & Doorstep Delivery</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-dark flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Min 20 KG • Fast Express</span>
                <Link href="/cargo-services">
                  <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                    Explore Air Freight
                  </Button>
                </Link>
              </div>
            </div>

            {/* SEA CARGO CARD (EXACT SAME SIZE & STYLE AS AIR CARGO) */}
            <div className="bg-brand-black-deep rounded-md border border-border-dark overflow-hidden p-8 lg:p-10 flex flex-col justify-between space-y-8 group hover:border-slate-700 transition-colors shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline-dark">Sea Shipping</Badge>
                  <Ship className="w-6 h-6 text-accent shrink-0" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-display-sm font-bold text-white group-hover:text-accent transition-colors">
                    Sea Cargo Services
                  </h2>
                  <p className="text-body-md text-slate-300 leading-relaxed">
                    Economical ocean container shipping (LCL & FCL) for heavy goods, bulk commercial stock, machinery, and full household relocations departing Karachi ports.
                  </p>
                </div>

                {/* Sea Cargo Image Anchor */}
                <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-brand-black border border-border-dark mt-4">
                  <Image
                    src={IMAGE_SLOTS.serviceSea.src}
                    alt={IMAGE_SLOTS.serviceSea.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-300 flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>Port-to-Port & Doorstep Delivery</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-dark flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Min 70–100 KG • Economical</span>
                <Link href="/cargo-services">
                  <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                    Explore Sea Cargo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Full Service Directory */}
      {specializedServices.length > 0 && (
        <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
          <Container>
            <SectionHeading
              badge="Specialized Logistics"
              title="Commercial Trade & Personal Cargo Solutions"
              subtitle="End-to-end freight forwarding, customs clearance, excess baggage, and trade shipping services."
              className="mb-14"
            />

            {/* Clean Structured Directory List with Row Dividers */}
            <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
              {specializedServices.map((service) => {
                const IconComponent = iconMap[service.iconName] || Package;
                const quoteUrl = service.quoteCargoType
                  ? `/quote?cargo=${service.quoteCargoType}`
                  : '/quote';

                return (
                  <div
                    key={service.slug}
                    className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
                  >
                    <div className="flex items-start gap-4 md:w-1/2">
                      <div className="p-3 bg-surface-subtle rounded border border-border text-slate-700 shrink-0">
                        <IconComponent className="w-5 h-5 text-brand-black" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors">
                          <Link href={`/services/${service.slug}`}>{service.name}</Link>
                        </h3>
                        <p className="text-body-sm text-slate-600 leading-relaxed font-normal">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                      >
                        <span>Service Specification</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                      </Link>
                      <Link href={quoteUrl}>
                        <Button variant="outline" size="sm">
                          Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Selection Guidance Callout Section */}
      <section className="w-full bg-brand-navy py-16 text-white border-b border-border-dark">
        <Container>
          <div className="bg-brand-black-deep border border-border-dark p-8 lg:p-12 rounded-md space-y-6 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-accent">
                <ShieldCheck className="w-4 h-4" />
                <span>Expert Shipping Consultation</span>
              </div>
              <h2 className="text-heading-xl font-bold text-white">Need Assistance Selecting a Shipping Mode?</h2>
              <p className="text-body-md text-slate-300 leading-relaxed">
                Air freight is optimal for high-priority urgent cargo, while ocean sea freight is cost-effective for large commercial container loads. Door-to-door shipping provides end-to-end collection and doorstep delivery.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/quote">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                  Request Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Final Conversion Panel */}
      <FinalCtaSection />
    </div>
  );
}
