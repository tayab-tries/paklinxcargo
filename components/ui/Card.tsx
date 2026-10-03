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
  const baseStyles = 'rounded-md transition-all duration-200 overflow-hidden';

  const variantStyles = {
    light: 'bg-surface text-brand-black border border-border shadow-xs',
    dark: 'bg-brand-black text-white border border-border-dark shadow-md',
    navy: 'bg-brand-navy text-white border border-border-dark shadow-md',
    ghost: 'bg-transparent text-current border border-transparent',
  }[variant];

  const hoverStyles = hoverable
    ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40'
    : '';

  return (
    <div className={cn(baseStyles, variantStyles, hoverStyles, className)} {...props}>
      {children}
    </div>
  );
};
