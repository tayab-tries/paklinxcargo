import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'vst9vvau',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: 'https://raahi-international.sanity.studio',
  },
});
