# XSL-FO - filtrer du contenu selon des conditions « sauf » et « ou »

Imaginons que vous vouliez filtrer les nœuds enfants de la balise DITA
XML `<example>`{.interpreted-text role="samp"} et afficher tout son
contenu à l\'exception du titre (situé entre les balises
`<title>`{.interpreted-text role="samp"}).

Vous pouvez recourir alors à la syntaxe suivante :

``` xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

Cette commande sélectionne tous les nœuds enfants du nœud
`<example>`{.interpreted-text role="samp"}, à l\'exception du nœud
`<title>`{.interpreted-text role="samp"}. Cependant, le nœud
`<example>`{.interpreted-text role="samp"} accepte le texte entré
directement, sans être encapsulé dans des balises. Cette commande ne
fera alors pas apparaître ce contenu.

Supposons que le code source d\'un de vos fichiers DITA XML soit le
suivant :

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

Le fichier PDF affichera l\'exemple structuré comme suit :

``` xslt
ancestor-or-self
```

Le titre de l\'exemple n\'est pas affiché, ce qui correspond au résultat
souhaité, mais le contenu non encapsulé dans des balises n\'apparaît
pas, ce qui est un effet de bord indésirable. Pour sélectionner ce
contenu, il faut sélectionner les nœuds textuels avec la syntaxe
`text()`{.interpreted-text role="samp"}. Il est alors tentant
d\'utiliser la syntaxe suivante :

``` xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="text()" />
    <xsl:apply-templates select="*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

Cependant, tous les éléments texte non encapsulés dans des balises
enfant de la balise `<example>`{.interpreted-text role="samp"} seront
placés en tête de l\'exemple, avant les éléments encapsulés, même s\'ils
sont placés après dans le fichier source DITA XML.

Le fichier PDF affichera l\'exemple structuré comme suit :

> Voici mon exemple de chemin XPATH :Texte non encapsulé situé après un
> nœud enfant.
>
> ``` xslt
> ancestor-or-self
> ```

Il faut alors utiliser la syntaxe *pipe* (condition booléenne *ou*) pour
modifier le chemin \[XPATH\](<http://fr.wikipedia.org/wiki/XPath> comme
suit :

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

Le fichier PDF affichera l\'exemple structuré comme suit :

> Voici mon exemple de chemin XPATH :
>
> ``` xslt
> ancestor-or-self
> ```
>
> Texte non encapsulé situé après un nœud enfant.
