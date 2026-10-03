import { createImageUrlBuilder } from '@sanity/image-url';
import { dataset, projectId, isSanityConfigured } from '../env';

const imageBuilder = isSanityConfigured
  ? createImageUrlBuilder({
      projectId,
      dataset: dataset || 'production',
    })
  : null;

export const urlForImage = (source: unknown) => {
  if (!source || !imageBuilder) return null;
  try {
    return imageBuilder.image(source);
  } catch {
    return null;
  }
};
