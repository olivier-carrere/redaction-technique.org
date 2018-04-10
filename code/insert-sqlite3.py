#!/usr/bin/python
# coding: utf8
import sqlite3

prods=[('dianthus','1.0'),('geum','1.5'),('prunus','2.3'),
       ('dianthus','1.1'),('geum','1.7'),('prunus','2.5'),
       ('dianthus','1.2'),('geum','3.5'),('prunus','2.7'),]

try:
    db=sqlite3.connect('productdb.db')

    cursor=db.cursor()

    for data in prods:
        cursor.execute('INSERT INTO products (product,version) VALUES (?,?)',data)

    db.commit()

    cursor.close()
    db.close()

except:
    print('Erreur lors de l\'insertion de données dans la base.')
    exit(1)

print('Les données ont été insérées.')
