import React from 'react';
import { Send, ArrowLeft, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export interface QuoteStep3Data {
  sender_name: string;
  contact_preference: 'whatsapp' | 'phone' | 'email';
  sender_phone?: string;
  sender_email?: string;
  additional_notes?: string;
  website_hp?: string;
}

export interface QuoteStep3ContactProps {
  formData: QuoteStep3Data;
  errors?: Record<string, string>;
  isSubmitting?: boolean;
  onChange: (field: keyof QuoteStep3Data, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const QuoteStep3Contact: React.FC<QuoteStep3ContactProps> = ({
  formData,
  errors = {},
  isSubmitting = false,
  onChange,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6" id="quote-step-3-form">
      {/* Hidden Anti-Spam Honeypot Field */}
      <input
        type="text"
        name="website_hp"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only opacity-0 absolute pointer-events-none"
        value={formData.website_hp || ''}
        onChange={(e) => onChange('website_hp', e.target.value)}
      />

      <div className="space-y-1 border-b border-border pb-4">
        <h2 className="text-heading-lg font-bold text-brand-black flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-accent shrink-0" />
          <span>Step 3: Contact & Submission</span>
        </h2>
        <p className="text-body-sm text-slate-600">
          Enter your contact details so our operations team can deliver your custom quotation.
        </p>
      </div>

      <Input
        label="Full Name"
        id="sender_name"
        name="sender_name"
        placeholder="e.g. Muhammad Ali"
        value={formData.sender_name}
        onChange={(e) => onChange('sender_name', e.target.value)}
        error={errors.sender_name}
        required
        variantSurface="light"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Select
          label="Preferred Contact Method"
          id="contact_preference"
          name="contact_preference"
          value={formData.contact_preference}
          onChange={(e) => onChange('contact_preference', e.target.value as 'whatsapp' | 'phone' | 'email')}
          error={errors.contact_preference}
          required
          variantSurface="light"
        >
          <option value="whatsapp">WhatsApp Message</option>
          <option value="phone">Direct Phone Call</option>
          <option value="email">Email Address</option>
        </Select>

        {(formData.contact_preference === 'whatsapp' || formData.contact_preference === 'phone') && (
          <Input
            label="Phone / WhatsApp Number"
            id="sender_phone"
            name="sender_phone"
            placeholder="e.g. 0300 1234567"
            value={formData.sender_phone || ''}
            onChange={(e) => onChange('sender_phone', e.target.value)}
            error={errors.sender_phone}
            required
            variantSurface="light"
          />
        )}

        {formData.contact_preference === 'email' && (
          <Input
            label="Email Address"
            id="sender_email"
            name="sender_email"
            type="email"
            placeholder="name@example.com"
            value={formData.sender_email || ''}
            onChange={(e) => onChange('sender_email', e.target.value)}
            error={errors.sender_email}
            required
            variantSurface="light"
          />
        )}
      </div>

      {/* Optional Email field if WhatsApp or phone preselected */}
      {formData.contact_preference !== 'email' && (
        <Input
          label="Email Address (Optional)"
          id="sender_email"
          name="sender_email"
          type="email"
          placeholder="name@example.com"
          value={formData.sender_email || ''}
          onChange={(e) => onChange('sender_email', e.target.value)}
          error={errors.sender_email}
          variantSurface="light"
        />
      )}

      <Textarea
        label="Additional Instructions or Special Notes (Optional)"
        id="additional_notes"
        name="additional_notes"
        placeholder="Any specific delivery instructions, commercial invoice notes, or special handling requirements..."
        value={formData.additional_notes || ''}
        onChange={(e) => onChange('additional_notes', e.target.value)}
        error={errors.additional_notes}
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
          isLoading={isSubmitting}
          className="w-full sm:w-auto h-[46px]"
          rightIcon={<Send className="w-4 h-4 text-brand-black shrink-0" />}
        >
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
};
