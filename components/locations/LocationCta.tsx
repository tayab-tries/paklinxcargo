import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

export interface LocationCtaProps {
  cityName: string;
  slug: string;
}

export const LocationCta = async ({ cityName, slug }: LocationCtaProps) => {
  const business = await getPublishedBusinessSettings();
  const whatsappUrl = buildWhatsappUrl(
    business.whatsappNumber,
    `Assalam o Alaikum, I want to send cargo from ${cityName}. Please give me a quote.`
  );

  return (
    <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white text-center">
      <Container size="narrow">
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-14 space-y-6 shadow-2xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Origin Dispatch & Rates
          </div>

          <h2 className="text-display-lg font-bold text-white tracking-tight">
            Arrange Cargo Pickup from {cityName}
          </h2>

          <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Connect with our shipping desk to calculate international air freight rates, ocean cargo schedules, and doorstep pickup options in {cityName}.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/quote?origin=${slug}`} className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto font-bold"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
              >
                Get Quote from {cityName}
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
