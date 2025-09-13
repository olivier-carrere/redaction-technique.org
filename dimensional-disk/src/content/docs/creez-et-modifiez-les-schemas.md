---
title: "Créez et modifiez les schémas"
description: "Modifiez un fichier source des images."
sidebar:
  label: "How-to"
  order: 1
prev: false
next: false
---

1. Modifiez un fichier source des images :
   - à l’aide d’un logiciel de dessin vectoriel :

     ```console
     $ inkscape graphics/modulaire-texte-monolithique-binaire.svg &
     ```

   - ou à l’aide d’un éditeur en ligne :

     ```console
     $ sed -i "s/docbook/XML/g;" graphics/*.svg
     ```