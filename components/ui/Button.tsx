import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

/** Helper function combining clsx and tailwind-merge */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'accent'
    | 'secondary'
    | 'outline'
    | 'outline-dark'
    | 'ghost'
    | 'ghost-dark'
    | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isIconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isIconOnly = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Base structural styles & focus visible outline
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-emerald disabled:opacity-50 disabled:cursor-not-allowed select-none active:translate-y-0.5 min-h-[44px] min-w-[44px] tracking-wide';

    // Size styles (Handles normal labeled buttons vs explicit icon-only mode)
    const sizeStyles = {
      sm: isIconOnly ? 'p-2 h-9 w-9 min-h-[36px] min-w-[36px]' : 'text-xs px-4 py-2 h-9 gap-1.5 min-h-[36px]',
      md: isIconOnly ? 'p-2.5 h-11 w-11' : 'text-sm px-5 py-2.5 h-11 gap-2',
      lg: isIconOnly ? 'p-3.5 h-12 w-12' : 'text-base px-6 py-3.5 h-12 gap-2.5',
    }[size];

    // Authoritative Variant Styles
    const variantStyles = {
      // Primary: Forest Green Fill + Warm Cream Text
      primary: 'bg-brand-forest text-brand-cream hover:bg-brand-forest-deep border border-transparent shadow-sm',
      // High-Conversion Accent CTA: Muted Gold Fill + Near Black Text
      accent: 'bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-bold border border-transparent shadow-sm',
      // Secondary: Near Black Fill + Warm Cream Text
      secondary: 'bg-brand-dark text-brand-cream hover:bg-brand-dark-subtle border border-border-dark shadow-sm',
      // Light Outline: Surface Fill + Near Black Text
      outline: 'bg-surface text-brand-dark font-semibold border border-border hover:bg-brand-cream-soft hover:border-brand-gold hover:text-brand-dark',
      // Dark Outline: Forest Navy Surface + Warm Cream Text
      'outline-dark': 'bg-brand-forest/90 text-brand-cream font-semibold border border-brand-forest-light hover:bg-brand-forest hover:text-white',
      // Light Ghost: Transparent + Near Black Text
      ghost: 'bg-transparent text-brand-dark font-semibold hover:bg-brand-cream-muted/50 hover:text-brand-dark',
      // Dark Ghost: Transparent + Warm Cream Text
      'ghost-dark': 'bg-transparent text-brand-cream font-semibold hover:bg-white/10 hover:text-white',
      // Destructive Action: Red Fill + White Text
      destructive: 'bg-danger text-white hover:bg-red-700 font-bold border border-transparent shadow-sm',
    }[variant];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-label={isIconOnly ? ariaLabel || (typeof children === 'string' ? children : 'Action') : ariaLabel}
        className={cn(baseStyles, sizeStyles, className, variantStyles)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="shrink-0 text-current">{leftIcon}</span>
        ) : null}
        {!isIconOnly && <span className="text-current font-inherit">{children}</span>}
        {!isLoading && rightIcon ? <span className="shrink-0 text-current">{rightIcon}</span> : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
