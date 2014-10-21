.. Copyright 2011-2014 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _separation-du-format-source-et-du-format-cible:

Séparation du format source et du format cible
==============================================

DITA pousse très loin la séparation du fond et de la forme. À partir du même
format source, de nombreux formats cibles peuvent être générés : PDF, XHTML,
HtmlHelp, troff, DocBook, etc.

Topic
=====

Les sections génériques **topic**, peu contraignantes sur le plan de la
structure, permettent au **rédacteur technique** de présenter des informations
générales.

Exemple de structure d'un *topic* :

.. aafig::

           +----+title
           |    +
           |    +----titlealts
           |    +----shortdesc
           |
           |          +-----------author
           |          |+----------source
           |          |+----------publisher
           |          |+----------copyright
      topic++--+prolog++----------critdates
           +          ++----------permissions
           |          |+----------metadata
           |          +-----------resourceid
           |
           |
           +----body
           |
           +----related-links
