---
title: "Didacticiels DITA XML et XSL-FO"
description: "DITA XML est un langage de rédaction structurée qui permet de créer des documents sans se soucier de leur aspect final sur différents supports. XSL-FO est un langage qui permet de réorganiser et filtrer le contenu XML et de lui appliquer une mise en page à l'aide d'une feuille de style."
---

Les didacticiels suivants aideront le **rédacteur technique** à mettre en place et à utiliser une chaîne de création et de publication **DITA XML** libre.


**DITA XML** est un langage de rédaction structurée qui permet de créer des documents sans se soucier de leur aspect final sur différents supports. XSL-FO est un langage qui permet de réorganiser et filtrer le contenu XML et de lui appliquer une mise en page à l'aide d'une feuille de style.

Un ensemble de fichiers **DITA XML** contient tout le contenu, relatif par exemple à un produit. Différentes feuilles de style XSL-FO permettront de publier ce contenu en PDF, en HTML ou sous un autre format en appliquant des transformations complexes. Le résumé de chaque section du document final pourra par exemple apparaître dans la version HTML et non dans la version PDF.

De même, si un produit doit être fourni en marque blanche à différents clients, une mise en page totalement différente peu être appliquée à sa documentation en spécifiant simplement un autre jeu de feuilles de style lors de la génération du livrable. Opération qui n'est pas envisageable en pratique avec des solutions traditionnelles de type **FrameMaker**.

## XSL-FO : filtrer du contenu selon des conditions « sauf » et « ou »

Imaginons que vous vouliez filtrer les nœuds enfants de la balise DITA XML `<example>` et afficher tout son contenu à l'exception du titre (situé entre les balises `<title>`).

Vous pouvez recourir alors à la syntaxe suivante :

``` xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

Cette commande sélectionne tous les nœuds enfants du nœud `<example>`, à l'exception du nœud `<title>`. Cependant, le nœud `<example>` accepte le texte entré directement, sans être encapsulé dans des balises. Cette commande ne fera alors pas apparaître ce contenu.

Supposons que le code source d'un de vos fichiers DITA XML soit le suivant :

``` xml
<example>
  <title>
    XSL-FO
  </title>
  Voici mon exemple de chemin XPATH :
  <codeblock>
    ancestor-or-self
  </codeblock>
  Texte non encapsulé situé après un nœud enfant.
</example>
```

Le fichier PDF affichera l'exemple structuré comme suit :

``` xslt
ancestor-or-self
```

Le titre de l'exemple n'est pas affiché, ce qui correspond au résultat souhaité, mais le contenu non encapsulé dans des balises n'apparaît pas, ce qui est un effet de bord indésirable. Pour sélectionner ce contenu, il faut sélectionner les nœuds textuels avec la syntaxe `text()`. Il est alors tentant d'utiliser la syntaxe suivante :

``` xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="text()" />
    <xsl:apply-templates select="*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

Cependant, tous les éléments texte non encapsulés dans des balises enfant de la balise `<example>` seront placés en tête de l'exemple, avant les éléments encapsulés, même s'ils sont placés après dans le fichier source DITA XML.

Le fichier PDF affichera l'exemple structuré comme suit :

> Voici mon exemple de chemin XPATH :Texte non encapsulé situé après un nœud enfant.
>
> ``` xslt
> ancestor-or-self
> ```

Il faut alors utiliser la syntaxe pipe (condition booléenne ou) pour modifier le chemin [XPATH]() comme suit :

``` xslt
<xsl:apply-templates select="text()|*[not(name()='title')]" />
```

Le résultat final sera :

``` xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="text()|*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

Le fichier PDF affichera l'exemple structuré comme suit :

> Voici mon exemple de chemin XPATH :
>
> ``` xslt
> ancestor-or-self
> ```
>
> Texte non encapsulé situé après un nœud enfant.


## XSL-FO : insérer automatiquement un titre pour les exemples

Par défaut, `DITA-OT (DITA Open Toolkit)`{.interpreted-text role="abbr"} n'insère pas automatiquement dans les fichiers PDF le texte *Exemple :* devant le titre d'un exemple contenu entre balises **DITA XML** `<example>`{.interpreted-text role="samp"}. La syntaxe [XSL-FO]() offre cependant cette possibilité.


Supposons que le code source d'un de vos fichiers **DITA XML** soit le suivant :

``` xml
<example>
  <title>
    XSL-FO
  </title>
  Voici mon exemple de chemin XPATH :
  <codeblock>
    ancestor-or-self
  </codeblock>
</example>
```

Vous souhaitez que le fichier PDF généré affiche l'exemple structuré comme suit :

> **Exemple : XSL-FO**
>
> Voici mon exemple de chemin XPATH :
>
> ``` xslt
> ancestor-or-self
> ```

et que si l'exemple ne contient pas de titre, il soit structuré comme suit :

> **Exemple :**
>
> Voici mon exemple de chemin XPATH :
>
> ``` xslt
> ancestor-or-self
> ```

Par défaut, cependant, ce contenu sera structuré comme suit dans le PDF par `DITA-OT (DITA Open Toolkit)`{.interpreted-text role="abbr"} :

> **XSL-FO**
>
> Voici mon exemple de chemin XPATH :
>
> ``` xslt
> ancestor-or-self
> ```

Il est toujours possible d'entrer le texte entre les balises `<example>`{.interpreted-text role="samp"}, mais XSL-FO offre une manière de procéder plus élégante et structurée.

### Insérer automatiquement une variable de texte avant le titre des exemples

1.  Remplacez dans la feuille de style `plugins/org.dita.pdf2/xsl/fo/commons.xsl` (sous `DITA-OT (DITA Open Toolkit)`{.interpreted-text role="abbr"} 1.7.) le template suivant :

    ``` xslt
    <xsl:template match="*[contains(@class,' topic/example')]/*
    [contains(@class,' topic/title ')]>
      <fo:block xsl:use-attribute-sets="example.title>
        <xsl:call-template name="commonattributes"/>
        <xsl:apply-templates/>
      </fo:block>
    </xsl:template>
    ```

    par le code suivant :

    ``` xslt
    <xsl:template match="*[contains(@class,' topic/example ')]>
      <fo:block xsl:use-attribute-sets="example.title>
        <xsl:call-template name="insertVariable>
        <xsl:with-param name="theVariableID"
        select="'my-example-text'"/>
        </xsl:call-template>
        <xsl:apply-templates select="title"/>
      </fo:block>
      <fo:block>
      <xsl:apply-templates
      select="*[not(contains(@class, ' topic/title'))]
        |text()|processing-instruction()"/>
      </fo:block>
    </xsl:template>
    ```

2.  Définissez dans les fichiers contenant les variables de langue, tels que `plugins/org.dita.pdf2/cfg/common/vars/fr.xml`, les variables de texte à insérer automatiquement, par exemple :

    ``` xslt
    <variable id="my-example-text>Exemple :</variable>
    ```

Pour obtenir un comportement homogène, vous devez désactiver ce traitement pour les exemples des types de *topics* spécifiques (*task*, notamment).

## Générer un PDF avec DITA Open Toolkit sous GNU/Linux

Ce didacticiel DITA XML est destiné à vous guider dans la mise en place et l'utilisation de la chaîne de publication `DITA-OT (DITA Open Toolkit)` dans un environnement GNU/Linux (Ubuntu ou Debian).

Prérequis

- Ubuntu ou Debian sur une machine physique ou virtuelle avec le mot de passe administrateur,
- connexion Internet.

1. Téléchargez et décompressez l'archive `DITA-OT (DITA Open Toolkit)` :

    ``` console
    $ export REPO="https://github.com/dita-ot/dita-ot"
    $ wget $REPO/releases/download/2.1/dita-ot-2.1.0.tar.gz
    $ tar -xzvf dita-ot-2.1.0.tar.gz
    ```

2. Générez votre premier PDF :

    ``` console
    $ cd dita-ot-2.1.0
    $ dita -f pdf -i samples/taskbook.ditamap
    ```

Félicitations, vous avez compilé votre premier projet DITA XML ! Le fichier PDF généré est `out/taskbook.pdf`. Vous pouvez maintenant compiler d'autres projets en ignorant les étapes 1 et 2.

## Générer un PDF avec DITA Open Toolkit (Windows)

Ce didacticiel **DITA XML** est destiné à vous guider dans la mise en place et l'utilisation de la chaîne de publication `DITA-OT (DITA Open Toolkit)`{.interpreted-text role="abbr"} dans un environnement Windows (testé sur Windows XP).

**Prérequis**

-   Connexion Internet

1.  Téléchargez [Java](), puis lancez le programme d'installation.

2.  Téléchargez [DITA Open Toolkit 1.5.4]() sur le bureau, puis décompressez `DITA-OT1.5.4_full_easy_install_bin.zip`.

3.  Sélectionnez `Exécuter`{.interpreted-text role="guilabel"} dans le menu `Démarrer`{.interpreted-text role="guilabel"}, collez la commande suivante, puis appuyez sur `Entrée`{.interpreted-text role="kbd"} :

    ``` console
    cmd
    ```

    Un terminal apparaît.

4.  Collez la commande suivante dans le terminal :

    ``` console
    set full=DITA-OT1.5.4_full_easy_install_bin
    cd Bureau\%full%\DITA-OT1.5.4
    ```

5.  Collez la commande suivante :

    ``` console
    startcmd.bat
    ```

    Un nouveau terminal apparaît.

6.  Collez la commande suivante dans le nouveau terminal :

    ``` console
    $ java -jar lib/dost.jar /i:samples/taskbook.ditamap \
    /outdir:. /transtype:pdf2
    ```

    Cette commande génère un fichier PDF à partir d'un projet **DITA XML** d'exemple.

    Félicitations, vous avez compilé votre premier projet **DITA XML** ! Vous trouverez le fichier cible `taskbook.pdf` dans le répertoire `Bureau\\%full%\\DITA-OT1.5.4`. Vous pouvez maintenant compiler d'autres projets en ignorant les étapes 1 et 2.

## Gérer les projets de documentation multilingues DITA XML

DITA XML est un formidable format pour gérer les projets de documentation. Pour les projets multilingues, cependant, le rédacteur technique doit créer un fichier ditamap, qui contient la structure de table des matières des documents, par version. Ceci entraîne un risque d'erreurs et d'incohérences. Heureusement, une méthodologie appropriée et un script d'automatisation destiné à la chaîne de publication `DITA-OT (DITA Open Toolkit)` remédient à ce problème.

### Méthodologie de gestion des projets de documentation multilingues DITA XML

1. Le fichier ditamap ne doit pas comporter de section navtitle, qui contient un titre en toutes lettres, au lieu d'extraire le titre de la section DITA XML correspondante, et est donc propre à chaque langue.

2. Dès le début de votre projet DITA XML, placez les fichiers de contenu DITA XML dans un sous-répertoire spécifique à la langue dans laquelle il est initialement rédigé.

   Par exemple :

   - product

     - en_US
       - images
       - tasks
       - topics

     et non :

   - product

     - images
     - tasks
     - topics

3. Remplacez dans le fichier ditamap toutes les occurrences du nom du répertoire propre à la langue par une chaîne unique provisoire.

   Par exemple, utilisez la chaîne `@language-code@` :

   ```xml
   <topicref href="@language-code@/topics/managing-rights.dita"/>
   ```

   et non :

   ```xml
   <topicref href="en_US/topics/managing-rights.dita"/>
   ```

4. Pour générer les fichiers cibles, vous pouvez maintenant :

   a. modifier dans le fichier `demo/fo/build.xml` le paramètre `default.locale`,  
   b. remplacer dans le fichier ditamap la variable de langue par le nom du répertoire de langue,  
   c. modifier le paramètre de langue `xml:lang` dans le fichier ditamap et dans les fichiers de contenu DITA XML,  
   d. pour les fichiers cibles PDF, modifier les dimensions de page (A4 ou US letter, par exemple) selon la langue,  
   e. générer les fichiers cibles,  
   f. rétablir les valeurs initiales dans les fichiers sources.

Heureusement, un script Bash (GNU/Linux) simple permet d'automatiser cela.

**Prérequis**

- Vous avez installé `DITA-OT (DITA Open Toolkit)`.
- Votre projet DITA XML ne comporte qu'un fichier ditamap.
- Vos fichiers de contenu DITA XML ont l'extension `.dita`.
- Les noms des répertoires des versions linguistiques correspondent aux codes de langues supportés par Dita Open Toolkit (`fr_FR` ou `en_US`, par exemple).
- Vos fichiers de contenu DITA XML se trouvent dans des sous-répertoires des répertoires des versions linguistiques (par exemple, dans `fr_FR/tasks/` et `fr_FR/topics/`).

Les valeurs supportées pour la dimension des pages PDF sont `fr_FR` (A4) et `en_US` (US letter). Ce script peut être bien entendu facilement adapté, ou inspirer un nouveau script.

:::caution[Attention]
Ce script est fourni sans garantie. Avant toute exécution de ce script, effectuez une sauvegarde de l'ensemble de votre projet DITA XML, fichiers de configuration inclus (par exemple sous un système de gestion de versions). Assurez-vous de pouvoir restaurer facilement le projet dans son intégralité en cas d'erreur ou de comportement inattendu.
:::

Pour utiliser ce script :

1. Téléchargez le [script de génération multilingue DITA XML]() dans le répertoire contenant le fichier ditamap du projet.

2. Dans un terminal, placez-vous dans ce répertoire, puis entrez :

   ```console
   $ chmod +x dita2target.sh
   ```

3. Dans le terminal, entrez :

   ```console
   $ mkdir out
   ```

   pour créer le répertoire qui contiendra les fichiers cibles.

4. Entrez :

   ```console
   $ ./dita2target.sh <fichier ditamap>  \
   <nom du répertoire de langue> <format cible>
   ```

   pour générer les fichiers cibles.

   L'argument format cible accepte les valeurs gérées par `DITA-OT (DITA Open Toolkit)`.

   **Exemple**

   ```console
   ./dita2target.sh firewall.ditamap  en_US pdf2
   ```

   Le fichier PDF `firewall.pdf` est alors généré dans le répertoire `out` (spécifié en dur dans le script).
   
   
## Créer des documents différents à partir des mêmes sources DITA XML (texte conditionnel)

**DITA XML** offre un mécanisme de texte conditionnel. Ce mécanisme favorise la réutilisation du contenu source et évite la redondance des informations. Ce didacticiel aidera le **rédacteur technique** à utiliser ce mécanisme en quelques minutes.

**Prérequis**

-   Vous avez installé `DITA-OT (DITA Open Toolkit)` dans le répertoire `DITA-OT1.5.4` sous GNU/Linux ou Windows.

1.  Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom de `texte-conditionnel.dita` dans le répertoire `DITA-OT1.5.4` :

    ``` xml
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE topic PUBLIC "-//OASIS//DTD DITA 1.2 Topic//EN"
    "/usr/share/dita-ot/dtd/technicalContent/dtd/topic.dtd">
    <topic id="exemple-topic" xml:lang="fr-fr">
      <title>Utilisation du texte conditionnel</title>
      <body>
        <hazardstatement>
          <messagepanel audience="electriciens">
            <typeofhazard>
              Danger pour les électriciens
            </typeofhazard>
            <consequence>
              Risque d'électrocution
            </consequence>
            <howtoavoid>
              Ne touchez pas les fils électriques.
            </howtoavoid>
          </messagepanel>
          <messagepanel audience="plombiers">
            <typeofhazard>
              Danger pour les plombiers
            </typeofhazard>
            <consequence>
              Risque de noyade
            </consequence>
            <howtoavoid>
              Ne plongez pas dans la piscine.
            </howtoavoid>
          </messagepanel>
        </hazardstatement>
        <p>
         Tout contenu placé entre balises ne comportant pas de
         valeur <i>audience</i> exclue dans un fichier
         <i>.ditaval</i> est publié dans les documents
         destinés aux plombiers et aux électriciens.
      </p>
      </body>
    </topic>
    ```

    Ce code contient des balises **DITA XML** contenant des valeurs *audience* différentes : nous allons exclure le contenu d'une de ces deux balises lors de la génération du fichier cible en utilisant la clé *audience*.

2.  Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom de `texte-conditionnel.ditamap` dans le répertoire `DITA-OT1.5.4` :

    ``` xml
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE bookmap PUBLIC "-//OASIS//DTD DITA BookMap//EN"
    "/usr/share/dita-ot/dtd/bookmap/dtd/bookmap.dtd">
    <bookmap id="texte-conditionnel">
      <booktitle>
        <mainbooktitle>
          Exemple de texte conditionnel
        </mainbooktitle>
      </booktitle>
      <chapter href="texte-conditionnel.dita"/>
    </bookmap>
    ```

3.  Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom de `electriciens.ditaval` dans le répertoire `DITA-OT1.5.4` :

    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <val>
      <prop att="audience" val="electriciens" action="include"/>
      <prop att="audience" val="plombiers" action="exclude"/>
    </val>
    ```

4.  Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom de `plombiers.ditaval` dans le répertoire `DITA-OT1.5.4` :

    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <val>
      <prop att="audience" val="electriciens" action="exclude"/>
      <prop att="audience" val="plombiers" action="include"/>
    </val>
    ```

5.  Ouvrez un terminal et entrez la commande suivante dans le répertoire `DITA-OT1.5.4` :

    ``` console
    $ java -jar lib/dost.jar /i:texte-conditionnel.ditamap \
    /filter:electriciens.ditaval /outdir:. /transtype:pdf2
    ```

    Ouvrez le fichier `texte-conditionnel.pdf` ; il contient des informations destinées :

    -   aux plombiers et aux électriciens,
    -   uniquement aux électriciens.

6.  Ouvrez un terminal et entrez la commande suivante dans le répertoire `DITA-OT1.5.4` :

    ``` console
    $ java -jar lib/dost.jar /i:texte-conditionnel.ditamap \
    /filter:plombiers.ditaval /outdir:. /transtype:pdf2
    ```

    Ouvrez le fichier `texte-conditionnel.pdf` ; il contient des informations destinées :

> -   aux plombiers et aux électriciens,
> -   uniquement aux plombiers.

## DITA Open Toolkit : afficher les références croisées dans les PDF

:::note

Les références croisées sont un élément important d'une **documentation technique** bien structurée. Elles permettent à l'utilisateur de naviguer facilement dans les briques d'information et sont un élément crucial de l'utilisabilité du document final. `DITA-OT (DITA Open Toolkit)` les gère très bien, à condition d'effectuer quelques réglages.
:::

Vous avez placé des balises *related-links* correctement formatées dans vos fichiers de contenu **DITA XML**, ou mieux, une [reltable]() dans votre structure de table des matières *ditamap* (la *reltable* permet de décontextualiser votre contenu et donc de mieux le réutiliser). Vous lancez votre commande de génération du PDF et, mauvaise surprise, aucune section *Voir aussi* n'apparaît dans le fichier cible ! Vous essayez alors de générer une version HTML de votre contenu et là, votre section *Voir aussi* est bien présente. `DITA-OT (DITA Open Toolkit)` ne supporterait-il pas les références croisées dans les PDF ?

Fort heureusement, non. Par défaut (allez savoir pourquoi), les références croisées ne sont pas générées dans les PDF par `DITA-OT (DITA Open Toolkit)`. Pour les afficher, attribuez la valeur *no* à la variable *disableRelatedLinks* du fichier `demo/fo/build_template.xml`. Si vous utilisez *ant*, il vous faudra également passer le paramètre *args.fo.include.rellinks=all* comme suit :

```console
$ ant -Dargs.input=samples/sequence.ditamap -Doutput.dir=out/ \
-Dtranstype=pdf2 -Dargs.fo.include.rellinks=all
```

## Afficher un index dans un PDF (mais pas sous DITA Open Toolkit)

Tout n'est pas parfait sous `DITA-OT (DITA Open Toolkit)`{.interpreted-text role="abbr"}, le moteur de publication libre **DITA XML**. Vous avez méticuleusement inséré vos entrées d'index dans vos fichiers de contenu **DITA XML**. Vous générez une sortie PDF et l'index n'apparaît pas. Un message d'erreur de la compilation vous indique que, hélas, FOP ne supporte actuellement pas la génération des index.

Face à cette situation, vous avez quatre solutions :

- attendre que FOP supporte les index ; sans date de disponibilité, ce choix sera difficile à faire accepter par votre direction ;
- abandonner **DITA XML** ; avouez que ce serait dommage de renoncer aux formidables gains de productivité que permet ce format ;
- renoncer à afficher l'index dans le PDF ; les arguments en faveur d'un tel choix ont un certain poids : les index sont difficiles à maintenir et offre un surplus d'utilisabilité discutable dans un document qui ne sera consulté que marginalement sous forme imprimée ;
- abandonner `DITA-OT (DITA Open Toolkit)`{.interpreted-text role="abbr"} et se tourner vers une solution propriétaire ; les logiciels non open-source, XMetal, par exemple, on souvent recours au moteur de publication XEP de RenderX qui lui, supporte parfaitement les index.

Le problème de l'index n'est donc pas un obstacle à l'adoption de **DITA XML**. Si votre support final est un document imprimé, les solutions existent. S'il s'agit d'un format électronique, l'absence d'un index est largement compensée par la fonction de recherche en plein texte.

## Utiliser l’IDE nXML pour DITA XML

<a id="utiliser-ide-nxml-pour-dita-xml"></a>

Le mode nXML propose de valider en temps réel les documents XML **DocBook**, XHTML ou autres. Plus la peine de connaître le schéma XML par cœur: votre éditeur de texte vous propose l’autocomplétion des balises XML selon le contexte. Il ne supporte cependant pas **DITA XML** par défaut. Ce didacticiel vous permettra d’utiliser ce mode Emacs pour **DITA XML**.

Prérequis

- Emacs
- La structure de répertoires de votre projet de documentation **DITA XML** doit être la suivante :
  - répertoire de langue
    - concepts
    - faq
    - reference
    - tasks
    - topics

  où <répertoire de langue> a la valeur en_US, ou fr_FR, etc.
- Les instructions de ligne de commande sont conçues pour GNU/Linux ; elles doivent être adaptées pour être utilisées dans un autre environnement.

1. Effectuez une sauvegarde de l’ensemble de votre projet de documentation **DITA XML**.

2. Ouvrez un terminal et collez la suite de commandes suivante :

    ```console
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

    :::note[Note]
    Si un message vous avertit que le fichier `.emacs` n’existe pas, collez les commandes suivantes, puis recommencez l’opération :

    ```console
    $ cd && touch .emacs
    ```
    :::

    Cette suite de commandes :
    - télécharge et décompresse le mode nXML,
    - crée une copie de sauvegarde du fichier `.emacs` (`.emacs.bak`),
    - écrit les variables d’environnement du mode nXML dans le fichier `.emacs`.

3. Téléchargez [l’archive des schémas RelaxNG pour DITA XML]() dans le répertoire racine de votre projet de documentation **DITA XML**.

4. Placez-vous dans le répertoire racine de votre projet de documentation **DITA XML**, puis collez la commande suivante :

    ```console
    $ tar xzvf rnc.tar.gz
    ```

    Cette commande crée un répertoire `rnc` de même niveau que le <répertoire de langue>.

5. Téléchargez [l’archive des fichiers schemas.xml]() dans le répertoire racine de votre projet de documentation **DITA XML**, puis collez la suite de commandes ci-dessous en remplaçant <répertoire de langue> par la valeur appropriée, en_US, ou fr_FR, par exemple. Répétez cette étape pour tous vos répertoires de langue.

    ```console
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

    Vos répertoires de langue doivent maintenant comporter les fichiers `schemas.xml` appropriés :
    - fr_FR
      - concepts
        - schemas.xml
      - faq
        - schemas.xml
      - reference
        - schemas.xml
      - tasks
        - schemas.xml
      - topics
        - schemas.xml

6. Ouvrez un fichier de contenu **DITA XML** (`.dita`) avec Emacs. La syntaxe **DITA XML** apparaît en couleurs. Les endroits où le schéma n’est pas respecté sont soulignés en rouge.

7. Pour insérer une nouvelle balise entrez <, puis appuyez sur Ctrl+Entrée. La liste des balises possibles apparaît.

8. Sélectionnez une balise, puis appuyez sur Entrée. Appuyez sur Ctrl+Entrée pour afficher la liste des attributs autorisés.

9. Pour insérer une balise fermante après du texte, entrez </, puis appuyez sur Ctrl+Entrée.

## Accélérer sa saisie avec le mode Predictive pour Emacs

Ce didacticiel mode Predictive pour Emacs est destiné à vous guider dans la mise en place et l'utilisation du mode Emacs d'aide à la rédaction et d'autocomplétion des mots anglais et français Predictive dans un environnement GNU/Linux (en l'occurrence, Debian).

1.  Installez make et texinfo :

    ``` console
    $ sudo aptitude install make texinfo
    ```

2.  Téléchargez [Predictive]().

3.  Décompressez l'archive Predictive :

    ``` console
    $ tar xzvf predictive-0.23.13.tar.gz
    ```

4.  Placez-vous dans le répertoire `predictive` :

    ``` console
    $ cd predictive
    ```

5.  Compilez predictive :

    ``` console
    $ make
    ```

6.  Installez predictive :

    ``` console
    $ sudo make install
    ```

7.  Insérez le code suivant dans le fichier `.emacs` :

    ``` 
    ;; predictive install location
         (add-to-list 'load-path "~/.emacs.d/predictive/")
         ;; dictionary locations
         (add-to-list 'load-path "~/.emacs.d/predictive/latex/")
         (add-to-list 'load-path "~/.emacs.d/predictive/texinfo/")
         (add-to-list 'load-path "~/.emacs.d/predictive/html/")
         ;; load predictive package
         (require 'predictive)
    ```

8.  Lancez Emacs, puis appuyez sur Alt+X et entrez :

    ``` 
    predictive-mode
    ```
