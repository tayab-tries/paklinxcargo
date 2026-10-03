import { z } from 'zod';

export const trackingSchema = z.object({
  trackingNumber: z
    .string()
    .trim()
    .min(5, 'Tracking number is too short')
    .max(30, 'Tracking number is too long')
    .regex(/^[a-zA-Z0-9-]+$/, 'Tracking number contains invalid characters'),
});

export type TrackingInput = z.infer<typeof trackingSchema>;
