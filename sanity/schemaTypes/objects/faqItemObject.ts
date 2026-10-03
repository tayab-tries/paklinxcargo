import { defineType, defineField } from 'sanity';

export const faqItemObject = defineType({
  name: 'faqItemObject',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});
