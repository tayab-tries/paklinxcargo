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
    accent: 'text-accent hover:underline font-semibold',
    primary: 'text-brand-black hover:text-accent font-semibold',
    muted: 'text-slate-400 hover:text-white font-normal',
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
