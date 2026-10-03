'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calculator } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

export interface QuickQuoteTeaserProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  blockData?: Record<string, unknown>;
}

export const QuickQuoteTeaser: React.FC<QuickQuoteTeaserProps> = ({
  heading: propHeading,
  description: propDescription,
  ctaText: propCtaText,
  blockData,
}) => {
  const router = useRouter();
  const [origin, setOrigin] = useState('lahore');
  const [destination, setDestination] = useState('uk');
  const [cargo, setCargo] = useState('air_freight');

  const title =
    propHeading ||
    (blockData?.section_title as string) ||
    (blockData?.title as string) ||
    'Quick Rate & Route Inquiry';

  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Select shipment parameters to initiate a quote request';

  const buttonText = propCtaText || 'Continue to Quote';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/quote?origin=${origin}&destination=${destination}&cargo=${cargo}`);
  };

  return (
    <section className="w-full bg-brand-navy py-10 border-b border-border-dark text-white">
      <Container>
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-6 lg:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-dark pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-navy rounded border border-border-dark text-slate-300">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-heading-sm font-bold text-white">{title}</h2>
                <p className="text-xs text-slate-400 font-mono">{subtitle}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">Direct Route Entry</span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <Select
              label="Origin (Pakistan)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              variantSurface="dark"
            >
              <option value="lahore">Lahore</option>
              <option value="karachi">Karachi</option>
              <option value="islamabad">Islamabad</option>
              <option value="rawalpindi">Rawalpindi</option>
              <option value="faisalabad">Faisalabad</option>
              <option value="sialkot">Sialkot</option>
              <option value="multan">Multan</option>
              <option value="peshawar">Peshawar</option>
            </Select>

            <Select
              label="Destination Corridor"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              variantSurface="dark"
            >
              <option value="uk">United Kingdom</option>
              <option value="uae">United Arab Emirates</option>
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="ksa">Saudi Arabia</option>
            </Select>

            <Select
              label="Cargo Mode"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              variantSurface="dark"
            >
              <option value="air_freight">Air Cargo Express</option>
              <option value="sea_cargo">Sea Cargo (FCL/LCL)</option>
              <option value="door_to_door">Door-to-Door Delivery</option>
            </Select>

            <Button
              variant="accent"
              size="md"
              type="submit"
              className="w-full h-[44px]"
              rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};
