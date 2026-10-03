import { defineType, defineField } from 'sanity';

export const destinationCardObject = defineType({
  name: 'destinationCardObject',
  title: 'Destination Card',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Country / Destination Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'countryCode',
      title: 'Country Code (slug identifier)',
      type: 'string',
      description: 'e.g. uk, uae, usa, canada, ksa',
    }),
    defineField({
      name: 'flagImage',
      title: 'Flag / Country Graphic',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortText',
      title: 'Coverage / Service Short Text',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'Destination Target Link',
      type: 'string',
    }),
  ],
});
