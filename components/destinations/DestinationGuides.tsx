import React from 'react';
import { GuidesPreviewSection } from '@/components/sections/GuidesPreviewSection';

export interface DestinationGuidesProps {
  countryName?: string;
}

export const DestinationGuides: React.FC<DestinationGuidesProps> = () => {
  return <GuidesPreviewSection />;
};
