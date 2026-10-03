import { ServiceMdxFrontmatter } from '@/types/content';

export interface QualityGateResult {
  passed: boolean;
  checks: {
    hasRequiredFrontmatter: boolean;
    hasServiceOverview: boolean;
    hasTargetAudience: boolean;
    hasProcessSteps: boolean;
    hasKeyConsiderations: boolean;
  };
  wordCount: number;
  wordCountWarning: boolean; // Soft warning flag if < 300 words
}

/**
 * Validates structural content completeness for service MDX documents.
 * Note: Structural validation does not replace business verification in servicesRegistry.
 */
export function validateServiceQuality(
  frontmatter: ServiceMdxFrontmatter,
  contentBody: string
): QualityGateResult {
  const wordCount = contentBody.trim().split(/\s+/).filter(Boolean).length;

  const checks = {
    hasRequiredFrontmatter: Boolean(frontmatter.title && frontmatter.description && frontmatter.slug),
    hasServiceOverview: Boolean(frontmatter.serviceOverview && frontmatter.serviceOverview.length > 30),
    hasTargetAudience: Array.isArray(frontmatter.targetAudience) && frontmatter.targetAudience.length > 0,
    hasProcessSteps: Array.isArray(frontmatter.processSteps) && frontmatter.processSteps.length > 0,
    hasKeyConsiderations: Array.isArray(frontmatter.keyConsiderations) && frontmatter.keyConsiderations.length > 0,
  };

  const passed = Object.values(checks).every(Boolean);

  return {
    passed,
    checks,
    wordCount,
    wordCountWarning: wordCount < 300,
  };
}
