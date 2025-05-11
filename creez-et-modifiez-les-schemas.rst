.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _creez-et-modifiez-les-schemas:

Créez et modifiez les schémas
-----------------------------

#. Modifiez un fichier source des images de ce blog :

   - à l'aide d'un logiciel de dessin vectoriel :

     .. code-block:: console

        $ inkscape graphics/modulaire-texte-monolithique-binaire.svg &

   - ou à l'aide d'un éditeur en ligne :

     .. code-block:: console

        $ sed -i "s/docbook/XML/g;" graphics/*.svg

.. text review: yes
