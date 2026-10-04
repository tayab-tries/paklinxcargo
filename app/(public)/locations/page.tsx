import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Plane,
  Ship,
  HelpCircle,
  Package,
  FileText,
  Truck,
  Boxes,
  Briefcase,
  Home as HomeIcon,
  Shirt,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EditorialHero } from '@/components/ui/EditorialHero';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Cargo Shipping Pickup Locations Across Pakistan | ${siteConfig.name}`,
  description:
    'Doorstep international cargo collection and origin freight hubs operating across major cities in Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Sialkot, Multan, and Peshawar.',
  alternates: {
    canonical: `${siteConfig.domain}/locations`,
  },
  openGraph: {
    title: `Pakistan International Cargo Pickup Locations | ${siteConfig.name}`,
    description:
      'Doorstep cargo pickup and export dispatch operating across primary commercial hubs in Pakistan to worldwide destinations.',
    url: `${siteConfig.domain}/locations`,
    type: 'website',
  },
};

const VERIFIED_PICKUP_CITIES = [
  {
    num: '01',
    name: 'Lahore',
    slug: 'lahore',
    province: 'Punjab',
    description: 'Central origin hub serving Lahore district, Gulberg, DHA, Johar Town, and industrial export zones.',
  },
  {
    num: '02',
    name: 'Karachi',
    slug: 'karachi',
    province: 'Sindh',
    description: 'Port city cargo collection hub connecting Sindh commercial centers to air and ocean freight routes.',
  },
  {
    num: '03',
    name: 'Islamabad',
    slug: 'islamabad',
    province: 'Capital Territory',
    description: 'Capital dispatch desk coordinating cargo collection across Islamabad sectors and diplomatic corridors.',
  },
  {
    num: '04',
    name: 'Rawalpindi',
    slug: 'rawalpindi',
    province: 'Punjab',
    description: 'Twin city origin hub providing doorstep cargo collection across Rawalpindi commercial districts.',
  },
  {
    num: '05',
    name: 'Faisalabad',
    slug: 'faisalabad',
    province: 'Punjab',
    description: 'Textile export hub specializing in commercial garment, fabric, and industrial cargo collection.',
  },
  {
    num: '06',
    name: 'Sialkot',
    slug: 'sialkot',
    province: 'Punjab',
    description: 'Export manufacturing hub supporting sports goods, surgical instruments, and leather cargo dispatches.',
  },
  {
    num: '07',
    name: 'Multan',
    slug: 'multan',
    province: 'Punjab',
    description: 'Southern Punjab origin center connecting agricultural, commercial, and personal baggage dispatches.',
  },
  {
    num: '08',
    name: 'Peshawar',
    slug: 'peshawar',
    province: 'Khyber Pakhtunkhwa',
    description: 'KPK regional dispatch hub coordinating doorstep collection and export processing for northern shippers.',
  },
  {
    num: '09',
    name: 'Gujranwala',
    slug: 'gujranwala',
    province: 'Punjab',
    description: 'Industrial and manufacturing corridor cargo pickup coordinating export dispatches and doorstep collection across Gujranwala district.',
  },
];

const pickupWorkflowSteps = [
  {
    num: '01',
    title: 'REQUEST',
    subtitle: 'Shipment Specification',
    description: "Tell us what you're shipping and your pickup location in Pakistan.",
  },
  {
    num: '02',
    title: 'PICKUP',
    subtitle: 'Doorstep Collection',
    description: 'Arrange collection from your home, warehouse, or business premises in your city.',
  },
  {
    num: '03',
    title: 'EXPORT',
    subtitle: 'Preparation & Customs',
    description: 'Cargo is verified for gross weight, itemized packing lists, and export customs documentation.',
  },
  {
    num: '04',
    title: 'TRANSIT',
    subtitle: 'International Delivery',
    description: 'Cargo moves by the selected international air or ocean shipping mode toward its destination.',
  },
];

const cargoCollectibles = [
  {
    title: 'Household Goods',
    description: 'Relocation furniture, kitchenware, bedding, and home belongings.',
    href: '/services/excess-baggage',
    icon: HomeIcon,
  },
  {
    title: 'Personal Belongings',
    description: 'Personal suitcases, clothing, books, and family care packages.',
    href: '/services/excess-baggage',
    icon: Boxes,
  },
  {
    title: 'Excess Baggage',
    description: 'Unaccompanied airline luggage and travel bags exceeding baggage limits.',
    href: '/services/excess-baggage',
    icon: Package,
  },
  {
    title: 'Commercial Cargo',
    description: 'B2B export merchandise, finished products, and commercial stock.',
    href: '/services/commercial-cargo',
    icon: Briefcase,
  },
  {
    title: 'Machinery & Tools',
    description: 'Industrial spare parts, equipment, and heavy machinery consignments.',
    href: '/services/commercial-cargo',
    icon: Truck,
  },
  {
    title: 'Furniture & Decor',
    description: 'Packed wooden furniture, handicrafts, and home decor items.',
    href: '/cargo-services#part-2-sea-cargo',
    icon: HomeIcon,
  },
  {
    title: 'Textiles & Garments',
    description: 'Export garments, fabric rolls, bedding, and apparel samples.',
    href: '/services/commercial-cargo',
    icon: Shirt,
  },
  {
    title: 'Export Documents',
    description: 'Customs paperwork, invoices, and packing manifests assistance.',
    href: '/guides/export-customs-documentation-guide',
    icon: FileText,
  },
];

const illustrativeCorridors = [
  { origin: 'LAHORE', dest: 'UNITED KINGDOM', code: 'UK', href: '/destinations/uk' },
  { origin: 'KARACHI', dest: 'UNITED ARAB EMIRATES', code: 'UAE', href: '/destinations/uae' },
  { origin: 'ISLAMABAD', dest: 'UNITED STATES', code: 'USA', href: '/destinations/usa' },
  { origin: 'RAWALPINDI', dest: 'CANADA', code: 'CAN', href: '/destinations/canada' },
  { origin: 'FAISALABAD', dest: 'SAUDI ARABIA', code: 'KSA', href: '/destinations/saudi-arabia' },
];

export default function LocationsHubPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
  ];

  const hubFaqs = [
    {
      question: 'Which cities in Pakistan can I arrange cargo pickup from?',
      answer: 'Doorstep collection and export handling operate across major Pakistan cities including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Sialkot, Multan, and Peshawar.',
    },
    {
      question: 'How do I schedule doorstep cargo pickup?',
      answer: 'You can submit your pickup city, estimated cargo weight, and destination via our online quote form or WhatsApp. Our logistics desk will then coordinate collection from your address.',
    },
    {
      question: 'Are both Air and Sea cargo available from all pickup cities?',
      answer: 'Yes. Shipments collected from any receiving city in Pakistan are transferred into our linehaul network for express Air Cargo (minimum 20 KG) or ocean Sea Freight (minimum 70–100 KG) dispatches.',
    },
    {
      question: 'What documents do I need to prepare before pickup?',
      answer: 'Standard requirements include an itemized packing list, commercial invoice (if commercial cargo), sender CNIC copy, and consignee contact details at destination.',
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

  return (
    <div className="w-full bg-[#FAF8F3] text-[#17201B] font-sans antialiased selection:bg-[#C6A15B]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. EDITORIAL HERO — YOUR CARGO STARTS HERE */}
      <EditorialHero
        breadcrumbs={breadcrumbs}
        eyebrow="PICKUP ACROSS PAKISTAN"
        title="Your cargo starts here."
        subtitle="Doorstep collection and origin receiving across major cities in Pakistan, connecting into express international air freight and ocean sea cargo corridors."
        description="Arrange collection from your home, warehouse, or commercial premises in Pakistan for seamless dispatch worldwide."
        primaryCta={{ label: 'Request a Quote', href: '/quote' }}
        secondaryCta={{
          label: 'Explore Pickup Cities',
          href: '#pickup-cities',
        }}
        imageSrc="/images/hero-freight.jpg"
        imageAlt="Pakistan International Cargo Collection and Dispatch"
        imageBadgeText="Pakistan Pickup Directory"
      />

      {/* 2. PAKISTAN LOGISTICS NETWORK SHOWCASE */}
      <section className="w-full bg-[#12372A] py-20 lg:py-28 border-b border-[#C6A15B]/30 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* NETWORK MAP EDITORIAL CENTERPIECE */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/30 shadow-2xl bg-[#17201B] group">
                <div className="aspect-[4/3] relative w-full overflow-hidden">
                  <Image
                    src="/images/pakistan-map-network.png"
                    alt="Pakistan Logistics Receiving Network Map"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17201B] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-5 bg-[#17201B] border-t border-[#C6A15B]/20 flex justify-between items-center text-xs font-mono">
                  <span className="text-[#C6A15B] font-bold uppercase">Origin Receiving Hubs</span>
                  <span className="text-white/80">8 Primary Pakistan Cities</span>
                </div>
              </div>
            </div>

            {/* JOURNEY PIPELINE COPY */}
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase rounded-full inline-block">
                Structured Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F2E9] leading-tight">
                From Pakistan Origin to Worldwide Delivery
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#F6F2E9]/80 leading-relaxed">
                Whether shipping personal effects or commercial export goods, your cargo moves through a clear, transparent pipeline.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs text-[#F6F2E9]">
                <div className="p-4 bg-[#17201B] rounded-xl border border-[#C6A15B]/20 space-y-1">
                  <span className="text-[#C6A15B] font-bold block uppercase text-[10px]">01 ORIGIN</span>
                  <span className="font-bold text-white block">FROM PAKISTAN</span>
                </div>
                <div className="p-4 bg-[#17201B] rounded-xl border border-[#C6A15B]/20 space-y-1">
                  <span className="text-[#C6A15B] font-bold block uppercase text-[10px]">02 COLLECTION</span>
                  <span className="font-bold text-white block">DOORSTEP PICKUP</span>
                </div>
                <div className="p-4 bg-[#17201B] rounded-xl border border-[#C6A15B]/20 space-y-1">
                  <span className="text-[#C6A15B] font-bold block uppercase text-[10px]">03 LINEHAUL</span>
                  <span className="font-bold text-white block">EXPORT TRANSIT</span>
                </div>
                <div className="p-4 bg-[#17201B] rounded-xl border border-[#C6A15B]/20 space-y-1">
                  <span className="text-[#C6A15B] font-bold block uppercase text-[10px]">04 HANDOFF</span>
                  <span className="font-bold text-white block">DESTINATION DOOR</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MAJOR PICKUP CITIES — TYPOGRAPHIC DIRECTORY ROWS */}
      <section id="pickup-cities" className="scroll-mt-24 w-full bg-[#FAF8F3] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#12372A]/15 pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                  Receiving Network
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                  Major Pakistan Pickup Cities
                </h2>
              </div>
              <div className="font-mono text-xs text-[#1F8A5B] font-bold tracking-wider uppercase">
                8 Verified Origin Hubs
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#12372A]/15 divide-y divide-[#12372A]/10 shadow-2xs overflow-hidden">
              {VERIFIED_PICKUP_CITIES.map((city) => (
                <Link key={city.slug} href={`/locations/${city.slug}`}>
                  <div className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#12372A] hover:text-white transition-all duration-200 group">
                    {/* NUM + CITY NAME */}
                    <div className="flex items-center gap-6 md:w-5/12">
                      <span className="font-mono text-2xl lg:text-3xl font-extrabold text-[#C6A15B] opacity-80 group-hover:opacity-100 shrink-0">
                        {city.num}
                      </span>
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] font-bold text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase tracking-wider block transition-colors">
                          {city.province} Province
                        </span>
                        <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#17201B] group-hover:text-white transition-colors">
                          {city.name.toUpperCase()}
                        </h3>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="md:w-5/12">
                      <p className="font-sans text-xs sm:text-sm text-[#17201B]/75 group-hover:text-[#F6F2E9]/80 leading-relaxed font-normal transition-colors">
                        {city.description}
                      </p>
                    </div>

                    {/* ACTION ARROW */}
                    <div className="flex items-center justify-end md:w-2/12">
                      <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#12372A] group-hover:text-[#C6A15B] uppercase tracking-wider transition-colors">
                        <span>Pickup Details</span>
                        <ArrowRight className="w-4 h-4 text-[#1F8A5B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. HOW PICKUP WORKS */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Operational Steps
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                How Pickup Works
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                Simple, transparent collection pipeline from your door to international departure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pickupWorkflowSteps.map((step, idx) => (
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

      {/* 5. WHAT WE CAN COLLECT */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Acceptable Cargo
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                What We Can Collect
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                Supported commodity categories for origin pickup across Pakistan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cargoCollectibles.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <Link key={idx} href={item.href}>
                    <div className="p-6 bg-[#FAF8F3] border border-[#12372A]/15 rounded-2xl space-y-3 hover:border-[#1F8A5B] hover:bg-[#12372A] hover:text-white transition-all duration-200 group h-full flex flex-col justify-between shadow-2xs">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-[#12372A]/10 group-hover:bg-white/10 flex items-center justify-center text-[#1F8A5B] group-hover:text-[#C6A15B] transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#17201B] group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-sans text-xs text-[#17201B]/75 group-hover:text-[#F6F2E9]/80 leading-relaxed font-normal transition-colors">
                          {item.description}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#12372A] group-hover:text-[#C6A15B] uppercase tracking-wider transition-colors">
                        <span>View Specification</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. FROM YOUR CITY TO THE WORLD */}
      <section className="w-full bg-[#FAF8F3] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Trade Corridors
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                From Your City to the World
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                Illustrative trade route examples linking Pakistan pickup origins to global destinations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {illustrativeCorridors.map((c) => (
                <Link key={c.code} href={c.href}>
                  <div className="p-6 bg-white border border-[#12372A]/15 rounded-2xl space-y-3 hover:bg-[#12372A] hover:text-white transition-all duration-200 group text-center shadow-2xs">
                    <span className="font-mono text-2xl font-extrabold text-[#C6A15B] block">
                      {c.code}
                    </span>
                    <div className="font-serif font-bold text-sm text-[#17201B] group-hover:text-white transition-colors">
                      {c.origin} → {c.dest}
                    </div>
                    <span className="font-mono text-[10px] text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase font-bold tracking-wider block transition-colors">
                      Explore Route →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. AIR CARGO VS SEA FREIGHT */}
      <section className="w-full bg-[#17201B] text-white py-20 lg:py-28 border-b border-[#12372A]">
        <Container>
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase rounded-full inline-block">
                Mode Selection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F2E9]">
                Air Cargo vs Sea Freight
              </h2>
              <p className="font-sans text-base text-[#F6F2E9]/75">
                Compare weight minimums and transit timelines before booking collection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-2xl bg-[#12372A]/60 border-2 border-[#1F8A5B]/40 space-y-6 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1F8A5B]/30 pb-3">
                    <div className="flex items-center gap-3">
                      <Plane className="w-6 h-6 text-[#1F8A5B]" />
                      <h3 className="font-serif text-2xl font-bold text-white">AIR CARGO</h3>
                    </div>
                    <span className="px-3 py-1 bg-[#C6A15B] text-[#17201B] font-mono text-xs font-bold uppercase rounded-full">
                      20 KG MIN
                    </span>
                  </div>
                  <p className="font-sans text-sm text-[#F6F2E9]/80 leading-relaxed">
                    Fast international air freight capacity for urgent dispatches, garments, and personal effects.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">20 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Air Transit</span>
                      <span className="font-bold text-white">10–15 Days</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/cargo-services#part-1-air-cargo">
                    <span className="font-mono text-xs font-bold text-[#C6A15B] hover:text-white underline">
                      View Air Cargo Rates →
                    </span>
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#12372A]/60 border-2 border-[#C6A15B]/40 space-y-6 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#C6A15B]/30 pb-3">
                    <div className="flex items-center gap-3">
                      <Ship className="w-6 h-6 text-[#C6A15B]" />
                      <h3 className="font-serif text-2xl font-bold text-white">SEA FREIGHT</h3>
                    </div>
                    <span className="px-3 py-1 bg-[#17201B] border border-[#1F8A5B] text-white font-mono text-xs font-bold uppercase rounded-full">
                      70–100 KG MIN
                    </span>
                  </div>
                  <p className="font-sans text-sm text-[#F6F2E9]/80 leading-relaxed">
                    Economical ocean container freight (LCL & FCL) for bulk export stock, machinery, and household moves.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">70–100 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Ocean Transit</span>
                      <span className="font-bold text-white">1.5–2.5 Months</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/cargo-services#part-2-sea-cargo">
                    <span className="font-mono text-xs font-bold text-[#C6A15B] hover:text-white underline">
                      View Sea Cargo Rates →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <p className="font-mono text-xs text-[#F6F2E9]/60 text-center italic">
              * Actual sea freight rates depend on volume/weight ratio, port charges, shipping lines, fuel surcharges, and destination entry fees.
            </p>
          </div>
        </Container>
      </section>

      {/* 8. COMPLETE ORIGIN CITY DIRECTORY */}
      <section className="w-full bg-[#FAF8F3] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container>
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Searchable Directory
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17201B]">
                Origin City Directory
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VERIFIED_PICKUP_CITIES.map((c) => (
                <Link key={c.slug} href={`/locations/${c.slug}`}>
                  <div className="p-4 bg-white border border-[#12372A]/15 rounded-xl hover:bg-[#12372A] hover:text-white transition-all text-center space-y-1 group shadow-2xs">
                    <span className="font-sans font-bold text-sm block">{c.name}</span>
                    <span className="font-mono text-[10px] text-[#1F8A5B] group-hover:text-[#C6A15B] uppercase block">
                      {c.province}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
        <Container size="narrow">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Origin FAQs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {hubFaqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-[#FAF8F3] border border-[#12372A]/15 rounded-xl space-y-2">
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
        eyebrow="Tell Us Where Your Cargo Starts"
        heading="Ready to Arrange Pickup Across Pakistan?"
        description="Select your origin city in Pakistan and destination market to receive a transparent air or ocean freight quote."
      />
    </div>
  );
}
