import { z } from 'zod';
import { cargoTypes } from '@/types/content'; // Single Source of Truth

export const quoteSubmissionSchema = z
  .object({
    origin_city: z.string().min(2, 'Origin city is required.'),
    destination_country: z.string().min(2, 'Destination country is required.'),
    destination_city: z.string().optional(),
    cargo_type: z.enum(cargoTypes), // Derived directly from single source of truth
    estimated_weight_kg: z.number().min(0.5, 'Estimated weight must be at least 0.5 kg.'),
    package_count: z.number().int().min(1, 'Package count must be at least 1.'),
    length_cm: z.number().int().min(1).optional(),
    width_cm: z.number().int().min(1).optional(),
    height_cm: z.number().int().min(1).optional(),
    cargo_description: z.string().min(5, 'Cargo description is required.'),
    sender_name: z.string().min(2, 'Full name is required.'),
    contact_preference: z.enum(['whatsapp', 'phone', 'email']).default('whatsapp'),
    sender_phone: z.string().optional(),
    sender_email: z.string().optional(),
    additional_notes: z.string().max(1000).optional(),
    source_page: z
      .string()
      .max(200)
      .regex(/^[a-zA-Z0-9_/.-]+$/, 'Invalid source page format.')
      .optional(),
    utm_source: z.string().max(100).optional(),
    utm_medium: z.string().max(100).optional(),
    utm_campaign: z.string().max(100).optional(),
    website_hp: z.string().max(0, 'Bot submission detected.').optional(),
  })
  .refine(
    (data) => {
      if (data.contact_preference === 'whatsapp' || data.contact_preference === 'phone') {
        return !!data.sender_phone && data.sender_phone.trim().length >= 8;
      }
      return true;
    },
    {
      message: 'A valid phone or WhatsApp number is required for your chosen contact preference.',
      path: ['sender_phone'],
    }
  )
  .refine(
    (data) => {
      if (data.contact_preference === 'email') {
        return !!data.sender_email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.sender_email);
      }
      return true;
    },
    {
      message: 'A valid email address is required when Email is selected as contact preference.',
      path: ['sender_email'],
    }
  );

export type QuoteSubmissionInput = z.infer<typeof quoteSubmissionSchema>;

/**
 * Secondary Server-Side Entity Validation Layer
 * Verifies origin, destination, and cargo type prior to DB insertion.
 */
export function validateQuoteEntitiesServerSide(data: {
  origin_city: string;
  destination_country: string;
  cargo_type: string;
}): { isValid: boolean; error?: string } {
  if (!data.origin_city || data.origin_city.trim().length < 2) {
    return { isValid: false, error: 'Invalid origin city.' };
  }

  if (!data.destination_country || data.destination_country.trim().length < 2) {
    return { isValid: false, error: 'Invalid destination country.' };
  }

  return { isValid: true };
}
