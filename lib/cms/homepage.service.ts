export type BlockType =
  | 'hero'
  | 'quick_quote'
  | 'use_cases'
  | 'services'
  | 'registrations_associations'
  | 'trusted_market'
  | 'locations'
  | 'destinations'
  | 'process'
  | 'trust'
  | 'testimonials'
  | 'faq'
  | 'cta';

export interface HomepageBlockData {
  id: string;
  type: BlockType;
  label: string;
  enabled: boolean;
  sortOrder: number;
  contentData: Record<string, unknown>;
}

const DEFAULT_BLOCK_TYPES: BlockType[] = [
  'hero',
  'quick_quote',
  'use_cases',
  'services',
  'registrations_associations',
  'trusted_market',
  'locations',
  'destinations',
  'process',
  'trust',
  'testimonials',
  'faq',
  'cta',
];

export async function getPublishedHomepageBlocks(): Promise<Record<BlockType, HomepageBlockData>> {
  const result: Record<string, HomepageBlockData> = {};

  DEFAULT_BLOCK_TYPES.forEach((blockKey, idx) => {
    result[blockKey] = {
      id: `blk-${blockKey}`,
      type: blockKey,
      label: blockKey,
      enabled: true,
      sortOrder: idx + 1,
      contentData: {},
    };
  });

  return result as Record<BlockType, HomepageBlockData>;
}
