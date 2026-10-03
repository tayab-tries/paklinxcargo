import React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { requireAdminAuth } from '@/lib/supabase/auth-guard';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  // Enforce Server-Side Auth Guard for all protected operational admin routes
  const authUser = await requireAdminAuth();

  const navItems = [
    { label: 'Quotes & Bookings', href: '/admin/quotes', icon: FileText },
    { label: 'Sanity CMS Studio', href: '/studio', icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground selection:bg-slate-800 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">Operational Admin</span>
            <span className="text-sm font-bold text-foreground">{siteConfig.name}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md text-foreground hover:bg-surface-subtle hover:text-accent transition-colors"
              >
                <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          {authUser && (
            <div className="px-3 py-2 bg-surface-subtle rounded border border-border text-[11px] font-mono space-y-0.5">
              <span className="text-slate-400 block uppercase font-bold">Logged In User</span>
              <span className="text-brand-black font-semibold truncate block">{authUser.profile.full_name}</span>
              <span className="text-emerald-700 capitalize font-bold">Role: {authUser.profile.role}</span>
            </div>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-14 bg-surface border-b border-border px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">Raahi International — Operational Portal</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-semibold">
              Authenticated Server Session
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
