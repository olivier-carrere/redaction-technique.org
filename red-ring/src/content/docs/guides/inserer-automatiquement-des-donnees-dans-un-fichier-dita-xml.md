title: Insérer automatiquement des données dans un fichier DITA XML

Nous voulons automatiser la génération du fichier DITA suivant :

> ::: {.literalinclude language="xml"}
> code/modele.dita
> :::

1.  Installez les programmes et bibliothèques suivants :

    ``` console
    $ sudo apt install libxml2-dev libxslt1-dev python3-lxml
    ```

2.  Créez le script Python `populate-xml.py`{.interpreted-text
    role="file"} suivant :

    ::: {.literalinclude language="python3"}
    code/populate-xml.py
    :::

3.  Rendez le script exécutable, puis exécutez-le :

    ``` console
    $ chmod +x populate-xml.py              
    $ ./populate-xml.py             
    ```

    Le fichier `modele.dita`{.interpreted-text role="file"} est créé et
    contient les données souhaitées.

::: seealso
-   `inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext`{.interpreted-text
    role="ref"}
-   `inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext`{.interpreted-text
    role="ref"}
:::
