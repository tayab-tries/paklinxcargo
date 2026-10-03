import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
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
  Phone,
  ShieldCheck,
  MapPin,
  Award,
  Users,
  Compass,
} from 'lucide-react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { siteConfig } from '@/config/site.config';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanityAboutPageData, getSanitySiteSettingsData, getSanityLocationsList, SanityLocationDocument } from '@/sanity/lib/fetch';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const sanityAbout = await getSanityAboutPageData();

  const title =
    sanityAbout?.seo?.metaTitle ||
    `About Raahi International | International Cargo & Logistics Services`;
  const description =
    sanityAbout?.seo?.metaDescription ||
    `Learn about Raahi International Cargo & Logistics Services, providing air freight, sea freight, customs clearance and door-to-door international shipping solutions from Pakistan.`;

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
      <h1 className="text-display-lg font-bold text-brand-black pt-8 pb-3 border-b border-border mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-heading-xl font-bold text-brand-black pt-8 pb-3 border-b border-border mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-heading-lg font-bold text-brand-black pt-6 pb-2 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-body-md text-slate-700 leading-relaxed font-normal py-2 mb-4">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 py-2 mb-4 text-body-md text-slate-700 font-normal">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 py-2 mb-4 text-body-md text-slate-700 font-normal list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
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
          className="text-accent-dark font-semibold underline underline-offset-2 hover:text-brand-black transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};

export default async function AboutUsPage() {
  const [sanityAbout, business, sanitySiteSettings, sanityLocations] = await Promise.all([
    getSanityAboutPageData(),
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
    getSanityLocationsList(),
  ]);

  const activePhone = sanitySiteSettings?.phone || business.phonePrimary || '';
  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || activePhone;
  const cleanPhone = activePhone.replace(/\s+/g, '');

  const quoteWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I would like to inquire about international shipping with Raahi International. Please guide me.'
  );

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
  ];

  const heroTitle = sanityAbout?.title || 'About Raahi International';
  const heroSubtitle = sanityAbout?.subtitle || 'Connecting Pakistan to the World Through Reliable Logistics';
  const heroIntro =
    sanityAbout?.intro ||
    'Raahi International Cargo & Logistics Services is an international shipping and logistics company helping individuals and businesses move cargo from Pakistan to destinations around the world.';

  const defaultCitiesList = [
    { name: 'Lahore', href: '/locations/international-cargo-services-in-lahore', flag: '📍' },
    { name: 'Karachi', href: '/locations/international-cargo-services-in-karachi', flag: '📍' },
    { name: 'Islamabad', href: '/locations/international-cargo-services-in-islamabad', flag: '📍' },
    { name: 'Rawalpindi', href: '/locations/international-cargo-services-in-rawalpindi', flag: '📍' },
    { name: 'Multan', href: '/locations/international-cargo-services-in-multan', flag: '📍' },
    { name: 'Peshawar', href: '/locations/international-cargo-services-in-peshawar', flag: '📍' },
    { name: 'Faisalabad', href: '/locations/international-cargo-services-in-faisalabad', flag: '📍' },
    { name: 'Sialkot', href: '/locations/international-cargo-services-in-sialkot', flag: '📍' },
  ];

  const citiesList =
    sanityLocations && sanityLocations.length > 0
      ? sanityLocations.map((l: SanityLocationDocument) => ({ name: l.name, href: `/locations/${l.slug}`, flag: '📍' }))
      : defaultCitiesList;

  const processSteps = [
    { step: '01', title: '1. Understand', desc: 'We first learn about your cargo, pickup location, destination and requirements.' },
    { step: '02', title: '2. Recommend', desc: 'We identify suitable shipping options based on your shipment\'s characteristics and priorities.' },
    { step: '03', title: '3. Coordinate', desc: 'Once you confirm the service, we coordinate the required transportation, documentation and customs arrangements.' },
    { step: '04', title: '4. Deliver', desc: 'Your cargo moves through the selected international shipping process toward its final destination.' },
  ];

  return (
    <div className="w-full bg-background text-foreground font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
        <Container>
          <div className="max-w-4xl space-y-6">
            <Breadcrumbs items={breadcrumbs} className="text-slate-400" />

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="accent" size="sm" className="font-mono uppercase tracking-wider font-bold">
                Company Overview
              </Badge>
              <span className="text-xs text-slate-400 font-mono">• Established Logistics Partner</span>
            </div>

            <h1 className="text-display-lg sm:text-display-xl font-bold tracking-tight text-white">
              {heroTitle}
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
              {heroSubtitle}
            </p>

            <p className="text-body-md text-slate-300 leading-relaxed max-w-3xl font-normal">
              {heroIntro}
            </p>

            {/* HERO ACTION BUTTONS */}
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

      {/* 2. MAIN EDITORIAL CONTENT CONTAINER */}
      <section className="w-full py-12 lg:py-20 border-b border-border">
        <Container size="narrow">
          <main className="space-y-16 max-w-3xl mx-auto">
            {/* IF SANITY PORTABLE TEXT BODY IS PROVIDED, RENDER CMS CONTENT */}
            {sanityAbout?.body && sanityAbout.body.length > 0 ? (
              <div className="prose prose-slate max-w-none">
                <PortableText value={sanityAbout.body} components={portableTextComponents} />
              </div>
            ) : (
              /* FALLBACK EDITORIAL CONTENT (EXACT VERBATIM USER CONTENT WITH INTERACTIVE INTERNAL LINKS) */
              <div className="space-y-16">
                {/* INTRO SUMMARY */}
                <section className="space-y-4">
                  <p className="text-body-lg text-slate-700 leading-relaxed font-normal">
                    Raahi International Cargo & Logistics Services is an international shipping and logistics company helping individuals and businesses move cargo from Pakistan to destinations around the world.
                  </p>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    We provide practical international shipping solutions including{' '}
                    <Link href="/cargo-services#part-1-air-cargo" className="text-accent-dark font-bold underline hover:text-brand-black">
                      air freight
                    </Link>
                    ,{' '}
                    <Link href="/cargo-services#part-2-sea-cargo" className="text-accent-dark font-bold underline hover:text-brand-black">
                      sea freight
                    </Link>
                    ,{' '}
                    <Link href="/guides/export-customs-documentation-guide" className="text-accent-dark font-bold underline hover:text-brand-black">
                      customs clearance
                    </Link>{' '}
                    and{' '}
                    <Link href="/cargo-services#door-to-door" className="text-accent-dark font-bold underline hover:text-brand-black">
                      door-to-door cargo services
                    </Link>
                    , depending on the shipment, destination and service requirements.
                  </p>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Our goal is simple: make international shipping easier to understand, easier to arrange and more convenient for our customers.
                  </p>
                </section>

                {/* WHO WE ARE */}
                <section className="space-y-4 border-t border-border pt-8">
                  <div className="space-y-1">
                    <Badge variant="accent" size="sm" className="font-mono uppercase">Overview</Badge>
                    <h2 className="text-heading-xl font-bold text-brand-black">Who We Are</h2>
                    <p className="text-body-md font-semibold text-slate-600">Your International Cargo Partner from Pakistan</p>
                  </div>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    International shipping can involve multiple stages—from pickup and transportation to documentation, customs clearance and final delivery. At Raahi International, we help coordinate these stages so our customers have a clearer and more organized shipping experience.
                  </p>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    We work with individuals, families, traders, e-commerce businesses and companies that need to send permitted cargo internationally from Pakistan.
                  </p>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Whether you are sending personal belongings to family overseas, relocating household items, or moving commercial cargo for your business, we help you find a shipping solution based on your cargo type, weight, dimensions, destination, urgency and budget.
                  </p>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Our services are designed around the needs of each shipment rather than a one-size-fits-all approach.
                  </p>
                </section>

                {/* OUR MISSION */}
                <section className="space-y-4 border-t border-border pt-8">
                  <div className="bg-surface-subtle border border-border p-6 lg:p-8 rounded-md space-y-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-dark uppercase tracking-wider">
                      <Compass className="w-4 h-4 shrink-0" />
                      <span>Company Philosophy</span>
                    </div>
                    <h2 className="text-heading-xl font-bold text-brand-black">Our Mission</h2>
                    <h3 className="text-heading-sm font-semibold text-slate-800">Making International Shipping Simple</h3>
                    <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                      Our mission is to provide reliable, transparent and customer-focused international cargo solutions from Pakistan.
                    </p>
                    <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                      We believe customers should understand their shipping options before sending their cargo. That&apos;s why we focus on clear communication, practical shipping solutions and proper coordination throughout the shipment process.
                    </p>
                    <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                      From the initial quotation to the transportation of your cargo, we aim to make every step as straightforward as possible.
                    </p>
                  </div>
                </section>

                {/* WHAT WE DO */}
                <section className="space-y-6 border-t border-border pt-8">
                  <div className="space-y-1">
                    <Badge variant="outline" size="sm" className="font-mono uppercase">Capabilities</Badge>
                    <h2 className="text-heading-xl font-bold text-brand-black">What We Do</h2>
                    <p className="text-body-md font-semibold text-slate-600">International Cargo & Logistics Services</p>
                    <p className="text-body-sm text-slate-600">
                      Raahi International offers a range of international shipping solutions for individuals and businesses.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* AIR FREIGHT CARD */}
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-black text-body-md flex items-center gap-2">
                          <Plane className="w-4 h-4 text-emerald-600" /> Air Freight
                        </span>
                        <Badge variant="accent" size="sm">Express</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        For shipments where speed is an important consideration, we arrange international{' '}
                        <Link href="/cargo-services#part-1-air-cargo" className="text-accent-dark font-bold underline">
                          air freight solutions
                        </Link>{' '}
                        based on destination and cargo requirements.
                      </p>
                    </div>

                    {/* SEA FREIGHT CARD */}
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-black text-body-md flex items-center gap-2">
                          <Ship className="w-4 h-4 text-blue-600" /> Sea Freight
                        </span>
                        <Badge variant="secondary" size="sm">Economical</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        For larger or heavier shipments,{' '}
                        <Link href="/cargo-services#part-2-sea-cargo" className="text-accent-dark font-bold underline">
                          sea freight
                        </Link>{' '}
                        can provide a more economical transportation option depending on destination and shipment volume.
                      </p>
                    </div>

                    {/* DOOR-TO-DOOR SHIPPING */}
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-black text-body-md flex items-center gap-2">
                          <Truck className="w-4 h-4 text-brand-black" /> Door-to-Door Shipping
                        </span>
                        <Badge variant="outline" size="sm">Full Service</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        We coordinate{' '}
                        <Link href="/cargo-services#door-to-door" className="text-accent-dark font-bold underline">
                          door-to-door international shipping
                        </Link>{' '}
                        solutions for eligible shipments, helping connect pickup in Pakistan with delivery at the destination.
                      </p>
                    </div>

                    {/* CUSTOMS CLEARANCE */}
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-black text-body-md flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-black" /> Customs Clearance
                        </span>
                        <Badge variant="outline" size="sm">Documentation</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        We assist with{' '}
                        <Link href="/guides/export-customs-documentation-guide" className="text-accent-dark font-bold underline">
                          customs clearance arrangements
                        </Link>{' '}
                        and the documentation required for eligible international shipments.
                      </p>
                    </div>

                    {/* PERSONAL EFFECTS */}
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-black text-body-md flex items-center gap-2">
                          <Luggage className="w-4 h-4 text-brand-black" /> Personal Effects & Household
                        </span>
                        <Badge variant="outline" size="sm">Relocation</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        We help individuals arrange international transportation for permitted{' '}
                        <Link href="/services/excess-baggage" className="text-accent-dark font-bold underline">
                          personal belongings and household items
                        </Link>
                        .
                      </p>
                    </div>

                    {/* COMMERCIAL CARGO */}
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-black text-body-md flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-brand-black" /> Commercial Cargo
                        </span>
                        <Badge variant="outline" size="sm">B2B Trade</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        We provide international shipping solutions for businesses moving permitted{' '}
                        <Link href="/services/commercial-cargo" className="text-accent-dark font-bold underline">
                          commercial goods
                        </Link>{' '}
                        between Pakistan and international destinations.
                      </p>
                    </div>
                  </div>
                </section>

                {/* OUR SERVICE COVERAGE */}
                <section className="space-y-6 border-t border-border pt-8">
                  <div className="space-y-1">
                    <Badge variant="secondary" size="sm" className="font-mono uppercase">Network</Badge>
                    <h2 className="text-heading-xl font-bold text-brand-black">Our Service Coverage</h2>
                    <p className="text-body-md font-semibold text-slate-600">International Cargo Services Across Major Pakistani Cities</p>
                  </div>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Raahi International works with customers across major cities in Pakistan, including:
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {citiesList.map((city) => (
                      <Link key={city.name} href={city.href}>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-subtle hover:bg-border border border-border rounded-md text-body-sm font-bold text-brand-black transition-colors">
                          <MapPin className="w-3.5 h-3.5 text-accent-dark shrink-0" />
                          <span>{city.name}</span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Our network allows customers in these locations to access international cargo and logistics solutions for shipments to destinations worldwide, subject to route and service availability.
                  </p>

                  <div className="pt-2">
                    <Link href="/locations">
                      <Button variant="outline" size="md" className="font-bold">
                        Explore Our City Services →
                      </Button>
                    </Link>
                  </div>
                </section>

                {/* WHY RAAHI INTERNATIONAL */}
                <section className="space-y-6 border-t border-border pt-8">
                  <div className="space-y-1">
                    <Badge variant="accent" size="sm" className="font-mono uppercase">Key Benefits</Badge>
                    <h2 className="text-heading-xl font-bold text-brand-black">Why Raahi International?</h2>
                    <p className="text-body-md font-semibold text-slate-600">Why Customers Choose Raahi International</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black text-body-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent-dark" /> Customer-Focused Service
                      </div>
                      <p className="text-body-xs text-slate-600">
                        We take the time to understand your shipment before recommending a suitable shipping option.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black text-body-sm flex items-center gap-2">
                        <Plane className="w-4 h-4 text-accent-dark" /> Air & Sea Freight Options
                      </div>
                      <p className="text-body-xs text-slate-600">
                        Choose between air and sea transportation depending on your cargo, destination, urgency and budget.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black text-body-sm flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-accent-dark" /> Clear Shipping Information
                      </div>
                      <p className="text-body-xs text-slate-600">
                        We aim to provide straightforward information about shipping requirements, documentation and costs.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black text-body-sm flex items-center gap-2">
                        <Award className="w-4 h-4 text-accent-dark" /> International Shipping
                      </div>
                      <p className="text-body-xs text-slate-600">
                        We help connect shipments originating in Pakistan with destinations around the world.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black text-body-sm flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-accent-dark" /> Individual & Business Solutions
                      </div>
                      <p className="text-body-xs text-slate-600">
                        Our services are suitable for both personal shipments and commercial cargo requirements.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black text-body-sm flex items-center gap-2">
                        <Truck className="w-4 h-4 text-accent-dark" /> End-to-End Coordination
                      </div>
                      <p className="text-body-xs text-slate-600">
                        Where the selected service allows, we coordinate multiple stages of the shipment from pickup through transportation and final delivery.
                      </p>
                    </div>
                  </div>
                </section>

                {/* OUR APPROACH */}
                <section className="space-y-6 border-t border-border pt-8">
                  <div className="space-y-1">
                    <Badge variant="outline" size="sm" className="font-mono uppercase">Workflow</Badge>
                    <h2 className="text-heading-xl font-bold text-brand-black">Our Approach</h2>
                    <p className="text-body-md font-semibold text-slate-600">A Simple Approach to International Logistics</p>
                    <p className="text-body-sm text-slate-600">We believe international logistics doesn&apos;t have to be confusing.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {processSteps.map((st) => (
                      <div key={st.step} className="bg-surface border border-border p-5 rounded-md flex gap-4">
                        <div className="font-mono font-bold text-accent-dark text-lg">{st.step}</div>
                        <div className="space-y-1">
                          <div className="font-bold text-brand-black text-body-sm">{st.title}</div>
                          <p className="text-body-xs text-slate-600 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FOR INDIVIDUALS & FOR BUSINESSES */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-8">
                  {/* FOR INDIVIDUALS */}
                  <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-md space-y-4">
                    <h2 className="text-heading-md font-bold text-emerald-950">For Individuals</h2>
                    <h3 className="text-body-md font-semibold text-emerald-900">Shipping Personal Belongings Overseas?</h3>
                    <p className="text-body-sm text-emerald-900 leading-relaxed font-normal">
                      Moving abroad or sending belongings to family in another country can be challenging.
                    </p>
                    <p className="text-body-sm text-emerald-900 leading-relaxed font-normal">
                      Raahi International helps individuals arrange international transportation for eligible{' '}
                      <Link href="/services/excess-baggage" className="font-bold underline text-emerald-950">
                        personal effects, household goods
                      </Link>{' '}
                      and other permitted shipments.
                    </p>
                    <p className="text-body-sm text-emerald-900 leading-relaxed font-normal">
                      We can help you understand your available shipping options and the information required before your shipment is booked.
                    </p>
                  </div>

                  {/* FOR BUSINESSES */}
                  <div className="bg-blue-50/70 border border-blue-200 p-6 rounded-md space-y-4">
                    <h2 className="text-heading-md font-bold text-blue-950">For Businesses</h2>
                    <h3 className="text-body-md font-semibold text-blue-900">International Logistics for Businesses</h3>
                    <p className="text-body-sm text-blue-900 leading-relaxed font-normal">
                      Businesses need dependable ways to move goods across borders.
                    </p>
                    <p className="text-body-sm text-blue-900 leading-relaxed font-normal">
                      Raahi International provides international cargo solutions for businesses that need to transport permitted{' '}
                      <Link href="/services/commercial-cargo" className="font-bold underline text-blue-950">
                        commercial shipments
                      </Link>{' '}
                      from Pakistan to international destinations.
                    </p>
                    <p className="text-body-sm text-blue-900 leading-relaxed font-normal">
                      Whether you are shipping regularly or arranging a one-time commercial shipment, we can help you evaluate air and sea freight options according to your cargo requirements.
                    </p>
                  </div>
                </section>

                {/* OUR COMMITMENT */}
                <section className="space-y-6 border-t border-border pt-8">
                  <div className="space-y-1">
                    <Badge variant="accent" size="sm" className="font-mono uppercase">Values</Badge>
                    <h2 className="text-heading-xl font-bold text-brand-black">Our Commitment</h2>
                    <p className="text-body-md font-semibold text-slate-600">Your Cargo Deserves Care</p>
                  </div>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Every shipment is different. That&apos;s why we focus on understanding the details before arranging transportation.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="font-bold text-brand-black text-body-md">We are committed to:</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-body-sm text-slate-700 font-medium">
                      {[
                        'Clear communication',
                        'Practical shipping solutions',
                        'Proper shipment coordination',
                        'Transparent quotation processes',
                        'Professional customer support',
                        'Responsible handling of shipping requirements',
                        'Helping customers understand the international shipping process',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Our objective is to build long-term relationships by providing a shipping experience customers can rely on.
                  </p>
                </section>
              </div>
            )}
          </main>
        </Container>
      </section>

      {/* 3. FINAL CTA SECTION */}
      <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white text-center">
        <Container size="narrow">
          <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-14 space-y-6 shadow-2xl">
            <Badge variant="accent" size="sm" className="font-mono uppercase font-bold">
              Final Step
            </Badge>

            <h2 className="text-display-md sm:text-display-lg font-bold text-white tracking-tight">
              {sanityAbout?.cta?.title || 'Ready to Ship from Pakistan to the World?'}
            </h2>

            <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              {sanityAbout?.cta?.description ||
                "Whether you're sending personal belongings, household goods or commercial cargo, Raahi International is ready to help you explore your international shipping options."}
            </p>

            <p className="text-body-md text-slate-300">
              Tell us about your shipment and let our team help you find the right solution.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href={sanityAbout?.cta?.quoteHref || '/quote'} className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto font-bold text-base shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  {sanityAbout?.cta?.quoteLabel || 'Get a Shipping Quote'}
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
              <Link href="/quote" className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 font-bold text-base shadow-sm"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
