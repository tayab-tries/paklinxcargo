import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendQuoteNotification(quoteData: {
  quoteReference: string;
  senderName: string;
  senderPhone: string;
  senderEmail?: string;
  originCity: string;
  destinationCountry: string;
  destinationCity?: string;
  cargoType: string;
  estimatedWeightKg: number;
  cargoDescription?: string;
}) {
  if (!resend) {
    console.warn('Resend API key missing. Email dispatch skipped in dev mode.');
    return;
  }

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@example.com';

  await resend.emails.send({
    from: 'Cargo Quotes <quotes@example.com>',
    to: [adminEmail],
    subject: `New Cargo Quote Request: ${quoteData.quoteReference} (${quoteData.originCity} to ${quoteData.destinationCountry})`,
    html: `
      <h2>New Quote Request Received</h2>
      <p><strong>Reference:</strong> ${quoteData.quoteReference}</p>
      <p><strong>Customer Name:</strong> ${quoteData.senderName}</p>
      <p><strong>Phone/WhatsApp:</strong> ${quoteData.senderPhone}</p>
      <p><strong>Email:</strong> ${quoteData.senderEmail || 'N/A'}</p>
      <hr />
      <p><strong>Origin City:</strong> ${quoteData.originCity}</p>
      <p><strong>Destination:</strong> ${quoteData.destinationCountry} ${quoteData.destinationCity ? `(${quoteData.destinationCity})` : ''}</p>
      <p><strong>Service Type:</strong> ${quoteData.cargoType}</p>
      <p><strong>Estimated Weight:</strong> ${quoteData.estimatedWeightKg} kg</p>
      <p><strong>Cargo Notes:</strong> ${quoteData.cargoDescription || 'None'}</p>
    `,
  });
}
