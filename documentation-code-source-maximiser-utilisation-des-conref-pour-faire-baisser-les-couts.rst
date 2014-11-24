.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _maximiser-utilisation-des-conref-pour-faire-baisser-les-couts:

Maximiser l'utilisation des conref pour faire baisser les coûts
===============================================================

Recourir aux `conref
<http://docs.oasis-open.org/dita/v1.1/OS/archspec/conref.html>`_ est le meilleur
moyen dont dispose le **rédacteur technique** pour faire baisser
spectaculairement les coûts et les délais de publication de son contenu **DITA
XML**, surtout pour les **documents multilingues**.

De par la nature des informations qu'elles contiennent, les sections de type
**task** ont un taux plus élevé de réutilisation du contenu que celles de type
**concept** ou **reference**.

.. figure:: graphics/maximiser-conref.png

   Les *conref* modularisent de petits blocs d'information

Comme dans l'exemple ci-dessous, il n'est pas rare d'obtenir rapidement des
fichiers dont la seule valeur unique est le titre, le reste du contenu,
*pourtant unique* (car il assemble de manière unique des blocs d'information non
uniques), étant généré par des *conref*.

.. rubric:: Exemple

.. code-block:: xml

   <?xml version="1.0" encoding="utf-8"?>
   <!DOCTYPE task PUBLIC "-//OASIS//DTD DITA 1.2 Task//EN" "/usr/share/dita-ot/dtd/technicalContent/dtd/task.dtd">
   <task id="display-trends" xml:lang="fr-fr">
     <title>Afficher les tendances</title>
     <taskbody>
       <context audience="basic">
         <note type="restriction" audience="advanced">
           <ul>
             <li>
               <ph conref="shared.dita/ip-control"/>
             </li>
           </ul>
           <ph conref="../../shared/shared.dita/see-user-guide" audience="no-user-guide"/>
         </note>
       </context>
       <steps>
         <step>
           <cmd audience="basic">
             <menucascade>
               <uicontrol conref="shared.dita/logs"/>
             </menucascade>
           </cmd>
           <choices audience="advanced">
             <choice>
               <ph conref="shared.dita/physical-appliance"/>
               <menucascade>
                 <uicontrol conref="shared.dita/logs"/>
               </menucascade>
             </choice>
             <choice>
               <ph conref="shared.dita/virtual-appliance"/>
               <menucascade>
                 <uicontrol conref="shared.dita/server"/>
                 <uicontrol conref="shared.dita/logs"/>
               </menucascade>
             </choice>
           </choices>
         </step>
         <step>
           <cmd>
             <menucascade>
               <uicontrol conref="shared.dita/all"/>
               <uicontrol conref="shared.dita/editfile"/>
             </menucascade>
           </cmd>
           <info>
             <ul conref="shared.dita/drill-down">
               <li/>
             </ul>
             <note conref="shared.dita/randomnames"/>
           </info>
         </step>
       </steps>
     </taskbody>
   </task>

Seul le texte en noir doit être traduit. Traduire ce type de fichier de contenu
**DITA XML** consiste donc à traduire uniquement le titre de la section et
l'intégralité des *conref* sources. Lorsqu'il traduit un ensemble d'unités
d'information placées en vrac dans un fichier, le traducteur manque cependant
cruellement de contexte. Le créateur du contenu initial doit donc lui fournir
une assistance constante. La méthode la plus efficace consiste à faire
travailler le traducteur en régie. Avantage supplémentaire : il pourra ainsi
interroger non seulement le rédacteur technique, mais également les concepteurs
du produit.

.. note::

   Ne croyez pas qu'il s'agit là d'une contrainte spécifiquement induite par la
   modularisation poussée du contenu. Pour avoir fait une école de traduction
   reposant sur le principe simple mais efficace du *triangle du sens* (le
   traducteur doit comprendre le texte source pour le reformuler dans le texte
   cible et non transcrire une suite de mots d'une langue à l'autre) et avoir
   pratiqué la traduction technique durant plusieurs années, je sais
   que tout projet de traduction réussi repose sur une collaboration efficace entre
   concepteurs, rédacteurs et traducteurs.

Il est également possible de factoriser ainsi des éléments de structure, et non
de contenu, tels que des en-têtes de tableaux. Vous pouvez ainsi présenter des
informations de même type de manière homogène à moindre coût, c'est à dire sans
recourir à la `spécialisation
<http://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture#Specialization>`_.

.. text review: yes
