.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _structuration-et-hierarchisation-information:

Structuration et hiérarchisation de l'information
=================================================

Les informations présentées à l'utilisateur ne sont pas toutes de même
importance. Un module d'information technique **minimaliste** doit bannir les
informations inutiles et hiérarchiser clairement les autres. Le **rédacteur
technique** doit fournir au lecteur des modules structurés en strates
d'information plus ou moins importantes. Dans un document exhaustif, le lecteur
a alors la liberté d'explorer chaque module à la profondeur qui lui
convient. Dans un document à but précis, tel qu'un quickstart, ce choix est fait
pour lui par le **rédacteur technique**.

Chaque module d'information d'une documentation technique **minimaliste** doit
être présenté selon une topologie de page claire et homogène. Selon leur degré
d'importance par rapport au sujet du module d'information, les informations
doivent être placées hors du module, ou mises en avant ou en arrière du corps du
texte. Elles ne doivent à aucun moment être noyées dans le texte. Le **rédacteur
technique** dispose pour ce faire d'outils sémantiques et de mise en page.

+---------------+--------------------------------------------------------------+
|Remarques      |Les remarques ou les avertissements doivent clairement se     |
|               |distinguer du corps de texte principal, par rapport auquel    |
|               |leur valeur n'est que relative ; si par exemple, le rédacteur |
|               |écrit *remarquez que* il doit, logiquement, créer une         |
|               |remarque, située en dehors du flux de texte principal ; le    |
|               |lecteur peut ainsi décider de ne pas lire une information     |
|               |secondaire indiquée comme simple remarque, et ne pourra pas   |
|               |manquer une information cruciale mise en exergue sous forme   |
|               |d'avertissement.                                              |
+---------------+--------------------------------------------------------------+
|Références     |Informations secondaires par nature, les références croisées  |
|croisées       |doivent être toutes placées dans une sous-section *Voir aussi*|
|               |du module d'information et non être éparpillées dans le corps |
|               |du texte. Le lecteur a ainsi un point de référence unique pour|
|               |les informations liées au module qu'il consulte. Cela facilite|
|               |aussi de fournir différentes vues du même module              |
|               |d'information, selon le support et les besoins. La section    |
|               |*Voir aussi* peut ainsi apparaître entièrement dans une       |
|               |**notice technique** au format PDF, sous forme d'un lien      |
|               |cliquable dans une page HTML ou être absente d'une fiche      |
|               |imprimée fournie sans les modules référencés.                 |
+---------------+--------------------------------------------------------------+
|Tableaux       |Les données tabulaires doivent être présentées sous forme de  |
|               |tableau ; ceci est certes une tautologie, mais ce principe    |
|               |n'est pas appliqué lorsque le **rédacteur technique** adopte  |
|               |un style narratif littéraire ; on retrouve alors des          |
|               |formulations de type "A et B, celui-ci étant égal à…, celui-là|
|               |étant égal à…" ; ce grand style est certes très appréciable   |
|               |dans un texte narratif, mais il n'est pas adapté à la         |
|               |rédaction technique, où l'important est de faciliter l'accè  s|
|               |rapide à des informations utiles dans un contexte précis, mais|
|               |qui dépend des circonstances dans lesquelles se trouve        |
|               |l'utilisateur lorsqu'il accède à l'information.  Les tableaux |
|               |imbriqués sont à éviter. S'il semble à un moment donné        |
|               |nécessaire de faire figurer un tableau dans un autre, le      |
|               |**rédacteur technique** doit restructurer son contenu, par    |
|               |exemple en créant une section par entrée du tableau principal.|
+---------------+--------------------------------------------------------------+
|Listes à puces |Les listes à puces sont le pendant en communication technique |
|               |de l'énumération en style narratif elles permettent cependant |
|               |un accès séquentiel rapide à un item précis. Une liste à      |
|               |puces dont les éléments comportent tous un séparateur tel que |
|               |le signe deux points ":" est en fait un tableau incorrectement|
|               |mis en page.                                                  |
+---------------+--------------------------------------------------------------+
|Listes         |Les listes numérotées sont à éviter, l'utilisateur risquant de|
|numérotées     |les confondre avec des étapes de procédure numérotées ; elles |
|               |sont cependant utiles, avec une typographie qui les distingue |
|               |clairement, pour les légendes de schémas, surtout si ces      |
|               |schémas présentent un flux d'actions séquentielles.           |
+---------------+--------------------------------------------------------------+
