# Git - du fichier au contenu

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Vous êtes habitué à manipuler des fichiers ? Git vous invite à penser
autrement. Avantage : vous avez une maîtrise beaucoup plus grande de
votre contenu.
:::

Qu\'est-ce qu\'un fichier ? Pour vous, un contenu, image, texte, feuille
de calcul ou autre, identifié par un nom. Pour votre système
d\'exploitation, une suite de bits sur le disque dur à laquelle sont
associés un nom de fichier et un chemin de répertoires. Si vous
souhaitez gérer votre projet en termes de fichiers sous Git, vous allez
au-devant de maintes difficultés. Si vous pensez plutôt en termes de
contenu, tout devient beaucoup plus simple.

Si vous donnez un fichier à Git, il le scinde directement en deux
choses :

-   un contenu (suite de bits, ou *blob*),
-   un arbre (lien entre le nom de fichier et le contenu).

Il le stocke ensuite dans l\'une des deux zones suivantes :

-   l\'index (zone temporaire),
-   la base de données d\'objets (zone persistante).

Lorsque vous ajoutez un fichier (*git add \<fichier\>*) :

-   l\'arbre est placé dans l\'index,
-   le contenu est placé dans la base d\'objets.

Lorsque vous *commitez* un fichier (*git commit*) :

-   l\'arbre est placé dans la base d\'objets.

Git ne compare jamais deux fichiers entre eux. Il compare leur résumé,
qui est un nombre unique calculé à partir de leur contenu. Si le résumé
de deux fichiers est identique, le contenu de ces fichiers est
indentique (au bit près).

L\'historique de votre projet n\'est pas forcément linéaire : vous
pouvez lui faire suivre plusieurs routes parallèles, les branches.

Vous ne pouvez créer des branches qu\'à partir d\'un *commit*. Il faut
voir les *commits* comme des ronds-points (la route étant l\'historique
de votre projet) à partir desquels vous pouvez, si vous le souhaitez,
prendre une autre direction dans votre projet.

Si vous créez une branche, disons *test*, alors que des modifications de
votre espace de travail ne sont pas *commitées* dans votre branche
*master*, les modifications que vous effectuerez s\'appliqueront aux
fichiers non *commités* de votre espace de travail. Si vous faites une
erreur, vous ne pourrez pas retrouver le *statu quo ante* de vos
fichiers en revenant à la branche *master*.

Si vous voulez enregistrer votre travail au fil de l\'eau afin de
pouvoir revenir à tout moment à un état antérieur, il vous faut donc
*committer* régulièrement et sauvegarder votre espace de travail,
répertoire *.git* y compris, par exemple *via* rsync. Lorsque vous
déciderez de partager votre travail, vous pourrez déplacer, fusionner ou
supprimer vos *commits* avant de les envoyer sous forme de patchs ou de
les déposer sur un dépôt central.

::: {.toctree hidden=""}
faire-sauter-les-goulets-etranglement-avec-les-branches
organiser-son-historique-avec-git-rebase
:::
