import { defineType, defineField } from 'sanity';

export const testimonialItemObject = defineType({
  name: 'testimonialItemObject',
  title: 'Testimonial / Delivery Proof Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer / Shipper Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Route',
      type: 'string',
      description: 'e.g. Lahore to London, UK',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'image',
      title: 'Delivery Proof Photo / Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'caption',
      title: 'Photo Caption / Alt Text',
      type: 'string',
    }),
  ],
});
