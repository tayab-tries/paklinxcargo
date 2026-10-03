import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface DestinationConsiderationsProps {
  countryName: string;
  customsGuidance?: string;
  preparationConsiderations?: string;
}

export const DestinationConsiderations: React.FC<DestinationConsiderationsProps> = ({
  countryName,
  customsGuidance,
  preparationConsiderations,
}) => {
  const text = customsGuidance || preparationConsiderations;

  if (!text) return null;

  return (
    <section className="w-full bg-surface py-16 lg:py-20 border-b border-border text-brand-black">
      <Container>
        <div className="bg-surface-subtle border border-border p-8 lg:p-12 rounded-md space-y-6 shadow-xs">
          <SectionHeading
            badge="Customs Compliance"
            title={`Import Customs & Documentation for ${countryName}`}
            subtitle={`Essential declaration guidelines for cargo entering ${countryName}.`}
          />

          <p className="text-body-md text-slate-700 leading-relaxed max-w-3xl font-normal">
            {text}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border text-xs font-mono text-slate-700">
            <div className="flex items-start gap-3 bg-surface p-4 rounded border border-border">
              <FileText className="w-4 h-4 text-brand-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-brand-black block">Commercial Invoice & Itemized Packing List</span>
                <span className="text-slate-600">
                  Itemized cargo description, declared value, and consignee contact details required for customs entry filing.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-surface p-4 rounded border border-border">
              <ShieldCheck className="w-4 h-4 text-brand-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-brand-black block">Consignee Identity & Tax Clearance</span>
                <span className="text-slate-600">
                  Valid identity or tax registration ID required for destination customs clearance verification.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
