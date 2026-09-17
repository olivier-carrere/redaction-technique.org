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
const globalCatalog = await fetch(`${devServer.baseUrl}/index.json`).then((r) => r.json());
const enCatalog = await fetch(`${devServer.baseUrl}/en/index.json`).then((r) => r.json());
const frCatalog = await fetch(`${devServer.baseUrl}/fr/index.json`).then((r) => r.json());

after(async () => {
  await devServer.stop();
});

// Normalization helper matching DocumentationExplorer client logic
function normalizeStr(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// ---------------------------------------------------------------------------
// 1. Rendered Explorer HTML in EN and FR
// ---------------------------------------------------------------------------

test('Documentation Explorer: rendered presence in EN and FR about-the-api pages', () => {
  const enHtmlPath = join(DIST, 'en', 'about-the-api', 'index.html');
  const frHtmlPath = join(DIST, 'fr', 'about-the-api', 'index.html');

  assert.ok(existsSync(enHtmlPath), 'EN about-the-api HTML must exist');
  assert.ok(existsSync(frHtmlPath), 'FR about-the-api HTML must exist');

  const enHtml = readFileSync(enHtmlPath, 'utf-8');
  const frHtml = readFileSync(frHtmlPath, 'utf-8');

  // Core container and elements presence
  for (const html of [enHtml, frHtml]) {
    assert.ok(html.includes('id="doc-explorer"'), 'Must render #doc-explorer container');
    assert.ok(html.includes('id="doc-explorer-search"'), 'Must render #doc-explorer-search input');
    assert.ok(html.includes('id="doc-explorer-filter-lang"'), 'Must render language select');
    assert.ok(html.includes('id="doc-explorer-filter-content-type"'), 'Must render contentType select');
    assert.ok(html.includes('id="doc-explorer-filter-page-type"'), 'Must render pageType select');
    assert.ok(html.includes('id="doc-explorer-count"'), 'Must render #doc-explorer-count element');
    assert.ok(html.includes('id="doc-explorer-copy-query-btn"'), 'Must render copy API query button');
    assert.ok(html.includes('id="doc-explorer-results"'), 'Must render results container');
    assert.ok(html.includes('id="doc-explorer-empty"'), 'Must render empty state container');
  }

  // EN UI localization
  assert.ok(enHtml.includes('Documentation Explorer'), 'EN page must include English heading');
  assert.ok(enHtml.includes('Search documentation topics'), 'EN search label must be present');
  assert.ok(enHtml.includes('Information type'), 'EN contentType label must be present');
  assert.ok(enHtml.includes('Copy API query'), 'EN copy API query button label must be present');

  // FR UI localization
  assert.ok(frHtml.includes('Explorateur de documentation'), 'FR page must include French heading');
  assert.ok(frHtml.includes('Rechercher dans les rubriques documentaires'), 'FR search label must be present');
  assert.ok(frHtml.includes("Type d&#39;information") || frHtml.includes("Type d'information"), 'FR contentType label must be present');
  assert.ok(frHtml.includes("Copier la requête d&#39;API") || frHtml.includes("Copier la requête d'API"), 'FR copy API query button label must be present');
});

// ---------------------------------------------------------------------------
// 2. Canonical Taxonomy Filters & Options
// ---------------------------------------------------------------------------

test('Documentation Explorer: filter options match canonical taxonomy definitions', () => {
  const schema = JSON.parse(readFileSync(join(DIST, 'schema.json'), 'utf-8'));
  const enHtml = readFileSync(join(DIST, 'en', 'about-the-api', 'index.html'), 'utf-8');

  // Content types
  for (const ct of schema.filters.contentType) {
    assert.ok(
      enHtml.includes(`value="${ct}"`),
      `Explorer filter must include canonical contentType "${ct}"`
    );
  }

  // Page types
  for (const pt of schema.filters.pageType) {
    assert.ok(
      enHtml.includes(`value="${pt}"`),
      `Explorer filter must include canonical pageType "${pt}"`
    );
  }

  // Locales
  for (const loc of schema.filters.lang) {
    assert.ok(
      enHtml.includes(`value="${loc}"`),
      `Explorer filter must include canonical locale "${loc}"`
    );
  }
});

// ---------------------------------------------------------------------------
// 3. Explorer Client Filter & Search Logic Verification
// ---------------------------------------------------------------------------

test('Documentation Explorer: search and filtering logic matches document corpus', () => {
  const docs = enCatalog.documents;

  // A. Text search for "dita"
  const ditaQuery = ['dita'];
  const ditaMatches = docs.filter((d) => {
    const hay = `${normalizeStr(d.title)} ${normalizeStr(d.description)} ${d.headings?.map((h) => normalizeStr(h.text)).join(' ')}`;
    return ditaQuery.every((q) => hay.includes(q));
  });
  assert.ok(ditaMatches.length > 5, 'Search for "dita" must return multiple matching topics');
  const ditaTask = ditaMatches.find((d) => d.url.includes('auto-insert-data-dita-xml'));
  assert.ok(ditaTask, 'Must find auto-insert-data-dita-xml in dita search results');
  assert.equal(ditaTask.contentType, 'task');
  assert.ok(ditaTask.markdown.endsWith('.md'));

  // B. Diacritic-insensitive matching: "redaction" vs "rédaction"
  const frDocs = frCatalog.documents;
  const diacriticQuery = ['redaction'];
  const diacriticMatches = frDocs.filter((d) => {
    const hay = `${normalizeStr(d.title)} ${normalizeStr(d.description)}`;
    return diacriticQuery.every((q) => hay.includes(q));
  });
  assert.ok(diacriticMatches.length > 0, 'Diacritic query "redaction" must match "rédaction" in French docs');

  // C. Filtering by contentType=task
  const taskDocs = docs.filter((d) => d.contentType === 'task');
  assert.equal(taskDocs.length, 14, 'English task topics count must equal 14');

  // D. Filtering by pageType=topic & contentType=concept
  const conceptTopics = docs.filter((d) => d.pageType === 'topic' && d.contentType === 'concept');
  assert.equal(conceptTopics.length, 30, 'English concept topics count must equal 30');

  // E. Untyped pages filtering (pageType=landing & contentType=null)
  const landingPages = docs.filter((d) => d.pageType === 'landing');
  assert.ok(landingPages.length > 0);
  for (const lp of landingPages) {
    assert.equal(lp.contentType, null, 'Landing page must be untyped (contentType null)');
  }

  // F. Empty state: query with no matches
  const nonExistentQuery = ['xyznonexistentterm999'];
  const noMatches = docs.filter((d) => {
    const hay = `${normalizeStr(d.title)} ${normalizeStr(d.description)}`;
    return nonExistentQuery.every((q) => hay.includes(q));
  });
  assert.equal(noMatches.length, 0, 'Non-existent search term must return 0 results');
});

// ---------------------------------------------------------------------------
// 4. Dual-Retrieval URL Integrity (HTML + Markdown)
// ---------------------------------------------------------------------------

test('Documentation Explorer: every returned record provides valid HTML and Markdown endpoints', () => {
  for (const doc of globalCatalog.documents) {
    // HTML URL
    assert.ok(doc.url.startsWith('https://docs.redaction-technique.org/'));
    assert.ok(doc.url.endsWith('/'));

    // Markdown URL
    assert.ok(doc.markdown.startsWith('https://docs.redaction-technique.org/'));
    assert.ok(doc.markdown.endsWith('.md'));

    // Corresponding files exist on disk
    const htmlRel = new URL(doc.url).pathname.replace(/^\//, '') + 'index.html';
    const mdRel = new URL(doc.markdown).pathname.replace(/^\//, '');

    assert.ok(existsSync(join(DIST, htmlRel)), `HTML file missing for ${doc.url}`);
    assert.ok(existsSync(join(DIST, mdRel)), `Markdown file missing for ${doc.markdown}`);
  }
});

// ---------------------------------------------------------------------------
// 5. Equivalent API Query URL generation
// ---------------------------------------------------------------------------

test('Documentation Explorer: equivalent API query URL generation matches schema contract', () => {
  const siteUrl = 'https://docs.redaction-technique.org';

  function buildEquivalentApiQuery(lang, contentType, pageType) {
    let baseEndpoint = `${siteUrl}/index.json`;
    const queryParams = new URLSearchParams();

    if (lang === 'en') {
      baseEndpoint = `${siteUrl}/en/index.json`;
    } else if (lang === 'fr') {
      baseEndpoint = `${siteUrl}/fr/index.json`;
    }

    if (contentType !== 'all') queryParams.set('contentType', contentType);
    if (pageType !== 'all') queryParams.set('pageType', pageType);
    queryParams.set('fields', 'title,url,markdown,contentType');

    const qs = queryParams.toString();
    return qs ? `${baseEndpoint}?${qs}` : baseEndpoint;
  }

  // Test permutations
  const q1 = buildEquivalentApiQuery('en', 'task', 'topic');
  assert.equal(
    q1,
    'https://docs.redaction-technique.org/en/index.json?contentType=task&pageType=topic&fields=title%2Curl%2Cmarkdown%2CcontentType'
  );

  const q2 = buildEquivalentApiQuery('fr', 'concept', 'all');
  assert.equal(
    q2,
    'https://docs.redaction-technique.org/fr/index.json?contentType=concept&fields=title%2Curl%2Cmarkdown%2CcontentType'
  );

  const q3 = buildEquivalentApiQuery('all', 'all', 'all');
  assert.equal(
    q3,
    'https://docs.redaction-technique.org/index.json?fields=title%2Curl%2Cmarkdown%2CcontentType'
  );
});

// ---------------------------------------------------------------------------
// 6. Discovery Switcher (Explorer ↔ Ask)
// ---------------------------------------------------------------------------

test('Discovery Switcher: presence, active state, and reciprocal navigation', () => {
  const enExpHtml = readFileSync(join(DIST, 'en', 'about-the-api', 'index.html'), 'utf-8');
  const frExpHtml = readFileSync(join(DIST, 'fr', 'about-the-api', 'index.html'), 'utf-8');
  const enAskHtml = readFileSync(join(DIST, 'en', 'ask', 'index.html'), 'utf-8');
  const frAskHtml = readFileSync(join(DIST, 'fr', 'ask', 'index.html'), 'utf-8');

  // Explorer pages: switcher present, Explore tab active
  for (const [html, lang] of [[enExpHtml, 'en'], [frExpHtml, 'fr']]) {
    assert.ok(html.includes('discovery-switcher'), `${lang} Explorer must contain discovery switcher`);
    assert.ok(html.includes(`href="/${lang}/about-the-api/"`) && html.includes('is-active'), `${lang} Explorer must highlight Explore tab`);
    assert.ok(html.includes(`href="/${lang}/ask/"`), `${lang} Explorer must link to Ask`);
  }

  // Ask pages: switcher present, Ask tab active
  for (const [html, lang] of [[enAskHtml, 'en'], [frAskHtml, 'fr']]) {
    assert.ok(html.includes('discovery-switcher'), `${lang} Ask must contain discovery switcher`);
    assert.ok(html.includes(`href="/${lang}/ask/"`) && html.includes('is-active'), `${lang} Ask must highlight Ask tab`);
    assert.ok(html.includes(`href="/${lang}/about-the-api/"`), `${lang} Ask must link to Explorer`);
  }
});

// ---------------------------------------------------------------------------
// 7. Ask Context Banner & Actionable Sources
// ---------------------------------------------------------------------------

test('Ask Assistant: context banner and source action affordances', () => {
  const enAskHtml = readFileSync(join(DIST, 'en', 'ask', 'index.html'), 'utf-8');
  const frAskHtml = readFileSync(join(DIST, 'fr', 'ask', 'index.html'), 'utf-8');

  for (const [html, lang] of [[enAskHtml, 'en'], [frAskHtml, 'fr']]) {
    assert.ok(html.includes('id="ask-context-banner"'), `${lang} Ask must render context banner element`);
    assert.ok(html.includes('id="ask-context-remove"'), `${lang} Ask must render remove context button`);
    assert.ok(html.includes('id="ask-context-title"'), `${lang} Ask must render context title element`);
    assert.ok(html.includes('id="ask-context-doc-link"'), `${lang} Ask must render context document link`);
  }
});

// ---------------------------------------------------------------------------
// 8. Document-Level Continuity (Topics vs. Landing/Utility pages)
// ---------------------------------------------------------------------------

test('Document continuity: question prompt rendered on topics and excluded from non-topics', () => {
  // Topics: must have prompt
  const enTopicHtml = readFileSync(join(DIST, 'en', 'tutorials', 'auto-insert-data-dita-xml', 'index.html'), 'utf-8');
  const frTopicHtml = readFileSync(join(DIST, 'fr', 'tutorials', 'auto-insert-data-dita-xml', 'index.html'), 'utf-8');

  assert.ok(enTopicHtml.includes('doc-ask-prompt'), 'EN topic must render doc-ask-prompt');
  assert.ok(enTopicHtml.includes('/en/ask/?doc='), 'EN topic prompt must link to /en/ask/ with doc param');
  assert.ok(enTopicHtml.includes('Have a question about this documentation?'), 'EN topic prompt must have question text');

  assert.ok(frTopicHtml.includes('doc-ask-prompt'), 'FR topic must render doc-ask-prompt');
  assert.ok(frTopicHtml.includes('/fr/ask/?doc='), 'FR topic prompt must link to /fr/ask/ with doc param');
  assert.ok(frTopicHtml.includes('Une question sur cette documentation ?'), 'FR topic prompt must have question text');

  // Landing / Index / Utility pages: must NOT have prompt
  const enLandingHtml = readFileSync(join(DIST, 'en', 'learn', 'index.html'), 'utf-8');
  const frLandingHtml = readFileSync(join(DIST, 'fr', 'learn', 'index.html'), 'utf-8');
  assert.ok(!enLandingHtml.includes('doc-ask-prompt'), 'EN landing page must not render doc-ask-prompt');
  assert.ok(!frLandingHtml.includes('doc-ask-prompt'), 'FR landing page must not render doc-ask-prompt');
});

