import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedLocations,
  getLocationBySlug,
  LocationData,
} from '@/lib/locations/location-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { LocationHero } from '@/components/locations/LocationHero';
import { OperationalBadge } from '@/components/locations/OperationalBadge';
import { LocationServiceGrid } from '@/components/locations/LocationServiceGrid';
import { LocationDestinationGrid } from '@/components/locations/LocationDestinationGrid';
import { LocationBlogArticle } from '@/components/locations/LocationBlogArticle';
import { LocationProcess } from '@/components/locations/LocationProcess';
import { LocationGuides } from '@/components/locations/LocationGuides';
import { LocationCta } from '@/components/locations/LocationCta';
import { getSanityLocationBySlug, getSanityLocationsList, getSanitySiteSettingsData } from '@/sanity/lib/fetch';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render static params for published location routes.
 */
export async function generateStaticParams() {
  const sanityLocations = await getSanityLocationsList();
  if (sanityLocations && sanityLocations.length > 0) {
    return sanityLocations.map((loc) => ({ slug: loc.slug }));
  }
  const publishedLocations = await getPublishedLocations();
  return publishedLocations.map((location) => ({
    slug: location.slug,
  }));
}

/**
 * Dynamic metadata generator for city location pages.
 */
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sanityLocation = await getSanityLocationBySlug(slug, { stega: false });
  const fallbackLocation = await getLocationBySlug(slug);

  if (!sanityLocation && !fallbackLocation) {
    return {
      title: `Location Not Found | ${siteConfig.name}`,
    };
  }

  const title =
    sanityLocation?.seo?.metaTitle ||
    fallbackLocation?.seoTitle ||
    `Cargo Shipping ${fallbackLocation?.name || ''} | ${siteConfig.name}`;

  const description =
    sanityLocation?.seo?.metaDescription ||
    fallbackLocation?.seoDescription ||
    'International cargo shipping services from Pakistan.';

  const canonicalUrl = `${siteConfig.domain}/locations/${slug}`;

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
      images: sanityLocation?.seo?.socialImage ? [{ url: sanityLocation.seo.socialImage }] : [],
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const [sanityLocation, fallbackLocation, business, sanitySiteSettings] = await Promise.all([
    getSanityLocationBySlug(slug),
    getLocationBySlug(slug),
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  // Authoritative Verification Check
  if (!sanityLocation && !fallbackLocation) {
    notFound();
  }

  const activePhone = sanitySiteSettings?.phone || business?.phonePrimary;
  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business?.whatsappNumber;

  const location: LocationData = {
    id: sanityLocation?._id || fallbackLocation?.id || slug,
    name: sanityLocation?.name || fallbackLocation?.name || 'Pakistan City',
    slug,
    province: sanityLocation?.province || fallbackLocation?.province || 'Pakistan',
    h1: sanityLocation?.h1 || fallbackLocation?.h1 || `Cargo Services in ${sanityLocation?.name || fallbackLocation?.name}`,
    seoTitle: sanityLocation?.seo?.metaTitle || fallbackLocation?.seoTitle || `Cargo Shipping ${sanityLocation?.name || fallbackLocation?.name}`,
    seoDescription: sanityLocation?.seo?.metaDescription || fallbackLocation?.seoDescription || `Cargo shipping in ${sanityLocation?.name || fallbackLocation?.name}`,
    introduction: sanityLocation?.introduction || fallbackLocation?.introduction || `Cargo shipping services operating across ${sanityLocation?.name || fallbackLocation?.name}.`,
    serviceAvailable: sanityLocation?.serviceAvailable ?? fallbackLocation?.serviceAvailable ?? true,
    collectionAvailable: sanityLocation?.collectionAvailable ?? fallbackLocation?.collectionAvailable ?? true,
    hasPhysicalBranch: sanityLocation?.hasPhysicalBranch ?? fallbackLocation?.hasPhysicalBranch ?? false,
    branchAddress: sanityLocation?.branchAddress || fallbackLocation?.branchAddress || '',
    localCoverageText: sanityLocation?.localCoverageText || fallbackLocation?.localCoverageText || '',
    supportedServices: sanityLocation?.supportedServices || fallbackLocation?.supportedServices || ['air-freight', 'sea-cargo'],
    supportedDestinations: fallbackLocation?.supportedDestinations || [],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: sanityLocation?.faqs || fallbackLocation?.faqs || [],
    sections: sanityLocation?.sections || fallbackLocation?.sections,
  };

  const quoteUrl = `/quote?origin=${location.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: location.name, url: `/locations/${location.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for location page
  const locationServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `International Cargo Shipping in ${location.name}`,
    description: location.seoDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
    },
    serviceType: 'International Cargo Shipping',
  };

  // LocalBusiness schema rendered ONLY if verified physical branch exists
  const localBusinessJsonLd =
    location.hasPhysicalBranch && location.branchAddress
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: `${siteConfig.name} - ${location.name} Branch`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: location.name,
            streetAddress: location.branchAddress,
            addressCountry: 'PK',
          },
        }
      : null;

  return (
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {localBusinessJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      )}

      {/* 1. Location Hero Block */}
      <LocationHero
        cityName={location.name}
        province={location.province}
        h1={location.h1}
        introduction={location.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Fact-Based Operational Status Indicator */}
      <OperationalBadge
        cityName={location.name}
        hasPhysicalBranch={location.hasPhysicalBranch}
        branchAddress={location.branchAddress}
        collectionAvailable={location.collectionAvailable}
        serviceAvailable={location.serviceAvailable}
      />

      {/* 3. Available Cargo Services Grid */}
      <LocationServiceGrid
        cityName={location.name}
        supportedServices={location.supportedServices}
      />

      {/* 4. Editorial Blog Article Layout with In-Depth Content, Bullets, Links & Full Q&A FAQs */}
      <LocationBlogArticle
        cityName={location.name}
        introduction={location.introduction}
        localCoverageText={location.localCoverageText}
        sections={location.sections}
        faqs={location.faqs}
        phone={activePhone}
        whatsappNumber={activeWhatsapp}
      />

      {/* 5. Supported Destination Countries Grid */}
      <LocationDestinationGrid
        cityName={location.name}
        supportedDestinations={location.supportedDestinations}
      />

      {/* 6. Origin Dispatch Process Workflow */}
      <LocationProcess cityName={location.name} />

      {/* 7. Related Educational Guides */}
      <LocationGuides cityName={location.name} />

      {/* 8. Origin-Specific Quote Conversion CTA */}
      <LocationCta cityName={location.name} slug={location.slug} />
    </article>
  );
}
