/**
 * LLM provider abstraction using Google's official @google/genai SDK.
 *
 * Isolates the Gemini integration for the documentation assistant.
 */

import { GoogleGenAI } from '@google/genai';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SourceInfo {
  title: string;
  url: string;
  excerpt: string;
}

export interface LLMResponse {
  answer: string;
  model: string;
}

export interface LLMProvider {
  generateAnswer(
    question: string,
    sources: SourceInfo[],
  ): Promise<LLMResponse>;
}

export interface LLMErrorInfo {
  statusCode: number;
  message: string;
  code?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const GEMINI_MODEL = 'gemini-3.5-flash-lite';

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the documentation assistant for redaction-technique.org.

Answer questions using ONLY the documentation excerpts provided below.

Rules:
- Do not invent information.
- Do not rely on general or outside knowledge to fill gaps.
- If the documentation does not contain enough information to answer the question, explicitly say so (for example: "The documentation does not contain enough information to answer this question.").
- Do not invent APIs, features, configuration values, commands, examples, or technical terminology.
- Keep answers concise and technically precise.
- When referencing a documentation page, mention its title.
- Answer in the same language as the question.`;

// ── User message builder ──────────────────────────────────────────────────────

function buildUserMessage(question: string, sources: SourceInfo[]): string {
  const sourcesBlock = sources
    .map(
      (s) =>
        `---\nSource: ${s.title}\nURL: https://docs.redaction-technique.org${s.url}\n\n${s.excerpt}\n---`,
    )
    .join('\n\n');

  return `Question: ${question}\n\nDocumentation excerpts:\n\n${sourcesBlock}`;
}

// ── Gemini provider ───────────────────────────────────────────────────────────

export class GeminiProvider implements LLMProvider {
  private ai: GoogleGenAI;
  private model: string;

  constructor(apiKey: string, model = GEMINI_MODEL) {
    this.ai = new GoogleGenAI({ apiKey });
    this.model = model;
  }

  async generateAnswer(
    question: string,
    sources: SourceInfo[],
  ): Promise<LLMResponse> {
    const prompt = buildUserMessage(question, sources);
    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.1,
        maxOutputTokens: 1024,
      },
    });

    const text = response.text ? response.text.trim() : '';
    return { answer: text, model: this.model };
  }
}

// ── Factory & Helpers ─────────────────────────────────────────────────────────

/** Safely fetch the Gemini API key from environment without exposing its value. */
export function getGeminiApiKey(): string {
  return (
    import.meta.env?.GEMINI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    ''
  ).trim();
}

/**
 * Create an LLM provider from the current environment.
 * Returns null when the API key is not configured.
 */
export function createLLMProvider(): LLMProvider | null {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  return new GeminiProvider(apiKey);
}

// ── Error Parser ──────────────────────────────────────────────────────────────

/**
 * Parses errors thrown by `@google/genai` SDK or HTTP requests,
 * extracting status code, error message, and error code safely.
 */
export function parseGeminiError(err: unknown): LLMErrorInfo {
  let statusCode = 500;
  let message = 'Unknown error';
  let code: string | undefined;

  if (typeof err === 'object' && err !== null) {
    const record = err as Record<string, unknown>;

    if (typeof record.status === 'number') {
      statusCode = record.status;
    } else if (typeof record.statusCode === 'number') {
      statusCode = record.statusCode;
    }

    if (typeof record.code === 'string' || typeof record.code === 'number') {
      code = String(record.code);
    }

    if (typeof record.message === 'string') {
      try {
        const parsed = JSON.parse(record.message) as Record<string, unknown>;
        if (parsed?.error && typeof parsed.error === 'object') {
          const errObj = parsed.error as Record<string, unknown>;
          if (typeof errObj.code === 'number' || typeof errObj.code === 'string') {
            statusCode = Number(errObj.code) || statusCode;
          }
          if (typeof errObj.message === 'string') {
            message = errObj.message;
          }
          if (typeof errObj.status === 'string') {
            code = errObj.status;
          }
        }
      } catch {
        message = record.message;
      }
    }

    // Fallback status code matching if statusCode is still default 500
    if (statusCode === 500) {
      const lower = message.toLowerCase();
      if (lower.includes('api key not valid') || lower.includes('invalid_argument') || lower.includes('unauthorized') || lower.includes('401')) {
        statusCode = 401;
      } else if (lower.includes('permission_denied') || lower.includes('forbidden') || lower.includes('403')) {
        statusCode = 403;
      } else if (lower.includes('quota') || lower.includes('billing') || lower.includes('402')) {
        statusCode = 402;
      } else if (lower.includes('resource_exhausted') || lower.includes('rate limit') || lower.includes('429')) {
        statusCode = 429;
      }
    }
  } else if (typeof err === 'string') {
    message = err;
  }

  return { statusCode, message, code };
}
