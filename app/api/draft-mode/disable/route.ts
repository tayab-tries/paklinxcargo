import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const { searchParams } = new URL(request.url);
  const redirectUrl =
    searchParams.get('sanity-preview-pathname') ||
    searchParams.get('redirect') ||
    '/';

  const response = NextResponse.redirect(new URL(redirectUrl, request.url));

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
