.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. review: text no, code no

.. _centraliser-les-conref-dans-un-fichier-unique:

Centraliser les conref dans un fichier unique
=============================================

Pour favoriser l'utilisation des `conref
<http://docs.oasis-open.org/dita/v1.1/OS/archspec/conref.html>`_ au sein d'une
équipe de **rédacteurs techniques**, et également pour simplifier la maintenance
des *conref*, il s'avère très efficace de centraliser tous les *conref* dans un
fichier DITA dédié.

Il est *a priori* plus simple, pour réutiliser un contenu d'un fichier **DITA
XML** existant, de pointer vers ce contenu sans l'extraire de son contexte
d'origine. Cependant, un des grands principes de la réutilisation du contenu est
de décontextualiser le contenu. Il est donc à terme beaucoup plus efficace pour
le **rédacteur technique** d'extraire le contenu réutilisé de son fichier
d'origine et de le placer dans un fichier ne contenant que des sources de
**conref**. Il est en effet beaucoup plus facile de placer tous les éléments
sources dans un référentiel unique que de devoir chercher les différentes
sources dans une multitude de fichiers.

.. figure:: graphics/conref-non-centralises.png

   Gérer les *conref* de manière décentralisée est peu efficace

Les *conref* sont en effet résolus à la compilation même si les fichiers
contenant les valeurs sources ne sont pas référencés dans le fichier
:file:`ditamap` permettant de générer le livrable (ce qui veut dire également
que les fichiers contenant les valeurs sources des *conref* peuvent se trouver
dans un répertoire de niveau supérieur à celui du *ditamap*).

.. figure:: graphics/conref.png

   Bonne gestion des *conref

Les fichiers de contenu référencés dans des structures *ditamap* ne contiennent
donc que des *conref* cibles, et un fichier central fédère tous les *conref*
sources ; il contient éventuellement également quelques références internes à
des *conref* cibles.

Ce fichier central doit être de même type (*task*, *concept*, *reference*, etc.)
que les fichiers de contenu, ou du moins du type *composite*, qui accepte tous
types de structures DITA XML.Pour des raisons d'organisation, je trouve
personnellement efficace de créer un fichier central par type de *topic* DITA
XML, et donc de même type, pour partager les informations propres à chaque
type. Je réserve le type *composite* à un fichier central " fourre-tout "
contenant des informations partagées entre différents types de *topics*.

Tous les *conref* sources d'un fichier donné doivent avoir un ID unique dans ce
fichier ; veillez à utiliser des noms explicites pour les humains, vos fichiers
*dita* contenant des *conref* cibles deviendront sinon rapidement illisibles !
