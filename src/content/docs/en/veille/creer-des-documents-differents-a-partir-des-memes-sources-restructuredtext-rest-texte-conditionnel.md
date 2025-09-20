---
title: "Create different documents from the same ReST sources (conditional text)".
description: "Generate document variants from the same ReST sources with Sphinx conditional text."
---

1.  Install *Sphinx*, and *make* :

    console
    $ sudo apt install python-sphinx make
    ```

2.  Create a Sphinx project using all the default choices:

    console
    $ sphinx-quickstart
    ```

3.  Add the following content to the `index.rst` file, respecting the indentations:

    txt
    .. only:: electrician

    .. admonition:: Danger for electricians

      Risk of electric shock

      Do not touch electrical wires.

    .. only:: plumber

    .. admonition:: Danger for plumbers

      Risk of drowning

      Do not dive into the pool.
    ```

4.  To hide or not hide content intended for electricians or plumbers, comment out or not the following lines in the `conf.py` configuration file:

    python
    tags.add('electrician')
    tags.add('plumber')
    ```

5.  Generate your content :

    console
    $ make html
    ```

6.  Open the `_build/html/index.html` file in a browser to view your content.
