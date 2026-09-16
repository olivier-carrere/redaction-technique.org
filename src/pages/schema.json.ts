import type { APIRoute } from 'astro';
import {
  API_TAXONOMY,
  CONTENT_TYPES,
  PAGE_TYPES,
  DOCUMENT_PROPERTY_SCHEMA,
  API_QUERY_PARAMETERS,
} from '../lib/content-types';
import { SITE_URL } from '../lib/page-markdown';

export const prerender = true;

export const GET: APIRoute = async () => {
  const body = JSON.stringify(
    {
      version: '1.0',
      site: SITE_URL,
      description:
        'API capability contract, document resource schema, and classification taxonomy for docs.redaction-technique.org',
      endpoints: {
        global: {
          index: `${SITE_URL}/index.json`,
          schema: `${SITE_URL}/schema.json`,
          sitemap: `${SITE_URL}/sitemap.md`,
          llms: `${SITE_URL}/llms.txt`,
          llmsFull: `${SITE_URL}/llms-full.txt`,
        },
        en: {
          index: `${SITE_URL}/en/index.json`,
          sitemap: `${SITE_URL}/en/sitemap.md`,
          llmsFull: `${SITE_URL}/en/llms-full.txt`,
        },
        fr: {
          index: `${SITE_URL}/fr/index.json`,
          sitemap: `${SITE_URL}/fr/sitemap.md`,
          llmsFull: `${SITE_URL}/fr/llms-full.txt`,
        },
      },
      retrieval: {
        identifier: 'url',
        description:
          'The canonical URL (url) serves as the unique, deterministic, and build-stable identifier for every document. Each indexed document advertises its corresponding clean Markdown mirror via the markdown property.',
        representations: {
          html: 'Canonical HTML documentation page (served at url)',
          markdown: 'Clean, pre-rendered Markdown representation without chrome or navigation (served at markdown)',
        },
      },
      filters: {
        contentType: [...CONTENT_TYPES],
        pageType: [...PAGE_TYPES],
        lang: ['en', 'fr'],
      },
      queryParameters: API_QUERY_PARAMETERS,
      document: {
        type: 'object',
        description: 'Canonical DocumentResource representation in JSON indexes',
        properties: DOCUMENT_PROPERTY_SCHEMA,
        required: ['title', 'url', 'markdown', 'locale', 'pageType'],
      },
      taxonomy: API_TAXONOMY,
    },
    null,
    2
  );

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
