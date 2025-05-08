.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _accelerer-sa-saisie-avec-le-mode-predictive-pour-emacs:

Accélérer sa saisie avec le mode Predictive pour Emacs
======================================================

Ce didacticiel mode Predictive pour Emacs est destiné à
vous guider dans la mise en place et l'utilisation du mode Emacs d'aide à la
rédaction et d'autocomplétion des mots anglais et français Predictive dans
un environnement GNU/Linux (en l'occurrence, Debian).

#. Installez make et texinfo :

   .. code-block:: console

      $ sudo aptitude install make texinfo

#. Téléchargez
   [Predictive](http://www.dr-qubit.org/emacs.php#predictive-download.

#. Décompressez l'archive Predictive :

   .. code-block:: console

      $ tar xzvf predictive-0.23.13.tar.gz

#. Placez-vous dans le répertoire :file:`predictive` :

   .. code-block:: console

      $ cd predictive

#. Compilez *predictive* :

   .. code-block:: console

      $ make

#. Installez *predictive* :

   .. code-block:: console

      $ sudo make install

#. Insérez le code suivant dans le fichier :file:`.emacs` :

   .. code-block:: cl

      ;; predictive install location
           (add-to-list 'load-path "~/.emacs.d/predictive/")
           ;; dictionary locations
           (add-to-list 'load-path "~/.emacs.d/predictive/latex/")
           (add-to-list 'load-path "~/.emacs.d/predictive/texinfo/")
           (add-to-list 'load-path "~/.emacs.d/predictive/html/")
           ;; load predictive package
           (require 'predictive)

#. Lancez Emacs, puis appuyez sur Alt+X et entrez :

   .. code-block:: cl

      predictive-mode

.. text review: yes
