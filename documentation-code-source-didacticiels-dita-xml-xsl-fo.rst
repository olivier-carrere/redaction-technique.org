.. Copyright 2011-2015 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _didacticiels-dita-xml-xsl-fo:

Didacticiels DITA XML et XSL-FO
===============================

Les didacticiels suivants aideront le |techwriter| à mettre en
place et à utiliser une chaîne de création et de publication |dita| libre.

|dita| est un langage de rédaction structurée qui permet de créer des
documents sans se soucier de leur aspect final sur différents supports. XSL-FO
est un langage qui permet de réorganiser et filtrer le contenu XML et de lui
appliquer une mise en page à l'aide d'une feuille de style.

Un ensemble de fichiers |dita| contient tout le contenu, relatif par exemple à un
produit. Différentes feuilles de style XSL-FO permettront de publier ce contenu
en PDF, en HTML ou sous un autre format en appliquant des transformations
complexes. Le résumé de chaque section du document final pourra par exemple
apparaître dans la version HTML et non dans la version PDF.

De même, si un produit doit être fourni en marque blanche à différents clients,
une mise en page totalement différente peu être appliquée à sa documentation en
spécifiant simplement un autre jeu de feuilles de style lors de la génération du
livrable. Opération qui n'est pas envisageable en pratique avec des solutions
traditionnelles de type |fm|.

.. toctree::

   documentation-code-source-xsl-fo-filtrer-du-contenu-selon-des-conditions-sauf-et-ou
   documentation-code-source-xsl-fo-inserer-automatiquement-un-titre-pour-les-exemples
   documentation-code-source-generer-un-pdf-avec-dita-open-toolkit-sous-gnu-linux
   documentation-code-source-generer-un-pdf-avec-dita-open-toolkit-windows
   documentation-code-source-gerer-les-projets-de-documentation-multilingues-dita-xml
   documentation-code-source-creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel
   documentation-code-source-dita-open-toolkit-afficher-les-references-croisees-dans-les-pdf
   documentation-code-source-afficher-un-index-dans-un-pdf-mais-pas-sous-dita-open-toolkit
   documentation-code-source-utiliser-ide-nxml-pour-dita-xml
   documentation-code-source-accelerer-sa-saisie-avec-le-mode-predictive-pour-emacs

.. text review: yes
