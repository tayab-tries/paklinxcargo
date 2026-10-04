import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { QuoteFormController } from '@/components/quote/QuoteFormController';
import { getPublishedLocations } from '@/lib/locations/location-content';
import { getPublishedStaticDestinations } from '@/lib/destinations/destination-content';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { cargoTypes } from '@/types/content';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Request a Shipping Quote | ${siteConfig.name}`,
  description:
    'Request a custom quotation for air freight, ocean sea cargo, door-to-door shipping, or commercial freight originating in Pakistan.',
  robots: {
    index: true,
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
    getPublishedLocations(),
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
    <div className="w-full bg-background py-10 lg:py-16 text-brand-black">
      <Container>
        {/* Compact Premium Editorial Hero */}
        <div className="max-w-3xl mb-8 lg:mb-12 space-y-4">
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>REQUEST A CARGO QUOTE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-black leading-tight">
              Tell us what you&apos;re shipping.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-1">
              Provide your origin city in Pakistan, destination, cargo specifications, and contact info. Our operations team will review your shipment and issue a custom quotation.
            </p>
          </div>

          <div className="p-3.5 bg-surface-subtle border border-border rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-600">
            <span>Not sure about exact weight, packing, or shipping mode? You can also speak directly with our team.</span>
          </div>
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
