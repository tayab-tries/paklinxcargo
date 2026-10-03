import { defineType, defineField } from 'sanity';

export const navGroupObject = defineType({
  name: 'navGroupObject',
  title: 'Footer Navigation Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Group Links',
      type: 'array',
      of: [{ type: 'navItemObject' }],
    }),
  ],
});
