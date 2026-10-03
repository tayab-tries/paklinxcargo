import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const ArticleCta: React.FC = () => (
  <section className="w-full bg-brand-navy py-16 lg:py-20 border-b border-border-dark text-white text-center">
    <Container size="narrow">
      <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-12 space-y-6 shadow-2xl">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Export Logistics Support
        </div>

        <h2 className="text-display-md font-bold text-white tracking-tight">
          Need Help Shipping Your Cargo?
        </h2>

        <p className="text-body-md text-slate-300 max-w-xl mx-auto leading-relaxed">
          Our shipping team assists with air freight quotes, customs documentation checks, and doorstep pickup arrangements across Pakistan.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote" className="w-full sm:w-auto">
            <Button
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
            >
              Get a Shipping Quote
            </Button>
          </Link>
          <Link href="/track" className="w-full sm:w-auto">
            <Button
              variant="outline-dark"
              size="lg"
              className="w-full sm:w-auto"
              leftIcon={<Search className="w-4 h-4 text-slate-300 shrink-0" />}
            >
              Track Shipment
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  </section>
);
