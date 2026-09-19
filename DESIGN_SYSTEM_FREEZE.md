# Design System Freeze — Redaction-technique.org

**Status**: FINAL AND FROZEN  
**Baseline Version**: v1.0  
**Effective Date**: September 2026  
**Repository**: `https://github.com/olivier-carrere/redaction-technique.org`  
**Site**: `https://docs.redaction-technique.org/`

---

## 1. Executive Statement

The design system implementation for `docs.redaction-technique.org` is hereby **formally frozen**.

The current committed codebase represents the authoritative baseline. Future development must treat this system as immutable in its aesthetic principles, proportions, typography, color architecture, spacing rhythm, and component behavior.

**Do NOT redesign, restyle, refactor, simplify, modernize, or reinterpret the visual system.**

---

## 2. Frozen Baseline Specifications

All values recorded below are derived directly from the authoritative stylesheet [`src/styles/custom.css`](src/styles/custom.css) and verified components.

### 2.1 Typography

* **Font Families**:
  * **Sans-serif (UI & Body)**: Self-hosted Inter (`'Inter Variable', Inter, 'IBM Plex Sans Variable', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`)
  * **Monospace (Code & Notation)**: Self-hosted JetBrains Mono (`'JetBrains Mono Variable', 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)
* **Heading Hierarchy**:
  * **H1** (Page Title): `2.5rem` (40px) / `line-height: 1.1` / `font-weight: 650` / `letter-spacing: -0.02em` / `margin-bottom: 0.5rem`
  * **H2** (Section Header): `1.75rem` (28px) / `line-height: 1.2` / `font-weight: 650` / `letter-spacing: -0.015em` / `margin-top: 3rem` (48px) / `margin-bottom: 1.25rem` (20px) / `border-top: 1px solid var(--color-border)` / `padding-top: 1.5rem` (border suppressed on first H2 following intro)
  * **H3** (Subsection): `1.3125rem` (21px) / `line-height: 1.3` / `font-weight: 650` / `letter-spacing: -0.01em` / `margin-top: 2rem` / `margin-bottom: 0.75rem`
  * **H4** (Minor Heading): `1.0625rem` (17px) / `line-height: 1.4` / `font-weight: 650` / `margin-top: 1.5rem` / `margin-bottom: 0.5rem`
* **Body Typography**:
  * **Size**: `1.0625rem` (17px)
  * **Line Height**: `1.65`
  * **Paragraph Spacing**: `margin-top: 0`, `margin-bottom: 1rem` (16px)
  * **Reading Width**: `--content-width: 760px` (enforced via `.sl-markdown-content > p, ul, ol, dl, blockquote`)
* **Small & Metadata Typography**:
  * **Byline & Metadata**: `0.8125rem` (13px), color: `var(--color-text-muted)`
  * **Breadcrumbs**: `13px`, line-height: `1.4`, color: `var(--color-text-muted)`, separator: `›` (`#ddd8d0`)
  * **TOC Items**: `0.75rem` (12px) for L2, `0.72rem` for L3, line-height: `1.4`
* **Code Typography**:
  * **Inline Code**: `0.9em`, font-family: `var(--font-mono)`, background: `var(--color-code-bg)`, border: `1px solid var(--color-border)`, border-radius: `var(--radius-sm)`, padding: `0.1em 0.3em`
  * **Code Blocks (Expressive Code)**: font-family: `var(--font-mono)`, size: `0.9rem`, line-height: `1.55`, header font size: `0.75rem`

### 2.2 Color Tokens

#### Light Theme (`:root, :root[data-theme='light']`)

| Token | Hex / Value | Semantic Role |
|---|---|---|
| `--color-bg` | `#fcfbf8` | Warm off-white canvas |
| `--color-surface` | `#f4f1ec` | Card and secondary panel surface |
| `--color-text` | `#242321` | Deep warm black body ink |
| `--color-text-muted` | `#6f6b65` | Secondary text, captions, and metadata |
| `--color-border` | `#ddd8d0` | Dividing lines, rules, and component borders |
| `--color-accent` | `#a44932` | Terracotta brand accent (AA 4.5:1 as text on all light backgrounds, including `--color-accent-soft`) |
| `--color-accent-soft` | `#f3ded7` | Soft terracotta badge & active item background |
| `--color-link` | `#b8553c` | WCAG AA 4.5:1 compliant terracotta link color |
| `--color-code-bg` | `#f0efec` | Warm neutral code frame background |
| `--color-success` | `#47745c` | Forest green success status / task badge |
| `--color-warning` | `#a36a32` | Warm amber warning status / reference badge |
| `--color-danger` | `#a74d4d` | Brick red error / danger callouts |
| `--sl-color-green-low` | `rgba(71, 116, 92, 0.12)` | Tinted green badge background |
| `--sl-color-orange-low` | `rgba(163, 106, 50, 0.12)` | Tinted amber badge background |
| `--sl-color-red-low` | `rgba(167, 77, 77, 0.12)` | Tinted red badge background |

#### Dark Theme (`:root[data-theme='dark']`)

| Token | Hex / Value | Semantic Role |
|---|---|---|
| `--color-bg` | `#181716` | Warm charcoal dark canvas |
| `--color-surface` | `#22211e` | Elevated warm dark card surface |
| `--color-text` | `#f0ede8` | Crisp warm cream body ink |
| `--color-text-muted` | `#9e9990` | Muted slate secondary text |
| `--color-border` | `#35332f` | Subtle dark structural divider |
| `--color-accent` | `#df7e65` | High-visibility warm terracotta accent |
| `--color-accent-soft` | `#382520` | Deep terracotta tinted background |
| `--color-link` | `#df7e65` | Accessible terracotta link color |
| `--color-code-bg` | `#201f1c` | Dark code editor frame background |
| `--color-success` | `#5a9474` | Muted green success indicator |
| `--color-warning` | `#c28242` | Muted amber warning indicator |
| `--color-danger` | `#be5b5b` | Muted brick danger indicator |
| `--sl-color-green-low` | `rgba(90, 148, 116, 0.2)` | Tinted dark green badge background |
| `--sl-color-orange-low` | `rgba(194, 130, 66, 0.2)` | Tinted dark amber badge background |
| `--sl-color-red-low` | `rgba(190, 91, 91, 0.2)` | Tinted dark red badge background |

### 2.3 Geometry & Radii

* `--radius-sm`: `3px` — applied to badges, inputs, buttons, code frames, search triggers, tags.
* `--radius-md`: `6px` — applied to cards, callouts, modal dialogs, section containers.
* **No SaaS Pills**: Large arbitrary radii (12px–24px) are strictly prohibited.

### 2.4 Layout & Spacing Scale

* **Desktop 3-Zone Architecture**:
  * **Left Sidebar**: `var(--sidebar-width)` = `250px`
  * **Main Reading Column**: `var(--content-width)` = `760px`
  * **Right Table of Contents**: `var(--toc-width)` = `200px`
* **Spacing Scale**:
  * `--space-1`: `4px`
  * `--space-2`: `8px`
  * `--space-3`: `12px`
  * `--space-4`: `16px`
  * `--space-5`: `24px`
  * `--space-6`: `32px`
  * `--space-7`: `48px`
  * `--space-8`: `64px`
* **Responsive Breakpoints**:
  * **Mobile** (`< 768px`): Right TOC hidden; sidebar drawer via menu button; main pane 100% width; touch targets ≥ 44px.
  * **Tablet** (`768px – 1099px`): Right TOC collapsed into in-page menu; reading column expands within container.
  * **Desktop** (`≥ 1100px`): Full 3-zone layout active.
  * **Wide** (`≥ 1400px`): Reading column remains locked at 760px with generous surrounding whitespace; no infinite stretching.

### 2.5 Logical Properties

All directional styling uses CSS Logical Properties to preserve bi-directional integrity:
* `border-inline-start: 3px solid var(--color-accent)` for active nav items, callouts, prompts, orientation banners, and exploration cards.
* `padding-inline-start` / `padding-inline-end` instead of physical `left` / `right`.

---

## 3. Definition of "Frozen"

A design system freeze means that the visual presentation of the site is complete and protected against drift.

Future modifications must preserve:
1. **Visual Hierarchy**: Heading scale, lead paragraph styling, byline positioning, and contrast hierarchy.
2. **Proportions & Geometry**: The 250 / 760 / 200 grid layout and strict 3px / 6px border radii.
3. **Spacing Rhythm**: 48px pre-H2 spacing, 20px post-H2 spacing, 16px paragraph spacing.
4. **Color Relationships**: Grounded warm neutral canvas paired with terracotta accent; zero unsolicited saturated accents.
5. **Editorial Identity**: The calm, technical manual aesthetic without marketing badges or corporate illustrations.
6. **Bilingual Parity**: Equivalent visual, structural, and typographical treatment between `/en/` and `/fr/`.
7. **Accessibility Standards**: WCAG AA compliance, visible 2px keyboard focus outlines, logical properties, and reduced-motion provisions.

A proposed change is classified as a **design-system modification** if it alters colors, fonts, geometry, whitespace, or layout rules, rather than resolving a functional or accessibility bug.

---

## 4. Change Management Rules

Any future modifications to the repository must respect the following strict precedence:

1. **Bug Fixes**: Allowed unconditionally when restoring documented frozen behavior.
2. **Accessibility Fixes**: Allowed unconditionally when enhancing WCAG compliance without altering the aesthetic identity.
3. **Browser Compatibility**: Allowed when fixing rendering discrepancies across target browsers.
4. **Content Updates**: Allowed when modifying documentation text, diagrams, or translations without altering component styling.
5. **Functional Enhancements**: Allowed when expanding API capabilities, search indexing, or assistant logic without changing UI primitives.
6. **New Components**: Allowed only when required by new functional needs; new components **must** consume the frozen design tokens and adhere to the established geometric scale.
7. **Visual Redesigns**: **Strictly Prohibited** without explicit, written authorization from repository maintainers.

---

## 5. Protected Design-System Components

The following Astro components constitute the frozen component library. They must not be rewritten, restyled, or swapped for third-party alternatives:

* [`src/components/PageTitle.astro`](src/components/PageTitle.astro) — Page title, lead paragraph, and 24px rhythm
* [`src/components/Breadcrumbs.astro`](src/components/Breadcrumbs.astro) — Understated 13px semantic breadcrumbs
* [`src/components/ExploreDocumentation.astro`](src/components/ExploreDocumentation.astro) — Section-end exploration prompt
* [`src/components/Pagination.astro`](src/components/Pagination.astro) — Bounded section navigation and contextual Ask prompt
* [`src/components/AskAssistant.astro`](src/components/AskAssistant.astro) — AI documentation assistant query interface
* [`src/components/DocumentationExplorer.astro`](src/components/DocumentationExplorer.astro) — Interactive API & facet browser
* [`src/components/InformationType.astro`](src/components/InformationType.astro) — Canonical Concept / Task / Reference badge banner
* [`src/components/StartHere.astro`](src/components/StartHere.astro) — Curated 4-step sequence panel
* [`src/components/SiteOrientation.astro`](src/components/SiteOrientation.astro) — Documentation manual orientation header
* [`src/components/CardGridSection.astro`](src/components/CardGridSection.astro) — Multi-card navigation grid
* [`src/components/diagrams/DiagramFrame.astro`](src/components/diagrams/DiagramFrame.astro) — Accessible figure frame and responsive viewport for every native SVG diagram
* [`src/components/diagrams/Flowchart.astro`](src/components/diagrams/Flowchart.astro), [`GanttChart.astro`](src/components/diagrams/GanttChart.astro), [`GitGraphDiagram.astro`](src/components/diagrams/GitGraphDiagram.astro), [`QuadrantChart.astro`](src/components/diagrams/QuadrantChart.astro), [`SequenceDiagram.astro`](src/components/diagrams/SequenceDiagram.astro) — Build-time SVG diagram renderers (replaced the client-side `Mermaid.astro` engine; see §7)
* [`src/components/AwkBox.astro`](src/components/AwkBox.astro) — Interactive Awk tutorial sandbox
* [`src/components/SedBox.astro`](src/components/SedBox.astro) — Interactive Sed tutorial sandbox
* [`src/components/DitaRenameBox.astro`](src/components/DitaRenameBox.astro) — Interactive DITA rename sandbox
* [`src/components/PyScriptMoliere.astro`](src/components/PyScriptMoliere.astro) — Interactive Python regex terminal
* [`src/components/SedMoliere.astro`](src/components/SedMoliere.astro) — Interactive Sed stream editor terminal
* [`src/components/BrowseAll.astro`](src/components/BrowseAll.astro) — Homepage taxonomy browser
* [`src/components/Hero.astro`](src/components/Hero.astro) — Editorial hero wrapper
* [`src/components/DocActions.astro`](src/components/DocActions.astro) — Markdown copy & view controls
* [`src/components/DiscoverySwitcher.astro`](src/components/DiscoverySwitcher.astro) — Explorer / API switcher
* [`src/components/AuthorBio.astro`](src/components/AuthorBio.astro) — Author credentials and blog link
* [`src/components/Head.astro`](src/components/Head.astro) — Metadata, OpenGraph, JSON-LD, and font preloads

---

## 6. Verification & Invariant Enforcement

Before any commit is pushed to the repository, the baseline must be verified using the automated test suite and static build:

```bash
# Run unit & contract tests (81 tests across API, schema, taxonomy, explorer, markdown, diagrams)
node --test --test-concurrency=1 tests/*.test.mjs

# Run full production static build (158 static pages + Pagefind index)
npm run build
```

Both commands must pass with zero failures and zero regressions.

---

## 7. Authorized Amendments

### 7.1 Native SVG diagrams (September 2026)

Authorized by the repository maintainer. The client-side `Mermaid.astro` renderer and the `mermaid` dependency were removed. All 50 diagrams (EN and FR) are now static SVG, rendered at build time by the components in `src/components/diagrams/`, with no client-side JavaScript.

* **Tokens**: Diagram styling lives in the "Diagram Design System" section of `src/styles/custom.css`. It uses only the frozen tokens in §2.2 (`--color-*`, `--font-*`), so light and dark themes need no separate override. No new color, font, or radius was introduced.
* **Geometry**: Nodes use `--radius-sm` (3px). Figure frames and groups use `--radius-md` (6px).
* **Accessibility**: Each diagram is a `<figure>` with an accessible name. The `<svg role="img">` has a `<title>`. Complex diagrams also have a screen-reader description. `src/components/diagrams/diagram-text.ts` is the single source for this text. The Markdown API (`*.md`, `llms-full.txt`) emits the same text in place of each diagram.
* **Bilingual parity**: Each diagram is one component that selects EN or FR labels from the page locale.
