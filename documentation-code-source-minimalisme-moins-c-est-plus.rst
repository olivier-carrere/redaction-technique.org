.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _minimalisme-moins-c-est-plus:

Minimalisme - moins, c'est plus
===============================

Si le principe KISS dérive de l'ingénierie, le principe de **minimalisme**
provient lui de l'architecture. L'architecte
`http://fr.wikipedia.org/wiki/Ludwig_Mies_van_der_Rohe>Mies van der Rohe`, en
réaction contre l'ornementation, a posé le principe que la beauté architecturale
repose uniquement sur le fonctionnel (il formalisait ainsi les principes déjà
posés par Élie Faure dans son *Histoire de l'art*) et posait la célèbre formule
*Less is more*. Appliqué à la **documentation technique**, le **minimalisme**
garantit que l'utilisateur dispose à tout moment de toute l'information dont il
a besoin, mais uniquement de cette information. Pour revenir aux concepts des
ingénieurs, appliquer le **minimalisme** revient à augmenter le rapport
signal/bruit de la documentation.

Ce principe se met en pratique à différents niveaux de la **documentation
technique** (je livre ici ma mise en œuvre du **minimalisme**, qui n'est ni la
plus puriste, ni la seule possible. Cet article est d'autre part en cours de
construction) :

- filtrage des informations,

- style rédactionnel,

- modularisation du contenu,

- hiérarchisation des éléments d'information,

- utilisation des images.

La manière la plus simple de procéder consiste pour le **rédacteur technique** à
se demander à tout instant : l'utilisateur a-t-il vraiment besoin de cette
information ? En communication orale, la redondance et la reformulation sont
importants : l'auditeur ne peut être attentif à l'orateur 100 % du temps et n'a
pas la possibilité de réécouter un élément d'information qu'il aura mal
compris. Dans le cadre d'un document écrit, le lecteur a tout loisir de relire
un passage. Une formulation univoque, avec une définition précise des termes
utilisés, garantit la compréhension de l'information.

Un document écrit nécessite cependant une certaine redondance de l'information :
un avertissement relatif à un risque d'erreur intervenant lors de la réalisation
de différentes tâches doit par exemple être présent dans chaque procédure
correspondante. En effet, chaque procédure doit faire l'objet d'un module
d'information autonome, qui fournit l'information nécessaire à la réalisation de
la tâche, qu'il soit fourni seul ou accompagné d'autres modules. D'autre part,
même si le module d'information est présenté en compagnie d'autres modules
contenant le même avertissement, le **rédacteur technique** doit faciliter
l'appréhension de l'information par l'utilisateur et lui éviter les aller-retour
trop fréquents entre modules d'information.

Qu'on ne s'y trompe pas : exprimer plus d'idées en moins de mots demande un
effort supplémentaire. Le **rédacteur technique** aura souvent intérêt à faire
réduire sa prose sur le feu. Une bonne documentation ne se juge pas au nombre de
pages, ou alors en raison inverse du nombre de pages (les éditeurs de livres
techniques ont souvent tendance à augmenter artificiellement le nombre de pages
de leurs ouvrages par des captures d'écran ou des redites inutiles ; il en
résulte des documents à faible signal/bruit dont le public achève rarement la
lecture, preuve encore qu'il est difficile de confondre quantité et qualité) !

Le **rédacteur technique** peut également appréhender la rédaction minimaliste
au cours de formations spécifiques. Il peut enfin utiliser le format structuré
DITA XML, qui met en œuvre les principes du **minimalisme** et lui donne un
véritable modèle de rédaction **minimaliste**.

Comme vous l'aurez remarqué, cet article ne respecte pas les principes du
**minimalisme**. C'est qu'en effet, s'ils sont particulièrement adaptés à la
**rédaction technique**, ils ne sont guère appréciés des moteurs de recherche et
entre en conflit avec les techniques de référencement naturel, ou SEO (où la
recherche par indexation est remplacée par la recherche en plein texte). On
atteint là d'ailleurs la limite du **single-sourcing** : un contenu parfaitement
structuré pour une diffusion de type *push* garde totalement son efficacité quel
que soit le support ; mais il est beaucoup moins accessible dans le cadre d'une
diffusion de type *pull*. D'autre part, cet article n'est pas un module de
documentation technique.
