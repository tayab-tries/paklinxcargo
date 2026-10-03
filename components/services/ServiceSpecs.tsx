import React from 'react';
import { Container } from '@/components/ui/Container';
import { Service } from '@/lib/supabase/services';

export interface ServiceSpecsProps {
  service: Service;
}

export const ServiceSpecs: React.FC<ServiceSpecsProps> = ({ service }) => {
  if (!service.technical_info) return null;

  return (
    <section className="w-full bg-brand-navy py-16 border-b border-border-dark text-white">
      <Container size="narrow">
        <div className="bg-brand-black-deep p-6 lg:p-8 rounded-md border border-border-dark space-y-4">
          <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
            Verified Technical Information
          </div>
          <h3 className="text-heading-md font-bold text-white">Technical Specifications</h3>
          <p className="text-body-sm text-slate-300 leading-relaxed max-w-prose">
            {service.technical_info}
          </p>
        </div>
      </Container>
    </section>
  );
};
