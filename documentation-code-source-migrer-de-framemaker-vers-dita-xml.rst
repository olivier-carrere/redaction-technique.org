.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _migrer-de-framemaker-vers-dita-xml:

Migrer de FrameMaker vers DITA XML
==================================

Le but de cette procédure est de :

- migrer son contenu **FrameMaker** vers |dita| sans se plonger dans
  les arcanes des **EDD FrameMaker** (petits
  projets uniquement !),

- gérer la documentation technique au format |dita| sans utiliser **FrameMaker
  structuré**.

#. Restructurez le contenu et les styles de vos fichiers de contenu FrameMaker
   selon les concepts |dita|.

#. Créez un document FrameMaker vide et importez-y tous les styles existants dans
   les fichiers à migrer.

#. Appliquez tous les styles disponibles à des paragraphes vides du document
   FrameMaker vide.

#. Enregistrez le document FrameMaker vide sous le nom :file:`styles.fm`.

#. Ouvrez **FrameMaker structuré 11** et créez un nouveau fichier |dita| de type
   *topic*.

#. Choisissez **StructureTools > Exporter le catalogue d'éléments en tant
   qu'EDD** et sauvegardez la nouvelle EDD sous le nom
   :file:`DITA-topic-edd.fm`.

#. Ouvrez le fichier :file:`styles.fm`, puis choisissez **Fichier > Importer les
   définitions d'éléments** et importez les définitions d'éléments à partir de
   :file:`DITA-topic-edd.fm`.

#. Répétez les trois étapes ci-dessus pour les autres types de topics |dita|
   (task, reference, etc.), en modifiant les noms de fichiers comme il se doit.

#. Ouvrez le fichier :file:`styles.fm`, puis choisissez **StructureTools >
   Générer le tableau de conversion**.

#. Modifiez le fichier de conversion et faites correspondre chaque style
   FrameMaker à une balise |dita|.

#. Enregistrez le tableau de conversion sous le nom
   :file:`DITA2FM-conversion-table.fm`.

#. Ouvrez un fichier de contenu FrameMaker sous FrameMaker structuré 11 et
   choisissez **StructureTools > Utilitaires > Structurer le document en
   cours**.

#. Sélectionnez :file:`DITA2FM-conversion-table.fm` et cliquez sur **Ajouter
   structure**.

#. Enregistrez le fichier de contenu FrameMaker au format XML sans sélectionner
   d'application.

#. Ouvrez le fichier XML généré sous un éditeur |dita| et corrigez la syntaxe
   |dita|. Certains aspects de cette étape sont scriptables, mais il faut
   également procéder à des opérations manuelles de restructuration du
   contenu. Il vous faudra notamment placer à la main les références croisées,
   de préférence dans une *reltable*.

Pour générer les éléments permettant de construire un fichier *ditamap*, vous
pouvez par exemple utiliser des scripts Perl du type :

.. warning::

   Ne lancez ce type de scripts que sur une copie de vos fichiers et non sur les
   fichiers originaux.

.. code-block:: perl

   #!/usr/bin/perl
   open(INPUT,"<$ARGV[0]") or die;
   @input_array=<INPUT>;
   close(INPUT);
   $input_scalar=join("",@input_array);
   # substitution
   $input_scalar =~ s#\<body>(.|\n)*?</body>##ig;
   open(OUTPUT,>$ARGV[0]") or die;
   print(OUTPUT $input_scalar);
   close(OUTPUT);

Vous pouvez également modulariser facilement le contenu à l'aide des ciseaux XML
`xml_split`_,
ou utiliser le module Perl `XML::Twig`_, ou
encore ce *one-liner* Bash pour renommer les fichiers :file:`.dita` d'après leur titre :

.. code-block:: console

   $ ack "<title>" *.dita| sed "s# #_#g;" | tr '[:upper:]' '[:lower:]' | \
   sed -E "s#(.*.dita)#mv \1#g;" | \
   sed -E "s#\.dita.*<title>(.*)</title>#.dita \1.dita#g;"

.. text review: yes
