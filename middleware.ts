import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getStaticRedirectManifest } from '@/lib/cms/redirect-exporter';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Static 301 Redirect Manifest (Fast path)
  const redirects = getStaticRedirectManifest();
  const matchedRedirect = redirects.find((r) => r.source_path === pathname);
  if (matchedRedirect) {
    return NextResponse.redirect(new URL(matchedRedirect.target_path, request.url), matchedRedirect.status_code);
  }

  // 2. EXEMPT /admin/login GET requests explicitly - return plain NextResponse.next() immediately
  if (pathname.startsWith('/admin/login') && method === 'GET') {
    return NextResponse.next();
  }

  // NOTE: Rate limiting previously relied on Cloudflare Worker bindings (env.RATE_LIMITER).
  // For Hostinger Node.js standalone runtime, Cloudflare bindings are removed.
  // Rate limiting is deferred to be implemented via a Hostinger-compatible strategy (e.g. reverse proxy / Redis).

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


