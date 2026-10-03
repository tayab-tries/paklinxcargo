import { defineType, defineField } from 'sanity';

export const cargoRateItemObject = defineType({
  name: 'cargoRateItemObject',
  title: 'Cargo Rate & Delivery Entry',
  type: 'object',
  fields: [
    defineField({
      name: 'country',
      title: 'Destination Country Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'flag',
      title: 'Country Flag Emoji / Identifier',
      type: 'string',
      description: 'e.g. 🇬🇧, 🇺🇸, 🇦🇪, 🇨🇦, 🇸🇦, 🇪🇺, 🇦🇺',
    }),
    defineField({
      name: 'rate',
      title: 'Cargo Rate (Per KG / Unit)',
      type: 'string',
      description: 'e.g. Rs. 1,750 – 1,850/KG',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deliveryTime',
      title: 'Estimated Delivery / Transit Time',
      type: 'string',
      description: 'e.g. 10–12 Days or 1.5 – 2.5 Months',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'quoteHref',
      title: 'Quote Link Href',
      type: 'string',
      description: 'e.g. /quote?service=air-freight or /quote?service=sea-cargo',
    }),
  ],
  preview: {
    select: {
      title: 'country',
      subtitle: 'rate',
      flag: 'flag',
    },
    prepare({ title, subtitle, flag }) {
      return {
        title: `${flag || '🏳️'} ${title || 'Country'}`,
        subtitle: subtitle || 'No rate set',
      };
    },
  },
});
