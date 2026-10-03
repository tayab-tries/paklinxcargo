import React from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const TrackingSupportPanel: React.FC = () => {
  return (
    <div className="bg-brand-navy rounded-md border border-border-dark p-6 lg:p-8 space-y-4 text-center">
      <div className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center mx-auto border border-border-dark">
        <HelpCircle className="w-5 h-5 text-accent" />
      </div>

      <div className="space-y-1">
        <h3 className="text-heading-md font-bold text-white">Need Help With Your Shipment?</h3>
        <p className="text-body-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          If you have questions regarding your cargo status, export customs documentation, or destination dispatch timings, our operations team is ready to assist.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/quote" className="w-full sm:w-auto">
          <Button
            variant="accent"
            size="md"
            className="w-full sm:w-auto"
            rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
          >
            Get a Shipping Quote
          </Button>
        </Link>
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline-dark" size="md" className="w-full sm:w-auto">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
