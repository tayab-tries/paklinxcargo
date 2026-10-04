import { siteConfig } from '@/config/site.config';

export interface PiiSafeEmailErrorMetadata {
  provider: 'resend';
  errorCode: string;
  retryable: boolean;
  timestamp: string;
  attemptNumber: number;
}

export interface QuoteEmailPayload {
  quoteReference: string;
  senderName: string;
  senderPhone?: string;
  senderEmail?: string;
  contactPreference: string;
  originCity: string;
  destinationCountry: string;
  destinationCity?: string;
  cargoType: string;
  estimatedWeightKg: number;
  packageCount: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  cargoDescription: string;
  additionalNotes?: string;
}

// Centralized human-readable presentation dictionaries
const ORIGIN_LABELS: Record<string, string> = {
  lahore: 'Lahore',
  karachi: 'Karachi',
  islamabad: 'Islamabad',
  rawalpindi: 'Rawalpindi',
  faisalabad: 'Faisalabad',
  sialkot: 'Sialkot',
  multan: 'Multan',
  peshawar: 'Peshawar',
  gujranwala: 'Gujranwala',
  other: 'Other City in Pakistan',
};

const DESTINATION_LABELS: Record<string, string> = {
  uk: 'United Kingdom',
  uae: 'United Arab Emirates',
  'saudi-arabia': 'Saudi Arabia',
  usa: 'United States',
  canada: 'Canada',
  other: 'Other Destination Country',
};

const CARGO_LABELS: Record<string, string> = {
  air_freight: 'Air Freight Service',
  sea_cargo: 'Sea Cargo Service',
  door_to_door: 'Personal Cargo (Door-to-Door)',
  commercial_freight: 'Commercial Goods & Export Cargo',
  excess_baggage: 'Excess Baggage & Travel Luggage',
};

const CONTACT_PREFERENCE_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  phone: 'Phone Call',
  email: 'Email',
};

export function formatOriginCityLabel(val: string): string {
  if (!val) return 'N/A';
  const trimmed = val.trim();
  const lower = trimmed.toLowerCase();
  if (ORIGIN_LABELS[lower]) {
    return ORIGIN_LABELS[lower];
  }
  if (trimmed.startsWith('Other (') && trimmed.endsWith(')')) {
    const inner = trimmed.slice(7, -1).trim();
    return `Other (${inner.charAt(0).toUpperCase() + inner.slice(1)})`;
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function formatDestinationCountryLabel(val: string): string {
  if (!val) return 'N/A';
  const lower = val.trim().toLowerCase();
  if (DESTINATION_LABELS[lower]) {
    return DESTINATION_LABELS[lower];
  }
  return val
    .trim()
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function formatCargoTypeLabel(val: string): string {
  if (!val) return 'N/A';
  if (CARGO_LABELS[val]) {
    return CARGO_LABELS[val];
  }
  return val
    .replace(/_/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function formatContactPreferenceLabel(val: string): string {
  if (!val) return 'N/A';
  return CONTACT_PREFERENCE_LABELS[val.toLowerCase()] || val;
}

/**
 * Sends Admin Quote Notification Email via Resend API.
 * Never logs PII to server console.
 */
export async function sendAdminQuoteNotification(
  payload: QuoteEmailPayload
): Promise<{ success: boolean; errorMetadata?: PiiSafeEmailErrorMetadata }> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmailRecipient = siteConfig.contact?.emailQuotes || siteConfig.contact?.emailInfo || process.env.ADMIN_EMAIL || 'quotes@paklinxcargo.com';

  if (!apiKey) {
    // Non-blocking fallback when RESEND_API_KEY is not configured
    return {
      success: false,
      errorMetadata: {
        provider: 'resend',
        errorCode: 'missing_api_key',
        retryable: false,
        timestamp: new Date().toISOString(),
        attemptNumber: 1,
      },
    };
  }

  const cleanDomain = siteConfig.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const displayOrigin = formatOriginCityLabel(payload.originCity);
  const displayDestination = formatDestinationCountryLabel(payload.destinationCountry);
  const displayCargo = formatCargoTypeLabel(payload.cargoType);
  const displayContactPref = formatContactPreferenceLabel(payload.contactPreference);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Quote Alerts <no-reply@${cleanDomain}>`,
        to: [adminEmailRecipient],
        subject: `New Lead: Quote Reference ${payload.quoteReference} (${displayOrigin} to ${displayDestination})`,
        html: `
          <h2>New Quote Request Received</h2>
          <p><strong>Reference:</strong> ${payload.quoteReference}</p>
          <p><strong>Sender:</strong> ${payload.senderName}</p>
          <p><strong>Contact Preference:</strong> ${displayContactPref}</p>
          <p><strong>Phone:</strong> ${payload.senderPhone || 'N/A'}</p>
          <p><strong>Email:</strong> ${payload.senderEmail || 'N/A'}</p>
          <p><strong>Route:</strong> ${displayOrigin} &rarr; ${displayDestination} ${payload.destinationCity ? `(${payload.destinationCity})` : ''}</p>
          <p><strong>Cargo Type:</strong> ${displayCargo}</p>
          <p><strong>Weight:</strong> ${payload.estimatedWeightKg} kg (${payload.packageCount} pkgs)</p>
          <p><strong>Dimensions:</strong> ${payload.lengthCm ? `${payload.lengthCm}x${payload.widthCm}x${payload.heightCm} cm` : 'Not specified'}</p>
          <p><strong>Description:</strong> ${payload.cargoDescription}</p>
          ${payload.additionalNotes ? `<p><strong>Additional Notes:</strong> ${payload.additionalNotes}</p>` : ''}
        `,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        errorMetadata: {
          provider: 'resend',
          errorCode: `http_${res.status}`,
          retryable: res.status >= 500,
          timestamp: new Date().toISOString(),
          attemptNumber: 1,
        },
      };
    }

    return { success: true };
  } catch (err: unknown) {
    const errCode = err instanceof Error ? err.message : 'network_exception';
    return {
      success: false,
      errorMetadata: {
        provider: 'resend',
        errorCode: errCode,
        retryable: true,
        timestamp: new Date().toISOString(),
        attemptNumber: 1,
      },
    };
  }
}

/**
 * Sends Customer Neutral Confirmation Email via Resend API.
 * Never exposes internal notes.
 */
export async function sendCustomerQuoteConfirmation(
  payload: QuoteEmailPayload
): Promise<{ success: boolean; errorMetadata?: PiiSafeEmailErrorMetadata }> {
  if (!payload.senderEmail) {
    return { success: true }; // Skipped cleanly when email not provided
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      errorMetadata: {
        provider: 'resend',
        errorCode: 'missing_api_key',
        retryable: false,
        timestamp: new Date().toISOString(),
        attemptNumber: 1,
      },
    };
  }

  const cleanDomain = siteConfig.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const displayOrigin = formatOriginCityLabel(payload.originCity);
  const displayDestination = formatDestinationCountryLabel(payload.destinationCountry);
  const displayCargo = formatCargoTypeLabel(payload.cargoType);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${siteConfig.name} <no-reply@${cleanDomain}>`,
        to: [payload.senderEmail],
        subject: `Quote Request Received: Reference ${payload.quoteReference}`,
        html: `
          <h2>Thank You for Reaching Out to ${siteConfig.name}</h2>
          <p>We have received your request for international shipping support.</p>
          <p><strong>Quote Reference:</strong> ${payload.quoteReference}</p>
          <p><strong>Route:</strong> ${displayOrigin} to ${displayDestination}</p>
          <p><strong>Service:</strong> ${displayCargo}</p>
          <p>Our operational team will review your cargo specifications and respond shortly.</p>
          <p>Best regards,<br>${siteConfig.name} Operations Team</p>
        `,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        errorMetadata: {
          provider: 'resend',
          errorCode: `http_${res.status}`,
          retryable: res.status >= 500,
          timestamp: new Date().toISOString(),
          attemptNumber: 1,
        },
      };
    }

    return { success: true };
  } catch (err: unknown) {
    const errCode = err instanceof Error ? err.message : 'network_exception';
    return {
      success: false,
      errorMetadata: {
        provider: 'resend',
        errorCode: errCode,
        retryable: true,
        timestamp: new Date().toISOString(),
        attemptNumber: 1,
      },
    };
  }
}
