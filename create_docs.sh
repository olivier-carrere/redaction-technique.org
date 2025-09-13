#!/bin/bash

# Base directory for your documentation
BASE_DIR="./docs"

mkdir -p "$BASE_DIR"

# --------------------------
# Helper functions
# --------------------------

# Create directories
create_dir() {
  local parent="$1"
  shift
  for dir in "$@"; do
    [[ -z "$dir" ]] && continue
    mkdir -p "$parent/$dir"
    echo "Created directory: $parent/$dir"
  done
}

# Create markdown files
create_md_files() {
  local parent="$1"
  shift
  for file in "$@"; do
    [[ -z "$file" ]] && continue
    touch "$parent/$file.md"
    echo "Created file: $parent/$file.md"
  done
}

# --------------------------
# Top-level directories
# --------------------------
create_dir "$BASE_DIR" \
  "a-propos-de-ce-blog" \
  "cas-concret-documentation-de-nufirewall" \
  "collecte-de-l-information" \
  "didacticiels-dita-xml-xsl-fo" \
  "diminuer-les-couts-ameliorer-la-satisfaction-client" \
  "documents-monolithiques-ou-modulaires" \
  "du-document-a-la-base-documentaire-modulaire" \
  "foo" \
  "format-source" \
  "format-structure-dita-xml" \
  "formats-structures-et-non-structures" \
  "git-du-fichier-au-contenu" \
  "index" \
  "le-coin-du-geek" \
  "les-systemes-de-gestion-de-versions-rustiques-mais-fiables" \
  "les-trois-niveaux-de-la-documentation-technique" \
  "migration-de-framemaker-vers-dita-xml" \
  "partager-des-blocs-information-atomiques-avec-les-conref" \
  "redaction-technique-un-processus-industriel" \
  "referentiel" \
  "validation-et-controle-qualite"

# --------------------------
# Nested entries as .md files
# --------------------------

# a-propos-de-ce-blog
create_md_files "$BASE_DIR/a-propos-de-ce-blog" \
  "diminuer-les-couts-ameliorer-la-satisfaction-client" \
  "redaction-technique-un-processus-industriel" \
  "format-structure-dita-xml" \
  "le-coin-du-geek" \
  "contact"

# diminuer-les-couts-ameliorer-la-satisfaction-client
create_md_files "$BASE_DIR/diminuer-les-couts-ameliorer-la-satisfaction-client" \
  "de-la-redaction-a-la-communication-technique" \
  "les-trois-niveaux-de-la-documentation-technique" \
  "principe-de-simplicite-kiss" \
  "formats-et-outils"

# cas-concret-documentation-de-nufirewall
create_md_files "$BASE_DIR/cas-concret-documentation-de-nufirewall" \
  "partager-des-blocs-information-atomiques-avec-les-conref" \
  "fournir-une-information-ciblee-avec-le-texte-conditionnel-ditaval"

# partager-des-blocs-information-atomiques-avec-les-conref
create_md_files "$BASE_DIR/cas-concret-documentation-de-nufirewall/partager-des-blocs-information-atomiques-avec-les-conref" \
  "centraliser-les-conref-dans-un-fichier-unique" \
  "utiliser-le-noeud-xml-de-plus-bas-niveau" \
  "prendre-en-compte-les-contraintes-de-traduction" \
  "imbriquer-les-conref" \
  "maximiser-utilisation-des-conref-pour-faire-baisser-les-couts" \
  "proteger-les-informations-confidentielles"

# collecte-de-l-information
create_md_files "$BASE_DIR/collecte-de-l-information" \
  "tester-les-produits-pour-les-documenter"

# didacticiels-dita-xml-xsl-fo
create_md_files "$BASE_DIR/didacticiels-dita-xml-xsl-fo" \
  "xsl-fo-filtrer-du-contenu-selon-des-conditions-sauf-et-ou" \
  "xsl-fo-inserer-automatiquement-un-titre-pour-les-exemples" \
  "generer-un-pdf-avec-dita-open-toolkit-sous-gnu-linux" \
  "generer-un-pdf-avec-dita-open-toolkit-windows" \
  "gerer-les-projets-de-documentation-multilingues-dita-xml" \
  "creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel" \
  "dita-open-toolkit-afficher-les-references-croisees-dans-les-pdf" \
  "afficher-un-index-dans-un-pdf-mais-pas-sous-dita-open-toolkit" \
  "utiliser-ide-nxml-pour-dita-xml" \
  "accelerer-sa-saisie-avec-le-mode-predictive-pour-emacs"

# du-document-a-la-base-documentaire-modulaire
create_md_files "$BASE_DIR/du-document-a-la-base-documentaire-modulaire" \
  "un-langage-a-balises" \
  "typologie-de-haut-niveau-de-l-information" \
  "organisation-a-la-demande-du-contenu" \
  "le-single-sourcing-un-format-source-plusieurs-formats-cibles" \
  "les-topics-modules-d-information-de-base-dita" \
  "gerer-son-contenu-dita-xml-avec-ou-sans-cms"

# documents-monolithiques-ou-modulaires
create_md_files "$BASE_DIR/documents-monolithiques-ou-modulaires" \
  "qu-est-ce-qu-un-module-d-information"

# format-source
create_md_files "$BASE_DIR/format-source" \
  "documents-monolithiques-ou-modulaires" \
  "fichiers-binaires-ou-texte"

# format-structure-dita-xml
create_md_files "$BASE_DIR/format-structure-dita-xml" \
  "cas-concrets-utilisation-de-dita-xml" \
  "formats-structures-et-non-structures" \
  "une-architecture-documentaire-trop-complexe" \
  "du-document-a-la-base-documentaire-modulaire" \
  "cas-concret-documentation-de-nufirewall"

# formats-structures-et-non-structures
create_md_files "$BASE_DIR/formats-structures-et-non-structures" \
  "docbook-ou-dita-xml" \
  "migration-de-framemaker-vers-dita-xml" \
  "migrer-de-framemaker-vers-dita-xml"

# git-du-fichier-au-contenu
create_md_files "$BASE_DIR/git-du-fichier-au-contenu" \
  "faire-sauter-les-goulets-etranglement-avec-les-branches" \
  "organiser-son-historique-avec-git-rebase"

# le-coin-du-geek
create_md_files "$BASE_DIR/le-coin-du-geek" \
  "jourdainisation-en-ligne-python" \
  "raspberry-pi-plateforme-documentation" \
  "sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers" \
  "expressions-regulieres-python" \
  "didacticiels-dita-xml-xsl-fo" \
  "creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel" \
  "creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel" \
  "creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel" \
  "inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext" \
  "inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml" \
  "inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext"

# redaction-technique-un-processus-industriel
create_md_files "$BASE_DIR/redaction-technique-un-processus-industriel" \
  "documentation microservices" \
  "definition-du-projet" \
  "collecte-de-l-information" \
  "creation-du-contenu" \
  "format-source" \
  "referentiel" \
  "validation-et-controle-qualite" \
  "traduction" \
  "format-cible" \
  "livraison"

# referentiel
create_md_files "$BASE_DIR/referentiel" \
  "git-du-fichier-au-contenu" \
  "quel-referentiel-pour-le-travail-de-groupe" \
  "les-repertoires-reseau-partages-peu-adaptes-au-travail-de-groupe" \
  "les-systemes-de-gestion-de-versions-rustiques-mais-fiables" \
  "les-cms-le-workflow-en-prime-mais-une-fiabilite-a-tester" \
  "base-de-donnees-sql" \
  "un-referentiel-unique"

# validation-et-controle-qualite
create_md_files "$BASE_DIR/validation-et-controle-qualite" \
  "workflow-de-creation-et-validation"

# les-trois-niveaux-de-la-documentation-technique
create_md_files "$BASE_DIR/les-trois-niveaux-de-la-documentation-technique" \
  "un-index-est-il-utile-dans-un-pdf"

# migration-de-framemaker-vers-dita-xml
create_md_files "$BASE_DIR/migration-de-framemaker-vers-dita-xml" \
  "restructuration-du-contenu-framemaker" \
  "table-de-conversion-framemaker-vers-dita-xml"

echo "✅ All directories and markdown files created!"
