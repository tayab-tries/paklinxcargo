import { defineType, defineField } from 'sanity';

export const seoObject = defineType({
  name: 'seoObject',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Page title for search engines and browser tabs',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Search result summary snippet (150-160 characters recommended)',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Share Image (OG Image)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
