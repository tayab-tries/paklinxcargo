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
import { DestinationOverview } from '@/components/destinations/DestinationOverview';
import { LocationServiceGrid } from '@/components/locations/LocationServiceGrid';
import { LocationDestinationGrid } from '@/components/locations/LocationDestinationGrid';
import { LocationProcess } from '@/components/locations/LocationProcess';
import { DestinationConsiderations } from '@/components/destinations/DestinationConsiderations';
import { LocationGuides } from '@/components/locations/LocationGuides';
import { LocationFaq } from '@/components/locations/LocationFaq';
import { LocationCta } from '@/components/locations/LocationCta';
import { getSanityLocationBySlug, getSanityLocationsList } from '@/sanity/lib/fetch';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

const VERIFIED_PICKUP_CITIES: Record<string, { name: string; province: string; intro: string }> = {
  lahore: {
    name: 'Lahore',
    province: 'Punjab',
    intro: 'Doorstep cargo pickup and export shipping services operating across Lahore district, Gulberg, DHA, Johar Town, and industrial zones.',
  },
  karachi: {
    name: 'Karachi',
    province: 'Sindh',
    intro: 'Port city international cargo collection and export processing connecting Karachi commercial hubs to worldwide air and ocean freight routes.',
  },
  islamabad: {
    name: 'Islamabad',
    province: 'Capital Territory',
    intro: 'Capital region cargo dispatch desk coordinating doorstep collection across Islamabad sectors and diplomatic corridors.',
  },
  rawalpindi: {
    name: 'Rawalpindi',
    province: 'Punjab',
    intro: 'Twin city origin hub providing doorstep collection and cargo handling across Rawalpindi commercial districts.',
  },
  faisalabad: {
    name: 'Faisalabad',
    province: 'Punjab',
    intro: 'Textile export center providing dedicated cargo collection for commercial garments, fabric consignments, and industrial shipments.',
  },
  sialkot: {
    name: 'Sialkot',
    province: 'Punjab',
    intro: 'Export manufacturing hub supporting sports goods, surgical instruments, and leather merchandise international dispatches.',
  },
  multan: {
    name: 'Multan',
    province: 'Punjab',
    intro: 'Southern Punjab origin center connecting agricultural, commercial, and personal baggage cargo dispatches.',
  },
  peshawar: {
    name: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    intro: 'KPK regional dispatch hub coordinating doorstep collection and export processing for northern Pakistan shippers.',
  },
  gujranwala: {
    name: 'Gujranwala',
    province: 'Punjab',
    intro: 'Industrial and manufacturing corridor cargo pickup coordinating export dispatches and doorstep collection across Gujranwala district.',
  },
};

export async function generateStaticParams() {
  const sanityLocations = await getSanityLocationsList();
  if (sanityLocations && sanityLocations.length > 0) {
    return sanityLocations.map((loc) => ({ slug: loc.slug }));
  }
  const publishedLocations = await getPublishedLocations();
  if (publishedLocations && publishedLocations.length > 0) {
    return publishedLocations.map((location) => ({
      slug: location.slug,
    }));
  }
  return Object.keys(VERIFIED_PICKUP_CITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sanityLocation = await getSanityLocationBySlug(slug, { stega: false });
  const fallbackLocation = await getLocationBySlug(slug);
  const verifiedCity = VERIFIED_PICKUP_CITIES[slug];

  if (!sanityLocation && !fallbackLocation && !verifiedCity) {
    return {
      title: `Location Not Found | ${siteConfig.name}`,
    };
  }

  const name = sanityLocation?.name || fallbackLocation?.name || verifiedCity?.name || 'Pakistan City';
  const title =
    sanityLocation?.seo?.metaTitle ||
    fallbackLocation?.seoTitle ||
    `International Cargo Shipping in ${name} | ${siteConfig.name}`;

  const description =
    sanityLocation?.seo?.metaDescription ||
    fallbackLocation?.seoDescription ||
    verifiedCity?.intro ||
    `Doorstep cargo pickup and export dispatch services operating across ${name}.`;

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
  const [sanityLocation, fallbackLocation] = await Promise.all([
    getSanityLocationBySlug(slug),
    getLocationBySlug(slug),
  ]);

  const verifiedCity = VERIFIED_PICKUP_CITIES[slug];

  if (!sanityLocation && !fallbackLocation && !verifiedCity) {
    notFound();
  }

  const cityName = sanityLocation?.name || fallbackLocation?.name || verifiedCity?.name || 'Pakistan City';
  const cityProvince = sanityLocation?.province || fallbackLocation?.province || verifiedCity?.province || 'Pakistan';
  const cityIntro =
    sanityLocation?.introduction ||
    fallbackLocation?.introduction ||
    verifiedCity?.intro ||
    `Doorstep cargo pickup and export dispatch services operating across ${cityName}.`;

  const location: LocationData = {
    id: sanityLocation?._id || fallbackLocation?.id || slug,
    name: cityName,
    slug,
    province: cityProvince,
    h1: sanityLocation?.h1 || fallbackLocation?.h1 || `International Cargo Pickup from ${cityName}`,
    seoTitle: sanityLocation?.seo?.metaTitle || fallbackLocation?.seoTitle || `Cargo Shipping ${cityName}`,
    seoDescription: sanityLocation?.seo?.metaDescription || fallbackLocation?.seoDescription || cityIntro,
    introduction: cityIntro,
    serviceAvailable: sanityLocation?.serviceAvailable ?? fallbackLocation?.serviceAvailable ?? true,
    collectionAvailable: sanityLocation?.collectionAvailable ?? fallbackLocation?.collectionAvailable ?? true,
    hasPhysicalBranch: sanityLocation?.hasPhysicalBranch ?? fallbackLocation?.hasPhysicalBranch ?? false,
    branchAddress: sanityLocation?.branchAddress || fallbackLocation?.branchAddress || '',
    localCoverageText: sanityLocation?.localCoverageText || fallbackLocation?.localCoverageText || '',
    supportedServices: sanityLocation?.supportedServices || fallbackLocation?.supportedServices || ['air-freight', 'sea-cargo'],
    supportedDestinations: fallbackLocation?.supportedDestinations || ['uk', 'uae', 'usa', 'canada', 'ksa'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: sanityLocation?.faqs || fallbackLocation?.faqs || [
      {
        question: `How does cargo pickup work in ${cityName}?`,
        answer: `Scheduled doorstep pickup is arranged from your address in ${cityName}. Weight measurement, packing verification, and export paperwork assistance are completed prior to dispatch.`,
      },
      {
        question: `What services are supported for shipments originating in ${cityName}?`,
        answer: `Both express Air Cargo (minimum 20 KG) and ocean Sea Freight (minimum 70–100 KG) services are supported for dispatch from ${cityName}.`,
      },
    ],
    sections: fallbackLocation?.sections,
  };

  const quoteUrl = `/quote?origin=${location.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: location.name, url: `/locations/${location.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

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
    <article className="w-full bg-[#FAF8F3] text-[#17201B] font-sans antialiased selection:bg-[#C6A15B]/30">
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

      {/* 1. EDITORIAL HERO */}
      <LocationHero
        cityName={location.name}
        province={location.province}
        h1={location.h1}
        introduction={location.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. LOCAL PICKUP OVERVIEW */}
      <DestinationOverview
        countryName={location.name}
        shippingOverview={location.introduction}
      />

      {/* 3. SERVICES AVAILABLE IN CITY */}
      <LocationServiceGrid
        cityName={location.name}
        supportedServices={location.supportedServices}
      />

      {/* 4. FROM CITY TO INTERNATIONAL DESTINATIONS */}
      <LocationDestinationGrid
        cityName={location.name}
        supportedDestinations={location.supportedDestinations}
      />

      {/* 5. PICKUP PROCESS */}
      <LocationProcess cityName={location.name} />

      {/* 6. WHAT TO PREPARE / CUSTOMS & DOCUMENTATION */}
      <DestinationConsiderations
        countryName={location.name}
        preparationConsiderations="Ensure all packages have itemized contents lists and accurate recipient details prepared prior to collection."
      />

      {/* 7. RELATED GUIDES */}
      <LocationGuides cityName={location.name} />

      {/* 8. FAQ */}
      <LocationFaq cityName={location.name} faqs={location.faqs} />

      {/* 9. FINAL CONVERSION CTA */}
      <LocationCta cityName={location.name} slug={location.slug} />
    </article>
  );
}
