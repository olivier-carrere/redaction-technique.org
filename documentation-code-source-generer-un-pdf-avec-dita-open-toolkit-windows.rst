.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _generer-un-pdf-avec-dita-open-toolkit-windows:

Générer un PDF avec DITA Open Toolkit (Windows)
===============================================

Ce **didacticiel `DITA XML <http://dita.xml.org/>` est destiné à vous guider
dans la mise en place et l'utilisation de la chaîne de publication **DITA Open
Toolkit** dans un environnement Windows (testé sur Windows XP).

.. rubric:: Prérequis

- Connexion Internet

#.  Téléchargez `Java <href="http://java.com/fr/download/manual.jsp?locale=fr>`,
    puis lancez le programme d'installation.

#.  Téléchargez `DITA Open Toolkit 1.5.4
    <http://sourceforge.net/projects/dita-ot/files/DITA-OT Stable Release/DITA
    Open Toolkit 1.5.4/DITA-OT1.5.4_full_easy_install_bin.zip/download>` sur le
    bureau, puis décompressez DITA-OT1.5.4_full_easy_install_bin.zip.

#.  Sélectionnez Exécuter dans le menu Démarrer, collez la commande suivante,
    puis appuyez sur Entrée :

    .. code-block:: console

       cmd

    Un terminal apparaît.

#. Collez la commande suivante dans le terminal :

   .. code-block:: console

      cd Bureau\DITA-OT1.5.4_full_easy_install_bin\DITA-OT1.5.4

#. Collez la commande suivante :

   .. code-block:: xml

      startcmd.bat

   Un nouveau terminal apparaît.

#. Collez la commande suivante dans le nouveau terminal :

   .. code-block:: console

      $ java -jar lib/dost.jar /i:samples/taskbook.ditamap \
      /outdir:. /transtype:pdf2

   Cette commande génère un fichier PDF à partir d'un projet DITA XML d'exemple.

   Félicitations, vous avez compilé votre premier projet DITA XML ! Vous
   trouverez le fichier cible taskbook.pdf dans le répertoire
   :file:`Bureau\DITA-OT1.5.4_full_easy_install_bin\DITA-OT1.5.4`. Vous pouvez
   maintenant compiler d'autres projets en ignorant les étapes 1 et 2.
