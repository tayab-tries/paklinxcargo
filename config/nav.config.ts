export interface NavSubItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavItem {
  title: string;
  label?: string;
  href: string;
  children?: NavSubItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

export interface FooterNavGroup {
  title: string;
  items: { label: string; href: string }[];
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Services',
    label: 'Services',
    href: '/services',
    viewAllHref: '/services',
    viewAllLabel: 'View all services',
    children: [
      {
        title: 'Air Cargo',
        href: '/services/air-freight',
        description: 'Air cargo shipping with door-to-door delivery.',
      },
      {
        title: 'Sea Cargo',
        href: '/services/sea-cargo',
        description: 'Sea cargo shipping with door-to-door delivery.',
      },
      {
        title: 'Commercial Cargo',
        href: '/services/commercial-cargo',
        description: 'Trade cargo and B2B export shipments.',
      },
      {
        title: 'Excess Baggage',
        href: '/services/excess-baggage',
        description: 'Personal baggage & household goods relocation.',
      },
    ],
  },
  {
    title: 'Destinations',
    label: 'Destinations',
    href: '/destinations',
    viewAllHref: '/destinations',
    viewAllLabel: 'View all destinations',
    children: [
      { title: 'United Kingdom', href: '/destinations/uk' },
      { title: 'United Arab Emirates', href: '/destinations/uae' },
      { title: 'United States', href: '/destinations/usa' },
      { title: 'Canada', href: '/destinations/canada' },
      { title: 'Saudi Arabia', href: '/destinations/ksa' },
    ],
  },
  {
    title: 'Locations',
    label: 'Locations',
    href: '/locations',
    viewAllHref: '/locations',
    viewAllLabel: 'View all locations',
    children: [
      { title: 'Lahore Hub', href: '/locations/international-cargo-services-in-lahore' },
      { title: 'Karachi Hub', href: '/locations/international-cargo-services-in-karachi' },
      { title: 'Islamabad Hub', href: '/locations/international-cargo-services-in-islamabad' },
      { title: 'Rawalpindi Hub', href: '/locations/international-cargo-services-in-rawalpindi' },
      { title: 'Multan Hub', href: '/locations/international-cargo-services-in-multan' },
      { title: 'Faisalabad Hub', href: '/locations/international-cargo-services-in-faisalabad' },
      { title: 'Peshawar Hub', href: '/locations/international-cargo-services-in-peshawar' },
    ],
  },
  {
    title: 'Guides',
    label: 'Guides',
    href: '/guides',
    viewAllHref: '/guides',
    viewAllLabel: 'View all guides',
    children: [
      { title: 'Customs & Documentation', href: '/guides/export-customs-documentation-guide' },
      { title: 'Packaging Guidelines', href: '/guides/packing-cargo-guide' },
      { title: 'Air vs Sea Cargo', href: '/cargo-services#quick-comparison' },
    ],
  },
  {
    title: 'About Us',
    label: 'About Us',
    href: '/about',
  },
  {
    title: 'Track Shipment',
    label: 'Tracking',
    href: '/track',
  },
];

export const navConfig = mainNavigation.map(item => ({
  ...item,
  label: item.label || item.title
}));

export const primaryCta = {
  label: 'Get a Quote',
  href: '/quote',
};

export const footerNavigation: FooterNavGroup[] = [
  {
    title: 'Services',
    items: [
      { label: 'Air Cargo', href: '/cargo-services#part-1-air-cargo' },
      { label: 'Sea Cargo', href: '/cargo-services#part-2-sea-cargo' },
      { label: 'Commercial Cargo', href: '/services/commercial-cargo' },
      { label: 'Excess Baggage', href: '/services/excess-baggage' },
    ],
  },
  {
    title: 'Destinations',
    items: [
      { label: 'Cargo to UK', href: '/destinations/uk' },
      { label: 'Cargo to UAE', href: '/destinations/uae' },
      { label: 'Cargo to USA', href: '/destinations/usa' },
      { label: 'Cargo to Canada', href: '/destinations/canada' },
      { label: 'Cargo to KSA', href: '/destinations/ksa' },
    ],
  },
  {
    title: 'Origin Locations',
    items: [
      { label: 'Lahore Hub', href: '/locations/international-cargo-services-in-lahore' },
      { label: 'Karachi Hub', href: '/locations/international-cargo-services-in-karachi' },
      { label: 'Islamabad Hub', href: '/locations/international-cargo-services-in-islamabad' },
      { label: 'Rawalpindi Hub', href: '/locations/international-cargo-services-in-rawalpindi' },
      { label: 'Multan Hub', href: '/locations/international-cargo-services-in-multan' },
      { label: 'Faisalabad Hub', href: '/locations/international-cargo-services-in-faisalabad' },
      { label: 'Peshawar Hub', href: '/locations/international-cargo-services-in-peshawar' },
    ],
  },
  {
    title: 'Company & Resources',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Track Shipment', href: '/track' },
      { label: 'Request Quote', href: '/quote' },
      { label: 'Export Documentation', href: '/guides/export-customs-documentation-guide' },
      { label: 'Packaging Guide', href: '/guides/packing-cargo-guide' },
      { label: 'Air vs Sea Freight', href: '/cargo-services#quick-comparison' },
    ],
  },
];
