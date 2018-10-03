.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _generez-votre-documentation:

Générez votre documentation
---------------------------

#. Revenez dans le terminal, puis récupérez la dernière version *taguée* de ce
   |site| :

   .. code-block:: console

      $ git checkout $(git describe --tags $(git rev-list --tags --max-count=1))

   .. note::

      Oui, je sais, cette commande ne correspond pas exactement à la
      définition de *simple* donnée par le Larousse…

#. Générez la dernière version *taguée* de ce |site| aux format PDF, HTML et
   EPUB :

   .. code-block:: console

      $ make all

#. Affichez le |site| au format PDF :

   .. code-block:: console

      $ xpdf _build/latex/redaction-techniqueorg.pdf &

#. Affichez le |site| au format HTML :

   .. code-block:: console

      $ epiphany _build/html/index.html &

#. Affichez le |site| au format EPUB :

   .. code-block:: console

      $  ebook-viewer _build/epub/redaction-techniqueorg.epub &

Et voilà. En quelques minutes, vous avez :

- Appliqué des règles de texte conditionnel à des sources communes selon le
  format de publication. Ce contenu est par exemple appelé *livre
  électronique* dans la version EPUB, *document* dans la version PDF et
  encore autrement dans la version HTML.

- Généré dans trois formats différents une documentation d'une soixantaine de
  pages comprenant une quarantaine de schémas.

  .. note::

     - Le fichier :file:`Makefile` est assez brut de décoffrage et le temps de
       compilation peut facilement être optimisé.

     - Nous pourrions mettre en place une solution complète de texte
       conditionnel avec opérateurs booléens et tout et tout grâce au moteur
       de *templating* `Jinja`_.

     - Les observateurs remarqueront que la version HTML du |site| version 1.5
       ne comporte pas de table des matières dans la colonne de droite. C'est
       qu'en effet, cette version n'embarque pas le patch *1032292*. Je vous
       laisse chercher dans l'historique |git|… voire créer une branche et le
       *cherry-picker* !

Le |raspi3| est donc une plateforme de documentation tout à fait crédible… à
condition de se passer, ou presque, d'interface graphique !

Le prochain test consistera à générer la version |dita| de ce |site|.

Le prochain prochain test consistera à générer ce |site| sur un *smartphone*
en installant une distribution `Linux sur Android`_.

.. text review: yes
