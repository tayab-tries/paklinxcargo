import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedStaticDestinations,
  getStaticDestinationCity,
} from '@/lib/destinations/destination-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { DestinationHero } from '@/components/destinations/DestinationHero';
import { DestinationOverview } from '@/components/destinations/DestinationOverview';
import { DestinationServiceGrid } from '@/components/destinations/DestinationServiceGrid';
import { DestinationOriginGrid } from '@/components/destinations/DestinationOriginGrid';
import { DestinationProcess } from '@/components/destinations/DestinationProcess';
import { DestinationConsiderations } from '@/components/destinations/DestinationConsiderations';
import { DestinationGuides } from '@/components/destinations/DestinationGuides';
import { DestinationFaq } from '@/components/destinations/DestinationFaq';
import { DestinationCta } from '@/components/destinations/DestinationCta';
import { getSanityDestinationCityBySlugs, getSanityDestinationsList } from '@/sanity/lib/fetch';

interface CityPageProps {
  params: Promise<{ country: string; city: string }>;
}

/**
 * Pre-render static params for published destination city routes.
 */
export async function generateStaticParams() {
  const sanityDestinations = await getSanityDestinationsList();
  if (sanityDestinations && sanityDestinations.length > 0) {
    const params: Array<{ country: string; city: string }> = [];
    for (const country of sanityDestinations) {
      if (country.cities) {
        for (const city of country.cities) {
          params.push({
            country: country.slug,
            city: city.slug,
          });
        }
      }
    }
    if (params.length > 0) return params;
  }

  const publishedCountries = getPublishedStaticDestinations();
  const params: Array<{ country: string; city: string }> = [];

  for (const country of publishedCountries) {
    for (const city of country.cities) {
      if (city.status === 'published' && city.isVerified === true && city.isIndexable === true) {
        params.push({
          country: country.slug,
          city: city.slug,
        });
      }
    }
  }

  return params;
}

/**
 * Dynamic metadata generator for destination city pages.
 */
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;
  const sanityCity = await getSanityDestinationCityBySlugs(countrySlug, citySlug, { stega: false });
  const fallbackResult = getStaticDestinationCity(countrySlug, citySlug);

  if (!sanityCity && !fallbackResult) {
    return {
      title: `Destination City Not Found | ${siteConfig.name}`,
    };
  }

  const cityName = sanityCity?.name || fallbackResult?.city.name || citySlug;
  const countryName = sanityCity?.country?.name || fallbackResult?.country.name || countrySlug;

  const title =
    sanityCity?.seo?.metaTitle ||
    (fallbackResult ? `${fallbackResult.city.seoTitle} | ${siteConfig.name}` : `Cargo to ${cityName}, ${countryName} | ${siteConfig.name}`);

  const description =
    sanityCity?.seo?.metaDescription ||
    fallbackResult?.city.seoDescription ||
    `Cargo shipping services to ${cityName}, ${countryName}.`;

  const canonicalUrl = `${siteConfig.domain}/destinations/${countrySlug}/${citySlug}`;

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
      images: sanityCity?.seo?.socialImage ? [{ url: sanityCity.seo.socialImage }] : [],
    },
  };
}

export default async function DestinationCityDetailPage({ params }: CityPageProps) {
  const { country: countrySlug, city: citySlug } = await params;
  const sanityCity = await getSanityDestinationCityBySlugs(countrySlug, citySlug);
  const fallbackResult = getStaticDestinationCity(countrySlug, citySlug);

  // Authoritative Publication Check
  if (!sanityCity && !fallbackResult) {
    notFound();
  }

  const countryName = sanityCity?.country?.name || fallbackResult?.country.name || countrySlug;
  const cityName = sanityCity?.name || fallbackResult?.city.name || citySlug;
  const region = sanityCity?.country?.region || fallbackResult?.country.region || 'Global';
  const h1 = sanityCity?.h1 || fallbackResult?.city.h1 || `Cargo Services to ${cityName}, ${countryName}`;
  const introduction = sanityCity?.introduction || fallbackResult?.city.introduction || `Cargo shipping to ${cityName}, ${countryName}.`;
  const overview = sanityCity?.overview || fallbackResult?.city.overview || introduction;
  const preparationConsiderations =
    sanityCity?.preparationConsiderations ||
    fallbackResult?.city.preparationConsiderations ||
    fallbackResult?.city.deliveryCoverageNotes ||
    '';

  const supportedServices = sanityCity?.country?.supportedServices || fallbackResult?.country.supportedServices || ['air-freight', 'sea-cargo'];
  const supportedOrigins = sanityCity?.country?.supportedOrigins || fallbackResult?.country.supportedOrigins || ['lahore', 'karachi', 'islamabad'];
  const faqs = sanityCity?.country?.faqs || fallbackResult?.country.faqs || [];

  const quoteUrl = `/quote?destination=${countrySlug}`;

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: countryName, url: `/destinations/${countrySlug}` },
    { label: cityName, url: `/destinations/${countrySlug}/${citySlug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for destination city page
  const cityServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cargo & Shipping Services to ${cityName}, ${countryName}`,
    description: sanityCity?.seo?.metaDescription || fallbackResult?.city.seoDescription || `Cargo shipping to ${cityName}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'Country',
        name: countryName,
      },
    },
    serviceType: 'International Cargo Shipping',
  };

  return (
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 01 HERO (Dark / Photo-led) */}
      <DestinationHero
        countryName={countryName}
        cityName={cityName}
        region={region}
        h1={h1}
        introduction={introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 02 OVERVIEW (LIGHT) */}
      <DestinationOverview
        countryName={`${cityName}, ${countryName}`}
        shippingOverview={overview}
      />

      {/* 03 AVAILABLE SERVICES (LIGHT / WHITE - Inherited from parent country) */}
      <DestinationServiceGrid
        countryName={`${cityName}, ${countryName}`}
        countrySlug={countrySlug}
        supportedServices={supportedServices}
      />

      {/* 04 PAKISTAN ORIGIN CITIES (WHITE - Inherited from parent country) */}
      <DestinationOriginGrid
        countryName={`${cityName}, ${countryName}`}
        countrySlug={countrySlug}
        supportedOrigins={supportedOrigins}
      />

      {/* 05 SHIPPING PROCESS (LIGHT) */}
      <DestinationProcess countryName={`${cityName}, ${countryName}`} />

      {/* 06 PREPARATION / CUSTOMS / DELIVERY NOTES (WHITE) */}
      <DestinationConsiderations
        countryName={`${cityName}, ${countryName}`}
        preparationConsiderations={preparationConsiderations}
      />

      {/* 07 GUIDES (WHITE) */}
      <DestinationGuides countryName={cityName} />

      {/* 08 FAQ (LIGHT) */}
      <DestinationFaq countryName={cityName} faqs={faqs} />

      {/* 09 CTA (BLACK) */}
      <DestinationCta countryName={`${cityName}, ${countryName}`} countrySlug={countrySlug} />
    </article>
  );
}
