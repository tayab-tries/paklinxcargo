import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
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

export async function generateMetadata(): Promise<Metadata> {
  const [sanityHomepage, sanitySiteSettings] = await Promise.all([
    getSanityHomepageData({ stega: false }),
    getSanitySiteSettingsData({ stega: false }),
  ]);

  const title =
    sanityHomepage?.seo?.metaTitle ||
    sanitySiteSettings?.defaultSeoTitle ||
    'Raahi International — Cargo Shipping & Door-to-Door Delivery From Pakistan';

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

  return (
    <div className="w-full pb-16 sm:pb-0">
      {/* 01. HERO */}
      {blocks.hero?.enabled && (
        <HeroSection
          blockData={blocks.hero.contentData}
          sanityHeroData={sanityHomepage?.hero}
          heroFeatureChips={sanityHomepage?.heroFeatureChips}
          whatsappNumber={activeWhatsapp}
        />
      )}

      {/* 02. QUICK QUOTE / ENTRY ACTION */}
      {blocks.quick_quote?.enabled && (
        <QuickQuoteTeaser
          heading={sanityHomepage?.quickQuote?.heading}
          description={sanityHomepage?.quickQuote?.description}
          ctaText={sanityHomepage?.quickQuote?.ctaText}
          blockData={blocks.quick_quote.contentData}
        />
      )}

      {/* 03. CUSTOMER USE CASES / WHAT CAN YOU SEND */}
      {blocks.use_cases?.enabled !== false && (
        <UseCasesSection
          badge={sanityHomepage?.whatCanYouSend?.badge}
          heading={sanityHomepage?.whatCanYouSend?.heading}
          description={sanityHomepage?.whatCanYouSend?.description}
          items={sanityHomepage?.whatCanYouSend?.items}
          blockData={blocks.use_cases?.contentData}
        />
      )}

      {/* 04. CORE SERVICES (AIR + SEA CARGO ONLY) */}
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

      {/* 05. OFFICIAL REGISTRATIONS & ASSOCIATIONS */}
      {blocks.registrations_associations?.enabled !== false && (
        <RegistrationsSection
          heading={sanityHomepage?.registrations?.heading}
          items={sanityHomepage?.registrations?.items}
          blockData={blocks.registrations_associations?.contentData}
        />
      )}

      {/* 06. TRUSTED BY THE MARKET (CLIENT CAROUSEL) */}
      {blocks.trusted_market?.enabled !== false && (
        <TrustedMarketSection
          heading={sanityHomepage?.trustedMarket?.heading}
          items={sanityHomepage?.trustedMarket?.items}
          blockData={blocks.trusted_market?.contentData}
        />
      )}

      {/* 07. PAKISTAN COVERAGE / PICKUP CITIES */}
      {blocks.locations?.enabled && (
        <PakistanReachSection
          badge={sanityHomepage?.pickupCities?.badge}
          heading={sanityHomepage?.pickupCities?.heading}
          description={sanityHomepage?.pickupCities?.description}
          cities={sanityHomepage?.pickupCities?.cities}
          blockData={blocks.locations.contentData}
        />
      )}

      {/* 08. POPULAR DESTINATIONS */}
      {blocks.destinations?.enabled && (
        <DestinationShowcase
          badge={sanityHomepage?.popularDestinations?.badge}
          heading={sanityHomepage?.popularDestinations?.heading}
          description={sanityHomepage?.popularDestinations?.description}
          destinations={sanityHomepage?.popularDestinations?.destinations}
          blockData={blocks.destinations.contentData}
        />
      )}

      {/* 09. PROCESS / HOW IT WORKS */}
      {blocks.process?.enabled && (
        <ProcessSection
          badge={sanityHomepage?.howItWorks?.badge}
          heading={sanityHomepage?.howItWorks?.heading}
          description={sanityHomepage?.howItWorks?.description}
          steps={sanityHomepage?.howItWorks?.steps}
          blockData={blocks.process.contentData}
        />
      )}

      {/* 10. TRUST / RELIABILITY */}
      {blocks.trust?.enabled && (
        <TrustSection
          badge={sanityHomepage?.trustMetrics ? 'Reliability' : undefined}
          metrics={sanityHomepage?.trustMetrics}
          blockData={blocks.trust.contentData}
        />
      )}

      {/* 11. TESTIMONIALS / DELIVERY PROOF */}
      <TestimonialsSection
        badge={sanityHomepage?.testimonials?.badge}
        heading={sanityHomepage?.testimonials?.heading}
        description={sanityHomepage?.testimonials?.description}
        items={sanityHomepage?.testimonials?.items}
      />

      {/* 12. FAQ */}
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

      {/* 13. FINAL CTA */}
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
