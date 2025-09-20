---
title: "Regular expressions in Python"
description: "Python's regular expression library helps you manipulate text, especially if you're not familiar with sed or awk."
---

The Python language offers numerous function libraries. The one dedicated to regular expressions can help you manipulate text, especially if you're not familiar with the *sed* or *awk* utilities.

The following code illustrates how to reverse the order of words in a sentence, according to the famous example from *Bourgeois gentilhomme*:

```python
#! /usr/bin/python
# coding: utf8

'''

   Asks the user to type in M. Jourdain's tirade and
   displays a variant. Works only with the following tirade
   or with the same number of words, entered between quotation marks:

   "Belle marquise, your beautiful eyes make me die of love."

'''

# Import regular expression library.
import re

# The program asks the user to enter the tirade and places it in
# a variable.
original_text = input('Enter Mr Jourdain's tirade in quotation marks: ')
# Removes the period from the tirade.
texte_original_sans_point = texte_original.strip('.')
# Convert string to word list.
texte_melange = re.split(' ', texte_original_sans_point)
# Create a global variable containing an empty string.
final_text = ''

# After checking that the tirade contains 9 words, display the first
# word of the modified tirade, with a capital letter.
if len(texte_melange) == 9:
    # A loop adds to the initially empty string the words of
    # Mr Jourdain's tirade, except for the first and last, in the desired
    # order.

    for i in [7, 5, 6, 0, 1, 2, 3]:
        text_final = text_final + ' ' + str.lower(text_melange[i])

    # Display final text, followed by a dot.
    print(str.capitalize(texte_melange[8]) + texte_final + ' ' +
          str.lower(text_melange[4]) + '.')

else:
    print('The tirade must be exactly nine words long.')
```

