import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface DestinationProcessProps {
  countryName: string;
}

export const DestinationProcess: React.FC<DestinationProcessProps> = ({ countryName }) => {
  const steps = [
    {
      num: '01',
      title: 'REQUEST',
      subtitle: 'Quote & Specification',
      description: `Submit cargo details, dimensions, and preferred mode for export to ${countryName}.`,
    },
    {
      num: '02',
      title: 'ORIGIN HANDLING',
      subtitle: 'Collection & Clearance',
      description: 'Cargo collection across Pakistan hubs, itemized weighing, and export customs filing.',
    },
    {
      num: '03',
      title: 'INTERNATIONAL SHIPMENT',
      subtitle: 'Linehaul Transit',
      description: `Scheduled air cargo flight allocation or ocean vessel container linehaul heading to ${countryName}.`,
    },
    {
      num: '04',
      title: 'DESTINATION DELIVERY',
      subtitle: 'Customs & Handoff',
      description: `Import customs clearance at destination port and final delivery handoff across ${countryName}.`,
    },
  ];

  return (
    <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Corridor Logistics"
          title={`International Dispatch Workflow to ${countryName}`}
          subtitle={`Four operational stages connecting cargo pickup in Pakistan with final delivery in ${countryName}.`}
          className="mb-14"
        />

        <div className="bg-surface border border-border rounded-md p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative divide-y md:divide-y-0 md:divide-x divide-border">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`pt-6 md:pt-0 space-y-4 ${idx !== 0 ? 'md:pl-8' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-slate-400">{step.num}</span>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Stage {idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-heading-sm font-bold text-brand-black tracking-tight">{step.title}</h3>
                  <div className="text-xs font-mono font-semibold text-slate-500">{step.subtitle}</div>
                </div>

                <p className="text-body-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
