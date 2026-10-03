import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Service } from '@/lib/supabase/services';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

export interface ServiceCtaProps {
  service: Service;
}

export const ServiceCta = async ({ service }: ServiceCtaProps) => {
  const business = await getPublishedBusinessSettings();
  const whatsappUrl = buildWhatsappUrl(
    business.whatsappNumber,
    `Assalam o Alaikum, I want to inquire about ${service.title} from Pakistan. Please give me a quote.`
  );

  return (
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white text-center">
      <Container size="narrow">
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-12 space-y-6">
          <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
            Custom Export Quotation
          </div>
          <h2 className="text-display-lg font-bold text-white tracking-tight">
            Ready to Book {service.title}?
          </h2>
          <p className="text-body-md text-slate-300 max-w-xl mx-auto leading-relaxed">
            Submit cargo dimensions, origin city in Pakistan, and destination address for rate quotes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/quote?service=${service.slug}`} className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto font-bold"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
              >
                Request {service.title} Quote
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
