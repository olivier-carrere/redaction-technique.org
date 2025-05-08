---
title: À propos de ce blog
description: A guide in my new Starlight docs site.
---

Ce est conçu et réalisé par un spécialisé dans l\'informatique.

Puisqu\'il traite des processus et des formats de rédaction technique,
son contenu est cependant moins pertinent que son historique et que ses
branches
[Git](https://github.com/olivier-carrere/redaction-technique.org/).

Il traite des formats, des outils et des tâches suivants : , , [scripts
Bash](), awk, sed, expressions rationnelles, Python, gestion de
versions, Git, compilation, [Makefile](), Ant, XSLT, mise en page, HTML,
[CSS](), PDF, LaTeX, XSL-FO.

## Libérez vos informations de leurs silos

Des solutions souples et fiables libèrent vos informations des silos
d\'information cloisonnés où elles sont emprisonnées et sous-exploitées.
Oubliez ou pour passer de la maintenance de la documentation à la
gestion du cycle de vie des projets documentaires modulaires !

### Intégrer la documentation aux processus de développement

La documentation fait partie du logiciel. Fournie avec le produit, elle
doit :

-   sortir en même temps,
-   suivre les mêmes cycles de vie, et
-   faire l\'objet des mêmes processus de production et de contrôle
    qualité.

<figure>
<img src="graphics/integration-doc-dev.svg"
alt="graphics/integration-doc-dev.svg" />
<figcaption><em>Sources de documentation modulaires au format
texte</em></figcaption>
</figure>

Elle doit répondre idéalement aux critères suivants :

-   pas de *vendor lock-in* (indépendance du format et de l\'éditeur de
    contenu),
-   chaînes de publication libres et gratuites,
-   mise en page totalement automatisée.

Il y a quelques années encore, les seuls outils permettant de fournir
des livrables de qualité au format PDF ou HTML reposaient sur des
formats binaires et propriétaires qui s\'intégraient mal aux systèmes de
gestion de versions des équipes de développement.

Résultat : réalisée à part, la documentation technique répondait
difficilement aux mêmes exigences de qualité et de délai de mise sur le
marché que les produits.

, puis et ont changé la donne : ces formats texte peuvent être modifiés
avec tout type de programme, du simple éditeur de texte à l\' graphique,
et s\'intègrent parfaitement sous Subversion, Git ou tout autre système
de gestion de versions.

### Les sources de ce sont gérées sous Git

Ce a été initialement développé sous WordPress. L\'impossibilité
d\'effectuer sous ce des modifications transverses ou d\'avoir un suivi
précis du cycle de vie du contenu a entraîné une migration vers le
format de balisage léger .

![](graphics/documentation-life-cycle-framework.svg)

Toutes les versions de ce sont gérées sous le logiciel de gestion de
versions décentralisé [Git](). Les modifications de contenu, de
structure ou de mise en page peuvent désormais être :

-   regroupées par lots cohérents,
-   liées à un ticket de logiciel de suivi de problèmes tel que
    *Bugzilla* ou *Trac*,
-   validées par des pairs,
-   partagées entre différentes versions du projet de documentation,
-   annulées en une seule opération, etc.

### Formats sources

Ce est disponible en trois formats, basés sur la version 1.1. Ces
formats présentent des niveaux de fonctionnalités et de complexité
différents.

<figure>
<img src="graphics/fonctionnalites_complexite.svg"
alt="graphics/fonctionnalites_complexite.svg" />
<figcaption><em>Niveau de fonctionnalités et de complexité des formats
texte</em></figcaption>
</figure>

reStructuredText

:   [reStructuredText]() est un langage de balisage léger de type Wiki
    ou Markdown qui, combiné au générateur de documentation Sphinx,
    offre un bon niveau de fonctionnalités.

DITA XML

:   [DITA XML]() est une architecture documentaire XML sémantique et
    modulaire complexe qui offre des gains de productivité importants
    grâce à une forte réutilisation du contenu.

DocBook

:   [DocBook]() est un langage de balisage XML sémantique qui offre un
    rapport fonctionnalités/complexité aujourd\'hui peu intéressant.

### Formats cibles

Vous pouvez compiler ce avec *Python Sphinx* aux formats :

-   [PDF](),
-   [EPUB](),
-   HTML.

Ces différentes versions sont générées à partir des mêmes sources
exactement. Elles présentent cependant de légères variations, mises en
œuvre par un mécanisme de texte conditionnel. Par exemple, le terme
suivant varie selon le format cible :

  -------------------------------------------------------------
  Format cible                   Terme
  ------------------------------ ------------------------------
  PDF                            document

  EPUB                           livre électronique

  HTML                           site
  -------------------------------------------------------------

::: seealso
-   `git-du-fichier-au-contenu`{.interpreted-text role="ref"}
-   `sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers`{.interpreted-text
    role="ref"}
-   `creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel`{.interpreted-text
    role="ref"}
:::

::: {.toctree hidden=""}
diminuer-les-couts-ameliorer-la-satisfaction-client
redaction-technique-un-processus-industriel format-structure-dita-xml
le-coin-du-geek contact
:::
