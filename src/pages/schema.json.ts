import type { APIRoute } from 'astro';
import {
  API_TAXONOMY,
  CONTENT_TYPES,
  PAGE_TYPES,
} from '../lib/content-types';
import { SITE_URL } from '../lib/page-markdown';

export const prerender = true;

export const GET: APIRoute = async () => {
  const body = JSON.stringify(
    {
      version: '1.0',
      site: SITE_URL,
      description:
        'Canonical page classification and information typing taxonomy for docs.redaction-technique.org',
      taxonomy: API_TAXONOMY,
      filters: {
        contentType: [...CONTENT_TYPES],
        pageType: [...PAGE_TYPES],
      },
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
