import crypto from 'crypto';

/**
 * Generates cryptographically secure quote references without modulo bias.
 * Format: QTE-2026-X7K4M9P2
 */
export function generateSecureQuoteReference(): string {
  const year = new Date().getFullYear();
  const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // 32 unambiguous characters
  let result = '';

  while (result.length < 8) {
    const byte = crypto.randomBytes(1)[0];
    if (byte < 224) {
      // 224 is a multiple of 32 (32 * 7), eliminating modulo bias
      result += charset[byte % 32];
    }
  }

  return `QTE-${year}-${result}`;
}
