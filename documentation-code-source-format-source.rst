.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _format-source:

Format source
=============

Le contenu d'un projet de |techwriting| est créé dans un format
source, différent du format des livrables, le format cible. Pour reprendre une
image fréquemment utilisée en développement logiciel, le format source est la
recette de cuisine, le format cible, le plat. En photographie, le format source
est le format `RAW`_, qui
est généré par l'appareil photo, et sur lequel les photographes professionnels
préféreront apporter les retouches, et le format cible, le format JPEG.

Les traitements de texte nous ont déshabitués à distinguer le fond de la
forme. Mais confondre les deux entraîne beaucoup d'erreurs et de perte de temps.

En effet, le document présenté à l'utilisateur présente deux aspects
fondamentaux :

- le contenu,

- la mise en page.

Au cours du développement d'une documentation technique, ces deux aspects
doivent être clairement distincts. Ils peuvent être pris en charge par deux
intervenants différents :

- le |techwriter|,

- le graphiste [#]_.

Lorsque la mise en page a une importance équivalente à celle du contenu, ou
lorsqu'elle doit être variée, comme dans le cas d'une brochure commerciale, la
rédaction et la mise en page s'opèrent sous des outils différents :

- éditeur de texte,

- logiciel de PAO, par exemple InDesign ou Scribus.

Lorsque la mise en page a une importance moindre que celle du contenu, ou
lorsqu'elle doit être homogène, comme dans le cas d'une |doc|,
la rédaction et la mise en page s'opèrent sur :

les mêmes fichiers
   par exemple, des fichiers |fm|,

des fichiers différents
   par exemple, des fichiers de contenu XML et une feuille de style XSLT.

Dans un fichier |fm|, la séparation du fond et de la forme est élevée mais
pas totale : le contenu et la mise en page sont placés dans le même
fichier. |fm| applique une maquette de page homogène à tout un fichier,
mais autorise l'ajout manuel d'éléments de mise en page. La même maquette peut
être dupliquée pour tout le document, ou une maquette différente peut être
utilisée pour chaque fichier qui compose ce dernier.

.. figure:: graphics/modulaire-texte-monolithique-binaire.png

   *Formats sources : degré de modularité et format*

Les formats sources peuvent être classés selon leur degré de modularité et leur
format de fichier.

Les formats XML structurés |db| et |dita| appliquent une maquette de page
homogène à tout un document, et n'autorisent pas l'ajout manuel d'éléments de
mise en page [#]_, ni l'application de maquettes différentes aux
différents fichiers qui composent le document.

+--------------------+--------------------+--------------------+
|Format              |Application d'une   |Possibilité de mise |
|                    |mise en page        |en page manuelle    |
|                    |homogène            |                    |
+====================+====================+====================+
||ms-word|           |Non                 |Oui                 |
+--------------------+--------------------+--------------------+
||fm|                |Oui                 |Oui                 |
+--------------------+--------------------+--------------------+
||dita|              |Oui                 |Non                 |
+--------------------+--------------------+--------------------+

Si contenu et mise en page sont intimement liés, comme sous un traitement de
texte, il est difficile de modifier le contenu sans perturber la mise en
page. Résultat : à chaque publication d'une nouvelle version d'une documentation
technique, l'équipe de |techwriting| passe de longues heures à
corriger les erreurs de mise en page générées par le logiciel. Le phénomène est
moindre sous |fm| mais reste important. Il est nul avec les formats
|dita| et |db| (les seules erreurs qui peuvent se produire sont des
erreurs de compilation dues à une syntaxe XML erronée ; ces erreurs sont
facilement rectifiables).

Les fichiers sources d'une documentation technique sont au format :

- binaire ou,

- texte.

Ce format est également :

- WYSIWYG ou,

- structuré.

Enfin, ce format est :

- modulaire ou,

- monolithique.

Ce dernier aspect détermine la manière dont le format gère le *single-sourcing* :

- selon une logique *livre vers aide en ligne* ou,

- selon une logique *aide en ligne vers livre*.

Les formats disponibles peuvent donc être classés selon le tableau suivant :

+---------------+---------------+---------------+---------------+
|Format         |Texte          |Structuré      |Modulaire      |
+===============+===============+===============+===============+
||fm|           |Non            |Non            |Limité         |
|natif          |               |               |               |
+---------------+---------------+---------------+---------------+
||db|           |Oui            |Oui            |Limité         |
+---------------+---------------+---------------+---------------+
||dita|         |Oui            |Oui            |Oui            |
+---------------+---------------+---------------+---------------+

|fm| et |db| ne sont pas pleinement modulaires, car les plus petits
éléments d'information manipulables ne sont pas génériques : ils contiennent des
informations telles que la structure de table des matières ou les références
croisées qui ne sont valables que dans un nombre limité de contextes.

.. only:: html

   .. rubric:: Notes

.. [#] Si le |techwriter| met lui-même en page ses documents, il
       change de rôle lorsqu'il effectue cette opération.

.. [#] Ou très peu : dans les fichiers de contenu, il est seulement possible de
       mettre du texte en gras ou en italique, pas d'en changer la police, le
       corps ou la couleur.

.. toctree::

   documentation-code-source-documents-monolithiques-ou-modulaires
   documentation-code-source-fichiers-binaires-ou-texte
   documentation-code-source-expressions-regulieres-python
   documentation-code-source-sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers

.. text review: yes
