.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. review: text yes, code yes

.. _qu-est-ce-qu-un-module-d-information:

Qu'est-ce qu'un module d'information ?
======================================

Le système modulaire le plus connu au monde est certainement celui des briques
Lego. Adapté à la **documentation technique**, le principe des modules permet
d'améliorer la qualité des manuels techniques et la productivité du **rédacteur
technique**.

Mais suffit-il de convertir sa documentation de FrameMaker vers un format
structuré tel que DITA XML pour obtenir une documentation modulaire ?
Hélas, non. Si le contenu de départ mélange les informations de tout type
(concepts, procédures pas à pas, référence), il sera toujours possible de le
convertir au format DITA en ne respectant pas rigoureusement la sémantique
DITA. Voire en modifiant les feuilles de style XSLT ou en spécialisant les XSD
pour les rendre plus laxistes.

Or, si l'on obtient au final un document se basant sur des fichiers correpondant
chacun à un schéma XSD différent (*concept*, *task*, ou *reference*), on
n'obtient pas forcément ainsi une véritable documentation modulaire. En effet,
essayez de construire alors un document ne regroupant que les fichiers d'un seul
type : votre document aura toutes les chances d'être incomplet et incohérent.

Cette documentation n'est pas modulaire, car elle ne repose pas sur de
véritables modules d'information. Un module est un élément atomique complet et
cohérent qui peut être réutilisé dans différents contextes. Si vous avez divisé
votre document monolithique original en une multitude de fichiers, vous n'avez
pas encore créé de modules d'information. La seconde étape consiste à ré-écrire
chaque fichier (selon par exemple l'approche minimaliste) pour le rendre plus
générique et en faire un véritable module. Il faut évidemment adopter une
approche structuraliste et décider du contenu de chaque module dans la
perspective de l'**architecture documentaire** globale.  De même, des mentions
telles que *Voir la section suivante* devront être remplacées par des reférences
croisées. Idéalement, ces références croisées ne se situent pas dans les
fichiers de contenu proprement dit sous la forme :

.. code-block:: xml

   <related-links>
     <link href="content.dita#content"/>
   </related-links>

mais dans une section *reltable* propre à chaque fichier *ditamap*.

Les modules sont ainsi parfaitement décontextualisés, et les informations de
structure telles que les références croisées sont placés dans des fichiers ne
comportant pas de contenu textuel.
