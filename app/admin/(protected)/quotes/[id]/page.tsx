import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { getAdminQuoteById } from '@/lib/admin/quote-admin-service';

interface AdminQuoteDetailProps {
  params: Promise<{ id: string }>;
}

export default async function AdminQuoteDetailPage({ params }: AdminQuoteDetailProps) {
  const { id } = await params;
  const quote = await getAdminQuoteById(id);

  if (!quote) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Admin', url: '/admin' },
    { label: 'Quotes', url: '/admin/quotes' },
    { label: quote.quote_reference, url: `/admin/quotes/${quote.id}` },
  ];

  return (
    <div className="w-full bg-background py-10">
      <Container>
        <div className="space-y-6 max-w-4xl mb-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <SectionHeading
              badge="Lead Detail"
              title={`Quote ${quote.quote_reference}`}
              subtitle={`Submitted on ${new Date(quote.created_at).toLocaleString()}`}
            />
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  quote.status === 'new'
                    ? 'accent'
                    : quote.status === 'contacted'
                    ? 'secondary'
                    : quote.status === 'quoted'
                    ? 'success'
                    : 'outline'
                }
                size="md"
              >
                STATUS: {quote.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl">
          {/* Main Lead Details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details Card */}
            <div className="bg-surface p-6 rounded-md border border-border space-y-4 shadow-2xs">
              <h3 className="text-heading-sm font-bold text-foreground border-b border-border pb-2">
                Customer & Contact
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block">Customer Name</span>
                  <span className="font-semibold text-foreground text-sm">{quote.sender_name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Preferred Contact</span>
                  <span className="font-semibold text-primary uppercase">{quote.contact_preference}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Phone / WhatsApp</span>
                  <span className="font-semibold text-foreground">{quote.sender_phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Email Address</span>
                  <span className="font-semibold text-foreground">{quote.sender_email || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Cargo & Route Specifications Card */}
            <div className="bg-surface p-6 rounded-md border border-border space-y-4 shadow-2xs">
              <h3 className="text-heading-sm font-bold text-foreground border-b border-border pb-2">
                Route & Cargo Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block">Origin Collection</span>
                  <span className="font-semibold text-foreground uppercase">{quote.origin_city}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Destination</span>
                  <span className="font-semibold text-foreground uppercase">
                    {quote.destination_country} {quote.destination_city ? `(${quote.destination_city})` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Cargo Service Type</span>
                  <span className="font-semibold text-foreground capitalize">{quote.cargo_type.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Gross Weight</span>
                  <span className="font-semibold text-foreground">{quote.estimated_weight_kg} kg ({quote.package_count} pkgs)</span>
                </div>
                {quote.length_cm && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground block">Dimensions (L x W x H)</span>
                    <span className="font-semibold text-foreground">{quote.length_cm} x {quote.width_cm} x {quote.height_cm} cm</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-border-subtle space-y-1">
                <span className="text-xs font-mono text-muted-foreground block">Itemization & Description</span>
                <p className="text-body-sm text-foreground bg-surface-subtle p-3 rounded border border-border">
                  {quote.cargo_description}
                </p>
              </div>

              {quote.additional_notes && (
                <div className="space-y-1">
                  <span className="text-xs font-mono text-muted-foreground block">Customer Additional Notes</span>
                  <p className="text-body-sm text-foreground bg-surface-subtle p-3 rounded border border-border">
                    {quote.additional_notes}
                  </p>
                </div>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div className="bg-surface p-6 rounded-md border border-border space-y-4 shadow-2xs">
              <h3 className="text-heading-sm font-bold text-foreground border-b border-border pb-2">
                Internal Operational Notes
              </h3>
              <textarea
                rows={3}
                defaultValue={quote.internal_notes || ''}
                placeholder="Add confidential admin notes (never visible to customers)..."
                className="w-full p-3 rounded-md border border-border bg-background text-foreground text-xs focus:border-primary"
              />
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  Save Notes
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Operations Controls (1 col) */}
          <div className="space-y-6">
            {/* Status & Assignment Control */}
            <div className="bg-surface p-6 rounded-md border border-border space-y-4 shadow-2xs">
              <h3 className="text-heading-sm font-bold text-foreground border-b border-border pb-2">
                Lead Status
              </h3>
              <div className="space-y-3">
                <label className="block text-xs font-mono text-muted-foreground">Lifecycle State</label>
                <select
                  defaultValue={quote.status}
                  className="w-full h-10 px-3 rounded border border-border bg-background text-xs font-mono text-foreground font-semibold"
                >
                  <option value="new">NEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="quoted">QUOTED</option>
                  <option value="converted">CONVERTED</option>
                  <option value="archived">ARCHIVED</option>
                </select>

                <Button variant="primary" size="sm" className="w-full mt-2">
                  Update Lead Status
                </Button>
              </div>
            </div>

            {/* Email Delivery State Tracker */}
            <div className="bg-surface p-6 rounded-md border border-border space-y-4 shadow-2xs">
              <h3 className="text-heading-sm font-bold text-foreground border-b border-border pb-2">
                Email Dispatch State
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Admin Alert:</span>
                  <span className="font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                    {quote.admin_notification_status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer Email:</span>
                  <span className="font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                    {quote.customer_notification_status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attempt Count:</span>
                  <span>{quote.email_attempt_count}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Retry Email Dispatch
                </Button>
              </div>
            </div>

            {/* Back Navigation */}
            <Link href="/admin/quotes" className="block">
              <Button variant="outline" size="sm" className="w-full" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Back to Quotes List
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
