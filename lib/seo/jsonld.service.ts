import { siteConfig } from '@/config/site.config';
import { BreadcrumbItem } from '@/types/content';

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName || siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.defaultSeo.defaultDescription,
    telephone: siteConfig.contact?.phonePrimary || undefined,
    email: siteConfig.contact?.emailInfo || undefined,
    address: (siteConfig.verifiedOffices?.length ?? 0) > 0 ? {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.verifiedOffices?.[0]?.city,
      streetAddress: siteConfig.verifiedOffices?.[0]?.address,
      addressCountry: 'PK',
    } : undefined,
  };
}

export function getServiceJsonLd(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    serviceType: serviceName,
  };
}

export function getBreadcrumbJsonLd(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.domain}${item.url}`,
    })),
  };
}
