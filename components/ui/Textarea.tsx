import React from 'react';
import { cn } from './Button';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variantSurface?: 'light' | 'dark';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      variantSurface = 'light',
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const surfaceStyles = {
      light: 'bg-surface text-brand-black border-border placeholder:text-slate-400 focus:border-accent focus:ring-accent/30',
      dark: 'bg-brand-navy text-white border-border-dark placeholder:text-slate-500 focus:border-accent focus:ring-accent/30',
    }[variantSurface];

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-xs font-mono font-semibold uppercase tracking-wider',
              variantSurface === 'dark' ? 'text-slate-300' : 'text-slate-700'
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full p-3.5 text-sm rounded-md border transition-colors outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-danger focus:border-danger focus:ring-danger/30',
            surfaceStyles,
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-danger font-medium mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
