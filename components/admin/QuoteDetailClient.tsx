'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  FileText,
  ShieldAlert,
  RefreshCw,
  Check,
  AlertCircle,
  Save,
  Clock,
  Send,
} from 'lucide-react';
import { AdminQuoteRecord } from '@/lib/admin/quote-admin-service';
import {
  updateQuoteStatusAction,
  updateQuoteInternalNotesAction,
  retryQuoteEmailAction,
} from '@/app/admin/(protected)/quotes/actions';

interface QuoteDetailClientProps {
  quote: AdminQuoteRecord;
}

export function QuoteDetailClient({ quote }: QuoteDetailClientProps) {
  // Status mutation state
  const [selectedStatus, setSelectedStatus] = useState<AdminQuoteRecord['status']>(quote.status);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Internal notes mutation state
  const [internalNotes, setInternalNotes] = useState(quote.internal_notes || '');
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesMessage, setNotesMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Email retry mutation state
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Handle Status Update
  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusLoading(true);
    setStatusMessage(null);

    try {
      const res = await updateQuoteStatusAction(quote.id, selectedStatus);
      if (res.success) {
        setStatusMessage({ type: 'success', text: `Lead status updated to '${selectedStatus.toUpperCase()}' successfully.` });
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to update lead status.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Status update error.' });
    } finally {
      setStatusLoading(false);
    }
  };

  // Handle Internal Notes Update
  const handleNotesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotesLoading(true);
    setNotesMessage(null);

    try {
      const res = await updateQuoteInternalNotesAction(quote.id, internalNotes);
      if (res.success) {
        setNotesMessage({ type: 'success', text: 'Internal operational notes persisted successfully.' });
      } else {
        setNotesMessage({ type: 'error', text: res.error || 'Failed to save internal notes.' });
      }
    } catch (err: unknown) {
      setNotesMessage({ type: 'error', text: err instanceof Error ? err.message : 'Notes update error.' });
    } finally {
      setNotesLoading(false);
    }
  };

  // Handle Email Retry
  const handleEmailRetry = async () => {
    setEmailLoading(true);
    setEmailMessage(null);

    try {
      const res = await retryQuoteEmailAction(quote.id);
      if (res.success) {
        setEmailMessage({
          type: 'success',
          text: `Email dispatch attempted. Admin status: ${res.adminStatus || 'completed'}, Customer status: ${res.customerStatus || 'completed'}.`,
        });
      } else {
        setEmailMessage({ type: 'error', text: res.error || 'Email retry failed.' });
      }
    } catch (err: unknown) {
      setEmailMessage({ type: 'error', text: err instanceof Error ? err.message : 'Email retry error.' });
    } finally {
      setEmailLoading(false);
    }
  };

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

  const cleanPhoneForWa = quote.sender_phone ? quote.sender_phone.replace(/[^\d]/g, '') : '';

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Breadcrumbs & Header */}
      <div className="space-y-4 border-b border-[#12372A]/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/admin/quotes" className="hover:text-[#1F8A5B] transition-colors">
            Quote Inbox
          </Link>
          <span>/</span>
          <span className="text-[#17201B] font-bold">{quote.quote_reference}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#1F8A5B] font-bold">
                Operational Lead Detail
              </span>
              {quote.isPossibleDuplicate && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-[10px] font-mono font-bold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-600" />
                  Possible Soft Duplicate
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-mono font-bold text-[#12372A] tracking-tight">
              {quote.quote_reference}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Submitted on{' '}
              {new Date(quote.created_at).toLocaleString(undefined, {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-lg border ${getStatusBadgeClass(
                quote.status
              )}`}
            >
              STATUS: {quote.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Core Lead Specifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Contact Details Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#12372A]/15 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#12372A]/10 pb-3">
              <h2 className="text-base font-serif font-bold text-[#17201B] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1F8A5B]" />
                <span>Customer & Communication</span>
              </h2>
              <span className="px-2 py-0.5 bg-[#1F8A5B]/10 text-[#1F8A5B] font-mono text-[10px] font-bold uppercase rounded">
                Prefers: {quote.contact_preference}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Customer Name</span>
                <span className="font-bold text-[#17201B] text-sm font-sans">{quote.sender_name}</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Preferred Channel</span>
                <span className="font-bold text-[#1F8A5B] uppercase">{quote.contact_preference}</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Phone Number</span>
                {quote.sender_phone ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-[#17201B]">{quote.sender_phone}</span>
                    <a
                      href={`tel:${quote.sender_phone}`}
                      className="p-1 bg-[#F6F2E9] text-[#12372A] hover:bg-[#1F8A5B] hover:text-white rounded transition-colors"
                      title="Call Phone"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    {cleanPhoneForWa && (
                      <a
                        href={`https://wa.me/${cleanPhoneForWa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded transition-colors"
                        title="Open WhatsApp Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400 font-semibold">Not Provided</span>
                )}
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Email Address</span>
                {quote.sender_email ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-[#17201B] truncate">{quote.sender_email}</span>
                    <a
                      href={`mailto:${quote.sender_email}`}
                      className="p-1 bg-[#F6F2E9] text-[#12372A] hover:bg-[#1F8A5B] hover:text-white rounded transition-colors shrink-0"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <span className="text-slate-400 font-semibold">Not Provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Route & Cargo Specifications Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#12372A]/15 shadow-2xs space-y-4">
            <div className="border-b border-[#12372A]/10 pb-3">
              <h2 className="text-base font-serif font-bold text-[#17201B] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1F8A5B]" />
                <span>Shipment & Route Specifications</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Origin City</span>
                <span className="font-bold text-[#17201B] uppercase text-sm">{quote.origin_city}</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Destination Country</span>
                <span className="font-bold text-[#17201B] uppercase text-sm">
                  {quote.destination_country}
                </span>
                {quote.destination_city && (
                  <span className="block text-[10px] text-slate-500 capitalize">
                    City: {quote.destination_city}
                  </span>
                )}
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Service Mode</span>
                <span className="font-bold text-[#1F8A5B] capitalize text-sm">
                  {quote.cargo_type.replace('_', ' ')}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Gross Weight</span>
                <span className="font-bold text-[#17201B]">{quote.estimated_weight_kg} kg</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Package Count</span>
                <span className="font-bold text-[#17201B]">{quote.package_count} pkgs</span>
              </div>

              {quote.length_cm && (
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">Dimensions (L x W x H)</span>
                  <span className="font-bold text-[#17201B]">
                    {quote.length_cm} &times; {quote.width_cm} &times; {quote.height_cm} cm
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#12372A]/10 space-y-1.5">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                Cargo Itemization & Description
              </span>
              <p className="text-xs text-[#17201B] bg-[#F6F2E9]/60 p-3.5 rounded-lg border border-[#12372A]/10 leading-relaxed font-sans font-medium">
                {quote.cargo_description}
              </p>
            </div>

            {quote.additional_notes && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                  Customer Additional Notes
                </span>
                <p className="text-xs text-[#17201B] bg-[#F6F2E9]/60 p-3.5 rounded-lg border border-[#12372A]/10 leading-relaxed font-sans font-medium">
                  {quote.additional_notes}
                </p>
              </div>
            )}
          </div>

          {/* Confidential Internal Admin Notes Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#12372A]/15 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#12372A]/10 pb-3">
              <h2 className="text-base font-serif font-bold text-[#17201B] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Internal Operational Notes</span>
              </h2>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold uppercase rounded">
                Confidential &bull; Admin Only
              </span>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                These notes are confidential to internal staff. They are <strong>never</strong> exposed to customers, public tracking APIs, or customer email payloads.
              </span>
            </div>

            {notesMessage && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center gap-2 font-mono ${
                  notesMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-50 text-rose-900 border border-rose-300'
                }`}
              >
                {notesMessage.type === 'success' ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{notesMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleNotesSubmit} className="space-y-3">
              <textarea
                rows={4}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Record operational updates, rates quoted, staff notes..."
                className="w-full p-3.5 bg-[#F6F2E9]/40 text-[#17201B] text-xs font-sans rounded-lg border border-[#12372A]/20 focus:outline-none focus:ring-2 focus:ring-[#1F8A5B] focus:bg-white transition-all placeholder:text-slate-400"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={notesLoading}
                  className="px-4 py-2 bg-[#12372A] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1F8A5B] transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{notesLoading ? 'Saving...' : 'Save Confidential Notes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right 1 Column: Operational Mutation Controls */}
        <div className="space-y-6">
          {/* Status Mutation Control Card */}
          <div className="bg-white p-5 rounded-xl border border-[#12372A]/15 shadow-2xs space-y-4">
            <h2 className="text-base font-serif font-bold text-[#17201B] border-b border-[#12372A]/10 pb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1F8A5B]" />
              <span>Update Lifecycle State</span>
            </h2>

            {statusMessage && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2 font-mono ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-50 text-rose-900 border border-rose-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleStatusSubmit} className="space-y-3">
              <div>
                <label htmlFor="lead-status" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Select Lead Status
                </label>
                <select
                  id="lead-status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as AdminQuoteRecord['status'])}
                  className="w-full h-10 px-3 bg-[#F6F2E9]/60 text-[#17201B] font-mono text-xs font-bold rounded-lg border border-[#12372A]/20 focus:outline-none focus:ring-2 focus:ring-[#1F8A5B] focus:bg-white uppercase cursor-pointer"
                >
                  <option value="new">NEW (Unprocessed Lead)</option>
                  <option value="contacted">CONTACTED (Communication Initiated)</option>
                  <option value="quoted">QUOTED (Rates Provided)</option>
                  <option value="converted">CONVERTED (Booked / Shipment Created)</option>
                  <option value="archived">ARCHIVED (Closed / Inactive)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={statusLoading}
                className="w-full py-2.5 bg-[#1F8A5B] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#12372A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>{statusLoading ? 'Updating Status...' : 'Apply Status Update'}</span>
              </button>
            </form>
          </div>

          {/* Email Notification & Retry Card */}
          <div className="bg-white p-5 rounded-xl border border-[#12372A]/15 shadow-2xs space-y-4">
            <h2 className="text-base font-serif font-bold text-[#17201B] border-b border-[#12372A]/10 pb-3 flex items-center gap-2">
              <Send className="w-4 h-4 text-[#1F8A5B]" />
              <span>Email Notification State</span>
            </h2>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center bg-[#F6F2E9]/60 p-2.5 rounded-lg border border-[#12372A]/10">
                <span className="text-slate-600">Admin Alert:</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                    quote.admin_notification_status === 'sent'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {quote.admin_notification_status || 'pending'}
                </span>
              </div>

              <div className="flex justify-between items-center bg-[#F6F2E9]/60 p-2.5 rounded-lg border border-[#12372A]/10">
                <span className="text-slate-600">Customer Confirm:</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                    quote.customer_notification_status === 'sent'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : quote.customer_notification_status === 'skipped'
                      ? 'bg-slate-100 text-slate-700 border border-slate-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {quote.customer_notification_status || 'pending'}
                </span>
              </div>

              <div className="flex justify-between items-center px-1 text-slate-500 text-[11px]">
                <span>Total Attempts:</span>
                <span className="font-bold text-[#17201B]">{quote.email_attempt_count || 0}</span>
              </div>
            </div>

            {emailMessage && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2 font-mono ${
                  emailMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-50 text-rose-900 border border-rose-300'
                }`}
              >
                {emailMessage.type === 'success' ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{emailMessage.text}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleEmailRetry}
              disabled={emailLoading}
              className="w-full py-2.5 bg-white text-[#12372A] font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-[#12372A]/30 hover:bg-[#F6F2E9] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${emailLoading ? 'animate-spin' : ''}`} />
              <span>{emailLoading ? 'Dispatching Email...' : 'Retry Email Dispatch'}</span>
            </button>
          </div>

          {/* Navigation Back Link */}
          <Link
            href="/admin/quotes"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-slate-700 font-mono text-xs font-semibold rounded-xl border border-[#12372A]/15 hover:bg-[#F6F2E9] transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Quotes List</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
