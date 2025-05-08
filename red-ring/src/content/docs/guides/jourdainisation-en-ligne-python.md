---
title: Jourdainisation en ligne d\'une tirade
description: A guide in my new Starlight docs site.
---

À l\'instar du maître de philosophie du *Bourgeois gentilhomme* de
Molière, un script Python peut facilement intervertir les mots d\'une
phrase pour dire la même chose de manière plus alambiquée  :

À vous donc de jourdainiser votre tirade via ce script Python en ligne :

<iframe src="https://oliviercarrere.pythonanywhere.com/" height="600px" width="100%"></iframe>

Voici le code du script, qui repose sur le *microframework* web
[Flask]() :

::: {.literalinclude language="python3" caption=""}
code/word_switch_web.py
:::

Il aurait été amusant de jouer avec les méthodes de liste comme
ci-dessous, mais cela aurait nécessité de supprimer par la suite les
espaces avant les virgules que nous aurions insérées dans la liste :

``` python
#! /usr/bin/python3

phrase = "Belle Marquise vos beaux yeux me font mourir d’amour"
liste = phrase.split()
liste.insert(3, liste.pop(4))
texte_final = ' '.join(liste)
texte_final = texte_final.capitalize() + '.'
print(texte_final)
```

Voici maintenant les modèles générant les pages HTML de base, d\'entrée
et de sortie, basés sur [Jinja]() :

::: {.literalinclude language="html" caption=""}
code/templates/base.html
:::

::: {.literalinclude language="html" caption=""}
code/templates/entry.html
:::

::: {.literalinclude language="html" caption=""}
code/templates/results.html
:::

Et enfin, la feuille de style CSS :

::: {.literalinclude language="css" caption=""}
code/static/form.css
:::

::: seealso
-   `sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers`{.interpreted-text
    role="ref"}
-   `expressions-regulieres-python`{.interpreted-text role="ref"}
:::
