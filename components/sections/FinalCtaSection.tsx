import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export interface FinalCtaSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  primaryCta?: { label?: string; href?: string };
  secondaryCta?: { label?: string; href?: string };
  blockData?: Record<string, unknown>;
  whatsappNumber?: string;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  eyebrow: propEyebrow,
  heading: propHeading,
  description: propDescription,
  primaryCta: propPrimary,
  secondaryCta: propSecondary,
  blockData,
  whatsappNumber,
}) => {
  const defaultWhatsappUrl = buildWhatsappUrl(
    whatsappNumber,
    'Assalam o Alaikum, I want to send cargo from Pakistan. Please give me a quote.'
  );

  const eyebrow =
    propEyebrow ||
    (blockData?.eyebrow as string) ||
    (blockData?.badge as string) ||
    'Door-to-Door Delivery';

  const headline =
    propHeading ||
    (blockData?.headline as string) ||
    (blockData?.title as string) ||
    'Ready to send cargo from Pakistan?';

  const supportingCopy =
    propDescription ||
    (blockData?.supporting_copy as string) ||
    (blockData?.subtitle as string) ||
    'Get an instant quote online or message us on WhatsApp to discuss your cargo shipping requirements.';

  const primaryCtaLabel =
    propPrimary?.label ||
    (blockData?.primary_cta_label as string) ||
    (blockData?.button_text as string) ||
    'GET A QUOTE';

  const primaryCtaHref =
    propPrimary?.href ||
    (blockData?.primary_cta_href as string) ||
    (blockData?.button_href as string) ||
    '/quote';

  const secondaryCtaLabel =
    propSecondary?.label ||
    (blockData?.secondary_cta_label as string) ||
    'WHATSAPP US';

  let rawSecondaryHref =
    propSecondary?.href ||
    (blockData?.secondary_cta_href as string) ||
    defaultWhatsappUrl;

  if (rawSecondaryHref.includes('wa.me') || rawSecondaryHref.includes('whatsapp')) {
    const messageMatch = rawSecondaryHref.match(/text=([^&]*)/);
    const customMsg = messageMatch ? decodeURIComponent(messageMatch[1]) : undefined;
    rawSecondaryHref = buildWhatsappUrl(whatsappNumber, customMsg);
  }

  const isWhatsapp = rawSecondaryHref.includes('wa.me') || rawSecondaryHref.includes('whatsapp');

  return (
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white text-center">
      <Container size="narrow">
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-12 space-y-6 shadow-2xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{eyebrow}</div>

          <h2 className="text-display-lg font-bold text-white tracking-tight">{headline}</h2>

          <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed">{supportingCopy}</p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryCtaHref} className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto min-w-[200px] h-[48px] text-base font-bold"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
              >
                {primaryCtaLabel}
              </Button>
            </Link>
            <a
              href={rawSecondaryHref}
              target={isWhatsapp ? '_blank' : '_self'}
              rel={isWhatsapp ? 'noopener noreferrer' : undefined}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto min-w-[180px] h-[48px] border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-bold"
                leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />}
              >
                {secondaryCtaLabel}
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
