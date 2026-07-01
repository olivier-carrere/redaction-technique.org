#!/usr/bin/python
# coding: utf8
import sqlite3

try:
    db = sqlite3.connect('productdb.db')

    cursor = db.cursor()

    cursor.execute('''CREATE TABLE products (
        product text,
        version text)''')

    db.commit()

    cursor.close()
    db.close()

except:
    print('Erreur lors de la création de la base.')
    exit(1)

print('La base de données a été créée.')
