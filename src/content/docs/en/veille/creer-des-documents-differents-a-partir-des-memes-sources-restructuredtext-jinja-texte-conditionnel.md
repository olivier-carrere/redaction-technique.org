---
title: "Create different documents from the same sources using Jinja"
description: "The Python profiling.py script below allows you to profile content in preprocessing using the powerful Jinja template engine."
proofreading: IA
---

The `profiling.py` Python script below allows you to profile content in *preprocessing* using the powerful Jinja model engine:

```python
#!/usr/bin/python
import jinja2
import sys
reload(sys)
sys.setdefaultencoding('utf8')

public=str(sys.argv[1])
env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
template = env.get_template('conditional-text.rst')
string=template.render(audience=public)

file = open('texte-conditionnel.rst','w')
file.write(string)
file.close()
```

Contents of the file `conditional-text.rst`:

```txt
Using conditional text
=================================

{% if audience=='electrician' %}

.. admonition:: Danger for electricians

   Risk of electrocution

   Do not touch electrical wires.

{% else %}

.. admonition:: Danger for plumbers

   Risk of drowning

   Do not dive into the pool.

{% endif %}
```

How to use:

```bash
./profiling.py electrician
```

Now, just call the script before compiling *via* Sphinx in the `Makefile`.
