---
title: Mener un projet de bout en bout
description: A guide in my new Starlight docs site.
---

::: sidebar
**`fa-history`{.interpreted-text role="awesome"} Modifications
récentes**
:::

Il est assez rare, dans le cadre professionnel, de pouvoir mener un
projet de (quasiment) A à Z, de la conception à la communication, en
passant par la réalisation. Soit, gérer autant les aspects humains et
organisationnels que les aspects techniques, ainsi que toute la
communication: graphisme, rédactionnel, et même vidéo. C\'est plus
souvent possible dans le cadre associatif.

## Gestion des photos d\'une association

Une association de quelques centaines de personnes originaires de
différents pays disposait de plusieurs milliers de photos, dispersées
sur différents ordinateurs personnels.

Les membres de l\'association chargés de la communication en *print* ou
en *web* se plaignaient de ne pas y avoir accès.

L\'association récupérait en vrac les photos prises par ses membres lors
de ses différents événements. Il y avait donc une grande hétérogénéité
de sujets et formats.

J\'ai été chargé de centraliser les photos et d\'en faciliter l\'accès
aux graphistes. Il est vrai que j\'avais déjà pris des photos, créé des
affiches et mis en place un forum de discussion pour l\'association.
J\'avais donc une assez bonne vision des tâches impliquées. Le budget
alloué s\'élevait à strictement 0,00 euros.

![](graphics/pile-photos.jpg)

L\'un des buts que je me suis fixés était de donner un maximum
d\'autonomie aux utilisateurs. Notamment, je souhaitais que les
photographes téléchargent eux-mêmes les photos au lieu de me les
envoyer. Selon le bon vieux principe : moins une chaîne a de maillons,
plus elle est solide...

J\'ai donc :

-   récupéré puis trié les photos ;
-   installé une galerie photo en ligne ;
-   mis en place un système de sauvegarde ;
-   défini un workflow de gestion des photos ;
-   créé des didacticiels vidéo ;
-   créé un dépliant multilingue pour expliquer la solution.

Voici le schéma global de la solution :

![](graphics/schema-galerie.svg)

Tout a été réalisé sous *Linux*.

## Récupération et tri des photos

Après avoir collecté le maximum de photos, je me suis retrouvé avec plus
de 10 000 photos et 30 Go de données. Ouf.

J\'ai commencé, avant toute opération automatique, par faire une copie
de sauvegarde à l\'identique de l\'ensemble des photos sur un disque dur
externe.

Ma première tâche fut de repérer, puis d\'éliminer les doublons grâce à
la commande [fdupes]().

Il me fallait aussi ne pas passer à côté de perles et chercher les
aiguilles intéressantes dans cette meule de foin. Certaines photos,
notamment, se cachaient dans des répertoires zippés. D\'autres
n\'avaient pas d\'extension, et la commande [file]() me fut très utile.

Le but étant avant tout de mettre à disposition des photos pour des
supports imprimés, j\'ai procédé à un premier tri automatisé, selon le
poids des fichiers : les fichiers moins lourds que 1 Mo pouvaient être
sans soucis mis de côté.

Les fichiers étant répartis dans une foultitude de sous-répertoires,
j\'ai utilisé la commande suivante sous Bash :

![](graphics/find-command.svg)

Ensuite, j\'ai consulté les quelque 3 000 photos de plus de 1 Mo sous la
visionneuse *gThumb* et effacé les photos dont la qualité ou le sujet ne
convenaient pas à un support de communication. Ceci a pris environ 3
heures. J\'ai retenu environ 500 photos.

Par comparaison de la liste originale des photos et de celle des
fichiers de plus de 1 Mo conservés, j\'ai ensuite copié dans un autre
répertoire à partir de la copie de sauvegarde les fichiers de plus de
1 Mo éliminés, afin de les mettre à disposition pour une utilisation sur
Instagram, par exemple.

## Galerie photo centralisée dans le *cloud*

Les membres de l\'association étant géographiquement dispersés, il était
essentiel de proposer un hébergement centralisé dans le *cloud*.

Je disposais d\'un nom de domaine non utilisé et de suffisamment
d\'espace disque et de bases de données libres sur un hébergement
personnel.

J\'ai donc installé une instance de [Piwigo](), logiciel que je
connaissais déjà (je l\'utilise pour des photos de famille).

<figure>
<img src="graphics/galerie-photo.jpg"
alt="graphics/galerie-photo.jpg" />
<figcaption><a href="">Photo Kevin Harber</a></figcaption>
</figure>

J\'ai protégé l\'accès à la galerie initialement par un fichier
[.htaccess]{.title-ref} commun à tous les utilisateurs, puis par la
création de comptes personnels sous la galerie.

L\'hébergement sur mon espace personnel peut durer quelques mois sans
problème. Il serait cependant plus sain que l\'association soit
propriétaire de l\'hébergement et du nom de domaine.

Une rapide étude (en septembre 2018) m\'a conduit à proposer les
solutions suivantes :

  ------------------------------------------------------------------------
                   [piwigo.com]()    [Obambu]()           [Obambu]()
                                     Performance          Evolution
  ---------------- ----------------- -------------------- ----------------
  Prix annuel      39 €              23 €                 15 €

  Stockage         Illimité          250 Go               100 Go

  Sauvegarde       Gérée par         Gérée par            
                   l\'hébergeur.     l\'association.      

  Avantage         Moins d\'efforts  L\'association       
                   pour              dispose de tous les  
                   l\'association.   fichiers.            
  ------------------------------------------------------------------------

## Indexation des photos

Une fois les 500 photos retenues pour les projets d\'impression
téléchargées sur le site, restait à les indexer.

J\'ai donc créé une centaine de mots-clés décrivant au mieux chaque
photo. Comme il n\'est pas possible de définir des mots-clés
multilingues sous *Piwigo*, j\'ai autant que faire se peut accompagné
chaque mot-clé d\'un pictogramme.

Par exemple, Vélo `fa-bicycle`{.interpreted-text role="awesome"},
Intérieur `fa-lightbulb`{.interpreted-text role="awesome"}, etc.

## Sauvegarde incrémentale et décentralisée

Comment sauvegarder le patrimoine photo de l\'association, soit les
photos et la base de données Piwigo, de manière incrémentale et
décentralisée ? Je me suis tourné vers Git avec l\'extension LFS, qui
gère élégamment les fichiers binaires.

J\'ai tout d\'abord fait une copie du répertoire Piwigo du serveur sur
un disque local, puis j\'ai initialisé un dépôt Git LFS. J\'ai ensuite
cloné ce dépôt sur Gitlab.

Ainsi, tout membre de l\'association peut créer un compte Gitlab, puis,
après avoir reçu le mot de passe, cloner la copie de sauvegarde.

::: admonition
Clonage du dépôt Gitlab

*La procédure suivante était incluse dans une première version du
dépliant LaTeX. Elle est donc minimaliste, ne serait-ce que pour des
raisons d\'espace disponible sur la version imprimée. Je l\'ai par la
suite supprimée du dépliant, car elle risquait plutôt d\'effrayer son
lectorat, majoritairement technophobe.*

Sous Windows, vous pouvez installer [Git for windows]() et [GitHub
Desktop]().

Pour cloner le dépôt Gitlab sous une distribution Linux Debian ou
dérivée (dont Ubuntu) :

1.  Demandez une invitation Gitlab.

2.  Installez les logiciels suivants :

    ``` console
    $ sudo apt install git git-lfs
    ```

3.  Clonez le dépôt :

    ``` console
    $ git clone https://gitlab.com/depot/communication.git
    ```

    Le clonage initial télécharge plus de 20 Go et peut prendre
    plusieurs heures.

Pour mettre à jour votre dépôt Gitlab :

1.  Placez-vous dans le répertoire du dépôt :

    ``` console
    $ cd communication
    ```

2.  Mettez à jour le dépôt et supprimez les fichiers locaux obsolètes :

    ``` console
    $ git pull --rebase
    $ git lfs prune
    ```

    Cette opération devrait être nettement plus rapide que le clonage
    initial.
:::

Pour la synchronisation entre le serveur et ma copie locale, je me suis
tourné vers [LFTP]() :

``` console
$ lftp ftp://user:password@ftpaccount -e \
  "set ftp:ssl-allow no; mirror -e repertoire-distant \
  repertoire-local; quit"
```

:::: note
::: title
Note
:::

Pour ignorer les différences de permissions sur les fichiers, j\'ai au
préalable lancé la commande suivante sur mon dépôt local :

``` console
$ git config core.filemode false
```
::::

L\'hébergement des photos est donc centralisé, la sauvegarde,
décentralisée.

## Définition d\'un workflow de gestion des photos

Une solution technique ne se suffit jamais à elle-même. J\'ai donc
défini un workflow dans lequel s\'insérait la solution.

## Définition des rôles des membres du worfklow photo

La chaîne de production graphique s\'appuie sur 3 rôles :

-   photographe ;
-   iconographe ;
-   graphiste.

Évidemment, une même personne peut assumer à tour de rôle les différents
rôles, mais il est important pour le travail d\'équipe que ces rôles ne
soient pas mélangés.

Si les deux premiers sont familiers aux membres de l\'association, celui
d\'iconographe est nouveau pour beaucoup. Je me suis tout d\'abord
demandé si je devais utiliser ce mot peu usité. J\'ai conclu que oui :
il me fallait même insister sur ce sujet qui est la clé de la réussite à
long terme du projet.

![](graphics/workflow-photo-piwigo.svg)

En effet, l\'association a vécu des années sans galerie photo et pourra
continuer à le faire, même si ce n\'est pas de manière optimale. Les
membres continueront à prendre des photos et à créer des affiches. En
revanche, l\'intérêt de la galerie est de centraliser le maximum de
photos et d\'y donner un accès rapide. Elle ne sera utilisée que si son
indexation est de qualité.

## Communication interne

Les outils et les process étant en place, restait à y faire adhérer les
parties prenantes !

J\'ai opté pour les supports de communication suivants :

-   des vidéos explicatives en ligne ;
-   un dépliant à distribuer lors des différents événements de
    l\'association.

## Didacticiels vidéo

J\'ai publié sur *YouTube* différents didacticiels, en français, anglais
et espagnol, sur l\'utilisation de la galerie par les différents types
d\'utilisateurs.

J\'ai utilisé pour cela [SimpleScreenRecorder](). Un premier essai avec
le microphone intégré de mon portable s\'étant révélé peu convaincant,
j\'ai enregistré ma voix avec un micro de bonne qualité, nommément, un
*Bird UM1*. Pressé par le temps, et parce que ces didacticiels
s\'adressent à un public restreint (et indulgent), je n\'ai pas fait de
montage, comme par exemple sous *Kdenlive*.

## Support papier

J\'ai créé un dépliant expliquant :

-   comment se connecter à la galerie ;
-   les différents types d\'utilisateurs de l\'outil (en insistant sur
    le rôle -peu connu, mais crucial - des iconographes) ;
-   l\'utilisation de la galerie par chaque type d\'utilisateurs ;
-   le workflow dans lequel s\'inscrivent les utilisateurs.

::: admonition
Modèle LaTeX du dépliant

Le [modèle LaTeX du dépliant](), partie émergée de l\'iceberg, est
publié sur *Overleaf*.

Curieusement, le PDF généré sur *Overleaf* présente des défauts que je
ne constate pas lorsque je le publie en local.

![](graphics/leaflet-pliage.png)

Pour les plus curieux, il existe [6 manières]() de plier cette brochure.
Je me suis épargné des essais fastidieux en utilisant la [classe de
documents LaTeX leaflet]().
:::

## LaTeX

Pourquoi avoir choisi [LaTeX]() pour réaliser le support *print* et non
pas un logiciel de PAO classique ? Je souhaitais pouvoir remanier le
texte sans refaire à chaque fois la mise en page. De même, je voulais
pouvoir traduire le dépliant sans effectuer de tâche de PAO manuelle.

Voici un exemple de code LaTeX :

``` tex
\section{aTag  Iconographes}

space*{ill}

egin{enumerate}[itemsep=0mm,leftmargin=*]

   \item Contactez-nous pour rejoindre l'équipe d'iconographes.
   \item Affichez une photo de l'album mph{Community}.
   \item Cliquez sur aPencil  	extbf{Mots-clés}.
   \item Ajoutez des mots-clés aux photos :

     egin{itemize}
       \item Indiquez mph{Print} si la photo convient à l'impression, mph{Web}
         dans le cas contraire.
       \item Pour que la photo soit supprimée, indiquez mph{Delete}.  Elle sera
         effacée plus tardootnote{Elle sera conservée dans la sauvegarde.}.
     nd{itemize}

nd{enumerate}

egin{center}
  \setlength{boxsep}{0pt}%
  \setlength{boxrule}{0pt}%
  box{\includegraphics[angle=5,width=\linewidth]{iconographes}}%
nd{center}
```

Le rendu PDF est illustré ci-dessous. Remarquez le calcul automatique
des césures (qui a fait l\'objet d\'une [thèse de doctorat]()). C\'est
l\'un des [nombreux avantages de LaTeX]()...

![](graphics/latex-rendu.png)

:::: note
::: title
Note
:::

Les fervents du *WYSIWYG* se tourneront avec profit vers [Gummi](). Il
s\'agit de *What you see is what you get* au sens strict (et plutôt de
*tel écran, tel imprimé* que de *tel écran, tel écrit*). On ne peut en
effet pas modifier le texte dans la fenêtre de visualisation, uniquement
dans la fenêtre de code LaTeX. Vous savez donc exactement ce qui se
passe « sous le capot » et avez une plus grande maîtrise qu\'en
déléguant la création du code de mise en page à une interface graphique.
Si vous manipulez souvent des listes numérotées et que vous avez été
confronté à des numérotations, disons... aléatoires, vous en comprendrez
tout de suite l\'avantage.

![](graphics/latex-wysiwyg-gummi.png)
::::

D\'autre part, une fois la structure du dépliant créée, il est facile de
l\'utiliser pour produire rapidement d\'autres documents. De plus, le
document peut être remanié par d\'autres personnes sans problème de
licence ou de plateforme logicielle.

## Suivi des modifications sous Git

Le suivi des modifications, que se soit sous Overleaf ou Git, prévient
efficacement les erreurs : il est très facile de visualiser les
modifications de fond ou de forme entre deux versions, de revenir à tout
moment à une version précédente, de maintenir en parallèle plusieurs
versions, etc.

<figure>
<img src="graphics/latex-historique-fond-github.png"
alt="graphics/latex-historique-fond-github.png" />
<figcaption><em>Visualisation de modifications de fond sous
GitHub</em></figcaption>
</figure>

<figure>
<img src="graphics/latex-historique-forme-github.png"
alt="graphics/latex-historique-forme-github.png" />
<figcaption><em>Visualisation de modifications de forme sous
GitHub</em></figcaption>
</figure>

Voici l\'évolution d\'un extrait du PDF compilé :

![](graphics/latex-diff-pdf.png)

On peut même envisager un travail collaboratif, synchrone ou asynchrone,
sur le même projet.

## Style rédactionnel

Puisqu\'il s\'agissait d\'un projet de communication interne, j\'ai pu
adopter un style rédactionnel décontracté. J\'ai cependant veillé à ne
pas pousser trop loin l\'aspect humoristique. Le but était avant tout
d\'être compris, dans les 3 langues (français, anglais et espagnol).

## Iconographie

Le choix iconographique s\'est avéré être un exercice de style très
intéressant.

Tout d\'abord, il s\'agissait de mettre en pratique les principes que je
mettais en avant dans le texte de la plaquette.

J\'ai voulu faire passer les messages suivants via le choix
iconographique :

Une tâche concrète

:   Bien qu\'au premier abord très abstraite, la gestion des photos
    s\'assimile à un travail bien concret : la culture d\'un potager ;
    j\'ai découvert à cette occasion que je n\'avais rien inventé, et
    que la notion de *désherbage* était familière aux iconographes.

Un travail de groupe

:   La participation à la production graphique est un travail de groupe
    et non d\'individus isolés.

    Après un premier choix d\'images représentant à chaque fois une
    personne unique, je suis passé à des photos de groupe.

Après plusieurs essais, mon choix s\'est fixé sur l\'utilisation de
photos anciennes, libres de droits ou sous licence Creative Commons.
J\'ai appliqué via *Gimp* un léger traitement des couleurs pour leur
donner un aspect plus homogène.

Et car il s\'agit de s\'amuser en procédant à ces tâches, j\'ai joué sur
un côté décalé, quitte à revenir parfois sur certains choix, dont
l\'humour était trop obscur... La photo suivante, par exemple, semblait
ne faire rire que moi et n\'apporter pas grand-chose à la compréhension
de la section *Didacticiels* :

![](graphics/Frances_Densmore_recording_Mountain_Chief2.jpg)

## Patience...

Évidemment, toute structure étant toujours plus ou moins rétive au
changement, les choses ne se passeront pas comme je l\'imagine.
Notamment, l\'équipe d\'iconographes que j\'appelle de mes vœux a peu de
chance de voir le jour et je risque d\'être le seul à indexer les photos
sous la galerie.

Je ne crois cependant pas avoir visé trop loin. Si déjà, la moitié des
photographes et des graphistes utilisent la galerie pour télécharger
leurs photos, je considère que ce projet aura été un succès.

Mais à vrai dire, c\'est déjà pour moi un succès, si j\'en juge par la
satisfaction que j\'ai de l\'avoir mené à bien...
