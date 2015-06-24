# Makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
PAPER         =
BUILDDIR      = _build

# Internal variables.
PAPEROPT_a4     = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) .
# the i18n builder cannot share the environment and doctrees with the others
I18NSPHINXOPTS  = $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) .

.PHONY: help clean html

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  html       to make standalone HTML files"
	@echo "  epub       to make an epub"
	@echo "  latexpdf   to make LaTeX files and run them through pdflatex"
	@echo "  all        to build all supported outputs"

clean:
	-rm -rf $(BUILDDIR)/*

all: html epub latexpdf
	$ mkdir -p $(BUILDDIR)/html/download
	$ cp $(BUILDDIR)/latex/redaction-techniqueorg.pdf $(BUILDDIR)/html/download
	$ cp $(BUILDDIR)/epub/redaction-techniqueorg.epub $(BUILDDIR)/html/download

html:
	$ cp conf.py /tmp/conf.py
	$ sed -i conf.py -f conditional-text/html.sed
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	$ cp -n graphics/*.png $(BUILDDIR)/html/_images/
	$ cp -n graphics/*.gif $(BUILDDIR)/html/_images/
	$ cp /tmp/conf.py conf.py
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

epub:
	$ cp conf.py /tmp/conf.py
	$ cp *.rst /tmp/
	$ cp _templates/layout.html /tmp/
	$ cp /usr/share/sphinx/themes/epub/layout.html _templates/
	$ sed -i conf.py -f conditional-text/epub.sed
	$ sed -i '/:hidden:/d' *.rst
	$ mkdir -p $(BUILDDIR)/epub/_images/
	$ cp -n graphics/*.png $(BUILDDIR)/epub/_images/
	$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub
	$ cp /tmp/conf.py conf.py
	$ cp /tmp/*.rst .
	$ cp /tmp/layout.html _templates/
	@echo
	@echo "Build finished. The epub file is in $(BUILDDIR)/epub."

latexpdf:
	$ cp conf.py /tmp/conf.py
	$ sed -i conf.py -f conditional-text/latexpdf.sed
	$(SPHINXBUILD) -b latex $(ALLSPHINXOPTS) $(BUILDDIR)/latex
	@echo "Running LaTeX files through pdflatex..."
	$(MAKE) -C $(BUILDDIR)/latex all-pdf
	$ cp /tmp/conf.py conf.py
	@echo "pdflatex finished; the PDF files are in $(BUILDDIR)/latex."
