---
title: Récupération et tri des photos
description: A guide in my new Starlight docs site.
---
# Récupération et tri des photos

Après avoir collecté le maximum de photos, je me suis retrouvé avec plus
de 10 000 photos et 30 Go de données. Ouf.

J\'ai commencé, avant toute opération automatique, par faire une copie
de sauvegarde à l\'identique de l\'ensemble des photos sur un disque dur
externe.

Ma première tâche fut de repérer, puis d\'éliminer les doublons grâce à
la commande [fdupes]().

Il me fallait aussi ne pas passer à côté de perles et chercher les
aiguilles intéressantes dans cette meule de foin. Certaines photos,
notamment, se cachaient dans des répertoires zippés. D\'autres
n\'avaient pas d\'extension, et la commande [file]() me fut très utile.

Le but étant avant tout de mettre à disposition des photos pour des
supports imprimés, j\'ai procédé à un premier tri automatisé, selon le
poids des fichiers : les fichiers moins lourds que 1 Mo pouvaient être
sans soucis mis de côté.

Les fichiers étant répartis dans une foultitude de sous-répertoires,
j\'ai utilisé la commande suivante sous Bash :

![](graphics/find-command.svg)

Ensuite, j\'ai consulté les quelque 3 000 photos de plus de 1 Mo sous la
visionneuse *gThumb* et effacé les photos dont la qualité ou le sujet ne
convenaient pas à un support de communication. Ceci a pris environ 3
heures. J\'ai retenu environ 500 photos.

Par comparaison de la liste originale des photos et de celle des
fichiers de plus de 1 Mo conservés, j\'ai ensuite copié dans un autre
répertoire à partir de la copie de sauvegarde les fichiers de plus de
1 Mo éliminés, afin de les mettre à disposition pour une utilisation sur
Instagram, par exemple.
