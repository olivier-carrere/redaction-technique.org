.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _task-dita-xml:

Task DITA XML
=============

Les sections **task** permettent au **rédacteur technique** de présenter des
procédures pas à pas pour effectuer une tâche. Elles incluent des parties :

- contexte,

- prérequis,

- résultat,

- exemple,

- étapes suivantes.

Exemple de structure d'une *task* :

.. aafig::

           +----+title
           |    |
           |    +----titlealts
           |    +----shortdesc
           |                                               +---boolean
           +----prolog                                     |
           |            +-prereq          +hazardstatement +---data
           |            |                 |                |
           |            |-example      +---cmd+------------+---uicontrol
      task +----taskbody+              |  |                |
           |            |-context      |  +note            +---menucascade
           |            |              |                   |
           |            |-steps--step--+--choices          +---userinput
           |            |              |
           |            |-result       +--stepxmp
           |            |              |
           |            +-postreq      +--substeps
           |                           |
           +----related-links          +--info
