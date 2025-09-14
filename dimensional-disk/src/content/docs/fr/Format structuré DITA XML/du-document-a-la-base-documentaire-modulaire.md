---
title: "Du document à la base documentaire modulaire"
description: "Le format de rédaction structurée DITA XML propose de passer du modèle du livre à celui de la base documentaire modulaire."
---

<a id="du-document-a-la-base-documentaire-modulaire"></a>

:::note

Le modèle du livre est encore prédominant pour créer et gérer l'information. Mais le contenu d'entreprise est souvent disséminé dans de nombreux documents, sous des formats hétérogènes. Ceci se traduit par des doublons, des incohérences, un coût de mise à jour et de traduction élevé, et des retards de livraison. Le rédacteur technique dispose cependant d'autres modèles, plus efficaces.
:::

Le format de rédaction structurée DITA XML propose de passer du modèle du livre à celui du de la base documentaire modulaire. Le contenu d'entreprise repose sur des briques uniques, qui peuvent être assemblées dynamiquement, à la demande, pour produire des documents sous différents formats cibles.

![Une documentation modulaire offre une souplesse inégalée.](/assets/documentation-modulaire.svg)
**Une documentation modulaire offre une souplesse inégalée.**

Le volume de contenu source est minimisé, ce qui diminue les coûts de création, mise à jour et traduction du contenu d'entreprise. De plus, le rédacteur technique peut gérer les processus de rédaction, validation et traduction module par module. Les workflows peuvent ainsi être parallélisés, ce qui réduit les délais de mise sur le marché.

Les fichiers DITA XML peuvent en outre être aisément centralisés sous un référentiel unique, tel qu'un ECM (système de gestion de contenu) ou un VCS (logiciel de gestion de versions). Le capital immatériel de la société est ainsi préservé.

## Un langage à balises

:::note

DITA XML est un langage à balises : le rédacteur technique structure l'information dans des fichiers sources sans mise en page, similaires aux fichiers sources de code informatique. L'utilisateur reçoit un document cible, par exemple un fichier PDF, où les balises sont remplacées par une mise en forme typographique.
:::

Si votre entreprise fournit à ses clients une documentation technique au format MS Word, le rédacteur technique et l'utilisateur disposent des mêmes supports d'information (il n'y a pas de différenciation entre le fichier source et le fichier cible). Ce qui semble a priori la solution la plus simple s'avère cependant peu efficace en termes de productivité de l'équipe de rédaction technique et de structuration de l'information.

Avec un format texte tel que DITA XML, le rédacteur technique et le lecteur disposent de supports largement différents :

Rédacteur technique

:   Le rédacteur technique manipule des fichiers sources ; il utilise les balises pour construire le document en marquant les éléments d'information qu'il crée ou réutilise. Les balises sont imbriquées comme des poupées russes organisées selon une syntaxe rigoureuse. Le fichier source n'est pas au format WYSIWYG : la mise en page sera appliquée lors de la transformation des fichiers sources en fichiers cibles (autrement dit, lors de la génération des livrables). Tout au plus, certains logiciels graphiques tels XMetal, Oxygen ou FrameMaker structuré proposent-ils le format WYSIWYM (what you see is what you mean), où les balises sont remplacées à l'écran par une mise en forme générique, différente de l'aspect final du document. Je trouve cependant que l'un des intérêts d'avoir recours à un langage à balises est de voir exactement ce que l'on fait en manipulant soi-même les balises sans en déléguer l'interprétation à un logiciel graphique.

Utilisateur

:   Seul le contenu est présenté au lecteur dans le fichier cible ; le texte marqué par des balises dans les fichiers sources a une mise en valeur typographique dont le sens est explicité dans la section Conventions typographiques du document final.

Un fichier source DITA XML mélange du texte et des balises, délimitées par les signes < et >. Le texte proprement dit est encapsulé dans un jeu de balises ouvrantes de type <balise> et de balises fermantes de type </balise> selon le schéma <balise>texte</balise>. Tout texte entré hors d'une balise ouvrante et fermante est incorrect et produit un fichier non valide.
## Typologie de haut niveau de l'information

**DITA XML** propose au **rédacteur technique** une typologie de haut niveau qui est une véritable aide à la structuration du contenu.

S'il crée un nouveau document au format **FrameMaker**, **DocBook** ou traitement de texte, le **rédacteur technique** se trouve face à une page blanche. Selon sa rigueur professionnelle, l'information transmise à l'utilisateur oscillera entre les deux pôles suivants :

Organisation rationnelle

:   L'utilisateur dispose d'un accès séquentiel rapide et aisé à l'information dont il a besoin.

Magma informatif

:   L'utilisateur doit lire intégralement toute une section, voire le document en sa totalité pour espérer trouver des renseignements utiles.

Lorsqu'il crée un document **DITA XML**, en revanche, le **rédacteur technique** doit d'emblée choisir le modèle[^1] qui correspond au type d'information qu'il veut présenter. De base, **DITA XML** propose les types d'information suivants[^2] :

concept

:   Texte généraliste du type introduction ou présentation.

task

:   Procédure pas à pas destinée à réaliser une tâche.

reference

:   Information de référence du type explication de paramètres de commandes.

Chacune de ces catégories de haut niveau propose un jeu de balises de plus bas niveau qui lui est propre. Si le **rédacteur technique** rédige un document technique, il y a toutes les chances pour que l'information qu'il a collectée et qu'il doit organiser fasse partie de l'une de ces trois catégories[^3]. Cette division en types d'information oblige donc d'entrée de jeu le **rédacteur technique** à structurer l'information. L'utilisateur y gagne en facilité et rapidité d'accès à l'information et en utilisabilité globale de la documentation technique.

::: only
html

**Notes**
:::

[^1]: Dans la pratique, un schéma XSD.

[^2]: **DITA XML** propose trois types d'information de base, tandis que la méthode Information Mapping en propose sept.

[^3]: S'il s'avère qu'il a réellement besoin d'une autre catégorie, il peut la créer via une spécialisation.

## Organisation à la demande du contenu

Les briques d'information peuvent être assemblées à la demande dans des structures de table des matières externes, les *ditamap*.
:::

L'organisation de l'information sous **DITA XML** n'est pas figée. Les briques peuvent être organisées dans différentes structures hiérarchiques, selon l'évolution des besoins. Si le **rédacteur technique** a pris soin de construire des briques d'information atomiques et génériques, il peut, à l'instar d'un constructeur automobile proposant sans cesse de nouveaux modèles par assemblage d'éléments standardisés, proposer par exemple les documents suivants :

Guide de l'utilisateur

:   Thèmes systématiquement organisés en concept et procédures pas à pas.

Document de présentation

:   Concepts.

Quikstart

:   Procédures pas à pas.

Manuel de référence

:   Informations de référence.

Pour ce faire, le **rédacteur technique** prendra soin de placer les éléments liés à un contexte particulier dans les structures *ditamap* et non dans les fichiers de contenu **DITA XML**. En particulier, les références croisées doivent être indiquées dans une *reltable* placée dans la *ditamap* : si le document *A* doit renvoyer au document *B* dans la *ditamap* *1*, il doit pouvoir être également utilisé sans modification dans la *ditamap* *2*, où le document *B* n'est pas inclus.

L'organisation des répertoires de travail doit également permettre l'utilisation de liens relatifs, notamment vers les images, qui ne seront jamais cassés.

