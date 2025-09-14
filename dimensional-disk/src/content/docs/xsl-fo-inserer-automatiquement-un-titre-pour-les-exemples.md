---
title: "XSL-FO : insérer automatiquement un titre pour les exemples"
description: "Insérer automatiquement « Exemple : » avant le titre des exemples DITA (<example>) dans les PDF générés avec DITA-OT via XSL-FO."
slug: "xsl-fo-inserer-automatiquement-un-titre-pour-les-exemples"
sidebar:
  label: How-to
  order: 1
next: null
---

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Par défaut, `DITA-OT (DITA Open Toolkit)`{.interpreted-text role="abbr"} n'insère pas automatiquement dans les fichiers PDF le texte *Exemple :* devant le titre d'un exemple contenu entre balises **DITA XML** `<example>`{.interpreted-text role="samp"}. La syntaxe [XSL-FO]() offre cependant cette possibilité.
:::

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

## Insérer automatiquement une variable de texte avant le titre des exemples

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