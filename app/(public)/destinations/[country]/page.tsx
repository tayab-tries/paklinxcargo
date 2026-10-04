import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plane, Ship } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import {
  getPublishedDestinations,
  getDestinationBySlug,
  DestinationCountryData,
} from '@/lib/destinations/destination-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { DestinationHero } from '@/components/destinations/DestinationHero';
import { DestinationOverview } from '@/components/destinations/DestinationOverview';
import { DestinationServiceGrid } from '@/components/destinations/DestinationServiceGrid';
import { DestinationOriginGrid } from '@/components/destinations/DestinationOriginGrid';
import { DestinationProcess } from '@/components/destinations/DestinationProcess';
import { DestinationConsiderations } from '@/components/destinations/DestinationConsiderations';
import { DestinationSubCitiesGrid } from '@/components/destinations/DestinationSubCitiesGrid';
import { DestinationGuides } from '@/components/destinations/DestinationGuides';
import { DestinationFaq } from '@/components/destinations/DestinationFaq';
import { DestinationCta } from '@/components/destinations/DestinationCta';
import { getSanityDestinationBySlug, getSanityDestinationsList, SanityDestinationCountryDocument } from '@/sanity/lib/fetch';

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  const sanityDestinations = await getSanityDestinationsList();
  if (sanityDestinations && sanityDestinations.length > 0) {
    return sanityDestinations.map((dest) => ({ country: dest.slug }));
  }
  const publishedDestinations = await getPublishedDestinations();
  return publishedDestinations.map((dest) => ({
    country: dest.slug,
  }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const sanityDestination = await getSanityDestinationBySlug(country, { stega: false });
  const fallbackDestination = await getDestinationBySlug(country);

  if (!sanityDestination && !fallbackDestination) {
    return {
      title: `Destination Not Found | ${siteConfig.name}`,
    };
  }

  const title =
    sanityDestination?.seo?.metaTitle ||
    (fallbackDestination ? `${fallbackDestination.seoTitle} | ${siteConfig.name}` : `Cargo Shipping | ${siteConfig.name}`);

  const description =
    sanityDestination?.seo?.metaDescription ||
    fallbackDestination?.seoDescription ||
    'International cargo shipping services from Pakistan.';

  const canonicalUrl = `${siteConfig.domain}/destinations/${country}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: sanityDestination?.seo?.socialImage ? [{ url: sanityDestination.seo.socialImage }] : [],
    },
  };
}

export default async function CountryDetailPage({ params }: CountryPageProps) {
  const { country } = await params;
  const sanityDestination: SanityDestinationCountryDocument | null = await getSanityDestinationBySlug(country);
  const fallbackDestination = await getDestinationBySlug(country);

  if (!sanityDestination && !fallbackDestination) {
    notFound();
  }

  const destination: DestinationCountryData = {
    id: sanityDestination?._id || fallbackDestination?.id || country,
    name: sanityDestination?.name || fallbackDestination?.name || 'International Country',
    slug: country,
    region: sanityDestination?.region || fallbackDestination?.region || 'Global',
    h1: sanityDestination?.h1 || fallbackDestination?.h1 || `Cargo Services to ${sanityDestination?.name || fallbackDestination?.name}`,
    seoTitle: sanityDestination?.seo?.metaTitle || fallbackDestination?.seoTitle || `Cargo to ${sanityDestination?.name || fallbackDestination?.name}`,
    seoDescription: sanityDestination?.seo?.metaDescription || fallbackDestination?.seoDescription || `Cargo shipping to ${sanityDestination?.name || fallbackDestination?.name}`,
    introduction: sanityDestination?.introduction || fallbackDestination?.introduction || `Cargo shipping to ${sanityDestination?.name || fallbackDestination?.name}`,
    shippingOverview: sanityDestination?.shippingOverview || fallbackDestination?.shippingOverview || '',
    customsGuidance: sanityDestination?.customsGuidance || fallbackDestination?.customsGuidance || '',
    supportedServices: sanityDestination?.supportedServices || fallbackDestination?.supportedServices || ['air-freight', 'sea-cargo'],
    supportedOrigins: sanityDestination?.supportedOrigins || fallbackDestination?.supportedOrigins || ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'faisalabad', 'sialkot', 'multan', 'peshawar'],
    cities:
      sanityDestination?.cities?.map((c) => ({
        id: c._id || c.slug,
        countryId: sanityDestination._id || country,
        name: c.name,
        slug: c.slug,
        h1: c.h1 || `Cargo Services to ${c.name}, ${sanityDestination.name}`,
        seoTitle: c.seo?.metaTitle || `Cargo Shipping to ${c.name}`,
        seoDescription: c.seo?.metaDescription || `Cargo shipping to ${c.name}`,
        introduction: c.introduction || `Cargo shipping to ${c.name}`,
        overview: c.overview || c.introduction,
        preparationConsiderations: c.preparationConsiderations || '',
        deliveryCoverageNotes: '',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      })) || fallbackDestination?.cities || [],
    faqs: sanityDestination?.faqs || fallbackDestination?.faqs || [],
    status: 'published',
    isVerified: true,
    isIndexable: true,
  };

  const countrySlug = country.toLowerCase();
  let airTransitTime = '10–15 Days';
  let seaTransitTime = '1.5–2.5 Months';
  if (countrySlug.includes('uk') || countrySlug.includes('united kingdom')) {
    airTransitTime = '10–12 Days';
    seaTransitTime = '1.5–2.5 Months';
  } else if (countrySlug.includes('uae') || countrySlug.includes('dubai')) {
    airTransitTime = '10–17 Days';
    seaTransitTime = '1.5–2.5 Months';
  } else if (countrySlug.includes('usa') || countrySlug.includes('united states')) {
    airTransitTime = '10–15 Days';
    seaTransitTime = '2–2.5 Months';
  } else if (countrySlug.includes('canada')) {
    airTransitTime = '10–15 Days';
    seaTransitTime = '2–3 Months';
  } else if (countrySlug.includes('saudi') || countrySlug.includes('ksa')) {
    airTransitTime = '10–20 Days';
    seaTransitTime = '1.5–2.5 Months';
  }

  const quoteUrl = `/quote?destination=${destination.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: destination.name, url: `/destinations/${destination.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  const destinationServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `International Cargo Shipping to ${destination.name}`,
    description: destination.seoDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'Country',
      name: destination.name,
    },
    serviceType: 'International Cargo Shipping',
  };

  const faqJsonLd =
    destination.faqs && destination.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: destination.faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="w-full bg-[#FAF8F3] text-[#17201B] font-sans antialiased selection:bg-[#C6A15B]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 1. DESTINATION HERO */}
      <DestinationHero
        countryName={destination.name}
        region={destination.region}
        h1={destination.h1}
        introduction={destination.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. DESTINATION OVERVIEW */}
      <DestinationOverview
        countryName={destination.name}
        shippingOverview={destination.shippingOverview}
      />

      {/* 3. POPULAR DESTINATION CITIES */}
      <DestinationSubCitiesGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        cities={destination.cities}
      />

      {/* 4. AVAILABLE CARGO SERVICES */}
      <DestinationServiceGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        supportedServices={destination.supportedServices}
      />

      {/* 5. AIR VS SEA MODE GUIDANCE FOR THIS COUNTRY */}
      <section className="w-full bg-[#17201B] text-white py-20 lg:py-28 border-b border-[#12372A]">
        <Container>
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase rounded-full inline-block">
                Mode Comparison
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F2E9]">
                Air Cargo vs Sea Cargo to {destination.name}
              </h2>
              <p className="font-sans text-base text-[#F6F2E9]/75">
                Evaluate urgency and weight thresholds for dispatches to {destination.name}.
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
                    Time-sensitive air freight, garments, business samples, and excess baggage to {destination.name}.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">20 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Air Transit</span>
                      <span className="font-bold text-white">{airTransitTime}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/cargo-services#part-1-air-cargo">
                    <span className="font-mono text-xs font-bold text-[#C6A15B] hover:text-white underline">
                      View Air Rates →
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
                    Economical ocean freight for heavy commercial goods, bulk merchandise, and household moves to {destination.name}.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">70–100 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Ocean Transit</span>
                      <span className="font-bold text-white">{seaTransitTime}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/cargo-services#part-2-sea-cargo">
                    <span className="font-mono text-xs font-bold text-[#C6A15B] hover:text-white underline">
                      View Sea Rates →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. PAKISTAN PICKUP ORIGINS */}
      <DestinationOriginGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        supportedOrigins={destination.supportedOrigins}
      />

      {/* 7. INTERNATIONAL DELIVERY PROCESS */}
      <DestinationProcess countryName={destination.name} />

      {/* 8. PREPARATION & CUSTOMS CONSIDERATIONS */}
      <DestinationConsiderations
        countryName={destination.name}
        customsGuidance={destination.customsGuidance}
      />

      {/* 9. GUIDES & RELATED RESOURCES */}
      <DestinationGuides countryName={destination.name} />

      {/* 10. FAQ */}
      <DestinationFaq countryName={destination.name} faqs={destination.faqs} />

      {/* 11. FINAL CONVERSION CTA */}
      <DestinationCta countryName={destination.name} countrySlug={destination.slug} />
    </article>
  );
}
