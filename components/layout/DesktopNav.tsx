'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navConfig as defaultNavConfig } from '@/config/nav.config';
import { cn } from '@/components/ui/Button';

interface DesktopNavProps {
  navItems?: { label: string; href: string }[];
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const pathname = usePathname();

  const items = navItems && navItems.length > 0 ? navItems : defaultNavConfig;

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {items.map((item, idx) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <Link
            key={idx}
            href={item.href}
            className={cn(
              'px-3.5 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive
                ? 'text-accent font-semibold bg-brand-navy/60'
                : 'text-slate-200 hover:text-white hover:bg-brand-navy-light/40'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
