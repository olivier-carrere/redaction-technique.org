---
title: "Créer des documents différents à partir des mêmes sources ReST (texte conditionnel)"
description: "Créer des documents différents à partir des mêmes sources ReST avec du texte conditionnel."
sidebar:
  label: How-to
  order: 1
---

<a id="creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel"></a>

1.  Installez Sphinx, et make :

    ``` console
    $ sudo apt install python-sphinx make
    ```

2.  Créez un projet Sphinx en appliquant tous les choix par défaut :

    ``` console
    $ sphinx-quickstart 
    ```

3.  Ajoutez le contenu suivant au fichier `index.rst` en respectant bien les indentations :

    ``` txt
    .. only:: electrician

    .. admonition:: Danger pour les électriciens

      Risque d'électrocution

      Ne touchez pas les fils électriques.

    .. only:: plumber

    .. admonition:: Danger pour les plombiers

      Risque de noyade

      Ne plongez pas dans la piscine.
    ```

4.  Pour masquer ou non le contenu destiné aux électriciens ou aux plombiers, commentez ou non les lignes suivantes du fichier de configuration `conf.py` :

    ``` python
    tags.add('electrician')
    tags.add('plumber')
    ```

5.  Générez votre contenu :

    ``` console
    $ make html
    ```

6.  Ouvrez le fichier `_build/html/index.html` sous un navigateur pour visualiser votre contenu.

:::tip[Voir aussi]
- `creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel`
- `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel`
- `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel`
:::
