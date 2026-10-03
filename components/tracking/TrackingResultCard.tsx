import React from 'react';
import { Package, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PublicTrackingResponse, ShipmentStatus } from '@/types/tracking';

export interface TrackingResultCardProps {
  data: PublicTrackingResponse;
}

const statusDisplayMap: Record<ShipmentStatus, { label: string; variant: 'accent' | 'navy' | 'outline-dark' }> = {
  booked: { label: 'Shipment Booked', variant: 'outline-dark' },
  picked_up: { label: 'Cargo Picked Up', variant: 'navy' },
  received_at_warehouse: { label: 'Received at Export Gateway', variant: 'navy' },
  customs_cleared: { label: 'Customs Cleared', variant: 'navy' },
  in_transit: { label: 'In Transit', variant: 'accent' },
  out_for_delivery: { label: 'Out for Delivery', variant: 'accent' },
  delivered: { label: 'Delivered', variant: 'outline-dark' },
  on_hold: { label: 'Customs Hold / Pending Check', variant: 'outline-dark' },
};

export const TrackingResultCard: React.FC<TrackingResultCardProps> = ({ data }) => {
  const statusInfo = statusDisplayMap[data.currentStatus] || {
    label: data.currentStatus.replace('_', ' ').toUpperCase(),
    variant: 'accent',
  };

  return (
    <div className="bg-brand-black-deep rounded-md border border-border-dark p-6 lg:p-8 space-y-6 shadow-2xl">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-dark pb-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Shipment Reference ID
          </span>
          <span className="text-xl lg:text-2xl font-mono font-bold text-white tracking-wide">
            {data.trackingNumber}
          </span>
        </div>

        <Badge variant={statusInfo.variant} className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider">
          {statusInfo.label}
        </Badge>
      </div>

      {/* Corridor & Service Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-mono">
        <div className="space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>Origin Gateway</span>
          </span>
          <span className="font-bold text-white block">
            {data.originCity}, {data.originCountry}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>Destination Market</span>
          </span>
          <span className="font-bold text-white block">
            {data.destinationCity ? `${data.destinationCity}, ` : ''}{data.destinationCountry}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Freight Service</span>
          </span>
          <span className="font-bold text-white uppercase block">
            {data.cargoType.replace('_', ' ')}
          </span>
        </div>
      </div>

      {data.estimatedDelivery && (
        <div className="pt-4 border-t border-border-dark flex items-center gap-2 text-xs font-mono text-slate-300">
          <Calendar className="w-4 h-4 text-accent shrink-0" />
          <span>Estimated Delivery: </span>
          <span className="font-bold text-white">{data.estimatedDelivery}</span>
        </div>
      )}
    </div>
  );
};
