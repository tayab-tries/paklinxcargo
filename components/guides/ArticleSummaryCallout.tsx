import React from 'react';
import { BookOpen } from 'lucide-react';

export interface ArticleSummaryCalloutProps {
  summaryText: string;
}

export const ArticleSummaryCallout: React.FC<ArticleSummaryCalloutProps> = ({ summaryText }) => {
  if (!summaryText) return null;

  return (
    <div className="bg-[#F6F2E9] border-l-4 border-[#1F8A5B] border-y border-r border-[#17201B]/15 p-6 lg:p-8 my-8 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1F8A5B] tracking-widest">
        <BookOpen className="w-4 h-4 text-[#1F8A5B] shrink-0" />
        <span>KEY TAKEAWAYS & EXECUTIVE SUMMARY</span>
      </div>
      <p className="text-sm sm:text-base text-[#17201B]/90 leading-relaxed font-serif italic">
        &ldquo;{summaryText}&rdquo;
      </p>
    </div>
  );
};
