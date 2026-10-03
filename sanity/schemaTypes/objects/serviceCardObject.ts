import { defineType, defineField } from 'sanity';

export const serviceCardObject = defineType({
  name: 'serviceCardObject',
  title: 'Service Card Definition',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Service Photo / Graphic',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'featureBullets',
      title: 'Key Feature Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cta',
      title: 'Action Button CTA',
      type: 'ctaObject',
    }),
  ],
});
