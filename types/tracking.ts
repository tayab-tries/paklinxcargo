export type ShipmentStatus =
  | 'booked'
  | 'picked_up'
  | 'received_at_warehouse'
  | 'customs_cleared'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'on_hold';

export interface TrackingTimelineEvent {
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: string;
}

/**
 * Public-Safe Tracking DTO
 * Strictly excludes private customer data (phone, email, full address, internal notes).
 */
export interface PublicTrackingResponse {
  trackingNumber: string;
  currentStatus: ShipmentStatus;
  originCity: string;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
  cargoType: string;
  estimatedDelivery?: string;
  timeline: TrackingTimelineEvent[];
}

export interface TrackingRequestPayload {
  trackingNumber: string;
}
