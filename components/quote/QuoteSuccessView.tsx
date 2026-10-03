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
    <div className="bg-surface p-8 lg:p-12 rounded-md border border-border text-center space-y-6 shadow-xs max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-mono font-bold uppercase text-emerald-600 tracking-wider">
          Request Received
        </div>
        <h2 className="text-heading-xl font-extrabold text-brand-black tracking-tight">
          Quote Request Submitted
        </h2>
        <p className="text-body-md text-slate-600 max-w-md mx-auto leading-relaxed">
          Your quote request has been received by our operations team. We are reviewing your cargo specifications and will issue your custom quotation.
        </p>
      </div>

      {quoteReference && (
        <div className="p-4 bg-surface-subtle rounded-md border border-border inline-block space-y-1">
          <span className="text-xs font-mono text-slate-500 uppercase block">Official Quote Reference</span>
          <span className="text-lg font-mono font-bold text-brand-black select-all tracking-wider">
            {quoteReference}
          </span>
        </div>
      )}

      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="w-full sm:w-auto">
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto"
            leftIcon={<ArrowLeft className="w-4 h-4 text-brand-black shrink-0" />}
          >
            Back to Home
          </Button>
        </Link>
        <Link href="/track" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            leftIcon={<Search className="w-4 h-4 text-slate-700 shrink-0" />}
          >
            Track Shipment
          </Button>
        </Link>
      </div>
    </div>
  );
};
