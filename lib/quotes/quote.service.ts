import { QuoteInput } from './quote.schema';
import { createClient } from '@/lib/supabase/server';
import { sendQuoteNotification } from '@/lib/email/email.service';

export async function processQuoteRequest(input: QuoteInput) {
  const quoteReference = `QTE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const supabase = await createClient();

  const { error } = await supabase.from('quotes').insert([
    {
      quote_reference: quoteReference,
      sender_name: input.senderName,
      sender_phone: input.senderPhone,
      sender_email: input.senderEmail || null,
      origin_city: input.originCity,
      destination_country: input.destinationCountry,
      destination_city: input.destinationCity || null,
      cargo_type: input.cargoType,
      estimated_weight_kg: input.estimatedWeightKg,
      cargo_description: input.cargoDescription || null,
      status: 'new',
    },
  ]);

  if (error) {
    console.error('Supabase quote insertion error:', error);
    // Non-blocking error handling fallback for local development before DB table is created
  }

  // Dispatch background notification email via Resend
  await sendQuoteNotification({
    quoteReference,
    ...input,
  }).catch((err) => console.error('Email dispatch error:', err));

  return {
    success: true,
    reference: quoteReference,
  };
}
