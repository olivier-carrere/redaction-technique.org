.. _partager-des-unites-d-informations-atomiques-avec-les-conref:

Partager des unités d'informations atomiques avec les conref
============================================================

Le **rédacteur technique peut partager** des unités d'information trop petites
pour faire l'objet d'une section à part entière *via* le mécanisme des
**conref**, similaire au mécanisme *Xinclude* utilisé sous DocBook.

.. rubric:: Exemple

Un fichier de contenu contient la balise suivante :

.. code-block:: xml

   <uicontrol conref="shared.dita#shared/system"/>

À la différence du mécanisme des *Xinclude* utilisé sous DocBook, la valeur vers
laquelle pointe le *conref* doit se trouver dans un contexte conforme au
schéma XML. Par exemple, la valeur associée à l'exemple ci-dessus se trouve dans
un fichier *shared.dita* de type task :

.. code-block:: xml

   <?xml version="1.0" encoding="utf-8"?>
   <!DOCTYPE task PUBLIC "-//OASIS//DTD DITA 1.2 Task//EN" "../../dtd/technicalContent/dtd/task.dtd>
   <task id="shared" xml:lang="fr-fr>
     <title>Conref
     <taskbody>
       <steps>
      <step>
        <cmd>
          <menucascade>
         <uicontrol id="system>Système</uicontrol>
          </menucascade>
        </cmd>
      </step>
       </steps>
     </taskbody>
   </task>
