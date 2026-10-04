import React from 'react';
import { Accordion } from '@/components/ui/Accordion';

export interface ArticleFaqProps {
  faqs?: Array<{ question: string; answer: string }>;
}

export const ArticleFaq: React.FC<ArticleFaqProps> = ({ faqs = [] }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="py-10 border-t border-[#17201B]/15 space-y-6">
      <div className="text-xs font-mono font-bold uppercase text-[#1F8A5B] tracking-widest">
        FREQUENTLY ASKED QUESTIONS
      </div>
      <div className="bg-[#F6F2E9] p-6 lg:p-8 border border-[#17201B]/15">
        <Accordion
          items={faqs.map((item, idx) => ({
            id: `faq-${idx}`,
            title: item.question,
            content: item.answer,
          }))}
        />
      </div>
    </div>
  );
};
