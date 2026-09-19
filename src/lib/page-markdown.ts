/**
 * Core utility for generating clean, canonical Markdown representation
 * of documentation pages for "Copy for LLM" and "View as Markdown".
 */

import { DIAGRAM_TEXT } from '../components/diagrams/diagram-text.ts';

export interface DocPage {
  id: string;
  data: {
    title: string;
    description?: string;
  };
  body: string;
}

export const SITE_URL = 'https://docs.redaction-technique.org';

const TOP_LEVEL_SECTIONS = [
  'tech-writing-process',
  'formats',
  'costs',
  'tutorials',
  'about-this-blog',
  'ask',
];

/**
 * Calculates the canonical HTML URL for a given doc ID.
 */
export function getCanonicalUrl(docId: string, siteUrl: string = SITE_URL): string {
  const base = siteUrl.replace(/\/+$/, '');
  if (docId === 'en') return `${base}/en/`;
  if (docId === 'fr') return `${base}/fr/`;
  return `${base}/${docId.replace(/^\/+|\/+$/g, '')}/`;
}

/**
 * Calculates the deterministic .md endpoint URL for a given doc ID.
 */
export function getMarkdownUrl(docId: string): string {
  if (docId === 'en') return '/en.md';
  if (docId === 'fr') return '/fr.md';
  return `/${docId.replace(/^\/+|\/+$/g, '')}.md`;
}

/**
 * Whether a .md endpoint is generated for this entry ID. Only localized docs
 * entries have one; Starlight's 404 and virtual pages such as /tag/* do not.
 */
export function hasMarkdownUrl(docId: string | undefined): docId is string {
  return !!docId && /^(en|fr)(\/|$)/.test(docId);
}

/**
 * Helper to resolve internal links against the page's canonical URL and language context.
 */
export function resolveLink(
  href: string,
  canonicalUrl: string,
  siteUrl: string = SITE_URL,
  lang: 'en' | 'fr' = 'en'
): string {
  if (!href) return '';
  const trimmed = href.trim();
  if (
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    /^[a-z]+:\/\//i.test(trimmed)
  ) {
    return trimmed;
  }

  const baseClean = siteUrl.replace(/\/+$/, '');
  const localeRoot = `${baseClean}/${lang}/`;

  // Root-relative asset or path
  if (trimmed.startsWith('/')) {
    return `${baseClean}${trimmed}`;
  }

  // Relative link pointing directly to a top-level section without ../
  for (const section of TOP_LEVEL_SECTIONS) {
    if (trimmed === section || trimmed.startsWith(`${section}/`)) {
      return `${localeRoot}${trimmed.replace(/^\/+/, '')}`;
    }
  }

  try {
    return new URL(trimmed, canonicalUrl).href;
  } catch {
    return trimmed;
  }
}

/**
 * SedBox shell command lookup to reconstruct command examples in tutorials.
 */
const SED_CONFIG = {
  w: "\\(\\<.*\\>\\)",
  m: "\\(\\<.*\\>\\) \\(\\<.*\\>\\), \\(\\<.*\\>\\) \\(\\<.*\\>\\) \\(\\<.*\\>\\) \\(\\<.*\\>\\) \\(\\<.*\\>\\) \\(\\<.*\\>\\)",
  rBase: "\\9 \\8 \\6 \\7, \\1 \\2, \\3 \\4 \\5",
  en: {
    two: "\\(\\<.*\\> \\<.*\\>\\)",
    single: "Fair Marchioness, your beautiful eyes make me die of love.",
    reps: {
      m1: "\\u\\9 \\8 \\6 \\7, \\l\\1 \\2, \\3 \\4 \\5",
      m2: "\\u\\3 \\4 \\5 \\9 \\6 \\7, \\l\\1 \\2, \\8",
      m3: "\\u\\8 \\9 \\3 \\4 \\5, \\l\\1 \\2, \\6 \\7",
      m4: "\\u\\7 \\6 \\3 \\4 \\5 \\8, \\l\\1 \\2, \\9",
    },
  },
  fr: {
    two: "\\(d'\\<.*\\>\\)",
    single: "Belle marquise, vos beaux yeux me font mourir d'amour.",
    reps: {
      m1: "\\u\\9 \\8 \\6 \\7, \\l\\1 \\2, \\3 \\4 \\5",
      m2: "\\u\\3 \\5 \\4 \\9 \\6 \\7, \\l\\1 \\2, \\8",
      m3: "\\u\\8 \\3 \\4 \\5, \\l\\1 \\2, \\9 \\6 \\7",
      m4: "\\u\\6 \\7 \\3 \\5 \\4 \\8, \\l\\1 \\2, \\9",
    },
  },
};

function getSedCommand(lang: 'en' | 'fr', variant: string): string | null {
  const conf = SED_CONFIG[lang] || SED_CONFIG.en;
  const { m, rBase } = SED_CONFIG;
  const two = conf.two;
  const reps = conf.reps as Record<string, string>;

  if (variant in reps) {
    return `sed "s/${m} ${two}/${reps[variant]}/"`;
  }
  if (variant === 'echoSentence') {
    return `echo "${conf.single}"`;
  }
  if (variant === 'echoDeclaration') {
    return `export declaration="${conf.single}"\necho $declaration`;
  }
  if (variant === 'literal') {
    return `sed "s/PATTERN/${rBase}/"`;
  }
  if (variant === 'loop') {
    return `for (( i=1; i<5; i++ )); do\n   while read s;\n    do echo "$s" |\n     sed -f moliere$i.sed ;\n    done < variations.txt\n   done`;
  }
  if (variant === 'p' || variant.startsWith('geek')) {
    const rep = reps[variant] || reps.m1;
    return `export p="${m} ${two}"\nsed "s/$p/${rep}/"`;
  }
  return null;
}

/**
 * Converts the canonical documentation entry into clean, LLM-friendly Markdown.
 */
export function getPageMarkdown(
  doc: DocPage,
  siteUrl: string = SITE_URL
): string {
  const lang: 'en' | 'fr' = doc.id.startsWith('fr') ? 'fr' : 'en';
  const canonicalUrl = getCanonicalUrl(doc.id, siteUrl);

  let text = doc.body;

  // 1. Remove frontmatter if present
  text = text.replace(/^---[\s\S]*?---\s*/m, '');

  // 2. Protect existing fenced code blocks
  const codeBlocks: string[] = [];
  text = text.replace(/(^|\n)(`{3,}|~{3,})([^\n]*)\n([\s\S]*?)\n\2(?=\n|$)/g, (match) => {
    const idx = codeBlocks.length;
    codeBlocks.push(match);
    return `\n\uE000CB_${idx}\uE001\n`;
  });

  // 3. Replace native SVG diagram components with their text alternative \u2014
  // the same accessible name and description the rendered figure exposes.
  text = text.replace(/<([A-Z]\w*)\s*\/>/g, (match, name: string) => {
    const entry = DIAGRAM_TEXT[name]?.[lang];
    if (!entry) return match;
    const label = lang === 'fr' ? 'Sch\u00E9ma' : 'Diagram';
    const body = entry.description ? `\n>\n> ${entry.description}` : '';
    return `\n\n> **${label}: ${entry.title}**${body}\n\n`;
  });

  // 4. Transform <SedBox lang="..." variant="..." /> BEFORE inline code protection
  text = text.replace(/<SedBox\s+([^>]*?)\/?>/gi, (_, attrsStr) => {
    const getAttr = (name: string) => {
      const m = attrsStr.match(new RegExp(`${name}=["']([^"']*)["']`));
      return m ? m[1] : '';
    };
    const boxLang = (getAttr('lang') || lang) as 'en' | 'fr';
    const variant = getAttr('variant');
    const cmd = getSedCommand(boxLang, variant);
    if (cmd) {
      const bashBlock = `\`\`\`bash\n${cmd}\n\`\`\``;
      const idx = codeBlocks.length;
      codeBlocks.push(bashBlock);
      return `\n\uE000CB_${idx}\uE001\n`;
    }
    return '';
  });

  // 5. Transform <AwkBox lang="..." variant="..." /> BEFORE inline code protection
  text = text.replace(/<AwkBox\s+([^>]*?)\/?>/gi, (_, attrsStr) => {
    const getAttr = (name: string) => {
      const m = attrsStr.match(new RegExp(`${name}=["']([^"']*)["']`));
      return m ? m[1] : '';
    };
    const boxLang = (getAttr('lang') || lang) as 'en' | 'fr';
    const variant = getAttr('variant');
    let bashBlock = '';
    if (variant === 'awk') {
      const prog = boxLang === 'fr'
        ? `{print $9" "$8" "$6" "$7" "$1" "$2" "$3" "$4" "$5}`
        : `{print $9" "$10" "$8" "$6" "$7" "$1" "$2" "$3" "$4" "$5}`;
      bashBlock = `\`\`\`bash\nawk '${prog}'\n\`\`\``;
    } else {
      bashBlock = `\`\`\`bash\nawk '1'\n\`\`\``;
    }
    const idx = codeBlocks.length;
    codeBlocks.push(bashBlock);
    return `\n\uE000CB_${idx}\uE001\n`;
  });

  // 6. Protect inline code
  const inlineCodeBlocks: string[] = [];
  text = text.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (match) => {
    const idx = inlineCodeBlocks.length;
    inlineCodeBlocks.push(match);
    return `\uE000IC_${idx}\uE001`;
  });

  // 7. Strip JavaScript / MDX imports
  text = text.replace(/^import\s+[\s\S]*?;\s*$/gm, '');
  text = text.replace(/^import\s+['"][^'"]+['"]\s*;?\s*$/gm, '');

  // 8. Transform Starlight Admonitions (:::note[Title] ... :::)
  text = text.replace(/(^|\n):::([a-z]+)(?:\[([^\]]*)\])?\s*\n([\s\S]*?)\n:::(?=\n|$)/gi, (_, prefix, type, title, content) => {
    const typeKey = (type || '').toLowerCase();
    const labelMap: Record<string, string> = {
      note: 'Note',
      tip: lang === 'fr' ? 'Astuce' : 'Tip',
      caution: lang === 'fr' ? 'Attention' : 'Caution',
      important: 'Important',
      danger: lang === 'fr' ? 'Danger' : 'Danger',
      warning: lang === 'fr' ? 'Avertissement' : 'Warning',
    };
    const baseLabel = labelMap[typeKey] || (typeKey.charAt(0).toUpperCase() + typeKey.slice(1));
    const header = title && title.trim().toLowerCase() !== baseLabel.toLowerCase()
      ? `${baseLabel}: ${title.trim()}`
      : baseLabel;

    const lines = content.trim().split('\n');
    const quoted = lines.map((line: string) => (line.length > 0 ? `> ${line}` : '>')).join('\n');
    return `${prefix}\n> **${header}**\n>\n${quoted}\n`;
  });

  // 9. Transform <Aside type="..." title="..."> ... </Aside>
  text = text.replace(/<Aside(?:\s+type=["']([^"']*)["'])?(?:\s+title=["']([^"']*)["'])?[^>]*>([\s\S]*?)<\/Aside>/gi, (_, type, title, content) => {
    const typeKey = (type || 'note').toLowerCase();
    const labelMap: Record<string, string> = {
      note: 'Note',
      tip: lang === 'fr' ? 'Astuce' : 'Tip',
      caution: lang === 'fr' ? 'Attention' : 'Caution',
      important: 'Important',
      danger: lang === 'fr' ? 'Danger' : 'Danger',
      warning: lang === 'fr' ? 'Avertissement' : 'Warning',
    };
    const baseLabel = labelMap[typeKey] || 'Note';
    const header = title ? `${baseLabel}: ${title.trim()}` : baseLabel;
    const lines = content.trim().split('\n');
    const quoted = lines.map((line: string) => (line.length > 0 ? `> ${line}` : '>')).join('\n');
    return `\n> **${header}**\n>\n${quoted}\n`;
  });

  // 10. Transform <LinkCard ... />
  text = text.replace(/<LinkCard\s+([^>]*?)\/?>/gi, (_, attrsStr) => {
    const getAttr = (name: string) => {
      const m = attrsStr.match(new RegExp(`${name}=["']([^"']*)["']`));
      return m ? m[1] : '';
    };
    const title = getAttr('title');
    const href = getAttr('href');
    const desc = getAttr('description');
    const resolvedHref = resolveLink(href, canonicalUrl, siteUrl, lang);
    if (title && resolvedHref) {
      return desc ? `- [**${title}**](${resolvedHref}): ${desc}` : `- [**${title}**](${resolvedHref})`;
    }
    return '';
  });

  // 11. Remove <CardGrid> wrappers
  text = text.replace(/<\/?CardGrid[^>]*>/gi, '');

  // 12. Transform <Card title="..." icon="...">content</Card>
  text = text.replace(/<Card\s+title=["']([^"']*)["'][^>]*>([\s\S]*?)<\/Card>/gi, (_, title, content) => {
    return `\n### ${title}\n\n${content.trim()}\n`;
  });

  // 13. Transform <Steps> and </Steps>
  text = text.replace(/<\/?Steps[^>]*>/gi, '');

  // 14. Transform <Tabs> and <TabItem>
  text = text.replace(/<\/?Tabs[^>]*>/gi, '');
  text = text.replace(/<TabItem\s+label=["']([^"']*)["'][^>]*>([\s\S]*?)<\/TabItem>/gi, (_, label, content) => {
    return `\n#### Tab: ${label}\n\n${content.trim()}\n`;
  });

  // 15. Clean interactive demos / widgets that cannot be rendered statically
  text = text.replace(/<SedMoliere[^>]*\/?>/gi, '');
  text = text.replace(/<PyScriptMoliere[^>]*\/?>/gi, '');
  text = text.replace(/<DitaRenameBox[^>]*\/?>/gi, '');
  text = text.replace(/<AskAssistant[^>]*\/?>/gi, '');
  text = text.replace(/<DocumentationExplorer[^>]*\/?>/gi, '');
  text = text.replace(/<BrowseAll[^>]*\/?>/gi, '');
  text = text.replace(/<SiteOrientation[^>]*\/?>/gi, '');
  text = text.replace(/<StartHere[^>]*\/?>/gi, '');
  text = text.replace(/<section\s+class=["']ask-homepage-panel[^"']*["'][^>]*>[\s\S]*?<\/section>/gi, '');

  // 15b. Transform <InformationType type="..." />
  text = text.replace(/<InformationType\s+type=["']([^"']*)["'][^>]*\/?>/gi, (_, type) => {
    const t = (type || 'concept').toLowerCase();
    const typeLabel = t === 'task' ? (lang === 'fr' ? 'Tâche' : 'Task')
      : t === 'reference' ? (lang === 'fr' ? 'Référence' : 'Reference')
      : 'Concept';
    const linkUrl = lang === 'fr'
      ? `${siteUrl}/fr/toolkit/information-types/`
      : `${siteUrl}/en/toolkit/information-types/`;
    const label = lang === 'fr' ? "Type d'information :" : "Information type:";
    return `\n**${label}** [${typeLabel}](${linkUrl})\n`;
  });

  // 16. Convert <abbr title="...">ABBR</abbr> to ABBR (Meaning)
  text = text.replace(/<abbr\s+title=["']([^"']*)["']>([^<]*)<\/abbr>/gi, '$2 ($1)');

  // 17. Clean any remaining interactive or non-standard self-closing components
  text = text.replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, '');

  // 18. Resolve markdown links [text](href) and images ![alt](src)
  text = text.replace(/(!?\[[^\]]*\])\(([^)]+)\)/g, (_, prefix, href) => {
    return `${prefix}(${resolveLink(href, canonicalUrl, siteUrl, lang)})`;
  });

  // 19. Restore protected inline code
  text = text.replace(/\uE000IC_(\d+)\uE001/g, (_, idx) => {
    return inlineCodeBlocks[parseInt(idx, 10)] ?? '';
  });

  // 20. Restore protected fenced code blocks
  text = text.replace(/\uE000CB_(\d+)\uE001/g, (_, idx) => {
    return codeBlocks[parseInt(idx, 10)] ?? '';
  });

  // 21. Format page title and footer
  let cleanBody = text.trim();

  // Check if body already begins with a top-level # title
  const startsWithH1 = cleanBody.trimStart().startsWith('# ');
  let result = '';
  if (!startsWithH1 && doc.data.title) {
    result = `# ${doc.data.title}\n\n${cleanBody}`;
  } else {
    result = cleanBody;
  }

  // 22. Append canonical source metadata
  result += `\n\n---\n\nSource: ${canonicalUrl}\n`;

  // 23. Collapse excessive blank lines
  result = result.replace(/\n{3,}/g, '\n\n').trim() + '\n';

  return result;
}

export * from './document-resource.ts';
