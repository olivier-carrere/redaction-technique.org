.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _typologie-de-haut-niveau-de-l-information:

Typologie de haut niveau de l'information
=========================================

|dita| propose au |techwriter| une
typologie de haut niveau qui est une véritable aide à la structuration du
contenu.

S'il crée un nouveau document au format FrameMaker, DocBook ou traitement de
texte, le |techwriter| se trouve face à une page blanche. Selon sa
rigueur professionnelle, l'information transmise à l'utilisateur oscillera entre
les deux pôles suivants :

+------------------------------+------------------------------+
|Organisation rationnelle      |L'utilisateur dispose d'un    |
|                              |accès séquentiel rapide et    |
|                              |aisé à l'information dont il a|
|                              |besoin.                       |
+------------------------------+------------------------------+
|Magma informatif              |L'utilisateur doit lire       |
|                              |intégralement toute une       |
|                              |section, voire le document en |
|                              |sa totalité pour espérer      |
|                              |trouver des renseignements    |
|                              |utiles.                       |
+------------------------------+------------------------------+

Lorsqu'il crée un document |dita|, en revanche, le |techwriter|
doit d'emblée choisir le modèle [#]_ qui correspond
au type d'information qu'il veut présenter. De base, |dita| propose les types
d'information suivants  [#]_ :

+------------------------------+------------------------------+
|Type d'information            |Description                   |
+==============================+==============================+
|Concept                       |Texte généraliste du type     |
|                              |introduction ou présentation. |
+------------------------------+------------------------------+
|Task                          |Procédure pas à pas destinée à|
|                              |réaliser une tâche.           |
+------------------------------+------------------------------+
|Reference                     |Information de référence du   |
|                              |type explication de paramètres|
|                              |de commandes.                 |
+------------------------------+------------------------------+

Chacune de ces catégories de haut niveau propose un jeu de balises de plus bas
niveau qui lui est propre.  Si le |techwriter| rédige un document
technique, il y a toutes les chances pour que
l'information qu'il a collectée et qu'il doit organiser fasse partie de l'une de
ces trois catégories [#]_. Cette division en types
d'information oblige donc d'entrée de jeu le |techwriter| à
structurer l'information. L'utilisateur y gagne en facilité et rapidité d'accès
à l'information et en utilisabilité globale de la documentation technique.

.. only:: html

   .. rubric:: Notes

.. [#] Dans la pratique, un schéma XSD.

.. [#] |dita| propose trois types d'information de base, tandis que la méthode
       Information Mapping en propose sept.

.. [#] S'il s'avère qu'il a réellement besoin d'une autre catégorie, il peut la
       créer *via* une spécialisation.

.. text review: yes
