/**
 * POST /api/ask  —  "Ask the documentation" AI assistant endpoint.
 *
 * Receives a natural-language question, searches the documentation index,
 * sends the most relevant excerpts to an LLM, and returns a grounded answer
 * with source links.
 */

import type { APIRoute } from 'astro';
import { searchDocs } from '../../lib/search';
import { createLLMProvider, getGeminiApiKey, GEMINI_MODEL, parseGeminiError } from '../../lib/llm';
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
  const apiKey = getGeminiApiKey();
  const provider = createLLMProvider();

  if (!provider) {
    console.error('[/api/ask] Provider creation failed: GEMINI_API_KEY missing.', {
      provider: 'gemini',
      model: GEMINI_MODEL,
      apiKeyPresent: false,
    });
    return new Response(
      JSON.stringify({
        error: 'The AI assistant is not configured. The GEMINI_API_KEY environment variable is missing.',
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
    const errorInfo = parseGeminiError(err);

    // Diagnostic logging containing no secret API keys
    console.error('[/api/ask] Gemini API error diagnostic:', {
      provider: 'gemini',
      model: GEMINI_MODEL,
      apiKeyPresent: Boolean(apiKey),
      statusCode: errorInfo.statusCode,
      errorMessage: errorInfo.message,
    });

    let httpStatus = 502;
    let userMessage = 'AI service temporarily unavailable. Please try again later.';

    if (errorInfo.statusCode === 401 || errorInfo.statusCode === 403 || errorInfo.statusCode === 400) {
      httpStatus = errorInfo.statusCode === 400 ? 401 : errorInfo.statusCode;
      userMessage = 'AI service authentication error. Please check configuration.';
    } else if (errorInfo.statusCode === 402) {
      httpStatus = 402;
      userMessage = 'AI service quota or billing limit reached. Please check your Gemini account.';
    } else if (errorInfo.statusCode === 429) {
      httpStatus = 429;
      userMessage = 'The AI service is temporarily busy due to rate limits. Please try again in a moment.';
    }

    const isDev = import.meta.env.DEV || process.env.NODE_ENV !== 'production';
    const responsePayload: Record<string, unknown> = {
      error: userMessage,
    };

    if (isDev) {
      responsePayload.devDetails = `[DEV ONLY] Status ${errorInfo.statusCode}: ${errorInfo.message}${errorInfo.code ? ` (code: ${errorInfo.code})` : ''}`;
    }

    return new Response(
      JSON.stringify(responsePayload),
      { status: httpStatus, headers: { 'Content-Type': 'application/json' } },
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
