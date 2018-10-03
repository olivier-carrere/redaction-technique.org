.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _quel-referentiel-pour-le-travail-de-groupe:

Quel référentiel pour le travail de groupe ?
============================================

.. sidebar:: :awesome:`fa-bullhorn`

   Le référentiel le plus fréquemment utilisé pour stocker des fichiers
   informatiques est le dossier, ou répertoire. Si ce dépôt est parfaitement
   adapté à la gestion de fichiers par un utilisateur unique sur son disque
   dur local, il montre rapidement ses limites pour le travail de groupe.

Pour travailler sur un fichier, le |techwriter| utilise un programme
qui lit le fichier sur son disque dur et en charge une copie en mémoire
vive. Les modifications s'effectuent sur cette copie. Lorsque le |techwriter|
enregistre ses modifications, le programme écrase sur le disque dur
la version précédente du fichier. La version précédente est donc définitivement
supprimée, sauf si le programme a créé une copie de sauvegarde ou si le
|techwriter| a utilisé la fonction *Enregistrer sous*, et non
*Enregistrer*, pour créer une nouvelle version du fichier. Dans le premier cas,
il n'existe que deux versions du fichier à un instant donné : la version n et la
version n-1. Dans le second cas, le |techwriter| peut créer autant de
versions qu'il le souhaite, par exemple en ajoutant le suffixe  -1, -2, etc. au
nom du fichier.

Les programmes ne gèrent cependant pas la modification concurrente d'un même
fichier par plusieurs rédacteurs techniques. Dans le cas d'un fichier
disponible sur un disque réseau, imaginons qu'Arsène et Louise ouvrent la même
version de ce fichier sous un éditeur de texte. Chacun apporte des modifications
différentes dans sa copie chargée en mémoire vive, puis enregistre son
travail. Arsène enregistre tout d'abord ses modifications, puis Louise. À la
prochaine ouverture du fichier, seules les modifications de Louise figureront
dans le fichier.

Pour éviter ce genre de situation, de nombreux programmes verrouillent les
fichiers ouverts. Ils ne sont donc disponibles qu'en lecture tant que
l'utilisateur qui les modifie en a une copie en mémoire vive (c'est-à-dire, tant
qu'il ne l'a pas fermé). Il n'est donc pas possible avec ce système de
travailler à plusieurs sur le même fichier et d'effectuer par exemple des
modifications transverses par lot, comme modifier le chemin de toutes les
images.

Si le programme utilisé ne verrouille pas les fichiers ouverts, une coordination
de tous les instants doit s'instaurer entre les membres de l'équipe.

.. text review: yes
