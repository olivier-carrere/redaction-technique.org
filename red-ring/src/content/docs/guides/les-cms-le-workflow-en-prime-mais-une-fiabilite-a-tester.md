---
title: Les CMS - le *workflow* en prime, mais une fiabilité à tester
description: A guide in my new Starlight docs site.
---

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Les , ainsi dénommés pour des raisons purement marketing, mais dont la
fonction se comprend mieux avec l\'acronyme `GED (système de gestion
électronique de documents)`{.interpreted-text role="abbr"}, apportent
des notions de *workflow* et de gestion des liens qui s\'avèrent
précieuses lorsque l\'on gère des documents modulaires.
:::

S\'ils utilisent des formats monolithiques tels que , les rédacteurs
techniques peuvent utiliser des tels que SharePoint, Alfresco ou
consorts pour :

1.  télécharger sur leur disque dur une copie locale des fichiers
    partagés,
2.  effectuer leurs modifications sur la copie locale,
3.  déposer la copie modifiée sur le dépôt central.

Cette solution est plus satisfaisante que le partage sur un simple
serveur de fichiers, ne serait-ce que parce que la fréquence à laquelle
les fichiers transitent sur le réseau est bien moindre[^1]. Il est
cependant toujours nécessaire de verrouiller les fichiers en cours de
modification, ce dont se charge le .

Originellement destinés aux documents monolithiques, de nombreux
prennent aujourd\'hui en compte la modularisation des documentations
techniques. Des solutions telles que DocZone ou Componize, cette
dernière bâtie sur Alfresco, sont par exemple explicitement destinées à
gérer des documentations modulaires basées sur l\'architecture XML .

Mais comment croire que ces solutions, qui sont fréquemment disponibles
sous de nouvelles versions, marketing oblige, sont toutes d\'une
fiabilité optimale ?

J\'aurais quelques scrupules, et quelques inquiétudes, sur le fait de
leur confier entièrement la gestion et l\'archivage des fichiers sources
de la documentation. Une sélection rigoureuse de la solution s\'impose,
associée à une procédure de sauvegarde et de restauration éprouvée.

::: only
html

**Notes**
:::

[^1]: À chaque dépôt du fichier sur le , et non à chaque enregistrement
    de son travail par le .
