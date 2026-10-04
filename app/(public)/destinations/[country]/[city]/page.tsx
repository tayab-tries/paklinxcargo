import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plane, Ship } from 'lucide-react';
import { Container } from '@/components/ui/Container';
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
  const supportedOrigins = sanityCity?.country?.supportedOrigins || fallbackResult?.country.supportedOrigins || ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'faisalabad', 'sialkot', 'multan', 'peshawar'];
  const faqs = sanityCity?.country?.faqs || fallbackResult?.country.faqs || [];

  const countryLower = countrySlug.toLowerCase();
  let airTransit = '10–15 Days';
  let seaTransit = '1.5–2.5 Months';
  if (countryLower.includes('uk') || countryLower.includes('united-kingdom')) {
    airTransit = '10–12 Days';
    seaTransit = '1.5–2.5 Months';
  } else if (countryLower.includes('uae') || countryLower.includes('dubai')) {
    airTransit = '10–17 Days';
    seaTransit = '1.5–2.5 Months';
  } else if (countryLower.includes('usa') || countryLower.includes('united-states')) {
    airTransit = '10–15 Days';
    seaTransit = '2–2.5 Months';
  } else if (countryLower.includes('canada')) {
    airTransit = '10–15 Days';
    seaTransit = '2–3 Months';
  } else if (countryLower.includes('saudi') || countryLower.includes('ksa')) {
    airTransit = '10–20 Days';
    seaTransit = '1.5–2.5 Months';
  }

  const quoteUrl = `/quote?destination=${countrySlug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: countryName, url: `/destinations/${countrySlug}` },
    { label: cityName, url: `/destinations/${countrySlug}/${citySlug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

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
    <article className="w-full bg-[#FAF8F3] text-[#17201B] font-sans antialiased selection:bg-[#C6A15B]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 1. HERO (Dark / Editorial) */}
      <DestinationHero
        countryName={countryName}
        cityName={cityName}
        region={region}
        h1={h1}
        introduction={introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. CITY INTRODUCTION & OVERVIEW */}
      <DestinationOverview
        countryName={`${cityName}, ${countryName}`}
        shippingOverview={overview}
      />

      {/* 3. SHIPPING MODES FOR CITY */}
      <section className="w-full bg-[#17201B] text-white py-20 lg:py-28 border-b border-[#12372A]">
        <Container>
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 font-mono text-xs font-bold uppercase rounded-full inline-block">
                Shipping Modes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F2E9]">
                Cargo Modes to {cityName}
              </h2>
              <p className="font-sans text-base text-[#F6F2E9]/75">
                Indicative transit times and weight minimums for shipping to {cityName}, {countryName}.
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
                    Direct airport receiving and express delivery to {cityName}.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">20 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Air Transit</span>
                      <span className="font-bold text-white">{airTransit}</span>
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
                    Economical ocean sea cargo and destination port clearance for {cityName}.
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Minimum Weight</span>
                      <span className="font-bold text-[#C6A15B]">70–100 KG Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Indicative Ocean Transit</span>
                      <span className="font-bold text-white">{seaTransit}</span>
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

      {/* 4. AVAILABLE SERVICES */}
      <DestinationServiceGrid
        countryName={`${cityName}, ${countryName}`}
        countrySlug={countrySlug}
        supportedServices={supportedServices}
      />

      {/* 5. PAKISTAN ORIGIN CITIES */}
      <DestinationOriginGrid
        countryName={`${cityName}, ${countryName}`}
        countrySlug={countrySlug}
        supportedOrigins={supportedOrigins}
      />

      {/* 6. SHIPPING PROCESS */}
      <DestinationProcess countryName={`${cityName}, ${countryName}`} />

      {/* 7. PREPARATION & CUSTOMS CONSIDERATIONS */}
      <DestinationConsiderations
        countryName={`${cityName}, ${countryName}`}
        preparationConsiderations={preparationConsiderations}
      />

      {/* 8. RELATED GUIDES */}
      <DestinationGuides countryName={cityName} />

      {/* 9. FAQ */}
      <DestinationFaq countryName={cityName} faqs={faqs} />

      {/* 10. FINAL CTA */}
      <DestinationCta countryName={`${cityName}, ${countryName}`} countrySlug={countrySlug} />
    </article>
  );
}
