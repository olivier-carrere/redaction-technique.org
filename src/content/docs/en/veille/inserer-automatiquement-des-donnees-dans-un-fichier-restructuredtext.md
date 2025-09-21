---
title: "Automatically insert data into a reStructuredText file"
description: "Suppose you need to present 3 products, Dianthus, Geum and Prunus, each in three versions 1.0, 1.5 and 2.3."
proofreading: IA
---
Suppose you need to present three products: *Dianthus*, *Geum*, and *Prunus*, each available in versions *1.0*, *1.5*, and *2.3*.

Instead of manually entering data into the content file, you can automate this process using Jinja and Python.

1. Create the following `template.rst` file:

    ```rst
    Products and Versions
    =====================
    
    {% for prod in products %}
    {{ prod | capitalize }}
    {% for c in prod %}-{% endfor %}
       {% for ver in versions %}
    - {{ ver }}
       {% endfor %}
    {% endfor %}
    ```

2. Create the following Python script `populate.py`:

    ```python
    #!/usr/bin/python
    # coding: utf-8
    import jinja2
    
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
    
    template = env.get_template('template.rst')
    
    data = {
        'products': ['dianthus', 'geum', 'prunus'],
        'versions': ['1.0', '1.5', '2.3']
    }
    print(template.render(data))
    ```

3. Make the script executable, then run it:

    ```bash
    chmod +x populate.py
    ./populate.py
    ```

    The following output is displayed:

    ```md
    Products and Versions
    =====================

    Dianthus
    --------

    - 1.0

    - 1.5

    - 2.3


    Geum
    ----

    - 1.0

    - 1.5

    - 2.3


    Prunus
    ------

    - 1.0

    - 1.5

    - 2.3
    ```

This approach minimizes the risk of errors and reduces the effort involved in updating.

**Additional resources**
- [Automatically insert data into a DITA XML file](../inserer-automatiquement-des-donnees-dans-un-fichier-dita-xml)
- [Automatically insert SQL data into a reStructuredText file](../inserer-automatiquement-des-donnees-sql-dans-un-fichier-restructuredtext)
