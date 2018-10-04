.. Copyright 2018 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. _ projet-bout-en-bout-latex:

LaTeX
-----

Pourquoi avoir choisi `LaTeX`_ pour réaliser le support *print* et non pas un
logiciel de PAO classique ? Je souhaitais pouvoir remanier le texte sans
refaire à chaque fois la mise en page. De même, je voulais pouvoir traduire le
dépliant sans effectuer de tâche de PAO manuelle.

Voici un exemple de code LaTeX :

.. code-block:: tex

   \section{\faTag  Iconographes}
   
   \vspace*{\fill}
   
   \begin{enumerate}[itemsep=0mm,leftmargin=*]
   
      \item Contactez-nous pour rejoindre l'équipe d'iconographes.
      \item Affichez une photo de l'album \emph{Community}.
      \item Cliquez sur \faPencil  \textbf{Mots-clés}.
      \item Ajoutez des mots-clés aux photos :
   
        \begin{itemize}
          \item Indiquez \emph{Print} si la photo convient à l'impression, \emph{Web}
            dans le cas contraire.
          \item Pour que la photo soit supprimée, indiquez \emph{Delete}.  Elle sera
            effacée plus tard\footnote{Elle sera conservée dans la sauvegarde.}.
        \end{itemize}

   \end{enumerate}
     
   \begin{center}
     \setlength{\fboxsep}{0pt}%
     \setlength{\fboxrule}{0pt}%
     \fbox{\includegraphics[angle=5,width=\linewidth]{iconographes}}%
   \end{center}

Le rendu PDF est illustré ci-dessous. Remarquez le calcul automatique des
césures (qui a fait l'objet d'une `thèse de doctorat`_). C'est l'un des
`nombreux avantages de LaTeX`_\ …

.. figure:: graphics/latex-rendu.png

.. note::

   Les fervents du *wysiwyg* se tourneront avec profit vers `Gummi`_.

   .. figure:: graphics/latex-wysiwyg-gummi.png

D'autre part, une fois la structure du dépliant créée, il est facile de
l'utiliser pour produire rapidement d'autres documents. De plus, le document
peut être remanié par d'autres personnes sans problème de licence ou de
plateforme logicielle.

Enfin, le suivi des modifications, que se soit sous Overleaf ou Git, prévient
efficacement les erreurs : il est très facile de visualiser les modifications
de fond ou de forme entre deux versions, de revenir à tout moment à une
version précédente, de maintenir en parallèle plusieurs versions, etc.

.. figure:: graphics/latex-historique-fond-github.png

   *Visualisation de modifications de fond sous GitHub*

.. figure:: graphics/latex-historique-forme-github.png

   *Visualisation de modifications de forme sous GitHub*

Voici l'évolution d'un extrait du PDF compilé :

.. figure:: graphics/latex-diff-pdf.png

On peut même envisager un travail collaboratif, synchrone ou asynchrone, sur
le même projet.
