---
title: Créez et modifiez les schémas
description: A guide in my new Starlight docs site.
---
# Créez et modifiez les schémas

1.  Modifiez un fichier source des images de ce  :
    -   à l\'aide d\'un logiciel de dessin vectoriel :

        ``` console
        $ inkscape graphics/modulaire-texte-monolithique-binaire.svg &
        ```

    -   ou à l\'aide d\'un éditeur en ligne :

        ``` console
        $ sed -i "s/docbook/XML/g;" graphics/*.svg
        ```
