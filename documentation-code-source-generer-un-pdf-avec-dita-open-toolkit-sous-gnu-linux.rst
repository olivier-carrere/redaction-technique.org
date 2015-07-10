.. Copyright 2011-2015 Olivier Carrère
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

#. Téléchargez et décompressez l'archive |dita-ot| :

   .. code-block:: console

      $ wget \
      https://github.com/dita-ot/dita-ot/releases/download/2.1/dita-ot-2.1.0.tar.gz
      $ tar -xzvf dita-ot-2.1.0.tar.gz

#. Générez votre premier PDF :

   .. code-block:: console

      $ cd dita-ot-2.1.0
      $ dita -f pdf -i samples/taskbook.ditamap

Félicitations, vous avez compilé votre premier projet |dita| ! Le fichier PDF
généré est :file:`out/taskbook.pdf`. Vous pouvez maintenant compiler d'autres
projets en ignorant les étapes 1 et 2.

.. text review: yes
