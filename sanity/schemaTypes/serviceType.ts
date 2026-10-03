import { defineType, defineField } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title (H1)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Short Name (for Nav & Cards)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (Hub Listing)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Core Freight Mode (core)', value: 'core' },
          { title: 'Specialized Freight Solution (specialized)', value: 'specialized' },
        ],
      },
      initialValue: 'core',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quoteCargoType',
      title: 'Quote Form Cargo Mode Value',
      type: 'string',
      description: 'Pre-selects cargo option in quote form',
      options: {
        list: [
          { title: 'Air Cargo Express (air_freight)', value: 'air_freight' },
          { title: 'Sea Cargo FCL/LCL (sea_cargo)', value: 'sea_cargo' },
          { title: 'Commercial Cargo (commercial_freight)', value: 'commercial_freight' },
          { title: 'Excess Baggage (excess_baggage)', value: 'excess_baggage' },
          { title: 'Door-to-Door Delivery (door_to_door)', value: 'door_to_door' },
        ],
      },
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Identifier',
      type: 'string',
      options: {
        list: [
          { title: 'Plane (Air Freight)', value: 'Plane' },
          { title: 'Ship (Sea Cargo)', value: 'Ship' },
          { title: 'Building2 (Commercial)', value: 'Building2' },
          { title: 'Luggage (Excess Baggage)', value: 'Luggage' },
          { title: 'Package (Default)', value: 'Package' },
          { title: 'Truck (Transport)', value: 'Truck' },
          { title: 'FileText (Documentation)', value: 'FileText' },
        ],
      },
      initialValue: 'Plane',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort / Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background / Graphic Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
    }),

    // Summary Panel Fields
    defineField({
      name: 'serviceOverview',
      title: 'Service Overview & Capabilities',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Shippers & Suitable Cargo',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'keyConsiderations',
      title: 'Key Operational Considerations',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // Specification Body Content
    defineField({
      name: 'body',
      title: 'Specification Content (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // Process Steps & FAQs
    defineField({
      name: 'processSteps',
      title: 'Shipping Process Steps',
      type: 'array',
      of: [{ type: 'processStepObject' }],
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [{ type: 'faqItemObject' }],
    }),

    // SEO Settings
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoObject',
    }),
  ],
});
