import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * STRICTLY SERVER-ONLY SERVICE-ROLE CLIENT
 * This client bypasses RLS and must NEVER be imported or exposed to client components/browser bundles.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not defined.');
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
