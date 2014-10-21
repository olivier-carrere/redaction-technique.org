.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _typologie-information-dita-xml:

Typologie de l'information DITA XML
===================================

Les **topics** DITA XML sont typés selon l'information qu'ils contiennent :
description, procédure pas à pas, etc.

La sémantique DITA est donc à plusieurs niveaux :

- termes (option d'interface graphique, adresse postale, etc.),

- paragraphes (prérequis, étape de procédure, etc.),

- modules d'information (*topics*, *concepts*, *tasks*).

DITA invite à choisir un schéma différent pour chaque type d'information. Les
procédures doivent être rédigées sous un schéma de type *task* et ne peuvent pas
être associées à un schéma *topic*, par exemple, ce dernier n'acceptant pas les
balises de procédures pas à pas <step>.  DITA est donc une aide à la
structuration des documents. Si je commence une rubrique de type *concept* et
que de fil en aiguille j'en viens à rédiger une procédure pas à pas, le
garde-fou du schéma XML m'oblige à créer une section *task distincte. Je peux
alors présenter l'information de manière plus claire pour son destinataire puis,
par exemple, publier par la suite :

- un guide PDF ne contenant que les concepts du produit comme introduction à son
  utilisation,

- une aide en ligne ne contenant que les procédures de réalisation de tâches
  spécifiques.
