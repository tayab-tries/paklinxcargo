'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface TrackingLookupFormProps {
  value: string;
  isLoading?: boolean;
  error?: string | null;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TrackingLookupForm: React.FC<TrackingLookupFormProps> = ({
  value,
  isLoading = false,
  error = null,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4" id="tracking-lookup-form">
      <div className="space-y-1">
        <label
          htmlFor="trackingNumber"
          className="block text-xs font-mono font-bold uppercase text-brand-black tracking-wider"
        >
          Shipment Tracking Number
        </label>
        <p className="text-xs text-slate-600">
          Enter the tracking number provided on your shipment booking receipt (e.g., <code className="font-mono text-brand-black bg-surface-subtle px-1 py-0.5 rounded border border-border">TRK-1002</code>).
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            id="trackingNumber"
            name="trackingNumber"
            required
            autoComplete="off"
            placeholder="TRK-1002"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={error ? 'tracking-error' : 'tracking-helper'}
            className="w-full h-[50px] px-4 bg-background text-brand-black placeholder-slate-400 border border-border rounded-md font-mono text-sm sm:text-base focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          isLoading={isLoading}
          className="h-[50px] px-8 shrink-0 w-full sm:w-auto font-bold text-base"
          leftIcon={<Search className="w-4 h-4 text-brand-black shrink-0" />}
        >
          Track Shipment
        </Button>
      </div>

      {error && (
        <p id="tracking-error" className="text-xs font-mono text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded" role="alert">
          {error}
        </p>
      )}

      {/* Quote Reference vs Shipment Tracking Number Distinction Notice */}
      <div id="tracking-helper" className="pt-2 text-[11px] font-mono text-slate-500 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span>Have a quote inquiry reference (e.g. <span className="text-slate-700 font-semibold">QTE-2026-XXXXXXXX</span>)?</span>
        <span className="text-slate-600 font-medium">Quote references are for price inquiries. Shipment tracking requires a tracking number assigned after booking.</span>
      </div>
    </form>
  );
};
