#! /usr/bin/python

"""

   Demande à l'utilisateur de saisir la tirade de M. Jourdain et en affiche
   une variante. Fonctionne uniquement avec la tirade suivante :

   Belle marquise, vos beaux yeux me font mourir d'amour.

"""

# Importation de la bibliothèque d'expressions régulières.
import re

# Le programme demande à l'utilisateur de saisir la tirade et la place dans
# une variable.
texte_original = input("Entrez la tirade de M. Jourdain : ")
# Suppression du point final de la tirade.
texte_original_sans_point = texte_original.strip('.')
# Conversion de la chaîne de caractères en liste de mots.
texte_melange = re.split(' ',texte_original_sans_point)
# Création d'une variable globale contenant une chaîne de caractères vide.
texte_final = ""

# Après vérification que la tirade comporte bien 9 mots, affichage du premier
# mot de la tirade modifiée, avec une lettre capitale.
if len(texte_melange) == 9:
   print(str.capitalize(texte_melange[8]),end="")

   # Une boucle ajoute à la chaîne de caractères initialement vide les mots de
   # la tirade de M. Jourdain, à l'exception du premier et du dernier, dans
   # l'ordre voulu.

   for i in [7,5,6,0,1,2,3]:
      texte_final = texte_final + " " + str.lower(texte_melange[i])

   # Affichage du texte final, suivi d'un point.
   print(texte_final,end=" ")
   print(str.lower(texte_melange[4]),end="")
   print(".")

else:
   print("La tirade doit comporter neuf mots exactement.")   
