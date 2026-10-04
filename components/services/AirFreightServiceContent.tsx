import React from 'react';
import Link from 'next/link';
import {
  Truck,
  Clock,
  Package,
  ChevronRight,
  ListOrdered,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SanityCargoPricingData } from '@/sanity/lib/fetch';
import { siteConfig } from '@/config/site.config';

interface AirFreightServiceContentProps {
  phone?: string;
  whatsappNumber?: string;
  cargoPricing?: SanityCargoPricingData | null;
}

export const AirFreightServiceContent: React.FC<AirFreightServiceContentProps> = ({
  cargoPricing,
}) => {
  const airCargoRates = cargoPricing?.airCargoSection?.rates || [];
  const seaCargoRates = cargoPricing?.seaCargoSection?.rates || [];

  const airMinWeightText = cargoPricing?.hero?.airMinWeightText || '';
  const seaMinWeightText = cargoPricing?.hero?.seaMinWeightText || '';
  const seaDisclaimer = cargoPricing?.seaCargoSection?.disclaimer || '';

  return (
    <div className="w-full space-y-12 font-sans">
      {/* TABLE OF CONTENTS INDEX BOX */}
      <nav
        aria-label="Table of contents"
        className="bg-surface-subtle border border-border rounded-md p-6 lg:p-8 space-y-4 shadow-2xs"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          <ListOrdered className="w-4 h-4 text-accent-dark shrink-0" />
          <span>On This Page — Quick Navigation</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-medium text-slate-700">
          <li>
            <a href="#air-cargo-glance" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air Cargo at a Glance
            </a>
          </li>
          <li>
            <a href="#air-vs-sea-comparison" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air Cargo vs Sea Cargo Comparison
            </a>
          </li>
          <li>
            <a href="#pricing-tables" className="hover:text-accent-dark hover:underline flex items-center gap-1.5 font-bold text-brand-black">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> 💰 Air & Sea Cargo Rate Tables
            </a>
          </li>
          <li>
            <a href="#which-to-pick" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Which Mode Should You Pick?
            </a>
          </li>
          <li>
            <a href="#transit-times" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Estimated Transit Times
            </a>
          </li>
          <li>
            <a href="#why-us" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Why {siteConfig.name}
            </a>
          </li>
          <li>
            <a href="#air-cargo-process" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> How Air Cargo Shipping Works
            </a>
          </li>
          <li>
            <a href="#faqs" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Frequently Asked Questions
            </a>
          </li>
        </ul>
      </nav>

      {/* SECTION: AIR CARGO AT A GLANCE */}
      <section id="air-cargo-glance" className="scroll-mt-28 space-y-6">
        <div className="border-b border-border pb-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Fast International Freight</div>
          <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo at a Glance</h2>
        </div>
        <p className="text-body-md text-slate-700 leading-relaxed font-normal">
          Air cargo is designed for shippers who prioritize speed, schedule reliability, and airport-to-airport express delivery. Departing from major Pakistan air terminals in Lahore, Karachi, and Islamabad, air freight provides rapid door-to-door or airport delivery for personal baggage, urgent business samples, and high-priority cargo.
        </p>
      </section>

      {/* SECTION: AIR VS SEA COMPARISON */}
      <section id="air-vs-sea-comparison" className="scroll-mt-28 space-y-6">
        <div className="border-b border-border pb-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Mode Selection Matrix</div>
          <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo vs Sea Cargo Comparison</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-md space-y-3">
            <h3 className="text-heading-sm font-bold text-brand-black flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-dark" /> Air Cargo Highlights
            </h3>
            <ul className="space-y-2 text-body-sm text-slate-700 font-medium">
              <li>• Rapid delivery (10–15 days typical transit timing)</li>
              <li>• Ideal for urgent personal baggage & trade samples</li>
              <li>• Lower volumetric space requirements</li>
              <li>• {airMinWeightText}</li>
            </ul>
          </div>
          <div className="bg-surface border border-border p-6 rounded-md space-y-3">
            <h3 className="text-heading-sm font-bold text-brand-black flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" /> Sea Cargo Highlights
            </h3>
            <ul className="space-y-2 text-body-sm text-slate-700 font-medium">
              <li>• Cost-effective ocean freight for heavy volume</li>
              <li>• Full Container Load (FCL) & Less Container Load (LCL)</li>
              <li>• Extended delivery timelines (1.5–2.5 months typical)</li>
              <li>• {seaMinWeightText}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION: PRICING TABLES */}
      <section id="pricing-tables" className="scroll-mt-28 space-y-8">
        <div className="border-b border-border pb-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Indicative Rate Cards</div>
          <h2 className="text-heading-xl font-bold text-brand-black">Air & Sea Cargo Rate Tables</h2>
        </div>

        {/* AIR CARGO RATE TABLE */}
        <div className="space-y-4">
          <div className="bg-surface-subtle p-5 rounded-md border border-border flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-heading-md font-bold text-brand-black">
                Air Cargo Rates & Delivery Time
              </h3>
              <p className="text-body-xs text-slate-600">
                Indicative air cargo rates per KG and estimated delivery timelines from Pakistan.
              </p>
            </div>
            <Badge variant="accent" size="sm" className="font-mono font-bold">{airMinWeightText}</Badge>
          </div>

          <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
            <table className="w-full text-left text-body-md border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                  <th className="p-4 font-bold text-brand-black">Destination</th>
                  <th className="p-4 font-bold text-brand-black">Rate</th>
                  <th className="p-4 font-bold text-brand-black">Delivery Time</th>
                  <th className="p-4 font-bold text-brand-black text-right">Get Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-normal text-slate-700">
                {airCargoRates.map((rate) => (
                  <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-4 font-bold text-brand-black text-body-md flex items-center gap-2.5">
                      <span className="text-xl">{rate.flag || '🏳️'}</span>
                      <span>{rate.country}</span>
                    </td>
                    <td className="p-4 font-bold font-mono text-brand-black text-body-md">
                      {rate.rate}
                    </td>
                    <td className="p-4 text-body-sm text-slate-700 font-medium">
                      {rate.deliveryTime}
                    </td>
                    <td className="p-4 text-right">
                      <Link href={rate.quoteHref || `/quote?service=air-freight`} className="text-xs font-bold text-brand-black hover:text-accent-dark underline">
                        Get Quote →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEA CARGO RATE TABLE */}
        <div className="space-y-4 pt-4">
          <div className="bg-surface-subtle p-5 rounded-md border border-border flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-heading-md font-bold text-brand-black">
                Sea Cargo Rates & Delivery Time
              </h3>
              <p className="text-body-xs text-slate-600">
                Indicative ocean freight rates (PKR/KG) and estimated delivery timelines from Pakistan.
              </p>
            </div>
            <Badge variant="secondary" size="sm" className="font-mono font-bold">{seaMinWeightText}</Badge>
          </div>

          <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
            <table className="w-full text-left text-body-md border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                  <th className="p-4 font-bold text-brand-black">Destination</th>
                  <th className="p-4 font-bold text-brand-black">Rate</th>
                  <th className="p-4 font-bold text-brand-black">Delivery Time</th>
                  <th className="p-4 font-bold text-brand-black text-right">Get Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-normal text-slate-700">
                {seaCargoRates.map((rate) => (
                  <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-4 font-bold text-brand-black text-body-md flex items-center gap-2.5">
                      <span className="text-xl">{rate.flag || '🏳️'}</span>
                      <span>{rate.country}</span>
                    </td>
                    <td className="p-4 font-bold font-mono text-brand-black text-body-md">
                      {rate.rate}
                    </td>
                    <td className="p-4 text-body-sm text-slate-700 font-medium">
                      {rate.deliveryTime}
                    </td>
                    <td className="p-4 text-right">
                      <Link href={rate.quoteHref || `/quote?service=sea-cargo`} className="text-xs font-bold text-brand-black hover:text-accent-dark underline">
                        Get Quote →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-body-xs text-slate-500 italic">
            {seaDisclaimer}
          </p>
        </div>
      </section>

      {/* SECTION: WHICH MODE SHOULD YOU PICK */}
      <section id="which-to-pick" className="scroll-mt-28 space-y-6">
        <div className="border-b border-border pb-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Selection Guidance</div>
          <h2 className="text-heading-xl font-bold text-brand-black">Which Mode Should You Pick?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-md space-y-3">
            <h3 className="text-heading-sm font-bold text-emerald-950">Choose Air Cargo If:</h3>
            <ul className="space-y-2 text-body-sm text-emerald-900 font-medium">
              <li>• You require faster delivery within 10–15 days</li>
              <li>• Your cargo weight is lighter or urgent (min 20 kg)</li>
              <li>• Shipping personal items, excess baggage, or trade samples</li>
            </ul>
          </div>
          <div className="bg-blue-50/70 border border-blue-200 p-6 rounded-md space-y-3">
            <h3 className="text-heading-sm font-bold text-blue-950">Choose Sea Cargo If:</h3>
            <ul className="space-y-2 text-body-sm text-blue-900 font-medium">
              <li>• You are moving large commercial stock or household relocations</li>
              <li>• Cost savings outweigh delivery urgency (min 70–100 kg)</li>
              <li>• Delivery timelines are flexible (1.5–2.5 months)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION: ESTIMATED TRANSIT TIMES */}
      <section id="transit-times" className="scroll-mt-28 space-y-6">
        <div className="border-b border-border pb-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Schedule Guidelines</div>
          <h2 className="text-heading-xl font-bold text-brand-black">Estimated Transit Times</h2>
        </div>
        <p className="text-body-md text-slate-700 leading-relaxed font-normal">
          Transit times vary depending on airline flight schedules, ocean vessel routing, port congestion, customs clearance verification, and destination doorstep delivery logistics.
        </p>
      </section>

      {/* SECTION: WHY CHOOSE US */}
      <section id="why-us" className="scroll-mt-28 space-y-6">
        <div className="border-b border-border pb-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Trust & Experience</div>
          <h2 className="text-heading-xl font-bold text-brand-black">Why {siteConfig.name}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <h3 className="font-bold text-brand-black text-body-md flex items-center gap-2">
              <Package className="w-4 h-4 text-accent-dark" /> Verified Network
            </h3>
            <p className="text-body-xs text-slate-600">Established pickup hubs in major Pakistani logistics centers.</p>
          </div>
          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <h3 className="font-bold text-brand-black text-body-md flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-dark" /> Transparent Schedules
            </h3>
            <p className="text-body-xs text-slate-600">Clear transit timing and doorstep dispatch tracking.</p>
          </div>
          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <h3 className="font-bold text-brand-black text-body-md flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent-dark" /> Doorstep Collection
            </h3>
            <p className="text-body-xs text-slate-600">Convenient doorstep pickup across Pakistan.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
