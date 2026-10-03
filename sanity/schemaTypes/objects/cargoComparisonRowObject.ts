import { defineType, defineField } from 'sanity';

export const cargoComparisonRowObject = defineType({
  name: 'cargoComparisonRowObject',
  title: 'Air vs Sea Comparison Row',
  type: 'object',
  fields: [
    defineField({
      name: 'feature',
      title: 'Comparison Feature Label',
      type: 'string',
      description: 'e.g. Best For, Minimum Weight, Transit Time, Cost, Suitable For',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'airValue',
      title: 'Air Cargo Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seaValue',
      title: 'Sea Cargo Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'airBadge',
      title: 'Optional Air Highlight Badge',
      type: 'string',
      description: 'e.g. 20 KG',
    }),
    defineField({
      name: 'seaBadge',
      title: 'Optional Sea Highlight Badge',
      type: 'string',
      description: 'e.g. 70–100 KG',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'feature',
      airValue: 'airValue',
      seaValue: 'seaValue',
    },
    prepare({ title, airValue, seaValue }) {
      return {
        title: title || 'Comparison Row',
        subtitle: `Air: ${airValue || ''} | Sea: ${seaValue || ''}`,
      };
    },
  },
});
