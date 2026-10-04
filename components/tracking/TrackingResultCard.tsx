import React from 'react';
import { Package, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PublicTrackingResponse, ShipmentStatus } from '@/types/tracking';

export interface TrackingResultCardProps {
  data: PublicTrackingResponse;
}

const statusDisplayMap: Record<ShipmentStatus, { label: string; variant: 'accent' | 'secondary' | 'outline' | 'default' | 'success' }> = {
  booked: { label: 'Shipment Booked', variant: 'outline' },
  picked_up: { label: 'Cargo Picked Up', variant: 'secondary' },
  received_at_warehouse: { label: 'Received at Export Gateway', variant: 'secondary' },
  customs_cleared: { label: 'Customs Cleared', variant: 'secondary' },
  in_transit: { label: 'In Transit', variant: 'accent' },
  out_for_delivery: { label: 'Out for Delivery', variant: 'accent' },
  delivered: { label: 'Delivered', variant: 'success' },
  on_hold: { label: 'Customs Hold / Pending Check', variant: 'outline' },
};

export const TrackingResultCard: React.FC<TrackingResultCardProps> = ({ data }) => {
  const statusInfo = statusDisplayMap[data.currentStatus] || {
    label: data.currentStatus.replace(/_/g, ' ').toUpperCase(),
    variant: 'accent',
  };

  const isOnHold = data.currentStatus === 'on_hold';

  return (
    <div className="bg-surface rounded-md border border-border p-6 lg:p-8 space-y-6 shadow-xs text-brand-black">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            Shipment Tracking Reference
          </span>
          <span className="text-xl lg:text-2xl font-mono font-bold text-brand-black tracking-wide select-all">
            {data.trackingNumber}
          </span>
        </div>

        <div>
          {isOnHold ? (
            <span className="px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded border bg-amber-50 text-amber-800 border-amber-300 inline-block">
              {statusInfo.label}
            </span>
          ) : (
            <Badge variant={statusInfo.variant} className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider">
              {statusInfo.label}
            </Badge>
          )}
        </div>
      </div>

      {/* Corridor & Service Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-mono">
        <div className="space-y-1">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>Origin Gateway</span>
          </span>
          <span className="font-bold text-brand-black block">
            {data.originCity}, {data.originCountry}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>Destination Market</span>
          </span>
          <span className="font-bold text-brand-black block">
            {data.destinationCity ? `${data.destinationCity}, ` : ''}{data.destinationCountry}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Freight Service</span>
          </span>
          <span className="font-bold text-brand-black uppercase block">
            {data.cargoType.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {data.estimatedDelivery && (
        <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-mono text-slate-600">
          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Estimated Delivery: </span>
          <span className="font-bold text-brand-black">{data.estimatedDelivery}</span>
        </div>
      )}
    </div>
  );
};
