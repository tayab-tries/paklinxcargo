import { defineType, defineField } from 'sanity';

export const destinationCountryType = defineType({
  name: 'destinationCountry',
  title: 'Destination Countries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Country Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Global Region',
      type: 'string',
      options: {
        list: [
          { title: 'Europe', value: 'Europe' },
          { title: 'Middle East', value: 'Middle East' },
          { title: 'North America', value: 'North America' },
          { title: 'Asia Pacific', value: 'Asia Pacific' },
          { title: 'Global', value: 'Global' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'h1',
      title: 'Page Title (H1)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction / Overview Copy',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shippingOverview',
      title: 'Detailed Shipping Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'customsGuidance',
      title: 'Customs & Import Guidance',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort / Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'supportedServices',
      title: 'Supported Services (References)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'supportedOrigins',
      title: 'Supported Pakistan Origins (References)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'location' }] }],
    }),
    defineField({
      name: 'faqs',
      title: 'Country-Specific FAQs',
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
