'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Calculator } from 'lucide-react';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag';

export interface MobileBottomCtaProps {
  callLabel?: string;
  whatsappLabel?: string;
  quoteLabel?: string;
  phone?: string;
  whatsappNumber?: string;
}

export const MobileBottomCta: React.FC<MobileBottomCtaProps> = ({
  callLabel = 'Call Now',
  whatsappLabel = 'WhatsApp',
  quoteLabel = 'Get Quote',
  phone = '',
  whatsappNumber,
}) => {
  const whatsappUrl = buildWhatsappUrl(
    whatsappNumber || phone,
    'Assalam o Alaikum, I want to send cargo from Pakistan. Please give me a quote.'
  );

  const cleanPhone = phone.replace(/\s+/g, '');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-black-deep/95 backdrop-blur-md border-t border-border-dark p-2 sm:hidden flex items-center justify-around gap-2 shadow-2xl">
      {/* Call Button */}
      <a
        href={`tel:${cleanPhone}`}
        onClick={trackPhoneClick}
        className="flex-1 py-2.5 px-3 bg-brand-navy hover:bg-slate-800 border border-border-dark rounded text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-4 h-4 text-accent shrink-0" />
        <span>{callLabel}</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 border border-emerald-500/50 rounded text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
      >
        <MessageSquare className="w-4 h-4 text-white shrink-0 fill-current" />
        <span>{whatsappLabel}</span>
      </a>

      {/* Get Quote Button */}
      <Link
        href="/quote"
        className="flex-1 py-2.5 px-3 bg-accent hover:bg-accent-hover rounded text-center text-xs font-bold text-brand-black flex items-center justify-center gap-1.5 transition-colors"
      >
        <Calculator className="w-4 h-4 text-brand-black shrink-0" />
        <span>{quoteLabel}</span>
      </Link>
    </div>
  );
};
