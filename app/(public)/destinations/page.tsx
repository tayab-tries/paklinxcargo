import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getPublishedDestinations, DestinationCountryData } from '@/lib/destinations/destination-content';
import { getPublishedLocations } from '@/lib/locations/location-content';
import { siteConfig } from '@/config/site.config';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import { getSanityDestinationsList, getSanityLocationsList, SanityDestinationCountryDocument } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: `International Cargo Destinations from Pakistan | ${siteConfig.name}`,
  description:
    'Explore international cargo shipping destination corridors from Pakistan including UK, USA, UAE, Canada, Saudi Arabia, and global ports.',
  alternates: {
    canonical: `${siteConfig.domain}/destinations`,
  },
};

export default async function DestinationsHubPage() {
  const [sanityDestinations, fallbackDestinations, sanityLocations, fallbackLocations] = await Promise.all([
    getSanityDestinationsList(),
    getPublishedDestinations(),
    getSanityLocationsList(),
    getPublishedLocations(),
  ]);

  const destinations: DestinationCountryData[] =
    sanityDestinations.length > 0
      ? sanityDestinations.map((doc: SanityDestinationCountryDocument) => {
          const fallback = fallbackDestinations.find((f) => f.slug === doc.slug);
          return {
            id: doc._id || doc.slug,
            name: doc.name,
            slug: doc.slug,
            region: doc.region || fallback?.region || 'Global',
            h1: doc.h1 || fallback?.h1 || `Cargo Services to ${doc.name}`,
            seoTitle: doc.seo?.metaTitle || fallback?.seoTitle || `Cargo to ${doc.name}`,
            seoDescription: doc.seo?.metaDescription || fallback?.seoDescription || `Cargo shipping to ${doc.name}`,
            introduction: doc.introduction || fallback?.introduction || `Cargo shipping to ${doc.name}`,
            shippingOverview: doc.shippingOverview || fallback?.shippingOverview || '',
            customsGuidance: doc.customsGuidance || fallback?.customsGuidance || '',
            supportedServices: doc.supportedServices || fallback?.supportedServices || ['air-freight', 'sea-cargo'],
            supportedOrigins: doc.supportedOrigins || fallback?.supportedOrigins || [],
            cities:
              doc.cities?.map((c) => ({
                id: c._id || c.slug,
                countryId: doc._id || doc.slug,
                name: c.name,
                slug: c.slug,
                h1: c.h1 || `Cargo Services to ${c.name}, ${doc.name}`,
                seoTitle: c.seo?.metaTitle || `Cargo Shipping to ${c.name}`,
                seoDescription: c.seo?.metaDescription || `Cargo shipping to ${c.name}, ${doc.name}`,
                introduction: c.introduction || `Cargo shipping to ${c.name}`,
                overview: c.overview || c.introduction,
                preparationConsiderations: c.preparationConsiderations || '',
                deliveryCoverageNotes: '',
                status: 'published',
                isVerified: true,
                isIndexable: true,
              })) || fallback?.cities || [],
            faqs: doc.faqs || fallback?.faqs || [],
            status: 'published',
            isVerified: true,
            isIndexable: true,
          };
        })
      : fallbackDestinations;

  const originLocations =
    sanityLocations.length > 0
      ? sanityLocations.map((l) => ({ name: l.name, slug: l.slug, province: l.province }))
      : fallbackLocations.map((l) => ({ name: l.name, slug: l.slug, province: l.province }));

  const featuredCorridor = destinations.length > 0 ? destinations[0] : null;
  const secondaryCorridors = destinations.length > 1 ? destinations.slice(1) : [];

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
  ];

  return (
    <div className="w-full bg-background">
      {/* 01 HUB HERO (Dark / Photo-led) */}
      <section className="relative w-full bg-brand-black text-white py-16 lg:py-24 border-b border-border-dark overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand-black-deep">
          <Image
            src={IMAGE_SLOTS.destination.src}
            alt="International Cargo Destinations"
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
              Global Cargo Corridors
            </Badge>

            <h1 className="text-display-xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              International Cargo Destinations From Pakistan
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Commercial air cargo allocations and ocean container shipping linehauls connecting export hubs across Pakistan with destination ports worldwide.
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

      {/* 02 INTRODUCTION */}
      <section className="w-full bg-background py-16 lg:py-20 border-b border-border text-brand-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-3">
              <Badge variant="navy">Established Linehauls</Badge>
              <h2 className="text-display-sm font-bold text-brand-black tracking-tight leading-tight">
                Verified Trade Routes & Destination Port Entry
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <p className="text-body-lg text-slate-700 leading-relaxed font-normal">
                Each destination corridor features dedicated air cargo space and scheduled ocean vessel transport. Origin dispatches depart from Pakistan hubs for direct processing and customs entry.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 FEATURED CORRIDORS / EMPTY STATE */}
      <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white">
        <Container>
          <SectionHeading
            badge="Trade Corridors"
            title="Featured International Shipping Routes"
            subtitle="Scheduled linehaul dispatch connecting shippers in Pakistan with destination markets."
            className="mb-14 [&_h2]:text-white [&_p]:text-slate-300"
            badgeVariant="outline-dark"
          />

          {destinations.length === 0 ? (
            <div className="bg-brand-black-deep rounded-md border border-border-dark p-12 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
              <Globe className="w-10 h-10 text-accent mx-auto" />
              <h2 className="text-heading-xl font-bold text-white">No Destination Countries Added Yet</h2>
              <p className="text-body-md text-slate-300 leading-relaxed">
                Our operations network is currently updating destination corridors. You can request a custom quote for any international destination worldwide.
              </p>
              <div className="pt-2">
                <Link href="/quote">
                  <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                    Request Destination Quote
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* ONE Dominant Featured Corridor (Col-span-7) */}
              {featuredCorridor && (
                <div className="lg:col-span-7 bg-brand-black-deep rounded-md border border-border-dark overflow-hidden p-8 lg:p-10 flex flex-col justify-between space-y-8 group hover:border-slate-700 transition-colors shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border-dark pb-3">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                        {featuredCorridor.region.toUpperCase()}
                      </span>
                      <Badge variant="accent">Featured Market</Badge>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-display-sm font-bold text-white group-hover:text-accent transition-colors">
                        {featuredCorridor.name}
                      </h2>
                      <p className="text-body-md text-slate-300 leading-relaxed max-w-xl">
                        {featuredCorridor.introduction}
                      </p>
                    </div>

                    {/* Dominant Image Anchor */}
                    <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-brand-black border border-border-dark mt-4">
                      <Image
                        src={IMAGE_SLOTS.destination.src}
                        alt={IMAGE_SLOTS.destination.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 650px"
                        className="object-cover object-center group-hover:scale-102 transition-transform duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-300">
                        Air & Ocean Freight Linehaul Desk
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border-dark flex items-center justify-between">
                    <Link
                      href={`/destinations/${featuredCorridor.slug}`}
                      className="text-xs font-mono font-semibold text-slate-200 hover:text-accent flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Corridor</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                    </Link>
                    <Link href={`/quote?destination=${featuredCorridor.slug}`}>
                      <Button variant="accent" size="md">
                        Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Secondary Corridors List (Col-span-5) */}
              {secondaryCorridors.length > 0 && (
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  {secondaryCorridors.map((dest) => (
                    <div
                      key={dest.slug}
                      className="bg-brand-black-deep rounded-md border border-border-dark p-8 space-y-6 flex-1 flex flex-col justify-between group hover:border-slate-700 transition-colors shadow-lg"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border-dark pb-3">
                          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                            {dest.region.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-heading-lg font-bold text-white group-hover:text-accent transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-body-sm text-slate-300 leading-relaxed line-clamp-2">
                          {dest.introduction}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border-dark flex items-center justify-between">
                        <Link
                          href={`/destinations/${dest.slug}`}
                          className="text-xs font-mono font-semibold text-slate-200 hover:text-accent flex items-center gap-1.5 transition-colors"
                        >
                          <span>View Corridor</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                        </Link>
                        <Link href={`/quote?destination=${dest.slug}`}>
                          <Button variant="outline-dark" size="sm">
                            Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* 04 COUNTRY DIRECTORY */}
      {destinations.length > 0 && (
        <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
          <Container>
            <SectionHeading
              badge="Directory"
              title="Complete International Destination Market Directory"
              subtitle="Verified destination corridors supported for export cargo dispatches from Pakistan."
              className="mb-14"
            />

            <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
              {destinations.map((dest) => (
                <div
                  key={dest.slug}
                  className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
                >
                  <div className="space-y-1 md:w-1/3">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {dest.region} Region
                    </div>
                    <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                      <Link href={`/destinations/${dest.slug}`}>{dest.name}</Link>
                    </h3>
                  </div>

                  <div className="text-xs font-mono text-slate-600 md:w-1/3">
                    <span className="text-slate-400 block">Supported Modes</span>
                    <span className="font-semibold text-brand-black">
                      Air Freight, Sea Cargo, Commercial Cargo
                    </span>
                  </div>

                  <div className="flex items-center gap-4 md:justify-end md:w-1/3">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                    >
                      <span>Corridor Specification</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                    </Link>
                    <Link href={`/quote?destination=${dest.slug}`}>
                      <Button variant="outline" size="sm">
                        Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 05 ORIGIN → DESTINATION EXPLANATION */}
      {originLocations.length > 0 && destinations.length > 0 && (
        <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
          <Container>
            <SectionHeading
              badge="Network Manifest"
              title="Pakistan Origins → Global Markets"
              subtitle="Cargo receiving operates across primary cities in Pakistan for direct linehaul dispatch to international destination ports."
              className="mb-14"
            />

            <div className="bg-surface-subtle border border-border rounded-md p-6 lg:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* LEFT COLUMN: PAKISTAN ORIGINS */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider border-b border-border pb-3 flex items-center justify-between">
                    <span>Pakistan Origins</span>
                    <span className="text-[10px] text-slate-400 font-normal">{originLocations.length} Hubs</span>
                  </div>

                  <div className="divide-y divide-border/60">
                    {originLocations.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}`}
                        className="group min-h-[56px] py-3.5 px-4 rounded flex items-center justify-between hover:bg-surface transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="text-body-md font-semibold text-brand-black group-hover:text-accent transition-colors block">
                            {loc.name}
                          </span>
                          <span className="text-xs text-slate-500 font-normal block">
                            {loc.province}
                          </span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-accent transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CENTER COLUMN: THIN ROUTE CONNECTOR LINES */}
                <div className="hidden lg:col-span-2 lg:flex flex-col justify-around items-center py-10">
                  {originLocations.slice(0, 4).map((loc, idx) => (
                    <div key={idx} className="w-full flex items-center justify-center gap-1 my-2">
                      <div className="h-[1px] w-full bg-border/80 group-hover:bg-accent/60 transition-colors" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 opacity-70" />
                      <div className="h-[1px] w-full bg-border/80 group-hover:bg-accent/60 transition-colors" />
                    </div>
                  ))}
                </div>

                {/* RIGHT COLUMN: INTERNATIONAL MARKETS */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider border-b border-border pb-3 flex items-center justify-between">
                    <span>International Markets</span>
                    <span className="text-[10px] text-slate-400 font-normal">{destinations.length} Countries</span>
                  </div>

                  <div className="divide-y divide-border/60">
                    {destinations.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/destinations/${dest.slug}`}
                        className="group min-h-[56px] py-3.5 px-4 rounded flex items-center justify-between hover:bg-surface transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="text-body-md font-semibold text-brand-black group-hover:text-accent transition-colors block">
                            {dest.name}
                          </span>
                          <span className="text-xs text-slate-500 font-normal block">
                            {dest.region}
                          </span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-accent transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 06 FINAL CONVERSION PANEL */}
      <FinalCtaSection />
    </div>
  );
}
