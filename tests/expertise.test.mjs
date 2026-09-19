import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { slug as githubSlug } from 'github-slugger';
import {
  EXPERTISE_AREAS,
  expertiseAnchor,
  getExpertiseAreaForEntry,
} from '../src/lib/expertise.ts';

const docsRoot = join(import.meta.dirname, '..', 'src', 'content', 'docs');
const LANGS = ['en', 'fr'];

function entryExists(lang, slug) {
  return (
    existsSync(join(docsRoot, lang, `${slug}.mdx`)) ||
    existsSync(join(docsRoot, lang, slug, 'index.mdx'))
  );
}

/** Body of the `## heading` section, up to the next H2. */
function section(body, heading) {
  const lines = body.split('\n');
  const start = lines.findIndex((line) => line === `## ${heading}`);
  if (start === -1) return null;
  const end = lines.findIndex((line, i) => i > start && line.startsWith('## '));
  return lines.slice(start + 1, end === -1 ? undefined : end).join('\n');
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith('.mdx') ? [full] : [];
  });
}

test('every evidence slug exists in both locales and belongs to one area', () => {
  const seen = new Map();
  for (const area of EXPERTISE_AREAS) {
    for (const slug of area.evidence) {
      for (const lang of LANGS) {
        assert.ok(entryExists(lang, slug), `${area.id}: missing ${lang}/${slug}`);
      }
      assert.ok(!seen.has(slug), `${slug} is listed in both ${seen.get(slug)} and ${area.id}`);
      seen.set(slug, area.id);
    }
  }
});

test('expertise anchors match the heading IDs Starlight generates', () => {
  for (const area of EXPERTISE_AREAS) {
    for (const lang of LANGS) {
      assert.equal(expertiseAnchor(area, lang), githubSlug(area.label[lang]));
    }
  }
});

test('each expertise page section links all of its evidence', () => {
  for (const lang of LANGS) {
    const body = readFileSync(join(docsRoot, lang, 'expertise.mdx'), 'utf8');
    for (const area of EXPERTISE_AREAS) {
      const text = section(body, area.label[lang]);
      assert.ok(text !== null, `${lang}/expertise.mdx: missing "## ${area.label[lang]}"`);
      for (const slug of area.evidence) {
        assert.ok(
          text.includes(`](/${lang}/${slug}/)`),
          `${lang}/expertise.mdx "${area.label[lang]}" does not link /${lang}/${slug}/`,
        );
      }
    }
  }
});

test('links to expertise sections use existing anchors', () => {
  const anchors = new Set([
    ...LANGS.flatMap((lang) => EXPERTISE_AREAS.map((area) => `/${lang}/expertise/#${expertiseAnchor(area, lang)}`)),
    // The "Selected work" section heading, linked from the homepages.
    '/en/expertise/#selected-work',
    '/fr/expertise/#travaux-choisis',
  ]);
  for (const file of walk(docsRoot)) {
    const links = readFileSync(file, 'utf8').match(/\/(?:en|fr)\/expertise\/#[^)'"\s]+/g) ?? [];
    for (const link of links) {
      assert.ok(anchors.has(link), `${file}: unknown expertise anchor ${link}`);
    }
  }
});

test('entries resolve to their expertise area in either locale', () => {
  assert.equal(getExpertiseAreaForEntry('en/formats/nufirewall-case-study')?.id, 'structured-authoring');
  assert.equal(getExpertiseAreaForEntry('fr/formats/nufirewall-case-study')?.id, 'structured-authoring');
  assert.equal(getExpertiseAreaForEntry('en/formats')?.id, 'structured-authoring');
  assert.equal(getExpertiseAreaForEntry('en/learn'), undefined);
  assert.equal(getExpertiseAreaForEntry(undefined), undefined);
});
