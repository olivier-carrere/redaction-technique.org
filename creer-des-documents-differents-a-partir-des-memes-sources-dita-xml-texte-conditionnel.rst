.. Copyright 2011-2017 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel:

Créer des documents différents à partir des mêmes sources DITA XML (texte conditionnel)
=======================================================================================

|dita| offre un mécanisme de texte conditionnel. Ce mécanisme favorise la
réutilisation du contenu source et évite la redondance des informations. Ce
didacticiel aidera le |techwriter| à utiliser ce mécanisme en
quelques minutes.

.. rubric:: Prérequis

- Vous avez installé |dita-ot| dans le répertoire :file:`DITA-OT1.5.4` sous
  GNU/Linux ou Windows.

#. Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom
   de :file:`texte-conditionnel.dita` dans le répertoire :file:`DITA-OT1.5.4` :

   .. code-block:: xml

      <?xml version="1.0" encoding="utf-8"?>
      <!DOCTYPE topic PUBLIC "-//OASIS//DTD DITA 1.2 Topic//EN"
      "/usr/share/dita-ot/dtd/technicalContent/dtd/topic.dtd">
      <topic id="exemple-topic" xml:lang="fr-fr">
        <title>Utilisation du texte conditionnel</title>
        <body>
          <hazardstatement>
            <messagepanel audience="electriciens">
              <typeofhazard>
                Danger pour les électriciens
              </typeofhazard>
              <consequence>
                Risque d'électrocution
              </consequence>
              <howtoavoid>
                Ne touchez pas les fils électriques.
              </howtoavoid>
            </messagepanel>
            <messagepanel audience="plombiers">
              <typeofhazard>
                Danger pour les plombiers
              </typeofhazard>
              <consequence>
                Risque de noyade
              </consequence>
              <howtoavoid>
                Ne plongez pas dans la piscine.
              </howtoavoid>
            </messagepanel>
          </hazardstatement>
          <p>
           Tout contenu placé entre balises ne comportant pas de
           valeur <i>audience</i> exclue dans un fichier
           <i>.ditaval</i> est publié dans les documents
           destinés aux plombiers et aux électriciens.
        </p>
        </body>
      </topic>

   Ce code contient des balises |dita| contenant des valeurs *audience*
   différentes : nous allons exclure le contenu d'une de ces deux balises lors
   de la génération du fichier cible en utilisant la clé *audience*.

#. Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom
   de :file:`texte-conditionnel.ditamap` dans le répertoire
   :file:`DITA-OT1.5.4` :

   .. code-block:: xml

      <?xml version="1.0" encoding="utf-8"?>
      <!DOCTYPE bookmap PUBLIC "-//OASIS//DTD DITA BookMap//EN"
      "/usr/share/dita-ot/dtd/bookmap/dtd/bookmap.dtd">
      <bookmap id="texte-conditionnel">
        <booktitle>
          <mainbooktitle>
            Exemple de texte conditionnel
          </mainbooktitle>
        </booktitle>
        <chapter href="texte-conditionnel.dita"/>
      </bookmap>

#. Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom
   de :file:`electriciens.ditaval` dans le répertoire :file:`DITA-OT1.5.4` :

   .. code-block:: xml

      <?xml version="1.0" encoding="UTF-8"?>
      <val>
        <prop att="audience" val="electriciens" action="include"/>
        <prop att="audience" val="plombiers" action="exclude"/>
      </val>

#. Collez le code suivant dans un fichier et enregistrez ce dernier sous le nom
   de :file:`plombiers.ditaval` dans le répertoire :file:`DITA-OT1.5.4` :

   .. code-block:: xml

      <?xml version="1.0" encoding="UTF-8"?>
      <val>
        <prop att="audience" val="electriciens" action="exclude"/>
        <prop att="audience" val="plombiers" action="include"/>
      </val>

#. Ouvrez un terminal et entrez la commande suivante dans le répertoire
   :file:`DITA-OT1.5.4` :

   .. code-block:: console

      $ java -jar lib/dost.jar /i:texte-conditionnel.ditamap \
      /filter:electriciens.ditaval /outdir:. /transtype:pdf2

   Ouvrez le fichier :file:`texte-conditionnel.pdf` ; il contient des
   informations destinées :

   - aux plombiers et aux électriciens,
   - uniquement aux électriciens.

#. Ouvrez un terminal et entrez la commande suivante dans le répertoire
   :file:`DITA-OT1.5.4` :

   .. code-block:: console

      $ java -jar lib/dost.jar /i:texte-conditionnel.ditamap \
      /filter:plombiers.ditaval /outdir:. /transtype:pdf2

   Ouvrez le fichier :file:`texte-conditionnel.pdf` ; il contient des
   informations destinées :

  - aux plombiers et aux électriciens,
  - uniquement aux plombiers.

.. seealso::

   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel`
   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel`
   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel`

.. text review: yes
