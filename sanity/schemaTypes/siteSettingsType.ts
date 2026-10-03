import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // --------------------------------------------------
    // 1. BUSINESS INFORMATION (Single Source of Contact Info)
    // --------------------------------------------------
    defineField({
      name: 'businessName',
      title: 'Business / Brand Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Business Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone Number',
      type: 'string',
      description: 'Main business phone number (e.g. 0300 7097063 or +92 300 7097063)',
      validation: (rule) => rule.required().error('Primary phone number is required'),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp number formatted with country code without spaces or dashes (e.g. 923007097063)',
      validation: (rule) => rule.required().error('WhatsApp number is required'),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      description: 'Official contact email address (e.g. raahiinternational4@gmail.com)',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email', invert: false })
          .error('Please enter a valid email address'),
    }),
    defineField({
      name: 'address',
      title: 'Main Office Address',
      type: 'string',
    }),
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'string',
    }),

    // --------------------------------------------------
    // 2. HEADER CONFIGURATION
    // --------------------------------------------------
    defineField({
      name: 'logo',
      title: 'Main Brand Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Dark Variant Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoLight',
      title: 'Light / Inverse Variant Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigationItems',
      title: 'Main Header Navigation Links',
      type: 'array',
      of: [{ type: 'navItemObject' }],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Header Primary CTA Button',
      type: 'ctaObject',
    }),

    // --------------------------------------------------
    // 3. FOOTER CONFIGURATION (NO duplicate contact fields!)
    // --------------------------------------------------
    defineField({
      name: 'footerDescription',
      title: 'Footer Brand Bio Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'footerGroups',
      title: 'Footer Link Columns / Groups',
      type: 'array',
      of: [{ type: 'navGroupObject' }],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Footer Copyright Notice',
      type: 'string',
      description: 'e.g. All rights reserved.',
    }),

    // --------------------------------------------------
    // 4. DEFAULT SEO
    // --------------------------------------------------
    defineField({
      name: 'defaultSeoTitle',
      title: 'Default Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'defaultSocialImage',
      title: 'Default Open Graph / Social Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // --------------------------------------------------
    // 5. SOCIAL LINKS
    // --------------------------------------------------
    defineField({
      name: 'socialLinks',
      title: 'Social Media Profiles',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'string' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'string' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'string' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'string' }),
      ],
    }),
  ],
});
