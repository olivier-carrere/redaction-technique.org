.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _placer-le-maximum-d-information-dans-la-structure:

Placer le maximum d'information dans la structure
=================================================

Pour améliorer la **qualité** de la documentation technique et en **diminuer les
coûts de production**, il est crucial de placer le maximum d'information dans la
structure et non dans le texte.

Par exemple, imaginons le contenu non structuré suivant :

Notez qu'il est important de mettre à jour votre firmware avant de procéder à
l'installation.

En recourant à un format de rédaction structuré tel que DITA XML, il est
possible de simplement dupliquer ce contenu, sans le structurer :

.. code-block:: xml

   <p>Notez qu'il est important de mettre à jour votre firmware avant de
   procéder à l'installation.</p>

L'information pertinente sera cependant beaucoup plus accessible à son
destinataire si le contenu est restructuré comme suit :

.. code-block:: xml

   <prereq>
   <note type="important>Mettez à jour votre firmware.</note>
   </prereq>

Selon la feuille de style XSLT utilisée pour générer le PDF via XSL-FO (ou un
autre outil), le PDF affichera le contenu suivant :

.. code-block:: xml

   <b>Prérequis</b>
   <b>Important:</b> Mettez à jour votre firmware.

Au pris d'un effort de structuration plus important, on obtient donc un contenu
de meilleure qualité, qui réclame moins de rédaction et diminue les coûts de
traduction et de mise à jour.
