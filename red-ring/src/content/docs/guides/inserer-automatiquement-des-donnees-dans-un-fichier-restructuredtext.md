# Insérer automatiquement des données dans un fichier reStructuredText {#inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext}

Supposons que vous deviez présenter 3 produits, *Dianthus*, *Geum* et
*Prunus*, chacun déclinés dans trois versions *1.0*, *1.5* et *2.3*.

Plutôt que d\'écrire les données à la main dans le fichier de contenu,
vous pouvez les insérer automatiquement grâce à
\[Jinja\](<http://jinja.pocoo.org/> et Python.

1.  Créez le fichier `modele.rst`{.interpreted-text role="file"}
    suivant :

    ::: {.literalinclude language="rest"}
    code/modele.rst
    :::

2.  Créez le script Python `populate.py`{.interpreted-text role="file"}
    suivant :

    ::: {.literalinclude language="python3"}
    code/populate.py
    :::

3.  Rendez le script exécutable, puis exécutez-le :

    ``` console
    $ chmod +x populate.py              
    $ ./populate.py             
    ```

    Le contenu suivant s\'affiche :

    ``` rest
    Produits et versions
    ====================

    Dianthus
    --------

    - 1.0

    - 1.5

    - 2.3


    Geum
    ----

    - 1.0

    - 1.5

    - 2.3


    Prunus
    ------

    - 1.0

    - 1.5

    - 2.3
    ```

Vous minimisez ainsi le risque d\'erreurs et l\'effort de mise à jour.

::: seealso
-   `inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`{.interpreted-text
    role="ref"}
-   `inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext`{.interpreted-text
    role="ref"}
:::
