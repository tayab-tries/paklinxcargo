import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ArrowRight,
  Plane,
  Ship,
  MapPin,
  HelpCircle,
  FileText,
  ShieldCheck,
  Package,
  MessageSquare,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EditorialHero } from '@/components/ui/EditorialHero';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getPublishedDestinations, DestinationCountryData } from '@/lib/destinations/destination-content';
import { siteConfig } from '@/config/site.config';
import {
  getSanityDestinationsList,
  getSanitySiteSettingsData,
  SanityDestinationCountryDocument,
} from '@/sanity/lib/fetch';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export const metadata: Metadata = {
  title: `International Cargo Destinations from Pakistan | ${siteConfig.name}`,
  description:
    'Explore international cargo shipping destination corridors from Pakistan including UK, USA, UAE, Canada, Saudi Arabia, and global ports.',
  alternates: {
    canonical: `${siteConfig.domain}/destinations`,
  },
  openGraph: {
    title: `International Cargo Destinations from Pakistan | ${siteConfig.name}`,
    description:
      'Explore international cargo shipping destination corridors from Pakistan including UK, USA, UAE, Canada, Saudi Arabia, and global ports.',
    url: `${siteConfig.domain}/destinations`,
    type: 'website',
  },
};

export default async function DestinationsHubPage() {
  const [sanityDestinations, fallbackDestinations, sanitySiteSettings] =
    await Promise.all([
      getSanityDestinationsList(),
      getPublishedDestinations(),
      getSanitySiteSettingsData(),
    ]);

  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || siteConfig.phone || '';
  const quoteWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I would like to inquire about international cargo shipping destinations from Pakistan.'
  );

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

  const verifiedOrigins = [
    { name: 'Lahore', slug: 'lahore' },
    { name: 'Karachi', slug: 'karachi' },
    { name: 'Islamabad', slug: 'islamabad' },
    { name: 'Rawalpindi', slug: 'rawalpindi' },
    { name: 'Faisalabad', slug: 'faisalabad' },
    { name: 'Sialkot', slug: 'sialkot' },
    { name: 'Multan', slug: 'multan' },
    { name: 'Peshawar', slug: 'peshawar' },
  ];

  // Authoritative Corridor Metadata Mapping
  const corridorMetadata: Record<
    string,
    { cities: string; airTransit: string; seaTransit: string; code: string }
  > = {
    uk: {
      cities: 'London · Manchester · Birmingham · Scotland',
      airTransit: '10–12 Days',
      seaTransit: '1.5–2.5 Months',
      code: 'GB / UK',
    },
    uae: {
      cities: 'Dubai · Abu Dhabi · Sharjah',
      airTransit: '10–17 Days',
      seaTransit: '1.5–2.5 Months',
      code: 'AE / UAE',
    },
    usa: {
      cities: 'New York · Chicago · Houston · Los Angeles',
      airTransit: '10–15 Days',
      seaTransit: '2–2.5 Months',
      code: 'US / USA',
    },
    canada: {
      cities: 'Toronto · Vancouver · Montreal · Calgary',
      airTransit: '10–15 Days',
      seaTransit: '2–3 Months',
      code: 'CA / CAN',
    },
    'saudi-arabia': {
      cities: 'Riyadh · Jeddah · Dammam',
      airTransit: '10–20 Days',
      seaTransit: '1.5–2.5 Months',
      code: 'SA / KSA',
    },
  };

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'BOOK / REQUEST A QUOTE',
      subtitle: 'Quote & Specification',
      description: 'Submit shipment weight, origin city in Pakistan, and destination market.',
    },
    {
      num: '02',
      title: 'PICKUP IN PAKISTAN',
      subtitle: 'Doorstep Collection',
      description: 'Cargo collection across receiving hubs (Lahore, Karachi, Islamabad, Rawalpindi, Sialkot, Faisalabad).',
    },
    {
      num: '03',
      title: 'EXPORT & INTERNATIONAL TRANSIT',
      subtitle: 'Linehaul Dispatch',
      description: 'Scheduled commercial air freight flight allocation or ocean container vessel linehaul transit.',
    },
    {
      num: '04',
      title: 'DESTINATION DELIVERY',
      subtitle: 'Destination Handoff',
      description: 'Import customs clearance processing and final door delivery handoff to consignee recipient.',
    },
  ];

  const hubFaqs = [
    {
      question: 'Which countries can I ship cargo to from Pakistan?',
      answer: 'We coordinate air cargo and ocean sea freight solutions connecting Pakistan with major destination corridors including the UK, UAE, USA, Canada, Saudi Arabia, Europe, and Australia.',
    },
    {
      question: 'What is the minimum weight requirement for international cargo?',
      answer: 'Our minimum weight requirement for Air Cargo express is 20 KG, while Sea Freight ocean cargo requires a minimum of 70–100 KG depending on destination service availability.',
    },
    {
      question: 'Can you pick up cargo from my city in Pakistan?',
      answer: 'Yes, doorstep cargo pickup and collection services operate across major Pakistan cities including Lahore, Karachi, Islamabad, Rawalpindi, Sialkot, Faisalabad, Multan, and Peshawar.',
    },
    {
      question: 'How do I choose between Air Cargo and Sea Freight?',
      answer: 'Air Cargo is best suited for urgent, time-sensitive or lighter shipments (above 20 kg). Sea Freight is generally more economical for heavier, high-volume, or commercial bulk shipments where longer transit timelines are acceptable.',
    },
    {
      question: 'What documents are required for international export customs?',
      answer: 'Standard export shipping documentation includes a detailed Commercial Invoice, Itemized Packing List, Sender CNIC copy, and Consignee Identity/Contact details.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hubFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const allSubCities = destinations.flatMap((d) =>
    (d.cities || []).map((c) => ({
      name: c.name,
      slug: c.slug,
      countryName: d.name,
      countrySlug: d.slug,
    }))
  );

  return (
    <div className="w-full bg-[#FAF8F3] text-[#17201B] font-sans antialiased selection:bg-[#C6A15B]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. CINEMATIC DESTINATION HERO */}
      <EditorialHero
        breadcrumbs={breadcrumbs}
        eyebrow="INTERNATIONAL DESTINATIONS"
        title="From Pakistan to the World"
        subtitle="Commercial air freight capacity and ocean sea cargo shipping corridors connecting export hubs across Pakistan with destination ports worldwide."
        description="Select your international corridor to explore transit timelines, weight minimums, and export customs requirements."
        primaryCta={{ label: 'Request Shipping Quote', href: '/quote' }}
        secondaryCta={{
          label: 'WhatsApp Rate Desk',
          href: quoteWhatsappUrl,
          icon: <MessageSquare className="w-4 h-4 text-[#C6A15B] shrink-0" />,
        }}
        imageSrc="/images/hero-freight.jpg"
        imageAlt="International Cargo Destinations Port and Linehaul Dispatch from Pakistan"
        imageBadgeText="Pakistan Export Directory"
      />

      {/* 2. FEATURED CORRIDORS — LARGE EDITORIAL ROWS */}
      <section id="featured-corridors" className="scroll-mt-24 w-full bg-[#12372A] py-20 lg:py-28 border-b border-[#C6A15B]/30 text-white">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C6A15B]/20 pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block">
                  Primary Corridors
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Featured Trade Routes
                </h2>
              </div>
              <div className="font-mono text-xs text-[#C6A15B] font-bold tracking-wider uppercase">
                Air & Ocean Linehaul Dispatch
              </div>
            </div>

            <div className="space-y-4">
              {destinations.map((dest) => {
                const meta = corridorMetadata[dest.slug] || {
                  cities: dest.cities?.map((c) => c.name).join(' · ') || 'Major Trade Hubs',
                  airTransit: '10–15 Days',
                  seaTransit: '1.5–2.5 Months',
                  code: dest.name.slice(0, 3).toUpperCase(),
                };

                return (
                  <Link key={dest.slug} href={`/destinations/${dest.slug}`}>
                    <div className="p-6 lg:p-8 bg-[#17201B] hover:bg-[#1F8A5B]/30 border border-[#C6A15B]/30 rounded-2xl transition-all duration-300 group shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* LEFT: COUNTRY CODE & NAME */}
                      <div className="flex items-center gap-6 lg:w-5/12">
                        <span className="font-mono text-2xl lg:text-3xl font-extrabold text-[#C6A15B] opacity-80 group-hover:opacity-100 shrink-0">
                          {meta.code}
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white group-hover:text-[#C6A15B] transition-colors">
                            PAKISTAN → {dest.name.toUpperCase()}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-[#F6F2E9]/75 font-medium">
                            {meta.cities}
                          </p>
                        </div>
                      </div>

                      {/* CENTER: OPERATIONAL SPECS */}
                      <div className="flex flex-wrap items-center gap-6 font-mono text-xs lg:w-4/12 border-t lg:border-t-0 lg:border-l border-[#C6A15B]/20 pt-4 lg:pt-0 lg:pl-6">
                        <div className="space-y-1">
                          <span className="text-[#F6F2E9]/60 uppercase tracking-wider text-[10px] block">AIR FREIGHT</span>
                          <span className="font-bold text-[#C6A15B]">{meta.airTransit}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[#F6F2E9]/60 uppercase tracking-wider text-[10px] block">SEA CARGO</span>
                          <span className="font-bold text-white">{meta.seaTransit}</span>
                        </div>
                      </div>

                      {/* RIGHT: ARROW ACTION */}
                      <div className="flex items-center justify-end lg:w-3/12">
                        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#C6A15B] group-hover:text-white uppercase tracking-wider transition-colors">
                          <span>Explore Corridor</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. PAKISTAN → GLOBAL NETWORK */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-[#1F8A5B]/15 text-[#1F8A5B] font-mono text-xs font-bold uppercase rounded-full inline-block">
                Network Coverage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                Your City ↓ International Destination
              </h2>
              <p className="font-sans text-base text-[#17201B]/75 leading-relaxed">
                Doorstep pickup and origin consolidation across key Pakistani cities for direct linehaul dispatch worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 lg:p-12 rounded-2xl border border-[#12372A]/15 shadow-sm">
              {/* ORIGIN CITIES LIST */}
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-wider block border-b border-[#12372A]/10 pb-2">
                  Verified Pakistan Origins
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {verifiedOrigins.map((city) => (
                    <Link key={city.slug} href={`/locations/${city.slug}`}>
                      <div className="p-3 bg-[#FAF8F3] hover:bg-[#12372A] hover:text-white border border-[#12372A]/15 rounded-xl text-xs font-sans font-bold flex items-center justify-between transition-all group">
                        <span>{city.name}</span>
                        <MapPin className="w-3.5 h-3.5 text-[#1F8A5B] group-hover:text-[#C6A15B]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CENTER MAP ASSET GRAPHIC */}
              <div className="lg:col-span-3 text-center space-y-3">
                <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-[#12372A]/15 shadow-2xs">
                  <Image
                    src="/images/pakistan-map-network.png"
                    alt="Pakistan Export Dispatch Network"
                    fill
                    className="object-cover object-center opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-white font-bold">
                    Direct Linehaul Routes
                  </div>
                </div>
              </div>

              {/* DESTINATIONS LIST */}
              <div className="lg:col-span-4 space-y-4">
                <span className="font-mono text-xs font-bold text-[#12372A] uppercase tracking-wider block border-b border-[#12372A]/10 pb-2">
                  Target Global Corridors
                </span>
                <div className="space-y-2">
                  {destinations.slice(0, 5).map((dest) => (
                    <Link key={dest.slug} href={`/destinations/${dest.slug}`}>
                      <div className="p-3 bg-[#FAF8F3] hover:bg-[#12372A] hover:text-white border border-[#12372A]/15 rounded-xl text-xs font-sans font-bold flex items-center justify-between transition-all group">
                        <span>{dest.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#1F8A5B] group-hover:text-[#C6A15B]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. AIR VS SEA EDITORIAL COMPARISON */}
      <section className="w-full bg-[#17201B] text-white py-20 lg:py-28 border-b border-[#12372A]">
        <Container>
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase rounded-full inline-block">
                Mode Comparison
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F2E9]">
                Air Cargo vs Sea Freight
              </h2>
              <p className="font-sans text-base text-[#F6F2E9]/75">
                Understand operational thresholds before booking your export route.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* AIR PANEL */}
              <div className="p-8 rounded-2xl bg-[#12372A]/60 border-2 border-[#1F8A5B]/40 space-y-6 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1F8A5B]/30 pb-3">
                    <div className="flex items-center gap-3">
                      <Plane className="w-6 h-6 text-[#1F8A5B]" />
                      <h3 className="font-serif text-2xl font-bold text-white">AIR CARGO</h3>
                    </div>
                    <span className="px-3 py-1 bg-[#C6A15B] text-[#17201B] font-mono text-xs font-bold uppercase rounded-full">
                      Express
                    </span>
                  </div>
                  <p className="font-sans text-sm text-[#F6F2E9]/80 leading-relaxed">
                    Fast international air freight capacity for time-critical dispatches, clothing, personal effects, and commercial samples.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">20 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Transit</span>
                      <span className="font-bold text-white">10–15 Days</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/cargo-services#part-1-air-cargo">
                    <span className="font-mono text-xs font-bold text-[#C6A15B] hover:text-white underline">
                      View Operational Air Rates →
                    </span>
                  </Link>
                </div>
              </div>

              {/* SEA PANEL */}
              <div className="p-8 rounded-2xl bg-[#12372A]/60 border-2 border-[#C6A15B]/40 space-y-6 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#C6A15B]/30 pb-3">
                    <div className="flex items-center gap-3">
                      <Ship className="w-6 h-6 text-[#C6A15B]" />
                      <h3 className="font-serif text-2xl font-bold text-white">SEA FREIGHT</h3>
                    </div>
                    <span className="px-3 py-1 bg-[#17201B] border border-[#1F8A5B] text-white font-mono text-xs font-bold uppercase rounded-full">
                      Economical
                    </span>
                  </div>
                  <p className="font-sans text-sm text-[#F6F2E9]/80 leading-relaxed">
                    Economical ocean container shipping (LCL & FCL) for bulk export stock, machinery, and full household relocations.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">70–100 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Transit</span>
                      <span className="font-bold text-white">1.5–2.5 Months</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/cargo-services#part-2-sea-cargo">
                    <span className="font-mono text-xs font-bold text-[#C6A15B] hover:text-white underline">
                      View Operational Sea Rates →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. DESTINATION DIRECTORY */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Market Directory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                Destination Directory
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                Verified international destination markets supported from Pakistan.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#12372A]/15 divide-y divide-[#12372A]/10 shadow-2xs overflow-hidden">
              {destinations.map((dest) => (
                <div
                  key={dest.slug}
                  className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#12372A] hover:text-white transition-all duration-200 group"
                >
                  <div className="space-y-1 md:w-1/2">
                    <div className="font-mono text-xs text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase tracking-wider font-bold transition-colors">
                      {dest.region} Region • {dest.cities?.length || 0} City Hubs
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#17201B] group-hover:text-white transition-colors flex items-center gap-2.5">
                      <Globe className="w-5 h-5 text-[#1F8A5B] group-hover:text-[#C6A15B] shrink-0 transition-colors" />
                      <Link href={`/destinations/${dest.slug}`}>{dest.name}</Link>
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="font-mono text-xs font-bold text-[#12372A] group-hover:text-[#C6A15B] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                    >
                      <span>Corridor Specification</span>
                      <ArrowRight className="w-4 h-4 text-[#1F8A5B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link href={`/quote?destination=${dest.slug}`}>
                      <span className="px-4 py-2 bg-[#FAF8F3] group-hover:bg-[#C6A15B] text-[#17201B] rounded-lg border border-[#12372A]/15 group-hover:border-[#C6A15B] font-mono text-xs font-bold uppercase transition-all shadow-2xs">
                        Quote
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. POPULAR DESTINATION CITIES */}
      {allSubCities.length > 0 && (
        <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
          <Container>
            <div className="space-y-12">
              <div className="max-w-2xl space-y-3">
                <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                  Sub-City Directory
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                  Popular Destination Cities
                </h2>
                <p className="font-sans text-base text-[#17201B]/75">
                  Direct receiving airport terminals and door delivery hubs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSubCities.map((city, idx) => (
                  <Link
                    key={idx}
                    href={`/destinations/${city.countrySlug}/${city.slug}`}
                    className="p-5 bg-[#FAF8F3] hover:bg-[#12372A] hover:text-white border border-[#12372A]/15 rounded-xl space-y-2 transition-all duration-200 group shadow-2xs"
                  >
                    <div className="font-mono text-[10px] font-bold text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase tracking-wider transition-colors">
                      {city.countryName}
                    </div>
                    <div className="font-serif text-lg font-bold text-[#17201B] group-hover:text-white flex items-center justify-between transition-colors">
                      <span>{city.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#1F8A5B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 7. HOW INTERNATIONAL DELIVERY WORKS */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Delivery Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                How International Delivery Works
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                A simple four-step process for international shipping from Pakistan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className="p-6 bg-white rounded-2xl border border-[#12372A]/15 space-y-4 shadow-2xs hover:border-[#C6A15B]/50 transition-all group"
                >
                  <div className="flex items-center justify-between border-b border-[#12372A]/10 pb-3">
                    <span className="font-mono text-3xl font-bold text-[#C6A15B]">{step.num}</span>
                    <span className="font-mono text-[10px] font-bold text-[#1F8A5B] uppercase tracking-widest">
                      Stage {idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#17201B] tracking-tight">{step.title}</h3>
                    <div className="font-mono text-xs font-semibold text-[#1F8A5B]">{step.subtitle}</div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#17201B]/75 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 8. CUSTOMS & SHIPMENT PREPARATION */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="bg-[#FAF8F3] border border-[#12372A]/15 p-8 lg:p-12 rounded-2xl space-y-6 shadow-2xs">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Compliance Guidance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17201B]">
                Customs & Shipment Preparation
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#17201B]/75 leading-relaxed">
                Export customs declarations and packaging specifications for international dispatches departing Pakistan.
              </p>
            </div>

            <p className="font-sans text-base text-[#17201B]/80 leading-relaxed max-w-3xl font-normal">
              Every export dispatch requires compliant commercial documentation, itemized packing lists, and correct consignee contact details to clear Pakistan export customs and destination arrival filing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#12372A]/10 text-xs font-mono text-[#17201B]">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#12372A]/15">
                <FileText className="w-4 h-4 text-[#1F8A5B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-[#17201B] block">Commercial Invoice</span>
                  <span className="font-sans text-slate-600">Itemized description, quantity, and declared value.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#12372A]/15">
                <Package className="w-4 h-4 text-[#1F8A5B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-[#17201B] block">Itemized Packing List</span>
                  <span className="font-sans text-slate-600">Gross/net weights and box dimensions per piece.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#12372A]/15">
                <ShieldCheck className="w-4 h-4 text-[#1F8A5B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-[#17201B] block">Consignee Identity</span>
                  <span className="font-sans text-slate-600">Destination identity or tax ID for customs entry.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#12372A]/10">
              <Link
                href="/guides/export-customs-documentation-guide"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#1F8A5B] hover:text-[#12372A] uppercase tracking-wider underline"
              >
                <span>Read Full Export Customs & Documentation Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container size="narrow">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Destination FAQs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {hubFaqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-white border border-[#12372A]/15 rounded-xl space-y-2 shadow-2xs">
                  <h3 className="font-serif text-lg font-bold text-[#17201B] flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#1F8A5B] shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="font-sans text-sm text-[#17201B]/80 leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 10. FINAL CONVERSION PANEL */}
      <FinalCtaSection
        eyebrow="Target Destination Handoff"
        heading="Know Where Your Cargo Is Going. Now Tell Us What You're Shipping."
        description="Select your target corridor and request an official air or ocean cargo quotation originating from Pakistan."
      />
    </div>
  );
}
