import { defineType, defineField } from 'sanity';

export const processStepObject = defineType({
  name: 'processStepObject',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'string',
      description: 'e.g. 01, 02, 03, 04',
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Step Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Step Description',
      type: 'text',
      rows: 2,
    }),
  ],
});
