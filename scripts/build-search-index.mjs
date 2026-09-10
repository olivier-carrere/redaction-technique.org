/**
 * Build-time script: generates a JSON search index of all English documentation
 * pages for the "Ask the documentation" AI assistant.
 *
 * Usage:  node scripts/build-search-index.mjs
 *
 * Output: src/data/search-index.json
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DOCS_DIR_EN = join(process.cwd(), 'src', 'content', 'docs', 'en');
const DOCS_DIR_FR = join(process.cwd(), 'src', 'content', 'docs', 'fr');
const OUT_DIR     = join(process.cwd(), 'src', 'data');
const MAX_CONTENT_LENGTH = 3000;

/** Recursively collect all .mdx files under `dir`. */
function collectMdxFiles(dir) {
  if (!existsSync(dir)) return [];
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(full));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(full);
    }
  }
  return results;
}

/** Extract YAML frontmatter value for a simple key (single-line string). */
function frontmatterValue(raw, key) {
  const re = new RegExp(`^${key}:\\s*"(.+)"`, 'm');
  const m = raw.match(re);
  if (m) return m[1];
  // Try unquoted
  const re2 = new RegExp(`^${key}:\\s*(.+)`, 'm');
  const m2 = raw.match(re2);
  return m2 ? m2[1].trim().replace(/^["']|["']$/g, '') : '';
}

/** Strip everything that is not meaningful prose from the MDX body. */
function cleanBody(raw) {
  // Remove frontmatter
  let text = raw.replace(/^---[\s\S]*?---\s*/m, '');

  // Remove import statements
  text = text.replace(/^import\s+.*$/gm, '');

  // Remove Mermaid component blocks
  text = text.replace(/<Mermaid[\s\S]*?\/>/g, '');

  // Remove self-closing JSX/HTML components (<Component ... />)
  text = text.replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, '');

  // Remove JSX/HTML component open+close blocks (<Component>...</Component>)
  text = text.replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, '');

  // Remove remaining HTML tags (but keep their content)
  text = text.replace(/<\/?[a-zA-Z][^>]*>/g, '');

  // Remove Markdown image syntax
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');

  // Simplify Markdown links: [text](url) → text
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

  // Remove fenced code blocks with mermaid
  text = text.replace(/```mermaid[\s\S]*?```/g, '');

  // Remove Starlight admonition markers
  text = text.replace(/^:::\w+\s*$/gm, '');
  text = text.replace(/^:::\s*$/gm, '');

  // Simplify heading markers
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove bold/italic markers
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');

  // Remove inline code backticks
  text = text.replace(/`([^`]+)`/g, '$1');

  // Collapse multiple blank lines
  text = text.replace(/\n{3,}/g, '\n\n');

  // Trim
  text = text.trim();

  return text;
}

function buildIndexForLang(docsDir, langPrefix) {
  const files = collectMdxFiles(docsDir);
  return files.map((filePath) => {
    const raw = readFileSync(filePath, 'utf-8');

    const slug = relative(docsDir, filePath)
      .replace(/\.mdx$/, '')
      .split(sep)
      .join('/');

    const url   = `/${langPrefix}/${slug}/`;
    const title = frontmatterValue(raw, 'title');
    const description = frontmatterValue(raw, 'description');

    let content = cleanBody(raw);
    if (content.length > MAX_CONTENT_LENGTH) {
      content = content.slice(0, MAX_CONTENT_LENGTH);
    }

    return { title, description, slug, url, content };
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

mkdirSync(OUT_DIR, { recursive: true });

const indexEn = buildIndexForLang(DOCS_DIR_EN, 'en');
const indexFr = buildIndexForLang(DOCS_DIR_FR, 'fr');

const outFileEn = join(OUT_DIR, 'search-index-en.json');
const outFileFr = join(OUT_DIR, 'search-index-fr.json');
const outFileLegacy = join(OUT_DIR, 'search-index.json');

writeFileSync(outFileEn, JSON.stringify(indexEn, null, 2), 'utf-8');
writeFileSync(outFileFr, JSON.stringify(indexFr, null, 2), 'utf-8');
writeFileSync(outFileLegacy, JSON.stringify(indexEn, null, 2), 'utf-8');

console.log(`✔ Search index built (EN): ${indexEn.length} pages → ${outFileEn}`);
console.log(`✔ Search index built (FR): ${indexFr.length} pages → ${outFileFr}`);
