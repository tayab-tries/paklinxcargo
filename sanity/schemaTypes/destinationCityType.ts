import { defineType, defineField } from 'sanity';

export const destinationCityType = defineType({
  name: 'destinationCity',
  title: 'Destination Cities',
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
      name: 'country',
      title: 'Parent Country (Reference)',
      type: 'reference',
      to: [{ type: 'destinationCountry' }],
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
      title: 'Introduction Copy',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'City Cargo Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'preparationConsiderations',
      title: 'Preparation & Delivery Notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
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
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoObject',
    }),
  ],
});
