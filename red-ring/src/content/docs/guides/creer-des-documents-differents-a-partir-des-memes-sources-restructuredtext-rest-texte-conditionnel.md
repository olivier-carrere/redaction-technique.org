---
title: Créer des documents différents à partir des mêmes sources ReST (texte conditionnel)
description: A guide in my new Starlight docs site.
---

1.  Installez *Sphinx*, et *make* :

    ``` console
    $ sudo apt install python-sphinx make
    ```

2.  Créez un projet Sphinx en appliquant tous les choix par défaut :

    ``` console
    $ sphinx-quickstart 
    ```

3.  Ajoutez le contenu suivant au fichier `index.rst`{.interpreted-text
    role="file"} en respectant bien les indentations :

    ``` rest
    .. only:: electrician

    .. admonition:: Danger pour les électriciens

      Risque d'électrocution

      Ne touchez pas les fils électriques.

    .. only:: plumber

    .. admonition:: Danger pour les plombiers

      Risque de noyade

      Ne plongez pas dans la piscine.
    ```

4.  Pour masquer ou non le contenu destiné aux électriciens ou aux
    plombiers, commentez ou non les lignes suivantes du fichier de
    configuration `conf.py`{.interpreted-text role="file"} :

    ``` python
    tags.add('electrician')
    tags.add('plumber')
    ```

5.  Générez votre contenu :

    ``` console
    $ make html
    ```

6.  Ouvrez le fichier `_build/html/index.html`{.interpreted-text
    role="file"} sous un navigateur pour visualiser votre contenu.

::: seealso
-   `creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel`{.interpreted-text
    role="ref"}
-   `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel`{.interpreted-text
    role="ref"}
-   `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel`{.interpreted-text
    role="ref"}
:::
