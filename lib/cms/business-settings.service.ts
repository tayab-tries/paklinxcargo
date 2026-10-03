import { siteConfig } from '@/config/site.config';
import { getSanitySiteSettingsData } from '@/sanity/lib/fetch';

export interface PublishedBusinessSettings {
  brandName: string;
  legalName: string;
  phonePrimary: string;
  whatsappNumber: string;
  emailInfo: string;
  operatingHours: string;
  addressPrimary: string;
}

export async function getPublishedBusinessSettings(): Promise<PublishedBusinessSettings> {
  try {
    const sanitySettings = await getSanitySiteSettingsData();
    if (sanitySettings) {
      return {
        brandName: sanitySettings.businessName || siteConfig.name,
        legalName: sanitySettings.businessName || siteConfig.name,
        phonePrimary: sanitySettings.phone || '',
        whatsappNumber: sanitySettings.whatsappNumber || sanitySettings.phone || '',
        emailInfo: sanitySettings.email || '',
        operatingHours: sanitySettings.operatingHours || '',
        addressPrimary: sanitySettings.address || '',
      };
    }
  } catch (err: unknown) {
    console.warn('[BusinessSettings] Sanity fetch failed:', err);
  }

  return {
    brandName: siteConfig.name,
    legalName: siteConfig.name,
    phonePrimary: '',
    whatsappNumber: '',
    emailInfo: '',
    operatingHours: '',
    addressPrimary: '',
  };
}
