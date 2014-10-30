.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _imbriquer-les-conref:

Imbriquer les conref
====================

Pour des raisons de facilité de mise à jour et de maintenance du contenu **DITA
XML**, le **rédacteur technique** doit limiter l'effet *poupée russe* et ne pas
trop imbriquer les `conref
<http://docs.oasis-open.org/dita/v1.1/OS/archspec/conref.html>`_. Un seul niveau
d'imbrication (un *conref* imbriqué dans un autre) me semble le seuil au-delà
duquel le contenu peut vite devenir ingérable.

Dans l'exemple ci-dessous, le *conref* source *see-admin-guide* contient le
**conref** cible *admin-guide-title* :

.. rubric:: Exemple

.. code-block:: xml

   <p id="see-admin-guide">
     Pour de plus amples informations, voir le <ph
     conref="shared.dita/admin-guide-title"/>.
   </p>

Ce niveau de complexité est gérable. Mais si le *conref* source
*admin-guide-title* contient lui même un *conref* cible, le code **DITA XML**
devient un vrai plat de spaghettis (sans compter les risques de référence
circulaire). Les *conref* peuvent théoriquement être combinés à l'infini, mais
les problèmes pratiques que cela engendre peuvent également être infinis !

.. figure:: graphics/imbriquer-conref.png

   Imbriquer les *conref* sur plusieurs niveaux : puissant, mais dangereux !

Pour résumer la situation :

- Il est tout à fait possible d'imbriquer plusieurs *conref* sources. Le seul
  effet de bord négatif porte sur la lisibilité du fichier contenant les
  *conref*.
- L'imbrication de *conref* sources et cibles est possible mais rapidement
  ingérable.
- Il est impossible d'imbriquer des *conref* cibles : le contenu du *conref* du
  niveau supérieur écrasera les valeurs des *conref* du niveau inférieur.

.. text review: yes
