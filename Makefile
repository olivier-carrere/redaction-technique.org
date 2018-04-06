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

# Build PNG version of SVG image files
PNG = for i in graphics/*.svg; do inkscape -w 600 -f $$i -e graphics/$$(basename $$i svg)png; done
GIT_CLEAN = git reset --hard HEAD && git clean -fd

.PHONY: help clean html latexpdf

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
	$ sed -i conf.py -f conditional-text/html.sed
	$ $(PNG)
	$ inkscape -w 60 -f graphics/pdf.svg -e graphics/pdf.png
	$ inkscape -w 120 -f graphics/git.svg -e graphics/git.png
	$ inkscape -w 180 -f graphics/redaction-technique.svg -e graphics/redaction-technique.png
	$ sed -i "s,\(\.\. figure::.*\)\.svg,\1\.png," *.rst
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	$ cp -n graphics/*.png $(BUILDDIR)/html/_images/
	$ cp -n graphics/*.gif $(BUILDDIR)/html/_images/
	$ $(GIT_CLEAN)
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

epub:
	$ cp /usr/share/sphinx/themes/epub/layout.html _templates/
	$ sed -i conf.py -f conditional-text/epub.sed
	$ mkdir -p $(BUILDDIR)/epub/_images/
	$ cp -n graphics/*.png $(BUILDDIR)/epub/_images/
	$ $(PNG)
	$ sed -i "s,\(\.\. figure::.*\)\.svg,\1\.png," *.rst
	$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub
	$ $(GIT_CLEAN)
	@echo
	@echo "Build finished. The epub file is in $(BUILDDIR)/epub."

latexpdf:
	$ sed -i conf.py -f conditional-text/latexpdf.sed
	$ for i in graphics/*.svg; do inkscape -f $$i -A graphics/$$(basename $$i svg)pdf; done
	$ sed -i "s,\(\.\. figure::.*\)\.svg,\1\.pdf," *.rst
	$(SPHINXBUILD) -b latex $(ALLSPHINXOPTS) $(BUILDDIR)/latex
	@echo "Running LaTeX files through pdflatex..."
	$(MAKE) -C $(BUILDDIR)/latex all-pdf
	$ $(GIT_CLEAN)
	@echo "pdflatex finished; the PDF files are in $(BUILDDIR)/latex."
