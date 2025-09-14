---
title: "Créer des documents différents à partir des mêmes sources via Jinja"
description: "Le script Python profiling.py ci-dessous permet de profiler du contenu en preprocessing à l'aide du puissant moteur de modèle Jinja."
slug: "creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel"
sidebar:
  label: "How-to"
  order: 1
prev: "creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel"
next: "creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel"
---

Le script Python `profiling.py` ci-dessous permet de profiler du contenu en *preprocessing* à l'aide du puissant moteur de modèle [Jinja]() :

``` python
#!/usr/bin/python
import jinja2
import sys
reload(sys)
sys.setdefaultencoding('utf8')

public=str(sys.argv[1])
env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
template = env.get_template('texte-conditionnel.rst')
string=template.render(audience=public)

file = open('texte-conditionnel.rst','w') 
file.write(string) 
file.close() 
```

Contenu du fichier `texte-conditionnel.rst` :

``` txt
Utilisation du texte conditionnel
=================================

{% if audience=='electrician' %}

.. admonition:: Danger pour les électriciens

   Risque d'électrocution

   Ne touchez pas les fils électriques.

{% else %}

.. admonition:: Danger pour les plombiers

   Risque de noyade

   Ne plongez pas dans la piscine.

{% endif %}
```

Utilisation :

``` console
$ ./profiling.py electrician
```

Il suffit maintenant d'appeler le script avant compilation *via* Sphinx dans le `Makefile`.

:::tip[Voir aussi]
- `creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel`
- `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel`
- `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel`
:::