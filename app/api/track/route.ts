import { NextResponse } from 'next/server';
import { trackingSchema } from '@/lib/tracking/tracking.schema';
import { getPublicTrackingDetails } from '@/lib/tracking/tracking.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedInput = trackingSchema.parse(body);

    const trackingDetails = await getPublicTrackingDetails(validatedInput);

    if (!trackingDetails) {
      // Generic 404 response to prevent tracking enumeration
      return NextResponse.json(
        { error: 'No tracking information found for the provided tracking number.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: trackingDetails,
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid tracking number format.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Unable to process tracking query.' },
      { status: 500 }
    );
  }
}
