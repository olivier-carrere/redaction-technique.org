import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { DIAGRAM_TEXT } from '../src/components/diagrams/diagram-text.ts';

const DOCS_DIR = 'src/content/docs';
const DIAGRAMS_DIR = 'src/components/diagrams';

function listMdx(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return listMdx(path);
    return entry.name.endsWith('.mdx') ? [path] : [];
  });
}

test('every diagram used in content has an EN and FR accessible title', () => {
  for (const file of listMdx(DOCS_DIR)) {
    const body = readFileSync(file, 'utf8');
    for (const [, name] of body.matchAll(/^import (\w+) from '[^']*components\/diagrams\/\w+\.astro';$/gm)) {
      const entry = DIAGRAM_TEXT[name];
      assert.ok(entry, `${file}: ${name} has no DIAGRAM_TEXT entry`);
      assert.ok(entry.en?.title && entry.fr?.title, `${name}: missing EN or FR title`);
    }
  }
});

test('every DIAGRAM_TEXT entry maps to a diagram component that reads it', () => {
  for (const name of Object.keys(DIAGRAM_TEXT)) {
    const path = join(DIAGRAMS_DIR, `${name}.astro`);
    assert.ok(existsSync(path), `${name}: component file missing`);
    assert.match(readFileSync(path, 'utf8'), new RegExp(`DIAGRAM_TEXT\\.${name}\\[lang\\]`), `${name}: component does not read its DIAGRAM_TEXT entry`);
  }
});

test('no Mermaid source remains in content', () => {
  for (const file of listMdx(DOCS_DIR)) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /<Mermaid\b|```mermaid/, file);
  }
});
