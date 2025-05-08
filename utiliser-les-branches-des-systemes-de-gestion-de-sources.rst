.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _utiliser-les-branches-des-systemes-de-gestion-de-sources:

Utiliser les branches des systèmes de gestion de sources
========================================================

Les systèmes de gestion de sources proposent de créer des branches d'un
projet : si à un moment donné, un projet se divise en deux projets
incompatibles, une branche est créée à partir du projet principal. Le
rédacteur technique peut ainsi gérer les différentes traductions de la
documentation technique.

Le système des branches peut servir en théorie à gérer :

- les différentes traductions d'une documentation technique,

- les différentes variations d'une même  documentation technique.

En pratique, cependant, il vaut mieux gérer les déclinaisons d'une   même
documentation à l'aide des mécanismes de partage de sections et de filtrage de
texte conditionnel des outils de documentation.

D'autre part, le système de gestion des branches est plus ou moins adapté à la
gestion des traductions selon le gestionnaire de sources que l'on utilise.

La principale différence entre les systèmes de gestion de sources `Git`_
et Subversion, c'est leur manière de gérer les branches. Créer une branche sous
Subversion revient à dupliquer un répertoire. Les fichiers des deux répertoires
évoluent ensuite séparément. Sous Git, en revanche, la création de branche se
fait sans duplication de données. Sur un même répertoire local, une commande
permet de changer de branche.

Créer une traduction d'une documentation consiste à *forker*, soit créer une
branche, le document initial. Si l'on utilise Git se pose alors le choix entre :

- copier le répertoire de la langue source,

- créer une branche sur le répertoire de la langue source.

La solution de la branche permet en théorie d'effectuer du *Cherry picking* et
d'appliquer facilement à toutes les langues cibles des modifications affectant
uniquement le code XML du projet.

Par exemple, une modification de

.. code-block:: xml

   <image href="filter.png" placement="break"/>

en

.. code-block:: xml

   <image href="filter.png" placement="break" scalefit="yes"/>

de la version anglaise de la documentation peut facilement être appliquée aux
versions chinoise, française, allemande ou autre si elle a fait l'objet d'un
*commit* distinct.  En pratique, cependant, cette opération peut s'avérer
délicate et n'être réellement utile que si l'on doit gérer un grand nombre de
différentes versions linguistiques.  En tout cas, la solution des branches
autorise de telles opérations, non celle des répertoires. Elle est cependant
plus difficile à appréhender et à utiliser par l'équipe de rédaction technique.

.. seealso::

   - :ref:`git-du-fichier-au-contenu`

.. text review: yes
