import { defineQuery } from 'next-sanity';

// --------------------------------------------------
// SITE SETTINGS SINGLETON QUERY
// --------------------------------------------------
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName,
    shortDescription,
    phone,
    whatsappNumber,
    email,
    address,
    operatingHours,
    "logo": logo.asset->url,
    "logoDark": logoDark.asset->url,
    "logoLight": logoLight.asset->url,
    navigationItems[] {
      label,
      href
    },
    primaryCta {
      label,
      href
    },
    footerDescription,
    footerGroups[] {
      title,
      links[] {
        label,
        href
      }
    },
    copyrightText,
    defaultSeoTitle,
    defaultSeoDescription,
    "defaultSocialImage": defaultSocialImage.asset->url,
    socialLinks {
      facebook,
      instagram,
      linkedin,
      tiktok
    }
  }
`);

// --------------------------------------------------
// HOMEPAGE SINGLETON QUERY
// --------------------------------------------------
export const HOMEPAGE_FULL_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    },
    hero {
      eyebrow,
      heading,
      highlightedHeading,
      description,
      primaryCta { label, href },
      secondaryCta { label, href },
      "heroImage": heroImage.asset->url,
      heroImageAlt
    },
    heroFeatureChips[] {
      label,
      icon
    },
    quickQuote {
      heading,
      description,
      ctaText
    },
    trustMetrics[] {
      value,
      label
    },
    registrations {
      heading,
      items[] {
        name,
        "logo": logo.asset->url,
        altText
      }
    },
    trustedMarket {
      heading,
      items[] {
        companyName,
        "logo": logo.asset->url,
        altText
      }
    },
    whatCanYouSend {
      badge,
      heading,
      description,
      items[] {
        title,
        description,
        badgeText,
        iconName
      }
    },
    servicesOverview {
      badge,
      heading,
      description,
      airCargo {
        title,
        description,
        "image": image.asset->url,
        imageAlt,
        featureBullets,
        cta { label, href }
      },
      seaCargo {
        title,
        description,
        "image": image.asset->url,
        imageAlt,
        featureBullets,
        cta { label, href }
      }
    },
    popularDestinations {
      badge,
      heading,
      description,
      destinations[] {
        name,
        countryCode,
        "flagImage": flagImage.asset->url,
        shortText,
        href
      }
    },
    pickupCities {
      badge,
      heading,
      description,
      cities[] {
        name,
        href
      }
    },
    howItWorks {
      badge,
      heading,
      description,
      steps[] {
        stepNumber,
        title,
        subtitle,
        description
      }
    },
    testimonials {
      badge,
      heading,
      description,
      items[] {
        name,
        location,
        quote,
        rating,
        "image": image.asset->url,
        caption
      }
    },
    faq {
      badge,
      heading,
      description,
      items[] {
        question,
        answer
      }
    },
    finalCta {
      eyebrow,
      heading,
      description,
      primaryCta { label, href },
      secondaryCta { label, href }
    },
    mobileBottomCta {
      callLabel,
      whatsappLabel,
      quoteLabel
    }
  }
`);

// --------------------------------------------------
// SERVICES QUERIES (PHASE 3A)
// --------------------------------------------------
export const SERVICES_LIST_QUERY = defineQuery(`
  *[_type == "service"] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    name,
    shortDescription,
    category,
    quoteCargoType,
    iconName,
    sortOrder,
    "heroImage": heroImage.asset->url,
    heroImageAlt
  }
`);

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    name,
    shortDescription,
    category,
    quoteCargoType,
    iconName,
    sortOrder,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    serviceOverview,
    targetAudience,
    keyConsiderations,
    body,
    processSteps[] {
      stepNumber,
      title,
      subtitle,
      description
    },
    faq[] {
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

// --------------------------------------------------
// LOCATIONS QUERIES (PHASE 3B)
// --------------------------------------------------
export const LOCATIONS_LIST_QUERY = defineQuery(`
  *[_type == "location"] | order(sortOrder asc) {
    _id,
    name,
    "slug": slug.current,
    province,
    h1,
    introduction,
    sortOrder,
    serviceAvailable,
    collectionAvailable,
    hasPhysicalBranch,
    branchAddress,
    localCoverageText,
    "supportedServices": supportedServices[]->slug.current,
    faqs[] {
      question,
      answer
    },
    sections[] {
      title,
      content,
      list,
      links[] {
        label,
        href
      }
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

export const LOCATION_BY_SLUG_QUERY = defineQuery(`
  *[_type == "location" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    province,
    h1,
    introduction,
    sortOrder,
    serviceAvailable,
    collectionAvailable,
    hasPhysicalBranch,
    branchAddress,
    localCoverageText,
    "supportedServices": supportedServices[]->slug.current,
    faqs[] {
      question,
      answer
    },
    sections[] {
      title,
      content,
      list,
      links[] {
        label,
        href
      }
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

// --------------------------------------------------
// DESTINATIONS QUERIES (PHASE 3C)
// --------------------------------------------------
export const DESTINATIONS_LIST_QUERY = defineQuery(`
  *[_type == "destinationCountry"] | order(sortOrder asc) {
    _id,
    name,
    "slug": slug.current,
    region,
    h1,
    introduction,
    shippingOverview,
    customsGuidance,
    sortOrder,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    "supportedServices": supportedServices[]->slug.current,
    "supportedOrigins": supportedOrigins[]->slug.current,
    "cities": *[_type == "destinationCity" && references(^._id)] | order(sortOrder asc) {
      _id,
      name,
      "slug": slug.current,
      h1,
      introduction,
      overview,
      preparationConsiderations
    },
    faqs[] {
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

export const DESTINATION_BY_SLUG_QUERY = defineQuery(`
  *[_type == "destinationCountry" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    region,
    h1,
    introduction,
    shippingOverview,
    customsGuidance,
    sortOrder,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    "supportedServices": supportedServices[]->slug.current,
    "supportedOrigins": supportedOrigins[]->slug.current,
    "cities": *[_type == "destinationCity" && references(^._id)] | order(sortOrder asc) {
      _id,
      name,
      "slug": slug.current,
      h1,
      introduction,
      overview,
      preparationConsiderations,
      seo {
        metaTitle,
        metaDescription
      }
    },
    faqs[] {
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

export const DESTINATION_CITY_BY_SLUGS_QUERY = defineQuery(`
  *[_type == "destinationCity" && slug.current == $citySlug && country->slug.current == $countrySlug][0] {
    _id,
    name,
    "slug": slug.current,
    h1,
    introduction,
    overview,
    preparationConsiderations,
    sortOrder,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    "country": country-> {
      _id,
      name,
      "slug": slug.current,
      region,
      h1,
      introduction,
      shippingOverview,
      customsGuidance,
      "supportedServices": supportedServices[]->slug.current,
      "supportedOrigins": supportedOrigins[]->slug.current,
      faqs[] {
        question,
        answer
      }
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

// --------------------------------------------------
// GUIDES QUERIES (PHASE 3D)
// --------------------------------------------------
export const GUIDES_LIST_QUERY = defineQuery(`
  *[_type == "guide"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    authorName,
    publishedAt,
    updatedAt,
    readingTimeMinutes,
    isFeatured,
    containsRegulatoryClaims,
    verificationNotes,
    contentMarkdown,
    "supportedServices": supportedServices[]->slug.current,
    "supportedOrigins": supportedOrigins[]->slug.current,
    "supportedDestinations": supportedDestinations[]->slug.current,
    faqs[] {
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

export const GUIDE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    authorName,
    publishedAt,
    updatedAt,
    readingTimeMinutes,
    isFeatured,
    containsRegulatoryClaims,
    verificationNotes,
    contentMarkdown,
    body,
    "supportedServices": supportedServices[]->slug.current,
    "supportedOrigins": supportedOrigins[]->slug.current,
    "supportedDestinations": supportedDestinations[]->slug.current,
    faqs[] {
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

// --------------------------------------------------
// ABOUT PAGE SINGLETON QUERY
// --------------------------------------------------
export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    title,
    subtitle,
    intro,
    "heroImage": heroImage.asset->url,
    body,
    cta {
      title,
      description,
      quoteLabel,
      quoteHref
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

// --------------------------------------------------
// CARGO PRICING SINGLETON QUERY
// --------------------------------------------------
export const CARGO_PRICING_QUERY = defineQuery(`
  *[_type == "cargoPricing"][0] {
    hero {
      eyebrow,
      heading,
      subheading,
      introParagraph,
      airBadgeTitle,
      airMinWeightText,
      seaBadgeTitle,
      seaMinWeightText
    },
    airCargoSection {
      title,
      subtitle,
      minWeightBadge,
      rates[] {
        country,
        flag,
        rate,
        deliveryTime,
        sortOrder,
        quoteHref
      }
    },
    seaCargoSection {
      title,
      subtitle,
      minWeightBadge,
      rates[] {
        country,
        flag,
        rate,
        deliveryTime,
        sortOrder,
        quoteHref
      },
      disclaimer
    },
    quickComparison {
      title,
      subtitle,
      rows[] {
        feature,
        airValue,
        seaValue,
        airBadge,
        seaBadge,
        sortOrder
      }
    },
    decisionGuidance {
      title,
      airTitle,
      airPoints,
      seaTitle,
      seaPoints
    },
    doorToDoor {
      badge,
      title,
      description,
      workflowSteps
    },
    faqs[] {
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage.asset->url
    }
  }
`);

