.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _lire-des-informations-base-de-donnees:

Lire des informations d'une base de données
===========================================

#. Créez la base de données *SQLite3* :file:`productdb.db`:

   .. literalinclude:: code/create-sqlite3.py
      :language: python3

#. Insérez des données dans la base :

   .. literalinclude:: code/insert-sqlite3.py
      :language: python3

#. Lisez le contenu de la base :

   .. literalinclude:: code/read-sqlite3.py
      :language: python3

   À l'exécution du script, le contenu suivant s'affiche :

   .. code-block:: console

      1|dianthus 1.0
      2|geum 1.5
      3|prunus 2.3

.. seealso::

   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`
   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`
