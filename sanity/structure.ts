import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Raahi CMS Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      S.listItem()
        .title('Cargo Pricing & Rates')
        .id('cargoPricing')
        .child(
          S.document()
            .schemaType('cargoPricing')
            .documentId('cargoPricing')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['siteSettings', 'homepage', 'aboutPage', 'cargoPricing'].includes(listItem.getId() || '')
      ),
    ]);
