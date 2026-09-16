/**
 * Canonical definitions and validation rules for documentation information types
 * and page classifications across redaction-technique.org.
 */

export const CONTENT_TYPES = ['concept', 'task', 'reference'] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const PAGE_TYPES = ['topic', 'index', 'landing', 'overview', 'utility'] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export interface ClassificationMetadata {
  label: string;
  description: string;
}

export const CONTENT_TYPE_METADATA: Record<ContentType, ClassificationMetadata> = {
  concept: {
    label: 'Concept',
    description: 'Explains ideas, architecture, principles, background, and relationships to build mental models.',
  },
  task: {
    label: 'Task',
    description: 'Provides sequential, step-by-step procedures to accomplish a specific goal with a verifiable outcome.',
  },
  reference: {
    label: 'Reference',
    description: 'Provides structured lookup facts, specifications, syntax, configuration options, parameters, and constraints.',
  },
} as const;

export const PAGE_TYPE_METADATA: Record<PageType, ClassificationMetadata> = {
  topic: {
    label: 'Topic',
    description: 'A modular documentation article structured around a primary information type (concept, task, or reference).',
  },
  index: {
    label: 'Index',
    description: 'A navigational directory page organizing and listing documentation topics within a section.',
  },
  landing: {
    label: 'Landing page',
    description: 'A curated entry point introducing a documentation area or guiding readers by intent.',
  },
  overview: {
    label: 'Overview',
    description: 'A high-level orientation or architectural summary introducing a section.',
  },
  utility: {
    label: 'Utility',
    description: 'A supporting functional page such as an interactive assistant or site information page.',
  },
} as const;

export interface DimensionTaxonomy<T extends string> {
  description: string;
  values: readonly T[];
  items: Record<T, ClassificationMetadata>;
}

export interface ApiTaxonomy {
  contentType: DimensionTaxonomy<ContentType>;
  pageType: DimensionTaxonomy<PageType>;
}

export const API_TAXONOMY: ApiTaxonomy = {
  contentType: {
    description: 'Primary information type and reader intent of substantive documentation.',
    values: CONTENT_TYPES,
    items: CONTENT_TYPE_METADATA,
  },
  pageType: {
    description: 'Structural role of the page within the documentation site.',
    values: PAGE_TYPES,
    items: PAGE_TYPE_METADATA,
  },
} as const;

export const ALLOWED_DOCUMENT_FIELDS = [
  'title',
  'description',
  'url',
  'markdown',
  'locale',
  'pageType',
  'contentType',
  'wordCount',
  'headings',
  'keywords',
  'tags',
  'lastUpdated',
] as const;
export type DocumentField = (typeof ALLOWED_DOCUMENT_FIELDS)[number];

export const DOCUMENT_PROPERTY_SCHEMA = {
  title: {
    type: 'string',
    description: 'Document title',
  },
  description: {
    type: 'string',
    description: 'Concise summary or abstract of the document',
  },
  url: {
    type: 'string',
    description: 'Canonical HTML URL and stable document identifier',
  },
  markdown: {
    type: 'string',
    description: 'Direct URL to the clean, pre-rendered Markdown representation',
  },
  locale: {
    type: 'string',
    enum: ['en', 'fr'],
    description: 'Document language code (en or fr)',
  },
  pageType: {
    type: 'string',
    enum: PAGE_TYPES,
    description: 'Structural role of the page within the documentation site',
  },
  contentType: {
    type: ['string', 'null'],
    enum: [...CONTENT_TYPES, null],
    description: 'Primary information type for topics, or null for intentionally untyped pages',
  },
  wordCount: {
    type: 'integer',
    description: 'Approximate readable word count excluding markup',
  },
  headings: {
    type: 'array',
    description: 'List of document section headings with level, text, and slug',
    items: {
      type: 'object',
      properties: {
        level: { type: 'integer' },
        text: { type: 'string' },
        slug: { type: 'string' },
      },
    },
  },
  keywords: {
    type: 'array',
    items: { type: 'string' },
    description: 'Keywords associated with the document',
  },
  tags: {
    type: 'array',
    items: { type: 'string' },
    description: 'Taxonomy tags associated with the document',
  },
  lastUpdated: {
    type: 'string',
    description: 'ISO 8601 date string of last modification (YYYY-MM-DD)',
  },
} as const;

export const API_QUERY_PARAMETERS = {
  contentType: {
    type: 'string',
    description: 'Filter by canonical information type (concept, task, reference)',
    allowed: CONTENT_TYPES,
  },
  pageType: {
    type: 'string',
    description: 'Filter by structural page role (topic, index, landing, overview, utility)',
    allowed: PAGE_TYPES,
  },
  lang: {
    type: 'string',
    description: 'Filter by language code (en, fr) on global index',
    allowed: ['en', 'fr'] as const,
  },
  fields: {
    type: 'string',
    description: 'Comma-separated list of document fields to project in the response',
    allowed: ALLOWED_DOCUMENT_FIELDS,
    example: 'title,url,markdown,contentType',
  },
  page: {
    type: 'integer',
    description: '1-based page number for paginated results (default: 1)',
    minimum: 1,
  },
  limit: {
    type: 'integer',
    description: 'Number of documents per page (default: 20, maximum: 100)',
    minimum: 1,
    maximum: 100,
  },
} as const;

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
