.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _validation-et-controle-qualite:

Validation et contrôle qualité
==============================

Un support de **rédaction technique** doit être soumis à un **contrôle qualité**
rigoureux avant d'être communiqué à ses différentes cibles.

Le contenu doit être validé avant livraison. Cela paraît évident, mais cela
demande de bien impliquer en amont les personnes chargées de la
validation. Idéalement, la phase de validation se déroule en parallèle de la
phase de création |_| : plus les modifications interviennent tôt, moins elles sont
coûteuses. Un outil de gestion de contenu d'entreprise tel qu'`Alfresco`_
peut sembler intéressant afin de mettre en place
des *workflows*, sur le papier du moins. Dans les faits, une telle solution peut
s'avérer lourde. Elle est de plus peu compatible avec certains formats sources
basés sur des documents modulaires et non monolithiques et avec les logiciels de
gestion de versions (le projet `Componize`_ se
propose cependant de gérer des projets |dita| sous Alfresco). Il reste cependant
impératif de mettre en place des étapes de validation tout au long du projet.
Associés à un système de gestion de versions, les outils de comparaison sont
très utiles pour valider les mises à jour. Une version « |_| taguée |_| » d'un projet
|dita| et la version en cours peuvent par exemple être exportées au format
RTF, puis comparées sous un traitement de texte. Cela est bien moins fastidieux
qu'une relecture comparée. Comparer les modules d'information directement sous
le système de gestion de versions n'est pas suffisant, car ils ne sont que les «
|_| briques |_| » du document final.

.. toctree::
   :hidden:

   documentation-code-source-workflow-de-creation-et-validation

.. text review: yes
