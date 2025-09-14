---
title: "Insérer automatiquement des données SQL dans un fichier reStructuredText"
description: "Nous allons créer une base de données de produits avec leurs versions, puis mettre en forme ces informations dans un fichier reStructuredText."
slug: "inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext"
sidebar:
  label: "How-to"
  order: 1
next: false
---

Nous allons créer une base de données de produits avec leurs versions, puis mettre en forme ces informations dans un fichier reStructuredText. Elles pourront donc facilement être mises en forme et publiées au format PDF, HTML ou autre.

1.  Créez la base de données *SQLite3* `productdb.db`:

    ::: {.literalinclude language="python3"}
    code/create-sqlite3.py
    :::

2.  Insérez des données dans la base :

    ::: {.literalinclude language="python3"}
    code/insert-sqlite3.py
    :::

3.  Créez le fichier `modele-sql.rst` suivant :

    ::: {.literalinclude language="rest"}
    code/modele-sql.rst
    :::

4.  Exécutez le script Python suivant :

    ::: {.literalinclude language="python3"}
    code/populate-sql-rst.py
    :::

    Le contenu suivant s'affiche :

    ``` txt
    Produits et versions
    ====================

    Dianthus
    --------

    - 1.0

    - 1.1

    - 1.2

    Geum
    ----

    - 1.5

    - 1.7

    - 3.5

    Prunus
    ------

    - 2.3

    - 2.5

    - 2.7
    ```

:::tip[Voir aussi]
- `inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`
- `inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`
:::