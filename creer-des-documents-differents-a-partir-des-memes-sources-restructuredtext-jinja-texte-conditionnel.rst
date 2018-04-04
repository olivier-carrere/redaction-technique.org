.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-texte-conditionnel:

Créer des documents différents à partir des mêmes sources *via* Jinja
=====================================================================

Le script Python :file:`profiling.py` ci-dessous permet de profiler du
contenu en *preprocessing* à l'aide du puissant moteur de modèle
`Jinja`_ :

.. code-block:: python

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


Contenu du fichier :file:`texte-conditionnel.rst` :
		
.. code-block:: rest

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

Utilisation :

.. code-block:: console

      $ ./profiling.py electrician


Il suffit maintenant d'appeler le script avant compilation *via*
Sphinx dans le :file:`Makefile`.

.. seealso::

   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-dita-xml-texte-conditionnel`
   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-rest-texte-conditionnel`
   - :ref:`creer-des-documents-differents-a-partir-des-memes-sources-restructuredtext-jinja-objet-texte-conditionnel`
