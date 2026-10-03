import React from 'react';
import { cn } from './Button';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variantSurface?: 'light' | 'dark';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      variantSurface = 'light',
      children,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const surfaceStyles = {
      light: 'bg-surface text-brand-black border-border focus:border-accent focus:ring-accent/30',
      dark: 'bg-brand-navy text-white border-border-dark focus:border-accent focus:ring-accent/30',
    }[variantSurface];

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'block text-xs font-mono font-semibold uppercase tracking-wider',
              variantSurface === 'dark' ? 'text-slate-300' : 'text-slate-700'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full h-11 px-3.5 py-2.5 text-sm rounded-md border appearance-none transition-colors outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed pr-10',
              error && 'border-danger focus:border-danger focus:ring-danger/30',
              surfaceStyles,
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-3.5 pointer-events-none text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {error ? (
          <p className="text-xs text-danger font-medium mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
