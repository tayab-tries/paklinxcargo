import { siteSettingsType } from './siteSettingsType';
import { homepageType } from './homepageType';
import { aboutPageType } from './aboutPageType';
import { cargoPricingType } from './cargoPricingType';
import { serviceType } from './serviceType';
import { locationType } from './locationType';
import { destinationCountryType } from './destinationCountryType';
import { destinationCityType } from './destinationCityType';
import { guideType } from './guideType';
import { ctaObject } from './objects/ctaObject';
import { seoObject } from './objects/seoObject';
import { navItemObject } from './objects/navItemObject';
import { navGroupObject } from './objects/navGroupObject';
import { registrationItemObject } from './objects/registrationItemObject';
import { clientLogoObject } from './objects/clientLogoObject';
import { useCaseCardObject } from './objects/useCaseCardObject';
import { serviceCardObject } from './objects/serviceCardObject';
import { destinationCardObject } from './objects/destinationCardObject';
import { pickupCityObject } from './objects/pickupCityObject';
import { processStepObject } from './objects/processStepObject';
import { trustMetricObject } from './objects/trustMetricObject';
import { testimonialItemObject } from './objects/testimonialItemObject';
import { faqItemObject } from './objects/faqItemObject';
import { cargoRateItemObject } from './objects/cargoRateItemObject';
import { cargoComparisonRowObject } from './objects/cargoComparisonRowObject';
import { locationSectionObject } from './objects/locationSectionObject';

export const schema = {
  types: [
    // Documents / Singletons
    siteSettingsType,
    homepageType,
    aboutPageType,
    cargoPricingType,
    serviceType,
    locationType,
    destinationCountryType,
    destinationCityType,
    guideType,

    // Reusable Objects
    ctaObject,
    seoObject,
    navItemObject,
    navGroupObject,
    registrationItemObject,
    clientLogoObject,
    useCaseCardObject,
    serviceCardObject,
    destinationCardObject,
    pickupCityObject,
    processStepObject,
    trustMetricObject,
    testimonialItemObject,
    faqItemObject,
    cargoRateItemObject,
    cargoComparisonRowObject,
    locationSectionObject,
  ],
};
