---
title: "Format source"
description: "Les traitements de texte nous ont déshabitués à distinguer le fond de la forme. Mais confondre les deux entraîne beaucoup d'erreurs et de perte de temps."
---


Le contenu d'un projet de **rédaction technique** est créé dans un format source, différent du format des livrables, le format cible. Pour reprendre une image fréquemment utilisée en développement logiciel, le format source est la recette de cuisine, le format cible, le plat. En photographie, le format source est le format RAW, qui est généré par l'appareil photo, et sur lequel les photographes professionnels préféreront apporter les retouches, et le format cible, le format JPEG.


Les traitements de texte nous ont déshabitués à distinguer le fond de la forme. Mais confondre les deux entraîne beaucoup d'erreurs et de perte de temps.

En effet, le document présenté à l'utilisateur présente deux aspects fondamentaux :

- le contenu,
- la mise en page.

Au cours du développement d'une documentation technique, ces deux aspects doivent être clairement distincts. Ils peuvent être pris en charge par deux intervenants différents :

- le **rédacteur technique**,
- le graphiste.

Lorsque la mise en page a une importance équivalente à celle du contenu, ou lorsqu'elle doit être variée, comme dans le cas d'une brochure commerciale, la rédaction et la mise en page s'opèrent sous des outils différents :

- éditeur de texte,
- logiciel de PAO, par exemple InDesign ou Scribus.

Lorsque la mise en page a une importance moindre que celle du contenu, ou lorsqu'elle doit être homogène, comme dans le cas d'une **documentation technique**, la rédaction et la mise en page s'opèrent sur :

| Type de fichiers        | Exemple                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| Les mêmes fichiers      | Par exemple, des fichiers **FrameMaker**.                               |
| Des fichiers différents | Par exemple, des fichiers de contenu XML et une feuille de style XSLT. |

Dans un fichier **FrameMaker**, la séparation du fond et de la forme est élevée mais pas totale : le contenu et la mise en page sont placés dans le même fichier. **FrameMaker** applique une maquette de page homogène à tout un fichier, mais autorise l'ajout manuel d'éléments de mise en page. La même maquette peut être dupliquée pour tout le document, ou une maquette différente peut être utilisée pour chaque fichier qui compose ce dernier.

![Formats sources : degré de modularité et format](/assets/modulaire-texte-monolithique-binaire.svg)
**Formats sources : degré de modularité et format**

Les formats sources peuvent être classés selon leur degré de modularité et leur format de fichier.

Les formats XML structurés **DocBook** et **DITA XML** appliquent une maquette de page homogène à tout un document, et n'autorisent pas l'ajout manuel d'éléments de mise en page, ni l'application de maquettes différentes aux différents fichiers qui composent le document.

| Format        | Possibilité de mise en page manuelle|
|---------------|----------------------------|
| MS Word       | Oui                        |
| FrameMaker    | Oui                        |
| DITA XML      | Non                        |

Si contenu et mise en page sont intimement liés, comme sous un traitement de texte, il est difficile de modifier le contenu sans perturber la mise en page. Résultat : à chaque publication d'une nouvelle version d'une documentation technique, l'équipe de **rédaction technique** passe de longues heures à corriger les erreurs de mise en page générées par le logiciel. Le phénomène est moindre sous **FrameMaker** mais reste important. Il est nul avec les formats **DITA XML** et **DocBook** (les seules erreurs qui peuvent se produire sont des erreurs de compilation dues à une syntaxe XML erronée ; ces erreurs sont facilement rectifiables).

Les fichiers sources d'une documentation technique sont au format :

- binaire ou,
- texte.

Ce format est également :

- WYSIWYG ou,
- structuré.

Enfin, ce format est :

- modulaire ou,
- monolithique.

Ce dernier aspect détermine la manière dont le format gère le single-sourcing :

- selon une logique livre vers aide en ligne ou,
- selon une logique aide en ligne vers livre.

Les formats disponibles peuvent donc être classés selon le tableau suivant :

| Format Structuré | Possibilité de mise en page manuelle |
|-----------------|----------------------------|
| FrameMaker       | Non                        |
| DocBook          | Oui                        |
| DITA XML         | Oui                        |

**FrameMaker** et **DocBook** ne sont pas pleinement modulaires, car les plus petits éléments d'information manipulables ne sont pas génériques : ils contiennent des informations telles que la structure de table des matières ou les références croisées qui ne sont valables que dans un nombre limité de contextes.

## Documents monolithiques ou modulaires

Le format source peut reposer sur des fichiers monolithiques ou sur des grappes de fichiers modulaires.

Les fichiers monolithiques (par exemple **MS Word**, **LibreOffice** ou **FrameMaker**) centralisent tout le contenu dans un seul fichier, facile à manier, mais qui limite le partage du contenu ; le risque de disposer d'informations incohérentes ou en doublon est alors important.

![Format source de rédaction technique monolithique](/assets/monolithique.svg)
**Format source de rédaction technique monolithique**

Les grappes de fichiers modulaires (par exemple **DITA XML**) agrègent le contenu de multiples fichiers, ce qui favorise le partage et la réutilisation de blocs de contenu. Un tel système est difficile à mettre en place au niveau de toute l'entreprise, mais devrait être la norme pour une équipe de **rédaction technique**.

![Format source de rédaction technique modulaire](/assets/grappe.svg)
**Format source de rédaction technique modulaire**

Certains traitements de texte proposent de gérer des documents modulaires, mais ils le font mal. Inversement, un document **DocBook** ou **DITA XML**, par exemple, peut être monolithique, mais perd alors de sa souplesse.

### Qu'est-ce qu'un module d'information ?

Le système modulaire le plus connu au monde est certainement celui des briques Lego. Adapté à la documentation technique, le principe des modules permet d'améliorer la qualité des manuels techniques et la productivité du rédacteur technique.

Mais suffit-il de convertir sa documentation de FrameMaker vers un format structuré tel que DITA XML pour obtenir une documentation modulaire ? Hélas, non. Si le contenu de départ mélange les informations de tout type (concepts, procédures pas à pas, référence), il sera toujours possible de le convertir au format DITA XML en ne respectant pas rigoureusement la sémantique DITA XML. Voire en modifiant les feuilles de style XSLT ou en spécialisant les XSD pour les rendre plus laxistes.

Or, si l'on obtient au final un document se basant sur des fichiers correpondant chacun à un schéma XSD différent (concept, task, ou reference), on n'obtient pas forcément ainsi une véritable documentation modulaire. En effet, essayez de construire alors un document ne regroupant que les fichiers d'un seul type : votre document aura toutes les chances d'être incomplet et incohérent.

Cette documentation n'est pas modulaire, car elle ne repose pas sur de véritables modules d'information. Un module est un élément atomique complet et cohérent qui peut être réutilisé dans différents contextes. Si vous avez divisé votre document monolithique original en une multitude de fichiers, vous n'avez pas encore créé de modules d'information. La seconde étape consiste à ré-écrire chaque fichier (selon par exemple l'approche minimaliste) pour le rendre plus générique et en faire un véritable module. Il faut évidemment adopter une approche structuraliste et décider du contenu de chaque module dans la perspective de l'architecture documentaire globale. De même, des mentions telles que Voir la section suivante devront être remplacées par des reférences croisées. Idéalement, ces références croisées ne se situent pas dans les fichiers de contenu proprement dit sous la forme :

``` xml
<related-links>
  <link href="content.dita#content"/>
</related-links>
```

mais dans une section reltable propre à chaque fichier ditamap.

Les modules sont ainsi parfaitement décontextualisés, et les informations de structure telles que les références croisées sont placés dans des fichiers ne comportant pas de contenu textuel.


## Fichiers binaires ou texte

Les formats sources sont des formats binaires ou texte.

- Les formats binaires sont *opaques* : si on les ouvre avec un éditeur de texte de type *notepad*, tout ce que l'on voit est une suite de caractères hiéroglyphiques ; il n'est donc la plupart du temps possible de les modifier qu'avec un seul logiciel.
- Les formats texte sont *transparents* : si on les ouvre avec un éditeur de texte, on voit du texte et des balises ; il est donc possible de les modifier avec différents logiciels et de leur appliquer des opérations de traitement par lot en ligne de commande, sans même les ouvrir, et d'utiliser de puissantes expressions rationnelles.

