---
title: Format source
---


Le contenu d'un projet de rédaction technique est créé dans un format
source, différent du format des livrables, le format cible. Pour
reprendre une image fréquemment utilisée en développement logiciel, le
format source est la recette de cuisine, le format cible, le plat. En
photographie, le format source est le format
\[RAW\](<http://fr.wikipedia.org/wiki/RAW_(format_d%27image)>, qui est
généré par l'appareil photo, et sur lequel les photographes
professionnels préféreront apporter les retouches, et le format cible,
le format JPEG.


Les traitements de texte nous ont déshabitués à distinguer le fond de la
forme. Mais confondre les deux entraîne beaucoup d'erreurs et de perte
de temps.

En effet, le document présenté à l'utilisateur présente deux aspects
fondamentaux :

-   le contenu,
-   la mise en page.

Au cours du développement d'une documentation technique, ces deux
aspects doivent être clairement distincts. Ils peuvent être pris en
charge par deux intervenants différents :

-   le rédacteur technique,
-   le graphiste[^1].

Lorsque la mise en page a une importance équivalente à celle du contenu,
ou lorsqu'elle doit être variée, comme dans le cas d'une brochure
commerciale, la rédaction et la mise en page s'opèrent sous des outils
différents :

-   éditeur de texte,
-   logiciel de PAO, par exemple InDesign ou Scribus.

Lorsque la mise en page a une importance moindre que celle du contenu,
ou lorsqu'elle doit être homogène, comme dans le cas d'une
documentation technique, la rédaction et la mise en page s'opèrent
sur :

les mêmes fichiers

:   par exemple, des fichiers FrameMaker,

des fichiers différents

:   par exemple, des fichiers de contenu XML et une feuille de style
    XSLT.

Dans un fichier FrameMaker, la séparation du fond et de la forme est
élevée mais pas totale : le contenu et la mise en page sont placés dans
le même fichier. FrameMaker applique une maquette de page homogène à
tout un fichier, mais autorise l'ajout manuel d'éléments de mise en
page. La même maquette peut être dupliquée pour tout le document, ou une
maquette différente peut être utilisée pour chaque fichier qui compose
ce dernier.

<figure>
<img src="graphics/modulaire-texte-monolithique-binaire.svg"
alt="graphics/modulaire-texte-monolithique-binaire.svg" />
<figcaption><em>Formats sources : degré de modularité et
format</em></figcaption>
</figure>

Les formats sources peuvent être classés selon leur degré de modularité
et leur format de fichier.

Les formats XML structurés DocBook et DITA XML appliquent une maquette
de page homogène à tout un document, et n'autorisent pas l'ajout
manuel d'éléments de mise en page[^2], ni l'application de maquettes
différentes aux différents fichiers qui composent le document.

+--------------------------------------------------------------------+
| Format Possibilité de mise \|                                      |
|                                                                    |
| :   en page manuelle \| \|                                         |
|                                                                    |
| ====================+====================+====================+    |
| MS Word Oui \|                                                     |
+--------------------------------------------------------------------+
| FrameMaker Oui                                                     |
+--------------------------------------------------------------------+
| DITA XML Non \|                                                    |
+--------------------------------------------------------------------+

Si contenu et mise en page sont intimement liés, comme sous un
traitement de texte, il est difficile de modifier le contenu sans
perturber la mise en page. Résultat : à chaque publication d'une
nouvelle version d'une documentation technique, l'équipe de rédaction
technique passe de longues heures à corriger les erreurs de mise en page
générées par le logiciel. Le phénomène est moindre sous FrameMaker mais
reste important. Il est nul avec les formats DITA XML et DocBook (les
seules erreurs qui peuvent se produire sont des erreurs de compilation
dues à une syntaxe XML erronée ; ces erreurs sont facilement
rectifiables).

Les fichiers sources d'une documentation technique sont au format :

-   binaire ou,
-   texte.

Ce format est également :

-   WYSIWYG ou,
-   structuré.

Enfin, ce format est :

-   modulaire ou,
-   monolithique.

Ce dernier aspect détermine la manière dont le format gère le
*single-sourcing* :

-   selon une logique *livre vers aide en ligne* ou,
-   selon une logique *aide en ligne vers livre*.

Les formats disponibles peuvent donc être classés selon le tableau
suivant :

  ---------------------------------------------------------------------
  Format Structuré
  ===============+===============+===============+===============+
  FrameMaker Non \| \| \|

  DocBook Oui

  DITA XML Oui
  ---------------------------------------------------------------------

FrameMaker et DocBook ne sont pas pleinement modulaires, car les plus
petits éléments d'information manipulables ne sont pas génériques : ils
contiennent des informations telles que la structure de table des
matières ou les références croisées qui ne sont valables que dans un
nombre limité de contextes.

 only
html

**Notes**


 {.toctree hidden=""}
documents-monolithiques-ou-modulaires fichiers-binaires-ou-texte


[^1]: Si le rédacteur technique met lui-même en page ses documents, il
    change de rôle lorsqu'il effectue cette opération.

[^2]: Ou très peu : dans les fichiers de contenu, il est seulement
    possible de mettre du texte en gras ou en italique, pas d'en
    changer la police, le corps ou la couleur.
