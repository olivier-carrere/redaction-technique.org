.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _tester-les-produits-pour-les-documenter:

Tester les produits pour les documenter
=======================================

Le |techwriter| ne peut fournir une documentation utile aux clients
de l'entreprise s'il se contente de mettre en forme des informations glanées
auprès des différents acteurs de la société. Jouant le rôle de Candide, il est
le premier représentant des utilisateurs et se doit de tester les produits dans
des conditions proches des leurs.

Un conte chinois
narre comment des aveugles se sont retrouvés confrontés à un
éléphant. Aucun d'entre eux, et pour cause, n'ayant une perception globale de
l'animal, chacun en eut une image différente |_| : celui qui en tenait une patte le
prenait pour un arbre, celui qui en étreignait la trompe le confondait avec un
serpent, celui qui avait empoigné une défense l'identifiait à une lance, et
celui qui s'agrippait à une de ses oreilles croyait qu'il s'agissait d'un
éventail.

.. figure:: graphics/hanabusa-itcho.jpg

Le |techwriter| qui demande aux différents intervenants de
l'entreprise à quoi sert le produit dont il doit créer la documentation et
comment il fonctionne se retrouve comme celui qui demande aux aveugles à quoi
ressemble un éléphant |_| : pour la R&D, il s'agit de code élégamment rédigé,
pour le marketing, d'une offre à positionner face à la concurrence sur son
marché, pour le support technique, d'un exécutable dont il faut corriger les
bugs, etc.

Pour avoir une vision réaliste de l'objet qu'il est censé décrire, le
|techwriter| doit donc l'appréhender par lui-même et se faire sa
propre opinion, qu'il pourra ensuite confronter à celle des autres acteurs de
l'entreprise.  Le |techwriter| est un pragmatique qui s'intéresse à
la pratique, non à la théorie.
S'il ne consulte que les développeurs, par exemple, il aura peu de
chance de pouvoir créer une documentation satisfaisante pour l'utilisateur |_| :

- d'une part, les développeurs ont souvent une vision idéaliste du
  fonctionnement de leur produit, différente du comportement de ce dernier
  en conditions réelles d'utilisation,

- d'autre part, une déperdition d'information se produit nécessairement entre |_| :

  - ce que le développeur sait,

  - ce que le développeur exprime,

  - ce que le |techwriter| comprend,

  - ce que le |techwriter| rédige,

  - ce que l'utilisateur comprend.

Si le |techwriter| teste réellement le comportement du produit dans
des conditions aussi proches que possible de celles rencontrées par
l'utilisateur, les trois premières causes de déperdition d'information sont
quasiment inexistantes. Pour réduire les deux dernières, il ne lui reste plus
qu'à filtrer, organiser et exprimer l'information qu'il a recueillie de manière
adaptée au média qui la véhiculera et aux connaissances techniques de son
destinataire.

Dans les faits, une telle demande peut sembler de prime abord incongrue en
interne et se heurter à la lourdeur de la mise en place d'une plateforme de
test. Ce n'est généralement qu'après les premiers retours clients ou les tests
produits dans la presse que les différents interlocuteurs comprennent pleinement
l'apport de cette démarche. C'est souvent seulement à partir de ce moment là que
la rédaction technique gagne ses lettres de noblesse. Et que la documentation
technique n'est plus seulement vue comme un mal nécessaire, mais comme une
véritable valeur ajoutée.

.. text review: yes
