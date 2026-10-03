export interface VerifiedOffice {
  city: string;
  address: string;
  phone: string;
  isHeadquarters: boolean;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  domain: string;
  tagline: string;
  phone?: string;
  whatsapp?: string;
  contact?: {
    phonePrimary?: string;
    phoneSecondary?: string;
    whatsappNumber?: string;
    whatsappDefaultMessage?: string;
    emailInfo?: string;
    emailQuotes?: string;
  };
  verifiedOffices?: VerifiedOffice[];
  defaultSeo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
  };
}
