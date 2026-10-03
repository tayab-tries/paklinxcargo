'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export interface AdminLoginResult {
  success?: boolean;
  error?: string;
}

/**
 * Server Action for Admin Login
 * Runs exclusively on the Cloudflare Worker server process where Cloudflare Runtime Variables
 * (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) are accessible at runtime.
 * 
 * 1. Authenticates email/password via Supabase Auth.
 * 2. Verifies active admin_profiles record for the authenticated user.
 * 3. Writes auth cookies to cookieStore.
 * 4. Executes redirect('/admin') OUTSIDE try/catch to navigate to dashboard.
 */
export async function adminLoginAction(formData: {
  email?: string;
  password?: string;
}): Promise<AdminLoginResult | void> {
  const email = formData.email?.trim() || '';
  const password = formData.password || '';

  if (!email || !password) {
    return {
      success: false,
      error: 'Please enter both email and password.',
    };
  }

  const supabase = await createClient();

  // 1. Authenticate with Supabase Auth
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !signInData?.user) {
    return {
      success: false,
      error: signInError?.message || 'Authentication failed. Please check your credentials.',
    };
  }

  // 2. Validate active admin profile in admin_profiles table
  const { data: profileData, error: profileError } = await supabase
    .from('admin_profiles')
    .select('id, role, is_active')
    .eq('id', signInData.user.id)
    .maybeSingle();

  if (profileError || !profileData || !profileData.is_active) {
    // Revoke session if user lacks an active admin profile record
    await supabase.auth.signOut();
    return {
      success: false,
      error: 'Account authenticated, but no active admin profile was found for this user.',
    };
  }

  // 3. Execute server-side redirect to /admin
  redirect('/admin');
}
