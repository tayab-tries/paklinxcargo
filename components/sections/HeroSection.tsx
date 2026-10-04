import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageSquare, Plane, Ship, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import type { SanityHomepageData } from '@/sanity/lib/fetch';

export interface HeroSectionProps {
  blockData?: Record<string, unknown>;
  sanityHeroData?: SanityHomepageData['hero'] | null;
  heroFeatureChips?: SanityHomepageData['heroFeatureChips'];
  whatsappNumber?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  blockData,
  sanityHeroData,
  whatsappNumber: propWhatsapp,
}) => {
  const activeWhatsapp = (blockData?.whatsapp_number as string) || propWhatsapp;
  const defaultWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I want to send cargo from Pakistan. Please give me a quote.'
  );

  const eyebrow =
    sanityHeroData?.eyebrow ||
    (blockData?.eyebrow as string) ||
    'PAKISTAN TO WORLDWIDE LOGISTICS';

  let headline = (blockData?.headline as string) || '';
  if (sanityHeroData?.heading) {
    if (sanityHeroData.highlightedHeading) {
      headline = `${sanityHeroData.heading}\n${sanityHeroData.highlightedHeading}`;
    } else {
      headline = sanityHeroData.heading;
    }
  } else if (!headline) {
    headline = "International cargo from Pakistan to the world.";
  }

  const supportingCopy =
    sanityHeroData?.description ||
    (blockData?.supporting_copy as string) ||
    'Door-to-door air freight and ocean cargo shipping originating from Pakistan export hubs to over 50 international destinations.';

  const primaryCtaLabel =
    sanityHeroData?.primaryCta?.label ||
    (blockData?.primary_cta_label as string) ||
    'Request a Cargo Quote';

  const primaryCtaHref =
    sanityHeroData?.primaryCta?.href ||
    (blockData?.primary_cta_href as string) ||
    '/quote';

  const secondaryCtaLabel =
    sanityHeroData?.secondaryCta?.label ||
    (blockData?.secondary_cta_label as string) ||
    'Direct WhatsApp';

  let rawSecondaryHref =
    sanityHeroData?.secondaryCta?.href ||
    (blockData?.secondary_cta_href as string) ||
    defaultWhatsappUrl;

  if (rawSecondaryHref.includes('wa.me') || rawSecondaryHref.includes('whatsapp')) {
    const messageMatch = rawSecondaryHref.match(/text=([^&]*)/);
    const customMsg = messageMatch ? decodeURIComponent(messageMatch[1]) : undefined;
    rawSecondaryHref = buildWhatsappUrl(activeWhatsapp, customMsg);
  }

  const bgImage =
    sanityHeroData?.heroImage ||
    (blockData?.background_image as string) ||
    IMAGE_SLOTS.heroBackground.src;

  const imageAlt =
    sanityHeroData?.heroImageAlt ||
    (blockData?.image_alt_text as string) ||
    IMAGE_SLOTS.heroBackground.alt;

  const isWhatsapp = rawSecondaryHref.includes('wa.me') || rawSecondaryHref.includes('whatsapp');

  return (
    <section className="relative w-full px-2 sm:px-4 md:px-6 pt-2 pb-16 lg:pb-24">
      {/* Wide Expansive Hero Container */}
      <div className="relative w-full max-w-[1760px] mx-auto rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-end p-6 sm:p-10 lg:p-16 xl:p-20 shadow-xl border border-slate-200/60 bg-[#0E281F]">
        
        {/* Background Photography with Natural Scrim */}
        <Image
          src={bgImage}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1920px) 100vw, 1920px"
          className="object-cover object-center opacity-90 transition-transform duration-700"
        />

        {/* Soft Asymmetrical Gradient Overlay for Pristine Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20 lg:from-black/80 lg:via-black/40 lg:to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />

        {/* Hero Content (Left Aligned Asymmetrical) */}
        <div className="relative z-20 max-w-3xl space-y-6 sm:space-y-7 pt-24 sm:pt-28 pb-4 lg:pb-6">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white">
              {eyebrow}
            </span>
          </div>

          {/* Headline (Playfair Display) */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-white leading-[1.06] tracking-tight">
            International cargo from <span className="italic text-[#C6A15B]">Pakistan</span> to the world.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-white/90 font-sans max-w-2xl font-normal leading-relaxed">
            {supportingCopy}
          </p>

          {/* Action Pill CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href={primaryCtaHref}>
              <Button
                variant="accent"
                size="lg"
                className="h-13 px-8 rounded-full bg-[#1F8A5B] hover:bg-[#12372A] text-white font-medium text-sm sm:text-base border-none shadow-lg transition-all"
                rightIcon={<ArrowRight className="w-4 h-4 text-white shrink-0" />}
              >
                {primaryCtaLabel}
              </Button>
            </Link>

            <a
              href={rawSecondaryHref}
              target={isWhatsapp ? '_blank' : '_self'}
              rel={isWhatsapp ? 'noopener noreferrer' : undefined}
            >
              <Button
                variant="outline-dark"
                size="lg"
                className="h-13 px-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-medium text-sm sm:text-base border border-white/35 transition-all"
                leftIcon={<MessageSquare className="w-4 h-4 text-[#C6A15B] shrink-0" />}
              >
                {secondaryCtaLabel}
              </Button>
            </a>
          </div>
        </div>

        {/* Information Card (Positioned Inside Hero Container Above Bottom Border) */}
        <div className="lg:absolute lg:bottom-6 xl:bottom-8 lg:right-10 xl:right-14 lg:z-30 w-full lg:max-w-md bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200/80 text-[#17201B] space-y-3.5 mt-6 lg:mt-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1F8A5B] font-bold block">
                Transport Modes & Timelines
              </span>
              <h3 className="font-serif text-lg font-bold text-[#17201B]">
                Pakistan Departure Corridors
              </h3>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F8A5B] animate-pulse" />
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-[#FAF8F3] rounded-xl border border-slate-200/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#12372A] text-[#C6A15B] rounded-lg">
                  <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#17201B]">Air Freight Express</div>
                  <div className="text-[11px] text-slate-500">Door-to-door air cargo</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#1F8A5B] bg-emerald-50 px-2.5 py-1 rounded-md">
                10–15 Days
              </span>
            </div>

            <div className="p-3.5 bg-[#FAF8F3] rounded-xl border border-slate-200/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#12372A] text-[#C6A15B] rounded-lg">
                  <Ship className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#17201B]">Sea Cargo Freight</div>
                  <div className="text-[11px] text-slate-500">FCL & LCL Ocean Freight</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#1F8A5B] bg-emerald-50 px-2.5 py-1 rounded-md">
                1.5–2.5 Months
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-mono border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-4 h-4 text-[#1F8A5B]" />
              <span>8 Origin Pickup Hubs</span>
            </div>
            <Link
              href="/quote"
              className="inline-flex items-center gap-1.5 font-bold text-[#12372A] hover:text-[#1F8A5B] transition-colors"
            >
              <span>Calculate Rate</span>
              <ArrowRight className="w-4 h-4 text-[#1F8A5B]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
