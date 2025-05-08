title: Partager des blocs d\'information atomiques avec les *conref*

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Lorsque le rédacteur technique veut réutiliser des blocs d\'information
DITA XML plus petits qu\'une section, il doit les partager au niveau des
fichiers de contenu *dita* et non dans les structures de table des
matières *ditamap*, grâce au mécanisme
\[conref\](<http://docs.oasis-open.org/dita/v1.1/OS/archspec/conref.html>.
:::

Le principe des *conref* est simple : lorsqu\'un *conref* est mentionné
au niveau d\'un nœud XML donné, tout le contenu du nœud cible est
remplacé par le contenu du nœud source.

<figure>
<img src="graphics/ditamap.svg" alt="graphics/ditamap.svg" />
<figcaption><em>Partage de blocs d'information de granulométrie large
entre les</em> ditamap</figcaption>
</figure>

Une différence notable entre le mécanisme des *conref* et le mécanisme
XML des \[xinclude\](<http://en.wikipedia.org/wiki/XInclude>, c\'est que
le nœud source doit être conforme au schéma XSD du fichier source *et*
du fichier cible. Ce formalisme rigoureux, s\'il s\'avère moins souple
et oblige parfois à quelques acrobaties, rend les *conref* beaucoup plus
lisibles que les *xinclude* et favorise leur utilisation.

<figure>
<img src="graphics/conref.svg" alt="graphics/conref.svg" />
<figcaption><em>Partage de blocs d'information de granulométrie fine
entre les sections DITA XML</em></figcaption>
</figure>

::: {.toctree hidden=""}
centraliser-les-conref-dans-un-fichier-unique
utiliser-le-noeud-xml-de-plus-bas-niveau
prendre-en-compte-les-contraintes-de-traduction imbriquer-les-conref
maximiser-utilisation-des-conref-pour-faire-baisser-les-couts
proteger-les-informations-confidentielles
:::
