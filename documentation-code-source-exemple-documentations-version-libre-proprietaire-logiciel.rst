.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _exemple-documentations-version-libre-proprietaire-logiciel:

Exemple : documentations d'une version libre et propriétaire d'un même logiciel
===============================================================================

Grâce au **texte conditionnel** le **rédacteur technique**, s'il utilise un
format de rédaction structurée, peut produire deux documents différents à partir
des mêmes fichiers source.

Vous avez réalisé la documentation d'un logiciel distribué sous licence
propriétaire lorsqu'il est décidé de sortir une version open-source de ce
produit. La version open-source présentant des différences avec la version
propriétaire, il faut réaliser une documentation distincte.

Grâce à la définition de deux publics, l'un *open-source*, et l'autre non
*open-source*, vous pouvez marquer les différentes parties uniquement destinées
à chacun de ces deux publics :

-  au niveau des *maps* des différents documents. Exemple :

   .. code-block:: xml

      <backmatter>
        <notices href="fr_FR/topics/notices.dita>
          <topicref href="fr_FR/topics/cc-simple.dita" audience="ose"/>
          <topicref href="fr_FR/topics/creative-commons.dita" audience="ose"/>
          <topicref href="fr_FR/topics/trademarks.dita"/>
        </notices>
      </backmatter>

-  au niveau de chaque fichier de contenu DITA. Exemple :

   .. code-block:: xml

      <step>
        <cmd audience="ose>
          Onglet
          <menucascade>
            <uicontrol conref="shared.dita#shared/system"/>
            <uicontrol conref="shared.dita#shared/routednetworks"/>
            <uicontrol conref="shared.dita#shared/add"/>
          </menucascade>
        </cmd>
        <choices audience="non-ose>
          <choice>
            <ph conref="shared.dita#shared/appliance"/>onglet
            <menucascade>
              <uicontrol conref="shared.dita#shared/system"/>
              <uicontrol conref="shared.dita#shared/routednetworks"/>
              <uicontrol conref="shared.dita#shared/add"/>
            </menucascade>
          </choice>
          <choice>
            <ph conref="shared.dita#shared/appliance"/>menu
            <menucascade>
              <uicontrol conref="shared.dita#shared/master-server"/>
              <uicontrol conref="shared.dita#shared/system"/>
              <uicontrol conref="shared.dita#shared/routednetworks"/>
              <uicontrol conref="shared.dita#shared/add"/>
            </menucascade>
          </choice>
        </choices>
      </step>

Il faut ensuite créer un fichier :file:`.ditaval` par version. Exemple :

- :file:`ose.ditaval`

  .. code-block:: xml

     <?xml version="1.0" encoding="UTF-8"?>
     <val>
       <prop att="audience" val="ose" action="include"/>
       <prop att="audience" val="non-ose" action="exclude"/>
     </val>

-  :file:`non-ose.ditaval`

   .. code-block:: xml

      <?xml version="1.0" encoding="UTF-8"?>
      <val>
        <prop att="audience" val="ose" action="exclude"/>
        <prop att="audience" val="non-ose" action="include"/>
      </val>

Lors de la génération des fichiers cibles avec DITA Open Toolkit, il suffit
alors de passer le paramètre :

- :file:`/filter:ose.ditaval:file:` pour exclure les sections destinées
  uniquement à la version propriétaire, ou

- :file:`/filter:non-ose.ditaval` pour exclure les sections destinées uniquement
  à la version open-source.

La valeur par défaut est *include*.
