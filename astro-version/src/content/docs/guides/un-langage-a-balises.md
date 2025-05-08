---
title: Un langage à balises {#un-langage-a-balises}
description: A guide in my new Starlight docs site.
---
# Un langage à balises {#un-langage-a-balises}

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

est un langage à balises : le structure l\'information dans des fichiers
sources sans mise en page, similaires aux fichiers sources de code
informatique. L\'utilisateur reçoit un document cible, par exemple un
fichier PDF, où les balises sont remplacées par une mise en forme
typographique.
:::

Si votre entreprise fournit à ses clients une documentation technique au
format , le et l\'utilisateur disposent des mêmes supports
d\'information (il n\'y a pas de différenciation entre le fichier source
et le fichier cible). Ce qui semble a priori la solution la plus simple
s\'avère cependant peu efficace en termes de productivité de l\'équipe
de et de structuration de l\'information.

Avec un format texte tel que , le et le lecteur disposent de supports
largement différents :

Rédacteur technique

:   Le manipule des fichiers sources ; il utilise les balises pour
    construire le document en marquant les éléments d\'information
    qu\'il crée ou réutilise. Les balises sont imbriquées comme des
    poupées russes organisées selon une syntaxe rigoureuse. Le fichier
    source n\'est pas au format WYSIWYG : la mise en page sera appliquée
    lors de la transformation des fichiers sources en fichiers cibles
    (autrement dit, lors de la génération des livrables). Tout au plus,
    certains logiciels graphiques tels XMetal, Oxygen ou structuré
    proposent-ils le format WYSIWYM (what you see is what you mean), où
    les balises sont remplacées à l\'écran par une mise en forme
    générique, différente de l\'aspect final du document. Je trouve
    cependant que l\'un des intérêts d\'avoir recours à un langage à
    balises est de voir exactement ce que l\'on fait en manipulant
    soi-même les balises sans en déléguer l\'interprétation à un
    logiciel graphique.

Utilisateur

:   Seul le contenu est présenté au lecteur dans le fichier cible ; le
    texte marqué par des balises dans les fichiers sources a une mise en
    valeur typographique dont le sens est explicité dans la section
    *Conventions typographiques* du document final.

Un fichier source mélange du texte et des balises, délimitées par les
signes \< et \>. Le texte proprement dit est encapsulé dans un jeu de
balises ouvrantes de type \<balise\> et de balises fermantes de type
\</balise\> selon le schéma \<balise\>texte\</balise\>. Tout texte entré
hors d\'une balise ouvrante et fermante est incorrect et produit un
fichier non valide.
