#! /usr/bin/python
# coding: utf8

'''

   Demande à l'utilisateur de saisir la tirade de M. Jourdain et en
   affiche une variante. Fonctionne uniquement avec la tirade
   suivante ou comportant le même nombre de mots, entrée entre guillemets :

   "Belle marquise, vos beaux yeux me font mourir d'amour."

'''

# Importation de la bibliothèque d'expressions régulières.
import re

# Le programme demande à l'utilisateur de saisir la tirade et la place dans
# une variable.
texte_original = input('Entrez la tirade de M. Jourdain entre guillemets : ')
# Suppression du point final de la tirade.
texte_original_sans_point = texte_original.strip('.')
# Conversion de la chaîne de caractères en liste de mots.
texte_melange = re.split(' ', texte_original_sans_point)
# Création d'une variable globale contenant une chaîne de caractères vide.
texte_final = ''

# Après vérification que la tirade comporte bien 9 mots, affichage du premier
# mot de la tirade modifiée, avec une lettre capitale.
if len(texte_melange) == 9:
    # Une boucle ajoute à la chaîne de caractères initialement vide les mots de
    # la tirade de M. Jourdain, à l'exception du premier et du dernier, dans
    # l'ordre voulu.

    for i in [7, 5, 6, 0, 1, 2, 3]:
        texte_final = texte_final + ' ' + str.lower(texte_melange[i])

    # Affichage du texte final, suivi d'un point.
    print(str.capitalize(texte_melange[8]) + texte_final + ' ' +
          str.lower(texte_melange[4]) + '.')

else:
    print('La tirade doit comporter neuf mots exactement.')
