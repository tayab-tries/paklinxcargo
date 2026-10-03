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
      'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed select-none active:translate-y-0 min-h-[44px] min-w-[44px]';

    // Size styles (Handles normal labeled buttons vs explicit icon-only mode)
    const sizeStyles = {
      sm: isIconOnly ? 'p-2 h-9 w-9 min-h-[36px] min-w-[36px]' : 'text-xs px-3.5 py-2 h-9 gap-1.5 min-h-[36px]',
      md: isIconOnly ? 'p-2.5 h-11 w-11' : 'text-sm px-5 py-2.5 h-11 gap-2',
      lg: isIconOnly ? 'p-3.5 h-12 w-12' : 'text-base px-6 py-3.5 h-12 gap-2.5',
    }[size];

    // Authoritative Variant Styles (Composed AFTER caller className so required variant text color wins!)
    const variantStyles = {
      // Light Surface Primary: Brand Black Fill + White Text
      primary: 'bg-brand-black text-white hover:bg-slate-800 border border-transparent shadow-xs',
      // High-Conversion Accent CTA: Electric Cyan Fill + Brand Black Text (11.8:1 WCAG AAA)
      accent: 'bg-accent text-brand-black hover:bg-accent-hover font-bold border border-transparent shadow-xs',
      // Secondary: Navy Fill + White Text
      secondary: 'bg-brand-navy text-white hover:bg-brand-navy-light border border-border-dark shadow-xs',
      // Light Outline: Surface Fill + Brand Black Text (18.2:1 WCAG AAA)
      outline: 'bg-surface text-brand-black font-semibold border border-border hover:bg-surface-muted hover:border-border-strong hover:text-brand-black',
      // Dark Outline: Navy Surface + White Text (18.5:1 WCAG AAA)
      'outline-dark': 'bg-brand-navy/80 text-white font-semibold border border-border-dark hover:bg-brand-navy hover:text-white',
      // Light Ghost: Transparent + Brand Black Text
      ghost: 'bg-transparent text-brand-black font-semibold hover:bg-surface-muted hover:text-brand-black',
      // Dark Ghost: Transparent + White Text
      'ghost-dark': 'bg-transparent text-white font-semibold hover:bg-brand-navy-light hover:text-white',
      // Destructive Action: Red Fill + White Text
      destructive: 'bg-danger text-white hover:bg-red-700 font-bold border border-transparent shadow-xs',
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
