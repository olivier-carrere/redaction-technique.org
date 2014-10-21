.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _les-balises-sont-semantiques:

Les balises sont sémantiques
============================

DITA XML est un cousin du HTML qui aurait appris la linguistique : au lieu de
s'arrêter à fournir aux navigateurs un moyen d'afficher de jolies pages Web, il
oblige également le **rédacteur technique** à correctement étiquetter les
éléments d'information qu'il utilise. Résultat : le texte devient une véritable
base de données qui peut être interrogée pour fournir à la demande tous types de
documents.

DITA XML est un langage à balises: un fichier DITA comporte un ensemble de texte
et de balises délimitées par les signes < et >. (Si vous voulez entrer ces
signes en tant que tels, il vous faudra d'ailleurs les remplacer par < et >,
respectivement ; pour entrer &, il vous faudra entrer &amp;.) Le texte est
compris entre une balise ouvrante de type <balise> et une balise fermante de
type </balise>. Ainsi : <balise>texte</balise>.  Tout texte entré hors d'une
balise ouvrante et fermante est incorrect et produit un fichier non valide.  Les
balises sont imbriquées comme des poupées gigognes, selon le principe
d'arborescence du XML.  Affichez le code source d'une page HTML, vous verrez
d'ailleurs le même mélange de texte et de balises. Normal, le HTML est lui-même
un dérivé du XML. Différence notable cependant : le HTML ne doit pas être
conforme à un schéma XSD . Un schéma XSD fournit un ensemble de règles pour
l'ordonancement des balises. Ainsi, sous DITA, une section de type *task* doit
absolument comporter une balise <steps> Le HTML, en revanche, autorise des
hérésies telles que placer un chapitre de niveau 3 immédiatement sous un
chapitre de niveau (avouons qu'au niveau organisation de l'information, on fait
mieux…) De plus, le HTML n'est pas sémantique : peut importe pour lui que
fichier Les balises sont sémantiques.
