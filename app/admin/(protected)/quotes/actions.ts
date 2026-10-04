'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminAuth } from '@/lib/supabase/auth-guard';
import {
  updateQuoteStatus,
  updateQuoteInternalNotes,
  retryQuoteNotifications,
  AdminQuoteRecord,
} from '@/lib/admin/quote-admin-service';

const ALLOWED_STATUSES: Array<AdminQuoteRecord['status']> = [
  'new',
  'contacted',
  'quoted',
  'converted',
  'archived',
];

export interface MutationResult {
  success: boolean;
  error?: string;
  adminStatus?: string;
  customerStatus?: string;
}

/**
 * Server Action: Update Quote Lifecycle Status
 * Enforces server-side requireAdminAuth() authorization and strict status enum validation.
 */
export async function updateQuoteStatusAction(
  quoteId: string,
  newStatus: string
): Promise<MutationResult> {
  // 1. Authenticate Admin User & Verify Active Admin Profile
  await requireAdminAuth();

  // 2. Validate requested status against strict allowed enum values
  const trimmedStatus = newStatus.trim().toLowerCase() as AdminQuoteRecord['status'];
  if (!ALLOWED_STATUSES.includes(trimmedStatus)) {
    return {
      success: false,
      error: `Invalid status '${newStatus}'. Allowed values: ${ALLOWED_STATUSES.join(', ')}`,
    };
  }

  // 3. Persist mutation
  const res = await updateQuoteStatus(quoteId, trimmedStatus);

  if (res.success) {
    revalidatePath('/admin/quotes');
    revalidatePath(`/admin/quotes/${quoteId}`);
  }

  return res;
}

/**
 * Server Action: Update Confidential Internal Admin Notes
 * Enforces server-side requireAdminAuth() authorization and string length limits.
 */
export async function updateQuoteInternalNotesAction(
  quoteId: string,
  internalNotes: string
): Promise<MutationResult> {
  // 1. Authenticate Admin User
  await requireAdminAuth();

  // 2. Validate input
  if (internalNotes && internalNotes.length > 5000) {
    return {
      success: false,
      error: 'Internal notes exceed maximum length limit of 5,000 characters.',
    };
  }

  // 3. Persist mutation
  const res = await updateQuoteInternalNotes(quoteId, internalNotes || '');

  if (res.success) {
    revalidatePath(`/admin/quotes/${quoteId}`);
  }

  return res;
}

/**
 * Server Action: Retry Quote Email Notifications
 * Enforces server-side requireAdminAuth() authorization. Re-fetches quote record server-side.
 */
export async function retryQuoteEmailAction(quoteId: string): Promise<MutationResult> {
  // 1. Authenticate Admin User
  await requireAdminAuth();

  // 2. Execute notification retry logic
  const res = await retryQuoteNotifications(quoteId);

  if (res.success) {
    revalidatePath(`/admin/quotes/${quoteId}`);
  }

  return res;
}
