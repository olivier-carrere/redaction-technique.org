/**
 * POST /api/ask  —  "Ask the documentation" AI assistant endpoint.
 *
 * Receives a natural-language question, searches the documentation index,
 * sends the most relevant excerpts to an LLM, and returns a grounded answer
 * with source links.
 */

import type { APIRoute } from 'astro';
import { searchDocs } from '../../lib/search';
import { createLLMProvider } from '../../lib/llm';
import type { SourceInfo } from '../../lib/llm';

// This route must be server-rendered (not pre-rendered at build time).
export const prerender = false;

// ── Rate limiting (in-memory, per-deployment) ─────────────────────────────────

const RATE_WINDOW_MS = 60_000;     // 1 minute
const RATE_MAX_REQUESTS = 10;      // per IP per window

interface RateEntry {
  count: number;
  resetAt: number;
}

const rateLimits = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_MAX_REQUESTS;
}

// Periodically prune expired entries to prevent memory leaks in long-running
// serverless containers.
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimits) {
    if (now > entry.resetAt) rateLimits.delete(ip);
  }
}, RATE_WINDOW_MS * 2);

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_QUESTION_LENGTH = 500;
const MAX_SEARCH_RESULTS  = 5;
const MAX_EXCERPT_LENGTH  = 150;   // for the response source excerpts

// ── Handler ───────────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // ── Rate limit ────────────────────────────────────────────────────────────
  const ip = clientAddress ?? 'unknown';
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // ── Parse and validate ────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const question = typeof body.question === 'string' ? body.question.trim() : '';

  if (!question) {
    return new Response(
      JSON.stringify({ error: 'Please provide a question.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return new Response(
      JSON.stringify({ error: `Question is too long (max ${MAX_QUESTION_LENGTH} characters).` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // ── Search documentation ──────────────────────────────────────────────────
  const results = searchDocs(question, MAX_SEARCH_RESULTS);

  if (results.length === 0) {
    return new Response(
      JSON.stringify({
        answer:
          'The documentation does not appear to cover this topic. ' +
          'Try rephrasing your question or browse the documentation directly.',
        sources: [],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // ── Prepare LLM context ───────────────────────────────────────────────────
  const provider = createLLMProvider();

  if (!provider) {
    return new Response(
      JSON.stringify({
        error: 'The AI assistant is not configured. The MISTRAL_API_KEY environment variable is missing.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const sources: SourceInfo[] = results.map((r) => ({
    title: r.title,
    url: r.url,
    excerpt: r.excerpt,
  }));

  // ── Call LLM ──────────────────────────────────────────────────────────────
  try {
    const llmResponse = await provider.generateAnswer(question, sources);

    // Build compact source list for the client
    const clientSources = results.map((r) => ({
      title: r.title,
      url: r.url,
      excerpt:
        r.excerpt.length > MAX_EXCERPT_LENGTH
          ? r.excerpt.slice(0, MAX_EXCERPT_LENGTH) + '…'
          : r.excerpt,
    }));

    return new Response(
      JSON.stringify({
        answer: llmResponse.answer,
        sources: clientSources,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/ask] LLM error:', message);

    // Detect upstream rate-limit (Mistral 429) to give the user a clearer message
    const isRateLimit = message.includes('429') || message.toLowerCase().includes('rate limit');

    return new Response(
      JSON.stringify({
        error: isRateLimit
          ? 'The AI service is temporarily busy. Please wait a moment and try again.'
          : 'An error occurred while generating the answer. Please try again.',
      }),
      { status: isRateLimit ? 429 : 502, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

// Return 405 for non-POST methods
export const ALL: APIRoute = () => {
  return new Response(
    JSON.stringify({ error: 'Method not allowed. Use POST.' }),
    { status: 405, headers: { 'Content-Type': 'application/json', Allow: 'POST' } },
  );
};
