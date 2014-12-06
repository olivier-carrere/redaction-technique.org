.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _xsl-fo-filtrer-du-contenu-selon-des-conditions-sauf-et-ou:

XSL-FO : filtrer du contenu selon des conditions « sauf » et « ou »
===================================================================

Imaginons que vous vouliez filtrer les nœuds enfants de la balise |dita|
:samp:`<example>` et afficher tout son contenu à l'exception du titre (situé entre les
balises :samp:`<title>`).

Vous pouvez recourir alors à la syntaxe suivante :

.. code-block:: xslt

   <xsl:template match="*[contains(@class,' topic/example ')]">
     <fo:block>
       <xsl:apply-templates select="*[not(name()='title')]" />
     </fo:block>
   </xsl:template>

Cette commande sélectionne tous les nœuds enfants du nœud :samp:`<example>`, à
l'exception du nœud :samp:`<title>`. Cependant, le nœud :samp:`<example>`
accepte le texte entré directement, sans être encapsulé dans des balises. Cette
commande ne fera alors pas apparaître ce contenu.

Supposons que le code source d'un de vos fichiers |dita| soit le suivant :

.. code-block:: xml

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

Le fichier PDF affichera l'exemple structuré comme suit :

.. code-block:: xslt

   ancestor-or-self

Le titre de l'exemple n'est pas affiché, ce qui correspond au résultat souhaité,
mais le contenu non encapsulé dans des balises n'apparaît pas, ce qui est un
effet de bord indésirable. Pour sélectionner ce contenu, il faut sélectionner
les nœuds textuels avec la syntaxe :samp:`text()`. Il est alors tentant
d'utiliser la syntaxe suivante :

.. code-block:: xslt

   <xsl:template match="*[contains(@class,' topic/example ')]">
     <fo:block>
       <xsl:apply-templates select="text()" />
       <xsl:apply-templates select="*[not(name()='title')]" />
     </fo:block>
   </xsl:template>

Cependant, tous les éléments texte non encapsulés dans des balises enfant de la
balise :samp:`<example>` seront placés en tête de l'exemple, avant les éléments
encapsulés, même s'ils sont placés après dans le fichier source |dita|.

Le fichier PDF affichera l'exemple structuré comme suit :

   Voici mon exemple de chemin XPATH :Texte non encapsulé situé après un nœud
   enfant.

   .. code-block:: xslt

      ancestor-or-self

Il faut alors utiliser la syntaxe *pipe* (condition booléenne *ou*) pour
modifier le chemin `XPATH <http://fr.wikipedia.org/wiki/XPath>`_ comme suit :

.. code-block:: xslt

   <xsl:apply-templates select="text()|*[not(name()='title')]" />

Le résultat final sera :

.. code-block:: xslt

   <xsl:template match="*[contains(@class,' topic/example ')]">
     <fo:block>
       <xsl:apply-templates select="text()|*[not(name()='title')]" />
     </fo:block>
   </xsl:template>

Le fichier PDF affichera l'exemple structuré comme suit :

   Voici mon exemple de chemin XPATH :

   .. code-block:: xslt

      ancestor-or-self

   Texte non encapsulé situé après un nœud enfant.

.. text review: yes
