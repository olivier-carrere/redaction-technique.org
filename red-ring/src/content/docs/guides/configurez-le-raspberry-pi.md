---
title: Configurez le Raspberry Pi 3
---

**Prérequis**

-   Carte micro-SD de 16 Go classe 10 (de préférence).
-   Connexion Internet filaire ou Wi-Fi.

1.  Installez la distribution Linux Raspbian sur votre Raspberry Pi 3
    *via* \[NOOBS\](<https://www.raspberrypi.org/downloads/noobs/>.

2.  Sélectionnez `Menu`{.interpreted-text role="guilabel"} ‣
    `Preferences`{.interpreted-text role="guilabel"} ‣
    `Raspberry Pi Configuration`{.interpreted-text role="guilabel"}.

    La boîte de dialogue `Raspberry Pi Configuration`{.interpreted-text
    role="guilabel"} apparaît.

3.  Sélectionnez l'onglet `Localisation`{.interpreted-text
    role="guilabel"}.

4.  Cliquez sur `Set Locale`{.interpreted-text role="guilabel"},
    sélectionnez les options suivantes, puis cliquez sur
    `OK`{.interpreted-text role="guilabel"} :

      -----------------------------------------
      Option               Valeur
      -------------------- --------------------
      Language             fr (French)

      Country              FR (France)

      Character Set        UTF-8
      -----------------------------------------

5.  Cliquez sur `Set Keyboard`{.interpreted-text role="guilabel"},
    sélectionnez les valeurs correspondant à votre clavier, puis cliquez
    sur `OK`{.interpreted-text role="guilabel"}.

6.  Cliquez sur `OK`{.interpreted-text role="guilabel"} dans la boîte de
    dialogue `Raspberry Pi Configuration`{.interpreted-text
    role="guilabel"}.

7.  Sélectionnez `Menu`{.interpreted-text role="guilabel"} ‣
    `Accessories`{.interpreted-text role="guilabel"} ‣
    `Terminal`{.interpreted-text role="guilabel"}.

8.  Mettez à jour le système :

    ``` console
    $  sudo aptitude update && sudo aptitude safe-upgrade -y
    ```

    Le temps de lire un épisode du *Surfer d'argent*, et le système est
    mis à jour.

9.  Sélectionnez `Menu`{.interpreted-text role="guilabel"} ‣
    `Shutdown`{.interpreted-text role="guilabel"} ‣
    `Reboot`{.interpreted-text role="guilabel"}.

    Le Raspberry Pi 3 redémarre.
