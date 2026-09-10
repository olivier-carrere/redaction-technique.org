/**
 * Lightweight text-search over the documentation index.
 *
 * Uses a simple term-frequency scoring approach with weight boosts for
 * title and description matches.  Good enough for ~50 pages; can be
 * replaced with a vector/embedding index when the corpus grows.
 */

import indexData from '../data/search-index.json';

export interface DocEntry {
  title: string;
  description: string;
  slug: string;
  url: string;
  content: string;
}

export interface SearchResult {
  title: string;
  url: string;
  excerpt: string;
  score: number;
}

const docs: DocEntry[] = indexData as DocEntry[];

/** Normalise a string for comparison: lowercase, strip punctuation. */
function normalise(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ');
}

const ENGLISH_STOP_WORDS = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'does',
  'for', 'from', 'how', 'i', 'in', 'is', 'it', 'my', 'of', 'on', 'or', 'the',
  'to', 'what', 'which', 'who', 'will', 'with', 'you', 'your', 'this', 'that'
]);

/** Tokenise a string into unique meaningful words (≥ 2 chars). */
function tokenise(text: string): string[] {
  const allTokens = [...new Set(
    normalise(text)
      .split(/\s+/)
      .filter((w) => w.length >= 2),
  )];
  const contentTokens = allTokens.filter((w) => !ENGLISH_STOP_WORDS.has(w));
  return contentTokens.length > 0 ? contentTokens : allTokens;
}

/** Count how many times any of `terms` appears in `text`. */
function countMatches(text: string, terms: string[]): number {
  const normalised = normalise(text);
  let count = 0;
  for (const term of terms) {
    // Use a simple scan: count non-overlapping occurrences
    let idx = 0;
    while ((idx = normalised.indexOf(term, idx)) !== -1) {
      count++;
      idx += term.length;
    }
  }
  return count;
}

/**
 * Extract a relevant excerpt from content.
 * Tries to find a window around the first matching term.
 */
function extractExcerpt(content: string, terms: string[], maxLen = 500): string {
  const lower = content.toLowerCase();
  let bestPos = -1;

  for (const term of terms) {
    const pos = lower.indexOf(term);
    if (pos !== -1 && (bestPos === -1 || pos < bestPos)) {
      bestPos = pos;
    }
  }

  if (bestPos === -1) {
    // No match found; return the beginning
    return content.slice(0, maxLen).trim();
  }

  // Start a bit before the match for context
  const start = Math.max(0, bestPos - 80);
  const end = Math.min(content.length, start + maxLen);
  let excerpt = content.slice(start, end).trim();

  if (start > 0) excerpt = '…' + excerpt;
  if (end < content.length) excerpt = excerpt + '…';

  return excerpt;
}

/**
 * Search the documentation index and return the top results.
 *
 * @param query  – the user's natural-language question
 * @param maxResults – maximum results to return (default 5)
 */
export function searchDocs(query: string, maxResults = 5): SearchResult[] {
  const terms = tokenise(query);
  if (terms.length === 0) return [];

  const scored = docs.map((doc) => {
    const titleHits = countMatches(doc.title, terms);
    const descHits  = countMatches(doc.description, terms);
    const bodyHits  = countMatches(doc.content, terms);

    const score = titleHits * 10 + descHits * 5 + bodyHits;

    return {
      title: doc.title,
      url: doc.url,
      excerpt: extractExcerpt(doc.content, terms),
      score,
    };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}
