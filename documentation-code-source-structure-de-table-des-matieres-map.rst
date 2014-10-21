.. _structure-de-table-des-matieres-map:

Structure de table des matières : map
=====================================

Une **map** (fichier **ditamap**) ne contient qu'une série de liens hiérarchisés
vers différents *topics* ou d'autres *maps*. Le **rédacteur technique** peut
donc facilement créer différents documents à partir des mêmes fichiers source.

Vous pouvez par exemple générer à partir de sources DITA :

- un manuel de référence présentant toutes les options possibles d'un programme
  de gestion de réseau,

- un guide de l'administrateur contenant une section présentant les options du
  programme qui ne concernent que les administrateurs réseau,

- un guide de maintenance contenant une section présentant les options qui ne
  concernent que les techniciens de maintenance.

Exemple de structure de *maps* (une *map* incluse dans une autre et deux *maps
différentes pointant vers les mêmes fichiers source pour générer des documents
distincts) :

.. aafig::

      ditamap-1                              ditamap-2
           |                                      |
           +--------topic-1                       |
           +--------topic-2                       |
           +--------ditamap-1-1                   |
           |             +--------task-1----------+
           |             +--------task-2 ---------+
           +--------task-3 -----------------------+
           +--------task-4 -----------------------+
           +--------reference-1
