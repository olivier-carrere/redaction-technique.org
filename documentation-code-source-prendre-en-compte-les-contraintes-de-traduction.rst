.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. review: text no, code no

.. _prendre-en-compte-les-contraintes-de-traduction:

Prendre en compte les contraintes de traduction
===============================================

L'unité d'information **DITA XML** la plus petite est le *nœud* que pour une
phrase complète ou un terme qui ne sera jamais traduit (par exemple, le nom de
la société ou d'un produit). De gros problèmes apparaissent sinon lors de la
traduction dans d'autres langues.

.. figure:: media/traduction-conref.png

   Les phrases se découpent différemment selon les langues

.. rubric:: Exemple

Si vous décidez de pousser la granulométrie au niveau du segment de phrase et
que vous définissez les **conref** suivants:

.. code-block:: xml

   <ph id="click">Click the</ph>

   <ph id="blue">blue</ph>

   <ph id="arrow">arrow</ph>

Vous pouvez maintenant utiliser le code suivant:

.. code-block:: xml

   <p><ph conref="shared.dita/click"/> <ph conref="shared.dita/blue"/>
   <ph conref="shared.dita/arrow"/>.</p

pour que soit générée la phrase *Click the blue arrow.

Essayons maintenant de créer une version française de cette phrase. Nous
traduisons donc les *conref* comme suit:

.. code-block:: xml

   <ph id="click">Cliquez sur la</ph>

   <ph id="blue">bleue</ph>

   <ph id="arrow">flèche</ph>

Nous obtenons alors la phrase *Cliquez sur la bleue flèche.

Pour pallier ce problème, il faudrait réorganiser l'ordre des *conref* dans le
fichier **dita** traduit, ce qui est difficilement gérable et fait perdre tout
l'intérêt du mécanisme. Sans compter que des problèmes pires que ce cas d'école
peuvent conduire à complètement abandonner dans la langue cible les *conref*
utilisés dans la langue source (je n'ai pas d'exemple concret à offrir, ayant
toujours évité de tomber dans ce genre de travers.)
