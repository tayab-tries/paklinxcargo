import React from 'react';
import { notFound } from 'next/navigation';
import { getAdminQuoteById } from '@/lib/admin/quote-admin-service';
import { QuoteDetailClient } from '@/components/admin/QuoteDetailClient';

interface AdminQuoteDetailProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function AdminQuoteDetailPage({ params }: AdminQuoteDetailProps) {
  const { id } = await params;
  const quote = await getAdminQuoteById(id);

  if (!quote) {
    notFound();
  }

  return <QuoteDetailClient quote={quote} />;
}
