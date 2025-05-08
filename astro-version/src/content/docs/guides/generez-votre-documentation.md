# Générez votre documentation {#generez-votre-documentation}

1.  Revenez dans le terminal, puis récupérez la dernière version
    *taguée* de ce  :

    ``` console
    $ git checkout $(git describe --tags $(git rev-list --tags --max-count=1))
    ```

    :::: note
    ::: title
    Note
    :::

    Oui, je sais, cette commande ne correspond pas exactement à la
    définition de *simple* donnée par le Larousse...
    ::::

2.  Générez la dernière version *taguée* de ce aux format PDF, HTML et
    EPUB :

    ``` console
    $ make all
    ```

3.  Affichez le au format PDF :

    ``` console
    $ xpdf _build/latex/redaction-techniqueorg.pdf &
    ```

4.  Affichez le au format HTML :

    ``` console
    $ epiphany _build/html/index.html &
    ```

5.  Affichez le au format EPUB :

    ``` console
    $  ebook-viewer _build/epub/redaction-techniqueorg.epub &
    ```

Et voilà. En quelques minutes, vous avez :

-   Appliqué des règles de texte conditionnel à des sources communes
    selon le format de publication. Ce contenu est par exemple appelé
    *livre électronique* dans la version EPUB, *document* dans la
    version PDF et encore autrement dans la version HTML.

-   Généré dans trois formats différents une documentation d\'une
    soixantaine de pages comprenant une quarantaine de schémas.

    :::: note
    ::: title
    Note
    :::

    -   Le fichier `Makefile`{.interpreted-text role="file"} est assez
        brut de décoffrage et le temps de compilation peut facilement
        être optimisé.
    -   Nous pourrions mettre en place une solution complète de texte
        conditionnel avec opérateurs booléens et tout et tout grâce au
        moteur de *templating* [Jinja]().
    -   Les observateurs remarqueront que la version HTML du version 1.5
        ne comporte pas de table des matières dans la colonne de droite.
        C\'est qu\'en effet, cette version n\'embarque pas le patch
        *1032292*. Je vous laisse chercher dans l\'historique ... voire
        créer une branche et le *cherry-picker* !
    ::::

Le est donc une plateforme de documentation tout à fait crédible... à
condition de se passer, ou presque, d\'interface graphique !

Le prochain test consistera à générer la version de ce .

Le prochain prochain test consistera à générer ce sur un *smartphone* en
installant une distribution [Linux sur Android]().
