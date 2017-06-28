.. Copyright 2011-2017 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _docbook-ou-dita-xml:

DocBook ou DITA XML ?
=====================

.. sidebar:: :awesome:`fa-bullhorn`

   Certaines entreprises ont parfois un contenu existant au format `DocBook`_.
   Géré souvent par les acteurs les plus techniques de la société, il coexiste
   la plupart du temps avec d'autres contenus au format |fm| ou traitement de
   texte. S'il est décidé de fédérer tout le contenu d'entreprise sous un seul
   format, il semble naturel de capitaliser les efforts fournis sur la chaîne
   de création et de publication |db| et de sélectionner ce format. C'est
   pourtant se priver des gains de productivité spectaculaires offerts par
   |dita|.

Il est facile de générer du |db| à partir de |dita|. |dita-ot|
propose par défaut ce format cible, au même titre que le PDF ou le
HTML. L'opération inverse ne peut pas être totalement automatisée. Pourquoi ?

.. figure:: graphics/entropie.svg

   *Un processus non réversible*

Il n'est pas possible de migrer automatiquement des données de formats pauvres
vers des format riches en information.

Tout simplement parce que le contenu au format |dita| contient plus
d'informations. Passer d'un format plus riche à un format plus pauvre en
information est une opération entropique qui peut facilement être
automatisée. Par exemple, générer un PDF à partir de |dita|. Effectuer
l'opération inverse exige d'injecter de l'intelligence, opération que seul
l'être humain peut aujourd'hui effectuer.

Si votre contenu était une photo, nous pourrions faire l'analogie suivante :

+------------------+-----------------------------------------------------------+
|Format de contenu |Format de photo                                            |
+==================+===========================================================+
||dita|            |`RAW`_                                                     |
|                  |[#]_                                                       |
+------------------+-----------------------------------------------------------+
||db|              |`TIFF`_                                                    |
+------------------+-----------------------------------------------------------+
|PDF               |`JPEG`_                                                    |
+------------------+-----------------------------------------------------------+

Le passage de RAW en TIFF et de TIFF en JPEG est destructif et ne peut se faire
en sens inverse [#]_.

.. figure:: graphics/entropie-dita-docbook.svg

   *Un processus non réversible*

Le PDF est sémantiquement plus pauvre que |db|, lui-même plus pauvre que
|dita| [#]_.

Si votre entreprise tient absolument à utiliser du |db|, il est toujours
loisible de générer le contenu |db| à partir d'un contenu source au
format |dita|. À condition que le contenu source reste au format |dita|
(c'est à dire, à condition qu'aucune modification apportée au contenu
|db| ne soit sauvegardée) et que le format |db| ne soit qu'une
étape de la génération des livrables, au même titre que le format FO, vous
bénéficiez ainsi des fonctionnalités avancées de réutilisation du contenu que
propose |dita|.

L'effort de migration d'un format non structuré est certes un peu plus important
vers |dita| que vers |db|, puisque vous devez injecter plus
d'informations sémantiques. Vous devez également migrer le contenu |db|
vers |dita|, ce qui représente également un effort, quoique plus faible. Mais
votre contenu est immédiatement de meilleure qualité, car plus structuré. Et
vous pourrez rapidement cueillir tous les fruits de votre labeur, notamment si
une traduction de votre contenu dans une nouvelle langue est envisagée.

De manière générale, un professionnel a toujours intérêt à travailler sur le
format le plus riche, ne serait-ce que pour être pro-actif et anticiper sur les
nouveaux besoins.

.. only:: html

   .. rubric:: Notes

.. [#] Ce n'est bien sûr qu'une analogie, |dita| étant un standard, à la
       différence du format RAW.

.. [#] Pour être aussi exact que possible, vous pouvez enregistrer une image
       JPEG au format TIFF ; mais cette image aura une qualité égale à celle de
       l'image JPEG, inférieure à la qualité habituelle des images TIFF. En
       revanche, on ne peut à ma connaissance pas enregistrer une image TIFF
       sous un format RAW.

.. [#] Le PDF est cependant plus riche en informations de mise en page,
       appliquées automatiquement à partir d'une feuille de style.

.. text review: yes
