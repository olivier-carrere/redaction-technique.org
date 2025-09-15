---
title: "Jourdainisation en ligne d'une tirade"
description: "À l'instar du maître de philosophie du Bourgeois gentilhomme de Molière, un script Python peut facilement intervertir les mots d'une phrase pour dire la même chose de manière plus alambiquée."
---

À l'instar du maître de philosophie du Bourgeois gentilhomme de Molière, un script Python peut facilement intervertir les mots d'une phrase pour dire la même chose de manière plus alambiquée :

À vous donc de jourdainiser votre tirade via ce script Python en ligne :

<iframe src="https://oliviercarrere.pythonanywhere.com/" height="600px" width="100%"></iframe>

Voici le code du script, qui repose sur le microframework web [Flask]() :

```
#!/usr/bin/python3
# coding: utf8

"""

Génère des variations de phrases basées sur la tirade de M. Jourdain
du Bourgeois gentilhomme de Molière :

Belle Marquise, vos beaux yeux me font mourir d’amour

"""

from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def entry_page() -> 'html':
    """Renvoie le formulaire d'entrée au navigateur."""
    return render_template('entry.html',
                           the_title='Jourdainisez votre tirade !')


@app.route('/jourdain', methods=['POST'])
def jourdain() -> 'html':
    """
    Renvoie le résultat d'un appel à la fonction 'word_switch' au navigateur.
    """
    belle0 = request.form['belle']
    marquise1 = request.form['marquise']
    vos2 = request.form['vos']
    beaux3 = request.form['beaux']
    yeux4 = request.form['yeux']
    me5 = request.form['me']
    font6 = request.form['font']
    mourir7 = request.form['mourir']
    damour8 = request.form['damour']
    tir = []
    tir.append(belle0)
    tir.append(marquise1)
    tir.append(vos2)
    tir.append(beaux3)
    tir.append(yeux4)
    tir.append(me5)
    tir.append(font6)
    tir.append(mourir7)
    tir.append(damour8)

    """
    8 7 5 6, 0 1, 2 3 4
    D’amour mourir me font, belle Marquise, vos beaux yeux
    """
    results0 = (str.capitalize(tir[8]) + ' ' + tir[7] + ' ' + tir[5] +
                ' ' + tir[6] + ', ' + str.lower(tir[0]) + ' ' + tir[1] +
                ', ' + tir[2] + ' ' + tir[3] + ' ' + tir[4] + '.')

    """
    2 4 3 8 5 6, 0 1, 7
    Vos yeux beaux d’amour me font, belle Marquise, mourir
    """
    results1 = (str.capitalize(tir[2]) + ' ' + tir[4] + ' ' + tir[3] + ' ' +
                tir[8] + ' ' + tir[5] + ' ' + tir[6] + ', ' +
                str.lower(tir[0]) + ' ' + tir[1] + ', ' + tir[7] + '.')

    """
    7 2 3 4, 0 1, 8 5 6
    Mourir vos beaux yeux, belle Marquise, d’amour me font
    """
    results2 = (str.capitalize(tir[7]) + ' ' + tir[2] + ' ' + tir[3] +
                ' ' + tir[4] + ', ' + str.lower(tir[0]) + ' ' + tir[1] + ', ' +
                tir[8] + ' ' + tir[5] + ' ' + tir[6] + '.')

    """
    5 6 2 4 3 7, 0 1, 8
    Me font vos yeux beaux mourir, belle Marquise, d’amour.
    """
    results3 = (str.capitalize(tir[5]) + ' ' + tir[6] + ' ' + tir[2] +
                ' ' + tir[4] + ' ' + tir[3] + ' ' + tir[7] + ', ' +
                str.lower(tir[0]) + ' ' + tir[1] + ', ' + tir[8] + '.')

    return render_template('results.html',
                           the_title='Voici la tirade jourdainisée !',
                           the_results0=results0,
                           the_results1=results1,
                           the_results2=results2,
                           the_results3=results3)

if __name__ == '__main__':
    app.run(debug=True)
```

Il aurait été amusant de jouer avec les méthodes de liste comme ci-dessous, mais cela aurait nécessité de supprimer par la suite les espaces avant les virgules que nous aurions insérées dans la liste :

``` python
#! /usr/bin/python3
# coding: utf-8

phrase = "Belle Marquise vos beaux yeux me font mourir d’amour"
liste = phrase.split()
liste.insert(3, liste.pop(4))
texte_final = ' '.join(liste)
texte_final = texte_final.capitalize() + '.'
print(texte_final)
```

Voici maintenant les modèles générant les pages HTML de base, d'entrée et de sortie, basés sur [Jinja]() :

```
<!doctype html>
<html>
    <head>
        <title>{{ the_title }}</title>
        <link rel="stylesheet" href="static/form.css" />
    </head>
    <body>
        {% block body %}

        {% endblock %}
    </body>
</html>
```

```
{% extends 'base.html' %}

{% block body %}

<h2>{{ the_title }}</h2>

<form method='POST' action='/jourdain'>
<table>
<p>Entrez votre tirade :</p>
<tr><td><input name='belle' type='TEXT' width='60' value='Belle'></td></tr>
<tr><td><input name='marquise' type='TEXT' value='Marquise'></td></<tr>
<tr><td><input name='vos' type='TEXT' width='60' value='vos'></td></tr>
<tr><td><input name='beaux' type='TEXT' value='beaux'></td></<tr>
<tr><td><input name='yeux' type='TEXT' value='yeux'></td></<tr>
<tr><td><input name='me' type='TEXT' value='me'></td></<tr>
<tr><td><input name='font' type='TEXT' value='font'></td></tr>
<tr><td><input name='mourir' type='TEXT' value='mourir'></td></<tr>
<tr><td><input name='damour' type='TEXT' value='d’amour'></td></tr>
</table>

<p><input value='Jourdainiser' type='SUBMIT'></p>
</form>

{% endblock %}
```

```
{% extends 'base.html' %}

{% block body %}

<h2>{{ the_title }}</h2>


<p>{{ the_results0 }}</p>
<p>{{ the_results1 }}</p>
<p>{{ the_results2 }}</p>
<p>{{ the_results3 }}</p>

{% endblock %}
```

Et enfin, la feuille de style CSS :

```
body {
  font-family:      Verdana, Geneva, Arial, sans-serif;
  font-size:        medium;
  background-color: white;
  margin-top:       5%;
  margin-bottom:    5%;
  margin-left:      5%;
  margin-right:     5%;
  border:           1px dotted gray;
  padding:          1px 1px 1px 1px;
}
a {
  text-decoration:  none; 
  font-weight:      400; 
}
a:hover {
  text-decoration:  underline;
}
a img {
  border:           0;
}
h2 {
  font-size:        100%;
}

/*** Tables ***/

table {
font-size:          1em;
background-color:   white;
border:             1px solid #909090;
color:              white;
padding:            1px 1px 1px;
border-collapse:    collapse;
}

td, th {
border:             thin dotted gray;
}

/*** Inputs ***/
input[type=text] {
  font-size:        100%;
  width:            15em;
}
input[type=submit] {
  font-size:        105%;
}
select {
  font-size:        105%;
}
```
