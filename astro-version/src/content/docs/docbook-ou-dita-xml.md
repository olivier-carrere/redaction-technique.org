# DocBook ou DITA XML ?

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Certaines entreprises ont parfois un contenu existant au format
[DocBook](). Géré souvent par les acteurs les plus techniques de la
société, il coexiste la plupart du temps avec d\'autres contenus au
format ou traitement de texte. S\'il est décidé de fédérer tout le
contenu d\'entreprise sous un seul format, il semble naturel de
capitaliser les efforts fournis sur la chaîne de création et de
publication et de sélectionner ce format. C\'est pourtant se priver des
gains de productivité spectaculaires offerts par .
:::

Il est facile de générer du à partir de . propose par défaut ce format
cible, au même titre que le PDF ou le HTML. L\'opération inverse ne peut
pas être totalement automatisée. Pourquoi ?

<figure>
<img src="graphics/entropie.svg" alt="graphics/entropie.svg" />
<figcaption><em>Un processus non réversible</em></figcaption>
</figure>

Il n\'est pas possible de migrer automatiquement des données de formats
pauvres vers des format riches en information.

Tout simplement parce que le contenu au format contient plus
d\'informations. Passer d\'un format plus riche à un format plus pauvre
en information est une opération entropique qui peut facilement être
automatisée. Par exemple, générer un PDF à partir de . Effectuer
l\'opération inverse exige d\'injecter de l\'intelligence, opération que
seul l\'être humain peut aujourd\'hui effectuer.

Si votre contenu était une photo, nous pourrions faire l\'analogie
suivante :

  -----------------------------------------------------------------------
  Format de contenu Format de photo
  ----------------- -----------------------------------------------------
                    [RAW]() [^1]

                    [TIFF]()

  PDF               [JPEG]()
  -----------------------------------------------------------------------

Le passage de RAW en TIFF et de TIFF en JPEG est destructif et ne peut
se faire en sens inverse[^2].

<figure>
<img src="graphics/entropie-dita-docbook.svg"
alt="graphics/entropie-dita-docbook.svg" />
<figcaption><em>Un processus non réversible</em></figcaption>
</figure>

Le PDF est sémantiquement plus pauvre que , lui-même plus pauvre que
[^3].

Si votre entreprise tient absolument à utiliser du , il est toujours
loisible de générer le contenu à partir d\'un contenu source au format .
À condition que le contenu source reste au format (c\'est à dire, à
condition qu\'aucune modification apportée au contenu ne soit
sauvegardée) et que le format ne soit qu\'une étape de la génération des
livrables, au même titre que le format FO, vous bénéficiez ainsi des
fonctionnalités avancées de réutilisation du contenu que propose .

L\'effort de migration d\'un format non structuré est certes un peu plus
important vers que vers , puisque vous devez injecter plus
d\'informations sémantiques. Vous devez également migrer le contenu vers
, ce qui représente également un effort, quoique plus faible. Mais votre
contenu est immédiatement de meilleure qualité, car plus structuré. Et
vous pourrez rapidement cueillir tous les fruits de votre labeur,
notamment si une traduction de votre contenu dans une nouvelle langue
est envisagée.

De manière générale, un professionnel a toujours intérêt à travailler
sur le format le plus riche, ne serait-ce que pour être pro-actif et
anticiper sur les nouveaux besoins.

::: only
html

**Notes**
:::

[^1]: Ce n\'est bien sûr qu\'une analogie, étant un standard, à la
    différence du format RAW.

[^2]: Pour être aussi exact que possible, vous pouvez enregistrer une
    image JPEG au format TIFF ; mais cette image aura une qualité égale
    à celle de l\'image JPEG, inférieure à la qualité habituelle des
    images TIFF. En revanche, on ne peut à ma connaissance pas
    enregistrer une image TIFF sous un format RAW.

[^3]: Le PDF est cependant plus riche en informations de mise en page,
    appliquées automatiquement à partir d\'une feuille de style.
