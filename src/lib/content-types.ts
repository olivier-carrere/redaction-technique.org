/**
 * Canonical definitions and validation rules for documentation information types
 * and page classifications across redaction-technique.org.
 */

export const CONTENT_TYPES = ['concept', 'task', 'reference'] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const PAGE_TYPES = ['topic', 'index', 'landing', 'overview', 'utility'] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export interface PageMetadata {
  title?: string;
  description?: string;
  contentType?: string;
  pageType?: PageType | string;
  template?: string;
  tableOfContents?: boolean | unknown;
  goal?: string[];
  [key: string]: unknown;
}

export interface ValidationResult {
  valid: boolean;
  isTypedTopic: boolean;
  errors: string[];
}

/**
 * Normalizes a file path to detect index and root navigation pages.
 */
function normalizeDocPath(filePath?: string): string {
  if (!filePath) return '';
  return filePath.replace(/\\/g, '/').replace(/^.*src\/content\/docs\//, '');
}

/**
 * Determines whether a documentation page is an actual documentation topic
 * participating in the information-typing model, or an intentionally untyped
 * organizational / navigation page.
 */
export function isTypedTopic(metadata: PageMetadata, filePath?: string): boolean {
  // 1. Explicit frontmatter classification takes precedence
  if (metadata.pageType) {
    return metadata.pageType === 'topic';
  }

  // 2. Built-in Starlight splash pages are untyped landing pages
  if (metadata.template === 'splash') {
    return false;
  }

  // 3. Section indexes and directory root pages (e.g. index.mdx) are untyped
  const normalized = normalizeDocPath(filePath);
  if (normalized.endsWith('/index.mdx') || normalized.endsWith('/index.md') || normalized === 'index.mdx' || normalized === 'index.md') {
    return false;
  }

  // 4. Root-level navigation/landing and utility pages in locale roots (e.g. en/learn.mdx, fr/ask.mdx)
  // These are single-segment slugs directly under en/ or fr/ with no table of contents
  const rootPageMatch = normalized.match(/^(en|fr)\/([^/]+)\.(md|mdx)$/);
  if (rootPageMatch && metadata.tableOfContents === false) {
    return false;
  }

  // 5. Default: any standard article/guide is a documentation topic
  return true;
}

/**
 * Validates frontmatter metadata for compliance with the information-typing model.
 */
export function validatePageContent(metadata: PageMetadata, filePath?: string): ValidationResult {
  const errors: string[] = [];
  const typed = isTypedTopic(metadata, filePath);
  const ct = metadata.contentType;

  if (typed) {
    if (ct === undefined || ct === null || (typeof ct === 'string' && ct.trim() === '')) {
      errors.push(
        `Missing required frontmatter property "contentType" for documentation topic. Must be one of: ${CONTENT_TYPES.join(', ')}.`
      );
    } else if (typeof ct !== 'string' || !CONTENT_TYPES.includes(ct as ContentType)) {
      errors.push(
        `Invalid contentType "${ct}". Expected one of: ${CONTENT_TYPES.join(', ')}.`
      );
    }
  } else {
    // Intentionally untyped pages can omit contentType, but if provided it must be valid
    if (ct !== undefined && ct !== null && ct !== '') {
      if (typeof ct !== 'string' || !CONTENT_TYPES.includes(ct as ContentType)) {
        errors.push(
          `Invalid contentType "${ct}". Expected one of: ${CONTENT_TYPES.join(', ')}.`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    isTypedTopic: typed,
    errors,
  };
}
