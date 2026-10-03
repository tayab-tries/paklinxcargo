import { defineType, defineField } from 'sanity';

export const cargoPricingType = defineType({
  name: 'cargoPricing',
  title: 'Cargo Pricing & Shipping Information',
  type: 'document',
  fields: [
    // --------------------------------------------------
    // 1. HERO SECTION & MINIMUM WEIGHT BADGES
    // --------------------------------------------------
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Badge', type: 'string', initialValue: 'Air & Sea Cargo Hub' }),
        defineField({ name: 'heading', title: 'Main Heading (H1)', type: 'string', initialValue: 'Air & Sea Cargo Services from Pakistan' }),
        defineField({ name: 'subheading', title: 'Subheading / Tagline', type: 'string', initialValue: 'Reliable international air freight and ocean sea cargo solutions connecting Pakistan with destinations worldwide.' }),
        defineField({ name: 'introParagraph', title: 'Intro Overview Paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'airBadgeTitle', title: 'Air Cargo Callout Title', type: 'string', initialValue: 'Air Cargo Express' }),
        defineField({ name: 'airMinWeightText', title: 'Air Cargo Minimum Weight Text', type: 'string', initialValue: 'Minimum Air Shipment: 20 KG' }),
        defineField({ name: 'seaBadgeTitle', title: 'Sea Cargo Callout Title', type: 'string', initialValue: 'Sea Freight Economical' }),
        defineField({ name: 'seaMinWeightText', title: 'Sea Cargo Minimum Weight Text', type: 'string', initialValue: 'Minimum Sea Cargo: 70–100 KG' }),
      ],
    }),

    // --------------------------------------------------
    // 2. AIR CARGO RATES & TIMELINES
    // --------------------------------------------------
    defineField({
      name: 'airCargoSection',
      title: 'Air Cargo Rates & Delivery Times',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Air Cargo Rates & Delivery Time' }),
        defineField({ name: 'subtitle', title: 'Section Subtitle / Description', type: 'string', initialValue: 'Indicative air cargo rates per KG and estimated delivery timelines from Pakistan.' }),
        defineField({ name: 'minWeightBadge', title: 'Minimum Weight Badge Text', type: 'string', initialValue: '20 KG MIN' }),
        defineField({
          name: 'rates',
          title: 'Air Cargo Destination Rates',
          type: 'array',
          of: [{ type: 'cargoRateItemObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // 3. SEA CARGO RATES & TIMELINES
    // --------------------------------------------------
    defineField({
      name: 'seaCargoSection',
      title: 'Sea Cargo Rates & Delivery Times',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Sea Cargo Rates & Delivery Time' }),
        defineField({ name: 'subtitle', title: 'Section Subtitle / Description', type: 'string', initialValue: 'Indicative ocean freight rates (PKR/KG) and estimated delivery timelines from Pakistan.' }),
        defineField({ name: 'minWeightBadge', title: 'Minimum Weight Badge Text', type: 'string', initialValue: '70–100 KG MIN' }),
        defineField({
          name: 'rates',
          title: 'Sea Cargo Destination Rates',
          type: 'array',
          of: [{ type: 'cargoRateItemObject' }],
        }),
        defineField({ name: 'disclaimer', title: 'Rate Disclaimer Text', type: 'text', rows: 3 }),
      ],
    }),

    // --------------------------------------------------
    // 4. AIR VS SEA QUICK COMPARISON MATRIX
    // --------------------------------------------------
    defineField({
      name: 'quickComparison',
      title: 'Air vs Sea Service Comparison Matrix',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Heading', type: 'string', initialValue: 'Choose the Right Cargo Option' }),
        defineField({ name: 'subtitle', title: 'Section Badge / Eyebrow', type: 'string', initialValue: 'Side-by-Side Comparison' }),
        defineField({
          name: 'rows',
          title: 'Comparison Rows',
          type: 'array',
          of: [{ type: 'cargoComparisonRowObject' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // 5. AIR VS SEA DECISION GUIDANCE
    // --------------------------------------------------
    defineField({
      name: 'decisionGuidance',
      title: 'Air vs Sea Decision Guidance',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Heading', type: 'string', initialValue: 'Which One Should I Pick?' }),
        defineField({ name: 'airTitle', title: 'Air Cargo Decision Box Title', type: 'string', initialValue: 'Choose Air Cargo If:' }),
        defineField({
          name: 'airPoints',
          title: 'Air Cargo Decision Criteria Points',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'seaTitle', title: 'Sea Cargo Decision Box Title', type: 'string', initialValue: 'Choose Sea Cargo If:' }),
        defineField({
          name: 'seaPoints',
          title: 'Sea Cargo Decision Criteria Points',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // 6. DOOR-TO-DOOR SERVICE SECTION
    // --------------------------------------------------
    defineField({
      name: 'doorToDoor',
      title: 'Door-to-Door Cargo Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string', initialValue: 'Door-to-Door Service' }),
        defineField({ name: 'title', title: 'Section Heading', type: 'string', initialValue: 'Need Delivery from Your Door to Their Door?' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'workflowSteps',
          title: 'Workflow Process Steps',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),

    // --------------------------------------------------
    // 7. CARGO FAQS
    // --------------------------------------------------
    defineField({
      name: 'faqs',
      title: 'Cargo & Comparison FAQs',
      type: 'array',
      of: [{ type: 'faqItemObject' }],
    }),

    // --------------------------------------------------
    // 8. SEO METADATA
    // --------------------------------------------------
    defineField({
      name: 'seo',
      title: 'SEO & Social Settings',
      type: 'seoObject',
    }),
  ],
});
