import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from './Button';

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'accent' | 'primary' | 'muted';
  external?: boolean;
  showIcon?: boolean;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  href,
  variant = 'accent',
  external = false,
  showIcon = false,
  className,
  ...props
}) => {
  const variantStyles = {
    accent: 'text-brand-emerald hover:text-brand-emerald-hover font-semibold underline underline-offset-4 decoration-brand-emerald/40 hover:decoration-brand-emerald',
    primary: 'text-brand-dark hover:text-brand-emerald font-semibold',
    muted: 'text-muted-foreground hover:text-brand-dark font-normal',
  }[variant];

  if (external || href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('inline-flex items-center gap-1 transition-colors', variantStyles, className)}
        {...props}
      >
        <span>{children}</span>
        {showIcon && <ArrowRight className="w-3.5 h-3.5 text-current shrink-0" />}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-1 transition-colors', variantStyles, className)}
      {...props}
    >
      <span>{children}</span>
      {showIcon && <ArrowRight className="w-3.5 h-3.5 text-current shrink-0" />}
    </Link>
  );
};
