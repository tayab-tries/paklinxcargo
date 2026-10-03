/**
 * Centralized Media & Photography Registry
 * Single authoritative source of truth for configurable photographic image slots.
 * Supports missing local assets safely with intentional layout fallback containers.
 */

export interface ImageSlotDefinition {
  src: string;
  fallbackSrc: string;
  alt: string;
  aspectRatio: string;
}

export const IMAGE_SLOTS = {
  hero: {
    src: '/images/hero-freight.jpg',
    fallbackSrc: '/images/hero-freight.svg',
    alt: 'International ocean container freighter vessel sailing at sea',
    aspectRatio: 'aspect-[16/9]',
  },
  heroBackground: {
    src: '/images/hero-freight.jpg',
    fallbackSrc: '/images/hero-freight.svg',
    alt: 'Cinematic international ocean container freighter ship at sea port',
    aspectRatio: 'aspect-fill',
  },
  serviceAir: {
    src: '/images/service-air.jpg',
    fallbackSrc: '/images/service-air.svg',
    alt: 'Express air cargo freighter loading palletized cargo on airport tarmac',
    aspectRatio: 'aspect-[16/9]',
  },
  serviceSea: {
    src: '/images/service-sea.jpg',
    fallbackSrc: '/images/service-sea.svg',
    alt: 'Ocean container freighter ship sailing open waters',
    aspectRatio: 'aspect-[4/3]',
  },
  serviceDoor: {
    src: '/images/service-door.jpg',
    fallbackSrc: '/images/service-door.svg',
    alt: 'Courier handing parcel package to recipient at doorstep',
    aspectRatio: 'aspect-[4/3]',
  },
  pakistanHub: {
    src: '/images/hero-freight.jpg',
    fallbackSrc: '/images/hero-freight.svg',
    alt: 'Pakistan export cargo freight terminal handling facility',
    aspectRatio: 'aspect-[16/9]',
  },
  connectingPakistanMap: {
    src: '/images/pakistan-map-network.png',
    fallbackSrc: '/images/hero-freight.jpg',
    alt: 'Connecting Pakistan — Delivering Possibilities network map',
    aspectRatio: 'aspect-[16/9]',
  },
  destination: {
    src: '/images/destination-port.jpg',
    fallbackSrc: '/images/destination-port.svg',
    alt: 'International container port facility and freight logistics terminal',
    aspectRatio: 'aspect-[16/9]',
  },
  guideCover: {
    src: '/images/guide-cover.webp',
    fallbackSrc: '/images/guide-cover.svg',
    alt: 'Export customs documentation and international packaging guide',
    aspectRatio: 'aspect-[3/2]',
  },
  tracking: {
    src: '/images/tracking-cargo.jpg',
    fallbackSrc: '/images/tracking-cargo.svg',
    alt: 'Cargo container tracking and shipment logistics monitoring',
    aspectRatio: 'aspect-[16/9]',
  },
} as const;

export type ImageSlotKey = keyof typeof IMAGE_SLOTS;

/** Safe image source resolver providing layout dimension fallbacks */
export function getSafeImageSrc(slotKey: ImageSlotKey): string {
  const slot = IMAGE_SLOTS[slotKey];
  return slot ? slot.src : '/images/fallback-container.svg';
}
