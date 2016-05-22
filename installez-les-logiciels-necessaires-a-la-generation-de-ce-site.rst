.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _installez-les-logiciels-necessaires-a-la-generation-de-ce-site:

Installez les logiciels nécessaires à la gestion de ce |site|
-------------------------------------------------------------

#. Sélectionnez **Menu > Accessoires > LXTerminal**.

#. Installez les paquets logiciels suivants :

   .. code-block:: console
                   
      $ sudo aptitude install -y calibre emacs gitk inkscape python3-sphinx texlive-full

   Le temps de lire cinq ou six épisodes de *The Amazing Spider-Man*, et les
   logiciels suivants sont installés :

   +-------------+-------------------------------------------------------------+
   |Logiciel     |Description                                                  |
   +=============+=============================================================+
   |Calibre      |Gestionnaire de livres numériques                            |
   +-------------+-------------------------------------------------------------+
   |Emacs        |Environnement de développement intégré.                      |
   +-------------+-------------------------------------------------------------+
   |Gitk         |Navigateur d'historique du logiciel de gestion de versions   |
   |             |décentralisé.                                                |
   +-------------+-------------------------------------------------------------+
   |Inkscape     |Logiciel de dessin vectoriel.                                |
   +-------------+-------------------------------------------------------------+
   |Python Sphinx|Générateur de documentation basé sur le format               |
   |             |reStructuredText.                                            |
   +-------------+-------------------------------------------------------------+
   |Texlive      |Environnement LaTeX complet pour la génération du |site| au  |
   |             |format PDF.                                                  |
   +-------------+-------------------------------------------------------------+

#. Libérez de l'espace disque :

   .. code-block:: console
                   
      $ sudo aptitude clean

.. text review: yes
