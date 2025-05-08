---
title: Migrer de FrameMaker vers DITA XML
description: A guide in my new Starlight docs site.
---

Le but de cette procédure est de :

-   migrer son contenu vers sans se plonger dans les arcanes des *EDD*
    (petits projets uniquement !),
-   gérer la documentation technique au format sans utiliser
    `structuré`{.interpreted-text role="guilabel"}.

1.  Restructurez le contenu et les styles de vos fichiers de contenu
    selon les concepts .
2.  Créez un document vide et importez-y tous les styles existants dans
    les fichiers à migrer.
3.  Appliquez tous les styles disponibles à des paragraphes vides du
    document vide.
4.  Enregistrez le document vide sous le nom
    `styles.fm`{.interpreted-text role="file"}.
5.  Ouvrez `structuré 11`{.interpreted-text role="guilabel"} et créez un
    nouveau fichier de type *topic*.
6.  Choisissez `StructureTools`{.interpreted-text role="guilabel"} ‣
    `Exporter le catalogue d'éléments en tant
    qu'EDD`{.interpreted-text role="guilabel"} et sauvegardez la
    nouvelle EDD sous le nom `DITA-topic-edd.fm`{.interpreted-text
    role="file"}.
7.  Ouvrez le fichier `styles.fm`{.interpreted-text role="file"}, puis
    choisissez `Fichier`{.interpreted-text role="guilabel"} ‣
    `Importer les
    définitions d'éléments`{.interpreted-text role="guilabel"} et
    importez les définitions d\'éléments à partir de
    `DITA-topic-edd.fm`{.interpreted-text role="file"}.
8.  Répétez les trois étapes ci-dessus pour les autres types de topics
    (*task*, *reference*, etc.), en modifiant les noms de fichiers comme
    il se doit.
9.  Ouvrez le fichier `styles.fm`{.interpreted-text role="file"}, puis
    choisissez `StructureTools`{.interpreted-text role="guilabel"} ‣
    `Générer le tableau de conversion`{.interpreted-text
    role="guilabel"}.
10. Modifiez le fichier de conversion et faites correspondre chaque
    style à une balise .
11. Enregistrez le tableau de conversion sous le nom
    `DITA2FM-conversion-table.fm`{.interpreted-text role="file"}.
12. Ouvrez un fichier de contenu sous structuré 11 et choisissez
    `StructureTools`{.interpreted-text role="guilabel"} ‣
    `Utilitaires`{.interpreted-text role="guilabel"} ‣
    `Structurer le document en
    cours`{.interpreted-text role="guilabel"}.
13. Sélectionnez `DITA2FM-conversion-table.fm`{.interpreted-text
    role="file"} et cliquez sur `Ajouter
    structure`{.interpreted-text role="guilabel"}.
14. Enregistrez le fichier de contenu au format XML sans sélectionner
    d\'application.
15. Ouvrez le fichier XML généré sous un éditeur et corrigez la syntaxe
    . Certains aspects de cette étape sont scriptables, mais il faut
    également procéder à des opérations manuelles de restructuration du
    contenu. Il vous faudra notamment placer à la main les références
    croisées, de préférence dans une *reltable*.

Pour générer les éléments permettant de construire un fichier *ditamap*,
vous pouvez par exemple utiliser des scripts Perl du type :

:::: attention
::: title
Attention
:::

Ne lancez ce type de scripts que sur une copie de vos fichiers et non
sur les fichiers originaux.
::::

``` perl
#!/usr/bin/perl
open(INPUT,"<$ARGV[0]") or die;
@input_array=<INPUT‣;
close(INPUT);
$input_scalar=join("",@input_array);
$input_scalar =~ s#\<body‣(.|
)*?</body‣##ig;
open(OUTPUT,‣$ARGV[0]") or die;
print(OUTPUT $input_scalar);
close(OUTPUT);
```

Vous pouvez également modulariser facilement le contenu à l\'aide des
ciseaux XML [xml_split](), ou utiliser le module Perl [XML::Twig](), ou
encore ce *one-liner* Bash pour renommer les fichiers
`.dita`{.interpreted-text role="file"} d\'après leur titre :

``` console
$ ack "<title‣" *.dita| sed "s# #_#g;" |
tr '[:upper:]' '[:lower:]' |
sed -E "s#(.*.dita)#mv \1#g;" |
sed -E "s#\.dita.*<title‣(.*)</title‣#.dita \1.dita#g;"
```
