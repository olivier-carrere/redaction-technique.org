.. _typologie-de-haut-niveau-de-l-information:

Typologie de haut niveau de l'information
=========================================

`DITA XML <http://dita.xml.org/>`_ propose au **rédacteur technique** une
typologie de haut niveau qui est une véritable aide à la structuration du
contenu.

S'il crée un nouveau document au format FrameMaker, DocBook ou traitement de
texte, le **rédacteur technique** se trouve face à une page blanche. Selon sa
rigueur professionnelle, l'information transmise à l'utilisateur oscillera entre
les deux pôles suivants :

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

Lorsqu'il crée un document DITA XML, en revanche, le **rédacteur technique**
doit d'emblée choisir le modèle (dans la pratique, un schéma XSD) qui correspond
au type d'information qu'il veut présenter. De base, DITA XML propose les types
d'information suivants (DITA XML propose trois types d'information de base,
tandis que, de mémoire, la méthode Information Mapping en propose sept) :

+------------------------------+------------------------------+
|**Type d'information**        |**Description**               |
+------------------------------+------------------------------+
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
niveau qui lui est propre.  Si le **rédacteur technique** rédige un document
technique, ce qui est assez probable, il y a toutes les chances pour que
l'information qu'il a collectée et qu'il doit organiser fasse partie de l'un de
ces trois catégories (s'il s'avère qu'il a réellement besoin d'une autre
catégorie, il peut la créer *via* une spécialisation).  Cette division en types
d'information oblige donc d'entrée de jeu le **rédacteur technique** à
structurer l'information. L'utilisateur y gagne en facilité et rapidité d'accès
à l'information et en utilisabilité globale de la **documentation technique*
