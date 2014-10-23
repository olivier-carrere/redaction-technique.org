.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. review: text no, code no

.. _tests-de-non-regression:

Tests De Non-Régression
=======================

Le simple fait de générer une documentation technique à deux instants différents
peut entraîner des différences entre les deux versions publiées d'une
**documentation technique** : des modifications peuvent avoir été apportées aux
fichiers sources ou l'outil de publication peut avoir un comportement différent.

Il convient donc de procéder à des tests de non-régression de la documentation
technique. Le plus simple est de comparer les deux versions du document à l'aide
d'un outil dédié et de vérifier que les différences correspondent bien à des
évolutions souhaitées. Cet aspect important ne peut cette fois pas être pris en
charge par un système de workflow ou de tickets. Il s'agit d'un contrôle qualité
placé sous la responsabilité du **rédacteur technique**.

Une comparaison automatique sera cependant difficile à mettre en œuvre si de
multiples modifications de détail ont été apportées entre les deux versions. Si
une restructuration de la hiérarchie de table de matières est intervenue, il
faudra procéder à une comparaison section par section, plus fastidieuse.

Si le document est disponible en plusieurs langues, les tests de non-régression
doivent être reproduits indépendamment pour chaque langue.
