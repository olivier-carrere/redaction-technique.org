.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _les-topics-modules-d-information-de-base-dita:

Les topics, modules d'information de base DITA XML
==================================================

Les `topics`_
sont les plus petites unités d'information autonomes gérées par |dita|.
Chaque **topic** a un titre et un corps de texte. Il ne traite que d'un
seul sujet. Il appartient donc au |techwriter| de se baser sur la
modularité proposée par |dita| pour bien structurer l'information.

Les **topics** sont sémantiquement typés. Il existe idéalement un type de
*topic* par type d'information. |dita| propose par défaut des *topics* adaptés
à la documentation des logiciels (description de concepts et de tâches, liste de
commandes, etc.), mais de nouveaux types de *topics* peuvent être créés pour
répondre à d'autres besoins.

Les *topics* sont une des différences principales entre |dita| et
**DocBook**, qui ne propose pas de typologie des briques d'information.

Les *topics* sont généralement stockés *à plat* dans des répertoires divisés par
type de *topic*. Ils sont organisés hiérarchiquement dans des fichiers
*ditamap* et peuvent être partagés entre différents documents. Les titres des
modules ne sont pas affectés d'un niveau de titre. La structure des modules
étant parfaitement homogène, un module peut avoir un niveau 3 dans un document
donné, et un niveau 1 dans un autre document, sans qu'il y ait besoin de
modifier en quoi que ce soit les *topics*.

Les unités d'information atomiques [#]_ telles que des remarques,
des paragraphes, voire des phrases ou des segments de phrase, qui ne peuvent pas
être munis d'un titre, ne forment pas des *topics*. Elles peuvent être cependant
partagées *via* le mécanisme *conref*, similaire au mécanisme *Xinclude* proposé
par DocBook.

.. rubric:: Notes

.. [#] Pas au sens XPath.

.. text review: yes
