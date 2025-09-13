---
title: "Gérer les projets de documentation multilingues DITA XML"
description: "Méthodologie et script pour gérer des projets DITA XML multilingues et automatiser la génération par langue."
sidebar:
  label: How-to
  order: 1
prev: false
next: false
---

est un formidable format pour gérer les projets de documentation. Pour les projets multilingues, cependant, le doit créer un fichier ditamap, qui contient la structure de table des matières des documents, par version. Ceci entraîne un risque d'erreurs et d'incohérences. Heureusement, une méthodologie appropriée et un script d'automatisation destiné à la chaîne de publication remédient à ce problème.

## Méthodologie de gestion des projets de documentation multilingues DITA XML

1.  Le fichier ditamap ne doit pas comporter de section navtitle, qui contient un titre en toutes lettres, au lieu d'extraire le titre de la section correspondante, et est donc propre à chaque langue.

2.  Dès le début de votre projet , placez les fichiers de contenu dans un sous-répertoire spécifique à la langue dans laquelle il est initialement rédigé.

    Par exemple :

    -   product

        -   en_US
            -   images
            -   tasks
            -   topics

        et non :

    -   product

        -   images
        -   tasks
        -   topics

3.  Remplacez dans le fichier ditamap toutes les occurrences du nom du répertoire propre à la langue par une chaîne unique provisoire.

    Par exemple, utilisez la chaîne @language-code@ :

    ```xml
    <topicref href="@language-code@/topics/managing-rights.dita"/>
    ```

    et non :

    ```xml
    <topicref href="en_US/topics/managing-rights.dita"/>
    ```

4.  Pour générer les fichiers cibles, vous pouvez maintenant :

    a.  modifier dans le fichier `demo/fo/build.xml` le paramètre `default.locale`,
    b.  remplacer dans le fichier ditamap la variable de langue par le nom du répertoire de langue,
    c.  modifier le paramètre de langue `xml:lang` dans le fichier ditamap et dans les fichiers de contenu ,
    d.  pour les fichiers cibles PDF, modifier les dimensions de page (A4 ou US letter, par exemple) selon la langue,
    e.  générer les fichiers cibles,
    f.  rétablir les valeurs initiales dans les fichiers sources.

Heureusement, un script Bash (GNU/Linux) simple permet d'automatiser cela.

**Prérequis**

-   Vous avez installé .
-   Votre projet ne comporte qu'un fichier ditamap.
-   Vos fichiers de contenu ont l'extension `.dita`.
-   Les noms des répertoires des versions linguistiques correspondent aux codes de langues supportés par Dita Open Toolkit (`fr_FR` ou `en_US`, par exemple).
-   Vos fichiers de contenu se trouvent dans des sous-répertoires des répertoires des versions linguistiques (par exemple, dans `fr_FR/tasks/` et `fr_FR/topics/`).

Les valeurs supportées pour la dimension des pages PDF sont `fr_FR` (A4) et `en_US` (US letter). Ce script peut être bien entendu facilement adapté, ou inspirer un nouveau script.

:::caution[Attention]
Ce script est fourni sans garantie. Avant toute exécution de ce script, effectuez une sauvegarde de l'ensemble de votre projet , fichiers de configuration inclus (par exemple sous un système de gestion de versions). Assurez-vous de pouvoir restaurer facilement le projet dans son intégralité en cas d'erreur ou de comportement inattendu.
:::

Pour utiliser ce script :

1.  Téléchargez le [script de génération multilingue DITA XML]() dans le répertoire contenant le fichier ditamap du projet.

2.  Dans un terminal, placez-vous dans ce répertoire, puis entrez :

    ```console
    $ chmod +x dita2target.sh
    ```

3.  Dans le terminal, entrez :

    ```console
    $ mkdir out
    ```

    pour créer le répertoire qui contiendra les fichiers cibles.

4.  Entrez :

    ```console
    $ ./dita2target.sh <fichier ditamap>  \
    <nom du répertoire de langue> <format cible>
    ```

    pour générer les fichiers cibles.

    L'argument format cible accepte les valeurs gérées par .

    **Exemple**

    ```console
    ./dita2target.sh firewall.ditamap  en_US pdf2
    ```

    Le fichier PDF `firewall.pdf` est alors généré dans le répertoire `out` (spécifié en dur dans le script).