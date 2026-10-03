'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
  blockData?: Record<string, unknown>;
  whatsappNumber?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  badge: propBadge,
  title: propTitle,
  subtitle: propSubtitle,
  faqs,
  blockData,
  whatsappNumber,
}) => {
  const badge = propBadge || (blockData?.badge as string) || 'FAQ';
  const title = propTitle || (blockData?.title as string) || 'Frequently Asked Questions';
  const subtitle =
    propSubtitle ||
    (blockData?.subtitle as string) ||
    'Simple answers about cargo pickup, rates, personal belongings, and WhatsApp quotes.';

  const defaultFaqs: FaqItem[] = [
    {
      question: 'Can you pick up cargo from my home?',
      answer: 'Yes! We provide doorstep cargo pickup directly from your home or commercial address across major Pakistani cities including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Sialkot, Multan, and Peshawar.',
    },
    {
      question: 'How much does cargo cost?',
      answer: 'Cargo shipping rates depend on the origin city in Pakistan, destination country, weight, and transit mode (Air Cargo vs Sea Cargo). You can get an instant estimate online or message us on WhatsApp for exact pricing.',
    },
    {
      question: 'What can I send?',
      answer: 'You can send personal belongings, clothes, gifts, household goods, excess travel luggage, and commercial export items.',
    },
    {
      question: 'Can I send personal belongings?',
      answer: 'Yes! Personal belongings such as clothes, shoes, household items, and personal gifts are commonly shipped via air and sea cargo with complete door-to-door delivery.',
    },
    {
      question: 'Can I send excess baggage?',
      answer: 'Yes! If you are travelling or moving abroad, you can send extra luggage separately via air cargo to save on airline excess baggage fees.',
    },
    {
      question: 'Do you provide door-to-door delivery?',
      answer: 'Yes! Both our Air Cargo and Sea Cargo services include complete door-to-door options, picking up from your address in Pakistan and delivering directly to the recipient\'s door at your destination.',
    },
    {
      question: 'What documents do I need?',
      answer: 'For personal cargo, you generally need a sender ID copy, recipient address details, and a simple item declaration list. For commercial cargo, a commercial invoice and packing list are required.',
    },
    {
      question: 'How do I get a quote?',
      answer: 'Simply use our online quote form by selecting your pickup city, destination country, and approximate weight, or contact our team directly on WhatsApp.',
    },
    {
      question: 'Can I get a quote on WhatsApp?',
      answer: 'Yes! You can message us directly on WhatsApp with your cargo details and our team will guide you and provide a quote.',
    },
    {
      question: 'How is volumetric weight calculated for air cargo?',
      answer: 'Air cargo volumetric weight is calculated using the formula: (Length × Width × Height in cm) / 5000. Shippers are billed on whichever is higher: actual scale weight or volumetric weight.',
    },
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const whatsappUrl = buildWhatsappUrl(
    whatsappNumber,
    'Assalam o Alaikum, I want to send cargo from Pakistan. Please give me a quote.'
  );

  return (
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border text-brand-black">
      <Container size="narrow">
        <SectionHeading
          badge={badge}
          title={title}
          subtitle={subtitle}
          className="mb-12 text-center mx-auto"
          align="center"
        />

        <div className="border-t border-border divide-y divide-border">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-heading-sm font-bold text-brand-black hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs py-1"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-black' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3 pb-2 text-body-md text-slate-600 leading-relaxed max-w-prose animate-in fade-in duration-150 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 bg-emerald-50 rounded-md border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Have a question or need instant rate guidance?</h4>
            <p className="text-xs text-emerald-700 mt-0.5">Chat with our team directly on WhatsApp for assistance.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded transition-colors shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </Container>
    </section>
  );
};
