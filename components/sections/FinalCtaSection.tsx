import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
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
    'DOOR-TO-DOOR CARGO SHIPPING';

  const headline =
    propHeading ||
    (blockData?.headline as string) ||
    (blockData?.title as string) ||
    'Ready to move cargo from Pakistan?';

  const supportingCopy =
    propDescription ||
    (blockData?.supporting_copy as string) ||
    (blockData?.subtitle as string) ||
    'Get an instant shipping quote online or connect directly with our operations team via WhatsApp.';

  const primaryCtaLabel =
    propPrimary?.label ||
    (blockData?.primary_cta_label as string) ||
    (blockData?.button_text as string) ||
    'REQUEST CARGO QUOTE';

  const primaryCtaHref =
    propPrimary?.href ||
    (blockData?.primary_cta_href as string) ||
    (blockData?.button_href as string) ||
    '/quote';

  const secondaryCtaLabel =
    propSecondary?.label ||
    (blockData?.secondary_cta_label as string) ||
    'WHATSAPP OPERATOR';

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
    <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 text-[#17201B] relative overflow-hidden border-b border-[#12372A]/10">
      <Container size="narrow" className="relative z-10">
        <div className="bg-[#12372A] text-[#F6F2E9] rounded-2xl border border-[#C6A15B]/30 p-8 sm:p-12 lg:p-16 space-y-6 sm:space-y-8 shadow-2xl relative overflow-hidden text-center">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(198,161,91,0.18),transparent_70%)]" />

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1F8A5B]/30 backdrop-blur-md border border-[#C6A15B]/40 rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#C6A15B]">
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            {headline}
          </h2>

          {/* Supporting Copy */}
          <p className="font-sans text-base sm:text-lg text-[#F6F2E9]/85 max-w-xl mx-auto leading-relaxed font-normal">
            {supportingCopy}
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryCtaHref} className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto h-13 px-8 text-xs font-mono font-bold uppercase tracking-wider bg-[#1F8A5B] hover:bg-white hover:text-[#12372A] text-white border border-[#C6A15B]/50 shadow-lg"
                rightIcon={<ArrowRight className="w-4 h-4 text-white shrink-0" />}
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
                className="w-full sm:w-auto h-13 px-7 text-xs font-mono font-bold uppercase tracking-wider border-[#F6F2E9]/40 text-[#F6F2E9] hover:bg-white/10 hover:text-white"
                leftIcon={<MessageSquare className="w-4 h-4 text-[#C6A15B] shrink-0" />}
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
