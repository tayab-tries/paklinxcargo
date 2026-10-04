import React from 'react';
import Image from 'next/image';

export interface TrustedClientItem {
  companyName: string;
  logo?: string;
  altText?: string;
}

export interface TrustedMarketSectionProps {
  heading?: string;
  items?: TrustedClientItem[];
  blockData?: Record<string, unknown>;
}

export const TrustedMarketSection: React.FC<TrustedMarketSectionProps> = ({
  heading: propHeading,
  items: propItems,
  blockData,
}) => {
  const heading =
    propHeading || (blockData?.heading as string) || 'TRUSTED BY THE MARKET';

  const defaultLogos: TrustedClientItem[] = [
    { companyName: 'Ufone', logo: '/images/logos/ufone.svg' },
    { companyName: 'Daraz', logo: '/images/logos/daraz.svg' },
    { companyName: 'Faysal Bank', logo: '/images/logos/faysal-bank.svg' },
    { companyName: 'HBL', logo: '/images/logos/hbl.svg' },
    { companyName: 'Puma', logo: '/images/logos/puma.svg' },
    { companyName: 'PTN', logo: '/images/logos/ptn.svg' },
    { companyName: 'PTCL', logo: '/images/logos/ptcl.svg' },
  ];

  const rawItems = propItems && propItems.length > 0
    ? propItems
    : Array.isArray(blockData?.items) && blockData.items.length > 0
    ? (blockData.items as TrustedClientItem[])
    : defaultLogos;

  const items = rawItems.filter((item): item is TrustedClientItem & { logo: string } => Boolean(item && item.logo));

  if (!items || items.length === 0) {
    return null;
  }

  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="w-full bg-[#12372A] py-14 lg:py-20 border-b border-brand-gold/20 text-brand-cream overflow-hidden select-none relative">
      {/* Radial Gold Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.08),transparent_70%)]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase block">
            Corporate Clients & Partners
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-cream tracking-tight uppercase">
            {heading}
          </h2>
        </div>
      </div>

      <div className="relative w-full max-w-full overflow-hidden pointer-events-none z-10">
        {/* Smooth Dark Gradient Edge Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#12372A] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#12372A] to-transparent z-20 pointer-events-none" />

        <div className="flex items-center gap-6 sm:gap-10 w-max animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:w-full py-4 px-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center shrink-0 h-20 sm:h-22 w-48 sm:w-60 bg-[#17201B] rounded-lg border border-brand-gold/25 px-8 py-4 shadow-md pointer-events-none hover:border-brand-gold/50 transition-colors"
            >
              <Image
                src={item.logo}
                alt={item.altText || item.companyName || 'Client Logo'}
                width={240}
                height={75}
                className="max-h-12 sm:max-h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

