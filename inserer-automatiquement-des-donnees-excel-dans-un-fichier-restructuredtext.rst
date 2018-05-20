.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _inserer-automatiquement-des-donnees-excel-dans-un-fichier-restructuredtext:

Insérer automatiquement des données Excel dans un fichier reStructuredText
==========================================================================

Supposons que nous disposions d'un fichier Excel contenant des noms de
produits avec leurs versions :

.. exceltable::
   :file: code/produits.xls
   :header: 1
   :selection: A1:C4
	       
Nous pouvons générer le fichier source de la documentation via le
script Python suivant :

.. literalinclude:: code/populate-xlsx.py
   :language: python3

À l'exécution, le contenu suivant s'affiche :

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

Une fois compilé via Sphinx, ce code source produit un affichage HTML
similaire à celui-ci :

Produits et versions
--------------------

Dianthus
~~~~~~~~

- 1.0
- 1.1
- 1.2

Geum
~~~~

- 1.5
- 1.7
- 3.5

Prunus
~~~~~~

- 2.3
- 2.5
- 2.7

.. seealso::

   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`
   - :ref:`inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`
   - :ref:`inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext`
