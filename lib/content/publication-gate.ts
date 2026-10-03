import { servicesRegistry } from '@/config/services.config';

export type EntityType = 'service' | 'destination' | 'location';

/**
 * Publication-Aware Entity Checker
 * Extensible helper asking: "is this entity published and verified?"
 */
export function isPublishedEntity(type: EntityType, slug: string): boolean {
  if (type === 'service') {
    const service = servicesRegistry.find((s) => s.slug === slug);
    return Boolean(service && service.enabled === true && service.isVerified === true);
  }

  // TODO: Destination registry lookup (Module 5)
  if (type === 'destination') {
    // Intentionally returns false until Module 5 destination registry is implemented.
    return false;
  }

  // TODO: Location registry lookup (Module 6)
  if (type === 'location') {
    // Intentionally returns false until Module 6 location registry is implemented.
    return false;
  }

  return false;
}
