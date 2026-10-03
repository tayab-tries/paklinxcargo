import { defineType, defineField } from 'sanity';

export const trustMetricObject = defineType({
  name: 'trustMetricObject',
  title: 'Trust / Verification Metric',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Metric Value',
      type: 'string',
      description: 'e.g. 100% or Verified',
    }),
    defineField({
      name: 'label',
      title: 'Metric Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});
