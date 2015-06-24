.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _organisation-a-la-demande-du-contenu:

Organisation à la demande du contenu
====================================

Les briques d'information peuvent être assemblées à la demande dans des
structures de table des matières externes, les *ditamap*.

L'organisation de l'information sous |dita| n'est
pas figée. Les briques peuvent être organisées dans différentes structures
hiérarchiques, selon l'évolution des besoins. Si le |techwriter| a
pris soin de construire des briques d'information atomiques et génériques, il
peut, à l'instar d'un constructeur automobile proposant sans cesse de nouveaux
modèles par assemblage d'éléments standardisés, proposer par exemple les
documents suivants :

+------------------------------+------------------------------+
|Type de document              |Contenu                       |
+==============================+==============================+
|Guide de l'utilisateur        |Thèmes systématiquement       |
|                              |organisés en concept et       |
|                              |procédures pas à pas.         |
+------------------------------+------------------------------+
|Document de présentation      |Concepts.                     |
+------------------------------+------------------------------+
|Quikstart                     |Procédures pas à pas.         |
+------------------------------+------------------------------+
|Manuel de référence           |Informations de référence.    |
+------------------------------+------------------------------+

Pour ce faire, le |techwriter| prendra soin de placer les éléments
liés à un contexte particulier dans les structures *ditamap* et non dans les
fichiers de contenu |dita|. En particulier, les références croisées doivent
être indiquées dans une *reltable* placée dans la *ditamap* : si le document *A*
doit renvoyer au document *B* dans la *ditamap* *1*, il doit pouvoir être également
utilisé sans modification dans la *ditamap* *2*, où le document *B* n'est pas inclus.

L'organisation des répertoires de travail doit également permettre l'utilisation
de liens relatifs, notamment vers les images, qui ne seront jamais cassés.

.. text review: yes
