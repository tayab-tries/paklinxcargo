import { PublicTrackingResponse, ShipmentStatus, TrackingTimelineEvent } from '@/types/tracking';

export interface RawShipmentUpdate {
  status: ShipmentStatus;
  location_name: string;
  description: string;
  event_timestamp?: string;
  created_at?: string;
}

export interface RawShipmentRecord {
  tracking_number: string;
  current_status: ShipmentStatus;
  origin_city: string;
  origin_country?: string;
  destination_city: string;
  destination_country: string;
  cargo_type: string;
  estimated_delivery?: string;
  shipment_updates?: RawShipmentUpdate[];
}

/**
 * Sanitizes raw DB shipment records to ensure private fields
 * (phone numbers, emails, full street addresses, internal notes) are NEVER exposed.
 */
export function sanitizeShipmentRecord(rawShipment: RawShipmentRecord): PublicTrackingResponse {
  const timeline: TrackingTimelineEvent[] = (rawShipment.shipment_updates || []).map(
    (update: RawShipmentUpdate) => ({
      status: update.status,
      location: update.location_name,
      description: update.description,
      timestamp: update.event_timestamp || update.created_at || new Date().toISOString(),
    })
  );

  return {
    trackingNumber: rawShipment.tracking_number,
    currentStatus: rawShipment.current_status,
    originCity: rawShipment.origin_city,
    originCountry: rawShipment.origin_country || 'Pakistan',
    destinationCity: rawShipment.destination_city,
    destinationCountry: rawShipment.destination_country,
    cargoType: rawShipment.cargo_type,
    estimatedDelivery: rawShipment.estimated_delivery || undefined,
    timeline,
  };
}
