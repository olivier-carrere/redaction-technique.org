.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _reference-dita-xml:

Reference DITA XML
==================

Les sections **reference** permettent au **rédacteur technique** de présenter
des listes d'informations (commandes de langage de programmation, recettes de
cuisine, bibliographies, catalogues, etc.).

Exemple de structure d'une section *reference* :

.. aafig::

               +---title
               |
               |
      reference+
               |
               |          +---refsyn               +---proptypehd
               |          |                        |
               +---refbody+---properties---prophead+---propvaluehd
                          |                        |
                          +---section              +---propdeschd
