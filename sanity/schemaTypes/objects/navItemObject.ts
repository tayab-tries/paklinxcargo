import { defineType, defineField } from 'sanity';

export const navItemObject = defineType({
  name: 'navItemObject',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});
