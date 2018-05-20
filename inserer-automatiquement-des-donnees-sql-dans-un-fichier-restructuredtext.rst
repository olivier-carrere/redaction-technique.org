.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext:

Insérer automatiquement des données SQL dans un fichier reStructuredText
========================================================================

Nous allons créer une base de données de produits avec leurs versions,
puis mettre en forme ces informations dans un fichier
reStructuredText. Elles pourront donc facilement être mises en forme et
publiées au format PDF, HTML ou autre.

#. Créez la base de données *SQLite3* :file:`productdb.db`:

   .. literalinclude:: code/create-sqlite3.py
      :language: python3

#. Insérez des données dans la base :

   .. literalinclude:: code/insert-sqlite3.py
      :language: python3

#. Créez le fichier :file:`modele-sql.rst` suivant :

   .. literalinclude:: code/modele-sql.rst
      :language: rest

#. Exécutez le script Python suivant :

   .. literalinclude:: code/populate-sql-rst.py
      :language: python3


   Le contenu suivant s'affiche :

   .. code-block:: rest

      Produits et versions
      ====================

      Dianthus
      --------
   
      - 1.0

      - 1.1
   
      - 1.2

      Geum
      ----
   
      - 1.5
   
      - 1.7
   
      - 3.5

      Prunus
      ------
   
      - 2.3
   
      - 2.5
   
      - 2.7

.. seealso::

   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`
   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`
   - :ref:`inserer-automatiquement-des-donnees-excel-dans-un-fichier-restructuredtext`
