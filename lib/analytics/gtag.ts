export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-8JK1Y0Z78V';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Safe client-side GA4 event dispatcher
 */
export function trackGaEvent(action: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/**
 * Track lead generation when quote form is successfully submitted
 */
export function trackQuoteLead(): void {
  trackGaEvent('generate_lead', {
    method: 'quote_form',
  });
}

/**
 * Track WhatsApp contact CTA clicks
 */
export function trackWhatsAppClick(): void {
  trackGaEvent('contact', {
    method: 'whatsapp',
  });
}

/**
 * Track Phone contact CTA clicks
 */
export function trackPhoneClick(): void {
  trackGaEvent('contact', {
    method: 'phone',
  });
}

/**
 * Track shipment tracking search
 */
export function trackTrackingSearch(): void {
  trackGaEvent('search', {
    search_type: 'shipment_tracking',
  });
}
