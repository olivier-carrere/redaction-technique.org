#!/usr/bin/python
# coding: utf8
import jinja2

env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))

template = env.get_template('modele.rst')

data = {
    'product': ['dianthus', 'geum', 'prunus'],
    'version': ['1.0', '1.5', '2.3']
    }
print(template.render(data))
