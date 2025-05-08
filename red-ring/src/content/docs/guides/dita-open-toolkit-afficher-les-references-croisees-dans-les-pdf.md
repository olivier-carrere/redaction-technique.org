---
title: DITA Open Toolkit - afficher les références croisées dans les PDF
description: A guide in my new Starlight docs site.
---

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Les références croisées sont un élément important d\'une bien
structurée. Elles permettent à l\'utilisateur de naviguer facilement
dans les briques d\'information et sont un élément crucial de
l\'utilisabilité du document final. les gère très bien, à condition
d\'effectuer quelques réglages.
:::

Vous avez placé des balises *related-links* correctement formatées dans
vos fichiers de contenu , ou mieux, une [reltable]() dans votre
structure de table des matières *ditamap* (la *reltable* permet de
décontextualiser votre contenu et donc de mieux le réutiliser). Vous
lancez votre commande de génération du PDF et, mauvaise surprise, aucune
section *Voir aussi*[^1] n\'apparaît dans le fichier cible ! Vous
essayez alors de générer une version HTML de votre contenu et là, votre
section *Voir aussi* est bien présente. ne supporterait-il pas les
références croisées dans les PDF ?

Fort heureusement, non. Par défaut (allez savoir pourquoi), les
références croisées ne sont pas générées dans les PDF par . Pour les
afficher, attribuez la valeur *no* à la variable *disableRelatedLinks*
du fichier `demo/fo/build_template.xml`{.interpreted-text role="file"}.
Si vous utilisez *ant*, il vous faudra également passer le paramètre
*args.fo.include.rellinks=all* comme suit :

``` console
$ ant -Dargs.input=samples/sequence.ditamap -Doutput.dir=out/ \
-Dtranstype=pdf2 -Dargs.fo.include.rellinks=all
```

::: only
html

**Notes**
:::

[^1]: Pour des raisons de « décontextualisation », et pour se donner la
    possibilité de réutiliser le contenu ailleurs, les références
    croisées ne sont pas placées dans le corps du texte, mais en fin de
    section, dans une rubrique dédiée.
