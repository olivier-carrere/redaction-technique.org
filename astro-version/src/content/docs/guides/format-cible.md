---
title: Format cible
description: A guide in my new Starlight docs site.
---
# Format cible

Le format cible[^1] d\'un support de est celui sous lequel l\'audience
du message y accédera. Il est différent de celui sous lequel le crée le
contenu. Le *single-sourcing* permet de générer plusieurs livrables à
des formats différents à partir d\'un même format source.

À partir des fichiers sources validés, les livrables sont générés selon
l\'une des méthodes suivantes :

Totalement automatique

:   Par exemple, livre blanc du format structuré au format cible PDF
    *via* .

Semi automatique

:   Par exemple, contenu au format exporté en HTML puis collé sous un
    [^2].

Manuelle

:   Par exemple, plaquette marketing au format traitement de texte ou
    mise en page sous Indesign, exportée en PDF, puis imprimée ; selon
    la fréquence de publication du document final, des filtres d\'import
    XML peuvent également être mis en place.

Plus le processus est automatisé, plus le risque d\'erreur est faible et
plus la publication et la mise à jour sont aisées. L\'automatisation
facilite également le *single-sourcing*, qui consiste à générer
plusieurs livrables à des formats cibles différents à partir d\'un même
format source. Un projet au format peut ainsi être livré sous forme de
fichier PDF, d\'aide compilée Windows, d\'aide JavaHelp, de site en
HTML, etc. Le XML offre en ce domaine des possibilités quasi illimitées.

::: only
html

**Notes**
:::

[^1]: Dans le cas d\'une photo, le format cible est le format [JPEG]()
    qui est utilisé pour l\'affichage Web ou l\'impression et sur lequel
    les modifications ne peuvent être annulées une fois fermé le
    logiciel de retouches.

[^2]: Ceci est automatisable par un script ; le Drupal propose également
    un module [DITA integration for Drupal]().
