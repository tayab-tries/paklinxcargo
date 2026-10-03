import React from 'react';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { DestinationShowcase } from '@/components/sections/DestinationShowcase';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const LocationServiceGrid: React.FC<{ cityName: string; supportedServices?: string[] }> = () => (
  <ServicesOverview />
);

export const LocationDestinationGrid: React.FC<{ cityName: string; supportedDestinations?: string[] }> = () => (
  <DestinationShowcase />
);

export const CoverageSection: React.FC<{ cityName: string; localCoverageText?: string; collectionAvailable?: boolean }> = ({
  cityName,
  localCoverageText,
}) => (
  <section className="w-full bg-surface py-16 border-b border-border text-brand-black">
    <Container size="narrow">
      <SectionHeading badge="Coverage" title={`Pickup & Collection Coverage in ${cityName}`} />
      <p className="mt-4 text-body-md text-slate-700 leading-relaxed max-w-prose">
        {localCoverageText || `Scheduled cargo pickups operate across commercial, industrial, and residential sectors in ${cityName}.`}
      </p>
    </Container>
  </section>
);

export const LocationProcess: React.FC<{ cityName: string }> = () => <ProcessSection />;

export const LocationFaq: React.FC<{ cityName: string; faqs?: Array<{ question: string; answer: string }> }> = ({ faqs }) => (
  <FaqSection faqs={faqs} />
);

export const LocationCta: React.FC<{ cityName: string; slug: string }> = ({ cityName, slug }) => (
  <section className="w-full bg-brand-navy py-16 border-b border-border-dark text-white text-center">
    <Container size="narrow">
      <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 space-y-6">
        <h2 className="text-display-lg font-bold text-white">Book Cargo Pickup from {cityName}</h2>
        <p className="text-body-md text-slate-300">Contact our dispatch desk to arrange collection and export clearance.</p>
        <Link href={`/quote?origin=${slug}`}>
          <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
            Get Shipping Quote
          </Button>
        </Link>
      </div>
    </Container>
  </section>
);
