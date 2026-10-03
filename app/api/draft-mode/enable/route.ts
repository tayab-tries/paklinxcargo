import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { readToken } from '@/sanity/env';

export async function GET(request: Request) {
  if (!readToken) {
    return new NextResponse(
      'Server configuration error: SANITY_API_READ_TOKEN is missing.',
      { status: 500 }
    );
  }

  const clientWithToken = client.withConfig({
    token: readToken,
    perspective: 'previewDrafts',
    useCdn: false,
  });

  const { isValid, redirectTo } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new NextResponse('Invalid draft mode preview token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const finalRedirect = redirectTo || '/';
  const response = NextResponse.redirect(new URL(finalRedirect, request.url));

  // Set SameSite=None; Secure; Partitioned on draft mode cookies for iframe compatibility
  response.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, {
      path: cookie.path || '/',
      httpOnly: cookie.httpOnly ?? true,
      sameSite: 'none',
      secure: true,
      partitioned: true,
    });
  });

  return response;
}
