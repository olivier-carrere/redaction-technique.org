---
title: Accélérer sa saisie avec le mode Predictive pour Emacs {#accelerer-sa-saisie-avec-le-mode-predictive-pour-emacs}
description: A guide in my new Starlight docs site.
---
# Accélérer sa saisie avec le mode Predictive pour Emacs {#accelerer-sa-saisie-avec-le-mode-predictive-pour-emacs}

Ce didacticiel mode Predictive pour Emacs est destiné à vous guider dans
la mise en place et l\'utilisation du mode Emacs d\'aide à la rédaction
et d\'autocomplétion des mots anglais et français Predictive dans un
environnement GNU/Linux (en l\'occurrence, Debian).

1.  Installez make et texinfo :

    ``` console
    $ sudo aptitude install make texinfo
    ```

2.  Téléchargez [Predictive]().

3.  Décompressez l\'archive Predictive :

    ``` console
    $ tar xzvf predictive-0.23.13.tar.gz
    ```

4.  Placez-vous dans le répertoire `predictive`{.interpreted-text
    role="file"} :

    ``` console
    $ cd predictive
    ```

5.  Compilez *predictive* :

    ``` console
    $ make
    ```

6.  Installez *predictive* :

    ``` console
    $ sudo make install
    ```

7.  Insérez le code suivant dans le fichier `.emacs`{.interpreted-text
    role="file"} :

    ``` cl
    ;; predictive install location
         (add-to-list 'load-path "~/.emacs.d/predictive/")
         ;; dictionary locations
         (add-to-list 'load-path "~/.emacs.d/predictive/latex/")
         (add-to-list 'load-path "~/.emacs.d/predictive/texinfo/")
         (add-to-list 'load-path "~/.emacs.d/predictive/html/")
         ;; load predictive package
         (require 'predictive)
    ```

8.  Lancez Emacs, puis appuyez sur Alt+X et entrez :

    ``` cl
    predictive-mode
    ```
