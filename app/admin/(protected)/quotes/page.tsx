import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import { getAdminQuotes } from '@/lib/admin/quote-admin-service';

export default async function AdminQuotesListPage() {
  const quotes = await getAdminQuotes();

  return (
    <div className="w-full bg-background py-10">
      <Container>
        <div className="space-y-6 mb-8">
          <SectionHeading
            badge="Admin Operations"
            title="Quote Lead Management"
            subtitle="View, track, assign, and manage incoming international shipping quote requests."
          />
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-surface p-4 rounded-md border border-border flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Filter className="w-4 h-4 text-secondary" />
            <span>Total Leads: {quotes.length}</span>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reference or name..."
                className="w-full pl-9 pr-3 py-1.5 rounded-md border border-border bg-background text-xs focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-surface rounded-md border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-subtle border-b border-border text-[11px] font-mono font-semibold uppercase text-muted-foreground">
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Route</th>
                  <th className="py-3 px-4">Cargo / Weight</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs text-foreground">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground font-mono">
                      No quote leads recorded yet.
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-surface-subtle/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-primary">
                        <div className="flex items-center gap-1.5">
                          {q.isPossibleDuplicate && (
                            <span title="Possible duplicate lead submitted within 30 minutes">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            </span>
                          )}
                          <span>{q.quote_reference}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold">{q.sender_name}</div>
                        <div className="text-[11px] font-mono text-muted-foreground">
                          {q.contact_preference.toUpperCase()} • {q.sender_phone || q.sender_email || 'No Direct Contact'}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span className="capitalize">{q.origin_city}</span> &rarr; <span className="uppercase">{q.destination_country}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="capitalize font-mono text-[11px]">{q.cargo_type.replace('_', ' ')}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{q.estimated_weight_kg} kg ({q.package_count} pkgs)</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            q.status === 'new'
                              ? 'accent'
                              : q.status === 'contacted'
                              ? 'secondary'
                              : q.status === 'quoted'
                              ? 'success'
                              : q.status === 'converted'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                        >
                          {q.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">
                        {new Date(q.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/admin/quotes/${q.id}`}
                          className="font-mono text-xs font-semibold text-primary hover:underline"
                        >
                          Manage Lead &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
