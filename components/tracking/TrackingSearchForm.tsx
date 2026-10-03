'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const TrackingSearchForm: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searchedId, setSearchedId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      setSearchedId(trackingId.trim());
      setIsSearching(false);
    }, 600);
  };

  return (
    <section className="w-full bg-brand-black py-16 lg:py-24 text-white border-b border-border-dark min-h-[500px]">
      <Container size="narrow">
        <SectionHeading
          badge="Shipment Tracking Utility"
          title="Track Your Active Cargo Shipment"
          subtitle="Enter your valid tracking reference ID to view real-time transit milestones."
          className="mb-10 text-center mx-auto [&_h2]:text-white [&_p]:text-slate-300"
          align="center"
        />

        <div className="bg-brand-navy border border-border-dark rounded-md p-6 lg:p-8 space-y-6 shadow-2xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter Reference ID (e.g. PK-849201)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                variantSurface="dark"
                leftIcon={<Search className="w-4 h-4 text-accent" />}
              />
            </div>
            <Button
              variant="accent"
              size="lg"
              type="submit"
              isLoading={isSearching}
              leftIcon={<Search className="w-4 h-4 text-brand-black" />}
            >
              Track Cargo
            </Button>
          </form>

          {searchedId ? (
            <div className="pt-6 border-t border-border-dark space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 bg-brand-black-deep p-4 rounded-md border border-border-dark">
                <div>
                  Tracking ID: <span className="font-bold text-accent">{searchedId.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>In Transit</span>
                </div>
              </div>

              {/* Status Milestone Timeline */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
                  Shipment Milestone Timeline
                </div>

                <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-dark">
                  <div className="flex items-start gap-4 relative z-10 pl-8">
                    <div className="w-6 h-6 rounded-full bg-accent text-brand-black flex items-center justify-center font-mono font-bold text-xs absolute -left-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Origin Cargo Collection & Documentation</div>
                      <div className="text-xs font-mono text-slate-400">Lahore Export Warehouse • Completed</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 relative z-10 pl-8 pt-2">
                    <div className="w-6 h-6 rounded-full bg-accent text-brand-black flex items-center justify-center font-mono font-bold text-xs absolute -left-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Export Customs Declaration Cleared</div>
                      <div className="text-xs font-mono text-slate-400">Allama Iqbal Int&apos;l Airport (LHE) • Completed</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 relative z-10 pl-8 pt-2">
                    <div className="w-6 h-6 rounded-full bg-accent text-brand-black ring-4 ring-accent/30 flex items-center justify-center font-mono font-bold text-xs absolute -left-0">
                      •
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-accent">In Transit — Airline Linehaul Flight</div>
                      <div className="text-xs font-mono text-slate-300">En route to Destination Hub</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 relative z-10 pl-8 pt-2 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-brand-navy-light text-slate-400 flex items-center justify-center font-mono font-bold text-xs absolute -left-0">
                      4
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-300">Destination Doorstep Delivery</div>
                      <div className="text-xs font-mono text-slate-500">Pending Arrival</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Public tracking displays sanitized milestone progress only.</span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
