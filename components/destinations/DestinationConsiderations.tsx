import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

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

  return (
    <section className="w-full bg-white py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="bg-[#FAF8F3] border border-[#12372A]/15 p-8 lg:p-12 rounded-2xl space-y-6 shadow-2xs">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              Customs Compliance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17201B]">
              Import Customs & Documentation for {countryName}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#17201B]/75 leading-relaxed">
              Essential declaration guidelines for cargo entering {countryName}.
            </p>
          </div>

          {text && (
            <p className="font-sans text-base text-[#17201B]/80 leading-relaxed max-w-3xl font-normal">
              {text}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#12372A]/10 text-xs font-mono text-[#17201B]">
            <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-[#12372A]/15">
              <FileText className="w-5 h-5 text-[#1F8A5B] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-[#17201B] text-sm block">Commercial Invoice & Packing List</span>
                <span className="font-sans text-xs text-[#17201B]/75 leading-relaxed block">
                  Itemized cargo description, declared export value, gross/net weights, and consignee contact details.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-[#12372A]/15">
              <ShieldCheck className="w-5 h-5 text-[#1F8A5B] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-[#17201B] text-sm block">Consignee Identity & Regulatory Approval</span>
                <span className="font-sans text-xs text-[#17201B]/75 leading-relaxed block">
                  Valid identity document or destination tax registration ID required for port clearance verification.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#12372A]/10">
            <Link
              href="/guides/export-customs-documentation-guide"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#1F8A5B] hover:text-[#12372A] uppercase tracking-wider underline"
            >
              <span>Read Export Customs & Documentation Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
