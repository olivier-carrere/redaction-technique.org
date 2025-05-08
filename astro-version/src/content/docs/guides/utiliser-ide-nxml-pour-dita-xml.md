# Utiliser l\'IDE nXML pour DITA XML {#utiliser-ide-nxml-pour-dita-xml}

Le mode nXML propose de valider en temps réel les documents XML , XHTML
ou autres. Plus la peine de connaître le schéma XML par cœur: votre
éditeur de texte vous propose l\'autocomplétion des balises XML selon le
contexte. Il ne supporte cependant pas par défaut. Ce didacticiel vous
permettra d\'utiliser ce mode Emacs pour .

**Prérequis**

-   Emacs

-   La structure de répertoires de votre projet de documentation doit
    être la suivante :

    -   répertoire de langue
        -   concepts
        -   faq
        -   reference
        -   tasks
        -   topics

    où *\<répertoire de langue\>* a la valeur *en_US*, ou *fr_FR*, etc.

-   Les instructions de ligne de commande sont conçues pour GNU/Linux ;
    elles doivent être adaptées pour être utilisées dans un autre
    environnement.

1.  Effectuez une sauvegarde de l\'ensemble de votre projet de
    documentation .

2.  Ouvrez un terminal et collez la suite de commandes suivante :

    ``` console
    $ export THAI="http://www.thaiopensource.com/download"
    $ export RED="http://www.redaction-technique.org/media"
    $ cd && \
    wget $THAI/nxml-mode-20041004.tar.gz && \
    tar xzvf nxml-mode-20041004.tar.gz && \
    wget $RED/nxml-mode-environmment.txt && \
    cp .emacs .emacs.bak && \
    cat .emacs | sed '$a\' > .emacs.tmp && \
    mv .emacs.tmp .emacs && \
    cat nxml-mode-environmment.txt >> .emacs && \
    rm  nxml-mode-environmment.txt
    ```

    :::: note
    ::: title
    Note
    :::

    Si un message vous avertit que le fichier `.emacs`{.interpreted-text
    role="file"} n\'existe pas, collez les commandes suivantes, puis
    recommencez l\'opération :

    ``` console
    $ cd && touch .emacs
    ```
    ::::

    Cette suite de commandes :

    -   télécharge et décompresse le mode nXML,
    -   crée une copie de sauvegarde du fichier
        `.emacs`{.interpreted-text role="file"}
        (`.emacs.bak`{.interpreted-text role="file"}),
    -   écrit les variables d\'environnement du mode nXML dans le
        fichier `.emacs`{.interpreted-text role="file"}.

3.  Téléchargez [l\'archive des schémas RelaxNG pour DITA XML]() dans le
    répertoire racine de votre projet de documentation .

4.  Placez-vous dans le répertoire racine de votre projet de
    documentation , puis collez la commande suivante :

    ``` console
    $ tar xzvf rnc.tar.gz
    ```

    Cette commande crée un répertoire `rnc`{.interpreted-text
    role="file"} de même niveau que le *\<répertoire de langue\>*.

5.  Téléchargez [l\'archive des fichiers schemas.xml]() dans le
    répertoire racine de votre projet de documentation , puis collez la
    suite de commandes ci-dessous en remplaçant *\<répertoire de
    langue\>* par la valeur appropriée, *en_US*, ou *fr_FR*, par
    exemple. Répétez cette étape pour tous vos répertoires de langue.

    ``` console
    $ export DIR="schemas.redaction-technique.org"
    $ tar xzvf $DIR.tar.gz && \
    cd <répertoire de langue> && \
    cp ../$DIR/concepts/schemas.xml concepts/ && \
    cp ../$DIR/faq/schemas.xml faq/ && \
    cp ../$DIR/reference/schemas.xml reference/ && \
    cp ../$DIR/tasks/schemas.xml tasks/ && \
    cp ../$DIR/tasks/schemas.xml tasks/ && \
    cp ../$DIR/topics/schemas.xml topics/ && \
    rm -rf ../$DIR/
    ```

    Vos répertoires de langue doivent maintenant comporter les fichiers
    `schemas.xml`{.interpreted-text role="file"} appropriés :

    -   fr_FR

        -   concepts
            -   schemas.xml
        -   concepts

        > -   schemas.xml

        -   faq

        > -   schemas.xml

        -   reference

        > -   schemas.xml

        -   tasks

        > -   schemas.xml

        -   topics

        > -   schemas.xml

6.  Ouvrez un fichier de contenu (`.dita`{.interpreted-text
    role="file"}) avec Emacs. La syntaxe apparaît en couleurs. Les
    endroits où le schéma n\'est pas respecté sont soulignés en rouge.

7.  Pour insérer une nouvelle balise entrez \<, puis appuyez sur
    Ctrl+Entrée. La liste des balises possibles apparaît.

8.  Sélectionnez une balise, puis appuyez sur Entrée. Appuyez sur
    Ctrl+Entrée pour afficher la liste des attributs autorisés.

9.  Pour insérer une balise fermante après du texte, entrez \</, puis
    appuyez sur Ctrl+Entrée.
