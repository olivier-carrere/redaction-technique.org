---
title: "Automatically insert data into a reStructuredText file"
description: "Suppose you need to present 3 products, Dianthus, Geum and Prunus, each in three versions 1.0, 1.5 and 2.3."
---

Suppose you had to present 3 products, *Dianthus*, *Geum* and *Prunus*, each available in three versions *1.0*, *1.5* and *2.3*.

Rather than writing data by hand into the content file, you can insert it automatically using Jinja and Python.

1. Create the following `modele.rst` file:

    ```rst
    Products and versions
    ====================
    
    {% for prod in product %}
    {{ prod | capitalize }}
    {% for c in prod %}-{% endfor %}
       {% for ver in version %}
    - {{ ver }}
       {% endfor %}
    {% endfor %}
    ```

2. Create the following Python script `populate.py`:

    ```python
    #!/usr/bin/python
    # coding: utf8
    import jinja2
    
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
    
    template = env.get_template('modele.rst')
    
    data = {
        product': ['dianthus', 'geum', 'prunus'],
        'version': ['1.0', '1.5', '2.3']
        }
    print(template.render(data))
    ```

3. Make the script executable, then run it:

    ```bash
    chmod +x populate.py
    $ ./populate.py
    ```

    The following content is displayed:

    ```md
    Products and versions
    ====================

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

This minimizes the risk of errors and the effort involved in updating.

**See also**
- [Automatically insert data into a DITA XML file](.../insert-automatically-data-into-a-dita-xml-file)
- Automatically insert SQL data into a reStructuredText file](../inser-automatically-insert-sql-data-into-a-restructuredtext-file)
