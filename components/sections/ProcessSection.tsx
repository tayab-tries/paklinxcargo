import React from 'react';
import { Container } from '@/components/ui/Container';

export interface ProcessStepData {
  stepNumber?: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface ProcessSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  steps?: ProcessStepData[];
  blockData?: Record<string, unknown>;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  badge: propBadge,
  heading: propHeading,
  description: propDescription,
  steps: propSteps,
  blockData,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'OPERATIONAL PROCESS';
  const title = propHeading || (blockData?.title as string) || 'How Your Cargo Moves';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'From initial rate request to doorstep delivery at your international destination.';

  const defaultSteps: ProcessStepData[] = [
    {
      stepNumber: '01',
      title: 'RATE INQUIRY',
      subtitle: 'Submit Details',
      description: 'Provide cargo weight, origin city in Pakistan, and destination country to receive custom quote.',
    },
    {
      stepNumber: '02',
      title: 'DOORSTEP PICKUP',
      subtitle: 'Scheduled Collection',
      description: 'Our team collects parcels directly from your residence, factory, or office address in Pakistan.',
    },
    {
      stepNumber: '03',
      title: 'EXPORT & DISPATCH',
      subtitle: 'Air / Sea Departure',
      description: 'Customs declaration, security screening, and international flight or vessel departure.',
    },
    {
      stepNumber: '04',
      title: 'DESTINATION DELIVERY',
      subtitle: 'Doorstep Handoff',
      description: 'Import clearance and final mile delivery directly to the recipient address overseas.',
    },
  ];

  const steps: ProcessStepData[] =
    propSteps && propSteps.length > 0
      ? propSteps
      : defaultSteps;

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#F6F2E9] py-20 lg:py-28 text-[#17201B] relative overflow-hidden border-b border-[#12372A]/10">
      <Container className="space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#12372A]/5 border border-[#12372A]/15 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F8A5B]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#1F8A5B]">
              {badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17201B] tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-[#12372A]/15 shadow-2xs space-y-4 flex flex-col justify-between relative group hover:border-[#1F8A5B] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#12372A]/10 pb-3">
                  <span className="font-serif text-3xl font-bold text-[#12372A]">
                    {step.stepNumber || `0${idx + 1}`}
                  </span>
                  <span className="px-2 py-0.5 bg-[#1F8A5B]/10 text-[#1F8A5B] font-mono text-[10px] font-bold uppercase rounded">
                    Phase 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#17201B] group-hover:text-[#1F8A5B] transition-colors">
                    {step.title}
                  </h3>
                  {step.subtitle && (
                    <div className="text-[11px] font-mono font-bold text-[#1F8A5B] uppercase tracking-wider">
                      {step.subtitle}
                    </div>
                  )}
                </div>

                {step.description && (
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
