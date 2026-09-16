import {
  getPageMarkdown,
  getCanonicalUrl,
  getMarkdownUrl,
  SITE_URL,
  type DocPage,
} from './page-markdown.ts';
import {
  CONTENT_TYPES,
  PAGE_TYPES,
  type ContentType,
  type PageType,
  isTypedTopic,
  API_TAXONOMY,
  CONTENT_TYPE_METADATA,
  PAGE_TYPE_METADATA,
  type ClassificationMetadata,
  type DimensionTaxonomy,
  type ApiTaxonomy,
  ALLOWED_DOCUMENT_FIELDS,
  type DocumentField,
  DOCUMENT_PROPERTY_SCHEMA,
  API_QUERY_PARAMETERS,
} from './content-types.ts';

export {
  CONTENT_TYPES,
  PAGE_TYPES,
  type ContentType,
  type PageType,
  API_TAXONOMY,
  CONTENT_TYPE_METADATA,
  PAGE_TYPE_METADATA,
  type ClassificationMetadata,
  type DimensionTaxonomy,
  type ApiTaxonomy,
  ALLOWED_DOCUMENT_FIELDS,
  type DocumentField,
  DOCUMENT_PROPERTY_SCHEMA,
  API_QUERY_PARAMETERS,
};

export interface DocumentHeading {
  level: number;
  text: string;
  slug?: string;
}

export interface DocumentResource {
  locale: 'en' | 'fr';
  slug: string;
  url: string;
  markdownUrl: string;
  title: string;
  description?: string;
  headings?: DocumentHeading[];
  keywords?: string[];
  tags?: string[];
  dateCreated?: string;
  lastUpdated?: string;
  wordCount?: number;
  sourcePath?: string;
  section?: string;
  order?: number;
  pageType: PageType;
  contentType: ContentType | null;
}

export const SECTION_METADATA = {
  en: {
    home: { title: 'Home', order: 1 },
    'about-this-blog': { title: 'About this blog', order: 2 },
    'tech-writing-process': { title: 'Technical writing: An industrial process', order: 3 },
    tutorials: { title: 'Tutorials', order: 4 },
    formats: { title: 'Structured DITA XML format', order: 5 },
    costs: { title: 'Reduce costs, increase customer satisfaction', order: 6 },
    ask: { title: 'Ask the documentation', order: 7 },
    general: { title: 'General & Other', order: 8 },
  },
  fr: {
    home: { title: 'Accueil', order: 1 },
    'about-this-blog': { title: 'À propos de ce blog', order: 2 },
    'tech-writing-process': { title: 'Rédaction technique : un processus industriel', order: 3 },
    tutorials: { title: 'Didacticiels', order: 4 },
    formats: { title: 'Format structuré DITA XML', order: 5 },
    costs: { title: 'Diminuer les coûts, augmenter la satisfaction client', order: 6 },
    ask: { title: 'Interroger la documentation', order: 7 },
    general: { title: 'Général & Autre', order: 8 },
  },
} as const;

/**
 * Process order for tech-writing-process articles matching astro.config.mjs sidebar.
 */
const TECH_WRITING_PROCESS_ORDER = [
  'project-definition',
  'gathering-information',
  'testing-products',
  'source-format',
  'target-format',
  'content-creation',
  'integrating-documentation-into-development',
  'version-control-systems',
  'git-from-file-to-content',
  'using-branches',
  'repository',
  'single-repository',
  'which-repository-for-group-work',
  'shared-network-directories',
  'sql-database',
  'cms-workflow-and-reliability',
  'validation-quality-control',
  'translation',
  'delivery',
];

/**
 * Extracts markdown headings (##, ###, etc.) excluding fenced code blocks.
 */
export function extractHeadings(body: string): DocumentHeading[] {
  if (!body) return [];
  // Strip code blocks first so comments inside code (# comment) are ignored
  const withoutFences = body.replace(/(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2(?=\n|$)/g, '\n');
  const headings: DocumentHeading[] = [];
  const lines = withoutFences.split('\n');

  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+)$/);
    if (m) {
      const level = m[1].length;
      const rawText = m[2].trim();
      const cleanText = rawText
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[*_~]/g, '')
        .trim();
      if (!cleanText) continue;
      const slug = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
      headings.push({ level, text: cleanText, slug });
    }
  }
  return headings;
}

/**
 * Computes readable word count from documentation body.
 */
export function computeWordCount(body: string): number {
  if (!body) return 0;
  let text = body.replace(/^---[\s\S]*?---\s*/m, '');
  text = text.replace(/(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2(?=\n|$)/g, ' ');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/^import\s+.*$/gm, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}


/**
 * Derives the section key and sort weight from a doc id or url.
 */
export function getDocSectionAndOrder(idOrUrl: string): { section: string; order: number } {
  const clean = idOrUrl
    .replace(/^https?:\/\/[^/]+\//, '')
    .replace(/^\/+|\/+$/g, '');
  const parts = clean.split('/');

  let section = 'general';
  let order = 100;

  if (clean === 'en' || clean === 'fr') {
    section = 'home';
    order = 1;
  } else if (parts.length === 2 && parts[1] === 'about-this-blog') {
    section = 'about-this-blog';
    order = 2;
  } else if (parts.length === 2 && parts[1] === 'ask') {
    section = 'ask';
    order = 99;
  } else if (parts.length >= 2) {
    section = parts[1];
    if (section === 'tech-writing-process') {
      const pageSlug = parts[2] || '';
      const idx = TECH_WRITING_PROCESS_ORDER.indexOf(pageSlug);
      order = idx !== -1 ? 10 + idx : 50;
    } else {
      order = 100;
    }
  }

  return { section, order };
}

/**
 * Normalizes an Astro collection document into a canonical DocumentResource.
 */
export function toDocumentResource(
  doc: {
    id: string;
    data: {
      title?: string;
      description?: string;
      tags?: string[];
      lastUpdated?: Date | string;
      draft?: boolean;
      contentType?: string;
      pageType?: string;
      template?: string;
      [key: string]: any;
    };
    body?: string;
    filePath?: string;
  },
  siteUrl: string = SITE_URL
): DocumentResource {
  const locale: 'en' | 'fr' = doc.id.startsWith('fr') ? 'fr' : 'en';
  const url = getCanonicalUrl(doc.id, siteUrl);
  const markdownUrl = `${siteUrl.replace(/\/+$/, '')}${getMarkdownUrl(doc.id)}`;
  const title = doc.data?.title || doc.id;
  const description = doc.data?.description || undefined;
  const tags = Array.isArray(doc.data?.tags) && doc.data.tags.length > 0 ? doc.data.tags : undefined;

  let lastUpdated: string | undefined = undefined;
  if (doc.data?.lastUpdated instanceof Date) {
    lastUpdated = doc.data.lastUpdated.toISOString().slice(0, 10);
  } else if (typeof doc.data?.lastUpdated === 'string') {
    lastUpdated = doc.data.lastUpdated.slice(0, 10);
  }

  // Derive section and sort weight
  const { section, order } = getDocSectionAndOrder(doc.id);

  const typed = isTypedTopic(doc.data, doc.filePath || doc.id);
  let pageType: PageType;
  if (doc.data?.pageType && (PAGE_TYPES as readonly string[]).includes(doc.data.pageType)) {
    pageType = doc.data.pageType as PageType;
  } else if (typed) {
    pageType = 'topic';
  } else if (doc.data?.template === 'splash' || doc.id === 'en' || doc.id === 'fr') {
    pageType = 'landing';
  } else if (doc.id.endsWith('/index')) {
    pageType = 'index';
  } else {
    pageType = 'overview';
  }

  const contentType: ContentType | null =
    pageType === 'topic' && doc.data?.contentType && (CONTENT_TYPES as readonly string[]).includes(doc.data.contentType)
      ? (doc.data.contentType as ContentType)
      : null;

  const headings = doc.body ? extractHeadings(doc.body) : [];
  const wordCount = doc.body ? computeWordCount(doc.body) : undefined;
  const sourcePath = doc.filePath || `src/content/docs/${doc.id}.mdx`;

  return {
    locale,
    slug: doc.id,
    url,
    markdownUrl,
    title,
    pageType,
    contentType,
    ...(description ? { description } : {}),
    ...(headings.length > 0 ? { headings } : {}),
    ...(tags ? { tags } : {}),
    ...(lastUpdated ? { lastUpdated } : {}),
    ...(wordCount !== undefined ? { wordCount } : {}),
    sourcePath,
    section,
    order,
  };
}

/**
 * Sorts documents in a logical, stable reading order:
 * 1. Locale (en then fr, or single locale)
 * 2. Section hierarchy order (home -> about -> tech-writing-process -> tutorials -> formats -> costs -> ask -> general)
 * 3. Within section: specific order (e.g. tech-writing workflow), index pages first, then alphabetical by title.
 */
export function sortDocuments(docs: DocumentResource[]): DocumentResource[] {
  return [...docs].sort((a, b) => {
    // 1. Locale
    if (a.locale !== b.locale) {
      return a.locale.localeCompare(b.locale);
    }

    const secMetaA = a.section ? { section: a.section, order: a.order ?? 100 } : getDocSectionAndOrder(a.slug || a.url);
    const secMetaB = b.section ? { section: b.section, order: b.order ?? 100 } : getDocSectionAndOrder(b.slug || b.url);

    // 2. Section order
    const metaA = SECTION_METADATA[a.locale]?.[secMetaA.section as keyof typeof SECTION_METADATA['en']]?.order ?? 99;
    const metaB = SECTION_METADATA[b.locale]?.[secMetaB.section as keyof typeof SECTION_METADATA['en']]?.order ?? 99;
    if (metaA !== metaB) {
      return metaA - metaB;
    }

    // 3. Item order within section
    if (secMetaA.order !== secMetaB.order) {
      return secMetaA.order - secMetaB.order;
    }

    // 4. Alphabetical by title
    return a.title.localeCompare(b.title, a.locale);
  });
}

/**
 * Formats a single document resource into the exact JSON shape required by the API specification.
 */
export function toDocumentJsonEntry(res: DocumentResource) {
  const entry: Record<string, any> = {
    title: res.title,
    ...(res.description ? { description: res.description } : {}),
    url: res.url,
    markdown: res.markdownUrl,
    locale: res.locale,
    pageType: res.pageType,
    contentType: res.contentType,
    ...(res.wordCount !== undefined ? { wordCount: res.wordCount } : {}),
    headings: res.headings ?? [],
    keywords: res.tags ?? [],
    tags: res.tags ?? [],
  };
  if (res.lastUpdated) {
    entry.lastUpdated = res.lastUpdated;
  }
  return entry;
}

/**
 * Generates the machine-readable JSON index for a single language (/en/index.json, /fr/index.json).
 */
export function generateLocaleIndexJson(
  docs: DocumentResource[],
  locale: 'en' | 'fr',
  siteUrl: string = SITE_URL
) {
  const filtered = sortDocuments(docs.filter((d) => d.locale === locale));
  return {
    version: '1.0',
    site: siteUrl,
    locale,
    count: filtered.length,
    filters: {
      contentType: [...CONTENT_TYPES],
      pageType: [...PAGE_TYPES],
    },
    taxonomy: API_TAXONOMY,
    documents: filtered.map(toDocumentJsonEntry),
  };
}

/**
 * Generates the global machine-readable JSON index (/index.json).
 */
export function generateGlobalIndexJson(
  docs: DocumentResource[],
  siteUrl: string = SITE_URL
) {
  const sorted = sortDocuments(docs);
  const enDocs = sorted.filter((d) => d.locale === 'en');
  const frDocs = sorted.filter((d) => d.locale === 'fr');

  return {
    version: '1.0',
    site: siteUrl,
    locales: ['en', 'fr'],
    endpoints: {
      en: {
        index: `${siteUrl}/en/index.json`,
        sitemap: `${siteUrl}/en/sitemap.md`,
        llmsFull: `${siteUrl}/en/llms-full.txt`,
      },
      fr: {
        index: `${siteUrl}/fr/index.json`,
        sitemap: `${siteUrl}/fr/sitemap.md`,
        llmsFull: `${siteUrl}/fr/llms-full.txt`,
      },
      global: {
        index: `${siteUrl}/index.json`,
        sitemap: `${siteUrl}/sitemap.md`,
        llms: `${siteUrl}/llms.txt`,
        llmsFull: `${siteUrl}/llms-full.txt`,
        schema: `${siteUrl}/schema.json`,
      },
    },
    count: sorted.length,
    counts: {
      en: enDocs.length,
      fr: frDocs.length,
    },
    filters: {
      contentType: [...CONTENT_TYPES],
      pageType: [...PAGE_TYPES],
    },
    taxonomy: API_TAXONOMY,
    documents: sorted.map(toDocumentJsonEntry),
  };
}

export interface QueryResultSuccess {
  status: 200;
  body: Record<string, any>;
}

export interface QueryResultError {
  status: 400;
  body: {
    error: string;
    allowed?: readonly string[];
  };
}

export type QueryResult = QueryResultSuccess | QueryResultError;

/**
 * Projects only requested fields on a document JSON entry.
 * If fields is null, all document fields are preserved.
 */
export function projectDocumentEntry(
  entry: Record<string, any>,
  fields: Set<DocumentField> | null
): Record<string, any> {
  if (!fields) return entry;
  const projected: Record<string, any> = {};
  for (const key of Object.keys(entry)) {
    if (fields.has(key as DocumentField)) {
      projected[key] = entry[key];
    }
  }
  return projected;
}

/**
 * Filters, paginates, projects fields, and validates documentation resources
 * according to query parameters.
 * Supports:
 * - ?contentType=... (canonical information type)
 * - ?pageType=... (structural page role)
 * - ?lang=... (language isolation)
 * - ?fields=... (comma-separated field selection)
 * - ?page=... & ?limit=... (opt-in deterministic pagination)
 * Returns HTTP 400 for invalid parameter values or out-of-bounds pages.
 */
export function handleIndexQuery(
  resources: DocumentResource[],
  searchParams?: URLSearchParams | Record<string, string> | string,
  options?: {
    locale?: 'en' | 'fr';
    siteUrl?: string;
  }
): QueryResult {
  const siteUrl = options?.siteUrl || SITE_URL;
  const scopeLocale = options?.locale;

  let params: URLSearchParams;
  if (!searchParams) {
    params = new URLSearchParams();
  } else if (searchParams instanceof URLSearchParams) {
    params = searchParams;
  } else if (typeof searchParams === 'string') {
    params = new URLSearchParams(searchParams.startsWith('?') ? searchParams.slice(1) : searchParams);
  } else {
    params = new URLSearchParams(searchParams);
  }

  // 1. Validate contentType
  const rawContentType = params.get('contentType');
  if (rawContentType !== null) {
    if (!(CONTENT_TYPES as readonly string[]).includes(rawContentType)) {
      return {
        status: 400,
        body: {
          error: 'Invalid contentType',
          allowed: [...CONTENT_TYPES],
        },
      };
    }
  }

  // 2. Validate pageType
  const rawPageType = params.get('pageType');
  if (rawPageType !== null) {
    if (!(PAGE_TYPES as readonly string[]).includes(rawPageType)) {
      return {
        status: 400,
        body: {
          error: 'Invalid pageType',
          allowed: [...PAGE_TYPES],
        },
      };
    }
  }

  // 3. Validate lang
  const rawLang = params.get('lang');
  if (rawLang !== null) {
    if (scopeLocale) {
      if (rawLang !== scopeLocale) {
        return {
          status: 400,
          body: {
            error: `Invalid lang for ${scopeLocale.toUpperCase()} endpoint`,
            allowed: [scopeLocale],
          },
        };
      }
    } else if (!['en', 'fr'].includes(rawLang)) {
      return {
        status: 400,
        body: {
          error: 'Invalid lang',
          allowed: ['en', 'fr'],
        },
      };
    }
  }

  // 4. Validate fields parameter (comma-separated list of ALLOWED_DOCUMENT_FIELDS)
  const rawFields = params.get('fields');
  let selectedFields: Set<DocumentField> | null = null;
  if (rawFields !== null) {
    const fieldTokens = rawFields
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);
    if (fieldTokens.length === 0) {
      return {
        status: 400,
        body: {
          error: 'Invalid fields parameter: must specify at least one field',
          allowed: [...ALLOWED_DOCUMENT_FIELDS],
        },
      };
    }
    for (const token of fieldTokens) {
      if (!(ALLOWED_DOCUMENT_FIELDS as readonly string[]).includes(token)) {
        return {
          status: 400,
          body: {
            error: `Invalid field: "${token}"`,
            allowed: [...ALLOWED_DOCUMENT_FIELDS],
          },
        };
      }
    }
    selectedFields = new Set(fieldTokens as DocumentField[]);
  }

  // 5. Validate pagination parameters (page, limit)
  const rawPage = params.get('page');
  const rawLimit = params.get('limit');
  const isPaginated = rawPage !== null || rawLimit !== null;

  let page = 1;
  let limit = 20;

  if (rawPage !== null) {
    const parsedPage = Number(rawPage);
    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return {
        status: 400,
        body: {
          error: 'Invalid page parameter: must be a positive integer (>= 1)',
        },
      };
    }
    page = parsedPage;
  }

  if (rawLimit !== null) {
    const parsedLimit = Number(rawLimit);
    if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
      return {
        status: 400,
        body: {
          error: 'Invalid limit parameter: must be an integer between 1 and 100',
        },
      };
    }
    limit = parsedLimit;
  }

  // Filter documents (AND operation across all specified filters)
  let targetDocs = resources;
  if (scopeLocale) {
    targetDocs = targetDocs.filter((d) => d.locale === scopeLocale);
  } else if (rawLang) {
    targetDocs = targetDocs.filter((d) => d.locale === rawLang);
  }

  if (rawPageType) {
    targetDocs = targetDocs.filter((d) => d.pageType === rawPageType);
  }

  if (rawContentType) {
    targetDocs = targetDocs.filter((d) => d.contentType === rawContentType);
  }

  const sorted = sortDocuments(targetDocs);
  const total = sorted.length;

  let pageDocs = sorted;
  let totalPages = 1;

  if (isPaginated) {
    totalPages = total > 0 ? Math.ceil(total / limit) : 1;
    if (page > totalPages) {
      return {
        status: 400,
        body: {
          error: `Page ${page} out of bounds (totalPages: ${totalPages})`,
        },
      };
    }
    const startIndex = (page - 1) * limit;
    pageDocs = sorted.slice(startIndex, startIndex + limit);
  }

  const projectedDocs = pageDocs.map((d) =>
    projectDocumentEntry(toDocumentJsonEntry(d), selectedFields)
  );

  if (scopeLocale) {
    return {
      status: 200,
      body: {
        version: '1.0',
        site: siteUrl,
        locale: scopeLocale,
        count: isPaginated ? pageDocs.length : sorted.length,
        ...(isPaginated ? { pagination: { page, limit, total, totalPages } } : {}),
        filters: {
          contentType: [...CONTENT_TYPES],
          pageType: [...PAGE_TYPES],
        },
        taxonomy: API_TAXONOMY,
        documents: projectedDocs,
      },
    };
  }

  const enDocs = sorted.filter((d) => d.locale === 'en');
  const frDocs = sorted.filter((d) => d.locale === 'fr');

  return {
    status: 200,
    body: {
      version: '1.0',
      site: siteUrl,
      locales: ['en', 'fr'],
      endpoints: {
        en: {
          index: `${siteUrl}/en/index.json`,
          sitemap: `${siteUrl}/en/sitemap.md`,
          llmsFull: `${siteUrl}/en/llms-full.txt`,
        },
        fr: {
          index: `${siteUrl}/fr/index.json`,
          sitemap: `${siteUrl}/fr/sitemap.md`,
          llmsFull: `${siteUrl}/fr/llms-full.txt`,
        },
        global: {
          index: `${siteUrl}/index.json`,
          sitemap: `${siteUrl}/sitemap.md`,
          llms: `${siteUrl}/llms.txt`,
          llmsFull: `${siteUrl}/llms-full.txt`,
          schema: `${siteUrl}/schema.json`,
        },
      },
      count: isPaginated ? pageDocs.length : sorted.length,
      counts: {
        en: enDocs.length,
        fr: frDocs.length,
      },
      ...(isPaginated ? { pagination: { page, limit, total, totalPages } } : {}),
      filters: {
        contentType: [...CONTENT_TYPES],
        pageType: [...PAGE_TYPES],
      },
      taxonomy: API_TAXONOMY,
      documents: projectedDocs,
    },
  };
}

/**
 * Handles API route requests returning standard Web Response objects.
 */
export function handleIndexQueryResponse(
  resources: DocumentResource[],
  searchParams?: URLSearchParams | Record<string, string> | string,
  options?: {
    locale?: 'en' | 'fr';
    siteUrl?: string;
  }
): Response {
  const result = handleIndexQuery(resources, searchParams, options);
  return new Response(JSON.stringify(result.body, null, 2), {
    status: result.status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Access-Control-Allow-Origin': '*',
      ...(result.status === 200
        ? { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
        : { 'Cache-Control': 'no-store' }),
    },
  });
}

/**
 * Groups documents by section in standard order.
 */
export function groupDocumentsBySection(
  docs: DocumentResource[],
  locale: 'en' | 'fr'
): { sectionKey: string; title: string; documents: DocumentResource[] }[] {
  const sorted = sortDocuments(docs.filter((d) => d.locale === locale));
  const groups = new Map<string, DocumentResource[]>();

  for (const doc of sorted) {
    const sec = doc.section || 'general';
    if (!groups.has(sec)) groups.set(sec, []);
    groups.get(sec)!.push(doc);
  }

  const result: { sectionKey: string; title: string; documents: DocumentResource[] }[] = [];
  const sectionMeta = SECTION_METADATA[locale];

  // Output sections in defined order
  const definedKeys = Object.keys(sectionMeta) as (keyof typeof sectionMeta)[];
  for (const key of definedKeys) {
    if (groups.has(key)) {
      result.push({
        sectionKey: key,
        title: sectionMeta[key].title,
        documents: groups.get(key)!,
      });
      groups.delete(key);
    }
  }

  // Any remaining sections
  for (const [key, items] of groups.entries()) {
    result.push({
      sectionKey: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      documents: items,
    });
  }

  return result;
}

/**
 * Generates the language-specific Markdown sitemap (/en/sitemap.md, /fr/sitemap.md).
 */
export function generateSitemapMarkdown(
  docs: DocumentResource[],
  locale: 'en' | 'fr',
  siteUrl: string = SITE_URL
): string {
  const isFr = locale === 'fr';
  const siteClean = siteUrl.replace(/\/+$/, '');
  const groups = groupDocumentsBySection(docs, locale);

  let out = '';
  if (isFr) {
    out += `# Plan du site documentaire — Français\n\n`;
    out += `Plan complet de la documentation technique en français sur [Redaction-technique.org](${siteClean}/fr/).\n\n`;
    out += `- Index machine-readable (JSON) : [${siteClean}/fr/index.json](${siteClean}/fr/index.json)\n`;
    out += `- Texte complet du corpus : [${siteClean}/fr/llms-full.txt](${siteClean}/fr/llms-full.txt)\n`;
    out += `- Table des matières globale (llms.txt) : [${siteClean}/llms.txt](${siteClean}/llms.txt)\n\n`;
  } else {
    out += `# Documentation Sitemap — English\n\n`;
    out += `Complete sitemap of English technical documentation on [Redaction-technique.org](${siteClean}/en/).\n\n`;
    out += `- Machine-readable index (JSON): [${siteClean}/en/index.json](${siteClean}/en/index.json)\n`;
    out += `- Full corpus text: [${siteClean}/en/llms-full.txt](${siteClean}/en/llms-full.txt)\n`;
    out += `- Global table of contents (llms.txt): [${siteClean}/llms.txt](${siteClean}/llms.txt)\n\n`;
  }

  for (const group of groups) {
    out += `## ${group.title}\n\n`;
    for (const doc of group.documents) {
      out += `- [${doc.title}](${doc.url})\n`;
      out += `  Markdown: [${doc.markdownUrl}](${doc.markdownUrl})\n`;
      if (doc.description) {
        out += `  Description: ${doc.description}\n`;
      }
      out += `\n`;
    }
  }

  out += `---\n\nSource: ${siteClean}/${locale}/sitemap.md\n`;
  return out;
}

/**
 * Generates the global Markdown sitemap (/sitemap.md).
 */
export function generateGlobalSitemapMarkdown(
  docs: DocumentResource[],
  siteUrl: string = SITE_URL
): string {
  const siteClean = siteUrl.replace(/\/+$/, '');
  const enCount = docs.filter((d) => d.locale === 'en').length;
  const frCount = docs.filter((d) => d.locale === 'fr').length;

  return `# Documentation Sitemap — Redaction-technique.org

Technical documentation on DITA XML, Docs-as-Code, technical writing workflows, and content automation by Olivier Carrère.

Documentation is available in two isolated languages (${enCount} English documents, ${frCount} French documents):

## English Documentation

- Documentation Sitemap: [${siteClean}/en/sitemap.md](${siteClean}/en/sitemap.md)
- Machine-readable Index (JSON): [${siteClean}/en/index.json](${siteClean}/en/index.json)
- Full Corpus (Markdown): [${siteClean}/en/llms-full.txt](${siteClean}/en/llms-full.txt)
- Homepage: [${siteClean}/en/](${siteClean}/en/)

## Documentation en français

- Plan du site documentaire : [${siteClean}/fr/sitemap.md](${siteClean}/fr/sitemap.md)
- Index machine-readable (JSON) : [${siteClean}/fr/index.json](${siteClean}/fr/index.json)
- Texte complet du corpus (Markdown) : [${siteClean}/fr/llms-full.txt](${siteClean}/fr/llms-full.txt)
- Accueil : [${siteClean}/fr/](${siteClean}/fr/)

## Global AI & LLM Endpoints

- Concise LLM Table of Contents: [${siteClean}/llms.txt](${siteClean}/llms.txt)
- Complete Bilingual Corpus: [${siteClean}/llms-full.txt](${siteClean}/llms-full.txt)
- Global Machine-Readable Index: [${siteClean}/index.json](${siteClean}/index.json)

---

Source: ${siteClean}/sitemap.md
`;
}

/**
 * Generates the concise /llms.txt following https://llmstxt.org/ specification.
 */
export function generateLlmsTxt(
  docs: DocumentResource[],
  siteUrl: string = SITE_URL
): string {
  const siteClean = siteUrl.replace(/\/+$/, '');
  const enGroups = groupDocumentsBySection(docs, 'en');
  const frGroups = groupDocumentsBySection(docs, 'fr');

  let out = `# Redaction-technique.org Documentation

> Technical documentation on DITA XML, Docs-as-Code, modular authoring, technical writing workflows, and content automation by Olivier Carrère.

## APIs and Discovery

- [English Documentation Sitemap](${siteClean}/en/sitemap.md): Complete list of English docs with HTML and Markdown links
- [English Machine-Readable Index](${siteClean}/en/index.json): Structured JSON metadata for all English documents
- [English Full Corpus](${siteClean}/en/llms-full.txt): Consolidated Markdown text of all English documentation
- [French Documentation Sitemap](${siteClean}/fr/sitemap.md): Plan complet de la documentation en français
- [French Machine-Readable Index](${siteClean}/fr/index.json): Index structuré JSON des documents français
- [French Full Corpus](${siteClean}/fr/llms-full.txt): Texte complet Markdown de toute la documentation en français
- [Complete Bilingual Corpus](${siteClean}/llms-full.txt): Consolidated Markdown of all documentation (EN & FR)
- [Global JSON Index](${siteClean}/index.json): Complete machine-readable index across all languages

## English Documentation
`;

  for (const group of enGroups) {
    out += `\n### ${group.title}\n\n`;
    for (const doc of group.documents) {
      const desc = doc.description ? `: ${doc.description}` : '';
      out += `- [${doc.title}](${doc.url})${desc}\n`;
    }
  }

  out += `\n## Documentation en français\n`;

  for (const group of frGroups) {
    out += `\n### ${group.title}\n\n`;
    for (const doc of group.documents) {
      const desc = doc.description ? `: ${doc.description}` : '';
      out += `- [${doc.title}](${doc.url})${desc}\n`;
    }
  }

  return out;
}

/**
 * Wrapper header marker format for documents in llms-full.txt.
 * Deliberately structured so extracting the document body yields the exact
 * output of getPageMarkdown() for byte-for-byte fidelity testing.
 */
export function formatFullDocSection(
  res: DocumentResource,
  markdownContent: string
): string {
  const content = markdownContent.endsWith('\n') ? markdownContent : `${markdownContent}\n`;
  return `---

## Document: ${res.title}

Source: ${res.url}
Markdown: ${res.markdownUrl}

${content}`;
}

/**
 * Generates consolidated Markdown corpus for LLMs (/llms-full.txt, /llms-full-en.txt, /llms-full-fr.txt).
 * Reuses EXACTLY the same getPageMarkdown() output for each document.
 */
export function generateLlmsFullTxt(
  docsWithMarkdown: { resource: DocumentResource; markdown: string }[],
  locale?: 'en' | 'fr',
  siteUrl: string = SITE_URL
): string {
  const siteClean = siteUrl.replace(/\/+$/, '');
  const filtered = locale
    ? docsWithMarkdown.filter((d) => d.resource.locale === locale)
    : docsWithMarkdown;

  // Stable sort
  const sorted = [...filtered].sort((a, b) => {
    const list = sortDocuments([a.resource, b.resource]);
    return list[0] === a.resource ? -1 : 1;
  });

  let out = '';
  if (locale === 'fr') {
    out += `# Redaction-technique.org — Corpus documentaire complet (Français)\n\n`;
    out += `> Documentation technique en français couvrant DITA XML, Docs-as-Code, les processus de rédaction technique et l'automatisation de contenu par Olivier Carrère.\n`;
    out += `> Source : ${siteClean}/fr/\n`;
    out += `> Plan du site : ${siteClean}/fr/sitemap.md\n`;
    out += `> Index JSON : ${siteClean}/fr/index.json\n`;
    out += `> Table des matières LLM : ${siteClean}/llms.txt\n\n`;
  } else if (locale === 'en') {
    out += `# Redaction-technique.org — Full Documentation Corpus (English)\n\n`;
    out += `> Technical documentation in English covering DITA XML, Docs-as-Code, technical writing workflows, and content automation by Olivier Carrère.\n`;
    out += `> Source: ${siteClean}/en/\n`;
    out += `> Sitemap: ${siteClean}/en/sitemap.md\n`;
    out += `> JSON Index: ${siteClean}/en/index.json\n`;
    out += `> LLM Table of Contents: ${siteClean}/llms.txt\n\n`;
  } else {
    out += `# Redaction-technique.org — Complete Documentation Corpus\n\n`;
    out += `> Complete bilingual documentation corpus covering DITA XML, Docs-as-Code, technical writing workflows, and content automation by Olivier Carrère.\n`;
    out += `> Source: ${siteClean}/\n`;
    out += `> Table of Contents: ${siteClean}/llms.txt\n`;
    out += `> Global JSON Index: ${siteClean}/index.json\n\n`;
  }

  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i];
    out += (i === 0 ? '' : '\n') + formatFullDocSection(item.resource, item.markdown);
  }

  return out;
}
