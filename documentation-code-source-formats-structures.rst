.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _formats-structures:

Formats structurés
==================

Les **formats structurés** **XML** dits **WYSIWYM** (*what you see is what you
mean*) permettent de mieux valoriser le contenu d'entreprise.

Les traitements texte ne sont pas des outils de rédaction technique
professionnels. Les utiliser s'assimile à faire du transport routier avec des
Twingo : ce n'est juste pas fait pour ça. Autant le dire tout de suite, je suis
d'un avis totalement contraire à celui de cet auteur : `Replacing FrameMaker
with OpenOffice.org Writer
<http://techwhirl.com/articles/replacing-framemaker-with-openoffice-org-writer>`_.

Openoffice.org ou LibreOffice tiennent peut être la comparaison avec Word, mais
cela s'arrête là. Lorsqu'il m'a fallu reprendre une base importante de guides
rédigés sous Openoffice.org, j'ai tout de suite planifié une migration vers
DocBook. J'ai ensuite accéléré fortement la migration après que la table des
matières de l'un des guides avait complètement « explosé en vol ». Donc, si
certains traitements de texte supportent la comparaison avec FrameMaker sur le
papier, il en va tout autrement sur le terrain.

Cependant, si Framemaker est un outil fiable et reconnu, je lui reproche
d'utiliser des formats de fichiers binaires. Le contenu n'est donc pas
accessible par des outils en ligne de commande tels que grep ou sed, ou des
scripts Perl. Or, comme ces outils sont puissants ! Avez-vous par exemple essayé
de remplacer sous un traitement de texte ou sous FrameMaker la chaîne de
caractères « 2 Go » par « 3 Go » *uniquement* dans les sections contenant le
terme « mémoire vive » ?  Je privilégie donc fortement des formats tels que
`LaTeX <http://www.latex-project.org/>`_, `DocBook
<href="http://www.docbook.org/>`_ ou `DITA <http://dita.xml.org/>`_, ces deux
formats XML présentant l'avantage d'avoir été conçus spécifiquement pour la
rédaction technique et d'être relativement simples.  Voici présentés
succinctement les avantages des formats XML sur les formats binaires :

+--------------------+--------------------+--------------------+
|                    |Format binaire      |Format XML          |
+--------------------+--------------------+--------------------+
|Gestion des versions|Par nom de fichier  |Par tag dans le     |
|                    |                    |système de gestion  |
|                    |                    |de versions         |
+--------------------+--------------------+--------------------+
|Stockage            |Dans des répertoires|Dans le système de  |
|                    |                    |gestion de versions |
+--------------------+--------------------+--------------------+
|Sauvegarde          |Non planifiée       |Centralisée et      |
|                    |                    |planifiée           |
+--------------------+--------------------+--------------------+
|Risque de doublons  |Important           |Quasi nul           |
+--------------------+--------------------+--------------------+
|Éditeurs            |Unique : un document|Multiples : un      |
|                    |réalisé sous        |fichier DITA peut   |
|                    |Framemaker ne peut  |être modifié sous   |
|                    |être modifié que    |une interface       |
|                    |sous cet outil.     |graphique ou en mode|
|                    |                    |texte, sous un outil|
|                    |                    |libre ou            |
|                    |                    |propriétaire.       |
+--------------------+--------------------+--------------------+
|Utilisation d'outils|Impossible          |Aisée               |
|en ligne de commande|                    |                    |
+--------------------+--------------------+--------------------+
|Risque de perte de  |Important           |Quasi nul           |
|fichiers            |                    |                    |
+--------------------+--------------------+--------------------+
|Travail de groupe   |Très limité         |Aisé                |
+--------------------+--------------------+--------------------+
|Mise en page        |Partiellement       |Totalement          |
|                    |manuelle            |automatisée         |
+--------------------+--------------------+--------------------+
|Gestion des images  |Souvent insérées aux|Externes. Les images|
|                    |fichiers            |peuvent donc être   |
|                    |                    |traitées à part,    |
|                    |                    |notamment par lot   |
|                    |                    |avec des programmes |
|                    |                    |tels que            |
|                    |                    |ImageMagick.        |
+--------------------+--------------------+--------------------+
|Format              |Monolithique        |Modulaire. Ceci     |
|                    |                    |facilite le travail |
|                    |                    |de groupe et la     |
|                    |                    |parallélisation des |
|                    |                    |processus, notamment|
|                    |                    |de la traduction.   |
+--------------------+--------------------+--------------------+
|Format de livraison |Souvent limité au   |Multiformats (PDF,  |
|                    |PDF                 |HTML, etc.)         |
+--------------------+--------------------+--------------------+
|Traçabilité des     |Faible              |Totale              |
|modifications       |                    |                    |
+--------------------+--------------------+--------------------+

Le principal reproche que j'adresserais à DITA (et LaTeX), c'est leur nom, qui
ne se prête pas à des recherches Google, disons… sereines…
