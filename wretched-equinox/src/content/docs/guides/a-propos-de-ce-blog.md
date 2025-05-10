---
title: À propos de ce blog
---

Ce blog est créé par un rédacteur technique spécialisé en informatique.
Il traite principalement des formats et outils de rédaction technique tels que :

* reStructuredText, DITA XML, DocBook
* [Bash](https://github.com/olivier-carrere/redaction-technique.org/tree/master/scripts), awk, sed, regex, Python
* Git, gestion de versions, compilation ([Makefile](https://github.com/olivier-carrere/redaction-technique.org/commits/master/Makefile), Ant)
* HTML, [CSS](https://github.com/olivier-carrere/redaction-technique.org/tree/master/_static), PDF, LaTeX, XSL-FO, XSLT

> Le code source est disponible sur [GitHub](https://github.com/olivier-carrere/redaction-technique.org).
> Le dépôt est plus complet que ce blog lui-même, car il inclut l’historique des modifications et les branches Git.

## Libérer la documentation de ses silos

Les outils ouverts remplacent avantageusement les formats propriétaires comme Word ou FrameMaker.
Ils permettent de passer à une gestion modulaire et intégrée du cycle de vie de la documentation.

## Documentation intégrée au développement

Une bonne documentation :

* sort en même temps que le logiciel,
* suit les mêmes cycles de vie,
* utilise les mêmes outils de qualité.

Les formats texte (reStructuredText, DITA XML, DocBook) sont compatibles avec les systèmes de gestion de versions (Git, SVN).
Ils peuvent être édités avec n’importe quel outil, ce qui facilite l’intégration au développement.

## Une documentation versionnée avec Git

Le blog était initialement sous WordPress, mais a été migré vers reStructuredText pour :

* mieux suivre les versions du contenu,
* gérer les modifications par lots,
* relier la documentation à des tickets (*Trac*, *Bugzilla*),
* permettre la validation collaborative.

## Formats disponibles

Le contenu source existe en quatre formats, chacun avec ses avantages :

| Format                                                                                     | Description                             |
| ------------------------------------------------------------------------------------------ | --------------------------------------- |
| [Markdown](https://github.com/olivier-carrere/redaction-technique.org/tree/astro/wretched-equinox/src/content/docs/guides) | Format de balisage léger géré par Astro.          |
| [reStructuredText](https://github.com/olivier-carrere/redaction-technique.org/tree/master) | Simple et efficace avec Sphinx.          |
| [DITA XML](https://github.com/olivier-carrere/redaction-technique.org/tree/DITA_XML)       | Modulaire, puissant, mais complexe et onéreux.                   |
| [DocBook](https://github.com/olivier-carrere/redaction-technique.org/tree/DocBook)         | Complet, mais moins utilisé aujourd’hui. |

