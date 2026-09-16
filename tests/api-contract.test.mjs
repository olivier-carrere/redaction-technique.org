import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { handleIndexQuery } from '../src/lib/document-resource.ts';

const DIST = join(process.cwd(), 'dist', 'client');

// ---------------------------------------------------------------------------
// 1. Schema self-consistency & Endpoint existence (Sections 3 & 4)
// ---------------------------------------------------------------------------

test('Black-box audit: /schema.json structure and endpoint verification on disk', () => {
  const schemaPath = join(DIST, 'schema.json');
  assert.ok(existsSync(schemaPath), 'dist/client/schema.json must exist');

  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

  // Version and site identity
  assert.equal(schema.version, '1.0');
  assert.equal(schema.site, 'https://docs.redaction-technique.org');
  assert.ok(typeof schema.description === 'string' && schema.description.length > 0);

  // Endpoints discovery
  assert.ok(schema.endpoints, 'schema.endpoints must be present');
  assert.ok(schema.endpoints.global, 'schema.endpoints.global must be present');
  assert.ok(schema.endpoints.en, 'schema.endpoints.en must be present');
  assert.ok(schema.endpoints.fr, 'schema.endpoints.fr must be present');

  // Verify that EVERY advertised endpoint exists on disk and is non-empty
  for (const [locale, epGroup] of Object.entries(schema.endpoints)) {
    for (const [name, url] of Object.entries(epGroup)) {
      assert.ok(url.startsWith('https://docs.redaction-technique.org/'), `URL must have production origin: ${url}`);
      const relativePath = new URL(url).pathname.replace(/^\//, '');
      const diskPath = join(DIST, relativePath);
      assert.ok(existsSync(diskPath), `Advertised endpoint [${locale}.${name}] ${url} does not exist at ${diskPath}`);
      const size = readFileSync(diskPath).length;
      assert.ok(size > 0, `Advertised endpoint [${locale}.${name}] is empty: ${diskPath}`);
    }
  }

  // Retrieval relation
  assert.equal(schema.retrieval.identifier, 'url');
  assert.ok(schema.retrieval.representations.html);
  assert.ok(schema.retrieval.representations.markdown);

  // Query parameters contract
  assert.ok(schema.queryParameters.contentType);
  assert.ok(schema.queryParameters.pageType);
  assert.ok(schema.queryParameters.lang);
  assert.ok(schema.queryParameters.fields);
  assert.ok(schema.queryParameters.page);
  assert.ok(schema.queryParameters.limit);

  // Filters contract
  assert.deepEqual(schema.filters.lang, ['en', 'fr']);
  assert.deepEqual(schema.filters.contentType, ['concept', 'task', 'reference']);
  assert.deepEqual(schema.filters.pageType, ['topic', 'index', 'landing', 'overview', 'utility']);

  // Document property schema matches allowed fields
  assert.equal(schema.document.type, 'object');
  assert.deepEqual(
    Object.keys(schema.document.properties).sort(),
    [...schema.queryParameters.fields.allowed].sort()
  );
  assert.deepEqual(schema.document.required, ['title', 'url', 'markdown', 'locale', 'pageType']);
});

// ---------------------------------------------------------------------------
// 2. Document URL integrity, Locale Isolation & Artifact Verification (Sections 5 & 17)
// ---------------------------------------------------------------------------

test('Black-box audit: document URL integrity and strict locale isolation', () => {
  const globalJson = JSON.parse(readFileSync(join(DIST, 'index.json'), 'utf-8'));
  const enJson = JSON.parse(readFileSync(join(DIST, 'en/index.json'), 'utf-8'));
  const frJson = JSON.parse(readFileSync(join(DIST, 'fr/index.json'), 'utf-8'));

  assert.equal(globalJson.count, 148);
  assert.equal(globalJson.counts.en, 74);
  assert.equal(globalJson.counts.fr, 74);
  assert.equal(enJson.count, 74);
  assert.equal(frJson.count, 74);

  const seenUrls = new Set();

  for (const doc of globalJson.documents) {
    // Check URL syntax and origin
    assert.ok(doc.url.startsWith('https://docs.redaction-technique.org/'), `Non-production URL: ${doc.url}`);
    assert.ok(!doc.url.includes('localhost'), `Localhost detected in URL: ${doc.url}`);
    assert.ok(!doc.url.includes('/src/'), `Filesystem path in URL: ${doc.url}`);
    assert.ok(doc.url.endsWith('/'), `Canonical URL must end with trailing slash: ${doc.url}`);

    // Check uniqueness
    assert.ok(!seenUrls.has(doc.url), `Duplicate URL in index: ${doc.url}`);
    seenUrls.add(doc.url);

    // Verify HTML file existence on disk
    const htmlRel = new URL(doc.url).pathname.replace(/^\//, '') + 'index.html';
    const htmlPath = join(DIST, htmlRel);
    assert.ok(existsSync(htmlPath), `HTML file missing for ${doc.url}: ${htmlPath}`);
  }

  // Verify EN isolation
  for (const doc of enJson.documents) {
    assert.equal(doc.locale, 'en');
    assert.ok(doc.url.startsWith('https://docs.redaction-technique.org/en/'));
    assert.ok(!doc.url.includes('/fr/'), `FR leak in EN index: ${doc.url}`);
    assert.ok(!doc.markdown.includes('/fr/'), `FR leak in EN markdown: ${doc.markdown}`);
  }

  // Verify FR isolation
  for (const doc of frJson.documents) {
    assert.equal(doc.locale, 'fr');
    assert.ok(doc.url.startsWith('https://docs.redaction-technique.org/fr/'));
    assert.ok(!doc.url.includes('/en/'), `EN leak in FR index: ${doc.url}`);
    assert.ok(!doc.markdown.includes('/en/'), `EN leak in FR markdown: ${doc.markdown}`);
  }
});

// ---------------------------------------------------------------------------
// 3. Markdown URL integrity & Full Corpus Byte-for-Byte Fidelity (Sections 6 & 20)
// ---------------------------------------------------------------------------

test('Black-box audit: Markdown retrieval integrity across all 148 documents and llms-full.txt', () => {
  const globalJson = JSON.parse(readFileSync(join(DIST, 'index.json'), 'utf-8'));
  const fullText = readFileSync(join(DIST, 'llms-full.txt'), 'utf-8');
  const sections = fullText.split(/\n---\n\n## Document: /);

  assert.equal(sections.length - 1, 148, 'llms-full.txt must contain all 148 documents');

  for (let i = 1; i < sections.length; i++) {
    const sec = sections[i];
    const match = sec.match(/^([^\n]+)\n\nSource: ([^\n]+)\nMarkdown: ([^\n]+)\n\n([\s\S]*)$/);
    assert.ok(match, `Section ${i} does not match document header format`);

    const title = match[1];
    const sourceUrl = match[2];
    const mdUrl = match[3];
    const fullBody = match[4];

    // Find indexed document
    const indexedDoc = globalJson.documents.find((d) => d.url === sourceUrl);
    assert.ok(indexedDoc, `Document not found in index: ${sourceUrl}`);
    assert.equal(indexedDoc.title, title);
    assert.equal(indexedDoc.markdown, mdUrl);

    // Verify individual .md file on disk
    const relMd = new URL(mdUrl).pathname.replace(/^\//, '');
    const diskMdPath = join(DIST, relMd);
    assert.ok(existsSync(diskMdPath), `Markdown file missing on disk: ${diskMdPath}`);

    const diskContent = readFileSync(diskMdPath, 'utf-8');
    assert.ok(diskContent.length > 0, `Markdown file is empty: ${diskMdPath}`);
    assert.ok(diskContent.startsWith(`# ${title}`), `Markdown file must begin with "# ${title}"`);

    // Byte-for-byte invariant check
    assert.equal(
      fullBody,
      diskContent,
      `Byte-for-byte fidelity mismatch between llms-full.txt and ${relMd}`
    );
  }
});

// ---------------------------------------------------------------------------
// 4. Metadata integrity & Document Schema compliance (Section 7)
// ---------------------------------------------------------------------------

test('Black-box audit: document metadata compliance against /schema.json schema', () => {
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));
  const globalJson = JSON.parse(readFileSync(join(DIST, 'index.json'), 'utf-8'));

  const allowedContentTypes = schema.filters.contentType;
  const allowedPageTypes = schema.filters.pageType;

  let topicCount = 0;
  let untypedCount = 0;

  for (const doc of globalJson.documents) {
    // Required properties
    for (const req of schema.document.required) {
      assert.ok(doc[req] !== undefined && doc[req] !== null, `Missing required property "${req}" on ${doc.url}`);
    }

    // Locale
    assert.ok(['en', 'fr'].includes(doc.locale));

    // PageType
    assert.ok(allowedPageTypes.includes(doc.pageType), `Invalid pageType "${doc.pageType}" on ${doc.url}`);

    // ContentType invariant
    if (doc.pageType === 'topic') {
      topicCount++;
      assert.ok(
        allowedContentTypes.includes(doc.contentType),
        `Topic document ${doc.url} must have contentType in [${allowedContentTypes.join(', ')}], got "${doc.contentType}"`
      );
    } else {
      untypedCount++;
      assert.equal(
        doc.contentType,
        null,
        `Untyped page (${doc.pageType}) ${doc.url} must have contentType null, got "${doc.contentType}"`
      );
    }

    // Word count
    assert.ok(typeof doc.wordCount === 'number' && doc.wordCount >= 0);

    // Headings
    assert.ok(Array.isArray(doc.headings));
    for (const h of doc.headings) {
      assert.ok(typeof h.level === 'number' && h.level >= 1 && h.level <= 6);
      assert.ok(typeof h.text === 'string' && h.text.length > 0);
    }

    // Keywords and tags
    assert.ok(Array.isArray(doc.keywords));
    assert.ok(Array.isArray(doc.tags));
  }

  assert.equal(topicCount, 120, 'Corpus must contain exactly 120 typed topics');
  assert.equal(untypedCount, 28, 'Corpus must contain exactly 28 intentionally untyped pages');
});

// ---------------------------------------------------------------------------
// 5. Taxonomy consistency across all endpoints (Section 18)
// ---------------------------------------------------------------------------

test('Black-box audit: taxonomy consistency between schema.json and indexes', () => {
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));
  const globalJson = JSON.parse(readFileSync(join(DIST, 'index.json'), 'utf-8'));
  const enJson = JSON.parse(readFileSync(join(DIST, 'en/index.json'), 'utf-8'));
  const frJson = JSON.parse(readFileSync(join(DIST, 'fr/index.json'), 'utf-8'));

  assert.deepEqual(globalJson.taxonomy, schema.taxonomy);
  assert.deepEqual(enJson.taxonomy, schema.taxonomy);
  assert.deepEqual(frJson.taxonomy, schema.taxonomy);
});

// ---------------------------------------------------------------------------
// 6. Independent Consumer Simulation (Section 21)
// ---------------------------------------------------------------------------

test('Black-box consumer simulation: discover API, filter tasks, retrieve Markdown without codebase dependencies', () => {
  // Step 1: GET /schema.json
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));

  // Step 2: Discover contentType=task
  const contentTypes = schema.filters.contentType;
  assert.ok(contentTypes.includes('task'), 'Consumer expects "task" in available content types');

  // Step 3: Discover the index endpoint
  const enIndexUrl = schema.endpoints.en.index;
  assert.equal(enIndexUrl, 'https://docs.redaction-technique.org/en/index.json');

  // Step 4: Fetch /en/index.json
  const enIndexRel = new URL(enIndexUrl).pathname.replace(/^\//, '');
  const enCatalog = JSON.parse(readFileSync(join(DIST, enIndexRel), 'utf-8'));

  // Step 5: Filter documents where contentType === 'task'
  const taskDocs = enCatalog.documents.filter((d) => d.contentType === 'task');
  assert.equal(taskDocs.length, 14, 'Consumer expects 14 task documents in English');

  // Step 6: Select one returned document
  const selectedDoc = taskDocs.find((d) => d.url.includes('auto-insert-data-dita-xml'));
  assert.ok(selectedDoc, 'Target task document must be present');
  assert.equal(selectedDoc.contentType, 'task');

  // Step 7: Read its markdown URL
  const mdUrl = selectedDoc.markdown;
  assert.ok(mdUrl.endsWith('.md'));

  // Step 8: Retrieve the Markdown from disk
  const mdRel = new URL(mdUrl).pathname.replace(/^\//, '');
  const markdownText = readFileSync(join(DIST, mdRel), 'utf-8');

  // Step 9: Verify retrieved document matches index metadata
  assert.ok(markdownText.startsWith(`# ${selectedDoc.title}`));
  assert.ok(markdownText.length > 50);
});

// ---------------------------------------------------------------------------
// 7. Query Engine Black-box Audit against Schema Specification (Sections 8-16)
// ---------------------------------------------------------------------------

test('Black-box query engine audit: filtering, zero-result, HTTP 400 validation, fields, and pagination', () => {
  const globalJson = JSON.parse(readFileSync(join(DIST, 'index.json'), 'utf-8'));
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));

  const docs = globalJson.documents.map((d) => ({
    ...d,
    markdownUrl: d.markdown,
    slug: d.url.replace('https://docs.redaction-technique.org/', '').replace(/\/$/, ''),
  }));

  // A. Filter contract (Section 8)
  for (const ct of schema.filters.contentType) {
    const res = handleIndexQuery(docs, `contentType=${ct}`);
    assert.equal(res.status, 200);
    assert.ok(res.body.count > 0);
    for (const doc of res.body.documents) {
      assert.equal(doc.contentType, ct);
    }
  }

  // Combined AND filtering
  const resCombined = handleIndexQuery(docs, 'pageType=topic&contentType=task&lang=en');
  assert.equal(resCombined.status, 200);
  assert.equal(resCombined.body.count, 14);
  for (const doc of resCombined.body.documents) {
    assert.equal(doc.pageType, 'topic');
    assert.equal(doc.contentType, 'task');
    assert.equal(doc.locale, 'en');
  }

  // B. Zero-result behavior (Section 9)
  // An intentionally untyped landing page can never have contentType=task
  const resZero = handleIndexQuery(docs, 'pageType=landing&contentType=task');
  assert.equal(resZero.status, 200);
  assert.equal(resZero.body.count, 0);
  assert.equal(resZero.body.counts.en, 0);
  assert.equal(resZero.body.counts.fr, 0);
  assert.deepEqual(resZero.body.documents, []);
  assert.deepEqual(resZero.body.taxonomy, schema.taxonomy);

  // C. Invalid filter behavior (Section 10)
  const invalidQueries = [
    'contentType=invalid',
    'contentType=Concept',
    'pageType=invalid',
    'pageType=Topic',
    'lang=es',
    'lang=EN',
  ];
  for (const q of invalidQueries) {
    const res = handleIndexQuery(docs, q);
    assert.equal(res.status, 400, `Expected 400 for ${q}`);
    assert.ok(typeof res.body.error === 'string');
    assert.ok(Array.isArray(res.body.allowed));
  }

  // D. Field selection contract (Section 11)
  const resFields = handleIndexQuery(docs, 'contentType=concept&fields=title,url,markdown,contentType');
  assert.equal(resFields.status, 200);
  for (const doc of resFields.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['contentType', 'markdown', 'title', 'url']);
  }

  // Field selection with whitespace normalization (?fields=title,%20url)
  const resSpace = handleIndexQuery(docs, 'fields=title, url');
  assert.equal(resSpace.status, 200);
  for (const doc of resSpace.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['title', 'url']);
  }

  // Field selection deduplication (?fields=title,title)
  const resDedup = handleIndexQuery(docs, 'fields=title,title');
  assert.equal(resDedup.status, 200);
  for (const doc of resDedup.body.documents) {
    assert.deepEqual(Object.keys(doc), ['title']);
  }

  // Field selection invalid fields
  assert.equal(handleIndexQuery(docs, 'fields=').status, 400);
  assert.equal(handleIndexQuery(docs, 'fields=unknown').status, 400);
  assert.equal(handleIndexQuery(docs, 'fields=title,unknown').status, 400);

  // E. Pagination contract (Section 12 & 13)
  // Boundary 1: limit=1
  const pSingle = handleIndexQuery(docs, 'page=1&limit=1');
  assert.equal(pSingle.status, 200);
  assert.equal(pSingle.body.count, 1);
  assert.equal(pSingle.body.pagination.totalPages, 148);

  // Boundary 2: limit=100 (max allowed)
  const pMax = handleIndexQuery(docs, 'page=1&limit=100');
  assert.equal(pMax.status, 200);
  assert.equal(pMax.body.count, 100);
  assert.equal(pMax.body.pagination.totalPages, 2);

  // Boundary 3: last page (page 2 with limit 100 has 48 items)
  const pLast = handleIndexQuery(docs, 'page=2&limit=100');
  assert.equal(pLast.status, 200);
  assert.equal(pLast.body.count, 48);

  // Out-of-bounds pagination returns HTTP 400
  const pOob = handleIndexQuery(docs, 'page=3&limit=100');
  assert.equal(pOob.status, 400);
  assert.match(pOob.body.error, /out of bounds/);

  // Invalid pagination bounds return HTTP 400
  assert.equal(handleIndexQuery(docs, 'page=0').status, 400);
  assert.equal(handleIndexQuery(docs, 'page=-1').status, 400);
  assert.equal(handleIndexQuery(docs, 'limit=0').status, 400);
  assert.equal(handleIndexQuery(docs, 'limit=101').status, 400);

  // F. Combined pagination + filtering (Section 14)
  const resPagingFilter = handleIndexQuery(docs, 'lang=fr&contentType=task&page=1&limit=5');
  assert.equal(resPagingFilter.status, 200);
  assert.equal(resPagingFilter.body.count, 5);
  assert.equal(resPagingFilter.body.pagination.total, 14);
  assert.equal(resPagingFilter.body.pagination.totalPages, 3);

  // G. Combined field selection + pagination (Section 15)
  const resAllCombined = handleIndexQuery(docs, 'contentType=concept&page=1&limit=5&fields=title,url');
  assert.equal(resAllCombined.status, 200);
  assert.equal(resAllCombined.body.count, 5);
  assert.equal(resAllCombined.body.pagination.total, 60);
  for (const doc of resAllCombined.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['title', 'url']);
  }

  // H. Deterministic ordering across runs (Section 16)
  const run1 = handleIndexQuery(docs, 'contentType=task&page=1&limit=10');
  const run2 = handleIndexQuery(docs, 'contentType=task&page=1&limit=10');
  assert.deepEqual(
    run1.body.documents.map((d) => d.url),
    run2.body.documents.map((d) => d.url)
  );
});
