import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { getEnabledServices } from '@/config/services.config';

export interface LocationServiceGridProps {
  cityName: string;
  supportedServices?: string[];
}

export const LocationServiceGrid: React.FC<LocationServiceGridProps> = ({
  cityName,
  supportedServices = [],
}) => {
  const allServices = getEnabledServices();

  const availableServices =
    supportedServices.length > 0
      ? allServices.filter((s) => supportedServices.includes(s.slug))
      : allServices;

  if (availableServices.length === 0) return null;

  return (
    <section className="w-full bg-[#FAF8F3] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              Origin Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
              Services Available in {cityName}
            </h2>
            <p className="font-sans text-base text-[#17201B]/75">
              Commercial freight modes and logistics shipping options supported for dispatch from {cityName}.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#12372A]/15 divide-y divide-[#12372A]/10 shadow-2xs overflow-hidden">
            {availableServices.map((service) => {
              const quoteUrl = service.quoteCargoType
                ? `/quote?origin=${cityName.toLowerCase()}&cargo=${service.quoteCargoType}`
                : `/quote?origin=${cityName.toLowerCase()}`;

              return (
                <div
                  key={service.slug}
                  className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#12372A] hover:text-white transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4 md:w-1/2">
                    <div className="p-3 bg-[#12372A]/10 group-hover:bg-white/10 rounded-lg text-[#1F8A5B] group-hover:text-[#C6A15B] shrink-0 transition-colors">
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17201B] group-hover:text-white transition-colors">
                        <Link href={`/services/${service.slug}`}>{service.name}</Link>
                      </h3>
                      <p className="font-sans text-sm text-[#17201B]/75 group-hover:text-[#F6F2E9]/80 leading-relaxed font-normal transition-colors">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-mono text-xs font-bold text-[#12372A] group-hover:text-[#C6A15B] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                    >
                      <span>Service Specification</span>
                      <ArrowRight className="w-4 h-4 text-[#1F8A5B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link href={quoteUrl}>
                      <span className="px-4 py-2 bg-[#FAF8F3] group-hover:bg-[#C6A15B] text-[#17201B] rounded-lg border border-[#12372A]/15 group-hover:border-[#C6A15B] font-mono text-xs font-bold uppercase transition-all shadow-2xs">
                        Quote
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
