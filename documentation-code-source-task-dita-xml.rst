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
