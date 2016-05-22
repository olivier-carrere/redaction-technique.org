.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _raspberry-pi-plateforme-documentation:

Le |raspi3| en tant que plateforme de documentation
===================================================

Faut-il une débauche de puissance pour générer une documentation
professionnelle ? Avec son unique giga-octet de mémoire vive et son processeur
de *smartphone*, le |raspi3| semble se positionner comme une bonne station
bureautique des années 2000… À l'usage, il s'avère pourtant qu'une unité
centrale d'une quarantaine d'euros suffit largement pour créer, gérer et
générer une documentation aux formats PDF, HTML, ou autre.

.. note::

   Les buts de ce billet sont de :

   - Présenter un |poc| et utiliser des ressources minimales pour créer, gérer
     et publier une documentation professionnelle. La plupart des opérations
     se déroulent donc en mode texte, sous Linux. Si les solutions présentées
     ici fonctionnent également en mode graphique sous Windows, elles ne sont
     peut-être pas disponibles sous *Windows 10 IoT*, destiné au |raspi3|.

   - Présenter un scénario d'utilisation aussi simple que possible, parfois au
     détriment de l'élégance technique.

.. include:: include/configurez-le-raspberry-pi.inc
.. include:: include/installez-les-logiciels-necessaires-a-la-generation-de-ce-site.inc
.. include:: include/recuperez-les-sources-de-ce-site.inc
.. include:: include/creez-et-modifiez-le-texte.inc
.. include:: include/creez-et-modifiez-les-schemas.inc
.. include:: include/gerez-les-versions-de-votre-documentation.inc
.. include:: include/generez-votre-documentation.inc

.. text review: yes
