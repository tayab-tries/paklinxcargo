import React from 'react';
import { Container } from '@/components/ui/Container';

export interface ServiceSummaryPanelProps {
  serviceOverview?: string;
  targetAudience?: string | string[];
  keyConsiderations?: string[];
}

export const ServiceSummaryPanel: React.FC<ServiceSummaryPanelProps> = ({
  serviceOverview,
  targetAudience,
  keyConsiderations,
}) => {
  if (!serviceOverview && !targetAudience && (!keyConsiderations || keyConsiderations.length === 0)) {
    return null;
  }

  const audienceText = Array.isArray(targetAudience) ? targetAudience.join(', ') : targetAudience;

  return (
    <section className="w-full bg-brand-navy py-14 lg:py-20 border-b border-border-dark text-white">
      <Container>
        <div className="bg-brand-black-deep p-8 lg:p-10 rounded-md border border-border-dark space-y-8 shadow-xl">
          {serviceOverview && (
            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
                Service Overview & Capabilities
              </div>
              <p className="text-body-lg text-slate-200 leading-relaxed max-w-3xl font-normal">
                {serviceOverview}
              </p>
            </div>
          )}

          {audienceText && (
            <div className="space-y-3 pt-6 border-t border-border-dark">
              <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
                Target Shippers & Suitable Cargo
              </div>
              <p className="text-body-md text-slate-300 leading-relaxed max-w-3xl">
                {audienceText}
              </p>
            </div>
          )}

          {keyConsiderations && keyConsiderations.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-border-dark">
              <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
                Key Operational Considerations
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                {keyConsiderations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-brand-navy/60 p-3.5 rounded border border-border-dark">
                    <span className="w-2 h-2 rounded-full bg-accent mt-1 shrink-0" />
                    <span className="leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
