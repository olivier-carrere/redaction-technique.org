import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  toDocumentResource,
  handleIndexQueryResponse,
} from '../../lib/document-resource';
import { SITE_URL } from '../../lib/page-markdown';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const docs = await getCollection('docs', ({ data }) => !data.draft);
  const resources = docs.map((doc) => toDocumentResource(doc, SITE_URL));
  return handleIndexQueryResponse(resources, url.searchParams, {
    siteUrl: SITE_URL,
    locale: 'fr',
  });
};
