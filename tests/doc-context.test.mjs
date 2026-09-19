import test from 'node:test';
import assert from 'node:assert/strict';
import { safeDocPath, SITE_ORIGIN } from '../src/lib/doc-context.ts';

test('internal documentation paths are accepted in both locales', () => {
  for (const path of ['/en/process/', '/fr/process/', '/en/', '/fr/', '/en/tech-writing-process/project-definition/', '/fr/toolkit/example-cicd-pipeline']) {
    assert.equal(safeDocPath(path), path, path);
  }
});

test('the existing ?doc= producers still yield an internal path', () => {
  // Page pagination passes the encoded pathname; URLSearchParams decodes it.
  const fromPagination = new URLSearchParams('doc=%2Fen%2Fcosts%2F&title=Costs').get('doc');
  assert.equal(safeDocPath(fromPagination), '/en/costs/');
  // The documentation explorer passes the page's canonical URL.
  assert.equal(safeDocPath(`${SITE_ORIGIN}/fr/formats/modular-documentation/`), '/fr/formats/modular-documentation/');
  // A preview deployment's own origin is accepted when passed in.
  assert.equal(safeDocPath('https://preview.example.app/en/costs/', 'https://preview.example.app'), '/en/costs/');
});

test('script, data and other schemes are rejected', () => {
  for (const value of ['javascript:alert(1)', 'JavaScript:alert(1)', ' javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)', 'mailto:someone@example.com', 'file:///etc/passwd']) {
    assert.equal(safeDocPath(value), null, value);
  }
});

test('protocol-relative and external URLs are rejected', () => {
  for (const value of ['//example.com/', '//example.com/en/costs/', 'https://example.com/', 'https://example.com/en/costs/', 'http://docs.redaction-technique.org/en/costs/', `${SITE_ORIGIN}.evil.com/en/costs/`, `${SITE_ORIGIN}@evil.com/en/costs/`, '/\\example.com/', '\\\\example.com/']) {
    assert.equal(safeDocPath(value), null, value);
  }
});

test('paths outside the documentation format are rejected', () => {
  for (const value of ['', '/', 'en/costs/', '/de/costs/', '/api/ask', '/en/../api/ask', '/en/%2e%2e/api/', '/en/costs/?x=1', '/en/costs/#top', '/EN/costs/', '/en//costs/', null, undefined]) {
    assert.equal(safeDocPath(value), null, String(value));
  }
});
