import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { TrackingTimelineEvent } from '@/types/tracking';

export interface TrackingTimelineProps {
  timeline: TrackingTimelineEvent[];
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-surface rounded-md border border-border p-6 lg:p-8 space-y-6 shadow-xs text-brand-black">
      <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
        Logistics Event History & Milestones
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
        {timeline.map((event, idx) => {
          const isLatest = idx === 0;

          return (
            <div key={`${event.status}-${idx}`} className="relative group">
              {/* Timeline Indicator Dot */}
              <div
                aria-hidden="true"
                className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                  isLatest
                    ? 'bg-accent border-brand-black ring-4 ring-accent/30'
                    : 'bg-surface-subtle border-slate-400'
                }`}
              />

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4
                    className={`text-body-md font-bold uppercase tracking-wide font-mono ${
                      isLatest ? 'text-emerald-800 font-extrabold' : 'text-brand-black'
                    }`}
                  >
                    {event.status.replace(/_/g, ' ')}
                  </h4>

                  {event.timestamp && (
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      {new Date(event.timestamp).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  )}
                </div>

                {event.location && (
                  <div className="text-xs font-mono text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.description && (
                  <p className="text-body-sm text-slate-600 leading-relaxed font-normal">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
