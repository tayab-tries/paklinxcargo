import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Plane,
  Ship,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  ListOrdered,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { siteConfig } from '@/config/site.config';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanitySiteSettingsData, getSanityCargoPricingData, SanityCargoRateItem, SanityCargoComparisonRow } from '@/sanity/lib/fetch';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const sanityCargoPricing = await getSanityCargoPricingData({ stega: false });

  const title =
    sanityCargoPricing?.seo?.metaTitle ||
    `Air & Sea Cargo Rates & Services from Pakistan | ${siteConfig.name}`;
  const description =
    sanityCargoPricing?.seo?.metaDescription ||
    'Raahi International offers air and sea cargo services from Pakistan worldwide. Ship personal and commercial cargo with air freight, sea freight, customs clearance and delivery solutions.';

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
  const cleanPhone = activePhone.replace(/\s+/g, '');

  const quoteWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I would like to inquire about Air & Sea Cargo services from Pakistan. Please provide a quote.'
  );

  const doorToDoorWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I need a Door-to-Door cargo shipping quote from Pakistan. Please guide me.'
  );

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: 'Air & Sea Cargo Services', url: '/cargo-services' },
  ];

  // 1. HERO SECTION & BADGES
  const heroEyebrow = sanityCargoPricing?.hero?.eyebrow || 'Air & Sea Cargo Hub';
  const heroHeading = sanityCargoPricing?.hero?.heading || 'Air & Sea Cargo Services from Pakistan';
  const heroSubheading = sanityCargoPricing?.hero?.subheading || 'Reliable international air freight and ocean sea cargo solutions connecting Pakistan with destinations worldwide.';
  const heroIntro = sanityCargoPricing?.hero?.introParagraph || 'At Raahi International Cargo & Logistics Services, we provide complete international air cargo and sea cargo solutions for individuals, families, traders and commercial exporters. Whether you need to send a smaller shipment quickly by air or move larger cargo economically by sea, we help you choose the best shipping option based on cargo type, weight, volume, destination, urgency and budget.';
  const airBadgeTitle = sanityCargoPricing?.hero?.airBadgeTitle || 'Air Cargo Express';
  const airMinWeightText = sanityCargoPricing?.hero?.airMinWeightText || 'Minimum Air Shipment: 20 KG';
  const seaBadgeTitle = sanityCargoPricing?.hero?.seaBadgeTitle || 'Sea Freight Economical';
  const seaMinWeightText = sanityCargoPricing?.hero?.seaMinWeightText || 'Minimum Sea Cargo: 70–100 KG';

  // 2. AIR CARGO RATES & TIMELINES
  const airSectionTitle = sanityCargoPricing?.airCargoSection?.title || 'Air Cargo Rates & Delivery Time';
  const airSectionSubtitle = sanityCargoPricing?.airCargoSection?.subtitle || 'Indicative air cargo rates per KG and estimated delivery timelines from Pakistan.';
  const airMinWeightBadge = sanityCargoPricing?.airCargoSection?.minWeightBadge || '20 KG MIN';
  
  const fallbackAirCargoRates: SanityCargoRateItem[] = [
    { country: 'USA', flag: '🇺🇸', rate: 'Rs. 2,750 – 2,950/KG', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'United Kingdom', flag: '🇬🇧', rate: 'Rs. 1,750 – 1,850/KG', deliveryTime: '10–12 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'UAE', flag: '🇦🇪', rate: 'Rs. 1,350 – 1,450/KG', deliveryTime: '10–17 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Canada', flag: '🇨🇦', rate: 'Rs. 2,850 – 2,950/KG', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Saudi Arabia', flag: '🇸🇦', rate: 'Rs. 2,150 – 2,250/KG', deliveryTime: '10–20 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Europe', flag: '🇪🇺', rate: 'Rs. 2,350 – 2,450/KG', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Australia', flag: '🇦🇺', rate: 'Rs. 2,350 – 2,450/KG', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rate: 'Rs. 2,350/KG', deliveryTime: '10–15 Days', quoteHref: '/quote?service=air-freight' },
    { country: 'Dubai', flag: '🇦🇪', rate: 'Rs. 1,350 – 1,450/KG', deliveryTime: '10–17 Days', quoteHref: '/quote?service=air-freight' },
  ];
  const airCargoRates = sanityCargoPricing?.airCargoSection?.rates?.length ? sanityCargoPricing.airCargoSection.rates : fallbackAirCargoRates;

  // 3. SEA CARGO RATES & TIMELINES
  const seaSectionTitle = sanityCargoPricing?.seaCargoSection?.title || 'Sea Cargo Rates & Delivery Time';
  const seaSectionSubtitle = sanityCargoPricing?.seaCargoSection?.subtitle || 'Indicative ocean freight rates (PKR/KG) and estimated delivery timelines from Pakistan.';
  const seaMinWeightBadge = sanityCargoPricing?.seaCargoSection?.minWeightBadge || '70–100 KG MIN';
  
  const fallbackSeaCargoRates: SanityCargoRateItem[] = [
    { country: 'United Kingdom', flag: '🇬🇧', rate: 'Rs. 950 – 1,000/KG', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'UAE', flag: '🇦🇪', rate: 'Rs. 600 – 700/KG', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'USA', flag: '🇺🇸', rate: 'Rs. 1,550 – 1,650/KG', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Saudi Arabia', flag: '🇸🇦', rate: 'Rs. 950 – 1,000/KG', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Germany', flag: '🇩🇪', rate: 'Rs. 1,450/KG', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Canada', flag: '🇨🇦', rate: 'Rs. 1,750 – 1,850/KG', deliveryTime: '2 – 3 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rate: 'Rs. 1,250/KG', deliveryTime: '1.5 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Australia', flag: '🇦🇺', rate: 'Rs. 1,450/KG', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
    { country: 'Europe', flag: '🇪🇺', rate: 'Rs. 1,450/KG', deliveryTime: '2 – 2.5 Months', quoteHref: '/quote?service=sea-cargo' },
  ];
  const seaCargoRates = sanityCargoPricing?.seaCargoSection?.rates?.length ? sanityCargoPricing.seaCargoSection.rates : fallbackSeaCargoRates;
  const seaDisclaimer = sanityCargoPricing?.seaCargoSection?.disclaimer || '* Rate Disclaimer: Rates shown above are indicative and may vary depending on shipment volume, weight, origin, destination, port/airport charges, airline/shipping line, customs requirements, fuel surcharges, and local delivery location. Contact Raahi International for a current quotation.';

  // 4. QUICK COMPARISON MATRIX
  const comparisonTitle = sanityCargoPricing?.quickComparison?.title || 'Choose the Right Cargo Option';
  const comparisonSubtitle = sanityCargoPricing?.quickComparison?.subtitle || 'Side-by-Side Comparison';
  const fallbackComparisonRows: SanityCargoComparisonRow[] = [
    { feature: 'Best For', airValue: 'Faster shipments', seaValue: 'Larger & heavier shipments' },
    { feature: 'Minimum Weight', airValue: '20 KG Minimum', seaValue: '70–100 KG Minimum', airBadge: '20 KG', seaBadge: '70–100 KG' },
    { feature: 'Transit Time', airValue: 'Generally 10–15 Days', seaValue: 'Generally 1.5–2.5 Months' },
    { feature: 'Cost', airValue: 'Higher per kg', seaValue: 'More economical for larger shipments' },
    { feature: 'Suitable For', airValue: 'Personal & commercial cargo', seaValue: 'Personal, commercial & bulk cargo' },
  ];
  const comparisonRows = sanityCargoPricing?.quickComparison?.rows?.length ? sanityCargoPricing.quickComparison.rows : fallbackComparisonRows;

  // 5. DECISION GUIDANCE
  const decisionTitle = sanityCargoPricing?.decisionGuidance?.title || 'Which One Should I Pick?';
  const decisionAirTitle = sanityCargoPricing?.decisionGuidance?.airTitle || 'Choose Air Cargo If:';
  const decisionAirPoints = sanityCargoPricing?.decisionGuidance?.airPoints?.length ? sanityCargoPricing.decisionGuidance.airPoints : [
    'You need faster delivery (10–15 days typical).',
    'Your shipment is relatively smaller (above 20 kg minimum).',
    'Delivery speed takes priority over lower ocean freight cost.',
    'You are sending personal belongings, clothing, business samples, or excess baggage.',
  ];
  const decisionSeaTitle = sanityCargoPricing?.decisionGuidance?.seaTitle || 'Choose Sea Cargo If:';
  const decisionSeaPoints = sanityCargoPricing?.decisionGuidance?.seaPoints?.length ? sanityCargoPricing.decisionGuidance.seaPoints : [
    'Your shipment is large or heavy (70–100 kg minimum requirement).',
    'Cost efficiency is more important than speed.',
    'You have flexible delivery timelines (1.5–2.5 months typical).',
    'You are shipping bulk commercial stock, machinery, or full household relocations.',
  ];

  // 6. DOOR-TO-DOOR
  const doorToDoorBadge = sanityCargoPricing?.doorToDoor?.badge || 'Door-to-Door Service';
  const doorToDoorTitle = sanityCargoPricing?.doorToDoor?.title || 'Need Delivery from Your Door to Their Door?';
  const doorToDoorDesc = sanityCargoPricing?.doorToDoor?.description || 'For eligible routes and shipments, Raahi International can coordinate complete door-to-door international cargo solutions.';
  const doorToDoorSteps = sanityCargoPricing?.doorToDoor?.workflowSteps?.length ? sanityCargoPricing.doorToDoor.workflowSteps : [
    'Pickup in Pakistan',
    'Export Handling',
    'Customs Clearance',
    'Air / Sea Transit',
    'Destination Clearance',
    'Final Door Delivery',
  ];

  // 7. FAQS
  const fallbackFaqs = [
    {
      question: 'What is the minimum weight for air cargo?',
      answer: 'Our minimum air cargo shipment weight is 20 kg. Actual service availability and pricing depend on destination and cargo requirements.',
    },
    {
      question: 'What is the minimum weight for sea cargo?',
      answer: 'Our minimum sea cargo requirement is approximately 70–100 kg, depending on destination, shipment type and available service.',
    },
    {
      question: 'Which is cheaper, air cargo or sea cargo?',
      answer: 'Sea cargo is generally more economical for larger and heavier shipments, while air cargo is generally faster but has a higher transportation cost.',
    },
    {
      question: 'Which is faster, air or sea cargo?',
      answer: 'Air cargo is generally faster than sea cargo. Exact transit times vary depending on destination, carrier, customs clearance and operational factors.',
    },
    {
      question: 'Can I ship personal belongings by air?',
      answer: 'Yes, eligible personal belongings can be shipped by air, subject to carrier and destination-country regulations.',
    },
    {
      question: 'Can I ship household goods by sea?',
      answer: 'Yes, sea freight can be suitable for larger quantities of household goods and personal belongings, subject to applicable regulations.',
    },
    {
      question: 'What is LCL sea cargo?',
      answer: 'LCL means Less Than Container Load. Your cargo shares container space with shipments belonging to other customers.',
    },
    {
      question: 'What is FCL sea cargo?',
      answer: 'FCL means Full Container Load, where an entire container is allocated to your shipment.',
    },
    {
      question: 'Are the rates on this page final?',
      answer: 'No. Rates displayed on this page are average/indicative rates. Your final quotation depends on shipment details, destination, carrier and applicable charges.',
    },
    {
      question: 'How can I get an exact cargo rate?',
      answer: 'Send us your pickup city, destination, cargo type, weight, dimensions and number of packages. Our team can then provide a quotation based on your shipment requirements.',
    },
  ];
  const faqs = sanityCargoPricing?.faqs?.length ? sanityCargoPricing.faqs : fallbackFaqs;

  // Schema.org FAQPage JSON-LD
  const faqJsonLd = faqs.length > 0 ? {
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
  } : null;

  return (
    <div className="w-full bg-background text-foreground font-sans">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 1. HERO SECTION — DUAL AIR & SEA CARGO HUB */}
      <section className="relative w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
        <Container>
          <div className="max-w-4xl space-y-6">
            <Breadcrumbs items={breadcrumbs} className="text-slate-400" />
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="accent" size="sm" className="font-mono uppercase tracking-wider font-bold">
                {heroEyebrow}
              </Badge>
              <span className="text-xs text-slate-400 font-mono">• Direct Export Dispatch from Pakistan</span>
            </div>

            <h1 className="text-display-lg sm:text-display-xl font-bold tracking-tight text-white">
              {heroHeading}
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
              {heroSubheading}
            </p>

            <p className="text-body-md text-slate-300 leading-relaxed max-w-3xl font-normal">
              {heroIntro}
            </p>

            {/* DUAL MODE CALLOUT BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-2xl">
              <div className="bg-brand-black/80 rounded-md p-4 border border-emerald-500/40 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 rounded-xs text-emerald-400 shrink-0">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase">{airBadgeTitle}</div>
                  <div className="text-body-sm font-bold text-white">{airMinWeightText}</div>
                </div>
              </div>

              <div className="bg-brand-black/80 rounded-md p-4 border border-blue-500/40 flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/20 rounded-xs text-blue-400 shrink-0">
                  <Ship className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase">{seaBadgeTitle}</div>
                  <div className="text-body-sm font-bold text-white">{seaMinWeightText}</div>
                </div>
              </div>
            </div>

            {/* HERO BUTTONS WITH COMFORTABLE SPACING */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="font-bold w-full sm:w-auto text-base shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Get a Shipping Quote
                </Button>
              </Link>
              <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold w-full sm:w-auto text-base shadow-sm"
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN CONTENT WITH SIDEBAR */}
      <section className="w-full py-12 lg:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* MAIN ARTICLE (8 COLS) */}
            <main className="lg:col-span-8 space-y-16">
              
              {/* TABLE OF CONTENTS INDEX BOX */}
              <nav
                aria-label="Table of contents"
                className="bg-surface-subtle border border-border rounded-md p-6 lg:p-8 space-y-4 shadow-2xs"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  <ListOrdered className="w-4 h-4 text-accent-dark shrink-0" />
                  <span>On This Page — Quick Navigation</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-medium text-slate-700">
                  <li>
                    <a href="#quick-comparison" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Quick Service Comparison
                    </a>
                  </li>
                  <li>
                    <a href="#part-1-air-cargo" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Part 1 — Air Cargo Services
                    </a>
                  </li>
                  <li>
                    <a href="#air-cargo-rates" className="hover:text-accent-dark hover:underline flex items-center gap-1.5 font-bold text-brand-black">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> ✈️ Air Cargo Rates & Delivery Time
                    </a>
                  </li>
                  <li>
                    <a href="#part-2-sea-cargo" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Part 2 — Sea Cargo Services
                    </a>
                  </li>
                  <li>
                    <a href="#sea-cargo-rates" className="hover:text-accent-dark hover:underline flex items-center gap-1.5 font-bold text-brand-black">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> 🚢 Sea Freight Rates & Delivery Time
                    </a>
                  </li>
                  <li>
                    <a href="#which-to-pick" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air vs Sea Decision Guide
                    </a>
                  </li>
                  <li>
                    <a href="#door-to-door" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Door-to-Door Delivery
                    </a>
                  </li>
                  <li>
                    <a href="#faqs" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Frequently Asked Questions
                    </a>
                  </li>
                </ul>
              </nav>

              {/* 2. QUICK SERVICE COMPARISON */}
              <section id="quick-comparison" className="scroll-mt-28 space-y-6">
                <div className="border-b border-border pb-3">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">{comparisonSubtitle}</div>
                  <h2 className="text-heading-xl font-bold text-brand-black">{comparisonTitle}</h2>
                </div>

                <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
                  <table className="w-full text-left text-body-sm border-collapse">
                    <thead>
                      <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                        <th className="p-4 font-bold text-brand-black">Feature</th>
                        <th className="p-4 font-bold text-brand-black">✈️ Air Cargo</th>
                        <th className="p-4 font-bold text-brand-black">🚢 Sea Cargo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border font-normal text-slate-700">
                      {comparisonRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-surface-subtle transition-colors">
                          <td className="p-4 font-bold text-brand-black">{row.feature}</td>
                          <td className="p-4 font-semibold text-brand-black">
                            {row.airBadge ? (
                              <Badge variant="accent" size="sm">{row.airValue}</Badge>
                            ) : (
                              row.airValue
                            )}
                          </td>
                          <td className="p-4">
                            {row.seaBadge ? (
                              <Badge variant="secondary" size="sm">{row.seaValue}</Badge>
                            ) : (
                              row.seaValue
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* PART 1 — AIR CARGO */}
              <section id="part-1-air-cargo" className="scroll-mt-28 space-y-8">
                <div className="border-b border-border pb-3">
                  <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">PART 1 — AIR CARGO</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo Services from Pakistan</h2>
                  <p className="text-body-md text-slate-600">Fast International Air Freight for Your Cargo</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-4">
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    When time matters, air cargo is one of the most efficient ways to transport goods internationally. Raahi International arranges air freight solutions for customers sending permitted cargo from Pakistan to destinations around the world.
                  </p>
                </div>

                {/* MINIMUM AIR SHIPMENT CALLOUT */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-md flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Air Cargo Requirement</div>
                    <div className="text-heading-sm font-bold text-amber-900">{airMinWeightText}</div>
                  </div>
                  <Badge variant="accent" size="md" className="shrink-0 font-bold text-sm">{airMinWeightBadge}</Badge>
                </div>

                {/* AIR CARGO RATES & DELIVERY TIME TABLE */}
                <div id="air-cargo-rates" className="scroll-mt-28 space-y-6 pt-4">
                  <div className="bg-surface-subtle p-5 rounded-md border border-border flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-heading-md font-bold text-brand-black">
                        {airSectionTitle}
                      </h3>
                      <p className="text-body-xs text-slate-600">
                        {airSectionSubtitle}
                      </p>
                    </div>
                    <Badge variant="accent" size="sm" className="font-mono font-bold">{airMinWeightBadge}</Badge>
                  </div>

                  <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
                    <table className="w-full text-left text-body-md border-collapse">
                      <thead>
                        <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                          <th className="p-4 font-bold text-brand-black">Destination</th>
                          <th className="p-4 font-bold text-brand-black">Rate</th>
                          <th className="p-4 font-bold text-brand-black">Delivery Time</th>
                          <th className="p-4 font-bold text-brand-black text-right">Get Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border font-normal text-slate-700">
                        {airCargoRates.map((rate) => (
                          <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                            <td className="p-4 font-bold text-brand-black text-body-md flex items-center gap-2.5">
                              <span className="text-xl">{rate.flag || '🏳️'}</span>
                              <span>{rate.country}</span>
                            </td>
                            <td className="p-4 font-bold font-mono text-brand-black text-body-md">
                              {rate.rate}
                            </td>
                            <td className="p-4 text-body-sm text-slate-700 font-medium">
                              {rate.deliveryTime}
                            </td>
                            <td className="p-4 text-right">
                              <Link href={rate.quoteHref || '/quote?service=air-freight'} className="text-xs font-bold text-brand-black hover:text-accent-dark underline">
                                Get Quote →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* PART 2 — SEA CARGO */}
              <section id="part-2-sea-cargo" className="scroll-mt-28 space-y-8 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <Badge variant="secondary" size="sm" className="mb-2 font-mono uppercase">PART 2 — SEA CARGO</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">Sea Cargo Services from Pakistan</h2>
                  <p className="text-body-md text-slate-600">Economical International Shipping for Larger Shipments</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-4">
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Sea cargo is a practical option for customers who need to transport larger, heavier or higher-volume shipments internationally. Compared with air freight, sea transportation generally takes longer but can offer a more economical solution for larger shipments.
                  </p>
                </div>

                {/* MINIMUM SEA WEIGHT BADGE CALLOUT */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-md flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider">Sea Cargo Requirement</div>
                    <div className="text-heading-sm font-bold text-blue-950">{seaMinWeightText}</div>
                  </div>
                  <Badge variant="secondary" size="md" className="shrink-0 font-bold text-sm">{seaMinWeightBadge}</Badge>
                </div>

                {/* SEA CARGO RATES & DELIVERY TIME TABLE */}
                <div id="sea-cargo-rates" className="scroll-mt-28 space-y-6 pt-4">
                  <div className="bg-surface-subtle p-5 rounded-md border border-border flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-heading-md font-bold text-brand-black">
                        {seaSectionTitle}
                      </h3>
                      <p className="text-body-xs text-slate-600">
                        {seaSectionSubtitle}
                      </p>
                    </div>
                    <Badge variant="secondary" size="sm" className="font-mono font-bold">{seaMinWeightBadge}</Badge>
                  </div>

                  <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
                    <table className="w-full text-left text-body-md border-collapse">
                      <thead>
                        <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                          <th className="p-4 font-bold text-brand-black">Destination</th>
                          <th className="p-4 font-bold text-brand-black">Rate</th>
                          <th className="p-4 font-bold text-brand-black">Delivery Time</th>
                          <th className="p-4 font-bold text-brand-black text-right">Get Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border font-normal text-slate-700">
                        {seaCargoRates.map((rate) => (
                          <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                            <td className="p-4 font-bold text-brand-black text-body-md flex items-center gap-2.5">
                              <span className="text-xl">{rate.flag || '🏳️'}</span>
                              <span>{rate.country}</span>
                            </td>
                            <td className="p-4 font-bold font-mono text-brand-black text-body-md">
                              {rate.rate}
                            </td>
                            <td className="p-4 text-body-sm text-slate-700 font-medium">
                              {rate.deliveryTime}
                            </td>
                            <td className="p-4 text-right">
                              <Link href={rate.quoteHref || '/quote?service=sea-cargo'} className="text-xs font-bold text-brand-black hover:text-accent-dark underline">
                                Get Quote →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-body-xs text-slate-500 italic">
                    {seaDisclaimer}
                  </p>
                </div>
              </section>

              {/* SECTION: WHICH ONE SHOULD I PICK? */}
              <section id="which-to-pick" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <Badge variant="outline" size="sm" className="mb-2 font-mono uppercase">Practical Decision Guide</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">{decisionTitle}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-md space-y-4">
                    <h3 className="text-heading-sm font-bold text-emerald-950 flex items-center gap-2">
                      <Plane className="w-5 h-5 text-emerald-600" /> {decisionAirTitle}
                    </h3>
                    <ul className="space-y-2.5 text-body-sm text-emerald-900 font-medium">
                      {decisionAirPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50/70 border border-blue-200 p-6 rounded-md space-y-4">
                    <h3 className="text-heading-sm font-bold text-blue-950 flex items-center gap-2">
                      <Ship className="w-5 h-5 text-blue-600" /> {decisionSeaTitle}
                    </h3>
                    <ul className="space-y-2.5 text-body-sm text-blue-900 font-medium">
                      {decisionSeaPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION: DOOR-TO-DOOR OPTION */}
              <section id="door-to-door" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">{doorToDoorBadge}</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">{doorToDoorTitle}</h2>
                  <p className="text-body-md text-slate-600">
                    {doorToDoorDesc}
                  </p>
                </div>

                <div className="bg-brand-black text-white p-6 sm:p-8 rounded-md space-y-5 shadow-md">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Integrated Workflow</div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-accent font-bold">
                    {doorToDoorSteps.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span>{step}</span>
                        {idx < doorToDoorSteps.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-body-xs text-slate-300">
                    Door-to-door availability and charges depend on destination, cargo type, customs requirements and local delivery arrangements.
                  </p>
                  <div className="pt-2">
                    <a href={doorToDoorWhatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="accent" size="md" className="font-bold shadow-sm">
                        Request Door-to-Door Quote
                      </Button>
                    </a>
                  </div>
                </div>
              </section>

              {/* SECTION: FAQS */}
              <section id="faqs" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Frequently Asked Questions</div>
                  <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo & Comparison FAQs</h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-surface border border-border rounded-md p-6 space-y-2 shadow-2xs">
                      <h3 className="text-body-md font-bold text-brand-black flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-accent-dark shrink-0 mt-1" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-body-sm text-slate-700 leading-relaxed font-normal pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* STICKY SIDEBAR (4 COLS) WITH CONFORTABLE BUTTON SPACING */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* INSTANT RATE CALCULATOR CARD */}
              <div className="bg-brand-black text-white rounded-md border border-border-dark p-6 space-y-6 shadow-xl">
                <div className="space-y-2 border-b border-border-dark pb-4">
                  <div className="text-xs font-mono text-accent uppercase tracking-wider font-bold">Quick Dispatch</div>
                  <h3 className="text-heading-md font-bold text-white">Get Cargo Quote</h3>
                  <p className="text-body-xs text-slate-300">
                    Get custom air or sea freight rates from Pakistan.
                  </p>
                </div>

                {/* SIDEBAR BUTTONS WITH CLEAR SEPARATION */}
                <div className="space-y-4 font-sans">
                  <Link href="/quote" className="block">
                    <Button variant="accent" size="lg" className="w-full font-bold shadow-md">
                      Calculate Rate Online
                    </Button>
                  </Link>
                  <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="block pt-2">
                    <Button
                      variant="outline-dark"
                      size="lg"
                      className="w-full border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/15 font-bold shadow-sm"
                      leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                    >
                      WhatsApp Us Now
                    </Button>
                  </a>
                </div>

                <div className="pt-2 border-t border-border-dark space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                    <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                      {activePhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>Doorstep Pickup Across Pakistan</span>
                  </div>
                </div>
              </div>

              {/* RELATED GUIDES LINK CARD */}
              <div className="bg-surface border border-border rounded-md p-6 space-y-3 shadow-2xs">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Logistics Services & Options
                </h4>
                <div className="space-y-2 text-body-xs">
                  <a href="#quick-comparison" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
                    <span>Air vs Sea Cargo Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </a>
                  <a href="#air-cargo-rates" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between text-brand-black font-bold">
                    <span>Air Cargo Rates & Delivery Time</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </a>
                  <a href="#sea-cargo-rates" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between text-brand-black font-bold">
                    <span>Sea Cargo Rates & Delivery Time</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </a>
                  <Link href="/services/commercial-cargo" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
                    <span>Commercial Cargo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white text-center">
        <Container size="narrow">
          <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-14 space-y-6 shadow-2xl">
            <Badge variant="accent" size="sm" className="font-mono uppercase font-bold">
              Ready to Ship Your Cargo?
            </Badge>

            <h2 className="text-display-md sm:text-display-lg font-bold text-white tracking-tight">
              Get Your Air & Sea Cargo Quote
            </h2>

            <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              Whether you need the speed of air freight or the cost efficiency of sea freight, Raahi International can help you arrange an international shipping solution from Pakistan.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto font-bold text-base shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Request a Quote
                </Button>
              </Link>
              <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold text-base shadow-sm"
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                >
                  WhatsApp Us
                </Button>
              </a>
              <a href={`tel:${cleanPhone}`} className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 font-bold text-base shadow-sm"
                  leftIcon={<Phone className="w-4 h-4 text-slate-300 shrink-0" />}
                >
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
