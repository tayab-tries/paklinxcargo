import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Service } from '@/lib/supabase/services';

export interface ServiceOverviewProps {
  service: Service;
}

export const ServiceOverview: React.FC<ServiceOverviewProps> = ({ service }) => {
  return (
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border text-brand-black">
      <Container size="narrow">
        <SectionHeading
          badge="Scope & Specifications"
          title={`About Our ${service.title}`}
          className="mb-8"
        />

        <div className="prose prose-slate max-w-prose text-body-md leading-relaxed text-slate-700 space-y-4">
          <p>{service.full_description || service.short_description}</p>
        </div>

        {service.use_cases && service.use_cases.length > 0 && (
          <div className="mt-12 bg-surface-subtle p-6 rounded-md border border-border space-y-4">
            <h3 className="text-heading-sm font-bold text-brand-black">Recommended Cargo Use Cases</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              {service.use_cases.map((useCase, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
};
