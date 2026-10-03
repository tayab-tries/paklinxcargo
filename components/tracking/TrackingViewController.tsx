'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { TrackingLookupForm } from './TrackingLookupForm';
import { TrackingResultCard } from './TrackingResultCard';
import { TrackingTimeline } from './TrackingTimeline';
import { TrackingSupportPanel } from './TrackingSupportPanel';
import { PublicTrackingResponse } from '@/types/tracking';
import { AlertCircle, Loader2 } from 'lucide-react';
import { trackTrackingSearch } from '@/lib/analytics/gtag';

export interface TrackingViewControllerProps {
  initialRef?: string;
}

export const TrackingViewController: React.FC<TrackingViewControllerProps> = ({ initialRef = '' }) => {
  const [trackingNumber, setTrackingNumber] = useState(initialRef);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'not_found' | 'error'>(
    initialRef && initialRef.trim().length >= 5 ? 'loading' : 'idle'
  );
  const [resultData, setResultData] = useState<PublicTrackingResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const performLookup = async (refNumber: string) => {
    const trimmed = refNumber.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a valid tracking reference.');
      return;
    }

    if (trimmed.length < 5) {
      setErrorMessage('Tracking reference must be at least 5 characters.');
      return;
    }

    setErrorMessage(null);
    setStatus('loading');
    setResultData(null);

    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trimmed }),
      });

      if (res.status === 404) {
        setStatus('not_found');
        return;
      }

      const data = await res.json();

      if (!res.ok || !data.success || !data.data) {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to process tracking query.');
        return;
      }

      setResultData(data.data);
      setStatus('success');
      trackTrackingSearch();
    } catch {
      setStatus('error');
      setErrorMessage('Unable to process tracking query. Please check your network connection.');
    }
  };

  useEffect(() => {
    let isCancelled = false;
    if (initialRef && initialRef.trim().length >= 5) {
      const trimmed = initialRef.trim();
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trimmed }),
      })
        .then(async (res) => {
          if (isCancelled) return;
          if (res.status === 404) {
            setStatus('not_found');
            return;
          }
          const data = await res.json();
          if (!res.ok || !data.success || !data.data) {
            setStatus('error');
            setErrorMessage(data.error || 'Unable to process tracking query.');
            return;
          }
          setResultData(data.data);
          setStatus('success');
          trackTrackingSearch();
        })
        .catch(() => {
          if (!isCancelled) {
            setStatus('error');
            setErrorMessage('Unable to process tracking query. Please check your network connection.');
          }
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [initialRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(trackingNumber);
  };

  return (
    <div className="w-full space-y-10 max-w-3xl mx-auto">
      {/* LOOKUP FORM PANEL */}
      <div className="bg-brand-black-deep rounded-md border border-border-dark p-6 lg:p-8 shadow-2xl">
        <TrackingLookupForm
          value={trackingNumber}
          isLoading={status === 'loading'}
          error={errorMessage}
          onChange={(val) => {
            setTrackingNumber(val);
            if (errorMessage) setErrorMessage(null);
          }}
          onSubmit={handleSubmit}
        />
      </div>

      {/* ARIA-LIVE REGION FOR DYNAMIC UPDATES */}
      <div aria-live="polite" aria-atomic="true" className="space-y-8">
        
        {/* LOADING STATE */}
        {status === 'loading' && (
          <div className="bg-brand-black-deep rounded-md border border-border-dark p-12 text-center space-y-4 shadow-xl">
            <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Querying Shipment Tracking Desk...
            </div>
          </div>
        )}

        {/* NOT FOUND STATE */}
        {status === 'not_found' && (
          <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-heading-md font-bold text-white">Shipment Not Found</h3>
              <p className="text-body-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                No tracking record matched the reference <span className="font-mono text-white font-bold">{trackingNumber}</span>. Please verify the number on your booking receipt and try again.
              </p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-heading-md font-bold text-white">Query Unable to Complete</h3>
              <p className="text-body-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {errorMessage || 'Unable to process tracking query at this moment. Please try again later.'}
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS RESULT STATE */}
        {status === 'success' && resultData && (
          <div className="space-y-8">
            <TrackingResultCard data={resultData} />
            <TrackingTimeline timeline={resultData.timeline} />
          </div>
        )}
      </div>

      {/* SUPPORT & NEXT STEP PANEL */}
      <Container size="narrow" className="px-0">
        <TrackingSupportPanel />
      </Container>
    </div>
  );
};
