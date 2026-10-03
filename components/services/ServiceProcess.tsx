import React from 'react';
import { ProcessSection } from '@/components/sections/ProcessSection';

export interface ServiceProcessProps {
  steps?: Array<{
    title?: string;
    name?: string;
    description?: string;
    number?: string;
    details?: string;
    stepNumber?: number | string;
    subtitle?: string;
  }>;
}

export const ServiceProcess: React.FC<ServiceProcessProps> = () => {
  return <ProcessSection />;
};
