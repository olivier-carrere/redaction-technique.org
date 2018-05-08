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
