import { defineType, defineField } from 'sanity';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Main Title (H1)',
      type: 'string',
      initialValue: 'About Raahi International',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle / Tagline',
      type: 'string',
      initialValue: 'Connecting Pakistan to the World Through Reliable Logistics',
    }),
    defineField({
      name: 'intro',
      title: 'Hero Lead / Excerpt Paragraph',
      type: 'text',
      rows: 3,
      description: 'Introductory overview paragraph shown below the hero title.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Main Article Content (Portable Text)',
      type: 'array',
      description: 'Rich text article content including headings, paragraphs, lists, images, and links.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2 Heading', value: 'h2' },
            { title: 'H3 Heading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Hyperlink',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL / Path',
                    description: 'Internal route (e.g. /cargo-services, /locations/lahore) or full external URL (https://...)',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          initialValue: 'Ready to Ship from Pakistan to the World?',
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
          initialValue:
            "Whether you're sending personal belongings, household goods or commercial cargo, Raahi International is ready to help you explore your international shipping options.",
        }),
        defineField({
          name: 'quoteLabel',
          title: 'Quote Button Label',
          type: 'string',
          initialValue: 'Get a Shipping Quote',
        }),
        defineField({
          name: 'quoteHref',
          title: 'Quote Button Href',
          type: 'string',
          initialValue: '/quote',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Metadata',
      type: 'seoObject',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'About Page',
        subtitle: subtitle || 'Singleton Page',
      };
    },
  },
});
