.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext:

Insérer automatiquement des données dans un fichier reStructuredText
====================================================================

Supposons que vous deviez présenter 3 produits, *Dianthus*, *Geum* et
*Prunus*, chacun déclinés dans trois versions *1.0*, *1.5* et *2.3*.

Plutôt que d'écrire les données à la main dans le fichier de contenu,
vous pouvez les insérer automatiquement grâce à `Jinja`_ et Python.

#. Créez le fichier :file:`modele.rst` suivant :

   .. literalinclude:: code/modele.rst
      :language: rest

#. Créez le script Python :file:`populate.py` suivant :

   .. literalinclude:: code/populate.py
      :language: python3

#. Rendez le script exécutable, puis exécutez-le :

   .. code-block:: console

      $ chmod +x populate.py		      
      $ ./populate.py		      

   Le contenu suivant s'affiche :

   .. code-block:: rest

      Produits et versions
      ====================

      Dianthus
      --------
   
      - 1.0
   
      - 1.5
   
      - 2.3
   

      Geum
      ----
   
      - 1.0
   
      - 1.5
   
      - 2.3
   

      Prunus
      ------
   
      - 1.0
   
      - 1.5
   
      - 2.3

Vous minimisez ainsi le risque d'erreurs et l'effort de mise à jour.

.. seealso::

   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`
   - :ref:`inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext`
