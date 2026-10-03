import { defineType, defineField } from 'sanity';

export const useCaseCardObject = defineType({
  name: 'useCaseCardObject',
  title: 'Cargo Type / Use Case Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'badgeText',
      title: 'Category Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Identifier',
      type: 'string',
      description: 'e.g. package, luggage, building',
    }),
  ],
});
