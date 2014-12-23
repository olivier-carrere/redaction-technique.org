.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _gerer-son-contenu-dita-xml-avec-ou-sans-cms:

Gérer son contenu DITA XML avec ou sans CMS ?
=============================================

L'architecture |dita| ne propose pas de
mécanisme de **workflow documentaire** natif. Les workflows sont pourtant un
élément important d'un processus efficace de gestion du **cycle de vie du
contenu**.

Les |cms| gèrent également les métadonnées, ce qui permet une recherche plus
efficace de l'information existante, et les rétroliens [#]_.

La plupart des entreprises sont réticentes à mettre en place des |cms|, outils
dédiés aux workflows. Elles ont d'ailleurs parfois connu des échecs de mise en
place de telles solutions part le passé.

De plus, l'un des grands avantages de |dita|, c'est de s'intégrer directement
dans le système d'information en place. Chez les éditeurs de logiciels,
notamment, rien de plus facile que de venir se greffer sur le système de gestion
des sources en place, qu'il s'agisse de `Git`_ [#]_, de
Subversion ou de SourceSafe. À budget quasi nul. Raison de plus pour ne pas
investir du temps et de l'argent dans un |cms|.  Les gains de productivité
spectaculaires reportés par certaines entreprises suite à la mise en place d'un
|cms| |dita| ont cependant de quoi faire réfléchir. Ainsi, Epson America a pu
réutiliser jusqu'à 90 % du contenu existant sur de nouveaux projets.

Si l'on opte pour un |cms|, celui-ci doit clairement supporter |dita| : on ne gère
pas un jeu de briques d'information comme un document monolithique. Adieu donc
SharePoint ou Alfresco, il faut se tourner vers des solutions dédiées telles que
`Componize`_ ou `DocZone`_.

Quel que soit le choix initial, il est possible à tout instant de changer de
stratégie, sans remettre en cause l'existant. L'architecture |dita| n'est en
effet liée à aucun référentiel particulier. Rien n'interdit donc de commencer à
gérer ses projets sans |cms|, puis d'avoir recours à une telle solution si les
bénéfices de ce choix deviennent manifestes.

.. only:: html

   .. rubric:: Notes

.. [#] Le |techwriter| peut ainsi voir où un élément d'information
       est inclus ; lors de la mise à jour de cet élément, il peut alors juger
       si l'élément modifié sera toujours valable dans les différents contextes.

.. [#] Il est possible, quoiqu'un peu complexe, de mettre en place des workflows
       sous Git *via* des branches.

.. seealso::

   - :ref:`git-du-fichier-au-contenu`

.. text review: yes
