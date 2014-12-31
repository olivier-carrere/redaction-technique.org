redaction-technique.org
=======================

Website powered by Python Sphinx about managing documentation as source code (in French)

Prerequisites
-------------

- GNU/Linux Debian 7
- Git
- Sphinx 1.1.3 or higher

For PDF output
~~~~~~~~~~~~~~

- texlive
- texlive-fonts-recommended
- texlive-latex-extra

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

$ git clone https://github.com/olivier-carrere/redaction-technique.org.git

$ cd redaction-technique.org

$ make latexpdf

Building the EPUB output
------------------------

$ git clone https://github.com/olivier-carrere/redaction-technique.org.git

$ cd redaction-technique.org

$ make epub

Troubleshooting
---------------

If compilation fails, you can get a compiled version on
https://readthedocs.org/projects/redaction-techniqueorg.
