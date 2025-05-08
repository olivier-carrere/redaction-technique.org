---
title: Générer un PDF avec DITA Open Toolkit sous GNU/Linux
description: A guide in my new Starlight docs site.
---
# Générer un PDF avec DITA Open Toolkit sous GNU/Linux

Ce didacticiel est destiné à vous guider dans la mise en place et
l\'utilisation de la chaîne de publication dans un environnement
GNU/Linux (Ubuntu ou Debian).

**Prérequis**

-   Ubuntu ou Debian sur une machine physique ou virtuelle avec le mot
    de passe administrateur,
-   connexion Internet.

1.  Téléchargez et décompressez l\'archive  :

    ``` console
    $ export REPO="https://github.com/dita-ot/dita-ot"
    $ wget $REPO/releases/download/2.1/dita-ot-2.1.0.tar.gz
    $ tar -xzvf dita-ot-2.1.0.tar.gz
    ```

2.  Générez votre premier PDF :

    ``` console
    $ cd dita-ot-2.1.0
    $ dita -f pdf -i samples/taskbook.ditamap
    ```

Félicitations, vous avez compilé votre premier projet  ! Le fichier PDF
généré est `out/taskbook.pdf`{.interpreted-text role="file"}. Vous
pouvez maintenant compiler d\'autres projets en ignorant les étapes 1 et
2.
