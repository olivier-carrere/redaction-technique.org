.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no

.. _table-de-conversion-framemaker-vers-dita-xml:

Table de conversion FrameMaker vers DITA XML
============================================

Lorsque les fichiers `FrameMaker
<http://en.wikipedia.org/wiki/Adobe_FrameMaker>`_ sont prêts pour la migration
et que la chaîne `DITA XML
<http://fr.wikipedia.org/wiki/Darwin_Information_Typing_Architecture>`_ est
parfaitement intégrée aux processus techniques et humains de la société, le
**rédacteur technique** peut appliquer la table de conversion (bien que ce
processus doive être rapide, je vous conseille de le faire juste après une
livraison d'une nouvelle version du document pour avoir la marge de temps
suffisante avant la livraison suivante, des petits ajustements étant toujours
nécessaires).

Vous devriez maintenant être à même d'archiver les fichiers FrameMaker, puis de
basculer totalement vers le format DITA XML.

.. figure:: graphics/dita-migration.png

   Application d'une table de conversion de FrameMaker vers DITA XML

Appliquez bien sûr ce processus à un petit jeu de documents (j'appelle *jeu de
documents* tout ensemble d'information lié qui ne partage aucun contenu avec un
autre ensemble ; si par exemple le document A partage une section avec le
document B, le jeu de documents est A+B ; si vous dupliquez la section partagée
afin qu'elle ne soit plus commune à A et B, A et B deviennent des jeux
distincts), qui ne soit pas, si possible, d'une importance critique. Après ce
premier succès, vous pourrez appliquer le processus aux autres jeux de
documents.

Vous pouvez maintenant progressivement modulariser et partager votre contenu
dans le nouveau format afin de tirer parti au maximum de DITA XML. Vous pouvez
pendant cette phase continuer à publier de nouvelles versions du document ; la
publication devrait d'ailleurs être beaucoup plus simple que sous FrameMaker…
sauf si votre chaîne de création et de publication se base sur FrameMaker
structuré (mais, certes, le choix de FrameMaker structuré peut être motivé, ne
serait-ce que pour tirer parti de la qualité de son moteur d'impression).

.. text review: no
