import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { EditorialIntroSection } from '@/components/sections/EditorialIntroSection';
import { QuickQuoteTeaser } from '@/components/sections/QuickQuoteTeaser';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { RegistrationsSection } from '@/components/sections/RegistrationsSection';
import { TrustedMarketSection } from '@/components/sections/TrustedMarketSection';
import { PakistanReachSection } from '@/components/sections/PakistanReachSection';
import { DestinationShowcase } from '@/components/sections/DestinationShowcase';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getPublishedHomepageBlocks } from '@/lib/cms/homepage.service';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanityHomepageData, getSanitySiteSettingsData } from '@/sanity/lib/fetch';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const [sanityHomepage, sanitySiteSettings] = await Promise.all([
    getSanityHomepageData({ stega: false }),
    getSanitySiteSettingsData({ stega: false }),
  ]);

  const title =
    sanityHomepage?.seo?.metaTitle ||
    sanitySiteSettings?.defaultSeoTitle ||
    `${siteConfig.name} — Cargo Shipping & Door-to-Door Delivery From Pakistan`;

  const description =
    sanityHomepage?.seo?.metaDescription ||
    sanitySiteSettings?.defaultSeoDescription ||
    'Reliable air cargo and sea cargo shipping with doorstep pickup across Pakistan and door-to-door delivery to UK, UAE, USA, Canada, KSA & worldwide.';

  const socialImage =
    sanityHomepage?.seo?.socialImage ||
    sanitySiteSettings?.defaultSocialImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: socialImage ? [{ url: socialImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: socialImage ? [socialImage] : [],
    },
  };
}

export default async function HomePage() {
  const [blocks, business, sanityHomepage, sanitySiteSettings] = await Promise.all([
    getPublishedHomepageBlocks(),
    getPublishedBusinessSettings(),
    getSanityHomepageData(),
    getSanitySiteSettingsData(),
  ]);

  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName || siteConfig.name,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/images/brand/logo.png`,
    ...(business.phonePrimary ? { telephone: business.phonePrimary } : {}),
    ...(business.emailInfo ? { email: business.emailInfo } : {}),
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.domain,
  };

  return (
    <div className="w-full pb-16 sm:pb-0 bg-[#F6F2E9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* 01. IMMERSIVE HERO */}
      {blocks.hero?.enabled && (
        <HeroSection
          blockData={blocks.hero.contentData}
          sanityHeroData={sanityHomepage?.hero}
          heroFeatureChips={sanityHomepage?.heroFeatureChips}
          whatsappNumber={activeWhatsapp}
        />
      )}

      {/* 02. EDITORIAL INTRO STATEMENT */}
      <EditorialIntroSection brandName={business.brandName || sanitySiteSettings?.businessName} />

      {/* 03. QUICK QUOTE / ENTRY ACTION */}
      {blocks.quick_quote?.enabled && (
        <QuickQuoteTeaser
          heading={sanityHomepage?.quickQuote?.heading}
          description={sanityHomepage?.quickQuote?.description}
          ctaText={sanityHomepage?.quickQuote?.ctaText}
          blockData={blocks.quick_quote.contentData}
        />
      )}

      {/* 04. CUSTOMER USE CASES / WHAT CAN YOU SEND */}
      {blocks.use_cases?.enabled !== false && (
        <UseCasesSection
          badge={sanityHomepage?.whatCanYouSend?.badge}
          heading={sanityHomepage?.whatCanYouSend?.heading}
          description={sanityHomepage?.whatCanYouSend?.description}
          items={sanityHomepage?.whatCanYouSend?.items}
          blockData={blocks.use_cases?.contentData}
        />
      )}

      {/* 05. CORE SERVICES (AIR + SEA CARGO ONLY) */}
      {blocks.services?.enabled && (
        <ServicesOverview
          badge={sanityHomepage?.servicesOverview?.badge}
          heading={sanityHomepage?.servicesOverview?.heading}
          description={sanityHomepage?.servicesOverview?.description}
          airCargo={sanityHomepage?.servicesOverview?.airCargo}
          seaCargo={sanityHomepage?.servicesOverview?.seaCargo}
          blockData={blocks.services.contentData}
        />
      )}

      {/* 06. OFFICIAL REGISTRATIONS & ASSOCIATIONS */}
      {blocks.registrations_associations?.enabled !== false && (
        <RegistrationsSection
          heading={sanityHomepage?.registrations?.heading}
          items={sanityHomepage?.registrations?.items}
          blockData={blocks.registrations_associations?.contentData}
        />
      )}

      {/* 07. TRUSTED BY THE MARKET (CLIENT CAROUSEL) */}
      {blocks.trusted_market?.enabled !== false && (
        <TrustedMarketSection
          heading={sanityHomepage?.trustedMarket?.heading}
          items={sanityHomepage?.trustedMarket?.items}
          blockData={blocks.trusted_market?.contentData}
        />
      )}

      {/* 08. PAKISTAN COVERAGE / PICKUP CITIES */}
      {blocks.locations?.enabled && (
        <PakistanReachSection
          badge={sanityHomepage?.pickupCities?.badge}
          heading={sanityHomepage?.pickupCities?.heading}
          description={sanityHomepage?.pickupCities?.description}
          cities={sanityHomepage?.pickupCities?.cities}
          blockData={blocks.locations.contentData}
        />
      )}

      {/* 09. POPULAR DESTINATIONS */}
      {blocks.destinations?.enabled && (
        <DestinationShowcase
          badge={sanityHomepage?.popularDestinations?.badge}
          heading={sanityHomepage?.popularDestinations?.heading}
          description={sanityHomepage?.popularDestinations?.description}
          destinations={sanityHomepage?.popularDestinations?.destinations}
          blockData={blocks.destinations.contentData}
        />
      )}

      {/* 10. PROCESS / HOW IT WORKS */}
      {blocks.process?.enabled && (
        <ProcessSection
          badge={sanityHomepage?.howItWorks?.badge}
          heading={sanityHomepage?.howItWorks?.heading}
          description={sanityHomepage?.howItWorks?.description}
          steps={sanityHomepage?.howItWorks?.steps}
          blockData={blocks.process.contentData}
        />
      )}

      {/* 11. TRUST / RELIABILITY */}
      {blocks.trust?.enabled && (
        <TrustSection
          badge={sanityHomepage?.trustMetrics ? 'Reliability' : undefined}
          metrics={sanityHomepage?.trustMetrics}
          blockData={blocks.trust.contentData}
        />
      )}

      {/* 12. TESTIMONIALS / DELIVERY PROOF */}
      <TestimonialsSection
        badge={sanityHomepage?.testimonials?.badge}
        heading={sanityHomepage?.testimonials?.heading}
        description={sanityHomepage?.testimonials?.description}
        items={sanityHomepage?.testimonials?.items}
      />

      {/* 13. FAQ */}
      {blocks.faq?.enabled && (
        <FaqSection
          badge={sanityHomepage?.faq?.badge}
          title={sanityHomepage?.faq?.heading}
          subtitle={sanityHomepage?.faq?.description}
          faqs={sanityHomepage?.faq?.items}
          blockData={blocks.faq.contentData}
          whatsappNumber={activeWhatsapp}
        />
      )}

      {/* 14. FINAL CTA */}
      {blocks.cta?.enabled && (
        <FinalCtaSection
          eyebrow={sanityHomepage?.finalCta?.eyebrow}
          heading={sanityHomepage?.finalCta?.heading}
          description={sanityHomepage?.finalCta?.description}
          primaryCta={sanityHomepage?.finalCta?.primaryCta}
          secondaryCta={sanityHomepage?.finalCta?.secondaryCta}
          blockData={blocks.cta.contentData}
          whatsappNumber={activeWhatsapp}
        />
      )}
    </div>
  );
}
