import { defineType, defineField } from 'sanity';

export const pickupCityObject = defineType({
  name: 'pickupCityObject',
  title: 'Pickup City Link',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'City Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Target Link URL',
      type: 'string',
    }),
  ],
});
