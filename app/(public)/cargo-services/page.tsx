import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  Info,
  Scale,
  DollarSign,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EditorialHero } from '@/components/ui/EditorialHero';
import { OperationalDataPanel } from '@/components/ui/OperationalDataPanel';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { siteConfig } from '@/config/site.config';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import {
  getSanitySiteSettingsData,
  getSanityCargoPricingData,
  SanityCargoRateItem,
} from '@/sanity/lib/fetch';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const sanityCargoPricing = await getSanityCargoPricingData({ stega: false });

  const title =
    sanityCargoPricing?.seo?.metaTitle ||
    `Air & Sea Cargo Rates & Services from Pakistan | ${siteConfig.name}`;
  const description =
    sanityCargoPricing?.seo?.metaDescription ||
    'Explore indicative air and sea cargo rates per KG, minimum weights, and transit times from Pakistan worldwide.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/cargo-services`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain}/cargo-services`,
      type: 'website',
      images: sanityCargoPricing?.seo?.socialImage ? [{ url: sanityCargoPricing.seo.socialImage }] : [],
    },
  };
}

export default async function CargoServicesPage() {
  const [business, sanitySiteSettings, sanityCargoPricing] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
    getSanityCargoPricingData(),
  ]);

  const activePhone = sanitySiteSettings?.phone || business.phonePrimary || '';
  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || activePhone;

  const quoteWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I would like to inquire about Air & Sea Cargo rates from Pakistan. Please provide a quote.'
  );

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: 'Cargo Rates & Services', url: '/cargo-services' },
  ];

  // 1. HERO SECTION & BADGES
  const heroEyebrow = sanityCargoPricing?.hero?.eyebrow || 'Operational Cargo Rates';
  const heroHeading = sanityCargoPricing?.hero?.heading || 'Air & Sea Cargo Rates & Transit';
  const heroSubheading =
    sanityCargoPricing?.hero?.subheading ||
    'Indicative rates per KG, weight minimums, and transit guidance for air freight and ocean sea cargo dispatches from Pakistan.';
  const heroIntro =
    sanityCargoPricing?.hero?.introParagraph ||
    'We provide transparent operational guidance for individuals and commercial exporters moving freight from Pakistan to global corridors.';

  // 2. AIR CARGO RATES & TIMELINES
  const fallbackAirCargoRates: SanityCargoRateItem[] = [
    { country: 'USA', flag: '🇺🇸', rate: 'PKR 2,750 – 2,950/kg', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'United Kingdom', flag: '🇬🇧', rate: 'PKR 1,750 – 1,850/kg', deliveryTime: '10–12 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'UAE / Dubai', flag: '🇦🇪', rate: 'PKR 1,350 – 1,450/kg', deliveryTime: '10–17 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Canada', flag: '🇨🇦', rate: 'PKR 2,850 – 2,950/kg', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Saudi Arabia', flag: '🇸🇦', rate: 'PKR 2,150 – 2,250/kg', deliveryTime: '10–20 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Europe', flag: '🇪🇺', rate: 'PKR 2,350 – 2,450/kg', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Australia', flag: '🇦🇺', rate: 'PKR 2,350 – 2,450/kg', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rate: 'PKR 2,350 – 2,450/kg', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
  ];
  const airCargoRates = sanityCargoPricing?.airCargoSection?.rates?.length
    ? sanityCargoPricing.airCargoSection.rates
    : fallbackAirCargoRates;

  // 3. SEA CARGO RATES & TIMELINES
  const fallbackSeaCargoRates: SanityCargoRateItem[] = [
    { country: 'UAE', flag: '🇦🇪', rate: 'PKR 600 – 700/kg', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'United Kingdom', flag: '🇬🇧', rate: 'PKR 950 – 1,000/kg', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Saudi Arabia', flag: '🇸🇦', rate: 'PKR 950 – 1,000/kg', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rate: 'PKR 1,250/kg', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Germany', flag: '🇩🇪', rate: 'PKR 1,450/kg', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Australia', flag: '🇦🇺', rate: 'PKR 1,450/kg', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Europe', flag: '🇪🇺', rate: 'PKR 1,450/kg', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'USA', flag: '🇺🇸', rate: 'PKR 1,550 – 1,650/kg', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Canada', flag: '🇨🇦', rate: 'PKR 1,750 – 1,850/kg', deliveryTime: '2 – 3 Months', quoteHref: '/quote?service=sea-cargo' },
  ];
  const seaCargoRates = sanityCargoPricing?.seaCargoSection?.rates?.length
    ? sanityCargoPricing.seaCargoSection.rates
    : fallbackSeaCargoRates;

  const seaDisclaimer =
    sanityCargoPricing?.seaCargoSection?.disclaimer ||
    'Rate Qualification: Rates shown above are indicative and subject to volume/weight ratio, port charges, shipping lines, fuel surcharges, and destination customs requirements. Final binding pricing is determined upon official quotation.';

  // 4. FAQS
  const fallbackFaqs = [
    {
      question: 'What is the minimum weight for air cargo?',
      answer: 'Our minimum air cargo shipment weight is 20 kg. Rates are calculated based on gross vs volumetric weight.',
    },
    {
      question: 'What is the minimum weight for sea cargo?',
      answer: 'Our minimum sea cargo requirement is 70–100 kg, depending on destination port, shipment type (LCL), and service route.',
    },
    {
      question: 'Are the rates on this page guaranteed prices?',
      answer: 'No. Rates displayed are indicative averages per KG. Final quotes depend on exact dimensions, origin pickup location, carrier fuel surcharges, and destination port fees.',
    },
    {
      question: 'What factors affect my final shipping quote?',
      answer: 'Final quotes depend on shipment gross weight, volumetric dimensions (L x W x H), commodity type, origin city in Pakistan, ocean/air carrier rates, customs documentation needs, and doorstep delivery selection.',
    },
    {
      question: 'How long does sea freight take to Canada?',
      answer: 'Indicative sea freight transit from Karachi to major Canadian ports (Vancouver, Montreal, Toronto via rail) is typically 2 to 3 months.',
    },
  ];
  const faqs = sanityCargoPricing?.faqs?.length ? sanityCargoPricing.faqs : fallbackFaqs;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
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

      {/* 1. EDITORIAL HERO */}
      <EditorialHero
        breadcrumbs={breadcrumbs}
        eyebrow={heroEyebrow}
        title={heroHeading}
        subtitle={heroSubheading}
        description={heroIntro}
        primaryCta={{ label: 'Calculate Custom Quote', href: '/quote' }}
        secondaryCta={{
          label: 'WhatsApp Rate Desk',
          href: quoteWhatsappUrl,
          icon: <MessageSquare className="w-4 h-4 text-[#C6A15B] shrink-0" />,
        }}
        imageSrc="/images/hero-freight.jpg"
        imageAlt="Air & Sea Cargo Logistics Dispatch"
        imageBadgeText="Indicative Operational Rates"
      />

      {/* 2. AIR VS SEA LARGE TYPOGRAPHY COMPARISON */}
      <section id="quick-comparison" className="w-full bg-[#17201B] text-white py-20 lg:py-28 border-b border-[#12372A] scroll-mt-12">
        <Container>
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block">
                Mode Contrast
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6F2E9]">
                Air Cargo vs Sea Freight
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#F6F2E9]/75 leading-relaxed">
                Compare weight minimums, transit expectations, and cost structures before requesting your formal quote.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* AIR PANEL */}
              <div className="p-8 lg:p-12 rounded-2xl bg-[#12372A]/70 border-2 border-[#1F8A5B]/40 space-y-6 flex flex-col justify-between shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#1F8A5B]/30 pb-4">
                    <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#C6A15B] tracking-tight">
                      AIR
                    </span>
                    <span className="px-3 py-1 bg-[#C6A15B] text-[#17201B] font-mono text-xs font-bold uppercase rounded-full">
                      Express
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Fast Carrier Capacity (10–15 Days)
                  </h3>
                  <div className="space-y-3 font-mono text-sm text-[#F6F2E9]/90">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">20 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Transit</span>
                      <span className="font-bold text-white">10–15 Days</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Target Cargo</span>
                      <span className="text-xs text-[#F6F2E9]/80">Urgent parcels, samples, baggage</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href="/quote?service=air-freight">
                    <button
                      type="button"
                      className="w-full h-12 bg-[#C6A15B] hover:bg-[#b5924e] text-[#17201B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Quote Air Freight</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* SEA PANEL */}
              <div className="p-8 lg:p-12 rounded-2xl bg-[#12372A]/70 border-2 border-[#C6A15B]/40 space-y-6 flex flex-col justify-between shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#C6A15B]/30 pb-4">
                    <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#F6F2E9] tracking-tight">
                      SEA
                    </span>
                    <span className="px-3 py-1 bg-[#17201B] border border-[#1F8A5B] text-white font-mono text-xs font-bold uppercase rounded-full">
                      Economical
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Ocean Container Shipping (1.5–2.5 Months)
                  </h3>
                  <div className="space-y-3 font-mono text-sm text-[#F6F2E9]/90">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">70–100 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Transit</span>
                      <span className="font-bold text-white">1.5–2.5 Months</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Target Cargo</span>
                      <span className="text-xs text-[#F6F2E9]/80">Bulk stock, machinery, relocations</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href="/quote?service=sea-cargo">
                    <button
                      type="button"
                      className="w-full h-12 bg-transparent hover:bg-white/10 text-[#F6F2E9] font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-[#C6A15B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Quote Sea Cargo</span>
                      <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. OPERATIONAL DATA PANEL — AIR RATES TABLE */}
      <section id="part-1-air-cargo" className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 scroll-mt-12 relative">
        <span id="air-cargo" className="sr-only" />
        <Container>
          <div className="space-y-12">
            <OperationalDataPanel
              eyebrow="Part 1 — Air Cargo Rates"
              title="Indicative Air Cargo Rates per KG"
              subtitle="Estimated export rates per kilogram and indicative transit timelines from Pakistan air hubs. Minimum shipment requirement: 20 KG."
              theme="warm"
              footnote="All rates are indicative estimates in PKR per KG based on standard commodity weight and route availability. Final binding quotes require exact dimensions and origin pickup city."
            >
              <div className="mt-8 overflow-hidden rounded-xl border border-[#12372A]/15 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-sm">
                    <thead>
                      <tr className="bg-[#12372A] text-white font-mono text-xs font-bold uppercase tracking-wider">
                        <th className="p-4 sm:p-5">Destination Corridor</th>
                        <th className="p-4 sm:p-5 font-mono">Indicative Rate (PKR/KG)</th>
                        <th className="p-4 sm:p-5">Indicative Route Transit</th>
                        <th className="p-4 sm:p-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#12372A]/10 text-[#17201B]">
                      {airCargoRates.map((item) => (
                        <tr key={item.country} className="hover:bg-[#FAF8F3] transition-colors">
                          <td className="p-4 sm:p-5 font-bold flex items-center gap-3">
                            <span className="text-xl">{item.flag || '✈️'}</span>
                            <span>{item.country}</span>
                          </td>
                          <td className="p-4 sm:p-5 font-mono font-bold text-[#1F8A5B]">
                            {item.rate}
                          </td>
                          <td className="p-4 sm:p-5 font-mono text-xs font-semibold opacity-80">
                            {item.deliveryTime}
                          </td>
                          <td className="p-4 sm:p-5 text-right">
                            <Link href={item.quoteHref || '/quote?service=air-freight'}>
                              <span className="font-mono text-xs font-bold text-[#12372A] hover:text-[#1F8A5B] underline">
                                Request Quote →
                              </span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </OperationalDataPanel>
          </div>
        </Container>
      </section>

      {/* 4. OPERATIONAL DATA PANEL — SEA RATES TABLE */}
      <section id="part-2-sea-cargo" className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 scroll-mt-12 relative">
        <span id="sea-cargo" className="sr-only" />
        <Container>
          <div className="space-y-12">
            <OperationalDataPanel
              eyebrow="Part 2 — Sea Cargo Rates"
              title="Indicative Ocean Sea Cargo Rates per KG"
              subtitle="Ocean freight indicative rates per kilogram departing Karachi ports. Minimum cargo requirement: 70–100 KG."
              theme="warm"
              footnote={seaDisclaimer}
            >
              <div className="mt-8 overflow-hidden rounded-xl border border-[#12372A]/15 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-sm">
                    <thead>
                      <tr className="bg-[#17201B] text-white font-mono text-xs font-bold uppercase tracking-wider border-b border-[#C6A15B]/30">
                        <th className="p-4 sm:p-5">Destination Corridor</th>
                        <th className="p-4 sm:p-5 font-mono">Indicative Rate (PKR/KG)</th>
                        <th className="p-4 sm:p-5">Indicative Route Transit</th>
                        <th className="p-4 sm:p-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#12372A]/10 text-[#17201B]">
                      {seaCargoRates.map((item) => (
                        <tr key={item.country} className="hover:bg-[#FAF8F3] transition-colors">
                          <td className="p-4 sm:p-5 font-bold flex items-center gap-3">
                            <span className="text-xl">{item.flag || '🚢'}</span>
                            <span>{item.country}</span>
                          </td>
                          <td className="p-4 sm:p-5 font-mono font-bold text-[#12372A]">
                            {item.rate}
                          </td>
                          <td className="p-4 sm:p-5 font-mono text-xs font-semibold opacity-80">
                            {item.deliveryTime}
                          </td>
                          <td className="p-4 sm:p-5 text-right">
                            <Link href={item.quoteHref || '/quote?service=sea-cargo'}>
                              <span className="font-mono text-xs font-bold text-[#12372A] hover:text-[#1F8A5B] underline">
                                Request Quote →
                              </span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </OperationalDataPanel>
          </div>
        </Container>
      </section>

      {/* 5. WHAT AFFECTS YOUR QUOTE */}
      <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container>
          <div className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Rate Qualification Factors
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                What Affects Your Shipping Quote
              </h2>
              <p className="font-sans text-base text-[#17201B]/75">
                Understand how logistics parameters dictate the final line-item cost.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl border border-[#12372A]/15 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#17201B]">Actual vs Volumetric Weight</h3>
                <p className="font-sans text-xs sm:text-sm text-[#17201B]/75 leading-relaxed">
                  Carriers bill based on whichever is greater: gross physical weight (KG) or volumetric dimension (L x W x H in cm / 5000).
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-[#12372A]/15 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#17201B]">Port & Airline Surcharges</h3>
                <p className="font-sans text-xs sm:text-sm text-[#17201B]/75 leading-relaxed">
                  Fuel surcharges, terminal handling fees (THC), and peak season surcharges fluctuate based on global trade conditions.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-[#12372A]/15 space-y-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#12372A]/10 flex items-center justify-center text-[#1F8A5B]">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#17201B]">Customs & Delivery Scope</h3>
                <p className="font-sans text-xs sm:text-sm text-[#17201B]/75 leading-relaxed">
                  Doorstep last-mile delivery, custom export declarations, or special commodity handling alter final quotation figures.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10">
        <Container size="narrow">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
                Rates & Transit FAQs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-[#FAF8F3] border border-[#12372A]/15 rounded-xl space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#17201B]">
                    {faq.question}
                  </h3>
                  <p className="font-sans text-sm text-[#17201B]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. FINAL QUOTE CTA SECTION */}
      <FinalCtaSection
        eyebrow="Tell Us About Your Shipment"
        heading="Transition from Indicative Rates to Official Quote"
        description="Provide your origin pickup city, destination country, weight, and cargo type to receive a binding line-item quote."
        whatsappNumber={activeWhatsapp}
      />
    </div>
  );
}
