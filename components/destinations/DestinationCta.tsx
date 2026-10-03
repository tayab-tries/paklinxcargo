import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

export interface DestinationCtaProps {
  countryName: string;
  countrySlug: string;
}

export const DestinationCta = async ({ countryName, countrySlug }: DestinationCtaProps) => {
  const business = await getPublishedBusinessSettings();
  const whatsappUrl = buildWhatsappUrl(
    business.whatsappNumber,
    `Assalam o Alaikum, I want to send cargo to ${countryName} from Pakistan. Please give me a quote.`
  );

  return (
    <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white text-center">
      <Container size="narrow">
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-14 space-y-6 shadow-2xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Corridor Rates & Schedules
          </div>

          <h2 className="text-display-lg font-bold text-white tracking-tight">
            Ship Cargo to {countryName} from Pakistan
          </h2>

          <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Get transparent air cargo rates, ocean container schedules, and customs guidance for your export shipment heading to {countryName}.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/quote?destination=${countrySlug}`} className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto font-bold"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
              >
                Get Quote to {countryName}
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-bold"
                leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />}
              >
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
