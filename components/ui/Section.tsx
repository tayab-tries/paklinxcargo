import React from 'react';
import { cn } from './Button';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variantSurface?: 'dark' | 'navy' | 'light' | 'subtle';
  padding?: 'default' | 'compact' | 'hero' | 'none';
}

export const Section: React.FC<SectionProps> = ({
  children,
  variantSurface = 'light',
  padding = 'default',
  className,
  ...props
}) => {
  const surfaceStyles = {
    dark: 'bg-brand-black text-white border-b border-border-dark',
    navy: 'bg-brand-navy text-white border-b border-border-dark',
    light: 'bg-surface text-brand-black border-b border-border',
    subtle: 'bg-surface-subtle text-brand-black border-b border-border',
  }[variantSurface];

  const paddingStyles = {
    hero: 'py-24 lg:py-36',
    default: 'py-16 lg:py-24',
    compact: 'py-12 lg:py-16',
    none: 'py-0',
  }[padding];

  return (
    <section className={cn('w-full relative overflow-hidden', surfaceStyles, paddingStyles, className)} {...props}>
      {children}
    </section>
  );
};
