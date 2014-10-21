.. _workflow-de-creation-et-validation:

Workflow de création et validation
==================================

Un processus de création et de mise à jour de la documentation technique qui
repose sur la mémoire des acteurs humains est peu fiable. Un **rédacteur
technique** peut être fatigué, souffrant, en congés, oublier des données
lorsqu'il est saturé d'informations ou avoir quitté la société. L'information
entre deux personnes peut également mal circuler ou être mal comprise. C'est
pour pallier ces faiblesses que l'homme a créé des outils. En revanche, il est
créatif, à l'inverse des machines.

Face à cet état de fait, il convient de mettre un système de gestion de
l'information relative à l'évolution de la documentation qui soit tolérant à
l'erreur humaine. Il faut donc soit :

- mettre en œuvre des workflows sous un CMS,

- utiliser le système de gestion de tickets utilisés pour la gestion des
  nouvelles fonctionnalités du produit documenté (par exemple, Trac) :

- création d'un ticket par un développeur,

- mise en œuvre du ticket par un rédacteur technique,

- fermeture du ticket par le créateur du ticket,

- publication de la documentation lorsque tous les tickets critiques sont
  fermés.

Les fonctions principales d'un CMS sont les suivantes :

- gestion des métadonnées,

- workflows,

- traçabilité,

Quel qu'il soit, le système de suivi doit offrir une visibilité et une
traçabilité totales des modifications apportées à la documentation technique
(quoi, qui, quand) (sur le plan de la traçabilité, un système de gestion des
versions n'est pas suffisant, car il est très difficile d'obtenir une vue
synthétique de l'évolution d'un document lorsque des modifications atomiques ont
été apportées à un grand nombre de petits fichiers).

Ce système doit être unique et exhaustif : il doit centraliser toutes les
demandes de modification de la documentation technique.

Si le document est disponible en plusieurs langues, chaque ticket doit être
dupliqué pour chaque langue ou, dans le cas d'un CMS, à chaque langue doit
correspondre un workflow distinct.
