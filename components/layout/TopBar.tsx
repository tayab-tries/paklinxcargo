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
    <div className="w-full bg-brand-forest-deep text-brand-cream-muted text-xs font-mono py-2.5 border-b border-brand-forest-light/50 hidden sm:block">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>{phone}</span>
              </a>
            )}
            {whatsappNumber && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand-emerald hover:text-emerald-300 font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-emerald shrink-0 fill-current" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>
            )}
            <div className="flex items-center gap-1.5 text-brand-cream-muted/80 hidden md:flex">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>International Cargo Forwarding</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/track"
              className="flex items-center gap-1.5 text-brand-cream hover:text-brand-gold font-semibold transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>Track Shipment</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
