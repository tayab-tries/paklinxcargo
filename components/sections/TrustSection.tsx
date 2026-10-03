import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface TrustMetricData {
  value?: string;
  label: string;
}

export interface TrustSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  metrics?: TrustMetricData[];
  blockData?: Record<string, unknown>;
}

export const TrustSection: React.FC<TrustSectionProps> = ({
  badge: propBadge,
  heading: propHeading,
  description: propDescription,
  metrics: propMetrics,
  blockData,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'Reliability';
  const title = propHeading || (blockData?.title as string) || 'RELIABLE CARGO DELIVERY FROM PAKISTAN';
  const subtitle =
    propDescription ||
    (blockData?.subtitle as string) ||
    'Factual operational capabilities for international air and sea cargo export shipments.';

  const defaultCredentials = [
    {
      value: 'DOORSTEP',
      label: 'Scheduled cargo collection directly from homes and commercial addresses across major Pakistani cities with export packaging inspection.',
    },
    {
      value: 'AIR & SEA',
      label: 'Air cargo dispatches departing major airport terminals and ocean container shipping connecting Pakistan export gateways.',
    },
    {
      value: 'TRACKING',
      label: 'Enter your tracking number online to check current milestone progress, export clearance, international dispatch, and final delivery status.',
    },
  ];

  const credentials =
    propMetrics && propMetrics.length > 0
      ? propMetrics
      : defaultCredentials;

  if (!credentials || credentials.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-12" />

        <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {credentials.map((item, idx) => (
            <div key={idx} className="p-6 lg:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="md:w-1/4 space-y-1">
                {item.value && (
                  <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-wider block">
                    {item.value}
                  </span>
                )}
                <div className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span>✓ Verified Capability</span>
                </div>
              </div>

              <div className="md:w-3/4 space-y-2">
                <p className="text-body-md text-slate-700 leading-relaxed max-w-2xl font-medium">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
