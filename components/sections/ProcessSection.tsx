import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

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
  const badge = propBadge || (blockData?.badge as string) || 'How It Works';
  const title = propHeading || (blockData?.title as string) || 'Simple 4-Step Cargo Shipping Process';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'From your initial quote to doorstep delivery at your destination address.';

  const defaultSteps: ProcessStepData[] = [
    {
      stepNumber: '01',
      title: 'GET A QUOTE',
      subtitle: 'Submit Online or WhatsApp',
      description: 'Tell us your pickup city in Pakistan, destination country, and approximate weight.',
    },
    {
      stepNumber: '02',
      title: 'HOME PICKUP',
      subtitle: 'Scheduled Address Collection',
      description: 'We collect your cargo directly from your home or business address in Pakistan.',
    },
    {
      stepNumber: '03',
      title: 'INTERNATIONAL SHIPPING',
      subtitle: 'Export Clearance & Dispatch',
      description: 'Customs declaration and international dispatch via air or sea cargo.',
    },
    {
      stepNumber: '04',
      title: 'FINAL DELIVERY',
      subtitle: 'Doorstep Handoff',
      description: 'Customs clearance at destination and final delivery to the recipient\'s door.',
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
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-12" />

        <div className="bg-surface-subtle border border-border rounded-md p-6 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative divide-y md:divide-y-0 md:divide-x divide-border">
            {steps.map((step, idx) => (
              <div key={idx} className={`pt-6 md:pt-0 space-y-3 ${idx !== 0 ? 'md:pl-6' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-slate-400">
                    {step.stepNumber || `0${idx + 1}`}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Step {idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-heading-sm font-bold text-brand-black tracking-tight">{step.title}</h3>
                  {step.subtitle && <div className="text-xs font-mono font-semibold text-accent">{step.subtitle}</div>}
                </div>

                {step.description && (
                  <p className="text-body-sm text-slate-600 leading-relaxed font-normal">{step.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
