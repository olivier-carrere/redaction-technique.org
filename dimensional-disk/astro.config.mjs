// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Kusens de Maître Kosen',
      defaultLocale: 'fr',
      locales: {
        fr: {
          label: 'Français',
          lang: 'fr',
          title: 'Kusens',
          sidebar: [
            {
              label: "Présentation",
              collapsed: false,
              items: [
                { slug: "fr/a-propos-de-ce-blog" },
                { slug: "fr/definition-du-projet" },
                { slug: "fr/contact" },
              ],
            },
            {
              label: "Création et gestion du contenu",
              collapsed: true,
              items: [
                { slug: "fr/creation-du-contenu" },
                { slug: "fr/cree-et-modifiez-le-texte" },
                { slug: "fr/cree-et-modifiez-les-schemas" },
                { slug: "fr/creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel" },
                { slug: "fr/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel" },
                { slug: "fr/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel" },
              ],
            },
            {
              label: "Dita et formats",
              collapsed: true,
              items: [
                { slug: "fr/dita-open-toolkit-afficher-les-references-croisees-dans-les-pdf" },
                { slug: "fr/didacticiels-dita-xml-xsl-fo" },
                { slug: "fr/docbook-ou-dita-xml" },
                { slug: "fr/formats-cibles" },
                { slug: "fr/formats-et-outils" },
                { slug: "fr/formats-sources" },
                { slug: "fr/formats-structures-et-non-structures" },
                { slug: "fr/format-source" },
                { slug: "fr/format-cible" },
                { slug: "fr/format-structure-dita-xml" },
              ],
            },
            {
              label: "Git et gestion de versions",
              collapsed: true,
              items: [
                { slug: "fr/git-du-fichier-au-contenu" },
                { slug: "fr/organiser-son-historique-avec-git-rebase" },
                { slug: "fr/les-systemes-de-gestion-de-versions-rustiques-mais-fiables" },
              ],
            },
            {
              label: "Workflow et projet",
              collapsed: true,
              items: [
                { slug: "fr/projet-bout-en-bout-communication-interne" },
                { slug: "fr/projet-bout-en-bout-definition-des-roles-des-membres-du-worfklow-photo" },
                { slug: "fr/projet-bout-en-bout-definition-workflow-de-gestion-des-photos" },
                { slug: "fr/projet-bout-en-bout-didacticiels-video" },
                { slug: "fr/projet-bout-en-bout-galerie-photo-centralisee-dans-le-cloud" },
                { slug: "fr/projet-bout-en-bout-gestion-des-photos-association" },
                { slug: "fr/projet-bout-en-bout-iconographie" },
                { slug: "fr/projet-bout-en-bout-indexation-des-photos" },
                { slug: "fr/projet-bout-en-bout-latex" },
                { slug: "fr/projet-bout-en-bout-patience" },
                { slug: "fr/projet-bout-en-bout-recuperation-et-tri-des-photos" },
                { slug: "fr/projet-bout-en-bout-sauvegarde-incrementale-et-decentralisee" },
                { slug: "fr/projet-bout-en-bout-style-redactionnel" },
                { slug: "fr/projet-bout-en-bout-suivi-des-modifications-sous-git" },
                { slug: "fr/projet-bout-en-bout-support-papier" },
              ],
            },
            {
              label: "Référentiels et conrefs",
              collapsed: true,
              items: [
                { slug: "fr/centraliser-les-conref-dans-un-fichier-unique" },
                { slug: "fr/imbriquer-les-conref" },
                { slug: "fr/fournir-une-information-ciblee-avec-le-texte-conditionnel-ditaval" },
                { slug: "fr/partager-des-blocs-information-atomiques-avec-les-conref" },
                { slug: "fr/maximiser-utilisation-des-conref-pour-faire-baisser-les-couts" },
              ],
            },
            {
              label: "Divers techniques",
              collapsed: true,
              items: [
                { slug: "fr/base-de-donnees-sql" },
                { slug: "fr/expressions-regulieres-python" },
                { slug: "fr/jourdainisation-en-ligne-python" },
                { slug: "fr/raspberry-pi-plateforme-documentation" },
              ],
            },
            {
              label: "Sécurité et confidentialité",
              collapsed: true,
              items: [
                { slug: "fr/proteger-les-informations-confidentielles" },
              ],
            },
            {
              label: "Index et guides",
              collapsed: true,
              items: [
                { slug: "fr/un-index-est-il-utile-dans-un-pdf" },
                { slug: "fr/les-topics-modules-d-information-de-base-dita" },
              ],
            },
          ],
        },
        es: {
          label: 'Español',
          lang: 'es',
          title: 'Mondos',
          sidebar: [
            {
              label: 'Documentación',
              collapsed: true,
              autogenerate: { directory: 'content/docs/es' },
            },
          ],
        },
      },
    }),
  ],
});
