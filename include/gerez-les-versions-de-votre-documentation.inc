.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _gerez-les-versions-de-votre-documentation:

Gérez les versions de votre documentation
-----------------------------------------

#. *Commitez* votre lot de modifications sous |git| :

   .. code-block:: console
                   
      $ git config --global user.email "votre email"
      $ git config --global user.name "votre nom"
      $ git add *.rst
      $ git commit -m "Mon lot de modifications de texte"
      $ git add graphics/*.svg
      $ git commit -m "Mon lot de modifications sur les images"

#. Affichez l'historique des modifications des sources de ce |site| :

   .. code-block:: console

      $ gitk &

   Ô surprise, vous avez sous les yeux, mais oui, une |gui| ! C'est tellement
   beau, qu'on va faire une photo :

   .. figure:: graphics/historique-git-redaction-technique.png

   *Un* commit *atomique s'étendant sur une bonne quinzaine de fichiers*


.. note::

   - Vos modifications sont purement locales et ne sont pas appliquées sur le
     dépot distant |github|.

   - Si vos modifications apportent une réelle valeur ajoutée à ce |site|
     (correction de coquille, ajout d'information ou autre), n'hésitez pas à
     me la soumettre sous forme de patch |git| ou *via* votre compte |github|.

   - |github| n'est probablement pas hébergé sur un cluster de |raspi3|. Rien
     n'empêche cependant d'héberger un dépôt distant |git| sur un |raspi3|
     connecté au réseau et d'y accéder par connexion sécurisée |ssh|.

.. text review: yes
