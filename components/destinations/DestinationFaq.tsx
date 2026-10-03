import React from 'react';
import { FaqSection } from '@/components/sections/FaqSection';

export interface DestinationFaqProps {
  countryName: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export const DestinationFaq: React.FC<DestinationFaqProps> = ({ faqs }) => {
  return <FaqSection faqs={faqs} />;
};
