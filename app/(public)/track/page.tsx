import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrackingViewController } from '@/components/tracking/TrackingViewController';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Track Your Cargo | ${siteConfig.name}`,
  description:
    'Track international cargo shipments, air cargo dispatches, and sea cargo originating in Pakistan.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.domain}/track`,
  },
};

interface TrackPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function PublicTrackingPage({ searchParams }: TrackPageProps) {
  const { ref: rawRef } = await searchParams;

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Track Your Cargo', url: '/track' },
  ];

  return (
    <div className="w-full bg-background text-brand-black py-10 lg:py-16 min-h-[80vh]">
      <Container>
        {/* Compact Hero Header */}
        <div className="space-y-4 max-w-3xl mx-auto mb-8 lg:mb-12 text-center">
          <Breadcrumbs items={breadcrumbs} className="justify-center" />

          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>SHIPMENT TRACKING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-black leading-tight">
              Track your cargo. Know where it stands.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto pt-1">
              Enter your assigned shipment tracking number to view current status milestones, origin-to-destination transit updates, and estimated delivery dates.
            </p>
          </div>
        </div>

        {/* Client Tracking View Controller */}
        <TrackingViewController initialRef={rawRef || ''} />
      </Container>
    </div>
  );
}
