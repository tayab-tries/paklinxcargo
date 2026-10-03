import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface DestinationCardData {
  name: string;
  countryCode?: string;
  flagImage?: string;
  shortText?: string;
  href?: string;
}

export interface DestinationShowcaseProps {
  badge?: string;
  heading?: string;
  description?: string;
  destinations?: DestinationCardData[];
  blockData?: Record<string, unknown>;
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({
  badge: propBadge,
  heading: propHeading,
  description: propDescription,
  destinations: propDestinations,
  blockData,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'Global Routes';
  const title = propHeading || (blockData?.title as string) || 'POPULAR DESTINATIONS FROM PAKISTAN';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Direct cargo delivery connecting Pakistan to major international destination countries.';

  const defaultCorridors: DestinationCardData[] = [
    { name: 'UK', countryCode: 'uk', shortText: 'London & UK Nationwide', href: '/destinations/uk' },
    { name: 'UAE', countryCode: 'uae', shortText: 'Dubai & UAE Nationwide', href: '/destinations/uae' },
    { name: 'Saudi Arabia', countryCode: 'ksa', shortText: 'Riyadh, Jeddah & KSA', href: '/destinations/ksa' },
    { name: 'Canada', countryCode: 'canada', shortText: 'Toronto & Canada Nationwide', href: '/destinations/canada' },
    { name: 'USA', countryCode: 'usa', shortText: 'New York & USA Nationwide', href: '/destinations/usa' },
  ];

  const corridors: DestinationCardData[] =
    propDestinations && propDestinations.length > 0
      ? propDestinations
      : defaultCorridors;

  if (!corridors || corridors.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-12" />

        <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {corridors.map((item, idx) => {
            const targetHref = item.href || `/destinations/${item.countryCode || item.name.toLowerCase()}`;

            return (
              <Link
                key={idx}
                href={targetHref}
                className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
              >
                <div className="space-y-1 md:w-1/3">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span>Pakistan</span>
                    <span className="text-slate-400 font-bold">→</span>
                    <span className="font-semibold text-brand-black">{item.name}</span>
                  </div>
                  <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors">
                    Cargo to {item.name}
                  </h3>
                </div>

                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 text-xs font-mono text-slate-600 md:w-1/2">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block">Coverage Area</span>
                    <span className="font-medium text-slate-800">{item.shortText || 'Nationwide Delivery'}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block">Delivery Service</span>
                    <span className="font-medium text-slate-800">Air & Sea Cargo</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-black group-hover:text-accent transition-colors shrink-0">
                  <span>View Country Details</span>
                  <ArrowRight className="w-4 h-4 text-brand-black group-hover:text-accent transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-black hover:text-accent transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>Explore All Destinations From Pakistan →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
