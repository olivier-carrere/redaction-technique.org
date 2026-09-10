/**
 * POST /api/ask  —  "Ask the documentation" AI assistant endpoint.
 *
 * Receives a natural-language question, searches the documentation index,
 * sends the most relevant excerpts to an LLM, and returns a grounded answer
 * with source links.
 *
 * Accepts an optional `language` field ('en' | 'fr') to select the correct
 * search index and system instructions.  Defaults to 'en'.
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

// ── Locale-specific user-facing messages ──────────────────────────────────────

const MESSAGES = {
  en: {
    rateLimited:      'Too many requests. Please wait a moment and try again.',
    noQuestion:       'Please provide a question.',
    questionTooLong:  (max: number) => `Question is too long (max ${max} characters).`,
    noResults:        'The documentation does not appear to cover this topic. Try rephrasing your question or browse the documentation directly.',
    notConfigured:    'The AI assistant is not configured. The GEMINI_API_KEY environment variable is missing.',
    authError:        'AI service authentication error. Please check configuration.',
    billingError:     'AI service quota or billing limit reached. Please check your Gemini account.',
    quotaExceeded:    'The documentation assistant has reached its daily usage limit. Please try again tomorrow.',
    rateLimitedGemini:'The documentation assistant is busy right now. Please wait a moment and try again.',
    serviceError:     'AI service temporarily unavailable. Please try again later.',
    methodNotAllowed: 'Method not allowed. Use POST.',
    invalidJson:      'Invalid JSON body.',
  },
  fr: {
    rateLimited:      'L\'assistant de documentation est momentanément très sollicité. Veuillez patienter quelques instants avant de réessayer.',
    noQuestion:       'Veuillez poser une question.',
    questionTooLong:  (max: number) => `La question est trop longue (${max} caractères maximum).`,
    noResults:        'La documentation ne semble pas couvrir ce sujet. Essayez de reformuler votre question ou consultez directement la documentation.',
    notConfigured:    'L\'assistant IA n\'est pas configuré. La variable d\'environnement GEMINI_API_KEY est absente.',
    authError:        'Erreur d\'authentification du service IA. Veuillez vérifier la configuration.',
    billingError:     'Limite de quota ou de facturation du service IA atteinte. Veuillez vérifier votre compte Gemini.',
    quotaExceeded:    'L\'assistant de documentation a atteint sa limite d\'utilisation quotidienne. Veuillez réessayer demain.',
    rateLimitedGemini:'L\'assistant de documentation est momentanément très sollicité. Veuillez patienter quelques instants avant de réessayer.',
    serviceError:     'Le service d\'IA est temporairement indisponible. Veuillez réessayer plus tard.',
    methodNotAllowed: 'Méthode non autorisée. Utilisez POST.',
    invalidJson:      'Corps de requête JSON invalide.',
  },
} as const;

// ── Handler ───────────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // ── Rate limit ────────────────────────────────────────────────────────────
  const ip = clientAddress ?? 'unknown';
  if (isRateLimited(ip)) {
    // Return a generic rate-limit message; language unknown at this point
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

  // Determine language (default 'en', accept 'fr')
  const rawLang = typeof body.language === 'string' ? body.language.trim().toLowerCase() : 'en';
  const lang: 'en' | 'fr' = rawLang === 'fr' ? 'fr' : 'en';
  const msg = MESSAGES[lang];

  const question = typeof body.question === 'string' ? body.question.trim() : '';

  if (!question) {
    return new Response(
      JSON.stringify({ error: msg.noQuestion }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return new Response(
      JSON.stringify({ error: msg.questionTooLong(MAX_QUESTION_LENGTH) }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // ── Search documentation ──────────────────────────────────────────────────
  const results = searchDocs(question, MAX_SEARCH_RESULTS, lang);

  if (results.length === 0) {
    return new Response(
      JSON.stringify({
        answer: msg.noResults,
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
      JSON.stringify({ error: msg.notConfigured }),
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
    const llmResponse = await provider.generateAnswer(question, sources, lang);

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

    // Diagnostic logging containing no secret API keys or internal details
    console.error('[/api/ask] Gemini API error diagnostic:', {
      provider: 'gemini',
      model: GEMINI_MODEL,
      lang,
      apiKeyPresent: Boolean(apiKey),
      statusCode: errorInfo.statusCode,
      isQuotaExceeded: errorInfo.isQuotaExceeded,
      isRateLimitExceeded: errorInfo.isRateLimitExceeded,
    });

    let httpStatus = 502;
    let userMessage = msg.serviceError;

    if (errorInfo.statusCode === 401 || errorInfo.statusCode === 403 || errorInfo.statusCode === 400) {
      httpStatus = errorInfo.statusCode === 400 ? 401 : errorInfo.statusCode;
      userMessage = msg.authError;
    } else if (errorInfo.statusCode === 402) {
      httpStatus = 402;
      userMessage = msg.billingError;
    } else if (errorInfo.isQuotaExceeded) {
      httpStatus = 429;
      userMessage = msg.quotaExceeded;
    } else if (errorInfo.isRateLimitExceeded || errorInfo.statusCode === 429) {
      httpStatus = 429;
      userMessage = msg.rateLimitedGemini;
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
