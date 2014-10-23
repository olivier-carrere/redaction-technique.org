.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. review: text no, code no

.. _faciliter-le-travail-de-groupe-avec-subversion-cron-et-emacs:

Faciliter le travail de groupe avec Subversion, cron et Emacs
=============================================================

Les systèmes de gestion de code source tels que Subversion ou **Git** gèrent
très bien les **modifications concurrentes** d'un même fichier. À condition que
le **rédacteur technique** suive de bonnes pratiques, qui peuvent facilement
être automatisées sous GNU/Linux.

Si deux **rédacteurs techniques** modifient la copie locale d'un même fichier
géré par un dépôt Subversion, leurs modifications sont fusionnées lorsqu'ils
mettent à jour leur copie locale (update) et la copie du dépôt (commit).  S'ils
ne se sont pas coordonnés et qu'ils ont modifié une ou plusieurs lignes
identiques (qui ont le même numéro de ligne dans le fichier) du fichier,
cependant, un conflit surgit et l'un des deux doit renoncer à son travail.

Ce genre de situation peut être facilement évité par les méthodes suivantes :

- coordination de l'équipe,

- mise à jour fréquente des copies locales et distantes.

Si la première méthode repose sur des règles de travail de groupe et une bonne
ambiance d'équipe, la seconde peut facilement être automatisée. Voici comment
procéder sous Debian GNU/Linux :

#. Modifiez la **crontab** comme suit à l'aide de la commande *crontab -e* :

  .. code-block:: xml

     * * * * * svn up <chemin absolu du dépôt Subversion>

Cette instruction effectue une mise à jour de la copie locale du répertoire de
travail toutes les minutes. Vous pouvez évidemment adopter un rythme moins
frénétique si cela ralentit votre ordinateur (ou si votre ordinateur vous spamme
avec des messages du démon *cron*).

#. Insérez la ligne suivante dans votre fichier *.emacs* :

   .. code-block:: cl

      (global-auto-revert-mode t)

   Cette instruction met à jour la copie des fichiers chargés en mémoire vive
   sous Emacs si le fichier à partir duquel cette copie a été lue (la copie
   locale) a été modifié extérieurement à Emacs (éventuellement par une mise à
   jour automatique). Si vous avez modifié la copie chargée en mémoire vive sans
   enregistrer vos modifications, cette dernière n'est pas modifiée. Elle le
   sera lors de la prochaine séquence :

   a. enregistrement de la copie en mémoire vive (écrasement de la copie locale
      par la version modifiée sous Emacs),

   #. mise à jour automatique de la copie locale (écrasement de la copie locale
      par une version plus récente du dépôt Subversion),

   #. fusion des modifications sur la copie locale,

   #. mise à jour de la copie en mémoire vive (relecture par Emacs du fichier
      comportant les modifications fusionnées).

Le **rédacteur technique** peut alors continuer à travailler sur la version la
plus à jour possible du fichier.

À condition d'enregistrer fréquemment votre travail, les modifications
éventuellement apportées aux fichiers par les autres membres de l'équipe sont
ainsi fusionnées au fur et à mesure avec les vôtres. Les conflits entre deux
modifications deviennent alors extrêmement rares.
