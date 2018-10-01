.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

Mener un projet de bout en bout
===============================

.. sidebar:: :awesome:`fa-history` Modifications récentes

   .. git_changelog::
      :detailed-message-pre: True
      :revisions: 3

Il est assez rare, dans le cadre professionnel, de pouvoir mener un projet de
(quasiment) A à Z, de la conception à la communication, en passant par la
réalisation. Soit, gérer autant les aspects humains et organisationnels que les
aspects techniques, ainsi que toute la communication: graphisme, rédactionnel, et
même vidéo. C'est plus souvent possible dans le cadre associatif.

Gestion des photos d'une association
------------------------------------

Une association de quelques centaines de personnes originaires de différents
pays disposait de plusieurs milliers de photos, dispersées sur différents
ordinateurs personnels.

Les membres de l'association chargés de la communication en *print* ou en
*web* se plaignaient de ne pas y avoir accès.

L'association récupérait en vrac les photos prises par ses membres lors de ses
différents événements. Il y avait donc une grande hétérogénéité de sujets et
formats.

J'ai été chargé de centraliser les photos et d'en faciliter l'accès aux
graphistes. Il est vrai que j'avais déjà pris des photos, créé des affiches et
mis en place un forum de discussion pour l'association. J'avais donc une assez
bonne vision des tâches impliquées. Le budget alloué s'élevait à strictement
0,00 euros.

.. admonition:: Modèle LaTeX du dépliant

   Le `modèle LaTeX du dépliant`_, partie émergée de l'iceberg, est publié sur
   *Overleaf*.

   Curieusement, le PDF généré sur *Overleaf* présente des défauts que je ne
   constate pas lorsque je le publie en local.

   .. figure:: graphics/leaflet-pliage.png

   Pour les plus curieux, il existe `6 manières`_ de plier cette brochure. Je
   me suis épargné des essais fastidieux en utilisant la `classe de documents
   LaTeX leaflet`_.

L'un des buts que je me suis fixés était de donner un maximum d'autonomie aux
utilisateurs. Notamment, je souhaitais que les photographes téléchargent
eux-mêmes les photos au lieu de me les envoyer. Selon le bon vieux principe :
moins une chaîne a de maillons, plus elle est solide…

J'ai donc :

- récupéré puis trié les photos ;
- installé une galerie photo en ligne ;
- mis en place un système de sauvegarde ;
- défini un workflow de gestion des photos ;
- créé des didacticiels vidéo ;
- créé un dépliant multilingue pour expliquer la solution.

Voici le schéma global de la solution :

.. figure:: graphics/schema-galerie.svg

Tout a été réalisé sous *Linux*.

Récupération et tri des photos
------------------------------

Après avoir collecté le maximum de photos, je me suis retrouvé avec plus de
10 000 photos et 30 Go de données. Ouf.

J'ai commencé, avant toute opération automatique, par faire une copie de
sauvegarde à l'identique de l'ensemble des photos sur un disque dur
externe.

Ma première tâche fut de repérer, puis d'éliminer les doublons grâce à la
commande `fdupes`_.

Il me fallait aussi ne pas passer à côté de perles et chercher
les aiguilles intéressantes dans cette meule de foin. Certaines photos,
notamment, se cachaient dans des répertoires zippés. D'autres n'avaient pas
d'extension, et la commande `file`_ me fut très utile.

Le but étant avant tout de mettre à disposition des photos pour des supports
imprimés, j'ai procédé à un premier tri automatisé, selon le poids des
fichiers : les fichiers moins lourds que 1 Mo pouvaient être sans soucis mis
de côté.

Les fichiers étant répartis dans une foultitude de sous-répertoires, j'ai
utilisé la commande suivante sous Bash :

.. code-block:: console

   $ find . -size +1M -exec mv ./repertiore-plus-de-1mo/ {} \;

Ensuite, j'ai consulté les quelque 3 000 photos de plus de 1 Mo sous la
visionneuse *gThumb* et effacé les photos dont la qualité ou le sujet ne
convenaient pas à un support de communication. Ceci a pris environ 3
heures. J'ai retenu environ 500 photos.

Par comparaison de la liste originale des photos et de celle des fichiers de
plus de 1 Mo conservés, j'ai ensuite copié dans un autre répertoire à partir
de la copie de sauvegarde les fichiers de plus de 1 Mo éliminés, afin
de les mettre à disposition pour une utilisation sur Instagram, par exemple.

Galerie photo centralisée dans le *cloud*
-----------------------------------------

Les membres de l'association étant géographiquement dispersés, il était
essentiel de proposer un hébergement centralisé dans le *cloud*.

Je disposais d'un nom de domaine non utilisé et de suffisamment d'espace
disque et de bases de données libres sur un hébergement personnel.

J'ai donc installé une instance de `Piwigo`_, logiciel que je connaissais déjà
(je l'utilise pour des photos de famille).

J'ai protégé l'accès à la galerie initialement par un fichier `.htaccess`
commun à tous les utilisateurs, puis par la création de comptes personnels
sous la galerie.

Indexation des photos
~~~~~~~~~~~~~~~~~~~~~

Une fois les 500 photos retenues pour les projets d'impression téléchargées
sur le site, restait à les indexer.

J'ai donc créé une centaine de mots-clés décrivant au mieux chaque
photo. Comme il n'est pas possible de définir des mots-clés multilingues sous
*Piwigo*, j'ai autant que faire se peut accompagné chaque mot-clé d'un
pictogramme.

Par exemple, Vélo :awesome:`fa-bicycle`, Intérieur :awesome:`fa-lightbulb`,
etc.

Sauvegarde incrémentale et décentralisée
----------------------------------------

Comment sauvegarder le patrimoine photo de l'association, soit les photos et
la base de données Piwigo, de manière incrémentale et décentralisée ? Je me
suis tourné vers Git avec l'extension LFS, qui gère élégamment les fichiers
binaires.

J'ai tout d'abord fait une copie du répertoire Piwigo du serveur sur un disque
local, puis j'ai initialisé un dépôt Git LFS. J'ai ensuite cloné ce dépôt sur
Gitlab.

Ainsi, tout membre de l'association peut créer un compte Gitlab, puis, après
avoir reçu le mot de passe, cloner la copie de sauvegarde.

.. admonition:: Clonage du dépôt Gitlab

   Voici la procédure de clonage du dépôt.
   
   Sous Windows, vous pouvez installer `Git for windows`_ et `GitHub Desktop`_.
   
   Pour cloner le dépôt Gitlab sous une distribution Linux Debian ou dérivée
   (dont Ubuntu) :
   
   #. Demandez une invitation Gitlab.
   
   #. Installez les logiciels suivants :
   
      .. code-block:: console
   
         $ sudo apt install git git-lfs
   
   #. Clonez le dépôt :
   
      .. code-block:: console
   
         $ git clone https://gitlab.com/depot/communication.git
   
      Le clonage initial télécharge plus de 20 Go et peut prendre plusieurs
      heures.
   
   Pour mettre à jour votre dépôt Gitlab :
   
   #. Placez-vous dans le répertoire du dépôt :
   
      .. code-block:: console
   
         $ cd communication
   
   #. Mettez à jour le dépôt et supprimez les fichiers locaux obsolètes :
   
      .. code-block:: console
   
         $ git pull --rebase
         $ git lfs prune
   
      Cette opération devrait être nettement plus rapide que le clonage initial.
   
Pour la synchronisation entre le serveur et ma copie locale, je me suis tourné
vers `LFTP`_ :

.. code-block:: console

   $ lftp ftp://user:password@ftpaccount -e \
     "set ftp:ssl-allow no; mirror -e repertoire-distant \
     repertoire-local; quit"

L'hébergement des photos est donc centralisé, la sauvegarde, décentralisée.

Définition d'un workflow de gestion des photos
----------------------------------------------

Une solution technique ne se suffit jamais à elle-même. J'ai donc défini
un workflow dans lequel s'insérait la solution.

.. figure:: graphics/workflow-photo-piwigo.svg

Définition des rôles des membres du worfklow photo
--------------------------------------------------

La chaîne de production graphique s'appuie sur 3 rôles :

- photographe ;
- iconographe ;
- graphiste.

Évidemment, une même personne peut assumer à tour de rôle les différents
rôles, mais il est important pour le travail d'équipe que ces rôles ne soient
pas mélangés.

Si les deux premiers sont familiers aux membres de l'association, celui
d'iconographe est nouveau pour beaucoup. Je me suis tout d'abord demandé si je
devais utiliser ce mot peu usité. J'ai conclu que oui : il me fallait même
insister sur ce sujet qui est la clé de la réussite à long terme du projet.

En effet, l'association a vécu des années sans galerie photo et pourra continuer
à le faire, même si ce n'est pas de manière optimale. Les membres continueront
à prendre des photos et à créer des affiches. En revanche, l'intérêt
de la galerie est de centraliser le maximum de photos et d'y donner un
accès rapide. Elle ne sera utilisée que si son indexation est de
qualité.

Communication interne
---------------------

Les outils et les process étant en place, restait à y faire adhérer les
parties prenantes !

J'ai opté pour les supports de communication suivants :

- des vidéos explicatives en ligne ;
- un dépliant à distribuer lors des différents événements de l'association.


Didacticiels vidéo
~~~~~~~~~~~~~~~~~~

J'ai publié sur *YouTube* différents didacticiels, en français, anglais et
espagnol, sur l'utilisation de la galerie par les différents types
d'utilisateurs.

J'ai utilisé pour cela `SimpleScreenRecorder`_. Un premier essai avec le
microphone intégré de mon portable s'étant révélé peu convaincant, j'ai
enregistré ma voix avec un micro de bonne qualité, nommément, un *Bird
UM1*. Pressé par le temps, et parce que ces didacticiels s'adressent à un
public restreint (et indulgent), je n'ai pas fait de montage, comme
par exemple sous *Kdenlive*.

Support papier
~~~~~~~~~~~~~~

J'ai créé un dépliant expliquant :

- comment se connecter à la galerie ;
- les différents types d'utilisateurs de l'outil (en insistant sur le rôle -
  peu connu, mais crucial - des iconographes) ;
- l'utilisation de la galerie par chaque type d'utilisateurs ;
- le workflow dans lequel s'inscrivent les utilisateurs.

LaTeX
~~~~~

Pourquoi avoir choisi `LaTeX`_ pour réaliser le support *print* et non pas un
logiciel de PAO classique ? Je souhaitais pouvoir remanier le texte sans
refaire à chaque fois la mise en page. De même, je voulais pouvoir traduire le
dépliant sans effectuer de tâche de PAO manuelle.

Voici un exemple de code LaTeX :

.. code-block:: tex

    \begin{minipage}[t]{1.0\textwidth}
  
      \section{\faEye Soyez sélectifs}
  
        Nous avons déjà plus de 6 000 photos, dont beaucoup se ressemblent (les
        fêtes, ça fait de chouettes photos, mais difficilement utilisables sur
        une affiche\ldots). Privilégiez donc :
  
        \begin{itemize}
        \item les sujets ou les traitements originaux ;
        \item les gros plans ;
        \item le temps couvert ;
        \item le flou d'arrière-plan ;
        \item les fichiers de plus de 2 Mo ;
        \item les  scans d'argentique ou d'illustrations ;
        \item les boîtiers \emph{reflex}.
        \end{itemize}
        
    \end{minipage}

Et voici le rendu PDF :

.. figure:: graphics/latex-rendu.png

D'autre part, une fois la structure du dépliant créée, il est facile de
l'utiliser pour produire rapidement d'autres documents. De plus, le document
peut être remanié par d'autres personnes sans problème de licence ou de
plateforme logicielle.

Enfin, le suivi des modifications, que se soit sous Overleaf ou Git, prévient
efficacement les erreurs : il est très facile de visualiser les modifications
de fond ou de forme entre deux versions, de revenir à tout moment à une
version précédente, de maintenir en parallèle plusieurs versions, etc.

.. figure:: graphics/latex-historique-forme-github.png

   *Visualisation de modifications de forme sous GitHub*
   
.. figure:: graphics/latex-historique-fond-github.png

   *Visualisation de modifications de fond sous GitHub*
   
On peut même envisager un travail collaboratif, synchrone ou asynchrone, sur
le même projet.

Style rédactionnel
~~~~~~~~~~~~~~~~~~

Puisqu'il s'agissait d'un projet de communication interne, j'ai pu adopter un
style rédactionnel décontracté. J'ai cependant veillé à ne pas pousser trop
loin l'aspect humoristique. Le but était avant tout d'être compris, dans les 3
langues (français, anglais et espagnol).

Iconographie
~~~~~~~~~~~~

Le choix iconographique s'est avéré être un exercice de style très
intéressant.

Tout d'abord, il s'agissait de mettre en pratique les principes que je mettais
en avant dans le texte de la plaquette.

J'ai voulu faire passer les messages suivants via le choix iconographique :

Une tâche concrète
   Bien que de premier abord très abstraite, la gestion des photos s'assimile à
   un travail bien concret : la culture d'un potager ; j'ai découvert à cette
   occasion que je n'avais rien inventé, et que la notion de *désherbage*
   était familière aux iconographes.

Un travail de groupe
   La participation à la production graphique est un travail de groupe et non
   d'individus isolés.

   Après un premier choix d'images représentant à chaque fois une personne
   unique, je suis passé à des photos de groupe.

Après plusieurs essais, mon choix s'est fixé sur l'utilisation de photos
anciennes, libres de droits ou sous licence Creative Commons. J'ai
appliqué via *Gimp* un léger traitement des couleurs pour leur donner
un aspect plus homogène.

Et car il s'agit de s'amuser en procédant à ces tâches, j'ai joué sur un côté
décalé, quitte à revenir parfois sur certains choix, dont l'humour était trop
obscur… La photo suivante, par exemple, semblait ne faire rire que moi et
n'apporter pas grand-chose à la compréhension de la section *Didacticiels* :

.. figure:: graphics/Frances_Densmore_recording_Mountain_Chief2.jpg

Patience…
---------

Évidemment, toute structure étant toujours plus ou moins rétive au changement,
les choses ne se passeront pas comme je l'imagine. Notamment, l'équipe
d'iconographes que j'appelle de mes vœux a peu de chance de voir le jour et je
risque d'être le seul à indexer les photos sous la galerie.

Je ne crois cependant pas avoir visé trop loin. Si déjà, la moitié des
photographes et des graphistes utilisent la galerie pour télécharger leurs
photos, je considère que ce projet aura été un succès.

Mais à vrai dire, c'est déjà pour moi un succès, si j'en juge par la
satisfaction que j'ai de l'avoir mené à bien…

.. toctree::
   :hidden:

   diminuer-les-couts-ameliorer-la-satisfaction-client
   redaction-technique-un-processus-industriel
   format-structure-dita-xml
   le-coin-du-geek
   a-propos-de-ce-blog
   contact
