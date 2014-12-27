.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _les-repertoires-reseau-partages-peu-adaptes-au-travail-de-groupe:

Les répertoires réseau partagés - peu adaptés au travail de groupe
==================================================================

Les fichiers partagés par une équipe de |techwriting| sont souvent
stockés dans un répertoire partagé sur le réseau.

Les rédacteurs techniques travaillent directement sur les fichiers partagés,
ce qui pose les problèmes suivants :

- risque de pertes de données en cas de défaillance du réseau,

- possibilités de travail off-line (déconnecté) limitées,

- verrouillage des fichiers par les membres de l'équipe qui les ont ouverts.

Même fréquemment sauvegardés, les répertoires ne sont pas un référentiel sûr
pour les données : la granulométrie de la sauvegarde est le répertoire, sa
fréquence n'est souvent que quotidienne. En cas de perte de données, la
restauration se fait répertoire par répertoire, et non fichier par fichier et
porte sur des versions dont l'ancienneté dépend de l'administrateur système, et
non du |techwriter|. Fouiller dans les archives est une opération
fastidieuse qui peut elle-même être source d'erreurs : en l'absence d'une
comparaison fiable et aisée entre plusieurs versions des fichiers, le
|techwriter| peut facilement supprimer des modifications qu'il aurait
souhaité conserver en voulant en restaurer d'autres.

Copier un fichier du réseau pour le modifier sur son disque dur personnel, puis
écraser la version du réseau par la version locale est une opération des plus
périlleuses :

- les membres de l'équipe ne sont pas informés du fait qu'un autre membre
  modifie ou non le même fichier en même temps qu'eux ; l'un des rédacteurs
  techniques devra alors renoncer à toutes ses modifications ;

- lors d'une copie manuelle des fichiers, que ce soit *via* un gestionnaire de
  fichiers graphique ou en ligne de commande, le |techwriter| peut
  facilement écraser la version la plus récente par la plus ancienne (on
  préférera alors avoir recours à un logiciel de synchronisation de fichiers
  tels que `rsync`_ ou `Unison`_
  (ce dernier étant plus adapté à
  la synchronisation bidirectionnelle) en ligne de commande sous GNU/Linux ou
  Windows, ou à un équivalent graphique, tel `SyncToy`_.
  Cependant,
  ce type de logiciels se base sur la date de dernière modification des
  fichiers. Lorsque l'on met à jour ou publie un livre FrameMaker, notamment,
  ceci peut créer des conflits entre fichiers, FrameMaker enregistrant dans ces
  cas tous les fichiers du livre, même si leur contenu n'a pas été modifié).

.. text review: yes
