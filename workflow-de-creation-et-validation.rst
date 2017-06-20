.. Copyright 2011-2017 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _workflow-de-creation-et-validation:

Workflow de création et validation
==================================

Un processus de création et de mise à jour de la documentation technique qui
repose sur la mémoire des acteurs humains est peu fiable. Un |techwriter|
peut être fatigué, souffrant, en congés, oublier des données
lorsqu'il est saturé d'informations ou avoir quitté la société. L'information
entre deux personnes peut également mal circuler ou être mal comprise. C'est
pour pallier ces faiblesses que l'homme a créé des outils. En revanche, il est
créatif, à l'inverse des machines.

Face à cet état de fait, il convient de mettre un système de gestion de
l'information relative à l'évolution de la documentation qui soit tolérant à
l'erreur humaine. Il faut donc soit :

- mettre en œuvre des *workflows* sous un |cms|,

- utiliser le système de gestion de tickets utilisés pour la gestion des
  nouvelles fonctionnalités du produit documenté (par exemple, Trac) :

  - création d'un ticket par un développeur,

  - mise en œuvre du ticket par un |techwriter|,

  - fermeture du ticket par le créateur du ticket,

  - publication de la documentation lorsque tous les tickets critiques sont
    fermés.

Les fonctions principales d'un |cms| sont les suivantes :

- gestion des métadonnées,

- *workflows*,

- traçabilité,

Quel qu'il soit, le système de suivi doit offrir une visibilité et une
traçabilité totales des modifications apportées à la documentation technique
(quoi, qui, quand).

Ce système doit être unique et exhaustif : il doit centraliser toutes les
demandes de modification de la documentation technique.

Si le document est disponible en plusieurs langues, chaque ticket doit être
dupliqué pour chaque langue ou, dans le cas d'un |cms|, à chaque langue doit
correspondre un *workflow* distinct.

.. text review: yes
