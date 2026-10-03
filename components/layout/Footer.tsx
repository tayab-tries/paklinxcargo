import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { footerNavigation as defaultFooterNav } from '@/config/nav.config';
import { Container } from '@/components/ui/Container';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { SanitySiteSettings, getSanityLocationsList } from '@/sanity/lib/fetch';
import { getPublishedLocations } from '@/lib/locations/location-content';

interface FooterProps {
  sanitySiteSettings?: SanitySiteSettings | null;
}

export const Footer: React.FC<FooterProps> = async ({ sanitySiteSettings }) => {
  const [business, sanityLocations, fallbackLocations] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanityLocationsList(),
    getPublishedLocations(),
  ]);

  // Dynamically resolve published city locations
  const activeLocations =
    sanityLocations && sanityLocations.length > 0
      ? sanityLocations.map((l) => ({ label: `${l.name} Hub`, href: `/locations/${l.slug}` }))
      : fallbackLocations.map((l) => ({ label: `${l.name} Hub`, href: `/locations/${l.slug}` }));

  // Rule #1: Business contact fields as single source of contact info
  const brandName = sanitySiteSettings?.businessName || business.brandName || siteConfig.name;
  const phone = sanitySiteSettings?.phone || business.phonePrimary || '';
  const whatsappNumber = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || phone;
  const whatsappUrl = buildWhatsappUrl(whatsappNumber);
  const email = sanitySiteSettings?.email || business.emailInfo || '';
  const address = sanitySiteSettings?.address || business.addressPrimary || '';

  const footerDescription =
    sanitySiteSettings?.footerDescription ||
    '';

  // Build footer navigation groups, dynamically replacing Origin Locations items if active locations exist
  const baseFooterGroups =
    sanitySiteSettings?.footerGroups && sanitySiteSettings.footerGroups.length > 0
      ? sanitySiteSettings.footerGroups
      : defaultFooterNav.map((g) => ({ title: g.title, links: g.items }));

  const footerGroups = baseFooterGroups.map((group) => {
    if (group.title.toLowerCase().includes('location') || group.title.toLowerCase().includes('origin')) {
      return {
        ...group,
        links: activeLocations.length > 0 ? activeLocations : group.links,
      };
    }
    return group;
  });

  const copyrightText =
    sanitySiteSettings?.copyrightText ||
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  const logoSrc = sanitySiteSettings?.logo || '/images/brand/logo-white.svg';

  return (
    <footer className="w-full bg-brand-black border-t border-border-dark text-slate-300 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-dark">
          {/* Column 1: Company / Brand Bio & Contact Details */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src={logoSrc}
                alt={`${brandName} Logo`}
                width={220}
                height={128}
                className="h-12 sm:h-14 w-auto object-contain max-h-[56px]"
              />
            </Link>
            <p className="text-body-sm text-slate-400 leading-relaxed">
              {footerDescription}
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 fill-current" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                  WhatsApp: {whatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              {address && (
                <div className="flex items-start gap-2 text-slate-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span className="leading-snug">{address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Footer Link Columns */}
          {footerGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm font-medium">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>{copyrightText}</div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Verified Air & Sea Cargo Delivery</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
