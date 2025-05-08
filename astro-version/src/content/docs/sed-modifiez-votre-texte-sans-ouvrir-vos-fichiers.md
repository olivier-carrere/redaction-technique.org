# sed : modifiez votre texte sans ouvrir vos fichiers

::: sidebar
**`fa-bullhorn`{.interpreted-text role="awesome"}**

Les clones d\'Unix sont peu utilisés pour gérer la documentation
technique. Ceci est étrange si l\'on songe à la pléthore d\'outils
disponibles sous ces plateformes pour manipuler du texte dans tous les
sens.
:::

Prenons l\'exemple du dialogue entre entre M. Jourdain et son maître de
philosophie, dans le *Bourgeois gentilhomme* de Molière :

*MONSIEUR JOURDAIN :*

:   *\[\...\] Je voudrais donc lui mettre dans un billet : « Belle
    marquise, vos beaux yeux me font mourir d\'amour » ; mais je
    voudrais que cela fût mis d\'une manière galante, que cela fût
    tourné gentiment.*

\[\...\]

*MAÎTRE DE PHILOSOPHIE :*

:   *On les peut mettre premièrement comme vous avez dit : Belle
    marquise, vos beaux yeux me font mourir d\'amour. Ou bien : D\'amour
    mourir me font, belle marquise, vos beaux yeux. Ou bien : Vos yeux
    beaux d\'amour me font, belle marquise, mourir. Ou bien : Mourir vos
    beaux yeux, belle marquise, d\'amour me font. Ou bien : Me font vos
    yeux beaux mourir, belle marquise, d\'amour.*

Commençons par afficher la phrase d\'origine dans un terminal :

``` console
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour."
Belle marquise, vos beaux yeux me font mourir d'amour.
```

Il s\'agit maintenant d\'intervertir les mots de la phrase, pour en
créer une nouvelle. Pour une simple transposition, on pourrait juger
plus facile d\'utiliser *awk*. *awk* ne gère en effet pas des lignes,
mais des *champs* d\'un *enregistrement* (d\'une ligne), délimités par
défaut par des espaces. Autrement dit, *awk* traite le texte comme une
base de données. Il peut facilement afficher toute la ligne, ou
seulement un ou plusieurs champs, dans l\'ordre souhaité. Les champs
sont indiqués sous la forme *\$n*, où n indique la position du champ
dans la ligne, à partir de la gauche. Ainsi *\$1* indique le premier
champ, *\$2* le dernier, etc. *\$0* correspond à toute la ligne.

Nous allons donc donner la déclaration d\'amour de M. Jourdain en entrée
d\'un programme *awk* d\'une ligne, grâce au symbole de redirection
*pipeline* (\|).

``` console
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
awk  '{print $9" "$8" "$6" "$7" "$1" "$2" "$3" "$4" "$5}'
d'amour. mourir me font Belle marquise, vos beaux yeux
```

La sortie de la commande *echo* n\'est pas affichée. Ce qui est affiché,
c\'est la sortie du programme *awk*, dont la sortie de la commande
*echo*, soit la déclaration d\'amour de M. Jourdain, était l\'entrée.

La sortie finale ne correspond cependant pas à ce que l\'on souhaitait.
Les *champs* ne correspondent pas trait pour trait à des mots. Il
faudrait donc raffiner la commande *awk*.

Il est plus simple de se tourner vers *sed*. *sed* sélectionne dans des
lignes des ensembles de caractères cités littéralement, ou *via* des
méta-caractères dans des *expressions rationnelles* (ou *expressions
régulières*). Un méta-caractère connu des expressions rationnelles est
le signe \*, indiquant, en ligne de commande, zéro ou un nombre indéfini
de caractères, comme dans :

``` console
$ ls *.rst
```

*sed* gère également des *références arrières*, qui affichent à
l\'endroit où on le souhaite la valeur correspondant à une expression
littérale ou rationnelle trouvée auparavant. Heureusement pour nous, la
déclaration d\'amour de M. Jourdain contient exactement neuf mots, ce
qui correspond au nombre maximal de références arrières possibles.

``` console
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
sed "s#\(.*\) \(.*\), \(.*\) \(.*\) \(.*\) \(.*\) \(.*\) \\
\(.*\)\(d'.*\)#\9 \8 \6 \7, \1 \2, \3 \4 \5#"
d'amour. mourir me font, Belle marquise, vos beaux yeux
```

Nous buttons sur le même problème : l\'expression régulière .\* ne
correspond pas à un mot, mais à une suite de caractères, ponctuation
comprise. Il faut alors utiliser la forme \<.\*\>, qui correspond à un
mot tel que ceux dont M. Jourdain se sert pour faire de la prose. Nous
allons utiliser les caractères d\'échappement (barre oblique inverse \\)
pour que les signes \< et \> ne soient pas interprétés littéralement
sous certaines consoles, mais comme des méta-caractères ayant une
fonction spéciale :

``` console
$ export \
p="\(\<.*\>\) \(\<.*\>\), \(\<.*\>\) \(\<.*\>\) \\
\(\<.*\>\) \(\<.*\>\) \(\<.*\>\) \(\<.*\>\) \(d'\<.*\>\)"
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
sed "s#$p#\9 \8 \6 \7, \1 \2, \3 \4 \5#"
d'amour mourir me font, Belle marquise, vos beaux yeux.
```

Nous pourrions également utiliser la forme \[\[:alpha:\]\]\* qui fait
gagner en lisibilité, mais perdre en concision :

``` console
$ export a="[[:alpha:]]"
$ export n="\($a*\) \($a*\), \($a*\) \($a*\) \($a*\) \\
\($a*\) \($a*\) \($a*\) \(d'$a*\)"
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
sed "s#$n#\9 \8 \6 \7, \1 \2, \3 \4 \5#"
d'amour mourir me font, Belle marquise, vos beaux yeux.
```

C\'est mieux, mais nous avons un problème de capitalisation. Nous allons
donc utiliser les opérateurs /u et /l placés judicieusement. Auparavant,
nous allons exporter des variables pour rendre le script plus concis et
plus lisible :

``` console
$ export w="\(\<.*\>\)"
$ export m="$w $w, $w $w $w $w $w $w"
```

``` console
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
sed "s#$m \(d'\<.*\>\)#\u\9 \8 \6 \7, \l\1 \2, \3 \4 \5#"
D'amour mourir me font, belle marquise, vos beaux yeux.
```

Nous pouvons maintenant facilement redistribuer les références arrières
pour obtenir toutes les variations du maître de philosophie :

``` console
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
sed "s#$m \(d'\<.*\>\)#\u\3 \5 \4 \9 \6 \7, \l\1 \2, \8#"
Vos yeux beaux d'amour me font, belle marquise, mourir.
```

``` console
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
sed "s#$m \(d'\<.*\>\)#\u\8 \3 \4 \5, \l\1 \2, \9 \6 \7#"
Mourir vos beaux yeux, belle marquise, d'amour me font.
```

``` console
$ echo "Belle marquise, vos beaux \\
yeux me font mourir d'amour." |
sed "s#$m \(d'\<.*\>\)#\u\6 \7 \3 \5 \4 \8, \l\1 \2, \9#"
Me font vos yeux beaux mourir, belle marquise, d'amour.
```

## Molière et GNU/Linux

Réécrivons le dialogue de M. Jourdain et de son maître de philosophie en
style *geek* :

MONSIEUR JOURDAIN :

:   Je voudrais donc lui afficher sur la sortie standard :

    ``` console
    $ Belle marquise, vos beaux yeux me font mourir d'amour.
    ```

    Mais je voudrais que cela fût mis d\'une manière galante, que cela
    fût tourné gentiment.

MAÎTRE DE PHILOSOPHIE :

:   On les peut mettre premièrement comme vous avez dit :

    ``` console
    $ echo "Belle marquise, vos beaux \\
    yeux me font mourir d'amour."
    ```

    Ou bien :

    ``` console
    $ export declaration="Belle marquise, vos \\
    beaux yeux me font mourir d'amour."
    $ echo $declaration
    ```

    Ou bien :

    ``` console
    $ export w="\(\<.*\>\)"
    $ export m="$w $w, $w $w $w $w $w $w"
    $ echo $declaration |
    sed "s#$m \(d'\<.*\>\)#\u\9 \8 \6 \7, \l\1 \2, \3 \4 \5#"
    ```

    Ou bien :

    ``` console
    $ echo $declaration |
    sed "s#$m \(d'\<.*\>\)#\u\3 \5 \4 \9 \6 \7, \l\1 \2, \8#"
    ```

    Ou bien :

    ``` console
    $ echo $declaration |
    sed "s#$m \(d'\<.*\>\)#\u\8 \3 \4 \5, \l\1 \2, \9 \6 \7#"
    ```

    Ou bien :

    ``` console
    $ echo $declaration |
    sed "s#$m \(d'\<.*\>\)#\u\6 \7 \3 \5 \4 \8, \l\1 \2, \9#"
    ```

## Beaucoup d\'efforts...

Certes, beaucoup d\'efforts pour pas grand chose, me direz-vous. Mais
imaginons un fichier qui contiennent 1000 phrases de la même structure :

Cher docteur, ces grands malheurs vous font pleurer d\'amertume. Petit
garçon, cette bonne glace te fait saliver d\'envie. Vaste océan, la
forte houle te fait tanguer d\'ivresse.

Ceci est en l\'occurrence peu probable, mais il est en revanche monnaie
courante de trouver dans la documentation technique des phrases de même
structure, pour des raisons d\'homogénéité stylistique.

Pour effectuer nos tests sur un échantillon, plaçons les trois phrases
précédentes dans un fichier :

``` console
$ echo "Cher docteur, ces grands malheurs \\
vous font pleurer d'amertume." > variations.txt

$ echo "Petit garçon, cette bonne glace te \\
fait saliver d'envie." >> variations.txt

$ echo "Vaste océan, la forte houle te \\
fait tanguer d'ivresse." >> variations.txt
```

Plaçons les différentes commandes *sed* dans un script différent
chacune :

``` console
$ echo "s#$p#\u\9 \8 \6 \7, \l\1 \2, \3 \4 \5#" > moliere1.sed
$ echo "s#$p#\u\3 \5 \4 \9 \6 \7, \l\1 \2, \8#" > moliere2.sed
$ echo "s#$p#\u\8 \3 \4 \5, \l\1 \2, \9 \6 \7#" > moliere3.sed
$ echo "s#$p#\u\6 \7 \3 \5 \4 \8, \l\1 \2, \9#" > moliere4.sed
```

Exécutons maintenant en boucle tous les scripts *sed* sur toutes les
lignes du fichier :

``` console
$ for (( i=1; i<5; i++ )); do
   while read s;
    do echo "$s" |
     sed -f moliere$i.sed ;
    done < variations.txt
   done
D'amertume pleurer vous font, cher docteur, ces grands malheurs.
D'envie saliver te fait, petit garçon, cette bonne glace.
D'ivresse tanguer te fait, vaste océan, la forte houle.
Ces malheurs grands d'amertume vous font, cher docteur, pleurer.
Cette glace bonne d'envie te fait, petit garçon, saliver.
La houle forte d'ivresse te fait, vaste océan, tanguer.
Pleurer ces grands malheurs, cher docteur, d'amertume vous font.
Saliver cette bonne glace, petit garçon, d'envie te fait.
Tanguer la forte houle, vaste océan, d'ivresse te fait.
Vous font ces malheurs grands pleurer, cher docteur, d'amertume.
Te fait cette glace bonne saliver, petit garçon, d'envie.
Te fait la houle forte tanguer, vaste océan, d'ivresse.
```

Et voilà. En quelques instants, sans jamais ouvrir un seul fichier, nous
appliquons une suite d\'opérations complexes sur un nombre indéfini de
phrases de même structure. Ce qui n\'est pas possible sous un traitement
de texte ou autre outil muni d\'une interface graphique, ou sur des
fichiers binaires.

::: seealso
-   `jourdainisation-en-ligne-python`{.interpreted-text role="ref"}
-   `expressions-regulieres-python`{.interpreted-text role="ref"}
:::
