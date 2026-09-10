/**
 * Build-time script: generates a JSON search index of all English documentation
 * pages for the "Ask the documentation" AI assistant.
 *
 * Usage:  node scripts/build-search-index.mjs
 *
 * Output: src/data/search-index.json
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DOCS_DIR = join(process.cwd(), 'src', 'content', 'docs', 'en');
const OUT_DIR  = join(process.cwd(), 'src', 'data');
const OUT_FILE = join(OUT_DIR, 'search-index.json');
const MAX_CONTENT_LENGTH = 3000;

/** Recursively collect all .mdx files under `dir`. */
function collectMdxFiles(dir) {
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

  // Remove Mermaid component blocks (entire <Mermaid ... /> including code={`...`})
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

  // Remove Starlight admonition markers (:::tip, :::note, etc.) but keep content
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

// ── Main ──────────────────────────────────────────────────────────────────────

const files = collectMdxFiles(DOCS_DIR);

const index = files.map((filePath) => {
  const raw = readFileSync(filePath, 'utf-8');

  const slug = relative(DOCS_DIR, filePath)
    .replace(/\.mdx$/, '')
    .split(sep)
    .join('/');

  const url   = `/en/${slug}/`;
  const title = frontmatterValue(raw, 'title');
  const description = frontmatterValue(raw, 'description');

  let content = cleanBody(raw);
  if (content.length > MAX_CONTENT_LENGTH) {
    content = content.slice(0, MAX_CONTENT_LENGTH);
  }

  return { title, description, slug, url, content };
});

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(index, null, 2), 'utf-8');

console.log(`✔ Search index built: ${index.length} pages → ${OUT_FILE}`);
