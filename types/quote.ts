export type CargoType =
  | 'air_freight'
  | 'sea_cargo'
  | 'door_to_door'
  | 'excess_baggage'
  | 'commercial_freight';

export type QuoteStatus = 'new' | 'contacted' | 'quoted' | 'converted' | 'archived';

export interface QuotePayload {
  senderName: string;
  senderPhone: string;
  senderEmail?: string;
  originCity: string;
  destinationCountry: string;
  destinationCity?: string;
  cargoType: CargoType;
  estimatedWeightKg: number;
  cargoDescription?: string;
}

export interface QuoteRecord extends QuotePayload {
  id: string;
  quoteReference: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
}
