import { z } from 'zod';

export const quoteSchema = z.object({
  senderName: z.string().min(2, 'Name must be at least 2 characters'),
  senderPhone: z.string().min(8, 'Phone/WhatsApp number is required'),
  senderEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  originCity: z.string().min(2, 'Origin city in Pakistan is required'),
  destinationCountry: z.string().min(2, 'Destination country is required'),
  destinationCity: z.string().optional(),
  cargoType: z.enum([
    'air_freight',
    'sea_cargo',
    'door_to_door',
    'excess_baggage',
    'commercial_freight',
  ]),
  estimatedWeightKg: z.number().positive('Estimated weight must be greater than 0'),
  cargoDescription: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
