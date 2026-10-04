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
              'px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F8A5B]',
              isActive
                ? 'bg-slate-100 text-[#12372A] font-bold'
                : 'text-slate-700 hover:text-[#12372A] hover:bg-slate-100/70 font-medium'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
