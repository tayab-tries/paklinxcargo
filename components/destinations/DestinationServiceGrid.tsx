import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { getEnabledServices } from '@/config/services.config';

export interface DestinationServiceGridProps {
  countryName: string;
  countrySlug: string;
  supportedServices?: string[];
}

export const DestinationServiceGrid: React.FC<DestinationServiceGridProps> = ({
  countryName,
  countrySlug,
  supportedServices = [],
}) => {
  const allServices = getEnabledServices();

  // Filter only services supported on this corridor
  const availableServices = supportedServices.length > 0
    ? allServices.filter((s) => supportedServices.includes(s.slug))
    : allServices;

  if (availableServices.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Corridor Services"
          title={`Available Shipping Modes to ${countryName}`}
          subtitle={`Commercial freight and cargo forwarding services connecting Pakistan with ${countryName}.`}
          className="mb-14"
        />

        {/* Editorial Service Rows */}
        <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {availableServices.map((service) => {
            const quoteUrl = service.quoteCargoType
              ? `/quote?destination=${countrySlug}&cargo=${service.quoteCargoType}`
              : `/quote?destination=${countrySlug}`;

            return (
              <div
                key={service.slug}
                className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
              >
                <div className="flex items-start gap-4 md:w-1/2">
                  <div className="p-3 bg-surface-subtle rounded border border-border text-slate-700 shrink-0">
                    <Package className="w-5 h-5 text-brand-black" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors">
                      <Link href={`/services/${service.slug}`}>{service.name}</Link>
                    </h3>
                    <p className="text-body-sm text-slate-600 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                  >
                    <span>Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                  </Link>
                  <Link href={quoteUrl}>
                    <Button variant="outline" size="sm">
                      Quote
                    </Button>
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
