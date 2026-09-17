import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  CONTENT_TYPES,
  PAGE_TYPES,
  CONTENT_TYPE_METADATA,
  PAGE_TYPE_METADATA,
  API_TAXONOMY,
  ALLOWED_DOCUMENT_FIELDS,
  DOCUMENT_PROPERTY_SCHEMA,
  API_QUERY_PARAMETERS,
} from '../src/lib/content-types.ts';
import { handleIndexQuery } from '../src/lib/document-resource.ts';
import { startAstroDevServer } from './helpers/astro-server.mjs';

const DIST = join(process.cwd(), 'dist', 'client');

// index.json, en/index.json, and fr/index.json are rendered on demand
// (prerender = false — see src/pages/{,en/,fr/}index.json.ts) so their
// unfiltered baseline is no longer a static file in dist/client. Fetch it
// once from a real dev server and reuse it below, instead of re-reading a
// build artifact that no longer exists for these three routes.
const devServer = await startAstroDevServer();
const globalJson = await fetch(`${devServer.baseUrl}/index.json`).then((r) => r.json());
const enJson = await fetch(`${devServer.baseUrl}/en/index.json`).then((r) => r.json());
const frJson = await fetch(`${devServer.baseUrl}/fr/index.json`).then((r) => r.json());
const docs = globalJson.documents.map((d) => ({
  ...d,
  markdownUrl: d.markdown,
  slug: d.url.replace('https://docs.redaction-technique.org/', '').replace(/\/$/, ''),
}));

after(async () => {
  await devServer.stop();
});

test('API endpoints existence in dist/client', () => {
  const files = [
    'schema.json',
    'sitemap.md',
    'en/sitemap.md',
    'fr/sitemap.md',
    'llms.txt',
    'llms-full.txt',
    'llms-full-en.txt',
    'llms-full-fr.txt',
    'en/llms-full.txt',
    'fr/llms-full.txt',
  ];

  for (const file of files) {
    const fullPath = join(DIST, file);
    assert.ok(existsSync(fullPath), `Expected endpoint ${file} to exist`);
    const size = readFileSync(fullPath).length;
    assert.ok(size > 0, `Expected ${file} to be non-empty`);
  }

  // index.json, en/index.json, and fr/index.json are rendered on demand
  // (prerender = false), so they are intentionally NOT static build output.
  // Their "exists and non-empty" check goes through the live fixtures
  // fetched at the top of this file. The specific guarantee that they are
  // NOT static artifacts is asserted in tests/api-index-endpoint.test.mjs.
  for (const [label, json] of [
    ['index.json', globalJson],
    ['en/index.json', enJson],
    ['fr/index.json', frJson],
  ]) {
    assert.ok(
      json && Array.isArray(json.documents) && json.documents.length > 0,
      `Expected ${label} to be non-empty`
    );
  }
});

test('JSON index schema and document count', () => {
  // Global index checks
  assert.equal(globalJson.version, '1.0');
  assert.equal(globalJson.count, 148);
  assert.equal(globalJson.counts.en, 74);
  assert.equal(globalJson.counts.fr, 74);
  assert.equal(globalJson.documents.length, 148);

  // EN index checks
  assert.equal(enJson.version, '1.0');
  assert.equal(enJson.locale, 'en');
  assert.equal(enJson.count, 74);
  assert.equal(enJson.documents.length, 74);

  // FR index checks
  assert.equal(frJson.version, '1.0');
  assert.equal(frJson.locale, 'fr');
  assert.equal(frJson.count, 74);
  assert.equal(frJson.documents.length, 74);

  // Validate filter metadata exposing canonical classifications
  assert.deepEqual(globalJson.filters.contentType, [...CONTENT_TYPES]);
  assert.deepEqual(globalJson.filters.pageType, [...PAGE_TYPES]);
  assert.deepEqual(enJson.filters.contentType, [...CONTENT_TYPES]);
  assert.deepEqual(enJson.filters.pageType, [...PAGE_TYPES]);
  assert.deepEqual(frJson.filters.contentType, [...CONTENT_TYPES]);
  assert.deepEqual(frJson.filters.pageType, [...PAGE_TYPES]);

  // Validate self-describing taxonomy metadata
  assert.deepEqual(globalJson.taxonomy, API_TAXONOMY);
  assert.deepEqual(enJson.taxonomy, API_TAXONOMY);
  assert.deepEqual(frJson.taxonomy, API_TAXONOMY);

  // Validate global discovery endpoint registry includes schema.json
  assert.equal(globalJson.endpoints.global.schema, 'https://docs.redaction-technique.org/schema.json');

  // Validate document properties
  for (const doc of globalJson.documents) {
    assert.ok(doc.title, 'Document must have a title');
    assert.ok(doc.url.startsWith('https://docs.redaction-technique.org/'), `URL must be absolute: ${doc.url}`);
    assert.ok(doc.markdown.endsWith('.md'), `Markdown must point to .md endpoint: ${doc.markdown}`);
    assert.ok(['en', 'fr'].includes(doc.locale), `Locale must be en or fr: ${doc.locale}`);
    assert.ok(typeof doc.wordCount === 'number' && doc.wordCount >= 0, 'Document must have valid wordCount');
    assert.ok(Array.isArray(doc.headings), 'Headings must be an array');
    assert.ok(Array.isArray(doc.tags), 'Tags must be an array');
    assert.ok(PAGE_TYPES.includes(doc.pageType), `Document pageType must be valid: ${doc.pageType}`);
    if (doc.pageType === 'topic') {
      assert.ok(CONTENT_TYPES.includes(doc.contentType), `Topic contentType must be one of ${CONTENT_TYPES.join(', ')}: ${doc.contentType}`);
    } else {
      assert.equal(doc.contentType, null, `Intentionally untyped page must have explicit null contentType: ${doc.contentType}`);
    }
  }
});

test('Strict locale isolation in JSON indexes and sitemaps', () => {
  // No FR docs in EN index
  for (const doc of enJson.documents) {
    assert.equal(doc.locale, 'en');
    assert.ok(!doc.url.includes('/fr/'), `EN document URL must not contain /fr/: ${doc.url}`);
    assert.ok(!doc.markdown.includes('/fr/'), `EN document markdown must not contain /fr/: ${doc.markdown}`);
  }

  // No EN docs in FR index
  for (const doc of frJson.documents) {
    assert.equal(doc.locale, 'fr');
    assert.ok(!doc.url.includes('/en/'), `FR document URL must not contain /en/: ${doc.url}`);
    assert.ok(!doc.markdown.includes('/en/'), `FR document markdown must not contain /en/: ${doc.markdown}`);
  }

  // Sitemap isolation
  const enSitemap = readFileSync(join(DIST, 'en/sitemap.md'), 'utf-8');
  assert.ok(!enSitemap.includes('docs.redaction-technique.org/fr/'), 'en/sitemap.md must not contain FR URLs');

  const frSitemap = readFileSync(join(DIST, 'fr/sitemap.md'), 'utf-8');
  assert.ok(!frSitemap.includes('docs.redaction-technique.org/en/'), 'fr/sitemap.md must not contain EN URLs');
});

test('llms.txt format and structure', () => {
  const llms = readFileSync(join(DIST, 'llms.txt'), 'utf-8');
  assert.ok(llms.startsWith('# Redaction-technique.org Documentation'), 'llms.txt must have title');
  assert.ok(llms.includes('## APIs and Discovery'), 'Must expose discovery section');
  assert.ok(llms.includes('https://docs.redaction-technique.org/en/sitemap.md'), 'Must link to en/sitemap.md');
  assert.ok(llms.includes('https://docs.redaction-technique.org/fr/sitemap.md'), 'Must link to fr/sitemap.md');
  assert.ok(llms.includes('https://docs.redaction-technique.org/en/index.json'), 'Must link to en/index.json');
  assert.ok(llms.includes('https://docs.redaction-technique.org/fr/index.json'), 'Must link to fr/index.json');
  assert.ok(llms.includes('https://docs.redaction-technique.org/llms-full.txt'), 'Must link to llms-full.txt');
  assert.ok(llms.includes('## English Documentation'), 'Must contain English section');
  assert.ok(llms.includes('## Documentation en français'), 'Must contain French section');
});

test('Essential integrity test: llms-full.txt matches individual page.md byte-for-byte', () => {
  const corpora = [
    { file: 'llms-full.txt', expectedCount: 148 },
    { file: 'llms-full-en.txt', expectedCount: 74 },
    { file: 'llms-full-fr.txt', expectedCount: 74 },
    { file: 'en/llms-full.txt', expectedCount: 74 },
    { file: 'fr/llms-full.txt', expectedCount: 74 },
  ];

  for (const { file, expectedCount } of corpora) {
    const fullText = readFileSync(join(DIST, file), 'utf-8');
    const sections = fullText.split(/\n---\n\n## Document: /);
    assert.equal(sections.length - 1, expectedCount, `${file} must contain ${expectedCount} documents`);

    for (let i = 1; i < sections.length; i++) {
      const sec = sections[i];
      const match = sec.match(/^([^\n]+)\n\nSource: ([^\n]+)\nMarkdown: ([^\n]+)\n\n([\s\S]*)$/);
      assert.ok(match, `Section ${i} in ${file} must have valid header`);
      const mdUrl = match[3];
      const extractedContent = match[4];

      const relativeMdPath = new URL(mdUrl).pathname.replace(/^\//, '');
      const diskContent = readFileSync(join(DIST, relativeMdPath), 'utf-8');

      assert.equal(
        extractedContent,
        diskContent,
        `Byte-for-byte mismatch in ${file} for document ${relativeMdPath}`
      );
    }
  }
});

test('HTML alternate discovery tags', () => {
  const enHtml = readFileSync(join(DIST, 'en/about-this-blog/index.html'), 'utf-8');
  assert.match(enHtml, /<link\s+rel="alternate"\s+type="text\/markdown"[^>]*href="https:\/\/docs\.redaction-technique\.org\/en\/about-this-blog\.md"/);
  assert.match(enHtml, /<link\s+rel="alternate"\s+type="application\/json"[^>]*href="https:\/\/docs\.redaction-technique\.org\/en\/index\.json"/);
  assert.match(enHtml, /<link\s+rel="alternate"\s+type="text\/plain"[^>]*href="https:\/\/docs\.redaction-technique\.org\/llms\.txt"/);

  const frHtml = readFileSync(join(DIST, 'fr/about-this-blog/index.html'), 'utf-8');
  assert.match(frHtml, /<link\s+rel="alternate"\s+type="text\/markdown"[^>]*href="https:\/\/docs\.redaction-technique\.org\/fr\/about-this-blog\.md"/);
  assert.match(frHtml, /<link\s+rel="alternate"\s+type="application\/json"[^>]*href="https:\/\/docs\.redaction-technique\.org\/fr\/index\.json"/);
  assert.match(frHtml, /<link\s+rel="alternate"\s+type="text\/plain"[^>]*href="https:\/\/docs\.redaction-technique\.org\/llms\.txt"/);
});

test('API filtering by contentType on documentation records', () => {
  // 1. Concept filter: ?contentType=concept returns only Concept pages
  const resConcept = handleIndexQuery(docs, 'contentType=concept');
  assert.equal(resConcept.status, 200);
  assert.equal(resConcept.body.count, 60);
  assert.equal(resConcept.body.counts.en, 30);
  assert.equal(resConcept.body.counts.fr, 30);
  assert.ok(resConcept.body.documents.length > 0);
  for (const doc of resConcept.body.documents) {
    assert.equal(doc.contentType, 'concept', `Expected concept, got ${doc.contentType} for ${doc.url}`);
    assert.equal(doc.pageType, 'topic');
  }

  // 2. Task filter: ?contentType=task returns only Task pages
  const resTask = handleIndexQuery(docs, 'contentType=task');
  assert.equal(resTask.status, 200);
  assert.equal(resTask.body.count, 28);
  assert.equal(resTask.body.counts.en, 14);
  assert.equal(resTask.body.counts.fr, 14);
  assert.ok(resTask.body.documents.length > 0);
  for (const doc of resTask.body.documents) {
    assert.equal(doc.contentType, 'task', `Expected task, got ${doc.contentType} for ${doc.url}`);
    assert.equal(doc.pageType, 'topic');
  }

  // 3. Reference filter: ?contentType=reference returns only Reference pages
  const resRef = handleIndexQuery(docs, 'contentType=reference');
  assert.equal(resRef.status, 200);
  assert.equal(resRef.body.count, 32);
  assert.equal(resRef.body.counts.en, 16);
  assert.equal(resRef.body.counts.fr, 16);
  assert.ok(resRef.body.documents.length > 0);
  for (const doc of resRef.body.documents) {
    assert.equal(doc.contentType, 'reference', `Expected reference, got ${doc.contentType} for ${doc.url}`);
    assert.equal(doc.pageType, 'topic');
  }
});

test('API filtering by pageType on documentation records', () => {
  // ?pageType=topic returns only topics (120 total: 60 EN + 60 FR)
  const resTopic = handleIndexQuery(docs, 'pageType=topic');
  assert.equal(resTopic.status, 200);
  assert.equal(resTopic.body.count, 120);
  assert.equal(resTopic.body.counts.en, 60);
  assert.equal(resTopic.body.counts.fr, 60);
  for (const doc of resTopic.body.documents) {
    assert.equal(doc.pageType, 'topic');
    assert.ok(CONTENT_TYPES.includes(doc.contentType));
  }

  // ?pageType=landing returns only landing pages (14 total: 7 EN + 7 FR)
  const resLanding = handleIndexQuery(docs, 'pageType=landing');
  assert.equal(resLanding.status, 200);
  assert.equal(resLanding.body.count, 14);
  assert.equal(resLanding.body.counts.en, 7);
  assert.equal(resLanding.body.counts.fr, 7);
  for (const doc of resLanding.body.documents) {
    assert.equal(doc.pageType, 'landing');
    assert.equal(doc.contentType, null, 'Landing page contentType must be null');
  }

  // ?pageType=overview returns 10 section overview pages (5 EN + 5 FR: tech-writing-process, tutorials, formats, costs, reference)
  const resOverview = handleIndexQuery(docs, 'pageType=overview');
  assert.equal(resOverview.status, 200);
  assert.equal(resOverview.body.count, 10);
  assert.equal(resOverview.body.counts.en, 5);
  assert.equal(resOverview.body.counts.fr, 5);
  for (const doc of resOverview.body.documents) {
    assert.equal(doc.pageType, 'overview');
    assert.equal(doc.contentType, null, 'Overview page contentType must be null');
  }

  // ?pageType=index returns 0 in this repository taxonomy (all section roots are overviews/landing)
  const resIndex = handleIndexQuery(docs, 'pageType=index');
  assert.equal(resIndex.status, 200);
  assert.equal(resIndex.body.count, 0);
  assert.equal(resIndex.body.documents.length, 0);

  // ?pageType=utility returns 4 utility pages (2 EN + 2 FR: about-this-blog, ask)
  const resUtility = handleIndexQuery(docs, 'pageType=utility');
  assert.equal(resUtility.status, 200);
  assert.equal(resUtility.body.count, 4);
  for (const doc of resUtility.body.documents) {
    assert.equal(doc.pageType, 'utility');
    assert.equal(doc.contentType, null);
  }
});

test('Combined filter AND operation: ?pageType=topic&contentType=task', () => {
  const res = handleIndexQuery(docs, 'pageType=topic&contentType=task');
  assert.equal(res.status, 200);
  assert.equal(res.body.count, 28);
  assert.equal(res.body.counts.en, 14);
  assert.equal(res.body.counts.fr, 14);

  // Verify EVERY result satisfies both conditions
  for (const doc of res.body.documents) {
    assert.equal(doc.pageType, 'topic', `Expected pageType=topic, got ${doc.pageType}`);
    assert.equal(doc.contentType, 'task', `Expected contentType=task, got ${doc.contentType}`);
  }
});

test('HTTP 400 validation on invalid query parameters', () => {
  // Invalid content type: tutorial
  const resTutorial = handleIndexQuery(docs, 'contentType=tutorial');
  assert.equal(resTutorial.status, 400);
  assert.equal(resTutorial.body.error, 'Invalid contentType');
  assert.deepEqual(resTutorial.body.allowed, [...CONTENT_TYPES]);

  // Invalid content type: Concept (capitalized)
  const resConceptCap = handleIndexQuery(docs, 'contentType=Concept');
  assert.equal(resConceptCap.status, 400);
  assert.equal(resConceptCap.body.error, 'Invalid contentType');
  assert.deepEqual(resConceptCap.body.allowed, [...CONTENT_TYPES]);

  // Invalid page type: article
  const resArticle = handleIndexQuery(docs, 'pageType=article');
  assert.equal(resArticle.status, 400);
  assert.equal(resArticle.body.error, 'Invalid pageType');
  assert.deepEqual(resArticle.body.allowed, [...PAGE_TYPES]);

  // Invalid page type: Topic (capitalized)
  const resTopicCap = handleIndexQuery(docs, 'pageType=Topic');
  assert.equal(resTopicCap.status, 400);
  assert.equal(resTopicCap.body.error, 'Invalid pageType');
  assert.deepEqual(resTopicCap.body.allowed, [...PAGE_TYPES]);

  // Invalid lang: es
  const resLang = handleIndexQuery(docs, 'lang=es');
  assert.equal(resLang.status, 400);
  assert.equal(resLang.body.error, 'Invalid lang');
  assert.deepEqual(resLang.body.allowed, ['en', 'fr']);
});

test('Strict locale isolation with filtering', () => {
  // ?lang=en&contentType=concept contains ONLY EN pages
  const resEn = handleIndexQuery(docs, 'lang=en&contentType=concept');
  assert.equal(resEn.status, 200);
  assert.equal(resEn.body.count, 30);
  assert.equal(resEn.body.counts.en, 30);
  assert.equal(resEn.body.counts.fr, 0);
  for (const doc of resEn.body.documents) {
    assert.equal(doc.locale, 'en');
    assert.equal(doc.contentType, 'concept');
    assert.ok(!doc.url.includes('/fr/'), `EN document must not contain /fr/: ${doc.url}`);
  }

  // ?lang=fr&contentType=concept contains ONLY FR pages
  const resFr = handleIndexQuery(docs, 'lang=fr&contentType=concept');
  assert.equal(resFr.status, 200);
  assert.equal(resFr.body.count, 30);
  assert.equal(resFr.body.counts.en, 0);
  assert.equal(resFr.body.counts.fr, 30);
  for (const doc of resFr.body.documents) {
    assert.equal(doc.locale, 'fr');
    assert.equal(doc.contentType, 'concept');
    assert.ok(!doc.url.includes('/en/'), `FR document must not contain /en/: ${doc.url}`);
  }

  // ?lang=fr&contentType=task
  const resFrTask = handleIndexQuery(docs, 'lang=fr&contentType=task');
  assert.equal(resFrTask.status, 200);
  assert.equal(resFrTask.body.count, 14);
  for (const doc of resFrTask.body.documents) {
    assert.equal(doc.locale, 'fr');
    assert.equal(doc.contentType, 'task');
  }

  // ?lang=en&pageType=topic&contentType=reference
  const resEnRef = handleIndexQuery(docs, 'lang=en&pageType=topic&contentType=reference');
  assert.equal(resEnRef.status, 200);
  assert.equal(resEnRef.body.count, 16);
  for (const doc of resEnRef.body.documents) {
    assert.equal(doc.locale, 'en');
    assert.equal(doc.pageType, 'topic');
    assert.equal(doc.contentType, 'reference');
  }

  // Locale-scoped endpoint /en/index.json rejecting mismatched lang=fr
  const resEnConflict = handleIndexQuery(docs, 'lang=fr', { locale: 'en' });
  assert.equal(resEnConflict.status, 400);
  assert.equal(resEnConflict.body.error, 'Invalid lang for EN endpoint');
});

test('Intentionally untyped pages integrity: never classified as Concept, Task, or Reference', () => {
  const untyped = globalJson.documents.filter((d) => d.pageType !== 'topic');
  assert.equal(untyped.length, 28, 'Must have exactly 28 untyped pages');

  for (const doc of untyped) {
    assert.equal(
      doc.contentType,
      null,
      `Untyped page ${doc.url} (${doc.pageType}) must have contentType null, got ${doc.contentType}`
    );
  }

  // Also verify that filtering by contentType=concept, task, reference never includes an untyped page
  for (const ct of CONTENT_TYPES) {
    const res = handleIndexQuery(docs, `contentType=${ct}`);
    for (const doc of res.body.documents) {
      assert.notEqual(doc.pageType, 'landing', `Landing page leaked into contentType=${ct}`);
      assert.notEqual(doc.pageType, 'index', `Index page leaked into contentType=${ct}`);
      assert.notEqual(doc.pageType, 'utility', `Utility page leaked into contentType=${ct}`);
    }
  }
});

test('Invariant test: API query filtering is bound to canonical content types and page types', () => {
  // 1. Every canonical content type must be accepted and return HTTP 200
  for (const ct of CONTENT_TYPES) {
    const res = handleIndexQuery(docs, `contentType=${ct}`);
    assert.equal(res.status, 200, `Filtering by canonical contentType "${ct}" must return 200`);
    assert.ok(res.body.count > 0, `Expected results for canonical contentType "${ct}"`);
  }

  // 2. Every canonical page type must be accepted and return HTTP 200
  for (const pt of PAGE_TYPES) {
    const res = handleIndexQuery(docs, `pageType=${pt}`);
    assert.equal(res.status, 200, `Filtering by canonical pageType "${pt}" must return 200`);
  }

  // 3. Allowed error lists must match canonical arrays exactly
  const errCt = handleIndexQuery(docs, 'contentType=nonexistent-type');
  assert.equal(errCt.status, 400);
  assert.deepEqual(errCt.body.allowed, [...CONTENT_TYPES]);

  const errPt = handleIndexQuery(docs, 'pageType=nonexistent-page-type');
  assert.equal(errPt.status, 400);
  assert.deepEqual(errPt.body.allowed, [...PAGE_TYPES]);
});

test('Taxonomy completeness and consistency across definitions', () => {
  // 1. Content type metadata completeness
  assert.equal(
    Object.keys(CONTENT_TYPE_METADATA).length,
    CONTENT_TYPES.length,
    'CONTENT_TYPE_METADATA must contain exactly the canonical CONTENT_TYPES'
  );
  for (const ct of CONTENT_TYPES) {
    const meta = CONTENT_TYPE_METADATA[ct];
    assert.ok(meta, `Missing metadata for canonical contentType: ${ct}`);
    assert.ok(typeof meta.label === 'string' && meta.label.length > 0, `Missing label for contentType: ${ct}`);
    assert.ok(typeof meta.description === 'string' && meta.description.length > 0, `Missing description for contentType: ${ct}`);
  }

  // 2. Page type metadata completeness
  assert.equal(
    Object.keys(PAGE_TYPE_METADATA).length,
    PAGE_TYPES.length,
    'PAGE_TYPE_METADATA must contain exactly the canonical PAGE_TYPES'
  );
  for (const pt of PAGE_TYPES) {
    const meta = PAGE_TYPE_METADATA[pt];
    assert.ok(meta, `Missing metadata for canonical pageType: ${pt}`);
    assert.ok(typeof meta.label === 'string' && meta.label.length > 0, `Missing label for pageType: ${pt}`);
    assert.ok(typeof meta.description === 'string' && meta.description.length > 0, `Missing description for pageType: ${pt}`);
  }

  // 3. API_TAXONOMY consistency
  assert.deepEqual(API_TAXONOMY.contentType.values, CONTENT_TYPES);
  assert.deepEqual(API_TAXONOMY.contentType.items, CONTENT_TYPE_METADATA);
  assert.ok(API_TAXONOMY.contentType.description.length > 0);

  assert.deepEqual(API_TAXONOMY.pageType.values, PAGE_TYPES);
  assert.deepEqual(API_TAXONOMY.pageType.items, PAGE_TYPE_METADATA);
  assert.ok(API_TAXONOMY.pageType.description.length > 0);

  // 4. Distinct semantic descriptions for the two dimensions
  assert.notEqual(
    API_TAXONOMY.contentType.description,
    API_TAXONOMY.pageType.description,
    'pageType and contentType must have distinct semantic descriptions'
  );
});

test('Dedicated schema discovery endpoint (/schema.json)', () => {
  const schemaPath = join(DIST, 'schema.json');
  assert.ok(existsSync(schemaPath), 'Expected dist/client/schema.json to exist');

  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
  assert.equal(schema.version, '1.0');
  assert.equal(schema.site, 'https://docs.redaction-technique.org');
  assert.ok(typeof schema.description === 'string' && schema.description.length > 0);

  // Taxonomy verification
  assert.deepEqual(schema.taxonomy, API_TAXONOMY);
  assert.deepEqual(schema.filters.contentType, [...CONTENT_TYPES]);
  assert.deepEqual(schema.filters.pageType, [...PAGE_TYPES]);

  // Verify no undocumented values
  assert.deepEqual(Object.keys(schema.taxonomy.contentType.items).sort(), [...CONTENT_TYPES].sort());
  assert.deepEqual(Object.keys(schema.taxonomy.pageType.items).sort(), [...PAGE_TYPES].sort());
});

test('Taxonomy preservation during API query filtering', () => {
  // Global filtered query retains taxonomy and filters
  const resFiltered = handleIndexQuery(docs, 'pageType=topic&contentType=task');
  assert.equal(resFiltered.status, 200);
  assert.deepEqual(resFiltered.body.taxonomy, API_TAXONOMY);
  assert.deepEqual(resFiltered.body.filters.contentType, [...CONTENT_TYPES]);
  assert.deepEqual(resFiltered.body.filters.pageType, [...PAGE_TYPES]);
  assert.equal(resFiltered.body.endpoints.global.schema, 'https://docs.redaction-technique.org/schema.json');

  // Locale-scoped filtered query retains taxonomy and filters
  const resEn = handleIndexQuery(docs, 'contentType=concept', { locale: 'en' });
  assert.equal(resEn.status, 200);
  assert.deepEqual(resEn.body.taxonomy, API_TAXONOMY);
  assert.deepEqual(resEn.body.filters.contentType, [...CONTENT_TYPES]);
  assert.deepEqual(resEn.body.filters.pageType, [...PAGE_TYPES]);
});

test('Stable document identity and deterministic retrieval mapping', () => {
  const urls = new Set();
  const markdowns = new Set();

  for (const doc of globalJson.documents) {
    // URL format: https://docs.redaction-technique.org/.../
    assert.match(
      doc.url,
      /^https:\/\/docs\.redaction-technique\.org\/(en|fr)\/(.*\/)?$/,
      `Invalid canonical URL: ${doc.url}`
    );
    assert.ok(!urls.has(doc.url), `Duplicate canonical URL detected: ${doc.url}`);
    urls.add(doc.url);

    // Markdown format: https://docs.redaction-technique.org/...md
    assert.match(
      doc.markdown,
      /^https:\/\/docs\.redaction-technique\.org\/(en|fr)(\/.*)?\.md$/,
      `Invalid Markdown URL: ${doc.markdown}`
    );
    assert.ok(!markdowns.has(doc.markdown), `Duplicate markdown URL detected: ${doc.markdown}`);
    markdowns.add(doc.markdown);

    // Direct deterministic derivation between url and markdown
    const expectedMdFromUrl = doc.url
      .replace(/\/$/, '')
      .concat('.md');
    assert.equal(
      doc.markdown,
      expectedMdFromUrl,
      `Markdown URL must match canonical URL stem: ${doc.markdown} vs ${expectedMdFromUrl}`
    );
  }

  assert.equal(urls.size, 148, 'Must have exactly 148 unique stable canonical URLs');
  assert.equal(markdowns.size, 148, 'Must have exactly 148 unique markdown retrieval URLs');
});

test('Direct document Markdown retrieval from disk matches index specification', () => {
  // Sample documents representing both languages and all content types
  const sampleUrls = [
    'https://docs.redaction-technique.org/en/toolkit/task-article-template/',
    'https://docs.redaction-technique.org/en/toolkit/concept-article-template/',
    'https://docs.redaction-technique.org/en/toolkit/reference-article-template/',
    'https://docs.redaction-technique.org/fr/toolkit/task-article-template/',
    'https://docs.redaction-technique.org/fr/toolkit/concept-article-template/',
    'https://docs.redaction-technique.org/fr/toolkit/reference-article-template/',
    'https://docs.redaction-technique.org/en/about-this-blog/',
    'https://docs.redaction-technique.org/fr/about-this-blog/',
  ];

  for (const url of sampleUrls) {
    const doc = globalJson.documents.find((d) => d.url === url);
    assert.ok(doc, `Sample document not found in index: ${url}`);

    const relativeMdPath = new URL(doc.markdown).pathname.replace(/^\//, '');
    const diskPath = join(DIST, relativeMdPath);
    assert.ok(existsSync(diskPath), `Advertised markdown file missing from disk: ${diskPath}`);

    const content = readFileSync(diskPath, 'utf-8');
    assert.ok(content.length > 0, `Markdown file is empty: ${diskPath}`);
    assert.ok(
      content.startsWith(`# ${doc.title}`),
      `Markdown file does not start with title: expected "# ${doc.title}"`
    );
  }
});

test('Filter and retrieval composition: discover task topics and retrieve markdown', () => {
  // Step 1: Filter by task
  const res = handleIndexQuery(docs, 'contentType=task&lang=en');
  assert.equal(res.status, 200);
  assert.equal(res.body.count, 14);

  // Step 2: For every retrieved task topic, verify advertised markdown exists and contains instructions/steps
  for (const doc of res.body.documents) {
    assert.equal(doc.contentType, 'task');
    assert.equal(doc.locale, 'en');

    const relativeMdPath = new URL(doc.markdown).pathname.replace(/^\//, '');
    const diskPath = join(DIST, relativeMdPath);
    assert.ok(existsSync(diskPath), `Task markdown not found on disk: ${diskPath}`);

    const content = readFileSync(diskPath, 'utf-8');
    assert.ok(content.length > 100, `Task content unexpectedly short: ${diskPath}`);
  }
});

test('Field selection query projection (?fields=...)', () => {
  // 1. Project 4 fields: title, url, markdown, contentType
  const res = handleIndexQuery(docs, 'contentType=task&fields=title,url,markdown,contentType');
  assert.equal(res.status, 200);
  assert.equal(res.body.count, 28);

  for (const doc of res.body.documents) {
    const keys = Object.keys(doc).sort();
    assert.deepEqual(keys, ['contentType', 'markdown', 'title', 'url']);
    assert.equal(doc.contentType, 'task');
  }

  // 2. Minimal projection: title, url
  const resMinimal = handleIndexQuery(docs, 'fields=title,url');
  assert.equal(resMinimal.status, 200);
  assert.equal(resMinimal.body.count, 148);

  for (const doc of resMinimal.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['title', 'url']);
  }

  // 3. Omitted fields parameter preserves all default fields
  const resDefault = handleIndexQuery(docs, 'contentType=concept');
  assert.equal(resDefault.status, 200);
  for (const doc of resDefault.body.documents) {
    assert.ok(doc.title);
    assert.ok(doc.url);
    assert.ok(doc.markdown);
    assert.ok(doc.locale);
    assert.ok(doc.pageType);
    assert.ok(Array.isArray(doc.headings));
  }
});

test('Field selection HTTP 400 validation on invalid fields', () => {
  // Unknown field: foo
  const resUnknown = handleIndexQuery(docs, 'fields=title,foo');
  assert.equal(resUnknown.status, 400);
  assert.equal(resUnknown.body.error, 'Invalid field: "foo"');
  assert.deepEqual(resUnknown.body.allowed, [...ALLOWED_DOCUMENT_FIELDS]);

  // Empty fields parameter
  const resEmpty = handleIndexQuery(docs, 'fields=');
  assert.equal(resEmpty.status, 400);
  assert.equal(resEmpty.body.error, 'Invalid fields parameter: must specify at least one field');
  assert.deepEqual(resEmpty.body.allowed, [...ALLOWED_DOCUMENT_FIELDS]);
});

test('Deterministic pagination (?page=...&limit=...)', () => {
  // Page 1 with limit 10
  const p1 = handleIndexQuery(docs, 'page=1&limit=10');
  assert.equal(p1.status, 200);
  assert.equal(p1.body.count, 10);
  assert.equal(p1.body.documents.length, 10);
  assert.deepEqual(p1.body.pagination, {
    page: 1,
    limit: 10,
    total: 148,
    totalPages: 15,
  });

  // Page 2 with limit 10
  const p2 = handleIndexQuery(docs, 'page=2&limit=10');
  assert.equal(p2.status, 200);
  assert.equal(p2.body.count, 10);
  assert.equal(p2.body.documents.length, 10);
  assert.deepEqual(p2.body.pagination, {
    page: 2,
    limit: 10,
    total: 148,
    totalPages: 15,
  });

  // Deterministic ordering: Page 1 and Page 2 must not overlap and match global ordering
  const p1Urls = p1.body.documents.map((d) => d.url);
  const p2Urls = p2.body.documents.map((d) => d.url);
  const allUrls = globalJson.documents.map((d) => d.url);

  assert.deepEqual(p1Urls, allUrls.slice(0, 10));
  assert.deepEqual(p2Urls, allUrls.slice(10, 20));

  // Last page (Page 15, should have 8 documents: 148 - 14*10 = 8)
  const p15 = handleIndexQuery(docs, 'page=15&limit=10');
  assert.equal(p15.status, 200);
  assert.equal(p15.body.count, 8);
  assert.equal(p15.body.documents.length, 8);
  assert.deepEqual(p15.body.documents.map((d) => d.url), allUrls.slice(140, 148));
});

test('Pagination HTTP 400 validation on out-of-bounds or invalid bounds', () => {
  // Page out of bounds
  const resOob = handleIndexQuery(docs, 'page=16&limit=10');
  assert.equal(resOob.status, 400);
  assert.match(resOob.body.error, /out of bounds/);

  // Invalid page: 0
  const resPageZero = handleIndexQuery(docs, 'page=0');
  assert.equal(resPageZero.status, 400);
  assert.match(resPageZero.body.error, /Invalid page parameter/);

  // Invalid page: negative
  const resPageNeg = handleIndexQuery(docs, 'page=-1');
  assert.equal(resPageNeg.status, 400);
  assert.match(resPageNeg.body.error, /Invalid page parameter/);

  // Invalid page: non-integer
  const resPageStr = handleIndexQuery(docs, 'page=foo');
  assert.equal(resPageStr.status, 400);
  assert.match(resPageStr.body.error, /Invalid page parameter/);

  // Invalid limit: 0
  const resLimitZero = handleIndexQuery(docs, 'limit=0');
  assert.equal(resLimitZero.status, 400);
  assert.match(resLimitZero.body.error, /Invalid limit parameter/);

  // Invalid limit: excessive (> 100)
  const resLimitHigh = handleIndexQuery(docs, 'limit=101');
  assert.equal(resLimitHigh.status, 400);
  assert.match(resLimitHigh.body.error, /Invalid limit parameter/);
});

test('Combined filtering, pagination, and field selection', () => {
  // Filter contentType=task + lang=en + page=1 + limit=5 + fields=title,url,markdown
  const res = handleIndexQuery(
    docs,
    'contentType=task&lang=en&page=1&limit=5&fields=title,url,markdown'
  );
  assert.equal(res.status, 200);
  assert.equal(res.body.count, 5);
  assert.deepEqual(res.body.pagination, {
    page: 1,
    limit: 5,
    total: 14,
    totalPages: 3,
  });

  for (const doc of res.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['markdown', 'title', 'url']);
    assert.ok(doc.url.startsWith('https://docs.redaction-technique.org/en/'));
  }

  // Page 3 has 4 remaining docs (14 total: 5 + 5 + 4)
  const resP3 = handleIndexQuery(
    docs,
    'contentType=task&lang=en&page=3&limit=5&fields=title,url,markdown'
  );
  assert.equal(resP3.status, 200);
  assert.equal(resP3.body.count, 4);
});

test('Extended /schema.json capability and document schema contract', () => {
  const schemaPath = join(DIST, 'schema.json');
  assert.ok(existsSync(schemaPath));
  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

  // 1. Endpoints discovery
  assert.ok(schema.endpoints.global.index);
  assert.ok(schema.endpoints.global.schema);
  assert.ok(schema.endpoints.global.llms);
  assert.ok(schema.endpoints.global.llmsFull);
  assert.ok(schema.endpoints.en.index);
  assert.ok(schema.endpoints.fr.index);

  // 2. Retrieval model
  assert.equal(schema.retrieval.identifier, 'url');
  assert.ok(schema.retrieval.representations.html);
  assert.ok(schema.retrieval.representations.markdown);

  // 3. Query parameters description
  assert.ok(schema.queryParameters.contentType);
  assert.ok(schema.queryParameters.pageType);
  assert.ok(schema.queryParameters.lang);
  assert.ok(schema.queryParameters.fields);
  assert.ok(schema.queryParameters.page);
  assert.ok(schema.queryParameters.limit);
  assert.deepEqual(schema.queryParameters.fields.allowed, [...ALLOWED_DOCUMENT_FIELDS]);

  // 4. Machine-readable document schema
  assert.equal(schema.document.type, 'object');
  assert.deepEqual(
    Object.keys(schema.document.properties).sort(),
    [...ALLOWED_DOCUMENT_FIELDS].sort()
  );
});



