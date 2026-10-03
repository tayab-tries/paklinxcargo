import { defineType, defineField } from 'sanity';

export const guideType = defineType({
  name: 'guide',
  title: 'Guides & Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Shipping Guides', value: 'shipping-guides' },
          { title: 'Cargo Rates', value: 'cargo-rates' },
          { title: 'Customs & Documentation', value: 'customs-documentation' },
          { title: 'Packing Guides', value: 'packing-guides' },
          { title: 'Destinations Guide', value: 'destinations-guide' },
          { title: 'Cargo Types', value: 'cargo-types' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Logistics Editorial Team',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated Date',
      type: 'date',
    }),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Reading Time (Minutes)',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Guide Flag',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'containsRegulatoryClaims',
      title: 'Contains Regulatory / Compliance Claims',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verificationNotes',
      title: 'Verification / Regulatory Notes',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contentMarkdown',
      title: 'Article Markdown Content (Deprecated)',
      type: 'text',
      rows: 15,
      hidden: true,
    }),
    defineField({
      name: 'body',
      title: 'Article Portable Text Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'supportedServices',
      title: 'Related Services (References)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'supportedOrigins',
      title: 'Related Origins (References)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'location' }] }],
    }),
    defineField({
      name: 'supportedDestinations',
      title: 'Related Destinations (References)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destinationCountry' }] }],
    }),
    defineField({
      name: 'faqs',
      title: 'Article FAQs',
      type: 'array',
      of: [{ type: 'faqItemObject' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoObject',
    }),
  ],
});
