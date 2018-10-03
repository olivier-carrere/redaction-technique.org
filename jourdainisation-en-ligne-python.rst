.. Copyright 2011-2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: yes

.. _jourdainisation-en-ligne-python:

Jourdainisation en ligne d'une tirade
=====================================

À l'instar du maître de philosophie du *Bourgeois gentilhomme* de
Molière, un script Python peut facilement intervertir les mots d'une
phrase pour dire la même chose de manière plus alambiquée  :

À vous donc de jourdainiser votre tirade via ce script Python en ligne :

.. raw:: html

    <iframe src="https://oliviercarrere.pythonanywhere.com/" height="600px" width="100%"></iframe>

Voici le code du script, qui repose sur le *microframework* web `Flask`_ :

.. literalinclude:: code/word_switch_web.py
      :language: python3
      :caption:

Il aurait été amusant de jouer avec les méthodes de liste comme
ci-dessous, mais cela aurait nécessité de supprimer par la suite les
espaces avant les virgules que nous aurions insérées dans la liste :

.. code-block:: python

   #! /usr/bin/python3
   # coding: utf-8

   phrase = "Belle Marquise vos beaux yeux me font mourir d’amour"
   liste = phrase.split()
   liste.insert(3, liste.pop(4))
   texte_final = ' '.join(liste)
   texte_final = texte_final.capitalize() + '.'
   print(texte_final)

Voici maintenant les modèles générant les pages HTML de base, d'entrée
et de sortie, basés sur `Jinja`_ :
		 
.. literalinclude:: code/templates/base.html
      :language: html
      :caption:

.. literalinclude:: code/templates/entry.html
      :language: html
      :caption:

.. literalinclude:: code/templates/results.html
      :language: html
      :caption:

Et enfin, la feuille de style CSS :

.. literalinclude:: code/static/form.css
      :language: css
      :caption:

.. seealso::

   - :ref:`sed-modifiez-votre-texte-sans-ouvrir-vos-fichiers`
   - :ref:`expressions-regulieres-python`

.. text review: yes
