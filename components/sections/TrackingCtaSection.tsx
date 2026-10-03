import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const TrackingCtaSection: React.FC = () => {
  return (
    <section className="w-full bg-brand-black py-16 border-b border-border-dark text-white">
      <Container>
        <div className="bg-brand-navy border border-border-dark rounded-md p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
              Public Shipment Visibility
            </div>
            <h3 className="text-heading-lg font-bold text-white">
              Track Your Active Cargo Shipment Status
            </h3>
            <p className="text-body-sm text-slate-300 max-w-xl">
              Enter your tracking reference ID to view dispatch milestones, departure times, and destination arrival status.
            </p>
          </div>

          <Link href="/track" className="shrink-0 w-full md:w-auto">
            <Button
              variant="accent"
              size="lg"
              className="w-full md:w-auto"
              leftIcon={<Search className="w-4 h-4 text-brand-black" />}
            >
              Go to Tracking Page
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
