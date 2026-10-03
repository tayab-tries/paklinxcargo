import staticRedirects from '@/config/redirects.json';

export interface RedirectEntry {
  source_path: string;
  target_path: string;
  status_code: number;
}

/**
 * Returns static edge redirect manifest imported directly from config/redirects.json.
 * Executed in Edge Runtime with zero live database queries and zero Node.js fs dependencies.
 */
export function getStaticRedirectManifest(): RedirectEntry[] {
  return staticRedirects as RedirectEntry[];
}
