---
title: "Create different documents from the same sources via Jinja (object method)"
description: "Profiling content with Jinja by defining objects (audience, platform, version, etc.) to include or exclude blocks according to their attributes using a Python script profiling.py."
---

With Jinja, you can define objects (audience, platform, version, etc.) and include or exclude text blocks according to their attributes.

1. Create the following `conditional-text.rst` file:

    ```txt
    Using conditional text
    =================================

    {% if public.elec %}

    .. admonition:: Danger for electricians

    Risk of electrocution

    Do not touch electrical wires.

    {% else %}

    .. admonition:: Danger for plumbers

    Risk of drowning

    Do not dive into the pool.

    {% endif %}
    ```

2. Define an Audience class with two attributes for plumbers and electricians:

    ```python
    class Audience:
        def __init__(self,electrician,plumber):
            self.elec=electrician
            self.plum=plumber
    ```

3. Create an instance of the Audience class whose value is true for electricians and false for plumbers:

    ```python
    user=Audience(True,False)
    ```

4. Create and run the following script:

    ```python
    #!/usr/bin/python
    class Audience:
        def __init__(self,electrician,plumber):
            self.elec=electrician
            self.plum=plumber

    import jinja2
    import sys
    reload(sys)
    sys.setdefaultencoding('utf8')

    user=Audience(True,False)
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
    template = env.get_template('texte-conditionnel.rst')
    string=template.render(public=user)

    print(string)
    ```

5. The contents of the `conditional-text.rst` file are overwritten and contain only the information intended for electricians.

6. Create a condition for audiences other than electricians or plumbers:

    ```rst
    Using conditional text
    =================================

    {% if public.elec %}

    .. admonition:: Danger for electricians

    Risk of electrocution

    Do not touch electrical wires.

    {% elif public.plum %}

    .. admonition:: Danger for plumbers

    Risk of drowning

    Do not dive into the pool.

    {% else %}

    .. admonition:: No danger

    If you're not a plumber or an electrician, you're not in any
    no danger.

    {% endif %}
    ```

7. Create a new class for seasons:

    ```python
    class Season:
        def __init__(self,winter,spring,summer,autumn):
            self.win=winter
            self.spr=spring
            self.sum=summer
            self.aut=autumn
    ```

8. Create more complex conditions:

    ```txt
    Using conditional text
    =================================

    {% if public.elec %}

    .. admonition:: Danger for electricians

    Risk of electrocution

    Do not touch electrical wires.

    {% elif public.plum and seas.wint %}

    .. admonition:: Danger for plumbers

    Risk of fracture

    Do not dive into the frozen pool.

    {% elif public.plum and seas.summ %}

    .. admonition:: Danger for plumbers

    Risk of hydrocution

    Do not dive into cold water when it is hot.

    {% elif public.plum and seas.spri or seas.autu %}

    .. admonition:: Danger for plumbers

    Risk of something

    Don't dive into the pool, you never know.

    {% else %}

    .. admonition:: No danger

    If you're not a plumber or an electrician, you're not in any
    no danger.

    {% endif %}
    ```

9. Vary the values of the Audience and Season class instances to filter the content of the `conditional-text.rst` file.

    ```python
    #!/usr/bin/python
    class Audience:
        def __init__(self,electrician,plumber):
            self.elec=electrician
            self.plum=plumber

    class Season:
        def __init__(self,winter,spring,summer,autumn):
            self.wint=winter
            self.spri=spring
            self.summ=summer
            self.autu=autumn

    import jinja2
    import sys
    reload(sys)
    sys.setdefaultencoding('utf8')

    user=Audience(False,True)
    when=Season(False,False,False,True)
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
    template = env.get_template('conditional-text.rst')
    string=template.render(public=user,seas=when)

    print(string)
    ```

10. Use a more readable variant in the content file:

    It may be more intuitive to specify a user-friendly string value in the content file. Especially if editors are unfamiliar with object-oriented programming, as the `==` equality test is more meaningful to most people.

    ```txt
    Using conditional text
    =================================
    
    {% if public.personae == "electrician" %}
    
    .. admonition:: Danger for electricians
    
       Risk of electrocution
    
       Do not touch electrical wires.
    
    {% elif public.personae == "plumber" and public.season == "winter" %}
    
    .. admonition:: Danger for plumbers
    
       Risk of fracture
    
       Do not dive into the frozen pool.
    
    {% elif public.personae == "plumber" and public.season == "summer" %}
    
    .. admonition:: Danger for plumbers
    
       Risk of hydrocution
    
       Do not dive into cold water when it is hot.
    
    {% elif public.personae == "plumber" and public.season == "spring" or public.season == "autumn" %}
    
    .. admonition:: Danger for plumbers
    
       Risk of something
    
       Don't dive into the pool, you never know.
    
    {% else %}
    
    .. admonition:: No danger
    
       If you're not a plumber or an electrician, you're not in any
       no danger.
    
    {% endif %}
	```

    It's more economical to use a single object class, even if it does mix cabbages and carrots (as much in this far-fetched example as in real life, where you'd mix audiences, versions, platforms, etc.).

    ```python
    #!/usr/bin/python
    class Audience:
        def __init__(self,pers,seas):
            self.personae=pers
            self.season=seas

    import jinja2
    import sys
    reload(sys)
    sys.setdefaultencoding('utf8')

    user=Audience("plumber", "winter")
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
    template = env.get_template('conditional-text.rst')
    string=template.render(public=user)

    print(string)
    ```

11. Modify your script to indicate the public and the season as parameters:

    ```python
    # File: code/profiling.py
    ```

    Usage:

    ```bash
    ./profiling.py plumber autumn
    ```

    If you've been paying close attention, you'll have noticed that this script renders the else condition in the content file useless, since the parameter values are tested before execution.

    To allow the passage of unexpected values and display the contents of the else block, the code must be modified as follows:

    ```python
    #!/usr/bin/python
    # coding: utf8
    class Audience:
        def __init__(self,pers,seas):
            self.personae=pers
            self.season=seas

    import jinja2
    import sys
    reload(sys)
    sys.setdefaultencoding('utf8')

    if len(sys.argv) == 3:
        pubparam=str(sys.argv[1])
    seasparam=str(sys.argv[2])
    user=Audience(pubparam,seasparam)
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
    template = env.get_template('texte-conditionnel.rst')
    string=template.render(public=user)
    print(string)
    else:
        print('Please indicate public and season')
    ```

