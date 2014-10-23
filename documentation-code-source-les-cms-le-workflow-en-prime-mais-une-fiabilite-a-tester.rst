.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _les-cms-le-workflow-en-prime-mais-une-fiabilite-a-tester:

Les CMS : Le Workflow En Prime, Mais Une Fiabilité À Tester
===========================================================

Les :abbr:`CMS (Content Management Systems)`, ainsi dénommés pour des raisons
purement marketing, mais dont la fonction se comprend mieux avec l'acronyme GED,
système de gestion électronique de documents) apportent des notions de
**workflow** et de gestion des liens qui s'avèrent précieuses lorsque l'on gère
des documents modulaires.

S'ils utilisent des formats monolithiques tels que FrameMaker, les **rédacteurs
techniques** peuvent utiliser des CMS tels que ; SharePoint, Alfresco ou
consorts pour :

#. télécharger sur leur disque dur une copie locale des fichiers partagés,

#. effectuer leurs modifications sur la copie locale,

#. déposer la copie modifiée sur le dépôt central.

Cette solution est plus satisfaisante, ne serait-ce que parce que la fréquence à
laquelle les fichiers transitent sur le réseau est bien moindre (à chaque dépôt
du fichier sur le CMS, et non à chaque enregistrement de son travail par le
**rédacteur technique**). Il est cependant toujours nécessaire de verrouiller
les fichiers en cours de modification, ce dont se charge le CMS.

Originellement destinés aux documents monolithiques, de nombreux CMS prennent
aujourd'hui en compte la modularisation des documentations techniques. Des
solutions telles que DocZone ou Componize, cette dernière bâtie sur Alfresco,
sont par exemple explicitement destinées à gérer des documentations modulaires
basées sur l'architecture XML DITA.

Mais comment croire que ces solutions, qui sont fréquemment disponibles sous de
nouvelles versions, marketing oblige, sont toutes d'une fiabilité optimale ?

J'aurais quelques scrupules, et quelques inquiétudes, sur le fait de leur
confier entièrement la gestion et l'archivage des fichiers sources de la
documentation. Une sélection rigoureuse de la solution s'impose, associée à une
procédure de sauvegarde et de restauration éprouvée.
