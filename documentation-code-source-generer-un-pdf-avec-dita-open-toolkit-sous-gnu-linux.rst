.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _generer-un-pdf-avec-dita-open-toolkit-sous-gnu-linux:

Générer un PDF avec DITA Open Toolkit sous GNU/Linux
====================================================

Ce didacticiel |dita| est destiné à vous guider
dans la mise en place et l'utilisation de la chaîne de publication |dita-ot|
dans un environnement GNU/Linux (Ubuntu ou Debian).

.. rubric:: Prérequis

- Ubuntu ou Debian sur une machine physique ou virtuelle avec le mot de passe
  administrateur,

- connexion Internet.

#. Téléchargez et décompressez l'archive |dita-ot| :

   .. code-block:: console

      $  wget http://sourceforge.net/projects/dita-ot/files/DITA-OT%20Stable%20Release/DITA%20Open%20Toolkit%201.8/DITA-OT1.8.5_full_easy_install_bin.tar.gz
      $  tar -xzvf DITA-OT1.8.5_full_easy_install_bin.tar.gz

#. Configurez l'environnement |dita-ot| :

   .. code-block:: console

      $  cd DITA-OT1.8.5/
      $  ./startcmd.sh
      $  ant -f integrator.xml

#. Générez votre premier PDF :

   .. code-block:: console

      $ java -jar lib/dost.jar /i:docsrc/userguide.ditamap /transtype:pdf

Félicitations, vous avez compilé votre premier projet |dita| ! Le fichier PDF
généré est :file:`out/userguide.pdf`. Vous pouvez maintenant compiler d'autres
projets en ignorant les étapes 1 et 2.

.. text review: yes
