---
title: Une architecture documentaire trop complexe ?
description: A guide in my new Starlight docs site.
---
# Une architecture documentaire trop complexe ?

permet des gains de productivité importants par la réduction du volume
source que le crée, traduit et maintient. Ce gain de productivité se
fait au prix d\'une plus grande complexité.

Si les projets sont plus *complexes*, ils sont cependant moins
*compliqués* que des projets reposant sur des formats plus traditionnels
de type . En effet, est une architecture rationnelle. Le se trouve donc
face à un comportement prédictible des outils qu\'il utilise, loin des
*trucs et astuces* destinés à contourner les bugs ou les fonctionnements
erratiques des outils plus lourds.

Le tableau suivant présente les différents niveaux de complexité induits
par et les solutions qui permettent au de les maîtriser plus
facilement :

  -------------------------------------------------------------
  Complexité                     Solution
  ------------------------------ ------------------------------
  Syntaxe                        tel que XMetal ou nXML

  Gestion des relations entre    dédié tel que Componize ou
  des briques d\'information     DocZone
  atomiques                      

  Syntaxe de la feuille de style Logiciel graphique de création
  XSLT                           de feuilles de style
  -------------------------------------------------------------

Pour une petite équipe de , l\'écueil principal sera la nécessité de
mettre en œuvre la charte graphique de l\'entreprise. Les autres aspects
peuvent être gérés sans outil spécialisé, avec une bonne communication
et une série de bonnes pratiques.
