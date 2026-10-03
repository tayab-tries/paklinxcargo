import React from 'react';
import Image from 'next/image';

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
    'WE ARE REGISTERED WITH FBR AND ASSOCIATED WITH';

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
    <section className="w-full bg-brand-navy py-14 lg:py-20 border-b border-border-dark text-white select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center space-y-10 max-w-5xl mx-auto mb-10">
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block">
              Official Registrations & Global Affiliations
            </span>
            <h2 className="text-heading-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase leading-snug">
              {heading}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 items-stretch justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-center items-center text-center min-h-[120px] shadow-lg pointer-events-none transition-none"
            >
              <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.altText || item.name || 'Registration Logo'}
                  width={280}
                  height={80}
                  priority
                  className="max-h-14 sm:max-h-16 w-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2 block font-mono">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
