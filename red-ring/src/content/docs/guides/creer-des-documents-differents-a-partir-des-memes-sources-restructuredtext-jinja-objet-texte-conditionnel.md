---
title: Créer des documents différents à partir des mêmes sources *via* Jinja (méthode objet)
---

Le script Python `profiling.py`{.interpreted-text role="file"}
ci-dessous permet de profiler du contenu à l'aide du puissant moteur de
modèle Avec \[Jinja\](<http://jinja.pocoo.org/>, vous pouvez définir des
objets (audience, plateforme, version, etc.) et inclure ou exclure des
blocs de texte selon leurs attributs.

1.  Créez le fichier `texte-conditionnel.rst`{.interpreted-text
    role="file"} suivant :

    ``` rest
    Utilisation du texte conditionnel
    =================================

    {% if public.elec %}

    .. admonition:: Danger pour les électriciens

    Risque d'électrocution

    Ne touchez pas les fils électriques.

    {% else %}

    .. admonition:: Danger pour les plombiers

    Risque de noyade

    Ne plongez pas dans la piscine.

    {% endif %}
    ```

2.  Définissez une classe *Audience* avec deux attributs pour les
    plombiers et les électriciens :

    ``` python
    class Audience:
        def __init__(self,electrician,plumber):
            self.elec=electrician
            self.plum=plumber
    ```

3.  Créez une instance de la classe *Audience* dont la valeur est vraie
    pour les électriciens, et fausse pour les plombiers :

    ``` python
    user=Audience(True,False)
    ```

4.  Créez et exécutez le script suivant :

    ``` python
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

5.  Le contenu du fichier `texte-conditionnel.rst`{.interpreted-text
    role="file"} est écrasé et ne contient plus que les informations
    destinées aux électriciens.

6.  Créez une condition pour les publics autres que les éléctriciens ou
    les plombiers :

    ``` rest
    Utilisation du texte conditionnel
    =================================

    {% if public.elec %}

    .. admonition:: Danger pour les électriciens

    Risque d'électrocution

    Ne touchez pas les fils électriques.

    {% elif public.plum %}

    .. admonition:: Danger pour les plombiers

    Risque de noyade

    Ne plongez pas dans la piscine.

    {% else %}

    .. admonition:: Aucun danger

    Si vous n'êtes ni plombier, ni électricien, vous ne courez
    aucun danger.

    {% endif %}
    ```

7.  Créez une nouvelle classe pour les saisons :

    ``` python
    class Season:
        def __init__(self,winter,spring,summer,autumn):
            self.win=winter
            self.spr=spring
            self.sum=summer
            self.aut=autumn
    ```

8.  Créez des conditions plus complexes :

    ``` rest
    Utilisation du texte conditionnel
    =================================

    {% if public.elec %}

    .. admonition:: Danger pour les électriciens

    Risque d'électrocution

    Ne touchez pas les fils électriques.

    {% elif public.plum and seas.wint %}

    .. admonition:: Danger pour les plombiers

    Risque de fracture

    Ne plongez pas dans la piscine gelée.

    {% elif public.plum and seas.summ %}

    .. admonition:: Danger pour les plombiers

    Risque d'hydrocution

    Ne plongez pas dans l'eau froide lorsqu'il fait chaud.

    {% elif public.plum and seas.spri or seas.autu %}

    .. admonition:: Danger pour les plombiers

    Risque de quelque chose

    Ne plongez pas dans la piscine, on ne sait jamais.

    {% else %}

    .. admonition:: Aucun danger

    Si vous n'êtes ni plombier, ni électricien, vous ne courez
    aucun danger.

    {% endif %}
    ```

9.  Faites varier les valeurs des instances des classes *Audience* et
    *Season* pour filtrer le contenu du fichier
    `texte-conditionnel.rst`{.interpreted-text role="file"}.

    ``` python
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
    template = env.get_template('texte-conditionnel.rst')
    string=template.render(public=user,seas=when)

    print(string)
    ```

10. Utilisez une variante plus lisible au niveau du fichier de contenu :

    Il est peut-être plus intuitif d'indiquer dans le fichier de
    contenu une valeur conviviale sous forme de chaîne de caractères.
    Surtout si les rédacteurs ne sont pas familiarisés avec la
    programmation orientée objet, le test d'égalité [==]{.title-ref}
    étant plus parlant pour la plupart des gens.

     {.literalinclude language="rest"}
    code/texte-conditionnel.rst
    

    Il est plus économique d'utiliser une seule classe d'objets, même
    si elle mélange un peu les choux et les carottes (autant dans cet
    exemple tiré par les cheveux que dans la vraie vie, où l'on
    mélangerait des publics, des versions, des plateformes, etc.).

    ``` python
    #!/usr/bin/python
    class Audience:
        def __init__(self,pers,seas):
            self.personae=pers
            self.season=seas

    import jinja2
    import sys
    reload(sys)
    sys.setdefaultencoding('utf8')

    user=Audience("plumber","winter")
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
    template = env.get_template('texte-conditionnel.rst')
    string=template.render(public=user)

    print(string)
    ```

11. Modifiez votre script pour indiquer le public et la saison en
    paramètres :

     {.literalinclude language="python3"}
    code/profiling.py
    

    Utilisation :

    ``` console
    $ ./profiling.py plumber autumn
    ```

    Les plus attentifs auront remarqué que ce script rend inutile la
    condition *else* du fichier de contenu, puisque l'on teste la
    valeur des paramètres avant son exécution.

    Pour permettre le passage de valeurs non prévues et afficher le
    contenu du bloc *else*, il faut modifier le code comme suit :

    ``` python
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
        print('Veuillez indiquer le public et la saison')
    ```

 seealso
-   `creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel`{.interpreted-text
    role="ref"}
-   `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel`{.interpreted-text
    role="ref"}
-   `creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel`{.interpreted-text
    role="ref"}

