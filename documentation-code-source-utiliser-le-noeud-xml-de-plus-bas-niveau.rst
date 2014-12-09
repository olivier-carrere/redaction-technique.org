.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _utiliser-le-noeud-xml-de-plus-bas-niveau:

Utiliser le nœud XML de plus bas niveau
=======================================

Le |techwriter| doit utiliser comme source du `conref`_ le nœud |dita|
de plus bas niveau contenant l'information à partager.

Le but des **conref** étant de gérer des blocs d'information de faibles
dimensions, il est logique de les manipuler au niveau de la plus petite
structure XML encapsulant l'information, même si cette structure, pour être
compatible avec le schéma XSD de la section |dita| où elle intervient,
doit elle-même être incluse dans des structures XML plus grandes.

.. figure:: graphics/conref-bas-niveau.png

   *Placement du* conref *sur le nœud XML de plus bas niveau*

Vous voulez par exemple réutiliser la phrase *Cliquez sur OK.* Vous ne pouvez
cependant pas indiquer dans le fichier contenant les *conref* sources uniquement
le code suivant |_| :

.. code-block:: xml

  <cmd>Cliquez sur OK.</cmd>

Pour être conforme au schéma XSD, votre code doit au moins être structuré comme
suit |_| :

.. code-block:: xml

   <?xml version="1.0" encoding="utf-8"?>
   <!DOCTYPE task PUBLIC "-//OASIS//DTD DITA 1.2 Task//EN"
   /usr/share/dita-ot/dtd/technicalContent/dtd/task.dtd"">
   <task id="shared" xml:lang="fr-fr">
     <title>Conref source</title>
     <taskbody>
       <steps>
         <step>
           <cmd>
             Cliquez sur OK.
           </cmd>
         </step>
       </steps>
     </taskbody>

Il s'agit maintenant de placer un ID sur une structure XML afin de pouvoir
réutiliser le contenu de cette structure. En l'occurrence, c'est une étape
unique comprenant une commande unique que vous souhaitez réutiliser.

Il est alors préférable d'utiliser la syntaxe suivante |_| :

.. code-block:: xml

   <step>
     <cmd id="click-ok">
       Cliquez sur OK.
     </cmd>
   </step>

plutôt que la suivante |_| :

.. code-block:: xml

   <step id="click-ok">
     <cmd>
       Cliquez sur OK.
     </cmd>
   </step>

En effet, dans le premier cas, vous pourrez utiliser le *conref* même si le nœud
supérieur (:samp:`<step>`) contient d'autres nœuds que :samp:`<step>` (par
exemple :samp:`<info>`).

.. figure:: graphics/conref-haut-niveau.png

   *Placement du* conref *sur le nœud XML de plus haut niveau*

Dans le 2e cas, tout le contenu du nœud :samp:`<step>` sera remplacé par la
valeur du *conref* source. Par exemple, dans le cas suivant, tout le contenu du
nœud sera absent des livrables |_| :

.. code-block:: xml

   <step id="click-ok">
     <cmd/>
     <info>
       Si vous ne savez pas lire, c'est le bouton vert.
     </info>
   </step>

.. text review: yes
