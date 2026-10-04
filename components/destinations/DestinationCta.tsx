import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
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
    <section className="w-full bg-[#12372A] py-20 lg:py-28 text-white">
      <Container size="narrow">
        <div className="bg-[#17201B] rounded-2xl border border-[#C6A15B]/30 p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <span className="px-3 py-1 bg-[#C6A15B]/20 text-[#C6A15B] font-mono text-xs font-bold uppercase tracking-wider rounded-full inline-block">
            Start Your Dispatch
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6F2E9] tracking-tight">
            Ship Cargo to {countryName} from Pakistan
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#F6F2E9]/80 max-w-xl mx-auto leading-relaxed">
            Get transparent air cargo rates, ocean container schedules, and customs guidance for your export shipment heading to {countryName}.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/quote?destination=${countrySlug}`} className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto h-13 px-8 bg-[#C6A15B] hover:bg-[#b5924e] text-[#17201B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#C6A15B] cursor-pointer"
              >
                <span>Get Quote to {countryName}</span>
                <ArrowRight className="w-4 h-4 text-[#17201B]" />
              </button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto h-13 px-7 bg-transparent hover:bg-white/10 text-[#F6F2E9] font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-[#1F8A5B] text-[#1F8A5B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#1F8A5B] fill-current" />
                <span>WhatsApp Us</span>
              </button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
