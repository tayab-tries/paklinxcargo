import React from 'react';
import { ArrowRight, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export interface QuoteStep1Data {
  origin_city: string;
  destination_country: string;
  destination_city?: string;
  cargo_type: string;
}

export interface QuoteStep1BasicsProps {
  formData: QuoteStep1Data;
  locations: Array<{ name: string; slug: string }>;
  destinations: Array<{ name: string; slug: string }>;
  errors?: Record<string, string>;
  whatsappNumber?: string;
  onChange: (field: keyof QuoteStep1Data, value: string) => void;
  onNext: () => void;
}

export const QuoteStep1Basics: React.FC<QuoteStep1BasicsProps> = ({
  formData,
  locations = [],
  destinations = [],
  errors = {},
  whatsappNumber,
  onChange,
  onNext,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const whatsappUrl = buildWhatsappUrl(
    whatsappNumber,
    'Assalam o Alaikum, I want to send cargo from Pakistan. Please guide me with a quote.'
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="quote-step-1-form">
      <div className="space-y-1 border-b border-border pb-4">
        <h2 className="text-heading-lg font-bold text-brand-black flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent shrink-0" />
          <span>Step 1: Cargo Route & Type</span>
        </h2>
        <p className="text-body-sm text-slate-600">
          Select your pickup city in Pakistan, destination country, and what you are sending.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Select
          label="From (Pickup City in Pakistan)"
          id="origin_city"
          name="origin_city"
          value={formData.origin_city}
          onChange={(e) => onChange('origin_city', e.target.value)}
          error={errors.origin_city}
          required
          variantSurface="light"
        >
          {locations.map((loc) => (
            <option key={loc.slug} value={loc.slug}>
              {loc.name}
            </option>
          ))}
          <option value="other">Other City in Pakistan</option>
        </Select>

        <Select
          label="To (Destination Country)"
          id="destination_country"
          name="destination_country"
          value={formData.destination_country}
          onChange={(e) => onChange('destination_country', e.target.value)}
          error={errors.destination_country}
          required
          variantSurface="light"
        >
          {destinations.map((dest) => (
            <option key={dest.slug} value={dest.slug}>
              {dest.name}
            </option>
          ))}
          <option value="other">Other Destination Country</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Destination City (Optional)"
          id="destination_city"
          name="destination_city"
          placeholder="e.g. London, Dubai, Toronto"
          value={formData.destination_city || ''}
          onChange={(e) => onChange('destination_city', e.target.value)}
          error={errors.destination_city}
          variantSurface="light"
        />

        <Select
          label="What are you sending?"
          id="cargo_type"
          name="cargo_type"
          value={formData.cargo_type}
          onChange={(e) => onChange('cargo_type', e.target.value)}
          error={errors.cargo_type}
          required
          variantSurface="light"
        >
          <option value="personal_belongings">Personal Cargo (Clothes, Gifts, Household Items)</option>
          <option value="excess_baggage">Excess Baggage & Travel Luggage</option>
          <option value="commercial_cargo">Commercial Goods & Export Cargo</option>
          <option value="air_freight">Air Cargo</option>
          <option value="sea_cargo">Sea Cargo</option>
        </Select>
      </div>

      {/* Guidance Banner for WhatsApp */}
      <div className="p-4 bg-emerald-50 rounded border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="text-emerald-900 font-medium">
          <span className="font-bold">Not sure about the weight or dimensions?</span> WhatsApp us and we&apos;ll guide you.
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded transition-colors shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp Us</span>
        </a>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full sm:w-auto h-[46px] text-base font-bold"
          rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
        >
          Continue to Weight & Details
        </Button>
      </div>
    </form>
  );
};
