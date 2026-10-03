import { defineType, defineField } from 'sanity';

export const locationType = defineType({
  name: 'location',
  title: 'Locations',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'City Name',
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
      name: 'province',
      title: 'Province / Region',
      type: 'string',
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
      name: 'sortOrder',
      title: 'Sort / Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'serviceAvailable',
      title: 'Service Available Flag',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'collectionAvailable',
      title: 'Doorstep Collection Available Flag',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'hasPhysicalBranch',
      title: 'Has Physical Branch Flag',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'branchAddress',
      title: 'Hub / Branch Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'localCoverageText',
      title: 'Local Coverage Notes',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'supportedServices',
      title: 'Supported Services (References)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'faqs',
      title: 'City-Specific FAQs',
      type: 'array',
      of: [{ type: 'faqItemObject' }],
    }),
    defineField({
      name: 'sections',
      title: 'Editorial Article Content Sections',
      type: 'array',
      of: [{ type: 'locationSectionObject' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoObject',
    }),
  ],
});
