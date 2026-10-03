'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './Button';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  variantSurface?: 'light' | 'dark';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variantSurface = 'light',
  className,
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className={cn('space-y-3 divide-y divide-border', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="pt-3">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={cn(
                'w-full flex items-center justify-between text-left py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs',
                variantSurface === 'dark' ? 'text-white hover:text-accent' : 'text-brand-black hover:text-accent'
              )}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-accent shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            {isOpen && (
              <div
                className={cn(
                  'pt-2 pb-3 text-xs leading-relaxed max-w-prose animate-in fade-in duration-150',
                  variantSurface === 'dark' ? 'text-slate-300' : 'text-slate-600'
                )}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
