#!/usr/bin/python
# coding: utf8
import sqlite3

try:
    db=sqlite3.connect('productdb.db')

    cursor=db.cursor()

    cursor.execute('select * from products')
    for row in cursor:
        print('{}|{} {}'.format(*row))

    cursor.close()
    db.close()

except:
    print('Erreur lors de la lecture de la base.')
    exit(1)
