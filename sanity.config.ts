import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { resolve } from './sanity/presentation/resolve';
import { apiVersion, dataset, projectId, isSanityConfigured } from './sanity/env';

export default defineConfig({
  basePath: '/',
  name: 'cargo_cms_studio',
  title: 'CMS Studio',
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
