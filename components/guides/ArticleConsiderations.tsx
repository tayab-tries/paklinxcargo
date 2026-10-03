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
    <div className="bg-surface-subtle border border-border p-6 rounded-md my-8 space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-brand-black tracking-wider">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Regulatory & Export Verification Notes</span>
      </div>
      <p className="text-body-sm text-slate-700 leading-relaxed font-normal">
        {verificationNotes || 'This guide has been verified against Pakistan Customs export procedures and standard international cargo carrier regulations.'}
      </p>
    </div>
  );
};
