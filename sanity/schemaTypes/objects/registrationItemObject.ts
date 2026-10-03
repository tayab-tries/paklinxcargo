import { defineType, defineField } from 'sanity';

export const registrationItemObject = defineType({
  name: 'registrationItemObject',
  title: 'Official Registration / Association Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Logo Alt Text',
      type: 'string',
    }),
  ],
});
