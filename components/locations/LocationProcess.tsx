import React from 'react';
import { Container } from '@/components/ui/Container';

export interface LocationProcessProps {
  cityName: string;
}

export const LocationProcess: React.FC<LocationProcessProps> = ({ cityName }) => {
  const steps = [
    {
      num: '01',
      title: 'REQUEST',
      subtitle: 'Quote & Specification',
      description: `Tell us what you are shipping and your pickup location in ${cityName}.`,
    },
    {
      num: '02',
      title: 'PICKUP',
      subtitle: 'Doorstep Collection',
      description: `Schedule doorstep cargo pickup from your premises across ${cityName}.`,
    },
    {
      num: '03',
      title: 'EXPORT',
      subtitle: 'Customs & Preparation',
      description: `Cargo is prepared for export declaration, weighing, and export packing.`,
    },
    {
      num: '04',
      title: 'TRANSIT',
      subtitle: 'International Delivery',
      description: `Shipment moves by selected air freight or ocean sea cargo mode toward its destination.`,
    },
  ];

  return (
    <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 border-b border-[#12372A]/10 text-[#17201B]">
      <Container>
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#1F8A5B] uppercase tracking-widest">
              Pickup Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17201B]">
              How Pickup Works in {cityName}
            </h2>
            <p className="font-sans text-base text-[#17201B]/75">
              Four operational stages connecting pickup in {cityName} with international delivery.
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
