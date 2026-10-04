import React from 'react';
import { cn } from './Button';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'navy' | 'secondary' | 'outline' | 'outline-dark' | 'success' | 'warning' | 'default';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'accent',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded-xs uppercase tracking-wider select-none';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }[size];

  const variantStyles = {
    accent: 'bg-brand-gold-soft text-brand-dark border border-brand-gold/40 font-semibold',
    primary: 'bg-brand-forest text-brand-cream border border-transparent font-semibold',
    secondary: 'bg-brand-dark text-brand-cream border border-border-dark',
    default: 'bg-brand-forest text-brand-cream border border-border-dark',
    navy: 'bg-brand-forest text-brand-cream border border-border-dark',
    outline: 'bg-transparent text-brand-dark border border-border',
    'outline-dark': 'bg-transparent text-brand-cream/80 border border-border-dark',
    success: 'bg-brand-emerald-soft text-brand-emerald border border-brand-emerald/30 font-semibold',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold',
  }[variant];

  return (
    <span className={cn(baseStyles, sizeStyles, variantStyles, className)} {...props}>
      {children}
    </span>
  );
};
