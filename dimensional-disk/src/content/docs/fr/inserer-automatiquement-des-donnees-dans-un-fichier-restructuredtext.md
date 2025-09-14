---
title: "Insérer automatiquement des données dans un fichier reStructuredText"
description: "Supposons que vous deviez présenter 3 produits, Dianthus, Geum et Prunus, chacun déclinés dans trois versions 1.0, 1.5 et 2.3."
slug: /inserer-automatiquement-des-donnees-dans-un-fichier-restructuredtext
---

Supposons que vous deviez présenter 3 produits, *Dianthus*, *Geum* et *Prunus*, chacun déclinés dans trois versions *1.0*, *1.5* et *2.3*.

Plutôt que d’écrire les données à la main dans le fichier de contenu, vous pouvez les insérer automatiquement grâce à [Jinja]() et Python.

1. Créez le fichier `modele.rst` suivant :

    ::: {.literalinclude language="rest"}
    code/modele.rst
    :::

2. Créez le script Python `populate.py` suivant :

    ::: {.literalinclude language="python3"}
    code/populate.py
    :::

3. Rendez le script exécutable, puis exécutez-le :

    ``` console
    $ chmod +x populate.py
    $ ./populate.py
    ```

    Le contenu suivant s’affiche :

    ``` txt
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

Vous minimisez ainsi le risque d’erreurs et l’effort de mise à jour.

:::tip[Voir aussi]
- `inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml`
- `inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext`
:::