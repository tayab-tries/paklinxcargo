import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { getEnabledServices } from '@/config/services.config';

export interface RelatedServicesBarProps {
  supportedServices?: string[];
}

export const RelatedServicesBar: React.FC<RelatedServicesBarProps> = ({
  supportedServices = [],
}) => {
  const allServices = getEnabledServices();

  const related = supportedServices.length > 0
    ? allServices.filter((s) => supportedServices.includes(s.slug))
    : allServices.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="py-8 border-t border-[#17201B]/15 space-y-4">
      <div className="text-xs font-mono font-bold uppercase text-[#1F8A5B] tracking-widest">
        RELATED SHIPPING SERVICES
      </div>

      <div className="divide-y divide-[#17201B]/15 border-t border-b border-[#17201B]/15">
        {related.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="py-4 flex items-center justify-between hover:pl-2 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-[#1F8A5B] shrink-0" />
              <span className="text-sm sm:text-base font-serif font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors">
                {service.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#17201B] group-hover:text-[#1F8A5B]">
              <span>EXPLORE SERVICE</span>
              <ArrowRight className="w-4 h-4 text-[#17201B]/40 group-hover:text-[#1F8A5B] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
