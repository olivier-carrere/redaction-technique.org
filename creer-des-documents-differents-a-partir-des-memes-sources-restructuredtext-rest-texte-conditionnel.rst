.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel:

Créer des documents différents à partir des mêmes sources ReST (texte conditionnel)
===================================================================================

#. Installez *Sphinx*, et *make* :

   .. code-block:: console

      $ sudo apt install python-sphinx make

#. Créez un projet Sphinx en appliquant tous les choix par défaut :

   .. code-block:: console
   
      $ sphinx-quickstart 

#. Ajoutez le contenu suivant au fichier :file:`index.rst` en
   respectant bien les indentations :

   .. code-block:: rest
   
      .. only:: electrician

	 .. admonition:: Danger pour les électriciens

	    Risque d'électrocution

	    Ne touchez pas les fils électriques.

      .. only:: plumber

	 .. admonition:: Danger pour les plombiers

	    Risque de noyade

	    Ne plongez pas dans la piscine.

#. Pour masquer ou non le contenu destiné aux électriciens ou aux
   plombiers, commentez ou non les lignes suivantes du fichier de
   configuration :file:`conf.py` :

   .. code-block:: python

      tags.add('electrician')
      tags.add('plumber')


#. Générez votre contenu :

   .. code-block:: console
   
      $ make html

#. Ouvrez le fichier :file:`_build/html/index.html` sous un navigateur
   pour visualiser votre contenu.

.. seealso::

   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel`
   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel`
   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel`
