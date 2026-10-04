import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface QuoteSuccessViewProps {
  quoteReference: string;
  onReset?: () => void;
}

export const QuoteSuccessView: React.FC<QuoteSuccessViewProps> = ({ quoteReference }) => {
  return (
    <div className="bg-surface p-8 sm:p-12 rounded-md border border-border text-center space-y-6 shadow-xs max-w-2xl mx-auto my-6">
      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
        <CheckCircle2 className="w-8 h-8 text-emerald-700" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-mono font-bold uppercase text-emerald-700 tracking-wider">
          Request Received
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-black">
          Your quote request is in.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Your shipment specifications have been logged. Our operations team will evaluate your cargo route and deliver your quotation shortly.
        </p>
      </div>

      {quoteReference && (
        <div className="space-y-2">
          <div className="p-4 sm:p-5 bg-surface-subtle rounded-md border border-border inline-block space-y-1">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Official Quote Reference</span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-brand-black select-all tracking-wider">
              {quoteReference}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-500 max-w-sm mx-auto">
            Note: This reference ID is for your quote inquiry. Active cargo tracking is enabled once your shipment is booked.
          </p>
        </div>
      )}

      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="w-full sm:w-auto">
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto font-bold"
            leftIcon={<ArrowLeft className="w-4 h-4 text-brand-black shrink-0" />}
          >
            Back to Home
          </Button>
        </Link>
        <Link href="/track" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto font-medium"
            leftIcon={<Search className="w-4 h-4 text-slate-700 shrink-0" />}
          >
            Track a Shipment
          </Button>
        </Link>
      </div>
    </div>
  );
};
