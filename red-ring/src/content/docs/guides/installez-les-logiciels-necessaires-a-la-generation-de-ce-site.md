# Installez les logiciels nécessaires à la gestion de ce blog {#installez-les-logiciels-necessaires-a-la-generation-de-ce-site}

1.  Sélectionnez `Menu`{.interpreted-text role="guilabel"} \>
    `Accessoires`{.interpreted-text role="guilabel"} \>
    `LXTerminal`{.interpreted-text role="guilabel"}.

2.  Installez les paquets logiciels suivants :

    ``` console
    $ sudo aptitude install -y calibre emacs gitk inkscape python3-sphinx texlive-full
    ```

    Le temps de lire cinq ou six épisodes de *The Amazing Spider-Man*,
    et les logiciels suivants sont installés :

      -----------------------------------------------------------------------
      Logiciel      Description
      ------------- ---------------------------------------------------------
      Calibre       Gestionnaire de livres numériques

      Emacs         Environnement de développement intégré.

      Gitk          Navigateur d\'historique du logiciel de gestion de
                    versions décentralisé.

      Inkscape      Logiciel de dessin vectoriel.

      Python Sphinx Générateur de documentation basé sur le format
                    reStructuredText.

      Texlive       Environnement LaTeX complet pour la génération du blog au
                    \| format PDF.
      -----------------------------------------------------------------------

3.  Libérez de l\'espace disque :

    ``` console
    $ sudo aptitude clean
    ```
