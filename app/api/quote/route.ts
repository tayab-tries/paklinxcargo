import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  quoteSubmissionSchema,
  validateQuoteEntitiesServerSide,
} from '@/lib/quote/quote-validation';
import { generateSecureQuoteReference } from '@/lib/quote/reference-generator';
import {
  sendAdminQuoteNotification,
  sendCustomerQuoteConfirmation,
} from '@/lib/email/resend.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Honeypot Anti-Spam Verification
    if (body.website_hp && body.website_hp.length > 0) {
      // Bot submission detected: Return synthetic 200 without DB insertion
      return NextResponse.json({
        success: true,
        quoteReference: 'QTE-SPAM-PROTECTED',
      });
    }

    // 2. Zod Structural Syntax & Conditional Contact Validation
    const parsed = quoteSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const input = parsed.data;

    // 3. Server-Side Published Entity Verification
    const entityCheck = validateQuoteEntitiesServerSide({
      origin_city: input.origin_city,
      origin_city_other: input.origin_city_other,
      destination_country: input.destination_country,
      cargo_type: input.cargo_type,
    });

    if (!entityCheck.isValid) {
      return NextResponse.json(
        { success: false, error: entityCheck.error || 'Invalid cargo or route selection.' },
        { status: 400 }
      );
    }

    // 4. Server-Only Supabase Connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { success: false, error: 'Database service is not configured.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Compute formatted origin city and notes to preserve custom city name without DB migration
    const finalOriginCity =
      input.origin_city === 'other' && input.origin_city_other
        ? `Other (${input.origin_city_other.trim()})`
        : input.origin_city;

    const formattedNotes =
      input.origin_city === 'other' && input.origin_city_other
        ? input.additional_notes
          ? `[Pickup City: ${input.origin_city_other.trim()}] ${input.additional_notes}`
          : `[Pickup City: ${input.origin_city_other.trim()}]`
        : input.additional_notes || null;

    // 5. Generate Cryptographic Reference & Retry on Unique Violation
    let quoteRef = generateSecureQuoteReference();
    let insertSuccess = false;
    let attempts = 0;
    let insertedData: { id: string } | null = null;

    while (!insertSuccess && attempts < 3) {
      attempts++;
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          quote_reference: quoteRef,
          sender_name: input.sender_name,
          sender_phone: input.sender_phone || null,
          sender_email: input.sender_email || null,
          contact_preference: input.contact_preference,
          origin_city: finalOriginCity,
          destination_country: input.destination_country,
          destination_city: input.destination_city || null,
          cargo_type: input.cargo_type,
          estimated_weight_kg: input.estimated_weight_kg,
          package_count: input.package_count,
          length_cm: input.length_cm || null,
          width_cm: input.width_cm || null,
          height_cm: input.height_cm || null,
          cargo_description: input.cargo_description,
          additional_notes: formattedNotes,
          source_page: input.source_page || null,
          utm_source: input.utm_source || null,
          utm_medium: input.utm_medium || null,
          utm_campaign: input.utm_campaign || null,
          status: 'new',
          admin_notification_status: 'pending',
          customer_notification_status: 'pending',
          email_attempt_count: 0,
        })
        .select()
        .single();

      if (!error && data) {
        insertSuccess = true;
        insertedData = data;
      } else if (error && error.code === '23505') {
        // Unique reference collision: generate new reference and retry
        quoteRef = generateSecureQuoteReference();
      } else {
        console.error('Supabase quote insert error:', error?.message);
        return NextResponse.json(
          { success: false, error: 'Failed to record quote request.' },
          { status: 500 }
        );
      }
    }

    if (!insertSuccess || !insertedData) {
      return NextResponse.json(
        { success: false, error: 'Database record creation failed.' },
        { status: 500 }
      );
    }

    // 6. Decoupled Email Dispatch (Database insert success is primary)
    const emailPayload = {
      quoteReference: quoteRef,
      senderName: input.sender_name,
      senderPhone: input.sender_phone,
      senderEmail: input.sender_email,
      contactPreference: input.contact_preference,
      originCity: finalOriginCity,
      destinationCountry: input.destination_country,
      destinationCity: input.destination_city,
      cargoType: input.cargo_type,
      estimatedWeightKg: input.estimated_weight_kg,
      packageCount: input.package_count,
      lengthCm: input.length_cm,
      widthCm: input.width_cm,
      heightCm: input.height_cm,
      cargoDescription: input.cargo_description,
      additionalNotes: formattedNotes || undefined,
    };

    const adminResult = await sendAdminQuoteNotification(emailPayload);
    const customerResult = await sendCustomerQuoteConfirmation(emailPayload);

    // Update Email Delivery Status on Quote Row (Non-blocking)
    await supabase
      .from('quotes')
      .update({
        admin_notification_status: adminResult.success ? 'sent' : 'failed',
        customer_notification_status: input.sender_email
          ? customerResult.success
            ? 'sent'
            : 'failed'
          : 'skipped',
        email_attempt_count: 1,
        email_error_metadata: adminResult.errorMetadata || customerResult.errorMetadata || {},
      })
      .eq('id', insertedData.id);

    return NextResponse.json({
      success: true,
      quoteReference: quoteRef,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown exception';
    console.error('Quote API endpoint exception:', msg);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing quote request.' },
      { status: 500 }
    );
  }
}
