.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _traduction:

Traduction
==========

Les contraintes de traduction doivent être prises en compte en amont du
processus rédactionnel. Elles ont des implications autant sur le style
rédactionnel que sur l'organisation du référentiel.

Il n'y a pas de recette miracle : la livraison d'informations dans plusieurs
langues demande un suivi constant. Mais la prise en compte des contraintes en
amont et l'utilisation d'une méthodologie appropriée permettent d'améliorer la
qualité et de diminuer les coûts et les délais de livraison des versions
multilingues. La traduction doit être intégrée au *workflow* documentaire. Il
faut également faire communiquer avec les traducteurs les différents acteurs :
rédacteurs techniques, mais également ingénieurs, experts et concepteurs.

Si la documentation repose sur un ensemble de modules, la traduction peut se
faire en parallèle de la rédaction, ce qui réduit les délais de livraison.

.. figure:: graphics/parallelisation-traduction.png

   *Parallèlisation de la rédaction et de la traduction*

En ce qui concerne le référentiel des fichiers sources, vaut-il mieux placer les
répertoires de langue en amont ou en aval des répertoires de projets
documentaires ? Autrement dit, vaut-il mieux adopter la structure suivante :

- english

  -  produit 1
  -  produit 2

- francais

  -  produit 1
  -  produit 2

ou la suivante :

- produit 1

  -  english
  -  francais

- produit 2

  -  english
  -  francais

Dans la plupart des cas, il est préférable de placer la distinction entre les
langues le plus en amont possible. Pour reprendre une terminologie utilisée dans
le développement logiciel, créer une traduction d'un ensemble d'informations
équivaut à créer une *branche* de cet ensemble. Comme il est plus facile de
manipuler une branche par sa racine que par ses ramifications, à l'usage, il est
beaucoup plus facile de manipuler des répertoires complets, ne serait-ce que
pour les fournir aux traducteurs, qu'un ensemble de sous-répertoires.

Une fois la traduction réalisée, les modifications apportées à la version source
ou à la version traduite ne peuvent être appliquées automatiquement à l'autre
version. Pour continuer dans la terminologie du monde logiciel, la nouvelle
branche est un *fork* : il devient impossible d'appliquer automatiquement à
l'une les modifications apportées à l'autre. Pour fournir les mêmes informations
dans les différentes langues, il est donc crucial de suivre efficacement les
mises à jour de la version d'origine.

.. text review: yes
