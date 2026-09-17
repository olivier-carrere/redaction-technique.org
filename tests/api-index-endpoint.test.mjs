// Regression coverage for the /index.json, /en/index.json, and /fr/index.json
// endpoints, exercised over real HTTP rather than by calling the filtering
// function directly.
//
// Why this file exists: the routes in src/pages/{,en/,fr/}index.json.ts used
// to set `export const prerender = true` while reading `url.searchParams`.
// Astro prerenders that route exactly once at build time (with no request
// query string), so Vercel served one static JSON file for every query
// string a client appended — `?contentType=task` silently returned the
// whole corpus instead of 400/filtered results. The filtering logic itself
// (handleIndexQuery in src/lib/document-resource.ts) was always correct;
// the existing contract tests reimplement or call that logic in-process, so
// none of them touch the actual HTTP route and none of them could have
// caught this. This file specifically closes that gap:
//
//   1. A build-output check that the three routes are NOT static files —
//      the direct guard against a future accidental `prerender = true`.
//   2. Real `fetch()` calls against a live `astro dev` server, proving
//      query-string filtering and validation actually happen per request.
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { startAstroDevServer } from './helpers/astro-server.mjs';

const DIST = join(process.cwd(), 'dist', 'client');

const ENDPOINTS = [
  { path: 'index.json', label: 'global' },
  { path: 'en/index.json', label: 'en' },
  { path: 'fr/index.json', label: 'fr' },
];

// ---------------------------------------------------------------------------
// 1. Build-output regression guard (no server required)
// ---------------------------------------------------------------------------

test('index.json endpoints are not static build artifacts (prerender regression guard)', () => {
  for (const { path, label } of ENDPOINTS) {
    const diskPath = join(DIST, path);
    assert.ok(
      !existsSync(diskPath),
      `[${label}] /${path} must NOT exist as a static file in dist/client. ` +
        `Finding one here means \`prerender = true\` was reintroduced in ` +
        `src/pages/${path.replace('index.json', '').replace(/\/$/, '') || ''}index.json.ts, ` +
        'which bakes a single build-time response and makes Vercel ignore ' +
        'every query string a client sends.'
    );
  }
});

// ---------------------------------------------------------------------------
// 2. Request-time behavior over real HTTP
// ---------------------------------------------------------------------------

const devServer = await startAstroDevServer();
after(async () => {
  await devServer.stop();
});

async function getJson(path) {
  const res = await fetch(`${devServer.baseUrl}/${path}`);
  return { status: res.status, body: await res.json() };
}

for (const { path, label } of ENDPOINTS) {
  test(`[${label}] /${path}: unfiltered request returns the complete corpus`, async () => {
    const { status, body } = await getJson(path);
    assert.equal(status, 200);
    assert.ok(Array.isArray(body.documents));
    assert.ok(body.documents.length > 0, 'unfiltered corpus must not be empty');
    // Sanity check this isn't accidentally pre-filtered by a stray default.
    const distinctContentTypes = new Set(body.documents.map((d) => d.contentType));
    assert.ok(
      distinctContentTypes.size > 1,
      `unfiltered corpus should contain more than one contentType, got: ${[...distinctContentTypes]}`
    );
  });

  for (const contentType of ['task', 'concept', 'reference']) {
    test(`[${label}] /${path}?contentType=${contentType} returns only ${contentType} entries`, async () => {
      const unfiltered = await getJson(path);
      const filtered = await getJson(`${path}?contentType=${contentType}`);

      assert.equal(filtered.status, 200);
      assert.ok(filtered.body.documents.length > 0, `expected at least one ${contentType} document`);
      for (const doc of filtered.body.documents) {
        assert.equal(doc.contentType, contentType, `leaked non-${contentType} document: ${doc.url}`);
      }

      // Regression-specific assertion: a filtered request must produce a
      // genuinely different response than the unfiltered baseline. Before
      // the fix, every query string returned byte-identical output.
      assert.ok(
        filtered.body.documents.length < unfiltered.body.documents.length,
        `filtering by contentType=${contentType} must return fewer documents than the unfiltered baseline ` +
          `(got ${filtered.body.documents.length} filtered vs ${unfiltered.body.documents.length} unfiltered — ` +
          'identical counts mean the query string was ignored)'
      );
    });
  }

  test(`[${label}] /${path}?pageType=topic returns only topic entries`, async () => {
    const { status, body } = await getJson(`${path}?pageType=topic`);
    assert.equal(status, 200);
    assert.ok(body.documents.length > 0);
    for (const doc of body.documents) {
      assert.equal(doc.pageType, 'topic', `leaked non-topic document: ${doc.url}`);
    }
  });

  test(`[${label}] /${path}?pageType=topic&contentType=task applies both filters (AND)`, async () => {
    const { status, body } = await getJson(`${path}?pageType=topic&contentType=task`);
    assert.equal(status, 200);
    assert.ok(body.documents.length > 0);
    for (const doc of body.documents) {
      assert.equal(doc.pageType, 'topic');
      assert.equal(doc.contentType, 'task');
    }
  });

  test(`[${label}] /${path}?contentType=bogus-value follows the established invalid-value contract`, async () => {
    const { status, body } = await getJson(`${path}?contentType=bogus-value`);
    // Established contract (handleIndexQuery in src/lib/document-resource.ts,
    // and /schema.json's queryParameters.contentType.allowed): invalid
    // values return HTTP 400 with the canonical allowed list, not a silent
    // 200 with the unfiltered (or any) corpus.
    assert.equal(status, 400, `invalid contentType must return 400, got ${status}`);
    assert.equal(body.error, 'Invalid contentType');
    assert.deepEqual(body.allowed, ['concept', 'task', 'reference']);
  });

  test(`[${label}] /${path}: two distinct query variants produce genuinely different responses`, async () => {
    const task = await getJson(`${path}?contentType=task`);
    const concept = await getJson(`${path}?contentType=concept`);

    assert.notEqual(
      JSON.stringify(task.body.documents.map((d) => d.url).sort()),
      JSON.stringify(concept.body.documents.map((d) => d.url).sort()),
      'contentType=task and contentType=concept must not return the same document set'
    );
  });
}

// ---------------------------------------------------------------------------
// 3. Pagination and field selection
// ---------------------------------------------------------------------------
//
// Scoped to /en/index.json only: the filtering tests above already prove
// all three locale endpoints share the same query-handling code path
// (handleIndexQuery in src/lib/document-resource.ts), so pagination and
// field selection don't need re-testing per locale to catch a regression.

test('/en/index.json?limit=5 returns exactly 5 documents and reflects the limit in pagination metadata', async () => {
  const unfiltered = await getJson('en/index.json');
  const { status, body } = await getJson('en/index.json?limit=5');

  assert.equal(status, 200);
  assert.equal(body.documents.length, 5, 'limit=5 must return exactly 5 documents');
  assert.equal(body.count, 5);
  assert.ok(body.pagination, 'a paginated request must include pagination metadata');
  assert.equal(body.pagination.limit, 5, 'pagination.limit must reflect the requested limit');
  assert.equal(body.pagination.page, 1, 'page defaults to 1 when only limit is given');
  assert.equal(
    body.pagination.total,
    unfiltered.body.documents.length,
    'pagination.total must match the full corpus size'
  );
});

test('/en/index.json?page=2&limit=5 returns a different document sequence than page 1', async () => {
  const page1 = await getJson('en/index.json?page=1&limit=5');
  const page2 = await getJson('en/index.json?page=2&limit=5');

  assert.equal(page1.status, 200);
  assert.equal(page2.status, 200);
  assert.equal(page2.body.documents.length, 5);
  assert.equal(page2.body.pagination.page, 2);
  assert.equal(page2.body.pagination.limit, 5);

  const page1Urls = page1.body.documents.map((d) => d.url);
  const page2Urls = page2.body.documents.map((d) => d.url);

  assert.notDeepEqual(page2Urls, page1Urls, 'page 2 must not return the same document sequence as page 1');
  assert.equal(
    page1Urls.filter((u) => page2Urls.includes(u)).length,
    0,
    'page 1 and page 2 must not share any documents (not just a reorder)'
  );
});

test('/en/index.json?fields=title,url projects only the requested fields', async () => {
  const { status, body } = await getJson('en/index.json?fields=title,url');

  assert.equal(status, 200);
  assert.ok(body.documents.length > 0);
  for (const doc of body.documents) {
    assert.deepEqual(
      Object.keys(doc).sort(),
      ['title', 'url'],
      `projected document must contain only the requested fields, got: ${JSON.stringify(Object.keys(doc))}`
    );
    assert.equal(typeof doc.title, 'string');
    assert.equal(typeof doc.url, 'string');
  }
});
