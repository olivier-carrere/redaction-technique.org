import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  getPageMarkdown,
  getCanonicalUrl,
  getMarkdownUrl,
  resolveLink,
  SITE_URL,
} from '../src/lib/page-markdown.ts';

test('getCanonicalUrl and getMarkdownUrl', () => {
  assert.equal(getCanonicalUrl('en'), 'https://docs.redaction-technique.org/en/');
  assert.equal(getCanonicalUrl('fr'), 'https://docs.redaction-technique.org/fr/');
  assert.equal(getCanonicalUrl('en/about-this-blog'), 'https://docs.redaction-technique.org/en/about-this-blog/');
  assert.equal(getCanonicalUrl('fr/tech-writing-process/sql-database'), 'https://docs.redaction-technique.org/fr/tech-writing-process/sql-database/');

  assert.equal(getMarkdownUrl('en'), '/en.md');
  assert.equal(getMarkdownUrl('fr'), '/fr.md');
  assert.equal(getMarkdownUrl('en/about-this-blog'), '/en/about-this-blog.md');
  assert.equal(getMarkdownUrl('fr/tech-writing-process/sql-database'), '/fr/tech-writing-process/sql-database.md');
});

test('resolveLink maintains language context', () => {
  const enCanonical = 'https://docs.redaction-technique.org/en/formats/modular-documentation/';
  const frCanonical = 'https://docs.redaction-technique.org/fr/formats/modular-documentation/';

  // Relative with ../..
  assert.equal(
    resolveLink('../../tech-writing-process/target-format/', enCanonical, SITE_URL, 'en'),
    'https://docs.redaction-technique.org/en/tech-writing-process/target-format/'
  );
  assert.equal(
    resolveLink('../../tech-writing-process/target-format/', frCanonical, SITE_URL, 'fr'),
    'https://docs.redaction-technique.org/fr/tech-writing-process/target-format/'
  );

  // Top-level section link without ../
  assert.equal(
    resolveLink('tech-writing-process/sql-database/', enCanonical, SITE_URL, 'en'),
    'https://docs.redaction-technique.org/en/tech-writing-process/sql-database/'
  );
  assert.equal(
    resolveLink('tech-writing-process/sql-database/', frCanonical, SITE_URL, 'fr'),
    'https://docs.redaction-technique.org/fr/tech-writing-process/sql-database/'
  );

  // Assets
  assert.equal(
    resolveLink('/assets/diagram.webp', enCanonical, SITE_URL, 'en'),
    'https://docs.redaction-technique.org/assets/diagram.webp'
  );

  // External & anchor links
  assert.equal(
    resolveLink('https://github.com/test', enCanonical, SITE_URL, 'en'),
    'https://github.com/test'
  );
  assert.equal(
    resolveLink('#overview', enCanonical, SITE_URL, 'en'),
    '#overview'
  );
});

test('getPageMarkdown preserves code blocks and does not mutate code content', () => {
  const doc = {
    id: 'en/test-code',
    data: { title: 'Code Block Test' },
    body: `
Here is a bash code block:

\`\`\`bash
# Install dependencies
npm install astro
npm run build
\`\`\`

Here is XML with unescaped tags inside code:

\`\`\`xml
<topic id="my-topic">
  <title>Topic Title</title>
  <body><p>Some text</p></body>
</topic>
\`\`\`

And inline \`<custom-element>\` code: \`const a = <Test />;\`.
    `.trim(),
  };

  const md = getPageMarkdown(doc);

  // Verify fences
  assert.match(md, /```bash\n# Install dependencies\nnpm install astro\nnpm run build\n```/);
  assert.match(md, /```xml\n<topic id="my-topic">\n  <title>Topic Title<\/title>\n  <body><p>Some text<\/p><\/body>\n<\/topic>\n```/);
  assert.match(md, /`const a = <Test \/>;`/);
  assert.match(md, /Source: https:\/\/docs\.redaction-technique\.org\/en\/test-code\//);
});

test('getPageMarkdown transforms Starlight admonitions and Asides', () => {
  const enDoc = {
    id: 'en/test-admonitions',
    data: { title: 'Admonition Test' },
    body: `
:::note
This is a plain note.
Second line of note.
:::

:::tip[Performance Tip]
Remember to cache static assets.
:::

:::caution[Attention Needed]
Do not delete the root key.
:::

<Aside type="danger" title="Critical Warning">
System will shut down.
</Aside>
    `.trim(),
  };

  const mdEn = getPageMarkdown(enDoc);
  assert.match(mdEn, /> \*\*Note\*\*\n>\n> This is a plain note\.\n> Second line of note\./);
  assert.match(mdEn, /> \*\*Tip: Performance Tip\*\*\n>\n> Remember to cache static assets\./);
  assert.match(mdEn, /> \*\*Caution: Attention Needed\*\*\n>\n> Do not delete the root key\./);
  assert.match(mdEn, /> \*\*Danger: Critical Warning\*\*\n>\n> System will shut down\./);

  const frDoc = {
    id: 'fr/test-admonitions',
    data: { title: 'Test Avertissements' },
    body: `
:::tip[Astuce utile]
Texte de l'astuce en français.
:::

:::caution[Attention]
Zone sensible.
:::
    `.trim(),
  };

  const mdFr = getPageMarkdown(frDoc);
  assert.match(mdFr, /> \*\*Astuce: Astuce utile\*\*\n>\n> Texte de l'astuce en français\./);
  assert.match(mdFr, /> \*\*Attention\*\*\n>\n> Zone sensible\./);
});

test('getPageMarkdown transforms Starlight components (CardGrid, LinkCard, Tabs, Steps, diagrams)', () => {
  const doc = {
    id: 'en/test-components',
    data: { title: 'Components Test' },
    body: `
<CardGrid>
  <LinkCard title="Getting Started" href="tech-writing-process/project-definition/" description="How to begin." />
  <LinkCard title="Next Steps" href="https://example.com/external" description="External resource." />
</CardGrid>

<Steps>
1. Step one
2. Step two
</Steps>

<Tabs>
  <TabItem label="NPM">
    \`\`\`bash
    npm install
    \`\`\`
  </TabItem>
  <TabItem label="PNPM">
    \`\`\`bash
    pnpm install
    \`\`\`
  </TabItem>
</Tabs>

<SingleRepositoryDiagram />
**Single Repository**
    `.trim(),
  };

  const md = getPageMarkdown(doc);

  // LinkCard converted to list items with resolved URLs
  assert.match(md, /- \[\*\*Getting Started\*\*\]\(https:\/\/docs\.redaction-technique\.org\/en\/tech-writing-process\/project-definition\/\): How to begin\./);
  assert.match(md, /- \[\*\*Next Steps\*\*\]\(https:\/\/example\.com\/external\): External resource\./);

  // Steps tag removed, numbered list preserved
  assert.doesNotMatch(md, /<\/?Steps>/);
  assert.match(md, /1\. Step one\n2\. Step two/);

  // Tabs converted to tab headings
  assert.doesNotMatch(md, /<\/?Tabs>/);
  assert.match(md, /#### Tab: NPM/);
  assert.match(md, /#### Tab: PNPM/);

  // Native SVG diagram replaced by its accessible text alternative; the
  // caption line that follows stays outside the blockquote.
  assert.doesNotMatch(md, /<SingleRepositoryDiagram/);
  assert.match(md, /> \*\*Diagram: Single repository feeding multiple deliverables\*\*\n>\n> Diagram showing a single documentation repository feeding six deliverable formats/);
  assert.match(md, /deliverable formats: [^\n]*animation\.\n\n\*\*Single Repository\*\*/);

  const mdFr = getPageMarkdown({ ...doc, id: 'fr/test-components' });
  assert.match(mdFr, /> \*\*Schéma: Un référentiel unique alimentant plusieurs livrables\*\*/);
});

test('getPageMarkdown transforms InformationType component', () => {
  const enDoc = {
    id: 'en/test-info-type',
    data: { title: 'Information Type Test' },
    body: `
<InformationType type="concept" />
Content follows.
    `.trim(),
  };
  const enMd = getPageMarkdown(enDoc);
  assert.match(enMd, /\*\*Information type:\*\* \[Concept\]\(https:\/\/docs\.redaction-technique\.org\/en\/toolkit\/information-types\/\)/);

  const frDoc = {
    id: 'fr/test-info-type',
    data: { title: 'Test Typologie' },
    body: `
<InformationType type="task" />
Le contenu suit.
    `.trim(),
  };
  const frMd = getPageMarkdown(frDoc);
  assert.match(frMd, /\*\*Type d'information :\*\* \[Tâche\]\(https:\/\/docs\.redaction-technique\.org\/fr\/toolkit\/information-types\/\)/);
});

test('getPageMarkdown preserves French accents and special characters', () => {
  const doc = {
    id: 'fr/test-accents',
    data: { title: 'Régex et caractères accentués' },
    body: `
Voici du texte avec des accents : été, à côté de l'île, où le garçon a reçu 50 €.
Des guillemets français « comme ceci » et tirets cadratins — comme cela.

\`\`\`python
# Commentaire en français : vérification d'élégance
def saluer(nom: str) -> str:
    return f"Bonjour {nom} !"
\`\`\`
    `.trim(),
  };

  const md = getPageMarkdown(doc);
  assert.match(md, /# Régex et caractères accentués/);
  assert.match(md, /Voici du texte avec des accents : été, à côté de l'île, où le garçon a reçu 50 €\./);
  assert.match(md, /Des guillemets français « comme ceci » et tirets cadratins — comme cela\./);
  assert.match(md, /# Commentaire en français : vérification d'élégance/);
});

test('Generated static build verification', () => {
  const root = process.cwd();
  const enMdPath = join(root, 'dist', 'client', 'en.md');
  const frMdPath = join(root, 'dist', 'client', 'fr.md');
  const enPageMdPath = join(root, 'dist', 'client', 'en', 'about-this-blog.md');
  const frPageMdPath = join(root, 'dist', 'client', 'fr', 'about-this-blog.md');

  assert.ok(existsSync(enMdPath), 'dist/client/en.md must exist');
  assert.ok(existsSync(frMdPath), 'dist/client/fr.md must exist');
  assert.ok(existsSync(enPageMdPath), 'dist/client/en/about-this-blog.md must exist');
  assert.ok(existsSync(frPageMdPath), 'dist/client/fr/about-this-blog.md must exist');

  const enMd = readFileSync(enPageMdPath, 'utf8');
  const frMd = readFileSync(frPageMdPath, 'utf8');

  // Verify title and source
  assert.ok(enMd.startsWith('# About Olivier Carrère'));
  assert.ok(frMd.startsWith('# À propos d\'Olivier Carrère'));
  assert.ok(enMd.includes('Source: https://docs.redaction-technique.org/en/about-this-blog/'));
  assert.ok(frMd.includes('Source: https://docs.redaction-technique.org/fr/about-this-blog/'));

  // Verify absence of site chrome in Markdown
  assert.ok(!enMd.includes('<nav'));
  assert.ok(!enMd.includes('starlight__sidebar'));
  assert.ok(!enMd.includes('Search documentation'));
  assert.ok(!enMd.includes('Select language'));

  // Verify HTML output contains the actions
  const enHtmlPath = join(root, 'dist', 'client', 'en', 'about-this-blog', 'index.html');
  const frHtmlPath = join(root, 'dist', 'client', 'fr', 'about-this-blog', 'index.html');
  assert.ok(existsSync(enHtmlPath));
  assert.ok(existsSync(frHtmlPath));

  const enHtml = readFileSync(enHtmlPath, 'utf8');
  const frHtml = readFileSync(frHtmlPath, 'utf8');

  assert.ok(enHtml.includes('Copy for LLM'));
  assert.ok(enHtml.includes('View as Markdown'));
  assert.ok(enHtml.includes('data-markdown-url="/en/about-this-blog.md"'));
  assert.ok(enHtml.includes('rel="alternate" type="text/markdown"'));

  assert.ok(frHtml.includes('Copier pour le LLM'));
  assert.ok(frHtml.includes('Voir en Markdown'));
  assert.ok(frHtml.includes('data-markdown-url="/fr/about-this-blog.md"'));
  assert.ok(frHtml.includes('rel="alternate" type="text/markdown"'));
});
