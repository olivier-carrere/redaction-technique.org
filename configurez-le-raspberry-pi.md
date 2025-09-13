---
title: "Configurez le Raspberry Pi"
description: "Guide pas à pas pour configurer un Raspberry Pi : localisation, clavier, mise à jour du système et redémarrage."
slug: "configurez-le-raspberry-pi"
sidebar:
  label: "How-to"
  order: 1
prev: false
next: false
---

**Prérequis**

- Carte micro-SD de 16 Go classe 10 (de préférence).
- Connexion Internet filaire ou Wi-Fi.

1. Installez la distribution Linux Raspbian sur votre *via* [NOOBS]().
2. Sélectionnez `Menu` ‣ `Preferences` ‣ `Raspberry Pi Configuration`.

   La boîte de dialogue `Raspberry Pi Configuration` apparaît.

3. Sélectionnez l'onglet `Localisation`.
4. Cliquez sur `Set Locale`, sélectionnez les options suivantes, puis cliquez sur `OK` :

      -----------------------------------------
      Option               Valeur
      -------------------- --------------------
      Language             fr (French)

      Country              FR (France)

      Character Set        UTF-8
      -----------------------------------------

5. Cliquez sur `Set Keyboard`, sélectionnez les valeurs correspondant à votre clavier, puis cliquez sur `OK`.
6. Cliquez sur `OK` dans la boîte de dialogue `Raspberry Pi Configuration`.
7. Sélectionnez `Menu` ‣ `Accessories` ‣ `Terminal`.
8. Mettez à jour le système :

    ```console
    $  sudo aptitude update && sudo aptitude safe-upgrade -y
    ```

    Le temps de lire un épisode du *Surfer d'argent*, et le système est mis à jour.

9. Sélectionnez `Menu` ‣ `Shutdown` ‣ `Reboot`.

   Le redémarre.