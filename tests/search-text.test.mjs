import test from 'node:test';
import assert from 'node:assert/strict';
import { normalise, tokenise, countMatches, stemFrench, queryTerms } from '../src/lib/search-text.ts';

test('French accented words stay whole when normalised', () => {
  for (const word of ['documentation', 'rédaction', 'réutilisation', 'génération', 'qualité']) {
    assert.equal(normalise(word), word);
    assert.deepEqual(tokenise(word, 'fr'), [word]);
  }
  assert.equal(normalise('Rédaction Technique'), 'rédaction technique');
});

test('Decomposed accents match their precomposed form', () => {
  const decomposed = 'qualité'; // "e" + combining acute accent
  assert.equal(normalise(decomposed), 'qualité');
  assert.equal(countMatches('Contrôle qualité', tokenise(decomposed, 'fr')), 1);
});

test("French question punctuation and stop words are removed", () => {
  assert.deepEqual(tokenise('Qu’est-ce que DITA XML ?', 'fr'), ['dita', 'xml']);
  assert.deepEqual(tokenise("Qu'est-ce que DITA XML ?", 'fr'), ['dita', 'xml']);
  assert.deepEqual(
    tokenise('Comment fonctionne la réutilisation du contenu ?', 'fr'),
    ['fonctionne', 'réutilisation', 'contenu'],
  );
});

test('Accented query terms match accented content', () => {
  const terms = tokenise('génération qualité', 'fr');
  assert.equal(countMatches('La génération du site et le contrôle qualité.', terms), 2);
});

test('English tokenisation is unchanged', () => {
  assert.deepEqual(tokenise('What is DITA XML?', 'en'), ['dita', 'xml']);
  assert.deepEqual(
    tokenise('How does docs-as-code work?', 'en'),
    ['docs', 'code', 'work'],
  );
  assert.equal(normalise('snake_case stays'), 'snake_case stays');
});

test('A query made only of stop words falls back to all tokens', () => {
  assert.deepEqual(tokenise('what is this', 'en'), ['what', 'is', 'this']);
});

test('French query terms are lightly stemmed so inflected forms match', () => {
  assert.deepEqual(queryTerms('documentation structurée', 'fr'), ['documentation', 'structur']);
  assert.deepEqual(queryTerms('contrôles automatisés', 'fr'), ['contrôl', 'automatis']);
  assert.deepEqual(queryTerms('qualité rédaction réutilisation génération', 'fr'),
    ['qualit', 'rédaction', 'réutilisation', 'génération']);
  assert.deepEqual(queryTerms("Qu'est-ce que DITA XML ?", 'fr'), ['dita', 'xml']);
  const terms = queryTerms('Quand utiliser une documentation structurée ?', 'fr');
  for (const form of ['structuré', 'structurés', 'structure', 'structurées']) {
    assert.ok(countMatches(`Formats ${form}`, terms) >= 1, form);
  }
});

test('Stemming never shortens a term below four characters and skips English', () => {
  assert.equal(stemFrench('docs'), 'docs');
  assert.equal(stemFrench('dita'), 'dita');
  assert.deepEqual(queryTerms('structured formats', 'en'), ['structured', 'formats']);
});
