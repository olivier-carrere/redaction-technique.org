---
title: "Insérer automatiquement des données dans un fichier DITA XML"
description: "Nous voulons automatiser la génération du fichier DITA suivant :"
slug: inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml
sidebar:
  label: How-to
  order: 1
prev: false
next: false
---

Nous voulons automatiser la génération du fichier DITA suivant :

::: {.literalinclude language="xml"}
code/modele.dita
:::

1.  Installez les programmes et bibliothèques suivants :

    ``` console
    $ sudo apt install libxml2-dev libxslt1-dev python3-lxml
    ```

2.  Créez le script Python `populate-xml.py` suivant :

    ::: {.literalinclude language="python3"}
    code/populate-xml.py
    :::

3.  Rendez le script exécutable, puis exécutez-le :

    ``` console
    $ chmod +x populate-xml.py              
    $ ./populate-xml.py             
    ```

    Le fichier `modele.dita` est créé et contient les données souhaitées.

:::tip[Voir aussi]
-   `inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`
-   `inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext`
:::