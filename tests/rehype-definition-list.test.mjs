import test from 'node:test';
import assert from 'node:assert/strict';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypeDefinitionList } from '../src/plugins/rehype-definition-list.mjs';

async function render(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDefinitionList)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

// Ordinary prose: a colon after inline content is mid-line, not a marker.

test('italic text followed by a colon stays a paragraph', async () => {
  const html = await render('*Git performs atomic commits*: each commit is recorded as a unit.');
  assert.equal(html, '<p><em>Git performs atomic commits</em>: each commit is recorded as a unit.</p>');
});

test('inline code followed by a colon stays a paragraph', async () => {
  const html = await render('`git add`: stages changes in the index.');
  assert.equal(html, '<p><code>git add</code>: stages changes in the index.</p>');
});

test('bold lead-in followed by a colon stays a paragraph', async () => {
  const html = await render('**Discover → Retrieve**: consumers fetch the clean source text.');
  assert.equal(html, '<p><strong>Discover → Retrieve</strong>: consumers fetch the clean source text.</p>');
});

test('italic text followed by a colon mid-sentence stays a paragraph', async () => {
  const html = await render('These changes are not moved to *test*: they remain in your workspace.');
  assert.doesNotMatch(html, /<dl/);
  assert.match(html, /^<p>These changes are not moved to <em>test<\/em>: they remain/);
});

test('French prose with a space before the colon stays a paragraph', async () => {
  for (const md of [
    'Git effectue des *commits* atomiques : il applique des lots de modifications.',
    'Voici un cas original d’utilisation des *conref* : imaginez un fichier confidentiel.',
    'Utilisez `git worktree` : cette commande associe un répertoire de travail.',
  ]) {
    const html = await render(md);
    assert.doesNotMatch(html, /<dl/, md);
  }
});

test('code span containing a colon is untouched', async () => {
  const html = await render('Run `git log --format=%h: %s` to list commits.');
  assert.equal(html, '<p>Run <code>git log --format=%h: %s</code> to list commits.</p>');
});

// Intended syntax: term on its own line, definition line starting with ": ".

test('bold term with definition on the next line becomes a definition list', async () => {
  const html = await render('**Conref**\n: A DITA XML mechanism for reusing a block of *content* by reference.');
  assert.equal(
    html,
    '<dl class="def-list"><dt><strong>Conref</strong></dt><dd>A DITA XML mechanism for reusing a block of <em>content</em> by reference.</dd></dl>'
  );
});

test('consecutive glossary entries share one definition list', async () => {
  const html = await render('**Ditamap**\n: A table of contents.\n\n**Ditaval**\n: A filter file.');
  assert.equal(
    html,
    '<dl class="def-list"><dt><strong>Ditamap</strong></dt><dd>A table of contents.</dd><dt><strong>Ditaval</strong></dt><dd>A filter file.</dd></dl>'
  );
});

test('plain term paragraph followed by a ": " paragraph becomes a definition list', async () => {
  const html = await render('DITA XML\n\n: A complex, semantic, modular XML document architecture.');
  assert.equal(
    html,
    '<dl class="def-list"><dt>DITA XML</dt><dd>A complex, semantic, modular XML document architecture.</dd></dl>'
  );
});

test('plain term with definition on the next line becomes a definition list', async () => {
  const html = await render('Git\n: A distributed version control system.');
  assert.equal(html, '<dl class="def-list"><dt>Git</dt><dd>A distributed version control system.</dd></dl>');
});

test('French glossary entry keeps inline formatting in term and definition', async () => {
  const html = await render('**Référentiel**\n: Lieu de stockage des sources, par exemple un dépôt `Git`.');
  assert.equal(
    html,
    '<dl class="def-list"><dt><strong>Référentiel</strong></dt><dd>Lieu de stockage des sources, par exemple un dépôt <code>Git</code>.</dd></dl>'
  );
});
