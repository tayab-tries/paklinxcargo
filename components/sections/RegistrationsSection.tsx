import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface RegistrationItem {
  name: string;
  logo?: string;
  altText?: string;
}

export interface RegistrationsSectionProps {
  heading?: string;
  items?: RegistrationItem[];
  blockData?: Record<string, unknown>;
}

export const RegistrationsSection: React.FC<RegistrationsSectionProps> = ({
  heading: propHeading,
  items: propItems,
  blockData,
}) => {
  const heading =
    propHeading ||
    (blockData?.heading as string) ||
    'REGISTERED WITH FBR AND INTERNATIONALLY AFFILIATED';

  const defaultItems: RegistrationItem[] = [
    {
      name: 'FBR',
      logo: '/images/logos/fbr.svg',
      altText: 'Federal Board of Revenue Pakistan',
    },
    {
      name: 'IAM (USA)',
      logo: '/images/logos/iam-usa.svg',
      altText: 'International Association of Movers USA',
    },
    {
      name: 'MOVERS P.O.E',
      logo: '/images/logos/movers-poe.svg',
      altText: 'Movers Port of Entry',
    },
    {
      name: 'FIDI GLOBAL ALLIANCE',
      logo: '/images/logos/fidi.svg',
      altText: 'FIDI Global Alliance',
    },
    {
      name: 'CANADIAN ASSOCIATION OF MOVERS (CAM)',
      logo: '/images/logos/cam.svg',
      altText: 'Canadian Association of Movers',
    },
  ];

  const rawItems = propItems && propItems.length > 0
    ? propItems
    : Array.isArray(blockData?.items) && blockData.items.length > 0
    ? (blockData.items as RegistrationItem[])
    : defaultItems;

  const items = rawItems.filter((item): item is RegistrationItem & { logo: string } => Boolean(item && item.logo));

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#12372A] text-[#F6F2E9] py-14 lg:py-18 border-b border-[#12372A]/10 select-none">
      <Container className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#1F8A5B]/30 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#C6A15B]">
              VERIFIED CREDENTIALS & AFFILIATIONS
            </span>
          </div>
          <span className="text-xs font-mono text-[#F6F2E9]/60">
            {heading}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[#17201B] p-4 rounded-xl border border-[#1F8A5B]/20 flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#C6A15B]/50 transition-colors"
            >
              <div className="relative w-full h-12 flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.altText || item.name}
                  width={200}
                  height={60}
                  className="max-h-10 w-auto object-contain filter drop-shadow"
                />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#F6F2E9]/80 tracking-wider">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
