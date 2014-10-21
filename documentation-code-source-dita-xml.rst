DITA XML
========

Les **formats structurés** **DocBook** et **DITA XML** sont spécialement conçus
pour la **communication technique**. Le second pousse plus loin la structuration
et la modularisation du contenu d'entreprise.

Je préfère `DITA XML <http://dita.xml.org/>`_ à `DocBook
<http://www.docbook.org/>`_, car ce format pousse plus loin la structuration de
l'information. L'utilisation d'un fichier à part pour organiser hiérarchiquement
les modules d'information est également un avantage décisif. Utiliser DITA XML
m'a permis de fortement réduire le volume de texte source et de publier
indifféremment au format PDF ou HTML . Pour minimiser le risque d'erreurs, j'ai
réalisé un script bash de publication personnalisé pour n'utiliser qu'un fichier
:file:`ditamap` afin d'avoir la même structure de table des matières pour les
versions française et anglaise.  Une mise en page simple et élégante en PDF est
obtenue directement grâce à la chaîne de publication sous licence libre `DITA
Open Toolkit <http://dita-ot.sourceforge.net/>`_. Pour obtenir une mise en page
plus complexe, en revanche, le plus simple est d'importer les fichiers sous
FrameMaker et de profiter de son puissant moteur d'impression, ou d'utiliser une
chaîne de production propriétaire. La modification des feuilles de style de DITA
Open Toolkit est en effet complexe, car non documentée.
