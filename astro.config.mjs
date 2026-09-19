// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { unified } from '@astrojs/markdown-remark';
import { pluginShellPrompt } from './src/plugins/ec-shell-prompt.mjs';
import { remarkEmDash } from './src/plugins/remark-em-dash.mjs';
import { rehypeDefinitionList } from './src/plugins/rehype-definition-list.mjs';

const site = 'https://docs.redaction-technique.org/';

export const locales = {
  en: { label: 'English', lang: 'en' },
  fr: { label: 'Français', lang: 'fr' },
};

export default defineConfig({
  site,
  trailingSlash: 'always',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  markdown: {
    // Astro 7 defaults to the Sätteri engine, which escapes the raw-HTML icon
    // injected into Starlight asides. Keep the remark/rehype pipeline instead.
    processor: unified(),
    remarkPlugins: [remarkEmDash],
    rehypePlugins: [rehypeDefinitionList],
  },
  redirects: {
    '/': '/en/',
    '/explorer/': '/en/about-the-api/',
    '/en/explorer/': '/en/about-the-api/',
    '/fr/explorer/': '/fr/about-the-api/',
    // tech-writing-process — EN old slugs
    '/en/tech-writing-process/base-de-donnees-sql/':                                                                          '/en/tech-writing-process/sql-database/',
    '/en/tech-writing-process/collecte-de-l-information/':                                                                    '/en/tech-writing-process/gathering-information/',
    '/en/tech-writing-process/creation-du-contenu/':                                                                          '/en/tech-writing-process/content-creation/',
    '/en/tech-writing-process/definition-du-projet/':                                                                         '/en/tech-writing-process/project-definition/',
    '/en/tech-writing-process/format-cible/':                                                                                 '/en/tech-writing-process/target-format/',
    '/en/tech-writing-process/format-source/':                                                                                '/en/tech-writing-process/source-format/',
    '/en/tech-writing-process/git-du-fichier-au-contenu/':                                                                    '/en/tech-writing-process/git-from-file-to-content/',
    '/en/tech-writing-process/integrer-la-documentation-aux-processus-de-developpement/':                                     '/en/tech-writing-process/integrating-documentation-into-development/',
    '/en/tech-writing-process/les-cms-le-workflow-en-prime-mais-une-fiabilite-a-tester/':                                     '/en/tech-writing-process/cms-workflow-and-reliability/',
    '/en/tech-writing-process/les-repertoires-reseau-partages-peu-adaptes-au-travail-de-groupe/':                             '/en/tech-writing-process/shared-network-directories/',
    '/en/tech-writing-process/les-systemes-de-gestion-de-versions-rustiques-mais-fiables/':                                   '/en/tech-writing-process/version-control-systems/',
    '/en/tech-writing-process/livraison/':                                                                                    '/en/tech-writing-process/delivery/',
    '/en/tech-writing-process/quel-referentiel-pour-le-travail-de-groupe/':                                                   '/en/tech-writing-process/which-repository-for-group-work/',
    '/en/tech-writing-process/referentiel/':                                                                                  '/en/tech-writing-process/repository/',
    '/en/tech-writing-process/tester-les-produits-pour-les-documenter/':                                                      '/en/tech-writing-process/testing-products/',
    '/en/tech-writing-process/traduction/':                                                                                   '/en/tech-writing-process/translation/',
    '/en/tech-writing-process/un-referentiel-unique/':                                                                        '/en/tech-writing-process/single-repository/',
    '/en/tech-writing-process/utiliser-les-branches-des-systemes-de-gestion-de-sources/':                                     '/en/tech-writing-process/using-branches/',
    '/en/tech-writing-process/validation-et-controle-qualite/':                                                               '/en/tech-writing-process/validation-quality-control/',
    // tech-writing-process — FR old slugs
    '/fr/tech-writing-process/base-de-donnees-sql/':                                                                          '/fr/tech-writing-process/sql-database/',
    '/fr/tech-writing-process/collecte-de-l-information/':                                                                    '/fr/tech-writing-process/gathering-information/',
    '/fr/tech-writing-process/creation-du-contenu/':                                                                          '/fr/tech-writing-process/content-creation/',
    '/fr/tech-writing-process/definition-du-projet/':                                                                         '/fr/tech-writing-process/project-definition/',
    '/fr/tech-writing-process/format-cible/':                                                                                 '/fr/tech-writing-process/target-format/',
    '/fr/tech-writing-process/format-source/':                                                                                '/fr/tech-writing-process/source-format/',
    '/fr/tech-writing-process/git-du-fichier-au-contenu/':                                                                    '/fr/tech-writing-process/git-from-file-to-content/',
    '/fr/tech-writing-process/integrer-la-documentation-aux-processus-de-developpement/':                                     '/fr/tech-writing-process/integrating-documentation-into-development/',
    '/fr/tech-writing-process/les-cms-le-workflow-en-prime-mais-une-fiabilite-a-tester/':                                     '/fr/tech-writing-process/cms-workflow-and-reliability/',
    '/fr/tech-writing-process/les-repertoires-reseau-partages-peu-adaptes-au-travail-de-groupe/':                             '/fr/tech-writing-process/shared-network-directories/',
    '/fr/tech-writing-process/les-systemes-de-gestion-de-versions-rustiques-mais-fiables/':                                   '/fr/tech-writing-process/version-control-systems/',
    '/fr/tech-writing-process/livraison/':                                                                                    '/fr/tech-writing-process/delivery/',
    '/fr/tech-writing-process/quel-referentiel-pour-le-travail-de-groupe/':                                                   '/fr/tech-writing-process/which-repository-for-group-work/',
    '/fr/tech-writing-process/referentiel/':                                                                                  '/fr/tech-writing-process/repository/',
    '/fr/tech-writing-process/tester-les-produits-pour-les-documenter/':                                                      '/fr/tech-writing-process/testing-products/',
    '/fr/tech-writing-process/traduction/':                                                                                   '/fr/tech-writing-process/translation/',
    '/fr/tech-writing-process/un-referentiel-unique/':                                                                        '/fr/tech-writing-process/single-repository/',
    '/fr/tech-writing-process/utiliser-les-branches-des-systemes-de-gestion-de-sources/':                                     '/fr/tech-writing-process/using-branches/',
    '/fr/tech-writing-process/validation-et-controle-qualite/':                                                               '/fr/tech-writing-process/validation-quality-control/',
    // formats — EN old slugs
    '/en/formats/cas-concret-documentation-de-nufirewall/':                                                                   '/en/formats/nufirewall-case-study/',
    '/en/formats/cas-concrets-utilisation-de-dita-xml/':                                                                      '/en/formats/dita-xml-case-studies/',
    '/en/formats/du-document-a-la-base-documentaire-modulaire/':                                                              '/en/formats/modular-documentation/',
    '/en/formats/formats-structures-et-non-structures/':                                                                      '/en/formats/structured-vs-unstructured-formats/',
    '/en/formats/une-architecture-documentaire-trop-complexe/':                                                               '/en/formats/document-architecture-complexity/',
    // formats — FR old slugs
    '/fr/formats/cas-concret-documentation-de-nufirewall/':                                                                   '/fr/formats/nufirewall-case-study/',
    '/fr/formats/cas-concrets-utilisation-de-dita-xml/':                                                                      '/fr/formats/dita-xml-case-studies/',
    '/fr/formats/du-document-a-la-base-documentaire-modulaire/':                                                              '/fr/formats/modular-documentation/',
    '/fr/formats/formats-structures-et-non-structures/':                                                                      '/fr/formats/structured-vs-unstructured-formats/',
    '/fr/formats/une-architecture-documentaire-trop-complexe/':                                                               '/fr/formats/document-architecture-complexity/',
    // costs — EN old slugs
    '/en/costs/de-la-redaction-a-la-communication-technique/':                                                                '/en/costs/copywriting-to-technical-communication/',
    '/en/costs/formats-et-outils/':                                                                                           '/en/costs/formats-and-tools/',
    '/en/costs/les-trois-niveaux-de-la-documentation-technique/':                                                             '/en/costs/three-levels-of-documentation/',
    '/en/costs/principe-de-simplicite-kiss/':                                                                                 '/en/costs/kiss-principle/',
    '/en/costs/un-index-est-il-utile-dans-un-pdf/':                                                                          '/en/costs/',
    '/en/costs/index-in-pdf/':                                                                                               '/en/costs/',
    // costs — FR old slugs
    '/fr/costs/de-la-redaction-a-la-communication-technique/':                                                                '/fr/costs/copywriting-to-technical-communication/',
    '/fr/costs/formats-et-outils/':                                                                                           '/fr/costs/formats-and-tools/',
    '/fr/costs/les-trois-niveaux-de-la-documentation-technique/':                                                             '/fr/costs/three-levels-of-documentation/',
    '/fr/costs/principe-de-simplicite-kiss/':                                                                                 '/fr/costs/kiss-principle/',
    '/fr/costs/un-index-est-il-utile-dans-un-pdf/':                                                                          '/fr/costs/',
    '/fr/costs/index-in-pdf/':                                                                                               '/fr/costs/',
    // veille — EN old slugs
    '/en/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel/': '/en/tutorials/conditional-text-jinja-object-method/',
    '/en/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel/':      '/en/tutorials/conditional-text-jinja/',
    '/en/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel/':       '/en/tutorials/conditional-text-sphinx-rest/',
    '/en/veille/didacticiels-dita-xml-xsl-fo/':                                                                             '/en/tutorials/dita-xml-xsl-fo-tutorials/',
    '/en/veille/expressions-regulieres-python/':                                                                             '/en/tutorials/python-regular-expressions/',
    '/en/veille/inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext/':                                      '/en/tutorials/auto-insert-data-restructuredtext/',
    '/en/veille/inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext/':                                  '/en/tutorials/auto-insert-sql-data-restructuredtext/',
    '/en/veille/jourdainisation-en-ligne-python/':                                                                           '/en/tutorials/',
    '/en/veille/mener-un-projet-de-bout-en-bout/':                                                                          '/en/tutorials/project-end-to-end/',
    '/en/veille/raspberry-pi-plateforme-documentation/':                                                                     '/en/tutorials/raspberry-pi-documentation-platform/',
    '/en/veille/sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers/':                                                        '/en/tutorials/sed-text-editing/',
    '/fr/a-propos-de-ce-blog/':                                                                                                 '/fr/about-this-blog/',
    '/fr/inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml/':                                                        '/fr/tutorials/auto-insert-data-dita-xml/',
    // veille — FR old slugs
    '/fr/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel/': '/fr/tutorials/conditional-text-jinja-object-method/',
    '/fr/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel/':      '/fr/tutorials/conditional-text-jinja/',
    '/fr/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel/':       '/fr/tutorials/conditional-text-sphinx-rest/',
    '/fr/veille/didacticiels-dita-xml-xsl-fo/':                                                                             '/fr/tutorials/dita-xml-xsl-fo-tutorials/',
    '/fr/veille/expressions-regulieres-python/':                                                                             '/fr/tutorials/python-regular-expressions/',
    '/fr/veille/inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext/':                                      '/fr/tutorials/auto-insert-data-restructuredtext/',
    '/fr/veille/inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext/':                                  '/fr/tutorials/auto-insert-sql-data-restructuredtext/',
    '/fr/veille/jourdainisation-en-ligne-python/':                                                                           '/fr/tutorials/',
    '/fr/veille/mener-un-projet-de-bout-en-bout/':                                                                          '/fr/tutorials/project-end-to-end/',
    '/fr/veille/raspberry-pi-plateforme-documentation/':                                                                     '/fr/tutorials/raspberry-pi-documentation-platform/',
    '/fr/veille/sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers/':                                                        '/fr/tutorials/sed-text-editing/',

    // veille → tutorials — EN canonical
    '/en/veille/':                                                                                                                    '/en/tutorials/',
    '/en/veille/auto-insert-data-dita-xml/':                                                                                                              '/en/tutorials/auto-insert-data-dita-xml/',
    '/en/veille/auto-insert-data-restructuredtext/':                                                                                                              '/en/tutorials/auto-insert-data-restructuredtext/',
    '/en/veille/auto-insert-sql-data-restructuredtext/':                                                                                                              '/en/tutorials/auto-insert-sql-data-restructuredtext/',
    '/en/veille/conditional-text-jinja-object-method/':                                                                                                              '/en/tutorials/conditional-text-jinja-object-method/',
    '/en/veille/conditional-text-jinja/':                                                                                                              '/en/tutorials/conditional-text-jinja/',
    '/en/veille/conditional-text-sphinx-rest/':                                                                                                              '/en/tutorials/conditional-text-sphinx-rest/',
    '/en/veille/dita-xml-xsl-fo-tutorials/':                                                                                                              '/en/tutorials/dita-xml-xsl-fo-tutorials/',
    '/en/veille/project-end-to-end/':                                                                                                              '/en/tutorials/project-end-to-end/',
    '/en/veille/python-regular-expressions/':                                                                                                              '/en/tutorials/python-regular-expressions/',
    '/en/veille/raspberry-pi-documentation-platform/':                                                                                                              '/en/tutorials/raspberry-pi-documentation-platform/',
    '/en/veille/sed-text-editing/':                                                                                                              '/en/tutorials/sed-text-editing/',
    '/en/veille/word-shuffling-python/':                                                                                                              '/en/tutorials/',
    '/en/tutorials/word-shuffling-python/':                                                                                                           '/en/tutorials/',
    // veille → tutorials — FR canonical
    '/fr/veille/':                                                                                                                    '/fr/tutorials/',
    '/fr/veille/auto-insert-data-dita-xml/':                                                                                                              '/fr/tutorials/auto-insert-data-dita-xml/',
    '/fr/veille/auto-insert-data-restructuredtext/':                                                                                                              '/fr/tutorials/auto-insert-data-restructuredtext/',
    '/fr/veille/auto-insert-sql-data-restructuredtext/':                                                                                                              '/fr/tutorials/auto-insert-sql-data-restructuredtext/',
    '/fr/veille/conditional-text-jinja-object-method/':                                                                                                              '/fr/tutorials/conditional-text-jinja-object-method/',
    '/fr/veille/conditional-text-jinja/':                                                                                                              '/fr/tutorials/conditional-text-jinja/',
    '/fr/veille/conditional-text-sphinx-rest/':                                                                                                              '/fr/tutorials/conditional-text-sphinx-rest/',
    '/fr/veille/dita-xml-xsl-fo-tutorials/':                                                                                                              '/fr/tutorials/dita-xml-xsl-fo-tutorials/',
    '/fr/veille/project-end-to-end/':                                                                                                              '/fr/tutorials/project-end-to-end/',
    '/fr/veille/python-regular-expressions/':                                                                                                              '/fr/tutorials/python-regular-expressions/',
    '/fr/veille/raspberry-pi-documentation-platform/':                                                                                                              '/fr/tutorials/raspberry-pi-documentation-platform/',
    '/fr/veille/sed-text-editing/':                                                                                                              '/fr/tutorials/sed-text-editing/',
    '/fr/veille/word-shuffling-python/':                                                                                                              '/fr/tutorials/',
    '/fr/tutorials/word-shuffling-python/':                                                                                                           '/fr/tutorials/',

    // 2026-06 English-slug renames — old (previously live) slug → new slug
    '/en/tech-writing-process/version-management-systems/':                                                                   '/en/tech-writing-process/version-control-systems/',
    '/fr/tech-writing-process/version-management-systems/':                                                                   '/fr/tech-writing-process/version-control-systems/',
    '/en/formats/structured-unstructured-formats/':                                                                          '/en/formats/structured-vs-unstructured-formats/',
    '/fr/formats/structured-unstructured-formats/':                                                                          '/fr/formats/structured-vs-unstructured-formats/',
    '/en/formats/document-to-modular-base/':                                                                                 '/en/formats/modular-documentation/',
    '/fr/formats/document-to-modular-base/':                                                                                 '/fr/formats/modular-documentation/',
    '/en/tutorials/sed-text-modification/':                                                                                  '/en/tutorials/sed-text-editing/',
    '/fr/tutorials/sed-text-modification/':                                                                                  '/fr/tutorials/sed-text-editing/',
    '/en/tutorials/dita-xml-xslfo-tutorials/':                                                                               '/en/tutorials/dita-xml-xsl-fo-tutorials/',
    '/fr/tutorials/dita-xml-xslfo-tutorials/':                                                                               '/fr/tutorials/dita-xml-xsl-fo-tutorials/',
    '/fr/toolkit/types-d-information/':                                                                                       '/fr/toolkit/information-types/',
  },
  integrations: [
    starlight({
      title: 'Redaction-technique.org',
      customCss: ['./src/styles/custom.css'],
      expressiveCode: {
        plugins: [pluginShellPrompt()],
        styleOverrides: {
          codeFontFamily: 'var(--sl-font-mono)',
        },
      },
      components: {
        Head: './src/components/Head.astro',
        PageTitle: './src/components/PageTitle.astro',
        Pagination: './src/components/Pagination.astro',
        Hero: './src/components/Hero.astro',
        SocialIcons: './src/components/SocialIcons.astro',
      },
      social: [
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/carrereolivier/' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/olivier-carrere/redaction-technique.org' },
      ],
      lastUpdated: true,
      defaultLocale: 'en',
      locales,
      // 2026 information architecture: START HERE, then six sections in a
      // fixed, intentional order (do not alphabetize). Items reference existing
      // slugs directly rather than moving files between content folders, so a
      // page can change section without changing URL and no redirects are
      // needed. Each page appears exactly once. The EN and FR trees share the
      // same slugs; only labels differ (via `translations`). Topics of the
      // target IA with no existing page are content gaps and have no entry.
      sidebar: [
        {
          slug: 'index',
          label: 'Start here',
          translations: { fr: 'Commencer ici' },
        },
        {
          label: '1. Understand documentation',
          collapsed: false,
          translations: { fr: '1. Comprendre la documentation' },
          items: [
            { slug: 'learn', label: 'Overview', translations: { fr: "Vue d'ensemble" } },
            // What makes technical documentation valuable?
            { slug: 'costs' },
            // Documentation maturity
            { slug: 'costs/three-levels-of-documentation' },
            // Technical writing vs technical communication
            { slug: 'costs/copywriting-to-technical-communication' },
            // Information types
            { slug: 'toolkit/information-types' },
            { slug: 'costs/kiss-principle' },
          ],
        },
        {
          label: '2. Build a documentation process',
          collapsed: true,
          translations: { fr: '2. Construire un processus documentaire' },
          // Workflow order: define → gather → test → create → review →
          // translate → publish.
          items: [
            { slug: 'process', label: 'Overview', translations: { fr: "Vue d'ensemble" } },
            { slug: 'tech-writing-process' },
            { slug: 'tech-writing-process/project-definition' },
            { slug: 'tech-writing-process/gathering-information' },
            { slug: 'tech-writing-process/testing-products' },
            { slug: 'tech-writing-process/content-creation' },
            { slug: 'tech-writing-process/validation-quality-control' },
            { slug: 'tech-writing-process/translation' },
            { slug: 'tech-writing-process/delivery' },
            { slug: 'tutorials/project-end-to-end' },
          ],
        },
        {
          label: '3. Adopt docs-as-code',
          collapsed: true,
          translations: { fr: '3. Adopter le docs-as-code' },
          // CI/CD and documentation review: no dedicated article yet (content
          // gaps); the section overview links to the toolkit examples instead.
          items: [
            { slug: 'docs-as-code', label: 'Overview', translations: { fr: "Vue d'ensemble" } },
            // Why docs-as-code?
            { slug: 'tech-writing-process/integrating-documentation-into-development' },
            {
              label: 'Git',
              items: [
                { slug: 'tech-writing-process/version-control-systems' },
                { slug: 'tech-writing-process/git-from-file-to-content' },
              ],
            },
            {
              label: 'Repository design',
              translations: { fr: 'Conception du référentiel' },
              items: [
                { slug: 'tech-writing-process/repository' },
                { slug: 'tech-writing-process/single-repository' },
                { slug: 'tech-writing-process/which-repository-for-group-work' },
                { slug: 'tech-writing-process/shared-network-directories' },
                { slug: 'tech-writing-process/sql-database' },
                { slug: 'tech-writing-process/cms-workflow-and-reliability' },
              ],
            },
            // Branches
            { slug: 'tech-writing-process/using-branches' },
          ],
        },
        {
          label: '4. Choose an authoring model',
          collapsed: true,
          translations: { fr: '4. Choisir un modèle de rédaction' },
          // Markdown: no dedicated article yet (content gap); the section
          // overview links to the Markdown worked example in the toolkit.
          // DITA is presented as one structured-authoring model, not the default.
          items: [
            { slug: 'tools-and-formats', label: 'Overview', translations: { fr: "Vue d'ensemble" } },
            {
              label: 'Structured authoring',
              translations: { fr: 'Rédaction structurée' },
              items: [
                { slug: 'structured-authoring' },
                { slug: 'formats/structured-vs-unstructured-formats' },
              ],
            },
            {
              label: 'DITA',
              items: [
                { slug: 'formats' },
                { slug: 'formats/dita-xml-case-studies' },
                { slug: 'formats/document-architecture-complexity' },
                { slug: 'formats/nufirewall-case-study' },
              ],
            },
            // Content reuse
            { slug: 'formats/modular-documentation' },
            {
              label: 'Source vs target formats',
              translations: { fr: 'Formats source et cible' },
              items: [
                { slug: 'tech-writing-process/source-format' },
                { slug: 'tech-writing-process/target-format' },
                { slug: 'costs/formats-and-tools' },
              ],
            },
          ],
        },
        {
          label: '5. Build your toolkit',
          collapsed: true,
          translations: { fr: '5. Constituer votre boîte à outils' },
          items: [
            { slug: 'toolkit', label: 'Overview', translations: { fr: "Vue d'ensemble" } },
            {
              label: 'Templates',
              translations: { fr: 'Modèles' },
              items: [
                { slug: 'toolkit/concept-article-template' },
                { slug: 'toolkit/task-article-template' },
                { slug: 'toolkit/reference-article-template' },
                { slug: 'toolkit/documentation-project-plan-template' },
                { slug: 'toolkit/documentation-review-request-template' },
              ],
            },
            {
              label: 'Checklists',
              translations: { fr: 'Check-lists' },
              items: [
                { slug: 'toolkit/documentation-quality-checklist' },
                { slug: 'toolkit/technical-review-checklist' },
                { slug: 'toolkit/release-readiness-checklist' },
                { slug: 'toolkit/documentation-migration-checklist' },
                { slug: 'toolkit/docs-as-code-adoption-checklist' },
                { slug: 'toolkit/documentation-audit-checklist' },
              ],
            },
            {
              label: 'Worked examples',
              translations: { fr: 'Exemples concrets' },
              items: [
                { slug: 'toolkit/example-markdown-page' },
                { slug: 'toolkit/example-repository-structure' },
                { slug: 'toolkit/example-docs-as-code-workflow' },
                { slug: 'toolkit/example-review-workflow' },
                { slug: 'toolkit/example-cicd-pipeline' },
              ],
            },
            {
              // Kept as its own group so API documentation stays prominent.
              label: 'API documentation',
              translations: { fr: "Documentation d'API" },
              items: [
                { slug: 'toolkit/api-documentation-template' },
              ],
            },
          ],
        },
        {
          label: '6. Automation & legacy techniques',
          collapsed: true,
          translations: { fr: '6. Automatisation et techniques spécialisées' },
          // Specialist or historical implementation techniques — not
          // recommended defaults for new documentation projects.
          items: [
            { slug: 'tutorials', label: 'Overview', translations: { fr: "Vue d'ensemble" } },
            {
              label: 'Jinja',
              items: [
                { slug: 'tutorials/conditional-text-jinja' },
                { slug: 'tutorials/conditional-text-jinja-object-method' },
                { slug: 'tutorials/auto-insert-data-restructuredtext' },
              ],
            },
            {
              label: 'Python',
              items: [
                { slug: 'tutorials/python-regular-expressions' },
                { slug: 'tutorials/auto-insert-data-dita-xml' },
                { slug: 'tutorials/auto-insert-sql-data-restructuredtext' },
              ],
            },
            // sed
            { slug: 'tutorials/sed-text-editing' },
            // Sphinx/ReST
            { slug: 'tutorials/conditional-text-sphinx-rest' },
            // XSL-FO
            { slug: 'tutorials/dita-xml-xsl-fo-tutorials' },
            // Raspberry Pi
            { slug: 'tutorials/raspberry-pi-documentation-platform' },
          ],
        },
        {
          label: 'Explore the reference',
          collapsed: true,
          translations: { fr: 'Explorer la référence' },
          items: [
            { autogenerate: { directory: 'reference' } },
          ],
        },
        {
          // Machine-readable access to this manual: the static API (llms.txt,
          // Markdown mirrors, JSON indexes) and the grounded AI assistant.
          label: 'Documentation API & AI',
          collapsed: false,
          translations: { fr: 'API documentaire et IA' },
          items: [
            {
              label: 'Documentation API',
              translations: {
                fr: 'API documentaire',
              },
              slug: 'about-the-api',
            },
            {
              label: 'Ask the documentation',
              translations: {
                fr: 'Interroger la documentation',
              },
              slug: 'ask',
            },
          ],
        },
        {
          label: 'Blog - redaction-technique.org',
          link: 'https://redaction-technique.org/',
          attrs: { target: '_blank', rel: 'noopener' },
        },
      ],
    }),
    mdx(),
    sitemap(),
  ],
});
