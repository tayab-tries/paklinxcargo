import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface DestinationOverviewProps {
  countryName: string;
  shippingOverview?: string;
}

export const DestinationOverview: React.FC<DestinationOverviewProps> = ({
  countryName,
  shippingOverview,
}) => {
  if (!shippingOverview) return null;

  return (
    <section className="w-full bg-background py-16 lg:py-20 border-b border-border text-brand-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <SectionHeading
              badge="Trade Corridor Overview"
              title={`Export Logistics to ${countryName}`}
              className="[&_h2]:text-brand-black"
            />
          </div>
          <div className="lg:col-span-8 space-y-4">
            <p className="text-body-lg text-slate-700 leading-relaxed font-normal max-w-prose">
              {shippingOverview}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
