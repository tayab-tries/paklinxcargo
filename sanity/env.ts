export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vst9vvau';

// SANITY_API_READ_TOKEN is strictly private / server-side
export const readToken = process.env.SANITY_API_READ_TOKEN || '';

export const isSanityConfigured = Boolean(
  projectId && projectId.trim() !== '' && /^[a-z0-9-]+$/i.test(projectId)
);
