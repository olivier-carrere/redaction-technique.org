/**
 * LLM provider abstraction.
 *
 * Isolates the Mistral integration so it can be swapped for another
 * provider without redesigning the application.
 */

import { Mistral } from '@mistralai/mistralai';

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

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the documentation assistant for redaction-technique.org.

Answer questions using ONLY the documentation excerpts provided below.

Rules:
- Do not invent information.
- Do not rely on general knowledge when the supplied documentation does not answer the question.
- If the documentation does not contain enough information to answer the question, say so clearly. For example: "The documentation does not contain enough information to answer this question."
- Prefer concise, technically precise answers.
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

// ── Mistral provider ──────────────────────────────────────────────────────────

const MISTRAL_MODEL = 'mistral-small-latest';

export class MistralProvider implements LLMProvider {
  private client: Mistral;
  private model: string;

  constructor(apiKey: string, model = MISTRAL_MODEL) {
    this.client = new Mistral({ apiKey });
    this.model = model;
  }

  async generateAnswer(
    question: string,
    sources: SourceInfo[],
  ): Promise<LLMResponse> {
    const result = await this.client.chat.complete({
      model: this.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserMessage(question, sources) },
      ],
      maxTokens: 1024,
      temperature: 0.1,
    });

    const answer = result.choices?.[0]?.message?.content;
    const text = typeof answer === 'string' ? answer.trim() : '';

    return { answer: text, model: result.model ?? this.model };
  }
}

// ── Factory ───────────────────────────────────────────────────────────────────

/**
 * Create an LLM provider from the current environment.
 * Returns null when the API key is not configured.
 */
export function createLLMProvider(): LLMProvider | null {
  // Server-side: try Astro's import.meta.env first, then process.env (Vercel runtime)
  const apiKey =
    import.meta.env?.MISTRAL_API_KEY ??
    process.env.MISTRAL_API_KEY ??
    '';

  if (!apiKey) return null;

  return new MistralProvider(apiKey);
}
