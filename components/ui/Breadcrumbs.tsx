import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from './Button';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variantSurface?: 'light' | 'dark';
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  variantSurface = 'dark',
  className,
}) => {
  const textStyles = variantSurface === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const activeStyles = variantSurface === 'dark' ? 'text-slate-200' : 'text-slate-800';

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs font-mono py-2', className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className={cn('flex items-center hover:underline', textStyles)}>
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              {isLast || !item.href ? (
                <span className={cn('font-semibold truncate max-w-[200px]', activeStyles)} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={cn('hover:underline truncate max-w-[200px]', textStyles)}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
