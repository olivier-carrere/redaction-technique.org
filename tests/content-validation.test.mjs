import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  CONTENT_TYPES,
  PAGE_TYPES,
  isTypedTopic,
  validatePageContent,
} from '../src/lib/content-types.ts';

/**
 * Simple frontmatter parser for markdown/mdx content.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const result = {};
  for (const line of lines) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      } else if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      } else if (val === 'false') {
        val = false;
      } else if (val === 'true') {
        val = true;
      }
      result[m[1]] = val;
    }
  }
  return result;
}

function walkDocs(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDocs(fullPath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

test('Canonical content types definition', () => {
  assert.deepEqual([...CONTENT_TYPES], ['concept', 'task', 'reference']);
  assert.ok(PAGE_TYPES.includes('topic'));
  assert.ok(PAGE_TYPES.includes('landing'));
  assert.ok(PAGE_TYPES.includes('overview'));
  assert.ok(PAGE_TYPES.includes('index'));
  assert.ok(PAGE_TYPES.includes('utility'));
});

test('Valid contentType validation on documentation topics', () => {
  // Concept
  const resConcept = validatePageContent(
    { title: 'My Concept', contentType: 'concept' },
    'en/tech-writing-process/my-concept.mdx'
  );
  assert.equal(resConcept.valid, true);
  assert.equal(resConcept.isTypedTopic, true);
  assert.equal(resConcept.errors.length, 0);

  // Task
  const resTask = validatePageContent(
    { title: 'My Task', contentType: 'task' },
    'en/tutorials/my-task.mdx'
  );
  assert.equal(resTask.valid, true);
  assert.equal(resTask.isTypedTopic, true);
  assert.equal(resTask.errors.length, 0);

  // Reference
  const resRef = validatePageContent(
    { title: 'My Reference', contentType: 'reference' },
    'en/reference/my-reference.mdx'
  );
  assert.equal(resRef.valid, true);
  assert.equal(resRef.isTypedTopic, true);
  assert.equal(resRef.errors.length, 0);
});

test('Invalid contentType values fail validation on documentation topics', () => {
  // Missing value where typed topic is expected
  const resMissing = validatePageContent(
    { title: 'Topic Without Type' },
    'en/tech-writing-process/missing-type.mdx'
  );
  assert.equal(resMissing.valid, false);
  assert.equal(resMissing.isTypedTopic, true);
  assert.ok(resMissing.errors.some(e => e.includes('Missing required frontmatter property "contentType"')));

  // Empty string
  const resEmpty = validatePageContent(
    { title: 'Topic With Empty Type', contentType: '' },
    'en/tech-writing-process/empty-type.mdx'
  );
  assert.equal(resEmpty.valid, false);
  assert.equal(resEmpty.isTypedTopic, true);
  assert.ok(resEmpty.errors.some(e => e.includes('Missing required frontmatter property "contentType"')));

  // contentType: tutorial
  const resTutorial = validatePageContent(
    { title: 'Tutorial Topic', contentType: 'tutorial' },
    'en/tutorials/tutorial-topic.mdx'
  );
  assert.equal(resTutorial.valid, false);
  assert.equal(resTutorial.isTypedTopic, true);
  assert.ok(resTutorial.errors.some(e => e.includes('Invalid contentType "tutorial"')));

  // contentType: Concept (capitalized)
  const resCap = validatePageContent(
    { title: 'Capitalized Concept', contentType: 'Concept' },
    'en/tech-writing-process/capital-concept.mdx'
  );
  assert.equal(resCap.valid, false);
  assert.equal(resCap.isTypedTopic, true);
  assert.ok(resCap.errors.some(e => e.includes('Invalid contentType "Concept"')));

  // contentType: howto
  const resHowto = validatePageContent(
    { title: 'Howto Topic', contentType: 'howto' },
    'en/tech-writing-process/howto.mdx'
  );
  assert.equal(resHowto.valid, false);
  assert.equal(resHowto.isTypedTopic, true);
  assert.ok(resHowto.errors.some(e => e.includes('Invalid contentType "howto"')));
});

test('Intentionally untyped pages remain valid without contentType', () => {
  // Section index (e.g. toolkit/index.mdx)
  const resIndex = validatePageContent(
    { title: 'Toolkit Index', tableOfContents: false },
    'en/toolkit/index.mdx'
  );
  assert.equal(resIndex.valid, true);
  assert.equal(resIndex.isTypedTopic, false);
  assert.equal(resIndex.errors.length, 0);

  // Splash landing page (e.g. index.mdx)
  const resSplash = validatePageContent(
    { title: 'Home', template: 'splash' },
    'en/index.mdx'
  );
  assert.equal(resSplash.valid, true);
  assert.equal(resSplash.isTypedTopic, false);
  assert.equal(resSplash.errors.length, 0);

  // Landing page with explicit pageType: landing
  const resLanding = validatePageContent(
    { title: 'Learn technical writing', pageType: 'landing' },
    'en/learn.mdx'
  );
  assert.equal(resLanding.valid, true);
  assert.equal(resLanding.isTypedTopic, false);
  assert.equal(resLanding.errors.length, 0);

  // Architectural overview with pageType: overview
  const resOverview = validatePageContent(
    { title: 'System Overview', pageType: 'overview' },
    'en/architecture-overview.mdx'
  );
  assert.equal(resOverview.valid, true);
  assert.equal(resOverview.isTypedTopic, false);
  assert.equal(resOverview.errors.length, 0);

  // Utility page with pageType: utility
  const resUtility = validatePageContent(
    { title: 'Ask Assistant', pageType: 'utility' },
    'en/ask.mdx'
  );
  assert.equal(resUtility.valid, true);
  assert.equal(resUtility.isTypedTopic, false);
  assert.equal(resUtility.errors.length, 0);

  // Section index that optionally specifies valid contentType (e.g. costs/index.mdx)
  const resIndexWithType = validatePageContent(
    { title: 'Costs Overview', contentType: 'concept' },
    'en/costs/index.mdx'
  );
  assert.equal(resIndexWithType.valid, true);
  assert.equal(resIndexWithType.isTypedTopic, false);
  assert.equal(resIndexWithType.errors.length, 0);

  // Untyped page that specifies an INVALID contentType must still fail
  const resIndexWithInvalidType = validatePageContent(
    { title: 'Bad Index', contentType: 'invalid-type' },
    'en/costs/index.mdx'
  );
  assert.equal(resIndexWithInvalidType.valid, false);
  assert.ok(resIndexWithInvalidType.errors.some(e => e.includes('Invalid contentType "invalid-type"')));
});

test('Live repository content validation across all 148 documentation pages', () => {
  const docsRoot = join(process.cwd(), 'src', 'content', 'docs');
  const allDocs = walkDocs(docsRoot);
  assert.equal(allDocs.length, 148, 'Must validate exactly 148 documentation pages');

  const failureList = [];
  let typedCount = 0;
  let untypedCount = 0;

  for (const docPath of allDocs) {
    const rawContent = readFileSync(docPath, 'utf8');
    const fm = parseFrontmatter(rawContent);
    const relPath = relative(docsRoot, docPath).replace(/\\/g, '/');

    const result = validatePageContent(fm, relPath);
    if (result.isTypedTopic) {
      typedCount++;
    } else {
      untypedCount++;
    }

    if (!result.valid) {
      failureList.push({ file: relPath, errors: result.errors });
    }
  }

  assert.equal(
    failureList.length,
    0,
    `Validation errors in repository:\n${JSON.stringify(failureList, null, 2)}`
  );
  assert.ok(typedCount > 100, `Expected over 100 typed topics, got ${typedCount}`);
  assert.ok(untypedCount > 10, `Expected over 10 untyped pages, got ${untypedCount}`);
});
