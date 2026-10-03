import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

/**
 * Pre-render static params for published country destination routes.
 */
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

/**
 * Dynamic metadata generator for country destination pages.
 */
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

  // Authoritative Verification Check
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
    supportedOrigins: sanityDestination?.supportedOrigins || fallbackDestination?.supportedOrigins || [],
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

  const quoteUrl = `/quote?destination=${destination.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: destination.name, url: `/destinations/${destination.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for country page
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

  // FAQ Schema if visible FAQ content exists
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
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
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

      {/* 01 HERO (Dark / Photo-led) */}
      <DestinationHero
        countryName={destination.name}
        region={destination.region}
        h1={destination.h1}
        introduction={destination.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 02 OVERVIEW (LIGHT) */}
      <DestinationOverview
        countryName={destination.name}
        shippingOverview={destination.shippingOverview}
      />

      {/* 03 AVAILABLE SERVICES (LIGHT / WHITE) */}
      <DestinationServiceGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        supportedServices={destination.supportedServices}
      />

      {/* 04 PAKISTAN ORIGIN CITIES (WHITE) */}
      <DestinationOriginGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        supportedOrigins={destination.supportedOrigins}
      />

      {/* 05 SHIPPING PROCESS (LIGHT) */}
      <DestinationProcess countryName={destination.name} />

      {/* 06 PREPARATION / CUSTOMS (WHITE) */}
      <DestinationConsiderations
        countryName={destination.name}
        customsGuidance={destination.customsGuidance}
      />

      {/* 07 DESTINATION CITIES (LIGHT) */}
      <DestinationSubCitiesGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        cities={destination.cities}
      />

      {/* 08 GUIDES (WHITE) */}
      <DestinationGuides countryName={destination.name} />

      {/* 09 FAQ (LIGHT) */}
      <DestinationFaq countryName={destination.name} faqs={destination.faqs} />

      {/* 10 CTA (BLACK) */}
      <DestinationCta countryName={destination.name} countrySlug={destination.slug} />
    </article>
  );
}
