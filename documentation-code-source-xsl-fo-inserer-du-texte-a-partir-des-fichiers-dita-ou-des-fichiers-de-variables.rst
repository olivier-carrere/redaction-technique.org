XSL-FO : insérer du texte à partir des fichiers DITA ou des fichiers de variables
=================================================================================

Le contenu inséré par **DITA Open Toolkit** dans les documents peut provenir
soit des fichiers de contenu DITA XML, :file:`.dita` ou :file:`.ditamap`, soit
des fichiers de variables **DITA Open Toolkit**. Dans le premier cas, un
filtrage de texte conditionnel peut être appliqué aux valeurs insérées, dans le
second, une traduction peut être fournie, selon la langue du document final.

Les fichiers de variable du répertoire
:file:`plugins/org.dita.pdf2/cfg/common/vars/`, tels que :file:`en.xml`,
contiennent des variables texte qui sont automatiquement insérées dans les
documents générés *via* **DITA Open Toolkit**. Par exemple, la variable

.. code-block:: xml

   <variable id="Warning>Warning</variable>

insère le texte *Warning* avant le contenu des balises DITA.

.. code-block:: xml

   <note type="warning>.

Le rédacteur technique peut bien entendu créer de nouvelles variables, par
exemple :

.. code-block:: xml

   <variable id="my-variable>My text</variable>.

Il peut ensuite l'insérer dans les feuilles de styles XSL-FO avec la syntaxe

.. code-block:: xml

   <xsl:with-param name="theVariableID" select="'my-variable'"/>

Il peut ensuite créer une version différente pour chaque langue de la variable
dans les fichiers appropriés, par exemple, dans *fr.xml* pour la version
française :

.. code-block:: xml

   <variable id="my-variable>Mon texte</variable>

Cependant, le rédacteur technique ne peut pas placer de clé de filtrage sur ces
variables, ce qui interdit de leur appliquer le mécanisme de texte conditionnel
*ditaval*. Ainsi, si le rédacteur technique veut appliquer différentes valeurs à
un texte automatiquement inséré dans les fichiers livrables, il doit utiliser
une valeur contenue dans les fichiers *.ditamap* ou *.dita* (il est toujours
possible de modifier à la main ou *via* un script une valeur contenue dans un
fichier de variables, mais l'on sort alors du *workflow* *DITA Open Toolkit*, ce
qui peut être source d'erreurs ou d'oublis). Par exemple, pour insérer
automatiquement le nom d'un produit dans les pieds de page d'un document PDF, il
est préférable de placer le nom du produit dans une balise DITA, par exemple :

.. code-block:: xml

   <mainbooktitle>Mon produit</mainbooktitle>

Il suffit ensuite d'appeler cette valeur dans le flux **XSL-FO** approprié, ici

.. code-block:: xml

   <fo:static-content flow-name="odd-body-footer>

à l'aide de la bonne syntaxe, ici

.. code-block:: xml

   <xsl:apply-templates select="$map//*[contains(@class,' bookmap/mainbooktitle ')][1]"/>.

Si le rédacteur technique pose ensuite des clés de filtrage, par exemple :

.. code-block:: xml

   <mainbooktitle><ph product="A>Mon produit A</ph>
   <ph product="B>Mon produit B</ph></mainbooktitle>

il peut par la suite utiliser un fichier *ditaval* pour la compilation et
n'afficher ainsi qu'une valeur dans le PDF, ici *Mon produit A* ou *Mon produit
B*.
