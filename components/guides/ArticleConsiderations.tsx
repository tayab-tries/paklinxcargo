import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface ArticleConsiderationsProps {
  verificationNotes?: string;
  containsRegulatoryClaims?: boolean;
}

export const ArticleConsiderations: React.FC<ArticleConsiderationsProps> = ({
  verificationNotes,
  containsRegulatoryClaims,
}) => {
  if (!verificationNotes && !containsRegulatoryClaims) return null;

  return (
    <div className="bg-[#F6F2E9] border border-[#17201B]/15 p-6 lg:p-8 my-8 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1F8A5B] tracking-widest">
        <ShieldCheck className="w-4 h-4 text-[#1F8A5B] shrink-0" />
        <span>REGULATORY & EXPORT ADVISORY NOTES</span>
      </div>
      <p className="text-xs sm:text-sm text-[#17201B]/80 leading-relaxed font-normal">
        {verificationNotes || 'This guide provides verified general advice for Pakistan export procedures. Shipment-specific duty thresholds, prohibited item rules, and carrier specifications can vary depending on destination country laws.'}
      </p>
    </div>
  );
};
