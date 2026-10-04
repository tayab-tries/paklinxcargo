'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { adminLoginAction } from './actions';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await adminLoginAction({ email, password });

      if (res && !res.success) {
        setError(res.error || 'Authentication failed.');
        setLoading(false);
      }
    } catch (err: unknown) {
      // Next.js redirect() throws an internal NEXT_REDIRECT exception for navigation control flow.
      const isNextRedirect =
        err instanceof Error &&
        (err.message === 'NEXT_REDIRECT' ||
          err.message.includes('NEXT_REDIRECT') ||
          (err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT'));

      if (isNextRedirect) {
        return;
      }

      setError(err instanceof Error ? err.message : 'An error occurred during authentication.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F6F2E9] flex flex-col items-center justify-center p-4 sm:p-6 text-[#17201B]">
      {/* Container Box */}
      <div className="w-full max-w-md bg-white rounded-xl border border-[#12372A]/15 shadow-xl overflow-hidden">
        {/* Brand Banner Header */}
        <div className="bg-[#12372A] p-6 sm:p-8 text-white text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F8A5B]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex p-3 bg-[#1F8A5B]/20 rounded-xl text-[#C6A15B] border border-[#1F8A5B]/30 shadow-inner mb-1">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A15B] font-bold block mb-1">
              Private Operations Desk
            </span>
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              {siteConfig.name}
            </h1>
          </div>
          <p className="text-xs text-[#F6F2E9]/70 max-w-xs mx-auto leading-relaxed">
            Authorized admin credentials required for quote lead operations & dispatch management.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div
              role="alert"
              className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2.5 shadow-2xs"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5 font-mono">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F6F2E9]/40 text-[#17201B] text-xs font-medium rounded-lg border border-[#12372A]/20 focus:outline-none focus:ring-2 focus:ring-[#1F8A5B] focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F6F2E9]/40 text-[#17201B] text-xs font-medium rounded-lg border border-[#12372A]/20 focus:outline-none focus:ring-2 focus:ring-[#1F8A5B] focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1F8A5B] text-white font-semibold text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-[#12372A] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#12372A]/10 text-center">
            <span className="text-[11px] font-mono text-slate-500">
              Protected Surface &bull; Encrypted Session
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
