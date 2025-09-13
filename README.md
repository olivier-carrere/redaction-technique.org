---
title: redaction-technique.org
description: Website powered by Python Sphinx about managing documentation as source code (in French)
slug: redaction-techniqueorg
sidebar:
  label: How-to
  order: 1
prev: null
next: null
---

Website powered by Python Sphinx about managing documentation as source code (in French)

Prerequisites
-------------

- GNU/Linux Debian 7
- Git
- Sphinx 1.1.3 or higher
- Inkscape

### For PDF output

- texlive
- texlive-fonts-recommended
- texlive-latex-extra

Installing Sphinx
-----------------

```bash
$ sudo apt-get install python-sphinx
```

Building the HTML output
------------------------

```bash
$ git clone https://github.com/olivier-carrere/redaction-technique.org.git
$ cd redaction-technique.org
$ make html
```

Building the PDF output
------------------------

```bash
$ git clone https://github.com/olivier-carrere/redaction-technique.org.git
$ cd redaction-technique.org
$ make latexpdf
```

Building the EPUB output
------------------------

```bash
$ git clone https://github.com/olivier-carrere/redaction-technique.org.git
$ cd redaction-technique.org
$ make epub
```

Building all available outputs
------------------------------

```bash
$ git clone https://github.com/olivier-carrere/redaction-technique.org.git
$ cd redaction-technique.org
$ make all
```

Troubleshooting
---------------

If compilation fails, you can get a compiled version on
https://readthedocs.org/projects/redaction-techniqueorg.