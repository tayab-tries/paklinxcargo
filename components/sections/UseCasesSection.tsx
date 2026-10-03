import React from 'react';
import Link from 'next/link';
import { Package, Luggage, Building2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface UseCaseItem {
  title: string;
  description?: string;
  badgeText?: string;
  iconName?: string;
}

export interface UseCasesSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  items?: UseCaseItem[];
  blockData?: Record<string, unknown>;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({
  badge: propBadge,
  heading: propHeading,
  description: propDescription,
  items: propItems,
  blockData,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'Cargo Types';
  const title = propHeading || (blockData?.title as string) || 'WHAT CAN YOU SEND?';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'We handle personal belongings, luggage, gifts, and commercial export shipments.';

  const defaultUseCases: UseCaseItem[] = [
    {
      iconName: 'package',
      title: 'Personal Cargo',
      description: 'Clothes, gifts, household items and personal belongings.',
      badgeText: 'Personal Shipping',
    },
    {
      iconName: 'luggage',
      title: 'Excess Baggage',
      description: 'Send extra luggage separately when travelling or moving abroad.',
      badgeText: 'Travel Luggage',
    },
    {
      iconName: 'building',
      title: 'Business Cargo',
      description: 'Commercial goods and export shipments.',
      badgeText: 'Commercial Export',
    },
  ];

  const items: UseCaseItem[] =
    propItems && propItems.length > 0
      ? propItems
      : Array.isArray(blockData?.items) && blockData.items.length > 0
      ? (blockData.items as UseCaseItem[])
      : defaultUseCases;

  if (!items || items.length === 0) {
    return null;
  }

  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'luggage':
        return Luggage;
      case 'building':
      case 'business':
        return Building2;
      case 'package':
      default:
        return Package;
    }
  };

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {items.map((item, idx) => {
            const IconComponent = getIcon(item.iconName);

            return (
              <div
                key={idx}
                className="bg-surface rounded-md border border-border p-6 lg:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-slate-400 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-brand-navy/10 rounded border border-brand-navy/20 text-brand-navy">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {item.badgeText && (
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 bg-surface-subtle px-2.5 py-1 rounded border border-border">
                        {item.badgeText}
                      </span>
                    )}
                  </div>

                  <h3 className="text-heading-md font-bold text-brand-black">{item.title}</h3>
                  {item.description && (
                    <p className="text-body-md text-slate-600 leading-relaxed font-normal">{item.description}</p>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Supported Service</span>
                  <Link
                    href="/quote"
                    className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
