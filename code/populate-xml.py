#!/usr/bin/python3
# coding: utf8
from lxml import etree
root=etree.Element('topic')
root.set('id','produits-et-versions')

title=etree.SubElement(root,'title')
title.text="Produits et versions"

topic=etree.SubElement(root,'body')

products = ['dianthus', 'geum', 'prunus']
versions = ['1.0', '1.5', '2.3']


for p in products:
    P=str.capitalize(p)
    product=etree.SubElement(topic,'p')
    product.text=P
    list=etree.SubElement(topic,'ul')
    for v in versions:
        version=etree.SubElement(list,'li')
        version.text=v

try:
    with open('modele.dita','w') as file:
        file.write('<?xml version="1.0" encoding="utf-8"?>\n')
        file.write('<!DOCTYPE topic PUBLIC "-//OASIS//DTD DITA 1.2 Topic//EN" "/usr/share/dita-ot/dtd/technicalContent/dtd/topic.dtd">\n')

        file.write(etree.tostring(root,pretty_print=True).decode('utf-8'))

except IOError:
    print('Erreur d\'écriture')
    exit(1)

