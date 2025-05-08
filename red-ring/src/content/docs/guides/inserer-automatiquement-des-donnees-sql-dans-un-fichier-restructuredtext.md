---
title: Insérer automatiquement des données SQL dans un fichier reStructuredText

Nous allons créer une base de données de produits avec leurs versions,
puis mettre en forme ces informations dans un fichier reStructuredText.
Elles pourront donc facilement être mises en forme et publiées au format
PDF, HTML ou autre.

1.  Créez la base de données *SQLite3* `productdb.db`{.interpreted-text
    role="file"}:

    ::: {.literalinclude language="python3"}
    code/create-sqlite3.py
    :::

2.  Insérez des données dans la base :

    ::: {.literalinclude language="python3"}
    code/insert-sqlite3.py
    :::

3.  Créez le fichier `modele-sql.rst`{.interpreted-text role="file"}
    suivant :

    ::: {.literalinclude language="rest"}
    code/modele-sql.rst
    :::

4.  Exécutez le script Python suivant :

    ::: {.literalinclude language="python3"}
    code/populate-sql-rst.py
    :::

    Le contenu suivant s\'affiche :

    ``` rest
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

::: seealso
-   `inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`{.interpreted-text
    role="ref"}
-   `inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`{.interpreted-text
    role="ref"}
:::
