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

/**
 * Sends Admin Quote Notification Email via Resend API.
 * Never logs PII to server console.
 */
export async function sendAdminQuoteNotification(
  payload: QuoteEmailPayload
): Promise<{ success: boolean; errorMetadata?: PiiSafeEmailErrorMetadata }> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmailRecipient = siteConfig.contact?.emailQuotes || siteConfig.contact?.emailInfo || process.env.ADMIN_EMAIL || 'quotes@raahiinternational.com';

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

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Quote Alerts <no-reply@${siteConfig.domain}>`,
        to: [adminEmailRecipient],
        subject: `New Lead: Quote Reference ${payload.quoteReference} (${payload.originCity} to ${payload.destinationCountry})`,
        html: `
          <h2>New Quote Request Received</h2>
          <p><strong>Reference:</strong> ${payload.quoteReference}</p>
          <p><strong>Sender:</strong> ${payload.senderName}</p>
          <p><strong>Contact Preference:</strong> ${payload.contactPreference}</p>
          <p><strong>Phone:</strong> ${payload.senderPhone || 'N/A'}</p>
          <p><strong>Email:</strong> ${payload.senderEmail || 'N/A'}</p>
          <p><strong>Route:</strong> ${payload.originCity} &rarr; ${payload.destinationCountry} ${payload.destinationCity ? `(${payload.destinationCity})` : ''}</p>
          <p><strong>Cargo Type:</strong> ${payload.cargoType}</p>
          <p><strong>Weight:</strong> ${payload.estimatedWeightKg} kg (${payload.packageCount} pkgs)</p>
          <p><strong>Dimensions:</strong> ${payload.lengthCm ? `${payload.lengthCm}x${payload.widthCm}x${payload.heightCm} cm` : 'Not specified'}</p>
          <p><strong>Description:</strong> ${payload.cargoDescription}</p>
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

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${siteConfig.name} <no-reply@${siteConfig.domain}>`,
        to: [payload.senderEmail],
        subject: `Quote Request Received: Reference ${payload.quoteReference}`,
        html: `
          <h2>Thank You for Reaching Out to ${siteConfig.name}</h2>
          <p>We have received your request for international shipping support.</p>
          <p><strong>Quote Reference:</strong> ${payload.quoteReference}</p>
          <p><strong>Route:</strong> ${payload.originCity} to ${payload.destinationCountry}</p>
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
