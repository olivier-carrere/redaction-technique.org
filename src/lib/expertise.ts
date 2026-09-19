/**
 * Areas of professional expertise and the existing pages that evidence them.
 *
 * Single source for:
 * - the article footer author box (AuthorBio.astro), which links a page to
 *   the first area that lists it, and
 * - tests/expertise.test.mjs, which checks that every evidence slug exists in
 *   both locales and is linked from the matching /en|fr/expertise/ section.
 *
 * Slugs are locale-less entry IDs (EN and FR trees share slugs). Order
 * matters: when a page evidences several areas, the first area wins in the
 * author box. Only list areas the existing content genuinely supports.
 */

export interface ExpertiseArea {
  id: string;
  /** Also the section heading on /en/expertise/ and /fr/expertise/. */
  label: { en: string; fr: string };
  evidence: string[];
}

export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: 'structured-authoring',
    label: { en: 'Structured authoring and DITA', fr: 'Rédaction structurée et DITA' },
    evidence: [
      'formats/nufirewall-case-study',
      'formats/dita-xml-case-studies',
      'formats/structured-vs-unstructured-formats',
      'formats',
      'formats/document-architecture-complexity',
      'costs/formats-and-tools',
      'tech-writing-process/source-format',
      'tutorials/dita-xml-xsl-fo-tutorials',
    ],
  },
  {
    id: 'docs-as-code',
    label: { en: 'Docs-as-code', fr: 'Docs-as-code' },
    evidence: [
      'tech-writing-process/integrating-documentation-into-development',
      'tech-writing-process/version-control-systems',
      'tech-writing-process/git-from-file-to-content',
      'tech-writing-process/using-branches',
      'tech-writing-process/single-repository',
      'tech-writing-process/repository',
      'tech-writing-process/which-repository-for-group-work',
      'toolkit/example-docs-as-code-workflow',
      'toolkit/example-review-workflow',
      'toolkit/docs-as-code-adoption-checklist',
    ],
  },
  {
    id: 'automation',
    label: { en: 'Documentation automation and CI/CD', fr: 'Automatisation documentaire et CI/CD' },
    evidence: [
      'toolkit/example-cicd-pipeline',
      'tutorials/auto-insert-data-dita-xml',
      'tutorials/auto-insert-sql-data-restructuredtext',
      'tutorials/auto-insert-data-restructuredtext',
      'tutorials/conditional-text-jinja',
      'tutorials/conditional-text-jinja-object-method',
      'tutorials/conditional-text-sphinx-rest',
      'tutorials/python-regular-expressions',
      'tutorials/sed-text-editing',
      'tutorials/raspberry-pi-documentation-platform',
      'tutorials/project-end-to-end',
      'tech-writing-process/target-format',
    ],
  },
  {
    id: 'developer-documentation',
    label: { en: 'Developer and API documentation', fr: "Documentation développeur et d'API" },
    evidence: [
      'toolkit/api-documentation-template',
      'about-the-api',
      'tech-writing-process/testing-products',
      'tech-writing-process/gathering-information',
      'toolkit/technical-review-checklist',
      'toolkit/documentation-review-request-template',
    ],
  },
  {
    id: 'documentation-architecture',
    label: { en: 'Documentation and information architecture', fr: "Architecture documentaire et de l'information" },
    evidence: [
      'toolkit/information-types',
      'formats/modular-documentation',
      'costs/three-levels-of-documentation',
      'toolkit/example-repository-structure',
      'toolkit/concept-article-template',
      'toolkit/task-article-template',
      'toolkit/reference-article-template',
      'toolkit/example-markdown-page',
      'reference/glossary',
    ],
  },
  {
    id: 'documentation-process',
    label: { en: 'Documentation process and quality', fr: 'Processus documentaire et qualité' },
    evidence: [
      'tech-writing-process',
      'tech-writing-process/project-definition',
      'tech-writing-process/content-creation',
      'tech-writing-process/validation-quality-control',
      'tech-writing-process/delivery',
      'toolkit/documentation-project-plan-template',
      'toolkit/documentation-quality-checklist',
      'toolkit/release-readiness-checklist',
      'toolkit/documentation-audit-checklist',
      'toolkit/documentation-migration-checklist',
      'costs',
      'costs/copywriting-to-technical-communication',
      'costs/kiss-principle',
    ],
  },
  {
    id: 'localization',
    label: { en: 'Multilingual documentation', fr: 'Documentation multilingue' },
    evidence: [
      'tech-writing-process/translation',
    ],
  },
];

/**
 * Heading anchor of an area on the expertise page. Section headings are the
 * area labels, so this mirrors the github-slugger rules Starlight uses for
 * heading IDs (tests/expertise.test.mjs checks the two agree).
 */
export function expertiseAnchor(area: ExpertiseArea, lang: 'en' | 'fr'): string {
  return area.label[lang].toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-');
}

/** Strip the locale prefix from a Starlight entry ID: 'en/formats/x' → 'formats/x'. */
export function slugFromEntryId(entryId: string): string {
  return entryId.replace(/^(en|fr)(\/|$)/, '');
}

/** The first expertise area whose evidence includes this entry, if any. */
export function getExpertiseAreaForEntry(entryId: string | undefined): ExpertiseArea | undefined {
  if (!entryId) return undefined;
  const slug = slugFromEntryId(entryId);
  return EXPERTISE_AREAS.find((area) => area.evidence.includes(slug));
}
