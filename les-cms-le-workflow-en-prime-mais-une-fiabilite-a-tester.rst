.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _les-cms-le-workflow-en-prime-mais-une-fiabilite-a-tester:

Les CMS : le *workflow* en prime, mais une fiabilité à tester
=============================================================

.. sidebar:: :awesome:`fa-bullhorn`

   Les |cms|, ainsi dénommés pour des raisons purement marketing, mais dont la
   fonction se comprend mieux avec l'acronyme :abbr:`GED (système de gestion
   électronique de documents)`, apportent des notions de *workflow* et de
   gestion des liens qui s'avèrent précieuses lorsque l'on gère des documents
   modulaires.

S'ils utilisent des formats monolithiques tels que |fm|, les rédacteurs
techniques peuvent utiliser des |cms| tels que SharePoint, Alfresco ou
consorts pour :

#. télécharger sur leur disque dur une copie locale des fichiers partagés,

#. effectuer leurs modifications sur la copie locale,

#. déposer la copie modifiée sur le dépôt central.

Cette solution est plus satisfaisante que le partage sur un simple serveur de
fichiers, ne serait-ce que parce que la fréquence à laquelle les fichiers
transitent sur le réseau est bien moindre [#]_. Il est cependant toujours
nécessaire de verrouiller les fichiers en cours de modification, ce dont se
charge le |cms|.

Originellement destinés aux documents monolithiques, de nombreux |cms| prennent
aujourd'hui en compte la modularisation des documentations techniques. Des
solutions telles que DocZone ou Componize, cette dernière bâtie sur Alfresco,
sont par exemple explicitement destinées à gérer des documentations modulaires
basées sur l'architecture XML |dita|.

Mais comment croire que ces solutions, qui sont fréquemment disponibles sous de
nouvelles versions, marketing oblige, sont toutes d'une fiabilité optimale ?

J'aurais quelques scrupules, et quelques inquiétudes, sur le fait de leur
confier entièrement la gestion et l'archivage des fichiers sources de la
documentation. Une sélection rigoureuse de la solution s'impose, associée à une
procédure de sauvegarde et de restauration éprouvée.

.. only:: html

   .. rubric:: Notes

.. [#] À chaque dépôt du fichier sur le |cms|, et non à chaque enregistrement de
       son travail par le |techwriter|.

.. text review: yes
