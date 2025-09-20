---
title: "DITA XML and XSL-FO tutorials"
description: "DITA XML is a structured authoring language that lets you create documents without worrying about their final appearance on different media. XSL-FO is a language that lets you reorganize and filter XML content and apply a layout to it using a style sheet."
---

The following tutorials will help the **technical editor** to set up and use a free **DITA XML** authoring and publishing chain.


**DITA XML** is a structured authoring language that lets you create documents without worrying about their final appearance on different media. XSL-FO is a language for reorganizing and filtering XML content, and applying a style sheet layout to it.

A set of **DITA XML** files contains all the content relating, for example, to a product. Various XSL-FO style sheets are used to publish this content in PDF, HTML or other formats, applying complex transformations. The summary of each section of the final document may, for example, appear in the HTML version and not in the PDF version.

Similarly, if a product is to be supplied as a white label to different customers, a totally different layout can be applied to its documentation simply by specifying a different set of style sheets when generating the deliverable. In practice, this is not possible with traditional **FrameMaker** solutions.

## XSL-FO: filter content according to "except" and "or" conditions

Let's imagine you want to filter the child nodes of the DITA XML tag `<example>` and display all its content except the title (located between the `<title>` tags).

You can then use the following syntax:

xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

This command selects all child nodes of the `<example>` node, with the exception of the `<title>` node. However, the `<example>` node accepts text entered directly, without being encapsulated in tags. This command will therefore not display this content.

Suppose the source code of one of your DITA XML files is as follows:

xml
<example>
  <title>
    XSL-FO
  </title>
  Here is my XPATH path example:
  <codeblock>
    ancestor-or-self
  </codeblock>
  Unencapsulated text located after a child node.
</example>
```

The PDF file will display the example structured as follows:

xslt
ancestor-or-self
```

The title of the example is not displayed, which is the desired result, but content not encapsulated in tags is not displayed, which is an undesirable side effect. To select this content, text nodes must be selected using the `text()` syntax. It is then tempting to use the following syntax:

xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="text()" />
    <xsl:apply-templates select="*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

However, all text elements not encapsulated in child tags of the `<example>` tag will be placed at the head of the example, before the encapsulated elements, even if they are placed afterwards in the DITA XML source file.

The PDF file will display the example structured as follows:

> Here's my example XPATH path:Unencapsulated text after a child node.
>
> ```` xslt
> ancestor-or-self
> ```

You must then use the pipe syntax (Boolean or condition) to modify the XPATH path as follows:

xslt
<xsl:apply-templates select="text()|*[not(name()='title')]" />
```

The final result will be :

``` xslt
<xsl:template match="*[contains(@class,' topic/example ')]">
  <fo:block>
    <xsl:apply-templates select="text()|*[not(name()='title')]" />
  </fo:block>
</xsl:template>
```

The PDF file will display the example structured as follows:

> Here is my example XPATH path:
>
> ```` xslt
> ancestor-or-self
> ```
>
> Unencapsulated text after a child node.


## XSL-FO: automatically insert a title for examples

By default, <abbr title="DITA Open Toolkit">DITA-OT</abbr> {.interpreted-text role="abbr"} does not automatically insert in PDF files the text *Example:* before the title of an example contained between **DITA XML** tags `<example>`{.interpreted-text role="samp"}. However, XSL-FO syntax offers this possibility.


Suppose the source code of one of your **DITA XML** files is as follows:

xml
<example>
  <title>
    XSL-FO
  </title>
  Here is my XPATH path example:
  <codeblock>
    ancestor-or-self
  </codeblock>
</example>
```

You want the generated PDF file to display the example structured as follows:

> **Example: XSL-FO**
>
> Here's my example XPATH path:
>
> ```` xslt
> ancestor-or-self
> ```

and if the example does not contain a title, it should be structured as follows:

> **Example :**
>
> Here's my XPATH path example:
>
> ```` xslt
> ancestor-or-self
> ```

By default, however, this content will be structured as follows in the PDF by <abbr title="DITA Open Toolkit">DITA-OT</abbr> {.interpreted-text role="abbr"} :

> **XSL-FO**
>
> Here is my example XPATH path:
>
> ```` xslt
> ancestor-or-self
> ```

It's still possible to enter text between `<example>`{.interpreted-text role="samp"} tags, but XSL-FO offers a more elegant and structured way of doing this.

### Automatically insert a text variable before the title of examples

1.  Replace in the `plugins/org.dita.pdf2/xsl/fo/commons.xsl` stylesheet (under <abbr title="DITA Open Toolkit">DITA-OT</abbr> {.interpreted-text role="abbr"} 1.7.) the following template:

    xslt
    <xsl:template match="*[contains(@class,' topic/example')]/*
    [contains(@class,' topic/title ')]>
      <fo:block xsl:use-attribute-sets="example.title>
        <xsl:call-template name="commonattributes"/>
        <xsl:apply-templates/>
      </fo:block>
    </xsl:template>
    ```

    with the following code:

    ``` xslt
    <xsl:template match="*[contains(@class,' topic/example ')]>
      <fo:block xsl:use-attribute-sets="example.title>
        <xsl:call-template name="insertVariable>
        <xsl:with-param name="theVariableID"
        select="'my-example-text'"/>
        </xsl:call-template>
        <xsl:apply-templates select="title"/>
      </fo:block>
      <fo:block>
      <xsl:apply-templates
      select="*[not(contains(@class, ' topic/title'))]
        |text()|processing-instruction()"/>
      </fo:block>
    </xsl:template>
    ```

2.  Define in the files containing the language variables, such as `plugins/org.dita.pdf2/cfg/common/vars/en.xml`, the text variables to be inserted automatically, for example :

    xslt
    <variable id="my-example-text>Example:</variable>
    ```

To achieve consistent behavior, you should disable this treatment for examples of specific *topics* types (*task*, in particular).

## PDF generation with DITA Open Toolkit under GNU/Linux

This DITA XML tutorial is designed to guide you through setting up and using the <abbr title="DITA Open Toolkit">DITA-OT</abbr> publishing chain in a GNU/Linux environment (Ubuntu or Debian).

Prerequisites

- Ubuntu or Debian on a physical or virtual machine with administrator password,
- Internet connection.

1. Download and unzip the archive <abbr title="DITA Open Toolkit">DITA-OT</abbr> :

    ```bash
    $ export REPO="https://github.com/dita-ot/dita-ot"
    $ wget $REPO/releases/download/2.1/dita-ot-2.1.0.tar.gz
    $ tar -xzvf dita-ot-2.1.0.tar.gz
    ```

2. Generate your first PDF :

    ```bash
    cd dita-ot-2.1.0
    $ dita -f pdf -i samples/taskbook.ditamap
    ```

Congratulations, you've compiled your first DITA XML project! The PDF file generated is `out/taskbook.pdf`. You can now compile other projects by skipping steps 1 and 2.

## Generate a PDF with DITA Open Toolkit (Windows)

This **DITA XML** tutorial is designed to guide you through setting up and using the <abbr title="DITA Open Toolkit">DITA-OT</abbr> {.interpreted-text role="abbr"} publishing chain in a Windows environment (tested on Windows XP).

**Prerequisites**

- Internet connection

1.  Download Java, then run the installation program.

2.  Download DITA Open Toolkit 1.5.4 to your desktop, then unzip `DITA-OT1.5.4_full_easy_install_bin.zip`.

3.  Select `Run`{.interpreted-text role="guilabel"} from the `Start`{.interpreted-text role="guilabel"} menu, paste the following command, then press `Enter`{.interpreted-text role="kbd"} :

    ```bash
    cmd
    ```

    A terminal appears.

4.  Paste the following command into the terminal:

    ```bash
    set full=DITA-OT1.5.4_full_easy_install_bin
    cd Bureau\%full%\DITA-OT1.5.4
    ```

5.  Paste the following command:

    ```bash
    startcmd.bat
    ```

    A new terminal appears.

6.  Paste the following command into the new terminal:

    ```bash
    $ java -jar lib/dost.jar /i:samples/taskbook.ditamap\
    /outdir:. /transtype:pdf2
    ```

    This command generates a PDF file from a sample **DITA XML** project.

    Congratulations, you've compiled your first **DITA XML** project! You'll find the target file `taskbook.pdf` in the `Bureau\\%full%\DITA-OT1.5.4` directory. You can now compile other projects by skipping steps 1 and 2.

## Managing multilingual DITA XML documentation projects

DITA XML is a great format for managing documentation projects. For multilingual projects, however, the technical editor must create a ditamap file, which contains the table-of-contents structure of the documents, by version. This creates the risk of errors and inconsistencies. Fortunately, an appropriate methodology and an automation script for the <abbr title="DITA Open Toolkit">DITA-OT</abbr> publishing chain remedy this problem.

### Methodology for managing multilingual DITA XML documentation projects

1. The ditamap file should not include a navtitle section, which contains a spelled-out title instead of extracting the title from the corresponding DITA XML section, and is therefore language-specific.

2. From the outset of your DITA XML project, place DITA XML content files in a sub-directory specific to the language in which they are initially written.

   For example :

   - product

     - en_US
       - images
       - tasks
       - topics

     and not :

   - product

     - images
     - tasks
     - topics

3. Replace all occurrences of the language-specific directory name in the ditamap file with a single temporary string.

   For example, use the string `@language-code@` :

   ```xml
   <topicref href="@language-code@/topics/managing-rights.dita"/>
   ```

   and not :

   ```xml
   <topicref href="en_US/topics/managing-rights.dita"/>
   ```

4. To generate the target files, you can now :

   a. modify the `default.locale` parameter in the `demo/fo/build.xml` file,
   b. replace the language variable in the ditamap file with the name of the language directory,
   c. change the language parameter `xml:lang` in the ditamap file and in DITA XML content files,
   d. for PDF target files, modify page dimensions (A4 or US letter, for example) according to language,
   e. generate target files,
   f. restore initial values in source files.

Fortunately, a simple Bash script (GNU/Linux) can automate all this.

**Prerequisites

- You have installed <abbr title="DITA Open Toolkit">DITA-OT</abbr>.
- Your DITA XML project includes only one ditamap file.
- Your DITA XML content files have the extension `.dita`.
- The directory names of the language versions correspond to the language codes supported by Dita Open Toolkit (`fr_FR` or `en_US`, for example).
- Your DITA XML content files are located in subdirectories of the language version directories (for example, in `fr_FR/tasks/` and `fr_FR/topics/`).

Supported values for PDF page size are `fr_FR` (A4) and `en_US` (US letter). This script can of course be easily adapted, or inspire a new script.

:::caution[Warning]
This script is supplied without warranty. Before running this script, make a backup of your entire DITA XML project, including configuration files (e.g. under a version control system). Make sure you can easily restore the entire project in the event of an error or unexpected behavior.
:::

To use this script :

1. Download the multilingual DITA XML generation script into the directory containing the project ditamap file.

2. In a terminal, navigate to this directory and enter :

   ```bash
   $ chmod +x dita2target.sh
   ```

3. In the terminal, enter :

   `````bash
   $ mkdir out
   ```

   to create the directory containing the target files.

4. Enter :

   ``````bash
   $ ./dita2target.sh <ditamap file> \
   <language directory name> <target format>
   ```

   to generate target files.

   The target format argument accepts values managed by <abbr title="DITA Open Toolkit">DITA-OT</abbr>.

   **Example**

   ```bash
   ./dita2target.sh firewall.ditamap en_US pdf2
   ```

   The PDF file `firewall.pdf` is then generated in the `out` directory (hard-coded in the script).
   
   
## Create different documents from the same DITA sources <abbr title="conditional text">XML</abbr>

**DITA XML** offers a conditional text mechanism. This mechanism promotes the reuse of source content and avoids redundant information. This tutorial will help the **technical writer** to use this mechanism in just a few minutes.

**Prerequisites

- You have installed <abbr title="DITA Open Toolkit">DITA-OT</abbr> in the `DITA-OT1.5.4` directory under GNU/Linux or Windows.

1.  Paste the following code into a file and save it as `conditional-text.dita` in the `DITA-OT1.5.4` directory:

    xml
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE topic PUBLIC "-//OASIS//DTD DITA 1.2 Topic//EN"
    "/usr/share/dita-ot/dtd/technicalContent/dtd/topic.dtd">
    <topic id="exemple-topic" xml:lang="fr-fr">
      <title>Using conditional text</title>
      <body>
        <hazardstatement>
          <messagepanel audience="electricians">
            <typeofhazard>
              Danger for electricians
            </typeofhazard>
            <consequence>
              Risk of electrocution
            </consequence>
            <howtoavoid>
              Do not touch electrical wires.
            </howtoavoid>
          </messagepanel>
          <messagepanel audience="plumbers">
            <typeofhazard>
              Danger for plumbers
            </typeofhazard>
            <consequence>
              Risk of drowning
            </consequence>
            <howtoavoid>
              Do not dive into the pool.
            </howtoavoid>
          </messagepanel>
        </hazardstatement>
        <p>
         Any content placed between tags that does not include an
         <i>audience</i> value excluded in a file
         <i>.ditaval</i> is published in documents
         intended for plumbers and electricians.
      </p>
      </body>
    </topic>
    ```

    This code contains **DITA XML** tags containing different *audience* values: we'll exclude the contents of one of these two tags when generating the target file using the *audience* key.

2.  Paste the following code into a file and save it as `conditional-text.ditamap` in the `DITA-OT1.5.4` directory:

    xml
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE bookmap PUBLIC "-//OASIS//DTD DITA BookMap//EN"
    "/usr/share/dita-ot/dtd/bookmap/dtd/bookmap.dtd">
    <bookmap id="text-conditional">
      <booktitle>
        <mainbooktitle>
          Example of conditional text
        </mainbooktitle>
      </booktitle>
      <chapter href="conditional-text.dita"/>
    </bookmap>
    ```

3.  Paste the following code into a file and save it as `electriciens.ditaval` in the `DITA-OT1.5.4` directory:

    xml
    <?xml version="1.0" encoding="UTF-8"?>
    <val>
      <prop att="audience" val="electriciens" action="include"/>
      <prop att="audience" val="plumbers" action="exclude"/>
    </val>
    ```

4.  Paste the following code into a file and save it as `plumbers.ditaval` in the `DITA-OT1.5.4` directory:

    xml
    <?xml version="1.0" encoding="UTF-8"?>
    <val>
      <prop att="audience" val="electriciens" action="exclude"/>
      <prop att="audience" val="plumbers" action="include"/>
    </val>
    ```

5.  Open a terminal and enter the following command in the `DITA-OT1.5.4` directory:

    ```bash
    $ java -jar lib/dost.jar /i:texte-conditionnel.ditamap /filter:electriciens.ditaval /outdir:.
    /filter:electriciens.ditaval /outdir:. /transtype:pdf2
    ```

    Open the file `conditional-text.pdf`; it contains information for :

    - plumbers and electricians,
    - electricians only.

6.  Open a terminal and enter the following command in the `DITA-OT1.5.4` directory:

    ```bash
    java -jar lib/dost.jar /i:texte-conditionnel.ditamap /filter:plumbers.ditaval /outdir:.
    /filter:plumbers.ditaval /outdir:. /transtype:pdf2
    ```

    Open the file `conditional-text.pdf`; it contains information for :

> - plumbers and electricians,
> plumbers only.

## DITA Open Toolkit: display cross-references in PDFs

:::note

Cross-references are an important element of well-structured **technical documentation**. They enable the user to navigate easily through the information bricks, and are a crucial element in the usability of the final document. <abbr title="DITA Open Toolkit">DITA-OT</abbr> handles them very well, provided a few adjustments are made.
:::

You've placed correctly formatted *related-links* tags in your **DITA XML** content files, or better still, a reltable in your *ditamap* table of contents structure (the *reltable* allows you to decontextualize your content and therefore reuse it better). You launch your PDF generation command and, unpleasantly, no *See also* section appears in the target file! You then try to generate an HTML version of your content and there, your *See also* section is indeed present. Wouldn't <abbr title="DITA Open Toolkit">DITA-OT</abbr> support cross-referencing in PDFs?

Fortunately, no. By default (go figure), cross-references are not generated in PDFs by <abbr title="DITA Open Toolkit">DITA-OT</abbr>. To display them, assign the value *no* to the *disableRelatedLinks* variable in the `demo/fo/build_template.xml` file. If you use *ant*, you'll also need to pass the *args.fo.include.rellinks=all* parameter as follows:

```bash
ant -Dargs.input=samples/sequence.ditamap -Doutput.dir=out/ \
-Dtranstype=pdf2 -Dargs.fo.include.rellinks=all
```

## Display an index in a <abbr title="but not under DITA Open Toolkit">PDF</abbr>

Not everything is perfect under <abbr title="DITA Open Toolkit">DITA-OT</abbr> {.interpreted-text role="abbr"}, the **DITA XML** free publishing engine. You've meticulously inserted your index entries into your **DITA XML** content files. You generate a PDF output and the index does not appear. A compiler error message tells you that, unfortunately, FOP does not currently support index generation.

Faced with this situation, you have four solutions:

- wait until FOP supports indexes; without an availability date, this choice will be difficult to get your management to accept;
- abandon **DITA XML**; it would be a shame to give up the tremendous productivity gains offered by this format;
- give up on displaying the index in the PDF; the arguments in favor of such a choice have some weight: indexes are difficult to maintain and offer a questionable surplus of usability in a document that will only be consulted marginally in printed form;
- abandon <abbr title="DITA Open Toolkit">DITA-OT</abbr> {.interpreted-text role="abbr"} and turn to a proprietary solution; non-open-source software, such as XMetal, often uses RenderX's XEP publishing engine, which perfectly supports indexes.

The index problem is therefore not an obstacle to the adoption of **DITA XML**. If your final medium is a printed document, solutions exist. If it's an electronic format, the absence of an index is more than compensated for by the full-text search function.

## Use the nXML IDE for DITA XML

<a id="utiliser-ide-nxml-pour-dita-xml"></a>

The nXML mode offers real-time validation of XML **DocBook**, XHTML or other documents. No need to know the XML schema by heart: your text editor will autocomplete XML tags according to context. It does not, however, support **DITA XML** by default. This tutorial will show you how to use this Emacs mode for **DITA XML**.

Prerequisites

- Emacs
- The directory structure of your **DITA XML** documentation project must be as follows:
  - language directory
    - concepts
    - faq
    - reference
    - tasks
    - topics

  where <language directory> has the value en_US, or fr_FR, etc.
- Command line instructions are designed for GNU/Linux; they must be adapted for use in other environments.

1. Make a backup of your entire **DITA XML** documentation project.

2. Open a terminal and paste the following command sequence:

    ```bash
    $ export THAI="http://www.thaiopensource.com/download"
    $ export RED="http://www.redaction-technique.org/media"
    $ cd && \
    wget $THAI/nxml-mode-20041004.tar.gz && \
    tar xzvf nxml-mode-20041004.tar.gz && \
    wget $RED/nxml-mode-environmment.txt && \
    cp .emacs .emacs.bak && \
    cat .emacs | sed '$a\' > .emacs.tmp && \
    mv .emacs.tmp .emacs && \
    cat nxml-mode-environmment.txt >> .emacs && \
    rm nxml-mode-environmment.txt
    ```

    :::note[Note]
    If a message warns you that the `.emacs` file does not exist, paste the following commands, then repeat the operation:

    `````bash
    cd && touch .emacs
    ```
    :::

    This sequence of commands :
    - downloads and unzips the nXML mode,
    - creates a backup copy of the `.emacs` file (`.emacs.bak`),
    - writes nXML mode environment variables to the `.emacs` file.

3. Download the RelaxNG schema archive for DITA XML into the root directory of your **DITA XML** documentation project.

4. Go to the root directory of your **DITA XML** documentation project, then paste the following command:

    ```bash
    $ tar xzvf rnc.tar.gz
    ```

    This command creates an `rnc` directory at the same level as the <language directory>.

5. Download the archive of schemas.xml files into the root directory of your **DITA XML** documentation project, then paste the command sequence below, replacing <language directory> with the appropriate value, en_US, or fr_FR, for example. Repeat this step for all your language directories.

    ```bash
    $ export DIR="schemas.redaction-technique.org"
    $ tar xzvf $DIR.tar.gz && \
    cd <language directory> && \
    cp ../$DIR/concepts/schemas.xml concepts/ && \
    cp ../$DIR/faq/schemas.xml faq/ && \
    cp ../$DIR/reference/schemas.xml reference/ && \
    cp ../$DIR/tasks/schemas.xml tasks/ && \
    cp ../$DIR/tasks/schemas.xml tasks/ && \
    cp ../$DIR/topics/schemas.xml topics/ && \
    rm -rf ../$DIR/
    ```

    Your language directories should now contain the appropriate `schemas.xml` files:
    - en_FR
      - concepts
        - schemas.xml
      - faq
        - schemas.xml
      - reference
        - schemas.xml
      - tasks
        - schemas.xml
      - topics
        - schemas.xml

6. Open a **DITA XML** content file (`.dita`) with Emacs. The **DITA XML** syntax is shown in color. Places where the schema is not respected are underlined in red.

7. To insert a new tag, enter <, then press Ctrl+Enter. The list of possible tags appears.

8. Select a tag, then press Enter. Press Ctrl+Enter to display the list of permitted attributes.

9. To insert a closing tag after text, enter </, then press Ctrl+Enter.

## Speed up your typing with Predictive mode for Emacs

This Predictive mode tutorial for Emacs is designed to help you set up and use Emacs' Predictive word autocompletion and editing mode in a GNU/Linux environment (in this case, Debian).

1.  Install make and texinfo :

    ```bash
    $ sudo aptitude install make texinfo
    ```

2.  Download Predictive.

3.  Unzip the Predictive archive:

    ```bash
    $ tar xzvf predictive-0.23.13.tar.gz
    ```

4.  Go to the `predictive` directory:

    ```bash
    $ cd predictive
    ```

5.  Compile predictive :

    ```bash
    $ make
    ```

6.  Install predictive :

    ```bash
    $ sudo make install
    ```

7.  Insert the following code in the `.emacs` file:

    ```
    ;; predictive install location
         (add-to-list 'load-path "~/.emacs.d/predictive/")
         ;; dictionary locations
         (add-to-list 'load-path "~/.emacs.d/predictive/latex/")
         (add-to-list 'load-path "~/.emacs.d/predictive/texinfo/")
         (add-to-list 'load-path "~/.emacs.d/predictive/html/")
         ;; load predictive package
         (require 'predictive)
    ```

8.  Start Emacs, then press Alt+X and enter :

    ```
    predictive-mode
    ```
