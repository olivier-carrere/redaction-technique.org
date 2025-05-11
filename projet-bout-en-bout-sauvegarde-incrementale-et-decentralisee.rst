.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _ projet-bout-en-bout-sauvegarde-incrementale-et-decentralisee:

Sauvegarde incrémentale et décentralisée
----------------------------------------

Comment sauvegarder le patrimoine photo de l'association, soit les photos et
la base de données Piwigo, de manière incrémentale et décentralisée ? Je me
suis tourné vers Git avec l'extension LFS, qui gère élégamment les fichiers
binaires.

J'ai tout d'abord fait une copie du répertoire Piwigo du serveur sur un disque
local, puis j'ai initialisé un dépôt Git LFS. J'ai ensuite cloné ce dépôt sur
Gitlab.

Ainsi, tout membre de l'association peut créer un compte Gitlab, puis, après
avoir reçu le mot de passe, cloner la copie de sauvegarde.

.. admonition:: Clonage du dépôt Gitlab

   *La procédure suivante était incluse dans une première version du dépliant
   LaTeX. Elle est donc minimaliste, ne serait-ce que pour des raisons
   d'espace disponible sur la version imprimée. Je l'ai par la suite supprimée
   du dépliant, car elle risquait plutôt d'effrayer son lectorat,
   majoritairement technophobe.*
   
   Sous Windows, vous pouvez installer [Git for windows](https://github.com/git-for-windows/git/releases/download/v2.18.0.windows.1/Git-2.18.0-64-bit.exe et [GitHub Desktop](https://desktop.github.com/.
   
   Pour cloner le dépôt Gitlab sous une distribution Linux Debian ou dérivée
   (dont Ubuntu) :
   
   #. Demandez une invitation Gitlab.
   
   #. Installez les logiciels suivants :
   
      .. code-block:: console
   
         $ sudo apt install git git-lfs
   
   #. Clonez le dépôt :
   
      .. code-block:: console
   
         $ git clone https://gitlab.com/depot/communication.git
   
      Le clonage initial télécharge plus de 20 Go et peut prendre plusieurs
      heures.
   
   Pour mettre à jour votre dépôt Gitlab :
   
   #. Placez-vous dans le répertoire du dépôt :
   
      .. code-block:: console
   
         $ cd communication
   
   #. Mettez à jour le dépôt et supprimez les fichiers locaux obsolètes :
   
      .. code-block:: console
   
         $ git pull --rebase
         $ git lfs prune
   
      Cette opération devrait être nettement plus rapide que le clonage initial.
   
Pour la synchronisation entre le serveur et ma copie locale, je me suis tourné
vers [LFTP](https://lftp.yar.ru/ :

.. code-block:: console

   $ lftp ftp://user:password@ftpaccount -e \
     "set ftp:ssl-allow no; mirror -e repertoire-distant \
     repertoire-local; quit"

.. note::

   Pour ignorer les différences de permissions sur les fichiers, j'ai au
   préalable lancé la commande suivante sur mon dépôt local :

   .. code-block:: console

      $ git config core.filemode false

   
L'hébergement des photos est donc centralisé, la sauvegarde, décentralisée.
