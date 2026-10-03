import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getPublishedLocations, LocationData } from '@/lib/locations/location-content';
import { siteConfig } from '@/config/site.config';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import { getSanityLocationsList, SanityLocationDocument } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: `Pakistan Cargo Pickup Locations & Origin Hubs | ${siteConfig.name}`,
  description:
    'Explore international cargo shipping pickup centers and origin hubs across major cities in Pakistan.',
  alternates: {
    canonical: `${siteConfig.domain}/locations`,
  },
};

export default async function LocationsHubPage() {
  const [sanityLocations, fallbackLocations] = await Promise.all([
    getSanityLocationsList(),
    getPublishedLocations(),
  ]);

  const locations: LocationData[] =
    sanityLocations.length > 0
      ? sanityLocations.map((doc: SanityLocationDocument) => {
          const fallback = fallbackLocations.find((f) => f.slug === doc.slug);
          return {
            id: doc._id || doc.slug,
            name: doc.name,
            slug: doc.slug,
            province: doc.province || fallback?.province || 'Pakistan',
            h1: doc.h1 || fallback?.h1 || `Cargo Services in ${doc.name}`,
            seoTitle: doc.seo?.metaTitle || fallback?.seoTitle || `Cargo Shipping ${doc.name}`,
            seoDescription: doc.seo?.metaDescription || fallback?.seoDescription || `Cargo shipping in ${doc.name}`,
            introduction: doc.introduction || fallback?.introduction || `Cargo shipping in ${doc.name}`,
            serviceAvailable: doc.serviceAvailable ?? fallback?.serviceAvailable ?? true,
            collectionAvailable: doc.collectionAvailable ?? fallback?.collectionAvailable ?? true,
            hasPhysicalBranch: doc.hasPhysicalBranch ?? fallback?.hasPhysicalBranch ?? false,
            branchAddress: doc.branchAddress || fallback?.branchAddress || '',
            localCoverageText: doc.localCoverageText || fallback?.localCoverageText || '',
            supportedServices: doc.supportedServices || fallback?.supportedServices || ['air-freight', 'sea-cargo'],
            supportedDestinations: fallback?.supportedDestinations || [],
            status: 'published',
            isVerified: true,
            isIndexable: true,
            faqs: doc.faqs || fallback?.faqs || [],
          };
        })
      : fallbackLocations;

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
  ];

  return (
    <div className="w-full bg-background">
      {/* 1. Locations Hero */}
      <section className="relative w-full bg-brand-black text-white py-16 lg:py-24 border-b border-border-dark overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand-black-deep">
          <Image
            src={IMAGE_SLOTS.pakistanHub.src}
            alt="Pakistan Export Freight Hubs"
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
              Pakistan Origin Coverage
            </Badge>

            <h1 className="text-display-xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              International Cargo Services Across Pakistan
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Doorstep cargo collection and export freight dispatch operating across primary commercial cities in Pakistan.
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

      {/* 2. Primary Export Hubs Network Showcase — Clean Solid Background */}
      <section className="relative w-full bg-brand-black-deep text-white py-20 lg:py-28 border-b border-border-dark">
        <Container>
          <SectionHeading
            badge="Origin Network"
            title="Primary Pakistan Export Hubs"
            subtitle="Scheduled doorstep collection and cargo handling facilities across key origin cities."
            className="mb-12 [&_h2]:text-white [&_p]:text-slate-300"
            badgeVariant="outline-dark"
          />

          {locations.length === 0 ? (
            <div className="bg-brand-navy rounded-md border border-border-dark p-12 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
              <MapPin className="w-10 h-10 text-accent mx-auto" />
              <h2 className="text-heading-xl font-bold text-white">No Locations Added Yet</h2>
              <p className="text-body-md text-slate-300 leading-relaxed">
                Our operations network is currently updating origin location hubs. You can request a shipping quote directly from any location in Pakistan.
              </p>
              <div className="pt-2">
                <Link href="/quote">
                  <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                    Request Pickup Quote
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {locations.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="group bg-brand-navy rounded-md border border-border-dark hover:border-accent p-6 space-y-4 transition-all hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                        {city.province}
                      </span>
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors shrink-0" />
                    </div>
                    <h3 className="text-heading-md font-bold text-white group-hover:text-accent transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-body-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                      {city.introduction}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-dark flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 group-hover:text-accent group-hover:underline font-semibold">Explore Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 2.5 Standalone Network Map Showcase Banner — Aspect Ratio & Framing Optimized */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-dark overflow-hidden min-h-[360px] lg:min-h-[440px] flex items-center text-white">
        {/* User Map Image as Background */}
        <div className="absolute inset-0 z-0 bg-brand-black-deep">
          <Image
            src="/images/pakistan-map-network.png"
            alt="Connecting Pakistan — Delivering Possibilities network map"
            fill
            sizes="100vw"
            className="object-cover object-center lg:object-[center_35%]"
          />
          {/* Subtle Side Gradient Mask */}
          <div
            className="absolute inset-0 z-10 pointer-events-none hidden md:block"
            style={{
              background: `linear-gradient(
                90deg,
                rgba(7,10,15,0.85) 0%,
                rgba(7,10,15,0.65) 45%,
                rgba(7,10,15,0.20) 100%
              )`,
            }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none md:hidden"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(7,10,15,0.80) 0%,
                rgba(7,10,15,0.50) 50%,
                rgba(7,10,15,0.80) 100%
              )`,
            }}
          />
        </div>

        <Container className="relative z-20">
          <div className="max-w-xl bg-brand-black-deep/75 backdrop-blur-md border border-slate-700/60 p-6 sm:p-8 rounded-md space-y-5 shadow-2xl">
            <Badge variant="outline-dark" size="sm" className="text-slate-300 border-slate-600 bg-brand-black/60">
              Nationwide Logistics Network
            </Badge>

            <h2 className="text-heading-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Connecting Pakistan. Delivering Possibilities.
            </h2>

            <p className="text-body-sm text-slate-300 leading-relaxed font-normal">
              Our extensive network connects major cities and beyond, ensuring your cargo reaches every corner with reliability, speed, and complete tracking transparency.
            </p>

            <div className="pt-1">
              <Link href="/quote">
                <Button
                  variant="accent"
                  size="md"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Request Cargo Pickup
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Published City Directory */}
      {locations.length > 0 && (
        <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
          <Container>
            <SectionHeading
              badge="Directory"
              title="Complete Origin City Network Directory"
              subtitle="Operational status and collection coverage across published shipping origin locations."
              className="mb-14"
            />

            <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
              {locations.map((city) => (
                <div
                  key={city.slug}
                  className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
                >
                  <div className="space-y-1 md:w-1/3">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {city.province}
                    </div>
                    <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                      <Link href={`/locations/${city.slug}`}>{city.name}</Link>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 md:w-1/3">
                    <div className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded border border-border">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Service Available</span>
                    </div>
                    {city.collectionAvailable && (
                      <div className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded border border-border">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Collection Active</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 md:justify-end md:w-1/3">
                    <Link
                      href={`/locations/${city.slug}`}
                      className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                    >
                      <span>View City Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                    </Link>
                    <Link href={`/quote?origin=${city.slug}`}>
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

      {/* 4. Service & Dispatch Guidance Section */}
      <section className="w-full bg-brand-navy py-16 text-white border-b border-border-dark">
        <Container>
          <div className="bg-brand-black-deep border border-border-dark p-8 lg:p-12 rounded-md space-y-6 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-accent">
                <ShieldCheck className="w-4 h-4" />
                <span>Regional Dispatch Coordination</span>
              </div>
              <h2 className="text-heading-xl font-bold text-white">Cargo Dispatch from Other Cities in Pakistan?</h2>
              <p className="text-body-md text-slate-300 leading-relaxed">
                If your origin location is outside primary city centers, our regional logistics team coordinates doorstep pickup and feeder dispatch from surrounding districts across Pakistan.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/quote">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                  Request Custom Origin Quote
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
