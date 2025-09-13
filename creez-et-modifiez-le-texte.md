---
title: "Créez et modifiez le texte"
description: "Modifiez un fichier source modulaire à l'aide d'un éditeur de texte, d'un environnement de développement ou d'un éditeur en ligne."
slug: "creez-et-modifiez-le-texte"
sidebar:
  label: "How-to"
  order: 1
prev: null
next: null
---

1.  Modifiez un fichier source modulaire de ce  :
    -   à l'aide d'un éditeur de texte :

        ``` console
        $ leafpad *coin-du-geek.rst &
        ```

    -   ou à l'aide d'un environnement de développement :

        ``` console
        $ emacs *coin-du-geek.rst &
        ```

    -   ou à l'aide d'un éditeur en ligne, par exemple :

        ``` console
        $ sed -i "s/répertoire/dossier/g;" *.rst
        ```