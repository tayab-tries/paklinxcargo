'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  FileText,
  ExternalLink,
  Menu,
  X,
  Home,
  User,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface AdminSidebarNavProps {
  userProfile: {
    full_name: string;
    email: string;
    role: 'admin' | 'editor';
  };
  children: React.ReactNode;
}

export function AdminSidebarNav({ userProfile, children }: AdminSidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile drawer when route changes (render-phase state adjustment)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Quote Operations', href: '/admin/quotes', icon: FileText },
    { label: 'Sanity CMS Studio', href: '/studio', icon: ExternalLink, isExternal: true },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#12372A] text-[#F6F2E9]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1F8A5B]/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1F8A5B]/20 rounded-lg text-[#C6A15B]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A15B] block font-semibold">
              Operations Desk
            </span>
            <span className="text-sm font-bold tracking-tight text-white font-sans">
              {siteConfig.name}
            </span>
          </div>
        </div>
        {/* Close button for mobile drawer */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-md text-[#F6F2E9]/70 hover:text-white hover:bg-[#1F8A5B]/30 transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#F6F2E9]/50 font-semibold">
          Primary Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href) && item.href !== '/studio';
          return (
            <Link
              key={item.href}
              href={item.href}
              target={item.isExternal ? '_blank' : undefined}
              rel={item.isExternal ? 'noopener noreferrer' : undefined}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#1F8A5B] text-white shadow-sm'
                  : 'text-[#F6F2E9]/80 hover:bg-[#1F8A5B]/20 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6A15B]' : 'text-[#F6F2E9]/60'}`} />
                <span>{item.label}</span>
              </div>
              {item.isExternal && <ExternalLink className="w-3 h-3 text-[#F6F2E9]/40" />}
            </Link>
          );
        })}
      </nav>

      {/* Admin User Info & Site Return */}
      <div className="p-4 border-t border-[#1F8A5B]/30 space-y-3">
        <div className="px-3.5 py-2.5 bg-[#17201B]/60 rounded-md border border-[#1F8A5B]/20 space-y-1 font-mono text-[11px]">
          <div className="flex items-center justify-between text-[#F6F2E9]/60 text-[10px] uppercase tracking-wider">
            <span>Operator Identity</span>
            <User className="w-3.5 h-3.5 text-[#C6A15B]" />
          </div>
          <div className="text-white font-bold truncate">{userProfile.full_name}</div>
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[#F6F2E9]/60 text-[10px]">Role</span>
            <span className="px-1.5 py-0.2 bg-[#1F8A5B]/40 text-[#C6A15B] text-[10px] uppercase font-bold rounded">
              {userProfile.role}
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#F6F2E9]/70 hover:text-white hover:bg-[#1F8A5B]/20 rounded-md transition-colors"
        >
          <Home className="w-4 h-4 text-[#F6F2E9]/50" />
          <span>Public Website</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F6F2E9]/30 text-[#17201B]">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-[#12372A]/10 shadow-sm sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-[#12372A] text-white px-4 py-3 border-b border-[#1F8A5B]/30 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-md text-white bg-[#1F8A5B]/30 hover:bg-[#1F8A5B]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
            aria-label="Open admin navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-mono text-[#C6A15B] uppercase block leading-none font-bold">
              Operations Portal
            </span>
            <span className="text-xs font-bold text-white font-sans">{siteConfig.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#1F8A5B]/30 text-[#C6A15B] border border-[#1F8A5B]/40 rounded text-[10px] font-mono font-semibold uppercase">
            {userProfile.role}
          </span>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Sheet Drawer */}
          <div className="relative w-4/5 max-w-xs bg-[#12372A] shadow-2xl z-10 flex flex-col h-full">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-14 bg-white border-b border-[#12372A]/10 px-8 items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wide">
              {siteConfig.name} &bull; Admin Operations Desk
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Authenticated Session
            </span>
          </div>
        </header>

        {/* Content Region */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}
