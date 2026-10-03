'use client';

import React, { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Search, Phone, MessageSquare } from 'lucide-react';
import { navConfig, primaryCta } from '@/config/nav.config';
import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/Button';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

interface MobileNavProps {
  brandName?: string;
  phone?: string;
  whatsappNumber?: string;
}

const emptySubscribe = () => () => {};

export const MobileNav: React.FC<MobileNavProps> = ({ brandName: propBrand, phone: propPhone, whatsappNumber: propWhatsapp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const brandName = propBrand || siteConfig.name;
  const phone = propPhone || '';
  const whatsappNumber = propWhatsapp || phone;
  const whatsappUrl = buildWhatsappUrl(whatsappNumber);

  // React 19 hydration safe mount check without setState in useEffect
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Lock background page scrolling when mobile navigation drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Accessibility: Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // Render Full-Screen Drawer via Portal to eliminate horizontal overflow & layout constraints
  const renderMobileDrawer = () => {
    if (!isOpen || !isHydrated) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-50 bg-brand-black flex flex-col justify-between overflow-y-auto animate-in fade-in duration-150"
        style={{ width: '100vw', height: '100dvh', top: 0, left: 0, right: 0, bottom: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Full-Screen Drawer Top Header (Logo & Close X Button) */}
        <div className="flex items-center justify-between p-6 border-b border-border-dark shrink-0">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src="/images/brand/logo-white.svg"
              alt={`${brandName} Logo`}
              width={180}
              height={104}
              priority
              className="h-10 sm:h-12 w-auto object-contain max-h-[48px]"
            />
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close mobile navigation menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white bg-brand-navy hover:bg-brand-navy-light transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Full-Screen Drawer Body (Scrollable Navigation Links) */}
        <div className="px-6 py-8 space-y-3 overflow-y-auto flex-1">
          {navConfig.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`px-5 py-4 text-lg font-semibold rounded-md min-h-[52px] flex items-center justify-between transition-colors ${
                  isActive
                    ? 'text-accent bg-brand-navy font-bold border border-border-dark'
                    : 'text-slate-100 hover:text-white hover:bg-brand-navy-light/40 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </Link>
            );
          })}
        </div>

        {/* Full-Screen Drawer Footer Actions */}
        <div className="p-6 border-t border-border-dark space-y-3 shrink-0 bg-brand-navy/30">
          <Link href={primaryCta.href} onClick={closeMenu} className="block w-full">
            <Button
              variant="accent"
              size="lg"
              className="w-full min-h-[48px] text-base font-bold"
              rightIcon={<ArrowRight className="w-5 h-5 text-brand-black" />}
            >
              {primaryCta.label}
            </Button>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="block w-full"
          >
            <Button
              variant="outline-dark"
              size="lg"
              className="w-full min-h-[48px] text-base font-bold border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
              leftIcon={<MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 fill-current" />}
            >
              WHATSAPP US
            </Button>
          </a>
          <Link href="/track" onClick={closeMenu} className="block w-full">
            <Button
              variant="outline-dark"
              size="lg"
              className="w-full min-h-[48px] text-base font-semibold"
              leftIcon={<Search className="w-5 h-5 text-accent" />}
            >
              Track Shipment
            </Button>
          </Link>

          <div className="pt-2 flex items-center justify-center gap-2 text-sm font-mono text-slate-300">
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
              {phone}
            </a>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Hamburger Trigger Button in Header (Min 44px touch target) */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open mobile navigation menu"
        aria-expanded={isOpen}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md bg-brand-navy hover:bg-brand-navy-light text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Render Mobile Drawer via Portal */}
      {renderMobileDrawer()}
    </div>
  );
};
