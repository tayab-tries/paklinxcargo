import React from 'react';
import { Truck, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface CoverageSectionProps {
  cityName: string;
  localCoverageText?: string;
  collectionAvailable?: boolean;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({
  cityName,
  localCoverageText,
  collectionAvailable = true,
}) => (
  <section className="w-full bg-brand-navy py-16 lg:py-20 border-b border-border-dark text-white">
    <Container>
      <div className="bg-brand-black-deep border border-border-dark p-8 lg:p-12 rounded-md space-y-6 shadow-2xl">
        <SectionHeading
          badge="Logistics Coverage"
          title={`Pickup & Collection Coverage in ${cityName}`}
          subtitle={`Commercial and district receiving coverage operating across ${cityName}.`}
          className="[&_h2]:text-white [&_p]:text-slate-300"
          badgeVariant="outline-dark"
        />

        <p className="text-body-md text-slate-200 leading-relaxed max-w-3xl font-normal">
          {localCoverageText || `Scheduled cargo receiving and pickup dispatch operates across commercial districts and industrial zones in ${cityName}.`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border-dark text-xs font-mono text-slate-300">
          <div className="flex items-start gap-3 bg-brand-navy p-4 rounded border border-border-dark">
            <Truck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white block">
                {collectionAvailable ? 'Doorstep Collection Dispatch' : 'Receiving Point Dispatch'}
              </span>
              <span className="text-slate-400">
                {collectionAvailable
                  ? `Scheduled doorstep pickup arranged directly from your address or commercial premises in ${cityName}.`
                  : `Export cargo receiving and consolidation arranged at designated local dispatch points in ${cityName}.`}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-brand-navy p-4 rounded border border-border-dark">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white block">Export Customs Compliance</span>
              <span className="text-slate-400">
                Itemized weight measurement, export customs documentation check, and public tracking code assignment.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
