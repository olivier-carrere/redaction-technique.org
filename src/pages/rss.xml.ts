import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("blog", ({ data }) => {
    return !data.draft && data.publishDate < new Date();
  });

  posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  const siteUrl = context.site?.toString().replace(/\/$/, "") ?? "https://redaction-technique.org";

  const escapeXml = (unsafe: string) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const itemsXml = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(post.data.snippet)}</description>
      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
      <category>${escapeXml(post.data.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Markup and Meaning</title>
    <description>Articles on docs-as-code, structured authoring, DITA XML, Markdown, YAML, and AI-assisted documentation by Olivier Carrère.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
