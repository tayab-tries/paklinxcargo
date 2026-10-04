import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { primaryCta as defaultPrimaryCta } from '@/config/nav.config';
import { Button } from '@/components/ui/Button';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { SanitySiteSettings } from '@/sanity/lib/fetch';

interface HeaderProps {
  sanitySiteSettings?: SanitySiteSettings | null;
}

export const Header: React.FC<HeaderProps> = async ({ sanitySiteSettings }) => {
  const business = await getPublishedBusinessSettings();

  const brandName = sanitySiteSettings?.businessName || business.brandName || siteConfig.name;
  const phone = sanitySiteSettings?.phone || business.phonePrimary || siteConfig.phone;
  const whatsappNumber = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || siteConfig.contact?.whatsappNumber;
  const logoSrc = sanitySiteSettings?.logo || '/images/brand/logo.png';

  const ctaLabel = sanitySiteSettings?.primaryCta?.label || defaultPrimaryCta.label;
  const ctaHref = sanitySiteSettings?.primaryCta?.href || defaultPrimaryCta.href;

  return (
    <header className="w-full sticky top-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      {/* Contained Floating White Pill Navbar (~80-85% of wide hero width) */}
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 max-w-5xl lg:max-w-6xl mx-auto">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald rounded-full shrink-0 py-0.5"
          aria-label={`${brandName} Homepage`}
        >
          <Image
            src={logoSrc}
            alt={`${brandName} Logo`}
            width={200}
            height={100}
            priority
            className="h-8 sm:h-10 w-auto object-contain max-h-[44px]"
          />
        </Link>

        <DesktopNav navItems={sanitySiteSettings?.navigationItems} />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Link href={ctaHref}>
              <Button
                variant="primary"
                size="md"
                className="rounded-full bg-[#1F8A5B] hover:bg-[#12372A] text-white font-medium px-5 py-2 text-xs sm:text-sm shadow-xs border-none"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0 text-white" />}
              >
                {ctaLabel}
              </Button>
            </Link>
          </div>
          <MobileNav
            brandName={brandName}
            phone={phone}
            whatsappNumber={whatsappNumber}
          />
        </div>
      </div>
    </header>
  );
};
