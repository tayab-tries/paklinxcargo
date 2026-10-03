import React from 'react';
import { BookOpen } from 'lucide-react';

export interface ArticleSummaryCalloutProps {
  summaryText: string;
}

export const ArticleSummaryCallout: React.FC<ArticleSummaryCalloutProps> = ({ summaryText }) => {
  if (!summaryText) return null;

  return (
    <div className="bg-surface-subtle border border-border p-6 rounded-md my-8 space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-brand-black tracking-wider">
        <BookOpen className="w-4 h-4 text-slate-600" />
        <span>Key Takeaways & Core Guidance</span>
      </div>
      <p className="text-body-md text-slate-700 leading-relaxed font-normal">
        {summaryText}
      </p>
    </div>
  );
};
