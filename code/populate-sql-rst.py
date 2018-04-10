#!/usr/bin/python
# coding: utf8
import sqlite3
import jinja2

env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
template = env.get_template('modele-sql.rst')

print('Produits et versions\n====================')

try:
    db=sqlite3.connect('productdb.db')

    cursor=db.cursor()

    for myprod in ("dianthus","geum","prunus"):
        t = (myprod,)
        cursor.execute('SELECT version FROM products WHERE product = ?', t)
        mylist=[]
        for row in cursor:
            mylist.append('{}'.format(*row))
        
        data = {
            'product': [myprod],
            'version': mylist
        }

        print(template.render(data))
    
    cursor.close()
    db.close()

except:
    print('Erreur lors de la lecture de la base.')
    exit(1)


