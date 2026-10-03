'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle } from 'lucide-react';
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
        // Do not handle Next.js control flow redirect as a user-facing login error
        return;
      }

      setError(err instanceof Error ? err.message : 'An error occurred during authentication.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-md border border-border shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-surface-muted rounded-full text-secondary mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-heading-md font-bold text-foreground">{siteConfig.name} Admin</h1>
          <p className="text-body-sm text-muted-foreground">
            Sign in to access internal content management and operational publishing controls.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-md text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-semibold text-foreground mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-9 pr-3 py-2 bg-surface text-foreground text-sm rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-semibold text-foreground mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-surface text-foreground text-sm rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
