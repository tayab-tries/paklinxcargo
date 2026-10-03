import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrackingViewController } from '@/components/tracking/TrackingViewController';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Track Your Cargo | ${siteConfig.name}`,
  description:
    'Track international cargo shipments, air cargo dispatches, and sea cargo originating in Pakistan.',
  robots: {
    index: false,
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
    <div className="w-full bg-brand-black text-white py-12 lg:py-16 min-h-[80vh]">
      <Container>
        {/* Compact Hero Header */}
        <div className="space-y-4 max-w-3xl mx-auto mb-10 text-center">
          <Breadcrumbs items={breadcrumbs} className="justify-center text-slate-400" />
          <SectionHeading
            badge="CARGO TRACKING"
            title="TRACK YOUR CARGO"
            subtitle="Enter your tracking number to check the latest status and delivery updates."
            className="[&_h2]:text-white [&_p]:text-slate-300"
            align="center"
            badgeVariant="outline-dark"
          />
        </div>

        {/* Client Tracking View Controller */}
        <TrackingViewController initialRef={rawRef || ''} />
      </Container>
    </div>
  );
};
