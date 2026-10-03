import React from 'react';
import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { servicesRegistry, getEnabledServices } from '@/config/services.config';
import { siteConfig } from '@/config/site.config';
import { getServiceMdxContent } from '@/lib/content/mdx.service';
import { validateServiceQuality } from '@/lib/content/content-gate';
import { getServiceJsonLd, getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSummaryPanel } from '@/components/services/ServiceSummaryPanel';
import { ServiceProcess } from '@/components/services/ServiceProcess';
import { RelatedServicesGrid } from '@/components/services/RelatedServicesGrid';
import { RelatedDestinationsBar } from '@/components/services/RelatedDestinationsBar';
import { RelatedLocationsBar } from '@/components/services/RelatedLocationsBar';
import { Accordion } from '@/components/ui/Accordion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getSanityServiceBySlug, getSanityServicesList, SanityServiceDocument, getSanitySiteSettingsData, getSanityCargoPricingData } from '@/sanity/lib/fetch';
import { AirFreightServiceContent } from '@/components/services/AirFreightServiceContent';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-display-lg font-bold text-brand-black pt-6 pb-2 border-b border-border">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-heading-xl font-bold text-brand-black pt-6 pb-2 border-b border-border">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-heading-lg font-bold text-brand-black pt-6 pb-2 border-b border-border">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-body-md text-slate-700 leading-relaxed font-normal py-2">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 py-2 text-body-md text-slate-700 font-normal">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 py-2 text-body-md text-slate-700 font-normal list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-1">
        <span>{children}</span>
      </li>
    ),
  },
};

/**
 * Pre-render static params for published service routes.
 */
export async function generateStaticParams() {
  const sanityServices = await getSanityServicesList();
  if (sanityServices && sanityServices.length > 0) {
    return sanityServices.map((s) => ({ slug: s.slug }));
  }
  const enabledServices = getEnabledServices();
  return enabledServices.map((service) => ({
    slug: service.slug,
  }));
}

/**
 * Dynamic metadata generator for service pages.
 */
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'air-freight') {
    return {
      title: `Air Cargo from Pakistan | ${siteConfig.name}`,
      description:
        'Air cargo services from Pakistan worldwide. Compare air freight vs sea cargo, rates, delivery timelines, customs clearance, and door-to-door solutions.',
      alternates: {
        canonical: `${siteConfig.domain}/services/air-freight`,
      },
      openGraph: {
        title: `Air Cargo from Pakistan | ${siteConfig.name}`,
        description:
          'Air cargo services from Pakistan worldwide. Compare air freight vs sea cargo, rates, delivery timelines, customs clearance, and door-to-door solutions.',
        url: `${siteConfig.domain}/services/air-freight`,
        type: 'website',
      },
    };
  }

  if (slug === 'door-to-door' || slug === 'door_to_door') {
    return {
      title: `Door-to-Door Delivery Available on Air & Sea Cargo | ${siteConfig.name}`,
      description: 'Door-to-door delivery options are integrated directly into our Air Cargo and Sea Cargo services from Pakistan.',
    };
  }

  const sanityService = await getSanityServiceBySlug(slug, { stega: false });
  const fallbackService = servicesRegistry.find((s) => s.slug === slug);

  if (!sanityService && (!fallbackService || !fallbackService.enabled || !fallbackService.isVerified)) {
    return {
      title: `Service Not Found | ${siteConfig.name}`,
    };
  }

  const title =
    sanityService?.seo?.metaTitle ||
    (fallbackService ? `${fallbackService.seo.title} | ${siteConfig.name}` : `Cargo Services | ${siteConfig.name}`);

  const description =
    sanityService?.seo?.metaDescription ||
    fallbackService?.seo.description ||
    'International cargo shipping services originating from Pakistan.';

  const canonicalUrl = `${siteConfig.domain}/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: sanityService?.seo?.socialImage ? [{ url: sanityService.seo.socialImage }] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Redirect Air Cargo, Sea Cargo, and legacy slugs to unified /cargo-services hub
  if (
    slug === 'air-freight' ||
    slug === 'sea-cargo' ||
    slug === 'cargo-services' ||
    slug === 'cargo_services' ||
    slug === 'air-and-sea-cargo'
  ) {
    permanentRedirect('/cargo-services');
  }
  if (slug === 'door-to-door' || slug === 'door_to_door') {
    permanentRedirect('/cargo-services');
  }

  const [business, sanitySiteSettings, sanityCargoPricing] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
    getSanityCargoPricingData(),
  ]);

  const activePhone = sanitySiteSettings?.phone || business.phonePrimary || '';
  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || activePhone;

  const sanityService: SanityServiceDocument | null = await getSanityServiceBySlug(slug);
  const fallbackService = servicesRegistry.find((s) => s.slug === slug);

  // Authoritative fallback check
  if (!sanityService && (!fallbackService || !fallbackService.enabled || !fallbackService.isVerified)) {
    notFound();
  }

  // Load MDX fallback content if Sanity document or body is not populated
  let mdxData;
  if (fallbackService) {
    try {
      mdxData = await getServiceMdxContent(fallbackService.contentPath);
      if (mdxData) {
        const quality = validateServiceQuality(mdxData.frontmatter, mdxData.content);
        if (!quality.passed && !sanityService) {
          notFound();
        }
      }
    } catch {
      if (!sanityService) notFound();
    }
  }

  const name = slug === 'air-freight' ? 'Air Cargo' : (sanityService?.name || fallbackService?.name || 'Cargo Service');
  const h1Title = slug === 'air-freight' ? 'Air Cargo from Pakistan' : (sanityService?.title || fallbackService?.h1 || 'International Cargo Services');
  const category = sanityService?.category || fallbackService?.category || 'core';
  const quoteCargoType = sanityService?.quoteCargoType || fallbackService?.quoteCargoType;
  const description =
    slug === 'air-freight'
      ? 'Reliable international air cargo and express freight solutions connecting Pakistan with destinations worldwide.'
      : (sanityService?.seo?.metaDescription ||
        fallbackService?.seo.description ||
        'International cargo shipping services from Pakistan.');

  const serviceOverview = sanityService?.serviceOverview || mdxData?.frontmatter?.serviceOverview;
  const targetAudience = sanityService?.targetAudience || mdxData?.frontmatter?.targetAudience;
  const keyConsiderations = sanityService?.keyConsiderations || mdxData?.frontmatter?.keyConsiderations;
  const processSteps = sanityService?.processSteps || mdxData?.frontmatter?.processSteps;
  const faqItems = sanityService?.faq || mdxData?.frontmatter?.faq;

  const quoteUrl = quoteCargoType ? `/quote?cargo=${quoteCargoType}` : '/quote';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: name, url: `/services/${slug}` },
  ];

  const serviceJsonLd = getServiceJsonLd(h1Title, description);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  const faqJsonLd =
    faqItems && faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 1. Service Hero Block */}
      <ServiceHero
        title={h1Title}
        description={description}
        quoteUrl={quoteUrl}
        category={category}
        breadcrumbs={breadcrumbs}
        slug={slug}
      />

      {slug === 'air-freight' ? (
        <section className="w-full py-12 lg:py-20 border-b border-border">
          <Container>
            <AirFreightServiceContent phone={activePhone} whatsappNumber={activeWhatsapp} cargoPricing={sanityCargoPricing} />
          </Container>
        </section>
      ) : (
        <>
          {/* 2. Service Summary Panel */}
          <ServiceSummaryPanel
            serviceOverview={serviceOverview}
            targetAudience={targetAudience}
            keyConsiderations={keyConsiderations}
          />

          {/* 3. Main Specification / Prose Content */}
          <section className="w-full py-16 border-b border-border bg-surface">
            <Container>
              <div className="max-w-3xl space-y-6 text-brand-black">
                {sanityService?.body && sanityService.body.length > 0 ? (
                  <PortableText value={sanityService.body} components={portableTextComponents} />
                ) : mdxData?.content ? (
                  mdxData.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h2 key={index} className="text-heading-xl font-bold text-brand-black pt-6 pb-2 border-b border-border">
                          {paragraph.replace('# ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h3 key={index} className="text-heading-lg font-bold text-brand-black pt-6 pb-2 border-b border-border">
                          {paragraph.replace('## ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n- ').map((item) => item.replace('- ', ''));
                      return (
                        <ul key={index} className="space-y-2 py-2 text-body-md text-slate-700 font-normal">
                          {items.map((it, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={index} className="text-body-md text-slate-700 leading-relaxed font-normal">
                        {paragraph}
                      </p>
                    );
                  })
                ) : null}
              </div>
            </Container>
          </section>

          {/* 4. Logistics Process Workflow */}
          <ServiceProcess steps={processSteps} />
        </>
      )}

      {/* 5. Publication-Aware Trade Corridors & Origin Network Links */}
      <RelatedDestinationsBar destinationSlugs={fallbackService?.relatedDestinations} />
      <RelatedLocationsBar locationSlugs={fallbackService?.relatedLocations} />
      <RelatedServicesGrid relatedSlugs={fallbackService?.relatedServices} />

      {/* 6. Visible FAQ Accordion */}
      {faqItems && faqItems.length > 0 && (
        <section className="w-full bg-surface-subtle py-16 lg:py-20 border-b border-border text-brand-black">
          <Container>
            <SectionHeading
              badge="FAQ"
              title="Frequently Asked Questions"
              subtitle={`Common questions regarding ${name.toLowerCase()} shipping.`}
              className="mb-10"
            />
            <div className="max-w-3xl bg-surface p-8 rounded-md border border-border shadow-xs">
              <Accordion
                items={faqItems.map((item, idx) => ({
                  id: `faq-${idx}`,
                  title: item.question,
                  content: item.answer,
                }))}
              />
            </div>
          </Container>
        </section>
      )}

      {/* 7. Final Conversion Quote CTA */}
      <FinalCtaSection />
    </article>
  );
}
