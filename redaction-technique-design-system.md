# Redaction-technique.org — Design System

## 1. Design principles

### 01 — Documentation first
Every visual decision should make technical content easier to scan, understand, and reuse.

### 02 — Editorial, not corporate
The site should feel like a knowledgeable technical writer's reference library rather than a SaaS marketing site.

### 03 — Dense but calm
Use relatively compact layouts, generous whitespace around major sections, and restrained decoration.

### 04 — Strong hierarchy
Readers should immediately distinguish:

**section → page → heading → explanatory text → example → reference**

### 05 — Text is the visual identity
Use typography, rules, code blocks, callouts, and structured layouts as the primary visual language.

### 06 — One system across EN/FR
English and French should share the same components, spacing, typography, and interaction patterns.

---

## 2. Visual direction

Use a **warm documentation/editorial aesthetic** rather than the default Starlight look.

Think:

> technical manual × modern editorial publication × developer documentation

Not:

> startup landing page × colorful SaaS dashboard

The visual identity should be based on warm off-white backgrounds, black typography, a restrained terracotta accent, subtle borders, and strong typography.

---

## 3. Core palette

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#FCFBF8` | Main background |
| `--color-surface` | `#F4F1EC` | Cards and secondary surfaces |
| `--color-text` | `#242321` | Main text |
| `--color-text-muted` | `#6F6B65` | Metadata and secondary text |
| `--color-border` | `#DDD8D0` | Rules and borders |
| `--color-accent` | `#C9684F` | Links and active states |
| `--color-accent-soft` | `#F3DED7` | Highlight backgrounds |
| `--color-code-bg` | `#F0EFEC` | Code blocks |
| `--color-success` | `#47745C` | Success |
| `--color-warning` | `#A36A32` | Warning |
| `--color-danger` | `#A74D4D` | Error |

Use one strong accent rather than a rainbow of component colors.

---

## 4. Typography

### UI / headings

Preferred fonts:

- **Inter**
- Alternative: **IBM Plex Sans**

### Body

Use the same family for consistency, with relatively generous line height.

```text
Body:        17px / 1.65
Small:       14px / 1.5
Navigation:  14–15px
```

### Headings

```text
H1   40px / 1.1   weight 650
H2   28px / 1.2   weight 650
H3   21px / 1.3   weight 650
H4   17px / 1.4   weight 650
```

Avoid excessive heading sizes. Documentation benefits from hierarchy rather than spectacle.

### Reading width

```text
--content-width: 760px
```

Keep the main reading column relatively narrow to improve readability of long technical pages.

---

## 5. Layout system

Use a consistent three-zone desktop layout:

```text
┌──────────────┬─────────────────────────┬──────────────┐
│              │                         │              │
│  Navigation  │      Documentation      │   On this    │
│              │         content         │     page     │
│              │                         │              │
│              │                         │              │
└──────────────┴─────────────────────────┴──────────────┘
```

### Desktop

```text
Sidebar       250px
Content       720–780px
TOC           180–220px
Gap           32–48px
```

### Tablet

Hide the right table of contents.

### Mobile

Use:

```text
Header
Search
Page
Sticky navigation/action
```

Do not simply shrink the desktop layout.

---

## 6. Navigation

The information architecture should remain stable.

Major navigation groups can include:

1. Learn technical writing
2. Build a documentation process
3. Adopt docs-as-code
4. Use structured authoring
5. Choose tools and formats
6. Use the practical toolkit
7. Explore the reference

Navigation items should be visually calm and highly scannable.

### Active navigation item

Use:

```text
background: var(--color-accent-soft)
color: var(--color-accent)
border-left: 3px solid var(--color-accent)
```

Avoid large pills.

---

## 7. Header

Keep the header simple.

```text
┌───────────────────────────────────────────────────────┐
│ REDACTION-TECHNIQUE.ORG    Search documentation...   │
│                                                       │
└───────────────────────────────────────────────────────┘
```

Right-side controls:

```text
EN / FR     Theme
```

Search, language, and theme controls should remain easy to discover without dominating the interface.

---

## 8. Page header

Every documentation page should use a consistent structure:

```text
SECTION
────────────────────────

Page title

One-sentence description.

By Olivier Carrère · Updated ...
```

Keep metadata visually secondary.

---

## 9. Breadcrumbs

Use small, understated breadcrumbs:

```text
Adopt docs-as-code
› Version management
› Git: from file to content
```

Recommended styling:

```text
13px
muted color
subtle separators
```

Avoid breadcrumb pills.

---

## 10. Links

Links should be visibly links without becoming visually noisy.

Recommended:

```text
color: var(--color-accent);
text-decoration: underline;
text-decoration-thickness: 1px;
text-underline-offset: 3px;
```

On hover, links can shift toward the main text color.

Avoid bolding every link.

---

## 11. Code

Code is a core part of the documentation experience.

### Inline code

Use a subtle code background:

```text
`git add -p`
```

Recommended:

```text
background: var(--color-code-bg)
border-radius: 3px
padding: 0.1em 0.3em
font-family: var(--font-mono)
```

### Code blocks

Structure code blocks as:

```text
┌──────────────────────────────────────────────┐
│ bash                                    Copy │
├──────────────────────────────────────────────┤
│ git add -p                                   │
│ git commit -m "Update documentation"         │
└──────────────────────────────────────────────┘
```

Use a subtle header rather than a large colored banner.

---

## 12. Callouts

Define four semantic callouts:

- Note
- Tip
- Important
- Warning

Use color, label, and border together. Do not rely on icons or color alone.

Example:

```text
┌─────────────────────────────────────────┐
│ NOTE                                     │
│                                          │
│ Additional information.                 │
└─────────────────────────────────────────┘
```

---

## 13. Tables

Documentation tables should prioritize readability.

```text
┌─────────────┬──────────────┬──────────────┐
│ Format      │ Strength     │ Limitation   │
├─────────────┼──────────────┼──────────────┤
│ Markdown    │ Simple       │ Less rigid   │
│ DITA        │ Structured   │ More complex │
└─────────────┴──────────────┴──────────────┘
```

Rules:

- Left-align text.
- Right-align numbers.
- Use subtle borders.
- Avoid zebra stripes by default.
- Use comfortable row height.
- Enable horizontal scrolling on mobile.

---

## 14. Lists

Use moderate spacing.

Bulleted lists:

```text
• First point
• Second point
• Third point
```

Procedures:

```text
1. Gather the information.
2. Create the source file.
3. Review the content.
4. Publish the documentation.
```

Use strong numbers for procedures so long workflows remain easy to scan.

---

## 15. Ask the documentation

Treat **Ask the documentation** as a first-class product component.

The distinction should be clear:

**Search** = find documents.

**Ask** = synthesize an answer from the documentation.

Recommended structure:

```text
┌─────────────────────────────────────────────────────┐
│ ASK THE DOCUMENTATION                               │
│                                                     │
│ Find an answer in the Redaction-technique.org      │
│ documentation.                                      │
│                                                     │
│ ┌───────────────────────────────────────────┐       │
│ │ What is DITA XML?                         │ Ask → │
│ └───────────────────────────────────────────┘       │
│                                                     │
│ Try:  What is DITA XML?                            │
│       How does docs-as-code work?                  │
│       When should I use structured documentation? │
└─────────────────────────────────────────────────────┘
```

The assistant should clearly communicate that answers are grounded in the site's documentation.

---

## 16. Search

Search should feel like a central product feature.

Recommended keyboard shortcut:

```text
⌘ K
```

or:

```text
Ctrl K
```

Search results should show:

```text
Git: from file to content
Adopt docs-as-code

...documentation excerpt containing the search terms...
```

Include the section/category below each result.

---

## 17. Explore documentation

Create a reusable exploration component:

```text
┌─────────────────────────────────────────┐
│ EXPLORE DOCUMENTATION                   │
│                                         │
│ Search and filter the documentation.    │
│                                         │
│ [ Browse documentation → ]              │
└─────────────────────────────────────────┘
```

Use it at the end of major sections when appropriate.

---

## 18. Cards

Use cards sparingly.

Good uses:

- Templates
- Checklists
- Worked examples
- Tools
- Related documentation

Avoid putting every ordinary documentation item inside a card.

---

## 19. Related content

At the end of each page, use a consistent navigation pattern:

```text
RELATED

← Previous
Git: from file to content

Next →
Using branches in source management systems
```

Then optionally:

```text
Further reading

• Repository
• A single repository?
• Which repository for group work?
```

Prefer "Related" or "Further reading" over generic recommendation language.

---

## 20. Metadata

Keep metadata quiet:

```text
Olivier Carrère
Technical writer

Updated September 2026 · 7 min read
```

Metadata should never compete with the page title or body.

---

## 21. Icons

Use icons only when they communicate an action or state:

- Search
- Copy
- External link
- Previous / next
- Language
- Theme

Avoid decorative iconography.

---

## 22. Borders and radius

Use small radii:

```text
--radius-sm: 3px
--radius-md: 6px
```

Avoid large rounded corners throughout the interface.

The site should feel like an editorial/technical publication rather than a contemporary SaaS application.

---

## 23. Spacing scale

Use an 8px-based system:

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
```

Typical documentation rhythm:

```text
H1 → intro        24px
intro → H2        48px
H2 → paragraph    20px
paragraph → p     16px
paragraph → list  16px
section → section 48px
```

---

## 24. Responsive breakpoints

Keep breakpoints simple:

```text
mobile      < 768px
tablet      768–1099px
desktop     ≥ 1100px
wide        ≥ 1400px
```

At wide widths, do not endlessly expand the text column. Add whitespace instead.

---

## 25. Accessibility

Accessibility should be part of the design system.

Required:

- WCAG-compliant contrast
- Visible keyboard focus
- Semantic headings
- Semantic navigation
- Accessible dialogs
- Keyboard-accessible search
- Reduced-motion support
- No information conveyed by color alone
- Comfortable touch targets
- Proper code-block copy buttons
- Correct `lang` attributes for EN/FR

---

## 26. Design tokens

Implement the design system as CSS custom properties rather than scattering values through Astro components.

```css
:root {
  --color-bg: #fcfbf8;
  --color-surface: #f4f1ec;
  --color-text: #242321;
  --color-text-muted: #6f6b65;
  --color-border: #ddd8d0;

  --color-accent: #c9684f;
  --color-accent-soft: #f3ded7;

  --color-code-bg: #f0efec;

  --font-sans: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --content-width: 760px;
  --sidebar-width: 250px;
  --toc-width: 200px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  --radius-sm: 3px;
  --radius-md: 6px;
}
```

Dark mode should override tokens rather than requiring separate component implementations.

---

## 27. Component inventory

### Layout

- `SiteHeader`
- `Sidebar`
- `TableOfContents`
- `Breadcrumbs`
- `PageLayout`
- `ContentContainer`

### Navigation

- `NavSection`
- `NavItem`
- `Pagination`
- `LanguageSwitcher`
- `ThemeSwitcher`

### Content

- `PageHeader`
- `Prose`
- `CodeBlock`
- `InlineCode`
- `Table`
- `Steps`
- `Quote`
- `Definition`

### Feedback

- `Note`
- `Tip`
- `Important`
- `Warning`
- `Error`

### Discovery

- `Search`
- `SearchResult`
- `AskDocumentation`
- `RelatedContent`
- `ExploreDocumentation`

### Editorial

- `Author`
- `Metadata`
- `SectionLabel`

This vocabulary should be sufficient to cover the site without creating an unnecessarily large component library.

---

## 28. Overall visual identity

The goal is not to make the site more visually spectacular.

The goal is to make it **more recognizably Redaction-technique.org**.

The strongest identity should come from:

**warm off-white background + black typography + terracotta accent + restrained borders + excellent typography + dense technical navigation**

This should distinguish the site from default Astro/Starlight documentation while preserving the qualities readers expect from a documentation site.

---

## 29. Recommended implementation strategy

Because the site is already Astro/Starlight, implement the design system as a **Starlight theme layer**, rather than rebuilding the UI from scratch.

Recommended sequence:

1. Establish design tokens.
2. Define typography.
3. Redesign the header and navigation.
4. Redesign content typography.
5. Standardize code blocks, callouts, and tables.
6. Redesign Search.
7. Redesign **Ask the documentation**.
8. Add reusable related-content and exploration components.
9. Implement responsive behavior.
10. Test English and French pages side by side.

### Guiding constraint

Do not change the existing information architecture or editorial content unless a change is required to implement the design system.
