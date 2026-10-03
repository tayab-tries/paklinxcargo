import { TrackingInput } from './tracking.schema';
import { sanitizeShipmentRecord } from './tracking.sanitizer';
import { PublicTrackingResponse } from '@/types/tracking';
import { createClient } from '@/lib/supabase/server';

export async function getPublicTrackingDetails(
  input: TrackingInput
): Promise<PublicTrackingResponse | null> {
  const supabase = await createClient();

  const { data: shipment, error } = await supabase
    .from('shipments')
    .select(`
      tracking_number,
      current_status,
      origin_city,
      origin_country,
      destination_city,
      destination_country,
      cargo_type,
      estimated_delivery,
      shipment_updates (
        status,
        location_name,
        description,
        event_timestamp,
        created_at
      )
    `)
    .eq('tracking_number', input.trackingNumber)
    .single();

  if (error || !shipment) {
    return null;
  }

  return sanitizeShipmentRecord(shipment);
}
