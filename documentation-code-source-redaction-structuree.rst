.. _redaction-structuree:

Rédaction structurée
====================

À la différence d'autres systèmes de composition de documents, tels que les
traitements de texte ou les logiciels de PAO, DITA, comme DocBook, est un format
de **rédaction structurée**. Il se concentre sur la **sémantique** du contenu
plutôt que sur la mise en page. Le fond plutôt que la forme.

Supposons que vous vouliez mettre en gras les mots qui correspondent à une
option de l'interface graphique dans le PDF fourni aux utilisateurs :

- sous un traitement de texte, vous mettez ce mot en gras,

- en HTML, vous incluez ce mot entre balises <strong> et </strong>,

- sous DITA, vous incluez ce mot entre balises <uicontrol> et </uicontrol> ;
  c'est une feuille de style qui applique le corps gras au texte cible.

Même si d'autres éléments, par exemple, des options de ligne de commande,
apparaissent en gras dans le document cible, ils sont différenciés dans les
fichiers source.

.. rubric:: Avantages

- vous pouvez aisément changer la mise en forme des options de l'interface dans
  un nombre illimité de documents,

- si d'autres éléments sont en gras, leur mise en forme peut facilement être
  modifiée, et celle des options de l'interface rester inchangée,

- vous pouvez facilement extraire toutes les options de l'interface à partir
  d'un nombre illimité de documents, par un simple *grep* par exemple.
