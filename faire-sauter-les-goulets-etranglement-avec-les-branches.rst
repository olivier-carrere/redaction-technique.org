.. Copyright 2011-2017 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _faire-sauter-les-goulets-etranglement-avec-les-branches:

Faire sauter les goulets d'étranglement avec les branches
=========================================================

Les branches *Git* permettent de facilement effectuer en parallèle plusieurs
tâches non liées :

Imaginons le scénario de travail suivant :

- On vous demande de migrer une section d'un document à un autre.
- Vous envoyez votre proposition pour validation.
- La validation se fait attendre et vous devez avancer sur d'autres parties des
  documents.

Comment faire sauter ce goulot d'étranglement ? C'est (relativement) simple :

#. Par défaut, vous travaillez sur la branche *master*. Votre espace de travail
   contient des modifications que vous ne souhaitez pas *committer* avant
   validation.
#. Créez une nouvelle branche : *git checkout -b ma-branche*.
#. *Committez* vos modifications sur la nouvelle branche : *git add mes-fichiers*,
   *git commit -m "mon message de commit"*.
#. Vous repassez sur la branche master *git checkout master* et passez à votre
   deuxième tâche.  5a. Si votre première tâche n'est pas validée, vous repassez
   sur la branche provisoire : *git checkout ma-branche* et faites un nouveau
   commit (que vous pourrez fusionner avec le ou les précédents après
   validation).
#. Lorsque vous recevez la validation de la première tâche, vous mettez votre
   travail en cours de côté : *git stash*.
#. Vous fusionnez la branche provisoire avec la branche master : *git merge
   ma-branche*.
#. Vous récupérez votre travail en cours : *git stash pop*.

Si vous n'avez pas besoin d'effectuer deux lots de tâches en parallèle, vous
pouvez sans problème travailler dans votre espace local. Si vous devez revenir
sur vos modifications, appellez la commande *git reset --hard HEAD* pour écraser
vos fichiers non *commités* du répertoire local par ceux du dernier *commit*.

.. text review: yes
