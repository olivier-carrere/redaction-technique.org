---
title: "Créez et modifiez les schémas"
description: "Modifiez un fichier source des images de ce blog à l'aide d'un logiciel de dessin vectoriel ou d'un éditeur en ligne."
slug: creez-et-modifiez-les-schemas
sidebar:
  label: How-to
  order: 1
next: false
---

1. Modifiez un fichier source des images de ce blog :
   - à l'aide d'un logiciel de dessin vectoriel :

     ```console
     $ inkscape graphics/modulaire-texte-monolithique-binaire.svg &
     ```

   - ou à l'aide d'un éditeur en ligne :

     ```console
     $ sed -i "s/docbook/XML/g;" graphics/*.svg
     ```