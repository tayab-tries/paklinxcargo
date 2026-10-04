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
    <section className="w-full bg-[#17201B] py-8 border-b border-[#17201B]/20 text-white">
      <Container>
        <div className="bg-[#12372A] p-6 lg:p-8 rounded-md border border-[#1F8A5B]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase text-[#C6A15B] tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Verified Operational Status — {cityName}</span>
            </div>

            {hasPhysicalBranch && branchAddress ? (
              <p className="text-sm sm:text-base font-serif font-bold text-white flex items-center gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Verified Branch Office: {branchAddress}</span>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-200 font-normal">
                {collectionAvailable
                  ? `Doorstep cargo collection and export shipping dispatch available across ${cityName}.`
                  : `Export cargo shipping services active for origin shipments in ${cityName}.`}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-200 shrink-0">
            {serviceAvailable && (
              <div className="flex items-center gap-1.5 bg-[#17201B] px-3.5 py-2 rounded border border-[#1F8A5B]/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F8A5B] shrink-0" />
                <span>Export Freight Active</span>
              </div>
            )}
            {collectionAvailable && (
              <div className="flex items-center gap-1.5 bg-[#17201B] px-3.5 py-2 rounded border border-[#1F8A5B]/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F8A5B] shrink-0" />
                <span>Doorstep Collection</span>
              </div>
            )}
            {hasPhysicalBranch && (
              <div className="flex items-center gap-1.5 bg-[#17201B] px-3.5 py-2 rounded border border-[#1F8A5B]/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F8A5B] shrink-0" />
                <span>Physical Branch</span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
