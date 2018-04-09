.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml:

Insérer automatiquement des données dans un fichier DITA XML
============================================================

Nous voulons automatiser la génération du fichier DITA suivant :

   .. literalinclude:: code/modele.dita
      :language: xml

#. Installez les programmes et bibliothèques suivants :

   .. code-block:: console

      $ sudo apt install libxml2-dev libxslt1-dev python3-lxml

#. Créez le script Python :file:`populate-xml.py` suivant :

   .. literalinclude:: code/populate-xml.py
      :language: python3

#. Rendez le script exécutable, puis exécutez-le :

   .. code-block:: console

      $ chmod +x populate-xml.py		      
      $ ./populate-xml.py		      

   Le fichier :file:`modele.dita` est créé et contient les données souhaitées.

.. seealso::

   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`
   - :ref:`lire-des-informations-base-de-donnees`
