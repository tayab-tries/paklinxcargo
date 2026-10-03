import React from 'react';
import { ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface OperationalBadgeProps {
  cityName: string;
  hasPhysicalBranch?: boolean;
  branchAddress?: string;
  collectionAvailable?: boolean;
  serviceAvailable?: boolean;
}

export const OperationalBadge: React.FC<OperationalBadgeProps> = ({
  cityName,
  hasPhysicalBranch,
  branchAddress,
  collectionAvailable,
  serviceAvailable,
}) => {
  return (
    <section className="w-full bg-brand-navy py-8 border-b border-border-dark text-white">
      <Container>
        <div className="bg-brand-black-deep p-6 lg:p-8 rounded-md border border-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Verified Operational Status — {cityName}</span>
            </div>

            {hasPhysicalBranch && branchAddress ? (
              <p className="text-body-md font-semibold text-white flex items-center gap-2 pt-1">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Verified Branch Office: {branchAddress}</span>
              </p>
            ) : (
              <p className="text-body-sm text-slate-300">
                {collectionAvailable
                  ? `Doorstep cargo collection and export shipping dispatch available across ${cityName}.`
                  : `Export cargo shipping services active for origin shipments in ${cityName}.`}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-300 shrink-0">
            {serviceAvailable && (
              <div className="flex items-center gap-1.5 bg-brand-navy px-3.5 py-2 rounded border border-border-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Export Freight Active</span>
              </div>
            )}
            {collectionAvailable && (
              <div className="flex items-center gap-1.5 bg-brand-navy px-3.5 py-2 rounded border border-border-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Doorstep Collection</span>
              </div>
            )}
            {hasPhysicalBranch && (
              <div className="flex items-center gap-1.5 bg-brand-navy px-3.5 py-2 rounded border border-border-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Physical Branch</span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
