import { defineType, defineField } from 'sanity';

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // --------------------------------------------------
    // A. SEO
    // --------------------------------------------------
    defineField({
      name: 'seo',
      title: 'Homepage SEO Settings',
      type: 'seoObject',
    }),

    // --------------------------------------------------
    // B. HERO
    // --------------------------------------------------
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow / Small Badge', type: 'string' }),
        defineField({ name: 'heading', title: 'Main Heading', type: 'string' }),
        defineField({ name: 'highlightedHeading', title: 'Highlighted Heading Text', type: 'string' }),
        defineField({ name: 'description', title: 'Hero Description', type: 'text', rows: 3 }),
        defineField({ name: 'primaryCta', title: 'Primary Action Button', type: 'ctaObject' }),
        defineField({ name: 'secondaryCta', title: 'Secondary Action Button', type: 'ctaObject' }),
        defineField({ name: 'heroImage', title: 'Hero Background / Graphic Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string' }),
      ],
    }),

    // --------------------------------------------------
    // C. HERO FEATURE CHIPS
    // --------------------------------------------------
    defineField({
      name: 'heroFeatureChips',
      title: 'Hero Feature Chips',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Chip Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'icon', title: 'Optional Icon Identifier', type: 'string' }),
          ],
        },
      ],
    }),

    // --------------------------------------------------
    // D. QUICK QUOTE / TRACKING TEASER
    // --------------------------------------------------
    defineField({
      name: 'quickQuote',
      title: 'Quick Quote Teaser Bar',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Teaser Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Subheading / Helper Text', type: 'string' }),
        defineField({ name: 'ctaText', title: 'Form Button Text', type: 'string' }),
      ],
    }),

    // --------------------------------------------------
    // E. TRUST METRICS
    // --------------------------------------------------
    defineField({
      name: 'trustMetrics',
      title: 'Trust & Verification Metrics',
      type: 'array',
      of: [{ type: 'trustMetricObject' }],
    }),

    // --------------------------------------------------
    // F. REGISTRATIONS & ASSOCIATIONS
    // --------------------------------------------------
    defineField({
      name: 'registrations',
      title: 'Official Registrations & Associations',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Registered Organizations',
          type: 'array',
          of: [{ type: 'registrationItemObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // G. TRUSTED BY THE MARKET
    // --------------------------------------------------
    defineField({
      name: 'trustedMarket',
      title: 'Trusted by the Market (Client Logos)',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Client Logos',
          type: 'array',
          of: [{ type: 'clientLogoObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // H. WHAT CAN YOU SEND
    // --------------------------------------------------
    defineField({
      name: 'whatCanYouSend',
      title: 'What Can You Send (Cargo Types)',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Cargo Category Cards',
          type: 'array',
          of: [{ type: 'useCaseCardObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // I. AIR + SEA CARGO SECTION (Strict 2-Card Limit)
    // --------------------------------------------------
    defineField({
      name: 'servicesOverview',
      title: 'Air & Sea Cargo Services Overview',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({ name: 'airCargo', title: '1. Air Cargo Service Card', type: 'serviceCardObject' }),
        defineField({ name: 'seaCargo', title: '2. Sea Cargo Service Card', type: 'serviceCardObject' }),
      ],
    }),

    // --------------------------------------------------
    // J. POPULAR DESTINATIONS
    // --------------------------------------------------
    defineField({
      name: 'popularDestinations',
      title: 'Popular Destinations',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'destinations',
          title: 'Destination Cards',
          type: 'array',
          of: [{ type: 'destinationCardObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // K. PICKUP CITIES
    // --------------------------------------------------
    defineField({
      name: 'pickupCities',
      title: 'Pickup Cities Across Pakistan',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'cities',
          title: 'City Links',
          type: 'array',
          of: [{ type: 'pickupCityObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // L. HOW IT WORKS
    // --------------------------------------------------
    defineField({
      name: 'howItWorks',
      title: 'How It Works (Shipping Process)',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'steps',
          title: 'Shipping Process Steps',
          type: 'array',
          of: [{ type: 'processStepObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // M. TESTIMONIALS / DELIVERY PROOF
    // --------------------------------------------------
    defineField({
      name: 'testimonials',
      title: 'Testimonials & Delivery Proof',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Testimonials / Proof Items',
          type: 'array',
          of: [{ type: 'testimonialItemObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // N. FAQ
    // --------------------------------------------------
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'FAQ Question Items',
          type: 'array',
          of: [{ type: 'faqItemObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // O. FINAL CTA
    // --------------------------------------------------
    defineField({
      name: 'finalCta',
      title: 'Final Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow / Small Badge', type: 'string' }),
        defineField({ name: 'heading', title: 'Main Headline', type: 'string' }),
        defineField({ name: 'description', title: 'Supporting Text', type: 'text', rows: 2 }),
        defineField({ name: 'primaryCta', title: 'Primary CTA Button', type: 'ctaObject' }),
        defineField({ name: 'secondaryCta', title: 'Secondary CTA Button', type: 'ctaObject' }),
      ],
    }),

    // --------------------------------------------------
    // P. MOBILE BOTTOM CTA
    // --------------------------------------------------
    defineField({
      name: 'mobileBottomCta',
      title: 'Sticky Mobile Bottom CTA Bar Labels',
      type: 'object',
      fields: [
        defineField({ name: 'callLabel', title: 'Call Button Label', type: 'string' }),
        defineField({ name: 'whatsappLabel', title: 'WhatsApp Button Label', type: 'string' }),
        defineField({ name: 'quoteLabel', title: 'Get Quote Button Label', type: 'string' }),
      ],
    }),
  ],
});
