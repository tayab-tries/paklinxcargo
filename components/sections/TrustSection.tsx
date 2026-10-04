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
    <section className="w-full bg-[#17201B] py-16 lg:py-24 border-b border-brand-gold/20 text-brand-cream relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(198,161,91,0.08),transparent_70%)]" />

      <Container className="relative z-10">
        <SectionHeading
          badge={badge}
          title={title}
          subtitle={subtitle}
          badgeVariant="outline-dark"
          className="mb-12 lg:mb-16 [&_h2]:text-brand-cream [&_h2]:font-serif [&_p]:text-brand-cream/80"
        />

        <div className="bg-[#12372A] rounded-lg border border-brand-gold/30 divide-y divide-brand-gold/20 shadow-2xl overflow-hidden">
          {credentials.map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-[#0E281F] transition-all duration-300">
              <div className="md:w-1/4 space-y-1.5 shrink-0">
                {item.value && (
                  <span className="text-xs font-mono font-bold uppercase text-brand-gold tracking-widest block">
                    {item.value}
                  </span>
                )}
                <div className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Capability</span>
                </div>
              </div>

              <div className="md:w-3/4 space-y-2">
                <p className="font-sans text-sm sm:text-base text-brand-cream/85 leading-relaxed font-normal max-w-2xl">
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

