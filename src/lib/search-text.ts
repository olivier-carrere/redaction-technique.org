/**
 * Text normalisation and tokenisation for the documentation search.
 *
 * Kept free of data imports so it can be unit-tested directly.
 */

/**
 * Normalise a string for comparison: lowercase, strip punctuation.
 *
 * Letters and digits are matched with Unicode property escapes rather than
 * `\w`, which is ASCII-only and would split accented words ("rédaction" →
 * "r daction"). NFC composition makes precomposed and decomposed accents
 * compare equal.
 */
export function normalise(text: string): string {
  return text.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}_\s]/gu, ' ');
}

const ENGLISH_STOP_WORDS = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'does',
  'for', 'from', 'how', 'i', 'in', 'is', 'it', 'my', 'of', 'on', 'or', 'the',
  'to', 'what', 'which', 'who', 'will', 'with', 'you', 'your', 'this', 'that'
]);

const FRENCH_STOP_WORDS = new Set([
  'au', 'aux', 'avec', 'ce', 'ces', 'cet', 'cette', 'dans', 'de', 'des', 'du',
  'elle', 'elles', 'en', 'et', 'eux', 'il', 'ils', 'je', 'la', 'le', 'les',
  'leur', 'leurs', 'lui', 'ma', 'mais', 'me', 'même', 'mes', 'mon', 'ni', 'nos',
  'notre', 'nous', 'on', 'ou', 'où', 'par', 'pas', 'pour', 'qu', 'que', 'qui',
  'sa', 'se', 'si', 'son', 'sur', 'ta', 'te', 'tes', 'ton', 'tu', 'un', 'une',
  'vos', 'votre', 'vous', 'y',
  // Question words and forms of "être", matching the English list's
  // how/what/which/is/are ("Qu'est-ce que…", "Comment…", "Quel est…").
  'est', 'sont', 'être', 'comment', 'quel', 'quelle', 'quels', 'quelles', 'quoi'
]);

/** Tokenise a string into unique meaningful words (≥ 2 chars). */
export function tokenise(text: string, lang: 'en' | 'fr' = 'en'): string[] {
  const stopWords = lang === 'fr' ? FRENCH_STOP_WORDS : ENGLISH_STOP_WORDS;
  const allTokens = [...new Set(
    normalise(text)
      .split(/\s+/)
      .filter((w) => w.length >= 2),
  )];
  const contentTokens = allTokens.filter((w) => !stopWords.has(w));
  return contentTokens.length > 0 ? contentTokens : allTokens;
}

/** Count how many times any of `terms` appears in `text`. */
export function countMatches(text: string, terms: string[]): number {
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
 * Strip common French inflectional endings from a query term: plural -s/-x,
 * then feminine -e, then past-participle -é ("structurées" → "structur").
 * Because `countMatches` scans for substrings, the stem then matches every
 * inflected form in the content (structure, structuré, structurés…). Stems
 * are never shorter than four characters.
 */
export function stemFrench(term: string): string {
  let stem = term;
  if (stem.length > 4 && /[sx]$/.test(stem)) stem = stem.slice(0, -1);
  if (stem.length > 4 && stem.endsWith('e')) stem = stem.slice(0, -1);
  if (stem.length > 4 && stem.endsWith('é')) stem = stem.slice(0, -1);
  return stem;
}

/** Search terms for a query: tokens, plus light stemming for French. */
export function queryTerms(query: string, lang: 'en' | 'fr' = 'en'): string[] {
  const tokens = tokenise(query, lang);
  return lang === 'fr' ? [...new Set(tokens.map(stemFrench))] : tokens;
}
