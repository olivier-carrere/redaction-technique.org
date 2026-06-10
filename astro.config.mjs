// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import rehypeMermaid from 'rehype-mermaid';

const site = 'https://docs.redaction-technique.org/';

export const locales = {
  en: { label: 'English', lang: 'en' },
  fr: { label: 'Français', lang: 'fr' },
};

export default defineConfig({
  site,
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [rehypeMermaid],
  },
  redirects: {
    // tech-writing-process
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
    '/en/tech-writing-process/les-systemes-de-gestion-de-versions-rustiques-mais-fiables/':                                   '/en/tech-writing-process/version-management-systems/',
    '/en/tech-writing-process/livraison/':                                                                                    '/en/tech-writing-process/delivery/',
    '/en/tech-writing-process/quel-referentiel-pour-le-travail-de-groupe/':                                                   '/en/tech-writing-process/which-repository-for-group-work/',
    '/en/tech-writing-process/referentiel/':                                                                                  '/en/tech-writing-process/repository/',
    '/en/tech-writing-process/tester-les-produits-pour-les-documenter/':                                                      '/en/tech-writing-process/testing-products/',
    '/en/tech-writing-process/traduction/':                                                                                   '/en/tech-writing-process/translation/',
    '/en/tech-writing-process/un-referentiel-unique/':                                                                        '/en/tech-writing-process/single-repository/',
    '/en/tech-writing-process/utiliser-les-branches-des-systemes-de-gestion-de-sources/':                                     '/en/tech-writing-process/using-branches/',
    '/en/tech-writing-process/validation-et-controle-qualite/':                                                               '/en/tech-writing-process/validation-quality-control/',
    // formats
    '/en/formats/cas-concret-documentation-de-nufirewall/':                                                                   '/en/formats/nufirewall-case-study/',
    '/en/formats/cas-concrets-utilisation-de-dita-xml/':                                                                      '/en/formats/dita-xml-case-studies/',
    '/en/formats/du-document-a-la-base-documentaire-modulaire/':                                                              '/en/formats/document-to-modular-base/',
    '/en/formats/formats-structures-et-non-structures/':                                                                      '/en/formats/structured-unstructured-formats/',
    '/en/formats/une-architecture-documentaire-trop-complexe/':                                                               '/en/formats/document-architecture-complexity/',
    // costs
    '/en/costs/de-la-redaction-a-la-communication-technique/':                                                                '/en/costs/copywriting-to-technical-communication/',
    '/en/costs/formats-et-outils/':                                                                                           '/en/costs/formats-and-tools/',
    '/en/costs/les-trois-niveaux-de-la-documentation-technique/':                                                             '/en/costs/three-levels-of-documentation/',
    '/en/costs/principe-de-simplicite-kiss/':                                                                                 '/en/costs/kiss-principle/',
    '/en/costs/un-index-est-il-utile-dans-un-pdf/':                                                                          '/en/costs/index-in-pdf/',
    // veille
    '/en/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel/': '/en/veille/conditional-text-jinja-object-method/',
    '/en/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel/':      '/en/veille/conditional-text-jinja/',
    '/en/veille/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel/':       '/en/veille/conditional-text-sphinx-rest/',
    '/en/veille/didacticiels-dita-xml-xsl-fo/':                                                                             '/en/veille/dita-xml-xslfo-tutorials/',
    '/en/veille/expressions-regulieres-python/':                                                                             '/en/veille/python-regular-expressions/',
    '/en/veille/inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext/':                                      '/en/veille/auto-insert-data-restructuredtext/',
    '/en/veille/inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext/':                                  '/en/veille/auto-insert-sql-data-restructuredtext/',
    '/en/veille/jourdainisation-en-ligne-python/':                                                                           '/en/veille/word-shuffling-python/',
    '/en/veille/mener-un-projet-de-bout-en-bout/':                                                                          '/en/veille/project-end-to-end/',
    '/en/veille/raspberry-pi-plateforme-documentation/':                                                                     '/en/veille/raspberry-pi-documentation-platform/',
    '/en/veille/sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers/':                                                        '/en/veille/sed-text-modification/',
  },
  integrations: [
    sitemap(),
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Redaction-technique.org',
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      lastUpdated: true,
      defaultLocale: 'en',
      locales,
      sidebar: [
        {
          label: '✍ Blog — redaction-technique.org',
          link: 'https://redaction-technique.org/',
          attrs: { target: '_blank', rel: 'noopener' },
        },
        {
          label: 'Technical writing: An industrial process',
          translations: {
            fr: 'Rédaction technique : un processus industriel',
          },
          autogenerate: { directory: 'tech-writing-process' },
        },
        {
          label: 'Technology watch',
          translations: {
            fr: 'Veille technologique',
          },
          autogenerate: { directory: 'veille' },
        },
        {
          label: 'Structured DITA XML format',
          translations: {
            fr: 'Format structuré DITA XML',
          },
          autogenerate: { directory: 'formats' },
        },
        {
          label: 'Reduce costs, increase customer satisfaction',
          translations: {
            fr: 'Diminuer les coûts, augmenter la satisfaction client',
          },
          autogenerate: { directory: 'costs' },
        },
      ],
    }),
    vercel({
      webAnalytics: {
        enabled: true,
      },
    }),
  ],
});
