title: Une architecture documentaire trop complexe ?

DITA XML permet des gains de productivité importants par la réduction du
volume source que le rédacteur technique crée, traduit et maintient. Ce
gain de productivité se fait au prix d\'une plus grande complexité.

Si les projets DITA XML sont plus *complexes*, ils sont cependant moins
*compliqués* que des projets reposant sur des formats plus traditionnels
de type FrameMaker. En effet, DITA XML est une architecture rationnelle.
Le rédacteur technique se trouve donc face à un comportement prédictible
des outils qu\'il utilise, loin des *trucs et astuces* destinés à
contourner les bugs ou les fonctionnements erratiques des outils plus
lourds.

Le tableau suivant présente les différents niveaux de complexité induits
par DITA XML et les solutions qui permettent au rédacteur technique de
les maîtriser plus facilement :

  ---------------------------------------------------------------- ----------------------- -----------------------
  Complexité                                                                               
  ==============================+==============================+                           
  Syntaxe DITA XML \|Integrated Development Environment tel que                            
  XMetal ou nXML                                                                           

  Gestion des relations entre des briques d\'information atomiques Content Management      
                                                                   System dédié tel que    
                                                                   Componize \| ou DocZone 
                                                                   \| \|                   

  Syntaxe de la feuille de style XSLT                              Logiciel graphique de   
                                                                   création de feuilles de 
                                                                   style                   
  ---------------------------------------------------------------- ----------------------- -----------------------

Pour une petite équipe de rédaction technique, l\'écueil principal sera
la nécessité de mettre en œuvre la charte graphique de l\'entreprise.
Les autres aspects peuvent être gérés sans outil spécialisé, avec une
bonne communication et une série de bonnes pratiques.
