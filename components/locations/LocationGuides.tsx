import React from 'react';
import { GuidesPreviewSection } from '@/components/sections/GuidesPreviewSection';

export interface LocationGuidesProps {
  cityName?: string;
}

export const LocationGuides: React.FC<LocationGuidesProps> = () => {
  return <GuidesPreviewSection />;
};
