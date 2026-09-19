/**
 * Lightweight text-search over the documentation index.
 *
 * Uses a simple term-frequency scoring approach with weight boosts for
 * title and description matches.  Good enough for ~50 pages; can be
 * replaced with a vector/embedding index when the corpus grows.
 */

import indexDataEn from '../data/search-index-en.json';
import indexDataFr from '../data/search-index-fr.json';
import { queryTerms, countMatches } from './search-text';

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

const docsEn: DocEntry[] = indexDataEn as DocEntry[];
const docsFr: DocEntry[] = indexDataFr as DocEntry[];

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
 * @param query      – the user's natural-language question
 * @param maxResults – maximum results to return (default 5)
 * @param lang       – which language index to search ('en' or 'fr', default 'en')
 */
export function searchDocs(query: string, maxResults = 5, lang: 'en' | 'fr' = 'en'): SearchResult[] {
  const docs = lang === 'fr' ? docsFr : docsEn;
  const terms = queryTerms(query, lang);
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

/**
 * Retrieve a specific document from the search index by URL.
 */
export function getDocByUrl(url: string, lang: 'en' | 'fr' = 'en'): DocEntry | undefined {
  const docs = lang === 'fr' ? docsFr : docsEn;
  const cleanUrl = url.replace(/\/+$/, '');
  return docs.find((d) => {
    const docClean = d.url.replace(/\/+$/, '');
    return docClean === cleanUrl || docClean.endsWith(cleanUrl) || cleanUrl.endsWith(docClean);
  });
}
