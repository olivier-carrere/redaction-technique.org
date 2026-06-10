# Writing Style Guide — redaction-technique.org

*A style reference derived from the published articles of Olivier Carrère's technical-writing blog (docs-as-code, DITA XML, Markdown, YAML, AI-assisted documentation). Use it to write new pieces that sound like they belong on the site.*

---

## 1. Voice in one sentence

An experienced practitioner explaining structured-documentation ideas to a peer — warm and direct, quietly authoritative, never academic, always tying technical choices back to a human payoff.

---

## 2. Persona & point of view

- **Write from the practitioner's chair.** Claims come from doing the work, not surveying the literature. The author shows the workflow, the diff, the YAML file — receipts, not assertions.
- **Mix "you," "we," and "I."**
  - *"you"* addresses the reader's own docs and decisions ("your docs," "as your product line grows").
  - *"we"* invites the reader to think alongside ("we constantly build mental models," "we ran Q/A sessions").
  - *"I"* appears mainly in the personal, human moments ("I read every message").
- **Authoritative but never lecturing.** Opinions are stated plainly ("YAML shines here"), then immediately backed by a concrete example or table.
- **Respect the reader's intelligence and time.** No filler, no throat-clearing. The reader is assumed competent and busy.

---

## 3. Tone

- Warm, calm, and confident. Enthusiasm shows through precision, not exclamation marks.
- Conversational asides puncture the formality: short check-ins like "Looks neat, right?" or a one-word question — "The result?" — followed by the answer.
- Pragmatic honesty. Trade-offs are acknowledged openly ("minimalism can go too far," "mitigation strategies help — but they add complexity"). Nothing is oversold.
- A recurring humanist undertone: technology should serve attention, clarity, and people — automation is "an instrument for attention, not distraction."

---

## 4. Sentence craft

- **Vary length deliberately.** Long, clause-rich explanatory sentences are broken up by very short ones for emphasis. A three-line idea often lands on a four-word verdict.
- **Use fragments for punch.** "It's a cognitive truth." "No XML headaches required." Fragments are intentional and sparing.
- **Open sections with a question.** Rhetorical questions frame the problem before the solution arrives ("How can a non-profit turn 7,000 pages … into content that is alive?").
- **Favor "not X — Y" framing.** Antithesis is a signature move: more than recycling, it's *renewal*; the goal isn't to say less, it's to make thinking effortless.
- **Reach for the triad.** Ideas cluster in threes — "clarity, focus, and well-being"; "scan, act, and adjust"; "discover, explore, read." Use this rhythm, but don't force every list to three.
- **Active voice, vivid verbs.** Content doesn't "get organized," it is *surfaced*, *distilled*, *harmonized*, *recomposed*, *recomposed into a lens*.

---

## 5. Paragraph rhythm

- Keep paragraphs short: typically one to three sentences, one idea each.
- Lean on white space. Generous breaks between paragraphs and sections are part of the reading experience, not an accident.
- Let single-sentence paragraphs stand alone when the idea deserves a beat of silence around it.

---

## 6. Diction & word choice

- **Plain, precise, accessible.** Jargon is allowed but always introduced and explained on first use (DITA, DRY, progressive disclosure, single source of truth).
- **Organic/living metaphors for content.** A distinctive habit: archives "breathe," content is "alive," the corpus becomes an "ecosystem," a "flow," a "living signal"; neglected files "gather digital dust." Reach for this imagery when describing what structure and automation *do for* content.
- **Cognitive/economic metaphors for the reader.** "Mental toll," "the mind is lazy by design," "cognitive economy," "cognitive load." Used when explaining *why* a technique works.
- **International English, leaning British in -ise/-ising** ("specialising") while keeping common tech spellings ("optimized," "standardized"). Pick one convention per piece and stay consistent.
- Avoid hype words and empty intensifiers. Strength comes from the example, not the adjective.

---

## 7. Structure of an article

A typical piece follows this arc:

1. **Hook** — a question, a one-line definition, or a relatable scenario ("Imagine you're an engine oil manufacturer.").
2. **Tension** — the problem, naming why the obvious approach breaks down.
3. **Exploration** — alternatives walked through in turn, each with concrete artifacts (code, tables, diffs) and an honest verdict.
4. **Resolution** — the recommended approach, shown working.
5. **Human close** — a short, slightly philosophical reflection that lifts the topic above the mechanics ("The goal remains human").

Supporting conventions:

- **Descriptive, benefit-oriented headings.** H2/H3 read as mini-arguments ("Why 'Less' Works: Cognitive Economy," "Easier diffs and cleaner version control"), not bare labels.
- **Horizontal rules (`---`)** separate major movements of the piece.
- **A `## TL;DR` block** sometimes closes instructional pieces — a handful of bolded one-line takeaways.
- **A `Reference:` line or closing pointer** to a source or a related deep-dive.
- **Dense internal cross-linking.** Most articles link to three or more sibling posts in-line, building a connected web of content rather than standalone pages. Add contextual links wherever a concept has its own article.
- **External authority with links.** Named thinkers (Kahneman, van der Meij, Carroll) and standards are cited and linked, lending weight without footnote formality.

---

## 8. Formatting toolkit

- **Bold** is used heavily and mid-sentence to spotlight the key term in a clause — not whole sentences, just the load-bearing phrase ("a **dialogue tool**," "**separation of data and presentation**"). This is the most frequent emphasis device; use it to let a skimmer read the bold words alone and still get the gist.
- *Italics* mark conceptual terms and quiet emphasis (*less is more*, *speak again*, *thinkable*).
- **Comparison tables** are a core explanatory device, especially the two-column **Issue / Description** pattern when critiquing an approach, and **Feature / Details** when praising one.
- **Callout blockquotes** carry examples, tips, and warnings, often led by an icon and a bold label ("**Tip:**", "**Warning:**", "**Example:**"). Use them to set asides apart from the main thread.
- **Code blocks** show real artifacts — YAML, XML, Astro components, and especially **Git diffs** to make an abstract maintainability point tangible.
- **Numbered lists** for sequential steps or ranked concerns; **bulleted lists** for parallel options or benefits.
- **Em dashes** are everywhere, set closed (no surrounding spaces) for tight asides — "7,000 pages—a vast sea of text—into content." Use them for interruptions, reversals, and the "not X—Y" snap.
- Smart (curly) quotes and apostrophes throughout.

---

## 9. Rhetorical devices to keep in the kit

- **Extended analogy** to carry a technical argument (the engine-oil manufacturer standing in for any docs team choosing a data format).
- **Contrast scaffolding** — the whole piece organized as a face-off (XML vs Markdown vs Database vs YAML; System 1 vs System 2).
- **Antithesis and reversal** in the punch lines ("it listens as much as it speaks").
- **Concrete imagery** to make the abstract physical (a Git diff "where every row appears changed," archives that "breathe again").
- **The reassuring caveat** — pre-empt the obvious objection, then resolve it ("Of course, minimalism can go too far. … Here's what prevents that collapse.").

---

## 10. Things to avoid

- Walls of text. If a paragraph runs past four lines, split it.
- Unexplained acronyms or unsupported claims — always show the artifact.
- Hype, superlatives, and exclamation marks as a substitute for evidence.
- Pure theory with no workflow, file, or diff to ground it.
- Flat, label-style headings ("Introduction," "Conclusion," "Tables"). Headings should argue or promise.
- Forgetting the human close. Even a deeply technical piece earns its ending by reconnecting to clarity, the reader, or the point of the work.

---

## 11. Quick checklist before publishing

- [ ] Opens with a question, scenario, or crisp definition.
- [ ] Each approach shown with a real artifact (code, table, or diff) and an honest verdict.
- [ ] Paragraphs short; one idea each; plenty of white space.
- [ ] Key phrases bolded so the skim-path alone makes sense.
- [ ] Headings are descriptive and benefit-oriented.
- [ ] At least a few in-line links to related articles and any cited authorities.
- [ ] Em dashes set closed; international spelling consistent; smart quotes on.
- [ ] Ends on a short, human, slightly reflective note (and a TL;DR if instructional).
