import React from 'react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site.config';
import { ShieldCheck, MapPin, Plane, Package } from 'lucide-react';

interface EditorialIntroSectionProps {
  brandName?: string;
}

export const EditorialIntroSection: React.FC<EditorialIntroSectionProps> = ({
  brandName = siteConfig.name,
}) => {
  return (
    <section className="w-full bg-[#F6F2E9] pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-20 text-[#17201B] relative overflow-hidden border-b border-[#12372A]/10">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#12372A]/15 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F8A5B]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#1F8A5B]">
              OUR LOGISTICS PURPOSE
            </span>
          </div>

          {/* Large Editorial Statement Headline */}
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl leading-[1.18] font-normal tracking-tight text-[#17201B]">
            At {brandName}, we connect Pakistan&apos;s commerce and personal cargo to every corner of the world with <span className="text-[#1F8A5B] italic font-serif">uncompromising care</span>.
          </h2>

          {/* Supporting Statement */}
          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Combining direct airport and ocean port departures across Pakistan with an established international delivery network. Whether air express or sea container cargo, every shipment is handled with verified operational precision.
          </p>

          {/* Asymmetrical 4-Column Capability Summary */}
          <div className="pt-8 border-t border-[#12372A]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left font-mono">
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 text-[#1F8A5B] text-xs font-bold uppercase">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Doorstep Collection</span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans leading-snug">
                Address pickup across Pakistan&apos;s major commercial cities.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 text-[#1F8A5B] text-xs font-bold uppercase">
                <Plane className="w-4 h-4 shrink-0" />
                <span>Air & Sea Shipping</span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans leading-snug">
                Express flight departures and economical container freight.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 text-[#1F8A5B] text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Export Customs</span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans leading-snug">
                Full export documentation handling and customs clearance.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 text-[#1F8A5B] text-xs font-bold uppercase">
                <Package className="w-4 h-4 shrink-0" />
                <span>Door-to-Door</span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans leading-snug">
                Final mile delivery to recipient address worldwide.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
