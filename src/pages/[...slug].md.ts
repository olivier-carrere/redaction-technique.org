import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { getPageMarkdown, SITE_URL } from '../lib/page-markdown';

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs');
  const paths = [];

  for (const doc of docs) {
    paths.push({
      params: { slug: doc.id },
      props: { doc },
    });
    if (doc.id === 'en' || doc.id === 'fr') {
      paths.push({
        params: { slug: `${doc.id}/index` },
        props: { doc },
      });
    }
  }

  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { doc } = props;
  const markdown = getPageMarkdown(doc, SITE_URL);
  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
