---
title: Gérer les projets de documentation multilingues DITA XML
---

DITA XML est un formidable format pour gérer les projets de
documentation. Pour les projets multilingues, cependant, le rédacteur
technique doit créer un fichier *ditamap*, qui contient la structure de
table des matières des documents, par version. Ceci entraîne un risque
d\'erreurs et d\'incohérences. Heureusement, une méthodologie appropriée
et un script d\'automatisation destiné à la chaîne de publication DITA
Open Toolkit remédient à ce problème.

## Méthodologie de gestion des projets de documentation multilingues DITA XML

1.  Le fichier *ditamap* ne doit pas comporter de section *navtitle*,
    qui contient un titre en toutes lettres, au lieu d\'extraire le
    titre de la section DITA XML correspondante, et est donc propre à
    chaque langue.

2.  Dès le début de votre projet DITA XML, placez les fichiers de
    contenu DITA XML dans un sous-répertoire spécifique à la langue dans
    laquelle il est initialement rédigé.

    Par exemple :

    -   product

        -   en_US
            -   images
            -   tasks
            -   topics

        et non :

    -   product

        -   images
        -   tasks
        -   topics

3.  Remplacez dans le fichier *ditamap* toutes les occurrences du nom du
    répertoire propre à la langue par une chaîne unique provisoire.

    Par exemple, utilisez la chaîne *\@language-code@* :

    ``` xml
    <topicref href="@language-code@/topics/managing-rights.dita"/>
    ```

    et non :

    ``` xml
    <topicref href="en_US/topics/managing-rights.dita"/>
    ```

4.  Pour générer les fichiers cibles, vous pouvez maintenant :

    a.  modifier dans le fichier `demo/fo/build.xml`{.interpreted-text
        role="file"} le paramètre `default.locale`{.interpreted-text
        role="samp"},
    b.  remplacer dans le fichier *ditamap* la variable de langue par le
        nom du répertoire de langue,
    c.  modifier le paramètre de langue `xml:lang`{.interpreted-text
        role="samp"} dans le fichier *ditamap* et dans les fichiers de
        contenu DITA XML,
    d.  pour les fichiers cibles PDF, modifier les dimensions de page
        (A4 ou US letter, par exemple) selon la langue,
    e.  générer les fichiers cibles,
    f.  rétablir les valeurs initiales dans les fichiers sources.

Heureusement, un script Bash (GNU/Linux) simple permet d\'automatiser
cela.

**Prérequis**

-   Vous avez installé DITA Open Toolkit.
-   Votre projet DITA XML ne comporte qu\'un fichier *ditamap*.
-   Vos fichiers de contenu DITA XML ont l\'extension
    `.dita`{.interpreted-text role="file"}.
-   Les noms des répertoires des versions linguistiques correspondent
    aux codes de langues supportés par Dita Open Toolkit
    (`fr_FR`{.interpreted-text role="file"} ou `en_US`{.interpreted-text
    role="file"}, par exemple).
-   Vos fichiers de contenu DITA XML se trouvent dans des
    sous-répertoires des répertoires des versions linguistiques (par
    exemple, dans `fr_FR/tasks/`{.interpreted-text role="file"} et
    `fr_FR/topics/`{.interpreted-text role="file"}).

Les valeurs supportées pour la dimension des pages PDF sont
`fr_FR`{.interpreted-text role="samp"} (A4) et `en_US`{.interpreted-text
role="samp"} (US letter). Ce script peut être bien entendu facilement
adapté, ou inspirer un nouveau script.

:::: attention
::: title
Attention


Ce script est fourni sans garantie. Avant toute exécution de ce script,
effectuez une sauvegarde de l\'ensemble de votre projet DITA XML,
fichiers de configuration inclus (par exemple sous un système de gestion
de versions). Assurez-vous de pouvoir restaurer facilement le projet
dans son intégralité en cas d\'erreur ou de comportement inattendu.
::::

Pour utiliser ce script :

1.  Téléchargez le \`script de génération multilingue\[DITA
    XML\](<https://github.com/olivier-carrere/redaction-technique.org/tree/DITA_XML>
    dans le répertoire contenant le fichier *ditamap* du projet.

2.  Dans un terminal, placez-vous dans ce répertoire, puis entrez :

    ``` console
    $ chmod +x dita2target.sh
    ```

3.  Dans le terminal, entrez :

    ``` console
    $ mkdir out
    ```

    pour créer le répertoire qui contiendra les fichiers cibles.

4.  Entrez :

    ``` console
    $ ./dita2target.sh <fichier ditamap>  \
    <nom du répertoire de langue> <format cible>
    ```

    pour générer les fichiers cibles.

    L\'argument *format cible* accepte les valeurs gérées par DITA Open
    Toolkit.

    **Exemple**

    ``` console
    ./dita2target.sh firewall.ditamap  en_US pdf2
    ```

    Le fichier PDF `firewall.pdf`{.interpreted-text role="file"} est
    alors généré dans le répertoire `out`{.interpreted-text role="file"}
    (spécifié *en dur* dans le script).
