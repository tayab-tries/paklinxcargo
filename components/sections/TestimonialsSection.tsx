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
    <section className="w-full bg-brand-cream py-16 lg:py-24 border-b border-border-strong/60 text-brand-dark">
      <Container>
        <SectionHeading
          badge={badge}
          title={heading}
          subtitle={description}
          className="mb-12 lg:mb-16 [&_h2]:text-brand-dark [&_h2]:font-serif [&_p]:text-brand-dark/80"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F3] rounded-lg border border-[#E2DDD5] p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-4">
                {item.rating && (
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                )}
                <p className="font-serif italic text-base sm:text-lg text-brand-dark leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {item.image && (
                <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-[#17201B] border border-[#E2DDD5] mt-2 group-hover:border-brand-gold/30 transition-colors">
                  <Image
                    src={item.image}
                    alt={item.caption || item.name || 'Delivery Proof'}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  {item.caption && (
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono bg-[#12372A]/90 backdrop-blur-xs text-brand-cream px-2 py-1 rounded border border-brand-gold/30">
                      {item.caption}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-brand-dark tracking-wide">{item.name}</span>
                {item.location && (
                  <span className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
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

