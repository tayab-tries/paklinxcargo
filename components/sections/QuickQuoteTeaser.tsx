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
    <section className="w-full bg-brand-cream py-10 lg:py-14 border-b border-border-strong/60 text-brand-dark">
      <Container>
        <div className="bg-brand-black rounded-lg border border-brand-gold/30 p-6 sm:p-8 lg:p-10 space-y-6 shadow-2xl relative overflow-hidden text-brand-cream">
          {/* Muted Gold Accent Line */}
          <div className="h-1 bg-gradient-to-r from-brand-gold via-brand-emerald to-brand-gold absolute top-0 left-0 right-0" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-gold/20 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-[#0E281F] rounded-md border border-brand-gold/35 text-brand-gold shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-cream tracking-tight">
                  {title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300/80 font-sans mt-0.5">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-gold bg-[#0E281F]/80 px-3 py-1.5 rounded border border-brand-gold/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Route Entry</span>
            </div>
          </div>

          {/* Rate Selection Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-end">
            <Select
              label="Origin (Pakistan)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              variantSurface="dark"
            >
              <option value="lahore">Lahore Hub</option>
              <option value="karachi">Karachi Port/Air</option>
              <option value="islamabad">Islamabad Hub</option>
              <option value="rawalpindi">Rawalpindi</option>
              <option value="faisalabad">Faisalabad</option>
              <option value="sialkot">Sialkot Air/Export</option>
              <option value="multan">Multan</option>
              <option value="peshawar">Peshawar</option>
            </Select>

            <Select
              label="Destination Corridor"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              variantSurface="dark"
            >
              <option value="uk">United Kingdom (Door/Port)</option>
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
              <option value="air_freight">Air Express Cargo</option>
              <option value="sea_cargo">Sea Freight (FCL/LCL)</option>
              <option value="door_to_door">Door-to-Door Delivery</option>
            </Select>

            <Button
              variant="accent"
              size="md"
              type="submit"
              className="w-full h-[44px] text-sm font-bold tracking-wide shadow-md shadow-brand-gold/10"
              rightIcon={<ArrowRight className="w-4 h-4 text-brand-dark shrink-0" />}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};

