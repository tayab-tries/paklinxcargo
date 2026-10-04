import React from 'react';
import { ArrowRight, ArrowLeft, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export interface QuoteStep2Data {
  estimated_weight_kg: string;
  package_count: string;
  length_cm?: string;
  width_cm?: string;
  height_cm?: string;
  cargo_description: string;
}

export interface QuoteStep2DetailsProps {
  formData: QuoteStep2Data;
  errors?: Record<string, string>;
  onChange: (field: keyof QuoteStep2Data, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const QuoteStep2Details: React.FC<QuoteStep2DetailsProps> = ({
  formData,
  errors = {},
  onChange,
  onNext,
  onBack,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="quote-step-2-form">
      <div className="space-y-1.5 border-b border-border pb-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-black flex items-center gap-2.5">
          <PackageCheck className="w-5 h-5 text-accent shrink-0" />
          <span>Step 2: Tell Us About the Shipment</span>
        </h2>
        <p className="text-sm text-slate-600">
          Approximate weight, package count, and dimensions are completely acceptable for your initial quote request.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Input
            label="Estimated Weight (kg)"
            id="estimated_weight_kg"
            name="estimated_weight_kg"
            type="number"
            step="0.1"
            min="0.5"
            placeholder="e.g. 50"
            value={formData.estimated_weight_kg}
            onChange={(e) => onChange('estimated_weight_kg', e.target.value)}
            error={errors.estimated_weight_kg}
            required
            variantSurface="light"
          />
          <p className="text-[11px] font-mono text-slate-500">
            Total gross weight of your boxes or pallets.
          </p>
        </div>

        <div className="space-y-1">
          <Input
            label="Number of Packages / Boxes"
            id="package_count"
            name="package_count"
            type="number"
            min="1"
            placeholder="e.g. 2"
            value={formData.package_count}
            onChange={(e) => onChange('package_count', e.target.value)}
            error={errors.package_count}
            required
            variantSurface="light"
          />
          <p className="text-[11px] font-mono text-slate-500">
            Total piece count included in this shipment.
          </p>
        </div>
      </div>

      {/* Grouped Dimensions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-semibold text-brand-black uppercase tracking-wider block">
            Approximate Box Dimensions (cm) — Optional
          </label>
        </div>
        <p className="text-xs text-slate-600">
          Approximate dimensions help us assess how the shipment may be charged (volumetric vs actual weight).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <Input
            label="Length (cm)"
            id="length_cm"
            name="length_cm"
            type="number"
            min="1"
            placeholder="Length"
            value={formData.length_cm || ''}
            onChange={(e) => onChange('length_cm', e.target.value)}
            error={errors.length_cm}
            variantSurface="light"
          />

          <Input
            label="Width (cm)"
            id="width_cm"
            name="width_cm"
            type="number"
            min="1"
            placeholder="Width"
            value={formData.width_cm || ''}
            onChange={(e) => onChange('width_cm', e.target.value)}
            error={errors.width_cm}
            variantSurface="light"
          />

          <Input
            label="Height (cm)"
            id="height_cm"
            name="height_cm"
            type="number"
            min="1"
            placeholder="Height"
            value={formData.height_cm || ''}
            onChange={(e) => onChange('height_cm', e.target.value)}
            error={errors.height_cm}
            variantSurface="light"
          />
        </div>
      </div>

      <Textarea
        label="What are you shipping?"
        id="cargo_description"
        name="cargo_description"
        placeholder="Briefly describe your items (e.g., personal clothing & books, household goods, commercial garments, spare parts, excess baggage)..."
        value={formData.cargo_description}
        onChange={(e) => onChange('cargo_description', e.target.value)}
        error={errors.cargo_description}
        required
        variantSurface="light"
      />

      <div className="pt-4 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4 shrink-0" />}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full sm:w-auto h-[46px] font-bold"
          rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
        >
          Continue to Contact Info
        </Button>
      </div>
    </form>
  );
};
