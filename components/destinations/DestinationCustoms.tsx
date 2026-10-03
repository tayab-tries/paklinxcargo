import React from 'react';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { PakistanReachSection } from '@/components/sections/PakistanReachSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const DestinationServiceGrid: React.FC<{ countryName: string; supportedServices?: string[] }> = () => (
  <ServicesOverview />
);

export const DestinationOriginGrid: React.FC<{ countryName: string; supportedOrigins?: string[] }> = () => (
  <PakistanReachSection />
);

export const DestinationProcess: React.FC<{ countryName: string }> = () => <ProcessSection />;

export const DestinationConsiderations: React.FC<{ countryName: string; customsGuidance?: string }> = ({
  countryName,
  customsGuidance,
}) => (
  <section className="w-full bg-brand-navy py-16 border-b border-border-dark text-white">
    <Container size="narrow">
      <div className="bg-brand-black-deep p-6 lg:p-8 rounded-md border border-border-dark space-y-3">
        <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
          Customs Considerations — {countryName}
        </div>
        <h3 className="text-heading-sm font-bold text-white">Preparation & Import Guidance</h3>
        <p className="text-body-sm text-slate-300 leading-relaxed max-w-prose">
          {customsGuidance || `Standard commercial export documentation required for ${countryName}.`}
        </p>
      </div>
    </Container>
  </section>
);

export const DestinationFaq: React.FC<{ countryName: string; faqs?: Array<{ question: string; answer: string }> }> = ({ faqs }) => (
  <FaqSection faqs={faqs} />
);

export const DestinationCta: React.FC<{ countryName: string; slug: string }> = ({ countryName, slug }) => (
  <section className="w-full bg-brand-navy py-16 border-b border-border-dark text-white text-center">
    <Container size="narrow">
      <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 space-y-6">
        <h2 className="text-display-lg font-bold text-white">Ship Cargo to {countryName}</h2>
        <p className="text-body-md text-slate-300">Contact our shipping desk to arrange export clearance and carrier bookings.</p>
        <Link href={`/quote?destination=${slug}`}>
          <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
            Request Quote for {countryName}
          </Button>
        </Link>
      </div>
    </Container>
  </section>
);
