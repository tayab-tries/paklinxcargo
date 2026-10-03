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
    accent: 'bg-accent-soft text-brand-black border border-accent/40 font-semibold',
    primary: 'bg-brand-black text-white border border-transparent',
    secondary: 'bg-brand-navy text-white border border-border-dark',
    default: 'bg-brand-navy text-white border border-border-dark',
    navy: 'bg-brand-navy text-white border border-border-dark',
    outline: 'bg-transparent text-brand-black border border-border',
    'outline-dark': 'bg-transparent text-slate-300 border border-border-dark',
    success: 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80',
    warning: 'bg-amber-950/60 text-amber-300 border border-amber-800/80',
  }[variant];

  return (
    <span className={cn(baseStyles, sizeStyles, variantStyles, className)} {...props}>
      {children}
    </span>
  );
};
