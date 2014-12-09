.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _gerer-les-projets-de-documentation-multilingues-dita-xml:

Gérer les projets de documentation multilingues DITA XML
========================================================

|dita| est un formidable format pour gérer les
**projets de documentation**. Pour les projets multilingues, cependant, le
|techwriter| doit créer un fichier *ditamap*, qui contient la
structure de table des matières des documents, par version. Ceci entraîne un
risque d'erreurs et d'incohérences. Heureusement, une méthodologie appropriée et
un script d'automatisation destiné à la chaîne de publication |dita-ot|
remédient à ce problème.

Méthodologie de gestion des projets de documentation multilingues DITA XML
--------------------------------------------------------------------------

#.  Le fichier *ditamap* ne doit pas comporter de section *navtitle*, qui
    contient un titre en toutes lettres, au lieu d'extraire le titre de la
    section |dita| correspondante, et est donc propre à chaque langue.

#.  Dès le début de votre projet |dita|, placez les fichiers de contenu
    |dita| dans un sous-répertoire spécifique à la langue dans laquelle
    il est initialement rédigé.

    Par exemple :

    - product

      - en_US

        - images
        - tasks
        - topics

      et non :

    - product

      - images
      - tasks
      - topics

#.  Remplacez dans le fichier *ditamap* toutes les occurrences du nom du
    répertoire propre à la langue par une chaîne unique provisoire.

    Par exemple, utilisez la chaîne *@language-code@* :

    .. code-block:: xml

       <topicref href="@language-code@/topics/managing-rights.dita"/>

    et non :

    .. code-block:: xml

       <topicref href="en_US/topics/managing-rights.dita"/>

#.  Pour générer les fichiers cibles, vous pouvez maintenant :

    a. modifier dans le fichier :file:`demo/fo/build.xml` le paramètre
       :samp:`default.locale`,

    #. remplacer dans le fichier *ditamap* la variable de langue par le
       nom du répertoire de langue,

    #.  modifier le paramètre de langue :samp:`xml:lang` dans le fichier
        *ditamap* et dans les fichiers de contenu |dita|,

    #.  pour les fichiers cibles PDF, modifier les dimensions de page (A4 ou US
        letter, par exemple) selon la langue,

    #.  générer les fichiers cibles,

    #.  rétablir les valeurs initiales dans les fichiers sources.

Heureusement, un script Bash (GNU/Linux) simple permet d'automatiser cela.

.. rubric:: Prérequis

- Vous avez installé |dita-ot|.
- Votre projet |dita| ne comporte qu'un fichier *ditamap*.
- Vos fichiers de contenu |dita| ont l'extension :file:`.dita`.
- Les noms des répertoires des versions linguistiques correspondent aux codes de
  langues supportés par Dita Open Toolkit (:file:`fr_FR` ou :file:`en_US`, par
  exemple).
- Vos fichiers de contenu |dita| se trouvent dans des sous-répertoires des
  répertoires des versions linguistiques (par exemple, dans :file:`fr_FR/tasks/`
  et :file:`fr_FR/topics/`).

Les valeurs supportées pour la dimension des pages PDF sont :samp:`fr_FR` (A4)
et :samp:`en_US` (US letter). Ce script peut être bien entendu facilement
adapté, ou inspirer un nouveau script.

.. warning::

   Ce script est fourni sans garantie. Avant toute exécution de ce script,
   effectuez une sauvegarde de l'ensemble de votre projet |dita|, fichiers de
   configuration inclus (par exemple sous un système de gestion de
   versions). Assurez-vous de pouvoir restaurer facilement le projet dans son
   intégralité en cas d'erreur ou de comportement inattendu.

Pour utiliser ce script :

#.  Téléchargez le `script de génération multilingue DITA XML`_
    dans le
    répertoire contenant le fichier *ditamap* du projet.

#.  Dans un terminal, placez-vous dans ce répertoire, puis entrez :

    .. code-block:: console

       $ chmod +x dita2target.sh

#.  Dans le terminal, entrez :

    .. code-block:: console

       $ mkdir out

    pour créer le répertoire qui contiendra les fichiers cibles.

#.  Entrez :

    .. code-block:: console

       $ ./dita2target.sh <fichier ditamap>  \
       <nom du répertoire de langue> <format cible>

    pour générer les fichiers cibles.

    L'argument *format cible* accepte les valeurs gérées par |dita-ot|.

    .. rubric:: Exemple

    .. code-block:: console

       ./dita2target.sh firewall.ditamap  en_US pdf2

    Le fichier PDF :file:`firewall.pdf` est alors généré dans le répertoire
    :file:`out` (spécifié *en dur* dans le script).

.. text review: yes
