.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _format-cible:

Format cible
============

Le format cible [#]_ d'un support de **rédaction technique** est
celui sous lequel l'audience du message y accédera. Il est différent de celui
sous lequel le **rédacteur technique** crée le contenu. Le **single-sourcing**
permet de générer plusieurs livrables à des formats différents à partir d'un
même format source.

À partir des fichiers sources validés, les livrables sont générés selon l'une des méthodes
suivantes :

+------------------------------+-------------------------------------------+
|Méthode                       |Exemple                                    |
+==============================+===========================================+
|Totalement automatique        |Livre blanc du format                      |
|                              |structuré `DITA                            |
|                              |<http://dita.xml.org/>`_ au                |
|                              |format cible PDF *via* DITA                |
|                              |Open Toolkit.                              |
+------------------------------+-------------------------------------------+
|Semi-automatique              |Contenu au format DITA exporté en HTML puis|
|                              |collé sous un CMS [#]_.                    |
+------------------------------+-------------------------------------------+
|Manuelle                      |Plaquette marketing au format traitement de|
|                              |texte ou DITA mise en page sous Indesign,  |
|                              |exportée en PDF, puis imprimée ; selon la  |
|                              |fréquence de publication du document final,|
|                              |des filtres d'import XML peuvent également |
|                              |être mis en place.                         |
+------------------------------+-------------------------------------------+

Plus le processus est automatisé, plus le risque d'erreur est faible
et plus la publication et la mise à jour sont aisées.  L'automatisation facilite
également le *single-sourcing*, qui consiste à générer plusieurs livrables à des
formats cibles différents à partir d'un même format source. Un projet au format
DITA XML peut ainsi être livré sous forme de fichier PDF, d'aide compilée
Windows, d'aide JavaHelp, de site en HTML, etc. Le XML offre en ce domaine des
possibilités quasi illimitées.

.. rubric:: Notes

.. [#] Dans le cas d'une photo, le format cible est le format `JPEG
       <http://fr.wikipedia.org/wiki/Jpeg>`_, qui est utilisé pour l'affichage
       Web ou l'impression et sur lequel les modifications ne peuvent être
       annulées une fois fermé le logiciel de retouches.

.. [#] Ceci est automatisable par un script ; le CMS Drupal propose également un
       module `DITA integration for Drupal <http://drupal.org/project/dita>`_.

.. text review: yes
