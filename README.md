redaction-technique.org
=======================

Website powered by Python Sphinx about managing documentation as source code (in French)


Prerequisites
-------------

Sphinx is not quite mature yet, and you may not be able to build on all
platforms. The procedures below have been successfully tested on Debian 7.

Installing Sphinx
-----------------

$ sudo apt-get install python-sphinx

Building the HTML output
------------------------

$ git clone https://github.com/olivier-carrere/redaction-technique.org.git

$ cd redaction-technique.org

$ make html

Building the PDF output
------------------------

The PDF output is not quite satisfactory yet, as I still have to implement
custom LaTeX stylesheets.

$ git clone https://github.com/olivier-carrere/redaction-technique.org.git

$ cd redaction-technique.org

$ make latexpdf

Building the EPUB output
------------------------

This procedure is a bit kludgy, as we have to implement a workaround for a
Sphinx bug.

$ git clone https://github.com/olivier-carrere/redaction-technique.org.git

$ cd redaction-technique.org

$ git checkout -b build

$ git cherry-pick 4da22c8d2799133c70db73f4a3dbb0e0f7391e6f

$ make epub

$ git checkout master

$ git branch -D build
