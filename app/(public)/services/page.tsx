import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Plane,
  Ship,
  Truck,
  FileText,
  Building2,
  Luggage,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EditorialHero } from '@/components/ui/EditorialHero';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getEnabledServices, ServiceConfigItem } from '@/config/services.config';
import { siteConfig } from '@/config/site.config';
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

  const specializedServices = services.filter(
    (s) => s.slug !== 'air-freight' && s.slug !== 'sea-cargo'
  );

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
  ];

  return (
    <div className="w-full bg-[#FAF8F3] text-[#17201B] font-sans antialiased selection:bg-[#C6A15B]/30">
      {/* 1. EDITORIAL SERVICES HERO */}
      <EditorialHero
        breadcrumbs={breadcrumbs}
        eyebrow="Global Freight Directory"
        title="Core Cargo & International Logistics"
        subtitle="Scheduled air freight, ocean sea cargo, and integrated door-to-door forwarding from Pakistan"
        description="We structure freight solutions tailored to your cargo parameters—balancing urgency, volume, and budget for dispatches worldwide."
        primaryCta={{ label: 'Calculate Shipping Quote', href: '/quote' }}
        secondaryCta={{ label: 'Track Active Shipment', href: '/track' }}
        imageSrc="/images/hero-freight.jpg"
        imageAlt="International Cargo Logistics Operations"
        imageBadgeText="Air & Sea Freight Directory"
      />

      {/* 2. FEATURED SERVICE — AIR CARGO */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#12372A]/15 pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="px-3 py-1 bg-[#1F8A5B]/15 text-[#1F8A5B] font-mono text-xs font-bold uppercase rounded-full inline-block">
                  Primary Express Mode
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                  Featured Service — Air Cargo
                </h2>
              </div>
              <div className="font-mono text-xs text-[#1F8A5B] font-bold tracking-wider uppercase">
                Minimum 20 KG • Indicative Transit 10–15 Days
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* LARGE IMAGE */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/30 shadow-2xl bg-[#17201B] group">
                  <div className="aspect-[16/10] relative w-full overflow-hidden">
                    <Image
                      src="/images/service-air.jpg"
                      alt="International Air Cargo Freight"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-4 bg-[#17201B] border-t border-[#C6A15B]/20 flex items-center justify-between text-xs font-mono text-[#F6F2E9]/80">
                    <span className="text-[#C6A15B] font-bold uppercase">Scheduled Airlines</span>
                    <span>Airport-to-Airport & Doorstep</span>
                  </div>
                </div>
              </div>

              {/* LARGE TYPOGRAPHY & DETAILS */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A] leading-tight">
                  Fast Air Freight Dispatch for Time-Sensitive Cargo
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#17201B]/80 leading-relaxed">
                  Scheduled airline carrier allocations optimized for high-value commercial goods, urgent parcels, textiles, business samples, and personal luggage originating from Pakistan.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-xl border border-[#12372A]/15 space-y-1">
                    <span className="font-mono text-xs text-[#1F8A5B] uppercase font-bold block">Weight Threshold</span>
                    <span className="font-mono text-lg font-bold text-[#17201B]">Minimum 20 KG</span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-[#12372A]/15 space-y-1">
                    <span className="font-mono text-xs text-[#1F8A5B] uppercase font-bold block">Transit Expectation</span>
                    <span className="font-mono text-lg font-bold text-[#17201B]">10–15 Days</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link href="/cargo-services#part-1-air-cargo">
                    <button
                      type="button"
                      className="h-12 px-6 bg-[#12372A] hover:bg-[#1F8A5B] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Explore Air Cargo Rates</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/quote?service=air-freight">
                    <span className="font-mono text-xs font-bold text-[#1F8A5B] hover:text-[#12372A] underline cursor-pointer">
                      Calculate Air Freight →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. SEA CARGO EDITORIAL BLOCK */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#12372A]/15 pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="px-3 py-1 bg-[#12372A] text-[#F6F2E9] font-mono text-xs font-bold uppercase rounded-full inline-block">
                  Economical Ocean Shipping
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                  Sea Freight Cargo Solutions
                </h2>
              </div>
              <div className="font-mono text-xs text-[#12372A] font-bold tracking-wider uppercase">
                Minimum 70–100 KG • Indicative Transit 1.5–2.5 Months
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* DETAILS FIRST ON DESKTOP */}
              <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A] leading-tight">
                  High-Volume Ocean Container Shipping (LCL & FCL)
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#17201B]/80 leading-relaxed">
                  For heavy goods, commercial machinery, bulk merchandise, or complete household relocations, ocean sea freight departing Karachi ports provides maximum cost efficiency.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#12372A]/15 space-y-1">
                    <span className="font-mono text-xs text-[#12372A] uppercase font-bold block">Weight Threshold</span>
                    <span className="font-mono text-lg font-bold text-[#17201B]">70–100 KG Min</span>
                  </div>
                  <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#12372A]/15 space-y-1">
                    <span className="font-mono text-xs text-[#12372A] uppercase font-bold block">Transit Expectation</span>
                    <span className="font-mono text-lg font-bold text-[#17201B]">1.5–2.5 Months</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-[#17201B]/60 italic">
                  * Indicative ocean timelines vary depending on port congestion, vessel schedules, and destination customs clearance.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link href="/cargo-services#part-2-sea-cargo">
                    <button
                      type="button"
                      className="h-12 px-6 bg-[#C6A15B] hover:bg-[#b5924e] text-[#17201B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Explore Sea Cargo Rates</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/quote?service=sea-cargo">
                    <span className="font-mono text-xs font-bold text-[#1F8A5B] hover:text-[#12372A] underline cursor-pointer">
                      Calculate Sea Cargo →
                    </span>
                  </Link>
                </div>
              </div>

              {/* SEA IMAGE SECOND ON DESKTOP */}
              <div className="lg:col-span-6 relative order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/30 shadow-2xl bg-[#17201B] group">
                  <div className="aspect-[16/10] relative w-full overflow-hidden">
                    <Image
                      src="/images/service-sea.jpg"
                      alt="Sea Freight Container Shipping"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-4 bg-[#17201B] border-t border-[#C6A15B]/20 flex items-center justify-between text-xs font-mono text-[#F6F2E9]/80">
                    <span className="text-[#C6A15B] font-bold uppercase">Karachi Port Departure</span>
                    <span>LCL & FCL Services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. DOOR-TO-DOOR CAPABILITY STORY */}
      <section className="w-full bg-[#17201B] text-white py-20 lg:py-28 border-b border-[#12372A]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/30 shadow-2xl bg-[#12372A] group">
                <div className="aspect-[16/10] relative w-full overflow-hidden">
                  <Image
                    src="/images/service-door.jpg"
                    alt="Door-to-door international delivery workflow"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/90 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 bg-[#17201B] border-t border-[#C6A15B]/20 flex justify-between items-center text-xs font-mono">
                  <span className="text-[#C6A15B] font-bold uppercase">Full Pipeline</span>
                  <span className="text-white/80">Pakistan Door → Global Destination Door</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase rounded-full inline-block">
                Full-Service Forwarding
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F2E9] leading-tight">
                Door-to-Door Delivery Pipeline
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#F6F2E9]/80 leading-relaxed">
                For eligible routes and shipment types, we coordinate origin pickup in Pakistan, protective packaging guidance, export customs declarations, air or ocean transit, destination clearance, and final delivery to the receiver&apos;s door.
              </p>

              <div className="space-y-3 font-sans text-sm text-[#F6F2E9]/90 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0" />
                  <span>Doorstep pickup across major Pakistan hubs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0" />
                  <span>Managed export customs clearance documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0" />
                  <span>Last-mile carrier delivery integration at destination</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/cargo-services#door-to-door">
                  <button
                    type="button"
                    className="h-12 px-6 bg-[#C6A15B] hover:bg-[#b5924e] text-[#17201B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Door-to-Door Service Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. SPECIALIZED SERVICES EDITORIAL LIST */}
      {specializedServices.length > 0 && (
        <section className="w-full bg-[#FAF8F3] py-20 lg:py-28 border-b border-[#12372A]/10">
          <Container>
            <div className="space-y-12">
              <div className="max-w-2xl space-y-3">
                <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                  Specialized Solutions
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                  Tailored Trade & Baggage Offerings
                </h2>
                <p className="font-sans text-base text-[#17201B]/75">
                  Dedicated service specifications for commercial exporters, travelers, and regulatory guidance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {specializedServices.map((service) => {
                  const IconComponent = iconMap[service.iconName] || Package;

                  return (
                    <div
                      key={service.slug}
                      className="p-8 rounded-2xl bg-white border border-[#12372A]/15 space-y-6 flex flex-col justify-between shadow-2xs hover:border-[#1F8A5B]/40 transition-colors group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-lg bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-[10px] font-bold text-[#12372A] uppercase bg-[#12372A]/10 px-2 py-0.5 rounded">
                            {service.category}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#17201B] group-hover:text-[#12372A] transition-colors">
                          {service.name}
                        </h3>
                        <p className="font-sans text-sm text-[#17201B]/75 leading-relaxed font-normal">
                          {service.shortDescription}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[#12372A]/10 flex items-center justify-between">
                        <Link
                          href={`/services/${service.slug}`}
                          className="font-mono text-xs font-bold text-[#12372A] hover:text-[#1F8A5B] underline"
                        >
                          View Specification →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 6. HOW TO CHOOSE — AIR VS SEA EDITORIAL COMPARISON */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-[#1F8A5B]/15 text-[#1F8A5B] font-mono text-xs font-bold uppercase rounded-full inline-block">
                Mode Selection Guide
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                Air Cargo vs Sea Freight
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                Simple operational comparison to select the right transportation mode.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-2xl bg-white border border-[#12372A]/15 space-y-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Plane className="w-6 h-6 text-[#1F8A5B]" />
                  <h3 className="font-serif text-2xl font-bold text-[#12372A]">Air Freight Choice</h3>
                </div>
                <ul className="space-y-3 font-sans text-sm text-[#17201B]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0 mt-0.5" />
                    <span>Speed is priority (10–15 days indicative)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0 mt-0.5" />
                    <span>Weight is 20 KG or above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0 mt-0.5" />
                    <span>High value, urgent textiles, excess baggage</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#12372A]/15 space-y-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Ship className="w-6 h-6 text-[#C6A15B]" />
                  <h3 className="font-serif text-2xl font-bold text-[#12372A]">Sea Freight Choice</h3>
                </div>
                <ul className="space-y-3 font-sans text-sm text-[#17201B]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <span>Budget efficiency is priority (1.5–2.5 months indicative)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <span>Weight is 70–100 KG or above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <span>Bulk commercial stock, machinery, household relocations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. FINAL CONVERSION SECTION */}
      <FinalCtaSection />
    </div>
  );
}
