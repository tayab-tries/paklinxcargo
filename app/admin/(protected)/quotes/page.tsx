import React from 'react';
import { getAdminQuotes } from '@/lib/admin/quote-admin-service';
import { QuoteListClient } from '@/components/admin/QuoteListClient';

export const dynamic = 'force-dynamic';

export default async function AdminQuotesListPage() {
  const quotes = await getAdminQuotes();

  return <QuoteListClient initialQuotes={quotes} />;
}
