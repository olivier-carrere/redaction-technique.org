.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _raspberry-pi-plateforme-documentation:

Le Raspberry Pi 3 en tant que plateforme de documentation
===================================================

Faut-il une débauche de puissance pour générer une documentation
professionnelle ? Avec son unique giga-octet de mémoire vive et son processeur
de *smartphone*, le Raspberry Pi 3 semble se positionner comme une bonne station
bureautique des années 2000… À l'usage, il s'avère pourtant qu'une unité
centrale d'une quarantaine d'euros suffit largement pour créer, gérer et
générer une documentation aux formats PDF, HTML, ou autre.

.. note::

   Les buts de ce billet sont de :

   - Présenter un Proof of Concept (démonstration de faisabilité) et utiliser des ressources minimales pour créer, gérer
     et publier une documentation professionnelle. La plupart des opérations
     se déroulent donc en mode texte, sous Linux. Si les solutions présentées
     ici fonctionnent également en mode graphique sous Windows, elles ne sont
     peut-être pas disponibles sous *Windows 10 IoT*, destiné au Raspberry Pi 3.

   - Présenter un scénario d'utilisation aussi simple que possible, parfois au
     détriment de l'élégance technique.

.. include:: configurez-le-raspberry-pi.rst
.. include:: installez-les-logiciels-necessaires-a-la-generation-de-ce-site.rst
.. include:: recuperez-les-sources-de-ce-site.rst
.. include:: creez-et-modifiez-le-texte.rst
.. include:: creez-et-modifiez-les-schemas.rst
.. include:: gerez-les-versions-de-votre-documentation.rst
.. include:: generez-votre-documentation.rst

.. text review: yes
