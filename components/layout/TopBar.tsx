import React from 'react';
import Link from 'next/link';
import { Phone, Search, ShieldCheck, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

interface TopBarProps {
  phone?: string;
  whatsappNumber?: string;
}

export const TopBar: React.FC<TopBarProps> = async ({ phone: propPhone, whatsappNumber: propWhatsapp }) => {
  const business = await getPublishedBusinessSettings();
  const phone = propPhone || business.phonePrimary || '';
  const whatsappNumber = propWhatsapp || business.whatsappNumber || phone;
  const whatsappUrl = buildWhatsappUrl(whatsappNumber);

  return (
    <div className="w-full bg-brand-black-deep text-slate-400 text-xs font-mono py-2.5 border-b border-border-dark hidden sm:block">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>{phone}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 fill-current" />
              <span>WhatsApp: {whatsappNumber}</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>International Cargo Forwarding</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/track"
              className="flex items-center gap-1.5 text-slate-300 hover:text-accent font-semibold transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Track Shipment</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
