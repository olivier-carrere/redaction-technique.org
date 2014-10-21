.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _texte-conditionnel:

Texte conditionnel
==================

Le **texte conditionnel** permet au **rédacteur technique** de filtrer des
éléments d'information lors de la génération des fichiers cibles. Vous pouvez
ainsi produire des versions différentes d'un même document selon le public.

DITA propose l'utilisation des marqueurs sémantiques suivants :

- *audience* : les différents publics à qui est destiné l'information, par
  exemple les utilisateurs finaux ou les ingénieurs système,

- *platform* : la plateforme ou l'environnement du produit dont traite le
  document, par exemple le système d'exploitation ou la plateforme matérielle,

- *product* : par exemple le nom du produit ou sa version,

- *rev* : le niveau de révision (par exemple, un paragraphe peut avoir
  l'attribut de révision 1.1) ; ce marqueur est surtout intéressant si l'on ne
  crée pas de *tag* des versions de la documentation sous un système de gestion
  de versions,

- *props* : un marqueur générique  qui peut être spécialisé,

- *otherprops* : ce que vous voulez !

Ces marqueurs peuvent bien entendu servir à d'autres fins telles que la
recherche ou l'indexation. Ils peuvent être utilisés au niveau des *topics* ou
des *maps*.  Le code source qui contient des marqueurs doit être valide avant
exclusion d'une des valeurs. Par exemple, le code suivant est incorrect :

.. code-block:: xml

      <step>
        <cmd audience="ose>
         Cliquez sur <uicontrol>Salut</uicontrol>.
        </cmd>
        <cmd audience="non-ose>
         Cliquez sur <uicontrol>Bonjour</uicontrol>.
        </cmd>
        <info>
        Information commune aux deux publics
        </info>
      </step>

En effet, même s'il correspond après filtrage à un code qui serait conforme au
schéma *task*, qui n'accepte qu'une seule balise <cmd> par balise <step>, il en
contient deux avant traitement.

Il faut donc utiliser le code suivant :

.. code-block:: xml

      <step audience="ose>
        <cmd>
         Cliquez sur <uicontrol>Salut</uicontrol>.
        </cmd>
        <info>
        Information commune aux deux publics
        </info>
      </step>
      <step>
        <cmd audience="non-ose>
         Cliquez sur <uicontrol>Bonjour</uicontrol>.
        </cmd>
        <info        Information commune aux deux publics
        Information commune aux deux publics
        </info>
      </step>

quitte à partager la section info par le mécanisme des *conref* :

.. code-block:: xml

      <step audience="ose>
        <cmd>
         Cliquez sur <uicontrol>Salut</uicontrol>.
        </cmd>
        <info conref="shared.dita#shared/system>
        </info>
      </step>
      <step>
        <cmd audience="non-ose>
         Cliquez sur <uicontrol>Bonjour</uicontrol>.
        </cmd>
        <info conref="shared.dita#shared/system>
        </info>
      </step>

Les blocs d'information traités par les *conref* sont donc en moyenne plus
grands que ceux gérés par les Xinclude. Leur utilisation demande plus de
réflexion, voire d'acrobaties, dans la structuration des informations.
