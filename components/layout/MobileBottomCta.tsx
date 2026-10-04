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
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-brand-dark/95 backdrop-blur-md border-t border-border-dark p-2.5 sm:hidden flex items-center justify-around gap-2 shadow-2xl">
      {/* Call Button */}
      {cleanPhone && (
        <a
          href={`tel:${cleanPhone}`}
          onClick={trackPhoneClick}
          className="flex-1 py-2.5 px-2 bg-brand-forest hover:bg-brand-forest-deep border border-brand-forest-light/60 rounded-xs text-center text-xs font-bold text-brand-cream flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-brand-gold shrink-0" />
          <span>{callLabel}</span>
        </a>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        className="flex-1 py-2.5 px-2 bg-brand-emerald hover:bg-brand-emerald-hover border border-emerald-400/40 rounded-xs text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
      >
        <MessageSquare className="w-4 h-4 text-white shrink-0 fill-current" />
        <span>{whatsappLabel}</span>
      </a>

      {/* Get Quote Button */}
      <Link
        href="/quote"
        className="flex-1 py-2.5 px-2 bg-brand-gold hover:bg-brand-gold-hover rounded-xs text-center text-xs font-bold text-brand-dark flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
      >
        <Calculator className="w-4 h-4 text-brand-dark shrink-0" />
        <span>{quoteLabel}</span>
      </Link>
    </div>
  );
};
