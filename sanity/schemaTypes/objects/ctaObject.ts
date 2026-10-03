import { defineType, defineField } from 'sanity';

export const ctaObject = defineType({
  name: 'ctaObject',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button / Link Label',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'Link Target URL',
      type: 'string',
      description: 'Internal path (e.g. /quote) or external URL',
    }),
  ],
});
