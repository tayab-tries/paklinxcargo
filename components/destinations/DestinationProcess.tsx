import React from 'react';
import { Container } from '@/components/ui/Container';

export interface DestinationProcessProps {
  countryName: string;
}

export const DestinationProcess: React.FC<DestinationProcessProps> = ({ countryName }) => {
  const steps = [
    {
      num: '01',
      title: 'BOOK / QUOTE',
      subtitle: 'Quote & Specification',
      description: `Submit shipment details, dimensions, and preferred mode for export to ${countryName}.`,
    },
    {
      num: '02',
      title: 'PICKUP IN PAKISTAN',
      subtitle: 'Collection & Clearance',
      description: `Doorstep collection across Pakistan receiving hubs, volumetric weighing, and export customs filing.`,
    },
    {
      num: '03',
      title: 'EXPORT & TRANSIT',
      subtitle: 'Linehaul Dispatch',
      description: `Scheduled air cargo flight allocation or ocean container linehaul heading to ${countryName}.`,
    },
    {
      num: '04',
      title: 'DESTINATION DELIVERY',
      subtitle: 'Customs & Handoff',
      description: `Import customs clearance processing at target port and final delivery handoff in ${countryName}.`,
    },
  ];

  return (
    <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              Corridor Logistics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
              International Dispatch Workflow to {countryName}
            </h2>
            <p className="font-sans text-base text-[#17201B]/75">
              Four operational stages connecting cargo pickup in Pakistan with final delivery in {countryName}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="p-6 bg-white rounded-2xl border border-[#12372A]/15 space-y-4 shadow-2xs hover:border-[#C6A15B]/50 transition-all group"
              >
                <div className="flex items-center justify-between border-b border-[#12372A]/10 pb-3">
                  <span className="font-mono text-3xl font-bold text-[#C6A15B]">{step.num}</span>
                  <span className="font-mono text-[10px] font-bold text-[#1F8A5B] uppercase tracking-widest">
                    Stage {idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#17201B] tracking-tight">{step.title}</h3>
                  <div className="font-mono text-xs font-semibold text-[#1F8A5B]">{step.subtitle}</div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#17201B]/75 leading-relaxed font-normal">
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
