import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { MobileBottomCta } from './MobileBottomCta';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanitySiteSettingsData } from '@/sanity/lib/fetch';

export interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell = async ({ children }: PageShellProps) => {
  const [business, sanitySiteSettings] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber;
  const activePhone = sanitySiteSettings?.phone || business.phonePrimary;

  return (
    <div className="min-h-screen bg-[#DFD9CC] font-sans antialiased text-[#17201B] selection:bg-[#1F8A5B] selection:text-white py-0 sm:py-2 md:py-3 lg:py-4 px-0 sm:px-2 md:px-3 lg:px-4">
      {/* Expansive Website Canvas Frame */}
      <div className="w-full max-w-[1920px] mx-auto min-h-screen flex flex-col bg-[#F6F2E9] rounded-none sm:rounded-[20px] lg:rounded-[28px] shadow-xl border border-[#12372A]/10 overflow-hidden relative">
        <Header sanitySiteSettings={sanitySiteSettings} />
        <main className="flex-1 w-full relative">{children}</main>
        <Footer sanitySiteSettings={sanitySiteSettings} />
        <FloatingWhatsApp whatsappNumber={activeWhatsapp} />
        <MobileBottomCta phone={activePhone} whatsappNumber={activeWhatsapp} />
      </div>
    </div>
  );
};
