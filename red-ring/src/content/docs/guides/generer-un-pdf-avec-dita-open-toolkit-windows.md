# Générer un PDF avec DITA Open Toolkit (Windows) {#generer-un-pdf-avec-dita-open-toolkit-windows}

Ce didacticiel DITA XML est destiné à vous guider dans la mise en place
et l\'utilisation de la chaîne de publication DITA Open Toolkit dans un
environnement Windows (testé sur Windows XP).

**Prérequis**

-   Connexion Internet

1.  Téléchargez
    \[Java\](<http://java.com/fr/download/manual.jsp?locale=fr>, puis
    lancez le programme d\'installation.

2.  Téléchargez \[DITA Open Toolkit
    1.5.4\](<http://sourceforge.net/projects/dita-ot/files/DITA-OT>
    Stable Release/DITA Open Toolkit
    1.5.4/DITA-OT1.5.4_full_easy_install_bin.zip/download sur le bureau,
    puis décompressez
    `DITA-OT1.5.4_full_easy_install_bin.zip`{.interpreted-text
    role="file"}.

3.  Sélectionnez `Exécuter`{.interpreted-text role="guilabel"} dans le
    menu `Démarrer`{.interpreted-text role="guilabel"}, collez la
    commande suivante, puis appuyez sur `Entrée`{.interpreted-text
    role="kbd"} :

    ``` console
    cmd
    ```

    Un terminal apparaît.

4.  Collez la commande suivante dans le terminal :

    ``` console
    set full=DITA-OT1.5.4_full_easy_install_bin
    cd Bureau\%full%\DITA-OT1.5.4
    ```

5.  Collez la commande suivante :

    ``` console
    startcmd.bat
    ```

    Un nouveau terminal apparaît.

6.  Collez la commande suivante dans le nouveau terminal :

    ``` console
    $ java -jar lib/dost.jar /i:samples/taskbook.ditamap \
    /outdir:. /transtype:pdf2
    ```

    Cette commande génère un fichier PDF à partir d\'un projet DITA XML
    d\'exemple.

    Félicitations, vous avez compilé votre premier projet DITA XML !
    Vous trouverez le fichier cible `taskbook.pdf`{.interpreted-text
    role="file"} dans le répertoire
    `Bureau\\%full%\\DITA-OT1.5.4`{.interpreted-text role="file"}. Vous
    pouvez maintenant compiler d\'autres projets en ignorant les étapes
    1 et 2.
