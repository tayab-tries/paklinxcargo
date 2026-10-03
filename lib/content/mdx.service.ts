import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ServiceMdxData, ServiceMdxFrontmatter } from '@/types/content';

/**
 * Loads and parses a service MDX file given its relative content path.
 */
export async function getServiceMdxContent(contentPath: string): Promise<ServiceMdxData> {
  const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), contentPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Service MDX file not found at path: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ServiceMdxFrontmatter,
    content,
  };
}
