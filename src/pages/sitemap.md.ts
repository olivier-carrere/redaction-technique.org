import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  toDocumentResource,
  generateGlobalSitemapMarkdown,
} from '../lib/document-resource';
import { SITE_URL } from '../lib/page-markdown';

export const prerender = true;

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs', ({ data }) => !data.draft);
  const resources = docs.map((doc) => toDocumentResource(doc, SITE_URL));
  const body = generateGlobalSitemapMarkdown(resources, SITE_URL);

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
