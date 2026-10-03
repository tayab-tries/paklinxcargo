import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export interface AdminUserAuth {
  user: {
    id: string;
    email?: string;
  };
  profile: {
    id: string;
    email: string;
    full_name: string;
    role: 'admin' | 'editor';
    is_active: boolean;
  };
}

/**
 * Server-side Authentication & Authorization Guard for Admin Routes.
 * 
 * Enforces:
 * 1. Authenticated Supabase session user.
 * 2. Active admin_profiles record (is_active === true).
 * 3. Permitted role check ('admin' | 'editor').
 * 4. Optional strict 'admin'-only role check.
 * 
 * Executes server-side redirect('/admin/login') on authentication failure.
 */
export async function requireAdminAuth(requiredRole?: 'admin'): Promise<AdminUserAuth> {
  let user: { id: string; email?: string } | null = null;
  let profile: { id: string; email: string; full_name: string; role: string; is_active: boolean } | null = null;

  try {
    const supabase = await createClient();

    // 1. Check Supabase Auth session user
    const { data, error: userError } = await supabase.auth.getUser();
    if (!userError && data?.user) {
      user = {
        id: data.user.id,
        email: data.user.email,
      };

      // 2. Query admin_profiles table for active account
      const { data: profileData, error: profileError } = await supabase
        .from('admin_profiles')
        .select('id, email, full_name, role, is_active')
        .eq('id', user.id)
        .maybeSingle();

      if (!profileError && profileData && profileData.is_active) {
        profile = profileData;
      } else if (profileError) {
        console.error('admin_profiles query error in requireAdminAuth:', profileError.message);
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown exception during auth check';
    console.error('requireAdminAuth safe catch:', msg);
  }

  // 3. Perform server-side redirect OUTSIDE try/catch to ensure Next.js handles redirect natively
  if (!user || !profile) {
    redirect('/admin/login');
  }

  // 4. Strict role check
  if (requiredRole === 'admin' && profile.role !== 'admin') {
    redirect('/admin?error=unauthorized_role');
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile: {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      role: profile.role as 'admin' | 'editor',
      is_active: profile.is_active,
    },
  };
}
