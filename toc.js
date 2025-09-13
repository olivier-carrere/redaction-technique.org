export const toc = [
  {
    text: "Documentation",
    link: "/",
    collapsed: false,
    children: [
      {
        text: "A propos de ce blog",
        link: "/a-propos-de-ce-blog",
        collapsed: false,
        children: [
          {
            text: "Diminuer les coûts et améliorer la satisfaction client",
            link: "/diminuer-les-couts-ameliorer-la-satisfaction-client",
            collapsed: true,
            children: [
              { text: "De la rédaction à la communication technique", link: "/de-la-redaction-a-la-communication-technique", collapsed: true },
              { text: "Les trois niveaux de la documentation technique", link: "/les-trois-niveaux-de-la-documentation-technique", collapsed: true },
              { text: "Principe de simplicité KISS", link: "/principe-de-simplicite-kiss", collapsed: true },
              { text: "Formats et outils", link: "/formats-et-outils", collapsed: true }
            ]
          },
          {
            text: "Rédaction technique : un processus industriel",
            link: "/redaction-technique-un-processus-industriel",
            collapsed: true,
            children: [
              { text: "Documentation microservices", link: "/documentation-microservices", collapsed: true },
              { text: "Définition du projet", link: "/definition-du-projet", collapsed: true },
              {
                text: "Collecte de l'information",
                link: "/collecte-de-l-information",
                collapsed: true,
                children: [
                  { text: "Tester les produits pour les documenter", link: "/tester-les-produits-pour-les-documenter", collapsed: true }
                ]
              },
              { text: "Création du contenu", link: "/creation-du-contenu", collapsed: true },
              {
                text: "Format source",
                link: "/format-source",
                collapsed: true,
                children: [
                  {
                    text: "Documents monolithiques ou modulaires",
                    link: "/documents-monolithiques-ou-modulaires",
                    collapsed: true,
                    children: [
                      { text: "Qu'est-ce qu'un module d'information", link: "/qu-est-ce-qu-un-module-d-information", collapsed: true }
                    ]
                  },
                  { text: "Fichiers binaires ou texte", link: "/fichiers-binaires-ou-texte", collapsed: true }
                ]
              },
              {
                text: "Référentiel",
                link: "/referentiel",
                collapsed: true,
                children: [
                  {
                    text: "Git : du fichier au contenu",
                    link: "/git-du-fichier-au-contenu",
                    collapsed: true,
                    children: [
                      { text: "Faire sauter les goulets d'étranglement avec les branches", link: "/faire-sauter-les-goulets-etranglement-avec-les-branches", collapsed: true },
                      { text: "Organiser son historique avec git rebase", link: "/organiser-son-historique-avec-git-rebase", collapsed: true }
                    ]
                  },
                  { text: "Quel référentiel pour le travail de groupe", link: "/quel-referentiel-pour-le-travail-de-groupe", collapsed: true },
                  { text: "Les répertoires réseau partagés peu adaptés au travail de groupe", link: "/les-repertoires-reseau-partages-peu-adaptes-au-travail-de-groupe", collapsed: true },
                  {
                    text: "Les systèmes de gestion de versions rustiques mais fiables",
                    link: "/les-systemes-de-gestion-de-versions-rustiques-mais-fiables",
                    collapsed: true,
                    children: [
                      { text: "Utiliser les branches des systèmes de gestion de sources", link: "/utiliser-les-branches-des-systemes-de-gestion-de-sources", collapsed: true }
                    ]
                  },
                  { text: "Les CMS : workflow en prime mais fiabilité à tester", link: "/les-cms-le-workflow-en-prime-mais-une-fiabilite-a-tester", collapsed: true },
                  { text: "Base de données SQL", link: "/base-de-donnees-sql", collapsed: true },
                  { text: "Un référentiel unique", link: "/un-referentiel-unique", collapsed: true }
                ]
              },
              {
                text: "Validation et contrôle qualité",
                link: "/validation-et-controle-qualite",
                collapsed: true,
                children: [
                  { text: "Workflow de création et validation", link: "/workflow-de-creation-et-validation", collapsed: true }
                ]
              },
              { text: "Traduction", link: "/traduction", collapsed: true },
              { text: "Format cible", link: "/format-cible", collapsed: true },
              { text: "Livraison", link: "/livraison", collapsed: true }
            ]
          },
          {
            text: "Format & structure DITA XML",
            link: "/format-structure-dita-xml",
            collapsed: true,
            children: [
              { text: "Cas concrets utilisation DITA XML", link: "/cas-concrets-utilisation-de-dita-xml", collapsed: true },
              {
                text: "Formats, structures et non-structures",
                link: "/formats-structures-et-non-structures",
                collapsed: true,
                children: [
                  { text: "DocBook ou DITA XML", link: "/docbook-ou-dita-xml", collapsed: true },
                  {
                    text: "Migration de FrameMaker vers DITA XML",
                    link: "/migration-de-framemaker-vers-dita-xml",
                    collapsed: true,
                    children: [
                      { text: "Restructuration du contenu FrameMaker", link: "/restructuration-du-contenu-framemaker", collapsed: true },
                      { text: "Table de conversion FrameMaker → DITA XML", link: "/table-de-conversion-framemaker-vers-dita-xml", collapsed: true }
                    ]
                  },
                  { text: "Migrer de FrameMaker vers DITA XML", link: "/migrer-de-framemaker-vers-dita-xml", collapsed: true }
                ]
              },
              { text: "Une architecture documentaire trop complexe", link: "/une-architecture-documentaire-trop-complexe", collapsed: true },
              {
                text: "Du document à la base documentaire modulaire",
                link: "/du-document-a-la-base-documentaire-modulaire",
                collapsed: true,
                children: [
                  { text: "Un langage à balises", link: "/un-langage-a-balises", collapsed: true },
                  { text: "Typologie de haut niveau de l'information", link: "/typologie-de-haut-niveau-de-l-information", collapsed: true },
                  { text: "Organisation à la demande du contenu", link: "/organisation-a-la-demande-du-contenu", collapsed: true },
                  { text: "Le single sourcing : un format source → plusieurs formats cibles", link: "/le-single-sourcing-un-format-source-plusieurs-formats-cibles", collapsed: true },
                  { text: "Les topics / modules d'information de base DITA", link: "/les-topics-modules-d-information-de-base-dita", collapsed: true },
                  { text: "Gérer son contenu DITA XML avec ou sans CMS", link: "/gerer-son-contenu-dita-xml-avec-ou-sans-cms", collapsed: true }
                ]
              },
              {
                text: "Cas concret documentation NuFirewall",
                link: "/cas-concret-documentation-de-nufirewall",
                collapsed: true,
                children: [
                  {
                    text: "Partager des blocs information atomiques avec les conref",
                    link: "/partager-des-blocs-information-atomiques-avec-les-conref",
                    collapsed: true,
                    children: [
                      { text: "Centraliser les conref dans un fichier unique", link: "/centraliser-les-conref-dans-un-fichier-unique", collapsed: true },
                      { text: "Utiliser le noeud XML de plus bas niveau", link: "/utiliser-le-noeud-xml-de-plus-bas-niveau", collapsed: true },
                      { text: "Prendre en compte les contraintes de traduction", link: "/prendre-en-compte-les-contraintes-de-traduction", collapsed: true },
                      { text: "Imbriquer les conref", link: "/imbriquer-les-conref", collapsed: true },
                      { text: "Maximiser l'utilisation des conref pour faire baisser les coûts", link: "/maximiser-utilisation-des-conref-pour-faire-baisser-les-couts", collapsed: true },
                      { text: "Protéger les informations confidentielles", link: "/proteger-les-informations-confidentielles", collapsed: true }
                    ]
                  },
                  { text: "Fournir une information ciblée avec le texte conditionnel / ditaval", link: "/fournir-une-information-ciblee-avec-le-texte-conditionnel-ditaval", collapsed: true }
                ]
              }
            ]
          },
          {
            text: "Le coin du geek",
            link: "/le-coin-du-geek",
            collapsed: true,
            children: [
              { text: "Jourdainisation en ligne Python", link: "/jourdainisation-en-ligne-python", collapsed: true },
              { text: "Raspberry Pi : plateforme documentation", link: "/raspberry-pi-plateforme-documentation", collapsed: true },
              { text: "sed : modifiez votre texte sans ouvrir vos fichiers", link: "/sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers", collapsed: true },
              { text: "Expressions régulières Python", link: "/expressions-regulieres-python", collapsed: true },
              {
                text: "Didacticiels DITA XML XSL-FO",
                link: "/didacticiels-dita-xml-xsl-fo",
                collapsed: true,
                children: [
                  { text: "XSL-FO : filtrer du contenu selon des conditions", link: "/xsl-fo-filtrer-du-contenu-selon-des-conditions-sauf-et-ou", collapsed: true },
                  { text: "XSL-FO : insérer automatiquement un titre pour les exemples", link: "/xsl-fo-inserer-automatiquement-un-titre-pour-les-exemples", collapsed: true },
                  { text: "Générer un PDF avec DITA Open Toolkit sous GNU/Linux", link: "/generer-un-pdf-avec-dita-open-toolkit-sous-gnu-linux", collapsed: true },
                  { text: "Générer un PDF avec DITA Open Toolkit Windows", link: "/generer-un-pdf-avec-dita-open-toolkit-windows", collapsed: true },
                  { text: "Gérer les projets de documentation multilingues DITA XML", link: "/gerer-les-projets-de-documentation-multilingues-dita-xml", collapsed: true },
                  { text: "Créer des documents différents à partir des mêmes sources ReStructuredText / texte conditionnel", link: "/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel", collapsed: true },
                  { text: "Créer des documents différents à partir des mêmes sources ReStructuredText / Jinja / texte conditionnel", link: "/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel", collapsed: true },
                  { text: "Créer des documents différents à partir des mêmes sources ReStructuredText / Jinja / objet / texte conditionnel", link: "/creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel", collapsed: true },
                  { text: "Insérer automatiquement des données dans un fichier ReStructuredText", link: "/inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext", collapsed: true },
                  { text: "Insérer automatiquement des données dans un fichier DITA XML", link: "/inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml", collapsed: true },
                  { text: "Insérer automatiquement des données SQL dans un fichier ReStructuredText", link: "/inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext", collapsed: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
