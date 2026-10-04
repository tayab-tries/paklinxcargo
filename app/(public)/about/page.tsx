import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plane,
  Ship,
  Truck,
  FileText,
  Building2,
  Luggage,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Award,
  Users,
  Compass,
  Check,
} from 'lucide-react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { Container } from '@/components/ui/Container';
import { EditorialHero } from '@/components/ui/EditorialHero';
import { siteConfig } from '@/config/site.config';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanityAboutPageData, getSanitySiteSettingsData } from '@/sanity/lib/fetch';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const [sanityAbout, business, sanitySiteSettings] = await Promise.all([
    getSanityAboutPageData(),
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  const brandName = sanitySiteSettings?.businessName || business.brandName || siteConfig.name;

  const title =
    sanityAbout?.seo?.metaTitle ||
    `About ${brandName} | International Cargo & Logistics Services`;
  const description =
    sanityAbout?.seo?.metaDescription ||
    `Learn about ${brandName} Cargo & Logistics Services, providing air freight, sea freight, customs clearance and door-to-door international shipping solutions from Pakistan.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/about`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain}/about`,
      type: 'website',
      images: sanityAbout?.seo?.socialImage ? [{ url: sanityAbout.seo.socialImage }] : undefined,
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17201B] pt-8 pb-3 border-b border-[#12372A]/15 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17201B] pt-8 pb-3 border-b border-[#12372A]/15 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17201B] pt-6 pb-2 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-base sm:text-lg text-[#17201B]/80 leading-relaxed font-normal py-2 mb-4">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 py-2 mb-4 text-base text-[#17201B]/80 font-normal">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 py-2 mb-4 text-base text-[#17201B]/80 font-normal list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5">
        <CheckCircle2 className="w-5 h-5 text-[#1F8A5B] shrink-0 mt-0.5" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-1">
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#1F8A5B] font-semibold underline underline-offset-2 hover:text-[#12372A] transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};

export default async function AboutUsPage() {
  const [sanityAbout, business, sanitySiteSettings] = await Promise.all([
    getSanityAboutPageData(),
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  const brandName = sanitySiteSettings?.businessName || business.brandName || siteConfig.name;
  const activePhone = sanitySiteSettings?.phone || business.phonePrimary || '';
  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || activePhone;

  const quoteWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    `Assalam o Alaikum, I would like to inquire about international shipping with ${brandName}. Please guide me.`
  );

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
  ];

  const heroTitle = sanityAbout?.title || `International Cargo, Built Around the Journey`;
  const heroSubtitle = sanityAbout?.subtitle || `Connecting Pakistan to global trade hubs with editorial precision`;
  const heroIntro =
    sanityAbout?.intro ||
    `${brandName} Cargo & Logistics Services provides air freight, ocean sea cargo, export customs clearance, and integrated door-to-door forwarding for individuals and commercial shippers.`;

  const heroImageUrl = sanityAbout?.heroImage || '/images/hero-freight.jpg';

  const verifiedCities = [
    { name: 'Lahore', href: '/locations/lahore' },
    { name: 'Karachi', href: '/locations/karachi' },
    { name: 'Islamabad', href: '/locations/islamabad' },
    { name: 'Rawalpindi', href: '/locations/rawalpindi' },
    { name: 'Faisalabad', href: '/locations/faisalabad' },
    { name: 'Sialkot', href: '/locations/sialkot' },
    { name: 'Multan', href: '/locations/multan' },
    { name: 'Peshawar', href: '/locations/peshawar' },
  ];

  const valuePillars = [
    {
      num: '01',
      title: 'Customer-Focused Advisory',
      desc: 'We inspect cargo dimensions, urgency, and destination regulations before recommending an optimal air or sea mode.',
      icon: Users,
    },
    {
      num: '02',
      title: 'Direct Airline & Sea Carrier Access',
      desc: 'Capacity allocations across major airline networks and sea container lines operating out of Pakistan.',
      icon: Plane,
    },
    {
      num: '03',
      title: 'Transparent Freight Quotation',
      desc: 'Clear weight qualifications, transit guidance, and line-item disclosures so you understand your shipping investment.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Worldwide Network Reach',
      desc: 'End-to-end dispatch from major Pakistani commercial hubs to North America, Europe, Middle East, and Asia-Pacific.',
      icon: Award,
    },
  ];

  const trustRegistrations = [
    'FBR (Federal Board of Revenue)',
    'IAM (International Association of Movers, USA)',
    'MOVERS P.O.E',
    'FIDI GLOBAL ALLIANCE',
    'CANADIAN ASSOCIATION OF MOVERS (CAM)',
  ];

  const commitments = [
    'Transparent line-item quotation',
    'Practical air & sea shipping advice',
    'Professional customs export handling',
    'Verified origin pickup coordination',
    'Responsive customer support throughout transit',
    'Responsible cargo safety & packaging standards',
  ];

  return (
    <div className="w-full bg-[#FAF8F3] text-[#17201B] font-sans antialiased selection:bg-[#C6A15B]/30">
      {/* 1. EDITORIAL HERO */}
      <EditorialHero
        breadcrumbs={breadcrumbs}
        eyebrow="Corporate Profile"
        title={heroTitle}
        subtitle={heroSubtitle}
        description={heroIntro}
        primaryCta={{ label: 'Request Shipping Quote', href: '/quote' }}
        secondaryCta={{
          label: 'WhatsApp Logistics Desk',
          href: quoteWhatsappUrl,
          icon: <MessageSquare className="w-4 h-4 text-[#C6A15B] shrink-0" />,
        }}
        imageSrc={heroImageUrl}
        imageAlt={`About ${brandName}`}
        imageBadgeText="Global Cargo Operations"
      />

      {/* 2. EDITORIAL BRAND STATEMENT ON WARM CREAM */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container size="narrow">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-[#1F8A5B]/10 border border-[#1F8A5B]/20 font-mono text-xs font-bold uppercase tracking-widest text-[#1F8A5B] rounded-full">
              Our Operational Mandate
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] leading-tight">
              &ldquo;Making international cargo transparent, reliable, and accessible for everyone in Pakistan.&rdquo;
            </h2>

            <div className="w-24 h-0.5 bg-[#C6A15B] mx-auto opacity-70" />

            <p className="font-sans text-base sm:text-lg text-[#17201B]/80 leading-relaxed max-w-2xl mx-auto">
              {brandName} connects individuals, expatriate families, traders, and commercial enterprises in Pakistan with international freight corridors worldwide through air cargo and ocean container logistics.
            </p>
          </div>
        </Container>
      </section>

      {/* 3. ASYMMETRICAL COMPANY STORY */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT PHOTO ANCHOR */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/30 shadow-2xl bg-[#17201B] group">
                <div className="aspect-[4/5] relative w-full overflow-hidden">
                  <Image
                    src="/images/service-door.jpg"
                    alt={`${brandName} Cargo Operations`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 bg-[#17201B] border-t border-[#C6A15B]/20 text-xs font-mono text-[#F6F2E9]/80 flex justify-between items-center">
                  <span className="text-[#C6A15B] font-bold uppercase tracking-wider">End-to-End Coordination</span>
                  <span>Pakistan Origin</span>
                </div>
              </div>
            </div>

            {/* RIGHT EDITORIAL STORY */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest block">
                Company Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B] leading-tight">
                Designed for Complex Global Journeys
              </h2>

              {sanityAbout?.body && sanityAbout.body.length > 0 ? (
                <div className="prose prose-slate max-w-none">
                  <PortableText value={sanityAbout.body} components={portableTextComponents} />
                </div>
              ) : (
                <div className="space-y-4 text-base text-[#17201B]/80 leading-relaxed">
                  <p>
                    International logistics involves complex stages—from domestic origin pickup and protective export packaging to customs documentation, carrier booking, and final destination clearance.
                  </p>
                  <p>
                    At {brandName}, we coordinate these stages to deliver a seamless experience. We work with individuals relocating household items, travelers with excess baggage, and commercial exporters moving regular air and sea shipments.
                  </p>
                  <p>
                    Instead of a generic standard service, we evaluate your cargo specifications, timeline requirements, and budget constraints to structure the optimal route.
                  </p>
                </div>
              )}

              {/* MISSION HIGHLIGHT */}
              <div className="mt-8 p-6 bg-[#12372A] rounded-xl border border-[#C6A15B]/30 text-[#F6F2E9] space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-[#C6A15B]" />
                  <span>Mission & Vision</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Clear Information, Proper Execution
                </h3>
                <p className="text-sm text-[#F6F2E9]/85 leading-relaxed font-sans">
                  Our mission is to eliminate ambiguity from international shipping. We focus on providing upfront indicative rate guidance, honest transit expectations, and dedicated operational support.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. MISSION & VALUES — EDITORIAL HEADING & SPACED PILLARS */}
      <section className="w-full bg-[#17201B] text-white py-20 lg:py-28 border-b border-[#12372A]">
        <Container>
          <div className="space-y-16">
            <div className="max-w-3xl space-y-4">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block">
                Core Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6F2E9]">
                Principles That Guide Every Dispatch
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#F6F2E9]/75 leading-relaxed">
                Operational rigor and editorial transparency across all cargo operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {valuePillars.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.num}
                    className="p-8 rounded-xl bg-[#12372A]/50 border border-[#1F8A5B]/30 space-y-4 hover:border-[#C6A15B]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#C6A15B]">{item.num}</span>
                      <div className="w-10 h-10 rounded-lg bg-[#1F8A5B]/20 flex items-center justify-center text-[#1F8A5B]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                    <p className="font-sans text-sm sm:text-base text-[#F6F2E9]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. WHAT WE HANDLE — EDITORIAL COMPOSITION */}
      <section className="w-full bg-[#FAF8F3] py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Service Scope
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                What We Handle
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                Comprehensive international shipping options for diverse cargo requirements.
              </p>
            </div>

            {/* FEATURED CAPABILITY + EDITORIAL LIST */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* FEATURED: AIR & SEA CORE */}
              <div className="lg:col-span-6 bg-[#12372A] text-white rounded-2xl p-8 lg:p-10 border border-[#C6A15B]/30 flex flex-col justify-between shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] font-mono text-xs font-bold uppercase rounded-full">
                      Core Freight Modes
                    </span>
                    <div className="flex items-center gap-2 text-[#C6A15B]">
                      <Plane className="w-5 h-5" />
                      <Ship className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Air & Sea Cargo Dispatch
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#F6F2E9]/85 leading-relaxed">
                    From express scheduled airline bookings starting at 20 KG to economical ocean container shipping (LCL/FCL) starting at 70–100 KG, we coordinate direct export dispatches from Pakistan to major world ports.
                  </p>
                </div>
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href="/cargo-services"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#C6A15B] hover:text-white uppercase tracking-wider transition-colors"
                  >
                    <span>View Operational Rates</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* SECONDARY LIST */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-xl border border-[#12372A]/15 space-y-3 shadow-2xs hover:border-[#1F8A5B]/40 transition-colors">
                  <div className="w-8 h-8 rounded-md bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#17201B]">Door-to-Door Delivery</h4>
                  <p className="font-sans text-xs text-[#17201B]/70 leading-relaxed">
                    Integrated origin pickup in Pakistan with customs handling and doorstep delivery overseas.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-[#12372A]/15 space-y-3 shadow-2xs hover:border-[#1F8A5B]/40 transition-colors">
                  <div className="w-8 h-8 rounded-md bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#17201B]">Customs Clearance</h4>
                  <p className="font-sans text-xs text-[#17201B]/70 leading-relaxed">
                    Export declaration, packing list compilation, and regulatory guidance for smooth dispatches.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-[#12372A]/15 space-y-3 shadow-2xs hover:border-[#1F8A5B]/40 transition-colors">
                  <div className="w-8 h-8 rounded-md bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                    <Luggage className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#17201B]">Excess Baggage</h4>
                  <p className="font-sans text-xs text-[#17201B]/70 leading-relaxed">
                    Personal effects, relocation suitcases, and household goods shipping for individuals.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-[#12372A]/15 space-y-3 shadow-2xs hover:border-[#1F8A5B]/40 transition-colors">
                  <div className="w-8 h-8 rounded-md bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#17201B]">Commercial Cargo</h4>
                  <p className="font-sans text-xs text-[#17201B]/70 leading-relaxed">
                    B2B trade goods, textile exports, commercial samples, and bulk merchandise forwarding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. PAKISTAN NETWORK */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest block">
                Origin Coverage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                Primary Pakistan Pickup Hubs
              </h2>
              <p className="font-sans text-base text-[#17201B]/80 leading-relaxed">
                We arrange origin cargo pickup and dispatch consolidation across key commercial, industrial, and residential hubs in Pakistan.
              </p>
              <div className="pt-2">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#12372A] hover:text-[#1F8A5B] uppercase tracking-wider underline"
                >
                  <span>Explore Location Hubs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {verifiedCities.map((city) => (
                <Link key={city.name} href={city.href}>
                  <div className="p-4 bg-white border border-[#12372A]/15 rounded-xl hover:bg-[#12372A] hover:text-white transition-all text-center space-y-2 group shadow-2xs">
                    <MapPin className="w-5 h-5 text-[#1F8A5B] group-hover:text-[#C6A15B] mx-auto transition-colors" />
                    <span className="font-sans text-sm font-bold block">{city.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. INDIVIDUAL + COMMERCIAL SPLIT PANELS */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* INDIVIDUAL PANEL */}
            <div className="p-8 lg:p-12 rounded-2xl bg-[#F6F2E9] border border-[#12372A]/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[#1F8A5B]/15 text-[#1F8A5B] font-mono text-xs font-bold uppercase rounded-full inline-block">
                  Personal Shipping
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17201B]">
                  For Individuals & Families
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#17201B]/80 leading-relaxed">
                  Moving overseas or sending gifts and personal effects to family abroad. We guide you through weight minimums, allowable items, and protective packaging requirements.
                </p>
              </div>
              <div className="pt-6 border-t border-[#12372A]/15">
                <Link
                  href="/services/excess-baggage"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#12372A] hover:text-[#1F8A5B] uppercase tracking-wider"
                >
                  <span>Explore Personal Baggage Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* COMMERCIAL PANEL */}
            <div className="p-8 lg:p-12 rounded-2xl bg-[#17201B] text-white border border-[#C6A15B]/30 space-y-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] font-mono text-xs font-bold uppercase rounded-full inline-block">
                  B2B Trade Solutions
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  For Commercial Shippers
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#F6F2E9]/80 leading-relaxed">
                  Dependable freight solutions for businesses exporting manufactured goods, garments, and commercial merchandise from Pakistan to international buyers and warehouses.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/services/commercial-cargo"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#C6A15B] hover:text-white uppercase tracking-wider"
                >
                  <span>Explore Commercial Cargo Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. TRUST / COMMITMENT — VERIFIED REGISTRATIONS */}
      <section className="w-full bg-[#F6F2E9] py-16 lg:py-24 border-b border-[#12372A]/10">
        <Container size="narrow">
          <div className="space-y-8 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Verified Compliance & Registration
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17201B]">
                Industry Registrations & Trust
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {trustRegistrations.map((reg) => (
                <span
                  key={reg}
                  className="px-4 py-2 bg-white border border-[#12372A]/15 rounded-lg text-xs font-mono font-bold text-[#12372A] shadow-2xs"
                >
                  {reg}
                </span>
              ))}
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {commitments.map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs font-sans text-[#17201B]/80 bg-white/60 p-3 rounded-lg border border-[#12372A]/10">
                  <Check className="w-4 h-4 text-[#1F8A5B] shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 9. FINAL CTA */}
      <section className="w-full bg-[#12372A] text-white py-20 lg:py-28">
        <Container size="narrow">
          <div className="bg-[#17201B] border border-[#C6A15B]/30 rounded-2xl p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] font-mono text-xs font-bold uppercase tracking-wider rounded-full inline-block">
              Start Your Shipment
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6F2E9] tracking-tight">
              Ready to Send Cargo from Pakistan?
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#F6F2E9]/80 max-w-xl mx-auto leading-relaxed">
              Tell us about your cargo weight, origin city, and destination. Our team will structure a transparent air or sea quote for your journey.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quote" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto h-13 px-8 bg-[#C6A15B] hover:bg-[#b5924e] text-[#17201B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#C6A15B] cursor-pointer"
                >
                  <span>Request Shipping Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto h-13 px-7 bg-transparent hover:bg-white/10 text-[#F6F2E9] font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-[#1F8A5B] text-[#1F8A5B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#1F8A5B] fill-current" />
                  <span>WhatsApp Us</span>
                </button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
