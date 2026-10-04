import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface EditorialHeroProps {
  breadcrumbs?: Array<{ label: string; url: string }>;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string; icon?: React.ReactNode };
  imageSrc?: string;
  imageAlt?: string;
  imageBadgeText?: string;
  children?: React.ReactNode;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  imageSrc = '/images/hero-freight.jpg',
  imageAlt = 'International Cargo Logistics',
  imageBadgeText = 'Global Logistics Network',
  children,
}) => {
  return (
    <section className="relative w-full bg-[#12372A] text-[#F6F2E9] py-16 lg:py-24 border-b border-[#12372A]/10 overflow-hidden">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,161,91,0.15),transparent_70%)] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumbs items={breadcrumbs} className="text-slate-300" />
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3.5 py-1.5 bg-[#1F8A5B]/30 border border-[#C6A15B]/30 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#C6A15B]">
                {eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              {title}
            </h1>

            {subtitle && (
              <p className="font-serif text-lg sm:text-xl text-[#C6A15B] font-normal leading-relaxed">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="font-sans text-sm sm:text-base text-[#F6F2E9]/85 leading-relaxed">
                {description}
              </p>
            )}

            {children}

            {(primaryCta || secondaryCta) && (
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {primaryCta && (
                  <Link href={primaryCta.href} className="w-full sm:w-auto">
                    <button
                      type="button"
                      className="w-full sm:w-auto h-13 px-8 bg-[#1F8A5B] hover:bg-white hover:text-[#12372A] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#C6A15B]/40 cursor-pointer"
                    >
                      <span>{primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </Link>
                )}

                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    target={secondaryCta.href.includes('wa.me') ? '_blank' : '_self'}
                    rel={secondaryCta.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                    className="w-full sm:w-auto"
                  >
                    <button
                      type="button"
                      className="w-full sm:w-auto h-13 px-7 bg-transparent hover:bg-white/10 text-[#F6F2E9] font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-[#F6F2E9]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {secondaryCta.icon}
                      <span>{secondaryCta.label}</span>
                    </button>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Photo Anchor (5 cols) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B]/30 shadow-2xl bg-[#17201B] group">
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] relative w-full overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4 bg-[#17201B]/95 backdrop-blur-xs border-t border-[#C6A15B]/20 flex items-center justify-between text-xs text-[#F6F2E9]/80 font-mono">
                <span className="text-[#C6A15B] uppercase font-bold tracking-wider">{imageBadgeText}</span>
                <span>Air & Ocean Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
