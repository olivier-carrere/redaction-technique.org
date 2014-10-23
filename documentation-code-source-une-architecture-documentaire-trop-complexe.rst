.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. review: text no, code no

.. _une-architecture-documentaire-trop-complexe:

Une architecture documentaire trop complexe ?
=============================================

DITA XML est une architecture documentaire plus complexe, mais moins compliquée
que d'autres. Des solutions permettent en outre de gérer plus simplement cette
complexité.

DITA XML permet des gains de productivité importants par la réduction du volume
source que le **rédacteur technique** crée, traduit et maintient. Ce gain de
productivité se fait au prix d'une plus grande complexité.

Si les projets DITA XML sont plus complexes, ils sont cependant moins compliqués
que des projets reposant sur des formats plus traditionnels de type
FrameMaker. En effet, DITA XML est une architecture rationnelle. Le **rédacteur
technique** se trouve donc face à un comportement prédictible des outils qu'il
utilise, loin des trucs et astuces destinés à contourner les bugs ou les
fonctionnements erratiques des outils plus lourds.

Le tableau suivant présente les différents niveaux de complexité et les
solutions qui permettent au **rédacteur technique** de les maîtriser plus
facilement :

+------------------------------+------------------------------+
|**Complexité**                |**Solution**                  |
+------------------------------+------------------------------+
|Syntaxe DITA XML              |IDE tel que XMetal ou nXML    |
+------------------------------+------------------------------+
|Gestion des relations entre   |CMS dédié tel que Componize ou|
|des briques d'information     |DocZone                       |
|atomiques                     |                              |
+------------------------------+------------------------------+
|Syntaxe de la feuille de style|Logiciel graphique de création|
|XSLT                          |de feuilles de style          |
+------------------------------+------------------------------+

Pour une petite équipe de **rédaction technique**, l'écueil principal sera la
nécessité de mettre en œuvre la charte graphique de l'entreprise, selon son
degré de sophistication. Les autres aspects peuvent être gérés sans outil
spécialisé, avec une bonne communication et une série de bonnes pratiques.

Je laisse le dernier mot au consultant `Julio Vazquez
<http://www.linkedin.com/groups/Does-anyone-know-opensource-project-162465.S.74267379?trk=group_search_item_list-0-b-ttl&goback=.gna_162465>`_
:

DITA est en fait d'une remarquable simplicité. La vraie complexité consiste à
amener les **rédacteurs techniques** à envisager le contenu sous un autre
angle. Ils doivent cesser de produire des récits narratifs pour concevoir des
modules d'information autonomes. DITA est plus qu'un langage XML : c'est une
méthode de rédaction.*
