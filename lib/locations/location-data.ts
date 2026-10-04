export interface LocationSection {
  title: string;
  content: string;
  list?: string[];
  links?: Array<{ label: string; href: string }>;
}

export interface CityLocationRecord {
  id: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  introduction: string;
  localCoverageText: string;
  supportedServices: string[];
  supportedDestinations: string[];
  serviceAvailable: boolean;
  collectionAvailable: boolean;
  hasPhysicalBranch: boolean;
  branchAddress?: string;
  sections: LocationSection[];
  faqs: Array<{ question: string; answer: string }>;
}

export const CITY_LOCATIONS_DATA: CityLocationRecord[] = [
  {
    id: 'loc-lahore',
    name: 'Lahore',
    slug: 'lahore',
    province: 'Punjab',
    h1: 'International Cargo Shipping & Pickup in Lahore',
    seoTitle: 'Cargo Shipping in Lahore | Doorstep Pickup | Paklinx Cargo',
    seoDescription: 'Doorstep cargo pickup and export shipping services operating across Lahore district, Gulberg, DHA, Johar Town, and industrial zones.',
    primaryKeyword: 'cargo shipping lahore',
    introduction: 'Doorstep cargo pickup and export shipping services operating across Lahore district, Gulberg, DHA, Johar Town, and industrial zones.',
    localCoverageText: 'Comprehensive doorstep coverage across Lahore metropolitan areas including DHA, Gulberg, Model Town, Johar Town, Bahria Town, and Sundar Industrial Estate.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Cargo Operations Desk, Lahore, Punjab, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'How does cargo pickup work in Lahore?',
        answer: 'Scheduled doorstep pickup is arranged from your address anywhere in Lahore. Weight measurement, packing verification, and export paperwork assistance are completed prior to dispatch.',
      },
      {
        question: 'What services are supported for shipments originating in Lahore?',
        answer: 'Both express Air Cargo (minimum 20 KG) and ocean Sea Freight (minimum 70–100 KG) services are supported for dispatch from Lahore.',
      },
    ],
  },
  {
    id: 'loc-karachi',
    name: 'Karachi',
    slug: 'karachi',
    province: 'Sindh',
    h1: 'International Cargo Shipping & Pickup in Karachi',
    seoTitle: 'Cargo Shipping in Karachi | Port & Airport Freight | Paklinx Cargo',
    seoDescription: 'Port city international cargo collection and export processing connecting Karachi commercial hubs to worldwide air and ocean freight routes.',
    primaryKeyword: 'cargo shipping karachi',
    introduction: 'Port city international cargo collection and export processing connecting Karachi commercial hubs to worldwide air and ocean freight routes.',
    localCoverageText: 'Full coverage across Karachi commercial centers, Port Qasim, Korangi Industrial Area, SITE, Clifton, and DHA.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Maritime & Air Cargo Desk, Karachi, Sindh, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'How does cargo pickup work in Karachi?',
        answer: 'Doorstep collection is arranged across all Karachi zones. Shipments are transported to airport or port staging facilities for custom clearance and containerization.',
      },
      {
        question: 'What services are supported for shipments originating in Karachi?',
        answer: 'Direct sea cargo container loading via Port Qasim/Karachi Port and express air cargo dispatches via Jinnah International Airport.',
      },
    ],
  },
  {
    id: 'loc-islamabad',
    name: 'Islamabad',
    slug: 'islamabad',
    province: 'Capital Territory',
    h1: 'International Cargo Shipping & Pickup in Islamabad',
    seoTitle: 'Cargo Shipping in Islamabad | Doorstep Collection | Paklinx Cargo',
    seoDescription: 'Capital region cargo dispatch desk coordinating doorstep collection across Islamabad sectors and diplomatic corridors.',
    primaryKeyword: 'cargo shipping islamabad',
    introduction: 'Capital region cargo dispatch desk coordinating doorstep collection across Islamabad sectors and diplomatic corridors.',
    localCoverageText: 'Doorstep collection across all Islamabad sectors (F, G, E, I, H series), DHA Islamabad, and Bahria Town.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Capital Freight Desk, Islamabad, Federal Territory, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'Can you collect cargo from residential sectors in Islamabad?',
        answer: 'Yes, our team provides scheduled doorstep collection across all residential and diplomatic sectors in Islamabad.',
      },
      {
        question: 'Which air hub serves Islamabad cargo dispatches?',
        answer: 'Air cargo is routed through Islamabad International Airport (ISB) with daily flights to UK, Middle East, Europe, and North America.',
      },
    ],
  },
  {
    id: 'loc-rawalpindi',
    name: 'Rawalpindi',
    slug: 'rawalpindi',
    province: 'Punjab',
    h1: 'International Cargo Shipping & Pickup in Rawalpindi',
    seoTitle: 'Cargo Shipping in Rawalpindi | Doorstep Cargo Service | Paklinx Cargo',
    seoDescription: 'Twin city origin hub providing doorstep collection and cargo handling across Rawalpindi commercial districts.',
    primaryKeyword: 'cargo shipping rawalpindi',
    introduction: 'Twin city origin hub providing doorstep collection and cargo handling across Rawalpindi commercial districts.',
    localCoverageText: 'Full collection coverage across Saddar, Commercial Market, Bahria Town Rawalpindi, and Chaklala.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Regional Cargo Operations, Rawalpindi, Punjab, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'How do I arrange cargo collection in Rawalpindi?',
        answer: 'Contact our logistics desk via phone, WhatsApp, or online quote to schedule doorstep pickup anywhere in Rawalpindi.',
      },
      {
        question: 'What is the minimum weight for cargo from Rawalpindi?',
        answer: 'Air cargo starts at 20 KG minimum, while ocean sea freight starts at 70–100 KG depending on destination.',
      },
    ],
  },
  {
    id: 'loc-faisalabad',
    name: 'Faisalabad',
    slug: 'faisalabad',
    province: 'Punjab',
    h1: 'International Cargo Shipping & Pickup in Faisalabad',
    seoTitle: 'Cargo Shipping in Faisalabad | Textile & Commercial Cargo | Paklinx Cargo',
    seoDescription: 'Textile export center providing dedicated cargo collection for commercial garments, fabric consignments, and industrial shipments.',
    primaryKeyword: 'cargo shipping faisalabad',
    introduction: 'Textile export center providing dedicated cargo collection for commercial garments, fabric consignments, and industrial shipments.',
    localCoverageText: 'Dedicated commercial logistics coverage across Faisalabad textile mills, industrial zones, and residential areas.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Commercial Cargo Desk, Faisalabad, Punjab, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'Do you handle commercial textile exports from Faisalabad?',
        answer: 'Yes, we provide full support for textile trade samples, bulk apparel shipments, and fabric consignments with export customs documentation.',
      },
      {
        question: 'Is doorstep collection available for personal luggage in Faisalabad?',
        answer: 'Yes, scheduled residential collection is available for personal luggage, excess baggage, and household goods across Faisalabad.',
      },
    ],
  },
  {
    id: 'loc-sialkot',
    name: 'Sialkot',
    slug: 'sialkot',
    province: 'Punjab',
    h1: 'International Cargo Shipping & Pickup in Sialkot',
    seoTitle: 'Cargo Shipping in Sialkot | Export Freight Hub | Paklinx Cargo',
    seoDescription: 'Export manufacturing hub supporting sports goods, surgical instruments, and leather merchandise international dispatches.',
    primaryKeyword: 'cargo shipping sialkot',
    introduction: 'Export manufacturing hub supporting sports goods, surgical instruments, and leather merchandise international dispatches.',
    localCoverageText: 'Specialized export collection across Sialkot industrial estates, Sambrial, and Daska road manufacturing clusters.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Export Freight Hub, Sialkot, Punjab, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'How do you support Sialkot exporters?',
        answer: 'We provide specialized freight forwarding for sports goods, surgical instruments, leather goods, and workwear with direct airport routing via Sialkot International Airport (SKT).',
      },
      {
        question: 'Can you arrange sea freight for Sialkot manufacturers?',
        answer: 'Yes, containerized cargo is consolidated and transferred via dry port or bonded trucking to Karachi ports for international ocean shipping.',
      },
    ],
  },
  {
    id: 'loc-multan',
    name: 'Multan',
    slug: 'multan',
    province: 'Punjab',
    h1: 'International Cargo Shipping & Pickup in Multan',
    seoTitle: 'Cargo Shipping in Multan | Doorstep Collection | Paklinx Cargo',
    seoDescription: 'Southern Punjab origin center connecting agricultural, commercial, and personal baggage cargo dispatches.',
    primaryKeyword: 'cargo shipping multan',
    introduction: 'Southern Punjab origin center connecting agricultural, commercial, and personal baggage cargo dispatches.',
    localCoverageText: 'Doorstep collection coverage across Multan city, Cantt, Bosan Road, and industrial estates.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Regional Cargo Center, Multan, Punjab, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'Is doorstep collection available across Multan?',
        answer: 'Yes, our logistics team coordinates doorstep pickup across all residential sectors, Cantt, and industrial areas in Multan.',
      },
      {
        question: 'What cargo categories are supported from Multan?',
        answer: 'Personal excess baggage, commercial trade goods, handicrafts, and household relocation items are supported for international dispatch.',
      },
    ],
  },
  {
    id: 'loc-peshawar',
    name: 'Peshawar',
    slug: 'peshawar',
    province: 'Khyber Pakhtunkhwa',
    h1: 'International Cargo Shipping & Pickup in Peshawar',
    seoTitle: 'Cargo Shipping in Peshawar | Doorstep Cargo Service | Paklinx Cargo',
    seoDescription: 'KPK regional dispatch hub coordinating doorstep collection and export processing for northern Pakistan shippers.',
    primaryKeyword: 'cargo shipping peshawar',
    introduction: 'KPK regional dispatch hub coordinating doorstep collection and export processing for northern Pakistan shippers.',
    localCoverageText: 'Doorstep collection across Peshawar City, Cantt, Hayatabad, and University Town.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'KPK Regional Dispatch Desk, Peshawar, Khyber Pakhtunkhwa, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'How does cargo collection work in Peshawar?',
        answer: 'We schedule doorstep collection in Peshawar (including Hayatabad, Cantt, and University Town) with weighing, packing assistance, and documentation support.',
      },
      {
        question: 'Can I send excess baggage from Peshawar to the UK or Gulf countries?',
        answer: 'Yes, air cargo dispatches depart regularly connecting northern Pakistan to the UK, UAE, Saudi Arabia, USA, and Canada.',
      },
    ],
  },
  {
    id: 'loc-gujranwala',
    name: 'Gujranwala',
    slug: 'gujranwala',
    province: 'Punjab',
    h1: 'International Cargo Shipping & Pickup in Gujranwala',
    seoTitle: 'Cargo Shipping in Gujranwala | Doorstep Pickup | Paklinx Cargo',
    seoDescription: 'Industrial and manufacturing corridor cargo pickup coordinating export dispatches and doorstep collection across Gujranwala district.',
    primaryKeyword: 'cargo shipping gujranwala',
    introduction: 'Industrial and manufacturing corridor cargo pickup coordinating export dispatches and doorstep collection across Gujranwala district.',
    localCoverageText: 'Doorstep cargo collection across Gujranwala industrial clusters, Cantt, Model Town, and GT Road trade corridors.',
    supportedServices: ['air-freight', 'sea-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Industrial Corridor Cargo Desk, Gujranwala, Punjab, Pakistan',
    sections: [],
    faqs: [
      {
        question: 'Do you collect industrial and commercial cargo in Gujranwala?',
        answer: 'Yes, we provide dedicated pickup for ceramics, sanitary ware, kitchenware, metal products, and commercial goods manufactured in Gujranwala.',
      },
      {
        question: 'Can families and overseas travelers book personal luggage pickup in Gujranwala?',
        answer: 'Yes, scheduled residential collection is available for personal baggage, household items, and student relocation shipments.',
      },
    ],
  },
];
