import React from 'react';
import { cn } from './Button';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'navy' | 'ghost';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'light',
  hoverable = false,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-md transition-all duration-300 overflow-hidden';

  const variantStyles = {
    light: 'bg-surface text-brand-dark border border-border shadow-xs',
    dark: 'bg-brand-dark text-brand-cream border border-border-dark shadow-sm',
    navy: 'bg-brand-forest text-brand-cream border border-brand-forest-light shadow-sm',
    ghost: 'bg-transparent text-current border border-transparent',
  }[variant];

  const hoverStyles = hoverable
    ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-brand-gold/50'
    : '';

  return (
    <div className={cn(baseStyles, variantStyles, hoverStyles, className)} {...props}>
      {children}
    </div>
  );
};
