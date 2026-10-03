import React from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface ArticleFaqProps {
  faqs?: Array<{ question: string; answer: string }>;
}

export const ArticleFaq: React.FC<ArticleFaqProps> = ({ faqs = [] }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full bg-surface py-12 lg:py-16 border-t border-b border-border text-brand-black">
      <div className="max-w-prose space-y-6">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Common questions addressed in this guide."
        />
        <div className="bg-surface-subtle p-6 rounded-md border border-border">
          <Accordion
            items={faqs.map((item, idx) => ({
              id: `faq-${idx}`,
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </div>
    </section>
  );
};
