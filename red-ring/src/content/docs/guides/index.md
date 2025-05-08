---
title: Persona - à quoi ressemblent vos utilisateurs ?

Lorsqu\'un formateur entre dans une salle de formation, rien qu\'au
*look* des participants, il a déjà une idée de comment orienter son
discours.

::: sidebar
**`fa-history`{.interpreted-text role="awesome"} Modifications
récentes**
:::

Nous, rédacteurs techniques, sommes comme des intervenants dispensant
une formation dans une salle plongée dans le noir. N\'ayant qu\'une idée
préconçue de notre audience, nous visons large. En croyant ne pas rater
la cible, nous offrons des documentations exhaustives. Notre management
est content. Nous nous sentons fiers du travail bien fait. Mais les
utilisateurs ne trouvent pas les informations réellement pertinentes
pour eux, perdues qu\'elles sont dans une mer de détails superflus.

title: Minimalisme et persona

Carroll et Van der Meij ont prouvé empiriquement que l\'exhaustivité est
le pire écueil de la rédaction technique et que le
\[minimalisme\](<https://www.utwente.nl/en/bms/ist/minimalism/> bien
pensé était nettement plus efficace.

Lorsqu\'il utilise un nouveau produit, l\'utilisateur a un socle de
connaissance qu\'il faut exploiter. On lui fournit ainsi idéalement
uniquement l\'information dont il a besoin pour être efficace dans ses
tâches.

Pour cela, le rédacteur technique doit dresser une cartographie des
connaissances de son public, et remplir uniquement les lacunes, sortes
de Terra incognita pour les utilisateurs.

Comme il est impossible d\'établir le champ des connaissances de chaque
individu, la première tâche est de créer des *persona*, représentatives
des 2 ou 3 principales catégories d\'utilisateur.

Imaginons que l\'on dresse le portrait-robot (totalement fictif) des 2
types d\'utilisateurs du produit A : les *Gourous Linux* et les
*Windowsiens*.

+----------------+---------------+---------------+-------------------+
| ====           | Gourou Linux  |               |                   |
| ============== | ==========    |               |                   |
|                | =======+===== |               |                   |
|                | ============+ |               |                   |
|                | grap          |               |                   |
|                | hics/guru.png |               |                   |
|                | \|graphics/w  |               |                   |
|                | indowsien.png |               |                   |
+----------------+---------------+---------------+-------------------+
|                |               |               |                   |
+----------------+---------------+---------------+-------------------+
| Trait de       | Aime savoir   | Aime que les  |                   |
| personnalité   | comment       | choses        |                   |
|                |               |               |                   |
| principal      | fonctionnent  | fonctionnent. |                   |
|                | les choses.   |               |                   |
+----------------+---------------+---------------+-------------------+
| Sexe           | 90 % hommes   | 50/50         |                   |
|                |               | hommes/femmes |                   |
+----------------+---------------+---------------+-------------------+
| Titre          | Ingénieur     | A             |                   |
|                | réseau        | dministrateur |                   |
|                |               | système       |                   |
+----------------+---------------+---------------+-------------------+
| Âge            | \>=25         | \>= 45        |                   |
+----------------+---------------+---------------+-------------------+
| Niveau         | Bac + 5       | Variable      |                   |
| d\'études      |               |               |                   |
+----------------+---------------+---------------+-------------------+
| Secteur        | Industrie     | Services      |                   |
+----------------+---------------+---------------+-------------------+
| Taille de      | Grande        | Moyenne       |                   |
| l\'entreprise  |               |               |                   |
+----------------+---------------+---------------+-------------------+
| Moyen de       | Email         | Téléphone     |                   |
|                |               |               |                   |
| communication  |               |               |                   |
|                |               |               |                   |
| favori         |               |               |                   |
+----------------+---------------+---------------+-------------------+
| OS             | Linux         | Windows       |                   |
+----------------+---------------+---------------+-------------------+
|                | macOS         |               |                   |
+----------------+---------------+---------------+-------------------+
|                | FreeBSD       |               |                   |
+----------------+---------------+---------------+-------------------+
| Type           | Ligne de      | Interfaces    |                   |
| d\'interface   | commande      | graphiques    |                   |
| préféré        |               |               |                   |
+----------------+---------------+---------------+-------------------+
| Couche         | IHM           | IHM           |                   |
| logicielle     |               |               |                   |
| ciblée         |               |               |                   |
+----------------+---------------+---------------+-------------------+
|                | Middleware    |               |                   |
+----------------+---------------+---------------+-------------------+
|                | Firmware      |               |                   |
+----------------+---------------+---------------+-------------------+
| Outils         | OpenSSL       | PuTTY         |                   |
| quotidiens     |               |               |                   |
+----------------+---------------+---------------+-------------------+
|                | Vim/Emacs     | Notepad++     |                   |
+----------------+---------------+---------------+-------------------+
|                | ip            | SolarWinds    |                   |
+----------------+---------------+---------------+-------------------+
|                | netstat       | Nagios        |                   |
+----------------+---------------+---------------+-------------------+
|                | tcpdump       |               |                   |
+----------------+---------------+---------------+-------------------+
| R              | Conception et | F             |                   |
| esponsabilités |               | onctionnement |                   |
|                | gestion       | du            |                   |
|                | réseau        |               |                   |
|                |               | système       |                   |
|                |               | informatique  |                   |
+----------------+---------------+---------------+-------------------+
| PKIs           | Performance   | Disponibilité |                   |
|                | et            | du SI         |                   |
|                |               |               |                   |
|                | disponibilité |               |                   |
|                |               |               |                   |
|                | des sites web |               |                   |
+----------------+---------------+---------------+-------------------+
| N+1            | Responsable   | CEO           |                   |
|                | de            |               |                   |
|                |               |               |                   |
|                | l\            |               |                   |
|                | 'exploitation |               |                   |
+----------------+---------------+---------------+-------------------+
| Défis          | Gestion de    | Gestion de    |                   |
| principaux     | projet        | projets       |                   |
+----------------+---------------+---------------+-------------------+
|                | Résolution    | Résolution    |                   |
|                | d\'incidents  | d\'incidents  |                   |
+----------------+---------------+---------------+-------------------+
|                | Prise de      |               |                   |
|                | décision      |               |                   |
+----------------+---------------+---------------+-------------------+

D\'après ces *persona*, dont il faut vérifier la véracité sur le
terrain, on peut imaginer fournir plus d\'informations conceptuelles au
*gourou Linux* qu\'au *Windowsien*. Et fournir ainsi à chacun une
documentation qui répond le mieux à ses attentes.

Même si l\'on n\'identifie qu\'un seul type d\'utilisateur, il est
toujours utile d\'en dresser le portrait type, afin de faciliter la
communication en interne? Expliciter les présupposés de chacun est
toujours une bonne idée.

::: {.toctree hidden=""}
diminuer-les-couts-ameliorer-la-satisfaction-client
redaction-technique-un-processus-industriel format-structure-dita-xml
mener-un-projet-de-bout-en-bout le-coin-du-geek a-propos-de-ce-blog
contact
:::
