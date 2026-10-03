import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Preview Destination | ${siteConfig.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DestinationPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="w-full bg-background py-12">
      <Container>
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-md flex items-center justify-between text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Admin Preview Mode</Badge>
            <span className="text-xs font-semibold">Unpublished / Draft Destination ({slug.toUpperCase()})</span>
          </div>
          <span className="text-xs font-mono">robots: noindex</span>
        </div>

        <SectionHeading
          badge="Destination Corridor Preview"
          title={`Shipping to ${slug.toUpperCase()}`}
          subtitle="Preview of destination country draft content."
        />

        <div className="mt-8 p-6 bg-surface border border-border rounded-md space-y-4 max-w-3xl">
          <p className="text-body-md text-muted-foreground">
            This preview route renders draft destination country specifications for editorial review prior to static Edge deployment.
          </p>
        </div>
      </Container>
    </div>
  );
}
