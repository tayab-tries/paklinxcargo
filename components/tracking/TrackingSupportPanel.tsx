import React from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const TrackingSupportPanel: React.FC = () => {
  return (
    <div className="bg-surface-subtle rounded-md border border-border p-6 lg:p-8 space-y-4 text-center text-brand-black shadow-2xs">
      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
        <HelpCircle className="w-5 h-5 text-emerald-700" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-serif font-bold text-brand-black">Need Help With Your Shipment?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          If you have questions regarding your cargo status, export customs documentation, or destination dispatch timings, our operations team is ready to assist.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/quote" className="w-full sm:w-auto">
          <Button
            variant="accent"
            size="md"
            className="w-full sm:w-auto font-bold"
            rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
          >
            Get a Shipping Quote
          </Button>
        </Link>
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full sm:w-auto font-medium">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
