.. Copyright 2021 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

L'idéal d'une documentation sans rédaction - ou presque
=======================================================

.. sidebar:: :awesome:`fa-history` Modifications récentes

   .. git_changelog::
      :detailed-message-pre: True
      :revisions: 3

Après une maintenant longue expérience en rédaction technique, j'en
arrive à penser que beaucoup de rédacteurs sont trop attachés à
l'aspect rédactionnel de leur métier.

Non que ce soit une mauvaise chose en soi, loin de là, mais il
faudrait réserver cet aspect aux domaines où il apporte le plus de
valeur ajoutée, par exemple en :

- sélectionnant des informations à communiquer à l'audience cible,
  dans une approche `minimaliste`_ ;

- présentant le produit selon la `perspective de l'utilisateur`_ ;

- concevoir et tester des procédures aussi simples et didactiques
  que possible.

Hors les parties purement conceptuelles d'une documentation, je pense
qu'un certain idéal consisterait à construire un document structuré à
partir de diverses sources externes à la documentation proprement
dite.

Par exemple, une liste de plateformes supportées peut être maintenue
par un ingénieur qualité dans une source unique, telle qu'un fichier
CSV, YAML, une base de données, ou une application de gestion de
projets telle que Redmine, puis être interrogée au moment où la
documentation est compilée.

.. tip::

   De plus, il est souvent plus pertinent de masquer les informations
   inutiles que de laisser l'utilisateur chercher l'information dont
   il a besoin dans une masse de données qui ne seront pour lui que du
   bruit. Il est facile de croiser l'extraction de données de
   multiples sources avec l'application de conditions. La syntaxe des
   moteurs de *templates* tels que Liquid ou Jinja est très lisible et
   efficace, par exemple, :code:`{% if model == "3xr" and version >=
   "11.0" %}` débute une partie de texte destinée uniquement aux
   utilisateurs utilisant un produit du modèle *3xr* en version *11.0*
   ou ultérieure.

Cela permet à chacun de se consacrer à son domaine d'expertise,
diminue nettement les efforts de mise à jour, améliore l'exactitude
des informations fournies, et garantit la meilleure fiabilité possible
aux utilisateurs.

Noyer des informations factuelles dans une masse de texte peut
transformer en cauchemar la maintenance de la documentation. Le
principe :abbr:`DRY (Don't Repeat Yourself)` qui prévaut en
programmation s'applique également en rédaction technique.

Apporter de la valeur ajoutée
-----------------------------

Ce genre de processus peut s'opposer à des résistances de la part des
rédacteurs techniques, qui préfèrent parfois se positionner en tant
que seuls détenteurs de l'information. On peut cependant penser que
leur rôle n'est pas de conserver, mais de diffuser l'information, sous
la forme la plus appropriée.

Il faut faire une nette différence entre *rédaction* et
*littérature*. La dimension technique de la rédaction technique est
primordiale. Tout d'abord dans le sens où il faut comprendre le
fonctionnement de ce que l'on décrit.  Et ensuite, dans celui où ce
métier a sa propre technicité, basée sur des études empiriques menées
sérieusement et facilement disponibles et utilisables. Se priver d'une
telle approche ne sert ni les utilisateurs, ni le rédacteur technique,
ni l'équipe à laquelle il appartient.

.. note::

   Ce site n'est décidément pas très cohérent (notamment, parlant
   beaucoup de DITA XML, mais créé en reStructuredText). Je jette ici
   quelques notes sous forme de billet de blog, que je développerai au
   fur et à mesure.

.. toctree::
   :hidden:

   diminuer-les-couts-ameliorer-la-satisfaction-client
   redaction-technique-un-processus-industriel
   format-structure-dita-xml
   mener-un-projet-de-bout-en-bout
   le-coin-du-geek
   a-propos-de-ce-blog
   contact
