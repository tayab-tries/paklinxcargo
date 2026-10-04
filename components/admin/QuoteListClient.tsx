'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  AlertTriangle,
  ArrowRight,
  Inbox,
  Clock,
  CheckCircle2,
  PhoneCall,
  Archive,
  Layers,
  Filter,
} from 'lucide-react';
import { AdminQuoteRecord } from '@/lib/admin/quote-admin-service';

interface QuoteListClientProps {
  initialQuotes: AdminQuoteRecord[];
}

type StatusFilter = 'all' | 'new' | 'contacted' | 'quoted' | 'converted' | 'archived';

export function QuoteListClient({ initialQuotes }: QuoteListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  // Compute operational counts dynamically from actual dataset
  const counts = useMemo(() => {
    return {
      total: initialQuotes.length,
      new: initialQuotes.filter((q) => q.status === 'new').length,
      contacted: initialQuotes.filter((q) => q.status === 'contacted').length,
      quoted: initialQuotes.filter((q) => q.status === 'quoted').length,
      converted: initialQuotes.filter((q) => q.status === 'converted').length,
      archived: initialQuotes.filter((q) => q.status === 'archived').length,
    };
  }, [initialQuotes]);

  // Filter quotes by search query & status filter
  const filteredQuotes = useMemo(() => {
    return initialQuotes.filter((q) => {
      // 1. Status Filter
      if (selectedStatus !== 'all' && q.status !== selectedStatus) {
        return false;
      }

      // 2. Search Query Filter
      if (!searchQuery.trim()) return true;
      const qLower = searchQuery.toLowerCase().trim();

      const refMatch = q.quote_reference.toLowerCase().includes(qLower);
      const nameMatch = q.sender_name.toLowerCase().includes(qLower);
      const phoneMatch = q.sender_phone ? q.sender_phone.toLowerCase().includes(qLower) : false;
      const emailMatch = q.sender_email ? q.sender_email.toLowerCase().includes(qLower) : false;
      const originMatch = q.origin_city.toLowerCase().includes(qLower);
      const destMatch = q.destination_country.toLowerCase().includes(qLower);

      return refMatch || nameMatch || phoneMatch || emailMatch || originMatch || destMatch;
    });
  }, [initialQuotes, selectedStatus, searchQuery]);

  const getStatusBadgeClass = (status: AdminQuoteRecord['status']) => {
    switch (status) {
      case 'new':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'contacted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'quoted':
        return 'bg-[#1F8A5B]/15 text-[#1F8A5B] border-[#1F8A5B]/30';
      case 'converted':
        return 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold';
      case 'archived':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const statusTabs: { label: string; value: StatusFilter; count: number }[] = [
    { label: 'All Inquiries', value: 'all', count: counts.total },
    { label: 'New', value: 'new', count: counts.new },
    { label: 'Contacted', value: 'contacted', count: counts.contacted },
    { label: 'Quoted', value: 'quoted', count: counts.quoted },
    { label: 'Converted', value: 'converted', count: counts.converted },
    { label: 'Archived', value: 'archived', count: counts.archived },
  ];

  return (
    <div className="space-y-6">
      {/* Header Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#12372A]/10 pb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#1F8A5B] font-bold block mb-1">
            Quote Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#17201B] tracking-tight">
            Cargo Quote Requests
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-1">
            Review incoming international freight inquiries, update lead lifecycle states, communicate with customers, and manage notes.
          </p>
        </div>
      </div>

      {/* Operational Summary Metrics Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-[#12372A]/15 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase">
            <span>Total</span>
            <Layers className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-serif font-bold text-[#17201B]">{counts.total}</div>
        </div>

        <div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-amber-800 text-[10px] font-mono uppercase">
            <span>New Leads</span>
            <Inbox className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-serif font-bold text-amber-900">{counts.new}</div>
        </div>

        <div className="bg-blue-50/50 p-3.5 rounded-lg border border-blue-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-blue-800 text-[10px] font-mono uppercase">
            <span>Contacted</span>
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-serif font-bold text-blue-900">{counts.contacted}</div>
        </div>

        <div className="bg-emerald-50/50 p-3.5 rounded-lg border border-[#1F8A5B]/30 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[#1F8A5B] text-[10px] font-mono uppercase">
            <span>Quoted</span>
            <Clock className="w-3.5 h-3.5 text-[#1F8A5B]" />
          </div>
          <div className="text-xl font-serif font-bold text-[#12372A]">{counts.quoted}</div>
        </div>

        <div className="bg-emerald-100/60 p-3.5 rounded-lg border border-emerald-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-900 text-[10px] font-mono uppercase">
            <span>Converted</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="text-xl font-serif font-bold text-emerald-950">{counts.converted}</div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-600 text-[10px] font-mono uppercase">
            <span>Archived</span>
            <Archive className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-serif font-bold text-slate-700">{counts.archived}</div>
        </div>
      </div>

      {/* Search Bar & Status Tabs */}
      <div className="bg-white p-4 rounded-xl border border-[#12372A]/15 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {statusTabs.map((tab) => {
              const active = selectedStatus === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-[#12372A] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-[#F6F2E9] hover:text-[#17201B]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                      active
                        ? 'bg-[#1F8A5B] text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, name, phone..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-[#F6F2E9]/40 text-[#17201B] text-xs font-medium rounded-lg border border-[#12372A]/20 focus:outline-none focus:ring-2 focus:ring-[#1F8A5B] focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Results Count & Filter Status */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#1F8A5B]" />
          <span>
            Showing <strong className="text-[#17201B]">{filteredQuotes.length}</strong> of{' '}
            {initialQuotes.length} total leads
          </span>
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[11px] text-[#1F8A5B] underline hover:text-[#12372A]"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-xl border border-[#12372A]/15 overflow-hidden shadow-2xs">
        {/* Desktop Table View (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#12372A] text-white text-[11px] font-mono font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Cargo Specifications</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12372A]/10 text-xs text-[#17201B]">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                    No quote leads match your active search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-[#F6F2E9]/50 transition-colors">
                    {/* Reference */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#12372A] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {q.isPossibleDuplicate && (
                          <span title="Possible duplicate lead (same phone/route submitted within 30 mins)">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          </span>
                        )}
                        <span>{q.quote_reference}</span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-sm text-[#17201B]">{q.sender_name}</div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="uppercase font-bold text-[#1F8A5B] bg-[#1F8A5B]/10 px-1 rounded">
                          {q.contact_preference}
                        </span>
                        <span>{q.sender_phone || q.sender_email || 'No Direct Contact'}</span>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-4 font-mono text-[11px] whitespace-nowrap">
                      <span className="capitalize font-semibold text-[#17201B]">{q.origin_city}</span>{' '}
                      <span className="text-[#1F8A5B]">&rarr;</span>{' '}
                      <span className="uppercase font-semibold text-[#17201B]">{q.destination_country}</span>
                      {q.destination_city && (
                        <span className="text-slate-500 block text-[10px] capitalize">
                          ({q.destination_city})
                        </span>
                      )}
                    </td>

                    {/* Cargo */}
                    <td className="py-3.5 px-4">
                      <div className="capitalize font-mono text-[11px] font-semibold text-[#17201B]">
                        {q.cargo_type.replace('_', ' ')}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {q.estimated_weight_kg} kg ({q.package_count} pkgs)
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border ${getStatusBadgeClass(
                          q.status
                        )}`}
                      >
                        {q.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(q.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/quotes/${q.id}`}
                        className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#1F8A5B] hover:text-[#12372A] hover:underline"
                      >
                        <span>Manage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View (< 768px) */}
        <div className="md:hidden divide-y divide-[#12372A]/10">
          {filteredQuotes.length === 0 ? (
            <div className="py-12 px-4 text-center text-slate-500 font-mono text-xs">
              No quote leads match your criteria.
            </div>
          ) : (
            filteredQuotes.map((q) => (
              <div key={q.id} className="p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between border-b border-[#12372A]/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    {q.isPossibleDuplicate && (
                      <span title="Possible duplicate lead">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      </span>
                    )}
                    <span className="font-mono font-bold text-[#12372A] text-sm">
                      {q.quote_reference}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${getStatusBadgeClass(
                      q.status
                    )}`}
                  >
                    {q.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-sm text-[#17201B]">{q.sender_name}</div>
                  <div className="text-xs font-mono text-slate-600 flex items-center gap-2">
                    <span className="uppercase text-[10px] font-bold text-[#1F8A5B] bg-[#1F8A5B]/10 px-1 rounded">
                      {q.contact_preference}
                    </span>
                    <span>{q.sender_phone || q.sender_email || 'No Direct Contact'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#F6F2E9]/60 p-2.5 rounded-lg text-xs font-mono border border-[#12372A]/10">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">Route</span>
                    <span className="font-semibold text-[#17201B] capitalize">{q.origin_city}</span> &rarr;{' '}
                    <span className="font-semibold text-[#17201B] uppercase">{q.destination_country}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">Cargo</span>
                    <span className="font-semibold text-[#17201B] capitalize">{q.cargo_type.replace('_', ' ')}</span>
                    <span className="block text-[10px] text-slate-500">{q.estimated_weight_kg} kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="font-mono text-[11px] text-slate-500">
                    {new Date(q.created_at).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/admin/quotes/${q.id}`}
                    className="inline-flex items-center gap-1 font-mono font-bold text-xs text-[#1F8A5B] hover:text-[#12372A]"
                  >
                    <span>Manage Lead</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
