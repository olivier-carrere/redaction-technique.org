import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { startAstroDevServer } from './helpers/astro-server.mjs';

const DIST = join(process.cwd(), 'dist', 'client');

// index.json, en/index.json, and fr/index.json are rendered on demand
// (prerender = false — see src/pages/{,en/,fr/}index.json.ts) so their
// unfiltered baseline is no longer a static file in dist/client. Fetch it
// once from a real dev server and reuse it below.
const devServer = await startAstroDevServer();
const globalJson = await fetch(`${devServer.baseUrl}/index.json`).then((r) => r.json());
const enJson = await fetch(`${devServer.baseUrl}/en/index.json`).then((r) => r.json());
const frJson = await fetch(`${devServer.baseUrl}/fr/index.json`).then((r) => r.json());

after(async () => {
  await devServer.stop();
});

// ---------------------------------------------------------------------------
// Pure Black-Box Consumer Query Simulator (Zero production code imports)
// ---------------------------------------------------------------------------

function simulateConsumerContractQuery(catalogDocs, queryString, schema) {
  const params = new URLSearchParams(queryString);
  const allowedContentTypes = schema.filters.contentType;
  const allowedPageTypes = schema.filters.pageType;
  const allowedLangs = schema.filters.lang;
  const allowedFields = schema.queryParameters.fields.allowed;

  const contentType = params.get('contentType');
  if (contentType !== null && !allowedContentTypes.includes(contentType)) {
    return {
      status: 400,
      body: {
        error: `Invalid contentType "${contentType}". Allowed values: ${allowedContentTypes.join(', ')}`,
        allowed: allowedContentTypes,
      },
    };
  }

  const pageType = params.get('pageType');
  if (pageType !== null && !allowedPageTypes.includes(pageType)) {
    return {
      status: 400,
      body: {
        error: `Invalid pageType "${pageType}". Allowed values: ${allowedPageTypes.join(', ')}`,
        allowed: allowedPageTypes,
      },
    };
  }

  const lang = params.get('lang');
  if (lang !== null && !allowedLangs.includes(lang)) {
    return {
      status: 400,
      body: {
        error: `Invalid lang "${lang}". Allowed values: ${allowedLangs.join(', ')}`,
        allowed: allowedLangs,
      },
    };
  }

  const fieldsParam = params.get('fields');
  let selectedFields = null;
  if (fieldsParam !== null) {
    const rawTokens = fieldsParam.split(',').map((s) => s.trim()).filter(Boolean);
    if (rawTokens.length === 0) {
      return { status: 400, body: { error: 'Empty fields parameter' } };
    }
    const invalidField = rawTokens.find((f) => !allowedFields.includes(f));
    if (invalidField) {
      return { status: 400, body: { error: `Invalid field "${invalidField}"` } };
    }
    selectedFields = [...new Set(rawTokens)];
  }

  // Filter
  let filtered = catalogDocs;
  if (lang) {
    filtered = filtered.filter((d) => d.locale === lang);
  }
  if (contentType) {
    filtered = filtered.filter((d) => d.contentType === contentType);
  }
  if (pageType) {
    filtered = filtered.filter((d) => d.pageType === pageType);
  }

  const total = filtered.length;

  // Pagination
  const pageParam = params.get('page');
  const limitParam = params.get('limit');
  let pagedDocs = filtered;
  let pagination = null;

  if (pageParam !== null || limitParam !== null) {
    const pageNum = pageParam !== null ? parseInt(pageParam, 10) : 1;
    const limitNum = limitParam !== null ? parseInt(limitParam, 10) : 20;

    if (isNaN(pageNum) || pageNum < 1) {
      return { status: 400, body: { error: 'Invalid page parameter' } };
    }
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return { status: 400, body: { error: 'Invalid limit parameter' } };
    }

    const totalPages = Math.max(1, Math.ceil(total / limitNum));
    if (pageNum > totalPages) {
      return { status: 400, body: { error: `Page ${pageNum} out of bounds (totalPages: ${totalPages})` } };
    }

    const start = (pageNum - 1) * limitNum;
    pagedDocs = filtered.slice(start, start + limitNum);
    pagination = {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
    };
  }

  // Field projection
  let resultDocs = pagedDocs;
  if (selectedFields) {
    resultDocs = pagedDocs.map((doc) => {
      const projected = {};
      for (const f of selectedFields) {
        if (doc[f] !== undefined) projected[f] = doc[f];
      }
      return projected;
    });
  }

  const enCount = filtered.filter((d) => d.locale === 'en').length;
  const frCount = filtered.filter((d) => d.locale === 'fr').length;

  return {
    status: 200,
    body: {
      count: resultDocs.length,
      counts: { en: enCount, fr: frCount },
      documents: resultDocs,
      taxonomy: schema.taxonomy,
      ...(pagination ? { pagination } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// 1. Schema self-consistency & Endpoint existence
// ---------------------------------------------------------------------------

test('Black-box audit: /schema.json structure and endpoint verification on disk', async () => {
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

  // Verify that EVERY advertised endpoint exists and is non-empty.
  // `index` endpoints are rendered on demand (prerender = false — see
  // src/pages/{,en/,fr/}index.json.ts) so they are intentionally absent
  // from dist/client; verify those live instead of on disk.
  for (const [locale, epGroup] of Object.entries(schema.endpoints)) {
    for (const [name, url] of Object.entries(epGroup)) {
      assert.ok(url.startsWith('https://docs.redaction-technique.org/'), `URL must have production origin: ${url}`);
      const relativePath = new URL(url).pathname.replace(/^\//, '');

      if (name === 'index') {
        const res = await fetch(`${devServer.baseUrl}/${relativePath}`);
        assert.equal(res.status, 200, `Advertised endpoint [${locale}.${name}] ${url} did not respond 200`);
        const body = await res.text();
        assert.ok(body.length > 0, `Advertised endpoint [${locale}.${name}] is empty`);
        continue;
      }

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
// 2. Document URL integrity, Locale Isolation & Artifact Verification
// ---------------------------------------------------------------------------

test('Black-box audit: document URL integrity and strict locale isolation', () => {
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
// 3. Markdown URL integrity & Full Corpus Byte-for-Byte Fidelity
// ---------------------------------------------------------------------------

test('Black-box audit: Markdown retrieval integrity across all 148 documents and llms-full.txt', () => {
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
// 4. Metadata integrity & Document Schema compliance
// ---------------------------------------------------------------------------

test('Black-box audit: document metadata compliance against /schema.json schema', () => {
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));
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

  assert.equal(topicCount, 118, 'Corpus must contain exactly 118 typed topics');
  assert.equal(untypedCount, 30, 'Corpus must contain exactly 30 intentionally untyped pages');
});

// ---------------------------------------------------------------------------
// 5. Taxonomy consistency across all endpoints
// ---------------------------------------------------------------------------

test('Black-box audit: taxonomy consistency between schema.json and indexes', () => {
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));
  assert.deepEqual(globalJson.taxonomy, schema.taxonomy);
  assert.deepEqual(enJson.taxonomy, schema.taxonomy);
  assert.deepEqual(frJson.taxonomy, schema.taxonomy);
});

// ---------------------------------------------------------------------------
// 6. Independent Consumer Simulation (EN & FR)
// ---------------------------------------------------------------------------

test('Black-box consumer simulation: discover API, filter tasks, retrieve Markdown without codebase dependencies', () => {
  // Step 1: GET /schema.json
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));

  // Step 2: Discover contentType=task
  const contentTypes = schema.filters.contentType;
  assert.ok(contentTypes.includes('task'), 'Consumer expects "task" in available content types');

  // --- English consumer workflow ---
  // Step 3: Discover English index endpoint
  const enIndexUrl = schema.endpoints.en.index;
  assert.equal(enIndexUrl, 'https://docs.redaction-technique.org/en/index.json');

  // Step 4: Fetch /en/index.json (rendered on demand; the module-level
  // `enJson` fixture is this exact endpoint, fetched live at the top of
  // this file — see the comment near the top for why it's not a disk read)
  const enCatalog = enJson;

  // Step 5: Filter documents where contentType === 'task'
  const taskDocsEn = enCatalog.documents.filter((d) => d.contentType === 'task');
  assert.equal(taskDocsEn.length, 14, 'Consumer expects 14 task documents in English');

  // Step 6: Select verified task document
  const selectedDocEn = taskDocsEn.find((d) => d.url.includes('auto-insert-data-dita-xml'));
  assert.ok(selectedDocEn, 'Target task document must be present in EN');
  assert.equal(selectedDocEn.contentType, 'task');

  // Step 7: Read advertised markdown URL
  const mdUrlEn = selectedDocEn.markdown;
  assert.ok(mdUrlEn.endsWith('.md'));

  // Step 8: Retrieve Markdown directly from disk/endpoint
  const mdRelEn = new URL(mdUrlEn).pathname.replace(/^\//, '');
  const markdownTextEn = readFileSync(join(DIST, mdRelEn), 'utf-8');

  // Step 9: Verify retrieved document matches index metadata
  assert.ok(markdownTextEn.startsWith(`# ${selectedDocEn.title}`));
  assert.ok(markdownTextEn.length > 50);

  // --- French consumer workflow ---
  const frIndexUrl = schema.endpoints.fr.index;
  assert.equal(frIndexUrl, 'https://docs.redaction-technique.org/fr/index.json');

  // Fetch /fr/index.json (rendered on demand — same `frJson` fixture as above)
  const frCatalog = frJson;

  const taskDocsFr = frCatalog.documents.filter((d) => d.contentType === 'task');
  assert.equal(taskDocsFr.length, 14, 'Consumer expects 14 task documents in French');

  const selectedDocFr = taskDocsFr.find((d) => d.url.includes('auto-insert-data-dita-xml'));
  assert.ok(selectedDocFr, 'Target task document must be present in FR');
  assert.equal(selectedDocFr.contentType, 'task');

  const mdRelFr = new URL(selectedDocFr.markdown).pathname.replace(/^\//, '');
  const markdownTextFr = readFileSync(join(DIST, mdRelFr), 'utf-8');
  assert.ok(markdownTextFr.startsWith(`# ${selectedDocFr.title}`));
  assert.ok(markdownTextFr.length > 50);
});

// ---------------------------------------------------------------------------
// 7. Query Engine Contract Audit against Schema Specification
// ---------------------------------------------------------------------------

test('Black-box query engine audit: filtering, zero-result, HTTP 400 validation, fields, and pagination', () => {
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));
  const docs = globalJson.documents;

  // A. Filter contract
  for (const ct of schema.filters.contentType) {
    const res = simulateConsumerContractQuery(docs, `contentType=${ct}`, schema);
    assert.equal(res.status, 200);
    assert.ok(res.body.count > 0);
    for (const doc of res.body.documents) {
      assert.equal(doc.contentType, ct);
    }
  }

  // Combined AND filtering
  const resCombined = simulateConsumerContractQuery(docs, 'pageType=topic&contentType=task&lang=en', schema);
  assert.equal(resCombined.status, 200);
  assert.equal(resCombined.body.count, 14);
  for (const doc of resCombined.body.documents) {
    assert.equal(doc.pageType, 'topic');
    assert.equal(doc.contentType, 'task');
    assert.equal(doc.locale, 'en');
  }

  // B. Zero-result behavior: intentionally untyped page cannot have contentType=task
  const resZero = simulateConsumerContractQuery(docs, 'pageType=landing&contentType=task', schema);
  assert.equal(resZero.status, 200);
  assert.equal(resZero.body.count, 0);
  assert.equal(resZero.body.counts.en, 0);
  assert.equal(resZero.body.counts.fr, 0);
  assert.deepEqual(resZero.body.documents, []);
  assert.deepEqual(resZero.body.taxonomy, schema.taxonomy);

  // C. Invalid filter behavior
  const invalidQueries = [
    'contentType=invalid',
    'contentType=Concept',
    'pageType=invalid',
    'pageType=Topic',
    'lang=es',
    'lang=EN',
  ];
  for (const q of invalidQueries) {
    const res = simulateConsumerContractQuery(docs, q, schema);
    assert.equal(res.status, 400, `Expected 400 for ${q}`);
    assert.ok(typeof res.body.error === 'string');
    assert.ok(Array.isArray(res.body.allowed));
  }

  // D. Field selection contract
  const resFields = simulateConsumerContractQuery(docs, 'contentType=concept&fields=title,url,markdown,contentType', schema);
  assert.equal(resFields.status, 200);
  for (const doc of resFields.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['contentType', 'markdown', 'title', 'url']);
  }

  // Field selection with whitespace normalization (?fields=title,%20url)
  const resSpace = simulateConsumerContractQuery(docs, 'fields=title, url', schema);
  assert.equal(resSpace.status, 200);
  for (const doc of resSpace.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['title', 'url']);
  }

  // Field selection deduplication (?fields=title,title)
  const resDedup = simulateConsumerContractQuery(docs, 'fields=title,title', schema);
  assert.equal(resDedup.status, 200);
  for (const doc of resDedup.body.documents) {
    assert.deepEqual(Object.keys(doc), ['title']);
  }

  // Field selection invalid fields
  assert.equal(simulateConsumerContractQuery(docs, 'fields=', schema).status, 400);
  assert.equal(simulateConsumerContractQuery(docs, 'fields=unknown', schema).status, 400);
  assert.equal(simulateConsumerContractQuery(docs, 'fields=title,unknown', schema).status, 400);

  // E. Pagination contract
  // Boundary 1: limit=1
  const pSingle = simulateConsumerContractQuery(docs, 'page=1&limit=1', schema);
  assert.equal(pSingle.status, 200);
  assert.equal(pSingle.body.count, 1);
  assert.equal(pSingle.body.pagination.totalPages, 148);

  // Boundary 2: limit=100 (max allowed)
  const pMax = simulateConsumerContractQuery(docs, 'page=1&limit=100', schema);
  assert.equal(pMax.status, 200);
  assert.equal(pMax.body.count, 100);
  assert.equal(pMax.body.pagination.totalPages, 2);

  // Boundary 3: last page (page 2 with limit 100 has 48 items)
  const pLast = simulateConsumerContractQuery(docs, 'page=2&limit=100', schema);
  assert.equal(pLast.status, 200);
  assert.equal(pLast.body.count, 48);

  // Out-of-bounds pagination returns HTTP 400
  const pOob = simulateConsumerContractQuery(docs, 'page=3&limit=100', schema);
  assert.equal(pOob.status, 400);
  assert.match(pOob.body.error, /out of bounds/);

  // Invalid pagination bounds return HTTP 400
  assert.equal(simulateConsumerContractQuery(docs, 'page=0', schema).status, 400);
  assert.equal(simulateConsumerContractQuery(docs, 'page=-1', schema).status, 400);
  assert.equal(simulateConsumerContractQuery(docs, 'limit=0', schema).status, 400);
  assert.equal(simulateConsumerContractQuery(docs, 'limit=101', schema).status, 400);

  // F. Combined pagination + filtering
  const resPagingFilter = simulateConsumerContractQuery(docs, 'lang=fr&contentType=task&page=1&limit=5', schema);
  assert.equal(resPagingFilter.status, 200);
  assert.equal(resPagingFilter.body.count, 5);
  assert.equal(resPagingFilter.body.pagination.total, 14);
  assert.equal(resPagingFilter.body.pagination.totalPages, 3);

  // G. Combined field selection + pagination
  const resAllCombined = simulateConsumerContractQuery(docs, 'contentType=concept&page=1&limit=5&fields=title,url', schema);
  assert.equal(resAllCombined.status, 200);
  assert.equal(resAllCombined.body.count, 5);
  assert.equal(resAllCombined.body.pagination.total, 58);
  for (const doc of resAllCombined.body.documents) {
    assert.deepEqual(Object.keys(doc).sort(), ['title', 'url']);
  }

  // H. Deterministic ordering across runs
  const run1 = simulateConsumerContractQuery(docs, 'contentType=task&page=1&limit=10', schema);
  const run2 = simulateConsumerContractQuery(docs, 'contentType=task&page=1&limit=10', schema);
  assert.deepEqual(
    run1.body.documents.map((d) => d.url),
    run2.body.documents.map((d) => d.url)
  );
});
