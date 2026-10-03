import React from 'react';
import { FaqSection } from '@/components/sections/FaqSection';

export interface LocationFaqProps {
  cityName: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export const LocationFaq: React.FC<LocationFaqProps> = ({ faqs }) => {
  return <FaqSection faqs={faqs} />;
};
