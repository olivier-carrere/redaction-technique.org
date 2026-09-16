import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist', 'client');

test('API endpoints existence in dist/client', () => {
  const files = [
    'index.json',
    'en/index.json',
    'fr/index.json',
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
});

test('JSON index schema and document count', () => {
  const globalJson = JSON.parse(readFileSync(join(DIST, 'index.json'), 'utf-8'));
  const enJson = JSON.parse(readFileSync(join(DIST, 'en/index.json'), 'utf-8'));
  const frJson = JSON.parse(readFileSync(join(DIST, 'fr/index.json'), 'utf-8'));

  // Global index checks
  assert.equal(globalJson.version, '1.0');
  assert.equal(globalJson.count, 146);
  assert.equal(globalJson.counts.en, 73);
  assert.equal(globalJson.counts.fr, 73);
  assert.equal(globalJson.documents.length, 146);

  // EN index checks
  assert.equal(enJson.version, '1.0');
  assert.equal(enJson.locale, 'en');
  assert.equal(enJson.count, 73);
  assert.equal(enJson.documents.length, 73);

  // FR index checks
  assert.equal(frJson.version, '1.0');
  assert.equal(frJson.locale, 'fr');
  assert.equal(frJson.count, 73);
  assert.equal(frJson.documents.length, 73);

  // Validate document properties
  for (const doc of globalJson.documents) {
    assert.ok(doc.title, 'Document must have a title');
    assert.ok(doc.url.startsWith('https://docs.redaction-technique.org/'), `URL must be absolute: ${doc.url}`);
    assert.ok(doc.markdown.endsWith('.md'), `Markdown must point to .md endpoint: ${doc.markdown}`);
    assert.ok(['en', 'fr'].includes(doc.locale), `Locale must be en or fr: ${doc.locale}`);
    assert.ok(typeof doc.wordCount === 'number' && doc.wordCount >= 0, 'Document must have valid wordCount');
    assert.ok(Array.isArray(doc.headings), 'Headings must be an array');
    assert.ok(Array.isArray(doc.tags), 'Tags must be an array');
  }
});

test('Strict locale isolation in JSON indexes and sitemaps', () => {
  const enJson = JSON.parse(readFileSync(join(DIST, 'en/index.json'), 'utf-8'));
  const frJson = JSON.parse(readFileSync(join(DIST, 'fr/index.json'), 'utf-8'));

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
    { file: 'llms-full.txt', expectedCount: 146 },
    { file: 'llms-full-en.txt', expectedCount: 73 },
    { file: 'llms-full-fr.txt', expectedCount: 73 },
    { file: 'en/llms-full.txt', expectedCount: 73 },
    { file: 'fr/llms-full.txt', expectedCount: 73 },
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
