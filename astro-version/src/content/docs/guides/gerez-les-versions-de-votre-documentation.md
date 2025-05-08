---
title: Gérez les versions de votre documentation {#gerez-les-versions-de-votre-documentation}
description: A guide in my new Starlight docs site.
---
# Gérez les versions de votre documentation {#gerez-les-versions-de-votre-documentation}

1.  *Commitez* votre lot de modifications sous  :

    ``` console
    $ git config --global user.email "votre email"
    $ git config --global user.name "votre nom"
    $ git add *.rst
    $ git commit -m "Mon lot de modifications de texte"
    $ git add graphics/*.svg
    $ git commit -m "Mon lot de modifications sur les images"
    ```

2.  Affichez l\'historique des modifications des sources de ce  :

    ``` console
    $ gitk &
    ```

    Ô surprise, vous avez sous les yeux, mais oui, une  ! C\'est
    tellement beau, qu\'on va faire une photo :

    ![](graphics/historique-git-redaction-technique.png)

    *Un* commit *atomique s\'étendant sur une bonne quinzaine de
    fichiers*

:::: note
::: title
Note
:::

-   Vos modifications sont purement locales et ne sont pas appliquées
    sur le dépot distant .
-   Si vos modifications apportent une réelle valeur ajoutée à ce
    (correction de coquille, ajout d\'information ou autre), n\'hésitez
    pas à me la soumettre sous forme de patch ou *via* votre compte .
-   n\'est probablement pas hébergé sur un cluster de . Rien n\'empêche
    cependant d\'héberger un dépôt distant sur un connecté au réseau et
    d\'y accéder par connexion sécurisée .
::::
