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

$ git clone https://github.com/olivier-carrere/redaction-technique.org.git

$ cd redaction-technique.org

$ make epub
