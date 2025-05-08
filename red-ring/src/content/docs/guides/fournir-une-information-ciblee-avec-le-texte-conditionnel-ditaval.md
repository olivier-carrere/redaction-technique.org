---
title: Fournir une information ciblée avec le texte conditionnel ditaval
description: A guide in my new Starlight docs site.
---

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Un fichier [ditaval]() reprend le principe des lunettes que vous
chaussez pour visualiser un film en 3D : le verre gauche masque une
moitié de l\'image, le verre droit en masque l\'autre moitié. Mais seul
le dispose de lunettes 3D et a une vision complète de l\'information
contenue dans le projet .
:::

Les destinataires de l\'information disposent de lunettes avec deux
verres gauches ou deux verres droits. Ils ne voient donc qu\'une partie
de l\'information. Loin d\'être lésés par cet état de fait, ils ont
ainsi un meilleur accès à l\'information. Le profilage réalisé masque à
chaque public les informations dont ils n\'ont *pas* besoin et qui ne
seraient pour eux que du bruit. Chaque audience bénéficie donc d\'un
meilleur accès à l\'information qui la concerne, selon le fameux concept
minimaliste de *less is more*.

<figure>
<img src="graphics/ditaval.svg" alt="graphics/ditaval.svg" />
<figcaption><em>Texte conditionnel avec DITA XML</em></figcaption>
</figure>

Concrètement, le mécanisme *ditaval* est basé sur des opérateurs
binaires : vous marquez un bloc d\'information avec un attribut et une
valeur, puis incluez ou excluez ce bloc dans le livrable en passant un
opérande lors de la compilation (le bloc est inclus par défaut si aucun
opérande n\'est spécifié). C\'est le principe du texte conditionnel.

Gâce à ce mécanisme, il n\'est pas nécessaire de créer deux fichiers
différents lorsque leur contenu ne comporte que des variations mineures.
C\'est un outil de plus destiné à réduire la redondance du contenu
source.

Vous pouvez appliquer des clés de filtrage en série (condition *et*) en
indiquant plusieurs valeurs séparées par des espaces dans les attributs
*product*, *audience* ou autre.

**Exemple**

Pour indiquer qu\'une remarque est destinée à la fois à des électriciens
et à des utilisateurs avancés en voulant profiler l\'information selon
les publics suivants :

-   non électriciens,
-   électriciens débutants,
-   électriciens experts.

Vous pouvez utiliser la structure suivante :

``` xml
<step audience="electricians advanced">
  <cmd> Ramenez l'intensité sous la dose létale de 150mA. </cmd>
</step>
```

:::: attention
::: title
Attention
:::

Une clé de filtrage mal positionnée peut entraîner une erreur de
compilation. En effet, si le code non filtré est conforme au schéma XSD
, le code filtré peut ne pas l\'être.

**Exemple**

Le code suivant est correct avant filtrage :

``` xml
<thead>
  <row product="a>
    <entry>Commande</entry>
    <entry>Description</entry>
  </row>
</thead>
```

Après filtrage, en revanche, on obtient le code suivant :

``` xml
<thead>
</thead>
```

Or, selon le schéma XSD, les en-têtes de tableaux doivent contenir au
moins une ligne :

``` xml
<!ENTITY % thead.content "((%row;)+)>
```

Ce code est donc incorrect et entraîne l\'échec de la compilation.
::::
