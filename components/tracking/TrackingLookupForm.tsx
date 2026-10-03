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
    <form onSubmit={onSubmit} className="w-full space-y-3" id="tracking-lookup-form">
      <label
        htmlFor="trackingNumber"
        className="block text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider"
      >
        Tracking Number
      </label>

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            id="trackingNumber"
            name="trackingNumber"
            required
            autoComplete="off"
            placeholder="Enter your tracking number (e.g. TRK-1002)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={error ? 'tracking-error' : undefined}
            className="w-full h-[50px] px-4 bg-brand-navy text-white placeholder-slate-400 border border-border-dark rounded-md font-mono text-sm sm:text-base focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          isLoading={isLoading}
          className="h-[50px] px-8 shrink-0 w-full sm:w-auto font-bold"
          leftIcon={<Search className="w-4 h-4 text-brand-black shrink-0" />}
        >
          Track Cargo
        </Button>
      </div>

      {error && (
        <p id="tracking-error" className="text-xs font-mono text-red-400 pt-1" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};
