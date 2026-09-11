import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  toDocumentResource,
  generateLlmsFullTxt,
} from '../lib/document-resource';
import { getPageMarkdown, SITE_URL } from '../lib/page-markdown';

export const prerender = true;

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs', ({ data }) => !data.draft);
  const docsWithMarkdown = docs.map((doc) => ({
    resource: toDocumentResource(doc, SITE_URL),
    markdown: getPageMarkdown(doc, SITE_URL),
  }));

  const body = generateLlmsFullTxt(docsWithMarkdown, undefined, SITE_URL);

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
