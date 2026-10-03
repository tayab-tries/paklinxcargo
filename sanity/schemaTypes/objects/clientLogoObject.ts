import { defineType, defineField } from 'sanity';

export const clientLogoObject = defineType({
  name: 'clientLogoObject',
  title: 'Corporate Client Logo',
  type: 'object',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
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
