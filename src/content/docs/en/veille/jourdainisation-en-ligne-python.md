---
title: "Shuffling words"
description: "Like the philosophy master in Molière's Bourgeois gentilhomme, a Python script can easily switch words in a sentence to say the same thing in a more convoluted way."
---

Like the master philosopher in Molière's Bourgeois gentilhomme, a Python script can easily swap words in a sentence to say the same thing in a more convoluted way:

So it's up to you to update your tirade with this online Python script:

<iframe src="https://oliviercarrere.pythonanywhere.com/" height="600px" width="100%"></iframe>

Here's the script code, based on the Flask web microframework:

```python
#!/usr/bin/python3
# coding: utf8

"""

Generates sentence variations based on M. Jourdain's tirade
from Molière's Bourgeois gentilhomme :

Belle Marquise, your beautiful eyes make me die of love

"""

from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def entry_page() -> 'html':
    """Returns the entry form to the browser."""
    return render_template('entry.html',
                           the_title='Jourdainize your tirade!')


@app.route('/jourdain', methods=['POST'])
def jourdain() -> 'html':
    """
    Returns the result of a call to the 'word_switch' function to the browser.
    """
    belle0 = request.form['belle']
    marquise1 = request.form['marquise']
    vos2 = request.form['vos']
    beaux3 = request.form['beaux']
    eyes4 = request.form['eyes']
    me5 = request.form['me']
    font6 = request.form['font']
    die7 = request.form['die']
    damour8 = request.form['damour']
    tir = []
    tir.append(belle0)
    tir.append(marquise1)
    tir.append(vos2)
    tir.append(beaux3)
    shot.append(eyes4)
    shot.append(me5)
    tir.append(font6)
    tir.append(mourir7)
    shot.append(damour8)

    """
    8 7 5 6, 0 1, 2 3 4
    D'amour mourir me font, belle Marquise, vos beaux yeux
    """
    results0 = (str.capitalize(tir[8]) + ' ' + tir[7] + ' ' + tir[5] +
                ' ' + shot[6] + ', ' + str.lower(shot[0]) + ' ' + shot[1] +
                ', ' + shot[2] + ' ' + shot[3] + ' ' + shot[4] + '.')

    """
    2 4 3 8 5 6, 0 1, 7
    Your beautiful eyes of love make me, beautiful Marquise, die
    """
    results1 = (str.capitalize(tir[2]) + ' ' + tir[4] + ' ' + tir[3] + ' ' +
                shot[8] + ' ' + shot[5] + ' ' + shot[6] + ', ' +
                str.lower(shot[0]) + ' ' + shot[1] + ', ' + shot[7] + '.')

    """
    7 2 3 4, 0 1, 8 5 6
    Die your beautiful eyes, beautiful Marquise, of love make me
    """
    results2 = (str.capitalize(tir[7]) + ' ' + tir[2] + ' ' + tir[3] +
                ' ' + shot[4] + ', ' + str.lower(shot[0]) + ' ' + shot[1] + ', ' +
                shot[8] + ' ' + shot[5] + ' ' + shot[6] + '.')

    """
    5 6 2 4 3 7, 0 1, 8
    Me font vos yeux beaux mourir, belle Marquise, d'amour.
    """
    results3 = (str.capitalize(tir[5]) + ' ' + tir[6] + ' ' + tir[2] +
                ' ' + tir[4] + ' ' + tir[3] + ' ' + tir[7] + ', ' +
                str.lower(shot[0]) + ' ' + shot[1] + ', ' + shot[8] + '.')

    return render_template('results.html',
                           the_title='Here's the tirade jourdainisée!',
                           the_results0=results0,
                           the_results1=results1,
                           the_results2=results2,
                           the_results3=results3)

if __name__ == '__main__':
    app.run(debug=True)
```

It would have been fun to play with the list methods as shown below, but this would have meant deleting the spaces before the commas we would have inserted in the list:

```python
#! /usr/bin/python3
# coding: utf-8

phrase = "Belle Marquise your beautiful eyes make me die of love"
list = phrase.split()
list.insert(3, list.pop(4))
final_text = ' '.join(list)
final_text = final_text.capitalize() + '.'
print(final_text)
```

Here are the templates for generating the basic HTML pages, input and output, based on Jinja :

```html
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

```html
{% extends 'base.html' %}

{% block body %}

<h2>{{ the_title }}</h2>

<form method='POST' action='/jourdain'>
<table>
<p>Enter your tirade:</p>
<tr><td><input name='belle' type='TEXT' width='60' value='Belle'></td></tr>
<tr><td><input name='marquise' type='TEXT' value='Marquise'></td></<tr>
<tr><td><input name='vos' type='TEXT' width='60' value='vos'></td></tr>
<tr><td><input name='beaux' type='TEXT' value='beaux'></td></<tr>
<tr><td><input name='eyes' type='TEXT' value='eyes'></td></<tr>
<tr><td><input name='me' type='TEXT' value='me'></td></<tr>
<tr><td><input name='font' type='TEXT' value='font'></td></tr>
<tr><td><input name='die' type='TEXT' value='die'></td></<tr>
<tr><td><input name='damour' type='TEXT' value='d'amour'></td></tr>
</table>

<p><input value='Jourdainiser' type='SUBMIT'></p>
</form>

{% endblock %}
```

```html
{% extends 'base.html' %}

{% block body %}

<h2>{{ the_title }}</h2>


<p>{{ the_results0 }}</p>
<p>{{ the_results1 }}</p>
<p>{{ the_results2 }}</p>
<p>{{ the_results3 }}</p>

{% endblock %}
```

And finally, the CSS style sheet:

```css
body {
  font-family: Verdana, Geneva, Arial, sans-serif;
  font-size: medium;
  background-color: white;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 5%;
  margin-right: 5%;
  border: 1px dotted gray;
  padding: 1px 1px 1px 1px;
}
a {
  text-decoration: none;
  font-weight: 400;
}
a:hover {
  text-decoration: underline;
}
a img {
  border: 0;
}
h2 {
  font-size: 100%;
}

/*** Tables ***/

table {
font-size: 1em;
background-color: white;
border: 1px solid #909090;
color: white;
padding: 1px 1px 1px;
border-collapse: collapse;
}

td, th {
border: thin dotted gray;
}

/*** Inputs ***/
input[type=text] {
  font-size: 100%;
  width: 15em;
}
input[type=submit] {
  font-size: 105%;
}
select {
  font-size: 105%;
}
```
