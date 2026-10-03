import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { QuoteFormController } from '@/components/quote/QuoteFormController';
import { getPublishedStaticLocations } from '@/lib/locations/location-content';
import { getPublishedStaticDestinations } from '@/lib/destinations/destination-content';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { cargoTypes } from '@/types/content';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Request a Shipping Quote | ${siteConfig.name}`,
  description:
    'Request a custom quotation for air freight, ocean sea cargo, door-to-door shipping, or commercial freight originating in Pakistan.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.domain}/quote`,
  },
};

interface QuotePageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    cargo?: string;
  }>;
}

export default async function PublicQuotePage({ searchParams }: QuotePageProps) {
  const { origin: rawOrigin, destination: rawDestination, cargo: rawCargo } = await searchParams;

  const [publishedLocations, publishedDestinations, business] = await Promise.all([
    getPublishedStaticLocations(),
    getPublishedStaticDestinations(),
    getPublishedBusinessSettings(),
  ]);

  // Validate prefill origin query param
  const validOrigin = publishedLocations.some((l) => l.slug === rawOrigin)
    ? rawOrigin
    : undefined;

  // Validate prefill destination query param
  const validDestination = publishedDestinations.some((d) => d.slug === rawDestination)
    ? rawDestination
    : undefined;

  // Safe Cargo Type prefill mapping
  const cargoSlugMap: Record<string, string> = {
    'air-freight': 'air_freight',
    'sea-cargo': 'sea_cargo',
    'door-to-door': 'door_to_door',
    'commercial-cargo': 'commercial_freight',
    'excess-baggage': 'excess_baggage',
  };

  const normalizedCargoKey = rawCargo ? cargoSlugMap[rawCargo] || rawCargo : undefined;

  const validCargo = (cargoTypes as readonly string[]).includes(normalizedCargoKey || '')
    ? normalizedCargoKey
    : undefined;

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Request a Quote', url: '/quote' },
  ];

  return (
    <div className="w-full bg-background py-12 lg:py-16 text-brand-black">
      <Container>
        {/* Header & Breadcrumbs */}
        <div className="space-y-4 max-w-3xl mb-10">
          <Breadcrumbs items={breadcrumbs} />
          <SectionHeading
            badge="Export Rate Request"
            title="Request a Shipping Quote"
            subtitle="Complete the three-step quotation form below. Our operations team will evaluate your cargo specifications and issue an official quote."
          />
        </div>

        {/* 65/35 Quote Form Controller */}
        <QuoteFormController
          initialOrigin={validOrigin}
          initialDestination={validDestination}
          initialCargo={validCargo}
          locations={publishedLocations.map((l) => ({ name: l.name, slug: l.slug }))}
          destinations={publishedDestinations.map((d) => ({ name: d.name, slug: d.slug }))}
          whatsappNumber={business.whatsappNumber}
        />
      </Container>
    </div>
  );
}
