import React from 'react';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface TestimonialItemData {
  name: string;
  location?: string;
  quote: string;
  rating?: number;
  image?: string;
  caption?: string;
}

export interface TestimonialsSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  items?: TestimonialItemData[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  badge = 'Customer Reviews',
  heading = 'Testimonials & Delivery Proof',
  description = 'Real shipper feedback and delivery milestone photos.',
  items,
}) => {
  // Rule #5 & Rule #10: If items is empty or missing, DO NOT render section
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={heading} subtitle={description} className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface-subtle rounded-md border border-border p-6 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                {item.rating && (
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                )}
                <p className="text-body-md text-slate-700 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {item.image && (
                <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-slate-100 border border-border mt-2">
                  <Image
                    src={item.image}
                    alt={item.caption || item.name || 'Delivery Proof'}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center"
                  />
                  {item.caption && (
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/70 text-white px-2 py-0.5 rounded">
                      {item.caption}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-brand-black">{item.name}</span>
                {item.location && (
                  <span className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent" />
                    <span>{item.location}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
