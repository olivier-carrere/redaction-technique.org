.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _generer-un-pdf-avec-dita-open-toolkit-sous-gnu-linux:

Générer Un PDF Avec DITA Open Toolkit Sous GNU/Linux
====================================================

Ce **didacticiel `DITA XML <http://dita.xml.org/>`_** est destiné à vous guider
dans la mise en place et l'utilisation de la chaîne de publication **DITA Open
Toolkit** dans un environnement GNU/Linux (Ubuntu ou Debian).

.. rubric:: Prérequis

- Ubuntu ou Debian sur une machine physique ou virtuelle avec le mot de passe
  administrateur,

- connexion Internet.

#. Ouvrez un terminal, collez-y la suite de commandes suivante et appuyez sur
   entrée:

   .. code-block:: console

      cd && \
      wget http://downloads.sourceforge.net/project/dita-ot/DITA-OT%20Stable%20Release/DITA%20Open%20Toolkit%201.5.4/DITA-OT1.5.4_full_easy_install_bin.tar.gz && \
      tar xzvf DITA-OT1.5.4_full_easy_install_bin.tar.gz && \
      wget http://www.redaction-technique.org/media/dita-env.txt && \
      workingdirectory=`pwd | sed "s/\//slash/g;>`_ && \
      perl -pi -e "s/personal-dita-home/$workingdirectory/g;" dita-env.txt && \
      perl -pi -e "s/slash/\//g;" dita-env.txt && \
      cp .bashrc .bashrc.bak && \
      cat .bashrc | sed '$a\' > .bashrc.tmp && \
      mv .bashrc.tmp .bashrc && \
      cat dita-env.txt >> .bashrc && \
      exit

   Cette suite de commandes:

   - se place dans le répertoire racine de votre compte utilisateur,
   - télécharge l'archive Dita Open Toolkit,
   - décompresse l'archive Dita Open Toolkit,
   - télécharge le fichier contenant les variables d'environnement de Dita Open
     Toolkit,
   - écrit le répertoire racine de votre compte utilisateur dans le fichier
     contenant les variables d'environnement de Dita Open Toolkit,
   - crée une sauvegarde du fichier .bashrc (.bashrc.bak),
   - ajoute les les variables d'environnement de Dita Open Toolkit
     personnalisées au fichier .bashrc,
   - ferme le terminal en cours.

#. Ouvrez un nouveau terminal pour prendre en compte les modifications du
   fichier :file:`.bashrc`, puis collez la commande suivante:

   .. code-block:: console

      sudo apt-get install openjdk-6-jre ant

   et entrez le mot de passe administrateur. Appuyez sur entrée à l'invite
   *Voulez-vous continuer ? [O/n/?]*.

   .. note::

      Si vous n'êtes pas *sudoer* sous Debian, entrez *su -* ; cette commande
      ouvre un terminal sous le compte administrateur (*root*).

   Cette suite de commandes installe Openjdk 6 et Apache Ant.

#. Collez la commande suivante:

   .. code-block:: console

      cd DITA-OT1.5.4

   Cette commande se place dans le répertoire :file:`DITA-OT1.5.4`.

#. Collez la commande suivante:

   .. code-block:: console

      $ java -jar lib/dost.jar /i:samples/taskbook.ditamap /outdir:. /transtype:pdf2

   Cette commande génère un fichier PDF à partir d'un projet DITA XML d'exemple.

Félicitations, vous avez compilé votre premier projet DITA XML ! Vous trouverez
le fichier cible taskbook.pdf dans le répertoire :file:`DITA-OT1.5.4`. Vous
pouvez maintenant compiler d'autres projets en ignorant les étapes 1 et 2.  Si
plusieurs versions de Java sont installées et qu'une erreur se produit, ouvrez
un terminal administrateur et sélectionnez la version OpenJDK 6:

.. code-block:: console

   # update-alternatives --config java

   Sélection Chemin Priorité État
   ------------------------------
   * 0 /usr/lib/jvm/java-6-openjdk-i386/jre/bin/java 1061 mode automatique

Vous pouvez indiquer pour l'option *transtype* une des valeurs suivantes:

+------------------------------+------------------------------+
|**Valeur**                    |**Format cible**              |
+------------------------------+------------------------------+
|xhtml                         |xhtml                         |
+------------------------------+------------------------------+
|eclipsehelp                   |Aide Eclipse                  |
+------------------------------+------------------------------+
|eclipsecontent                |Contenu Eclipse               |
+------------------------------+------------------------------+
|javahelp                      |Aide Javahelp                 |
+------------------------------+------------------------------+
|htmlhelp                      |Aide compilée Windows         |
+------------------------------+------------------------------+
|pdf2                          |PDF                           |
+------------------------------+------------------------------+
|troff                         |troff                         |
+------------------------------+------------------------------+
|docbook                       |DocBook                       |
+------------------------------+------------------------------+
|wordrtf                       |Microsoft RTF                 |
+------------------------------+------------------------------+
