import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getStaticRedirectManifest } from '@/lib/cms/redirect-exporter';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Canonical hostname enforcement (www -> non-www)
  const rawHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host;
  const hostname = rawHost ? rawHost.split(':')[0] : '';
  if (hostname === 'www.paklinxcargo.com') {
    const search = request.nextUrl.search || '';
    return NextResponse.redirect(new URL(`https://paklinxcargo.com${pathname}${search}`), 301);
  }

  // 2. Static 301 Redirect Manifest (Fast path)
  const redirects = getStaticRedirectManifest();
  const matchedRedirect = redirects.find((r) => r.source_path === pathname);
  if (matchedRedirect) {
    return NextResponse.redirect(new URL(matchedRedirect.target_path, request.url), matchedRedirect.status_code);
  }

  // 3. EXEMPT /admin/login GET requests explicitly - return plain NextResponse.next() immediately
  if (pathname.startsWith('/admin/login') && method === 'GET') {
    return NextResponse.next();
  }

  // Note: Cloudflare rate limiting can be configured via Cloudflare WAF or Worker bindings if required.

  const response = NextResponse.next();

  // 3. Refresh Supabase Session Cookies ONLY for protected /admin routes
  if (pathname.startsWith('/admin')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

    if (supabaseUrl && supabaseKey) {
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      });

      await supabase.auth.getUser();
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)).*)'],
};


