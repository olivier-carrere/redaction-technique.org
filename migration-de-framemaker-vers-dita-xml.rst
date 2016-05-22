.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _migration-de-framemaker-vers-dita-xml:

Migration de FrameMaker vers DITA XML
=====================================

Migrer de |fm| vers |dita|, ce n'est pas comme
enregistrer un document |ms-word| au format |libreoffice| [#]_. Aucun processus
automatique ne permet de migrer un document non structuré vers un format
structuré. Dans le pire des cas, selon la qualité de votre document de départ,
cela peut s'apparenter à transformer une friche en jardin à la française. Mais
une migration bien planifiée permet de passer au nouveau format sans perturber
le rythme des livraisons.

Pour filer la métaphore, si l'on se fixe pour but de convertir un marécage en
parterre du château de Versailles, il convient de passer par l'étape du jardin à
l'anglaise - soit un endroit certes non rigoureusement architecturé, mais très
agréable à vivre. Bonne nouvelle : si le |techwriter| a utilisé de
manière cohérente un jeu de styles limité et organisé rationnellement son
contenu |fm|, il est déjà certainement très proche de ce stade.

.. figure:: graphics/framemaker-to-dita-migration.svg

   *Migration de FrameMaker vers DITA XML*

D'ailleurs, si, pour une raison quelconque, votre projet de migration devait
s'arrêter là, les rédacteurs techniques, l'entreprise et les utilisateurs y
auraient déjà beaucoup gagné, respectivement en :

- facilité de mise à jour,

- cohérence et rapidité de publication des nouvelles versions,

- facilité d'accès à l'information.

.. only:: html

   .. rubric:: Notes

.. [#] |libreoffice| propose une fonction d'enregistrement au format |db|, mais
       très imparfaite ; le XML qu'elle produit peut servir de base à la
       création d'une version |db|, avec beaucoup d'efforts… Sauf à maintenir
       deux versions du même contenu, le processus de migration de |libreoffice|
       vers |db| exige donc un arrêt temporaire des livraisons des nouvelles
       versions de la documentation ; il doit donc être soigneusement planifié.

.. toctree::

   restructuration-du-contenu-framemaker
   table-de-conversion-framemaker-vers-dita-xml

.. text review: yes
