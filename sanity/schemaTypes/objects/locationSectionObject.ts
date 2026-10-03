import { defineType, defineField } from 'sanity';

export const locationSectionObject = defineType({
  name: 'locationSectionObject',
  title: 'Location Content Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Section Content',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'list',
      title: 'Bullet Points List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'links',
      title: 'Related Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'locationLink',
          title: 'Location Link',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Link Label' }),
            defineField({ name: 'href', type: 'string', title: 'Link Href (e.g. /services/air-freight)' }),
          ],
        },
      ],
    }),
  ],
});
