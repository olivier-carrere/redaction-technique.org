---
title: "From document to modular document base"
description: "The DITA XML structured authoring format offers a way to move from the book model to the modular document base model."
---

The book model is still predominant for creating and managing information. But enterprise content is often scattered across numerous documents, in heterogeneous formats. This results in duplication, inconsistencies, high update and translation costs, and delivery delays. However, there are other, more efficient models available to the technical writer.

The DITA XML structured authoring format offers a way of moving from the book model to that of the modular document base. Enterprise content is based on single bricks, which can be dynamically assembled on demand to produce documents in different target formats.

![Modular documentation offers unrivalled flexibility](/assets/documentation-modulaire.svg)
**Modular documentation offers unrivalled flexibility**

The volume of source content is minimized, reducing the cost of creating, updating and translating corporate content. What's more, the technical writer can manage the writing, validation and translation processes module by module. Workflows can thus be parallelized, reducing time-to-market.

DITA XML files can also be easily centralized under a single repository, such as a <abbr title="content management system">ECM</abbr> or a <abbr title="version control software">VCS</abbr>. The company's intangible capital is thus preserved.

## A language with tags

DITA XML is a tag-based language: the technical writer structures the information in source files without layout, similar to computer code source files. The user receives a target document, such as a PDF file, in which the tags are replaced by typographical formatting.

If your company provides its customers with technical documentation in MS Word format, the technical writer and the user have the same information media (there is no differentiation between source and target files). However, what seems at first sight to be the simplest solution turns out not to be very effective in terms of productivity for the technical writing team and information structuring.

With a text format such as DITA XML, the technical writer and the reader have very different media at their disposal:

| Role             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Technical writer | The technical writer manipulates source files; he uses tags to construct the document, marking the information elements he creates or reuses. Tags are nested like Russian dolls, organized according to a rigorous syntax. The source file is not in WYSIWYG format: the layout will be applied when the source files are transformed into target files (in other words, when the deliverables are generated). Some graphics software packages, such as XMetal, Oxygen or structured FrameMaker, offer the <abbr title="what you see is what you mean">WYSIWYM</abbr> format, where tags are replaced on screen by a generic layout, different from the document's final appearance. The advantage of a markup language is that you can see exactly what you're doing by manipulating the markup yourself, without delegating interpretation to graphics software. |
| User             | Only content is presented to the reader in the target file; text marked with tags in source files has a typographical emphasis, the meaning of which is explained in the Typographical Conventions section of the final document.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |


A DITA XML source file is a mixture of text and tags, delimited by the < and > signs. The text itself is encapsulated in a set of opening tags of type <tag> and closing tags of type </tag> according to the <tag>text</tag> scheme. Any text entered outside an opening and closing tag is incorrect and produces an invalid file.

## High-level information typology

**DITA XML** provides the **technical writer** with a high-level typology to help structure content.

When creating a new document in **FrameMaker**, **DocBook** or word processing format, the **technical writer** is faced with a blank page. Depending on his professional rigor, the information transmitted to the user will oscillate between the following two poles:

| Element / Concept     | Description                                                                                      |
|-----------------------|--------------------------------------------------------------------------------------------------|
| Rational organization | The user has quick and easy sequential access to the information he needs.                       |
| Informative magma     | The user has to read an entire section, or even the entire document, to find useful information. |
| concept (DITA XML)    | General text, such as an introduction or presentation.                                           |
| task (DITA XML)       | Step-by-step procedure for performing a task.                                                    |
| reference (DITA XML)  | Reference information such as explanation of command parameters.                                 |

Each of these high-level categories has its own set of lower-level tags. If the **technical writer** is writing a technical document, chances are that the information he has collected and needs to organize falls into one of these three categories. From the outset, therefore, this division into types of information obliges the **technical writer** to structure the information. The user gains in ease and speed of access to the information, and in the overall usability of the technical documentation.

## On-demand content organization

Information bricks can be assembled on demand in external table of contents structures, called *ditamap*.


The organization of information in **DITA XML** is not fixed. Bricks can be organized in different hierarchical structures, according to changing needs. If the **technical writer** has taken care to build atomic and generic information bricks, he can, like a car manufacturer constantly proposing new models by assembling standardized elements, propose the following documents, for example:

| Document                                                                  | Content                 |
|---------------------------------------------------------------------------|-------------------------|
| Themes systematically organized into concepts and step-by-step procedures | Presentation document   |
| Presentation document                                                     | Concepts                |
| Quikstart                                                                 | Step-by-step procedures |
| Reference manual                                                          | Reference information   |

To achieve this, the **technical writer** should take care to place context-specific elements in *ditamap* structures and not in **DITA XML** content files. In particular, cross-references must be indicated in a *reltable* placed in the *ditamap*: if document *A* must refer to document *B* in *ditamap* *1*, it must also be able to be used without modification in *ditamap* *2*, where document *B* is not included.

The organization of working directories must also allow the use of relative links, particularly to images, which will never be broken.

## Single-sourcing: one source format, several target formats

Single-sourcing* is a subject that has long divided technical writers: should different **technical writing** media, such as an online help and a printed manual, offer radically different content, or can they be generated from the same source content?


Productivity constraints and cost-cutting have led to a debate in favor of *single-sourcing*. The qualitative gain, debatable, does not offset the cost of creating, maintaining and translating a different source version for each target version.

![One set of information, multiple output formats](/assets/single-sourcing.svg)
**One set of information, multiple output formats**

If the **technical writer** practices *single-sourcing*, he must nevertheless select at the start of the project the paradigm on which he will base his work: the book or online help. For a long time, the tools offered were based either on a book-like document (**MS Word**, or **FrameMaker**, essentially) which could be exported in online help format, or on a Windows help source file (RTF), to generate a PDF. A significant loss of navigation information (indexes, cross-references, links, etc.) often occurred during export.

**DITA XML** offers a target-format agnostic model. Source files, although based on a modular model close to that of online help, can easily be exported as PDF files, online help, linked HTML pages or other, without any loss of information.

## Topics, basic DITA XML information modules

Topics are the smallest autonomous information units managed by **DITA XML**. Each *topic* has a title and body text. It deals with a single topic. It is therefore up to the **technical writer** to use the modularity offered by **DITA XML** to structure the information.

Topics* are semantically typed. Ideally, there is one type of *topic* for each type of information. By default, **DITA XML** offers *topics* adapted to software documentation (concept and task descriptions, command lists, etc.), but new *topic* types can be created to meet other needs.

Topics* are one of the main differences between **DITA XML** and **DocBook**, which does not offer a typology of information bricks.

Topics* are generally stored flat in directories divided by *topic* type. They are organized hierarchically in *ditamap* files and can be shared between different documents. Module titles are not assigned a title level. As the structure of the modules is perfectly homogeneous, a module can have a level 3 in a given document, and a level 1 in another document, without any need to modify the *topics* in any way.

Atomic units of information such as remarks, paragraphs, even sentences or sentence segments, which cannot be given a title, do not form *topics*. They can, however, be shared via the *conref* mechanism, similar to the *Xinclude* mechanism proposed by **DocBook**.

## Managing DITA XML content with or without a CMS?

The DITA XML architecture does not offer a native document workflow mechanism. Yet workflows are an important element of an efficient content lifecycle management process.

The <abbr title="Content Management System">CMS</abbr> also manage metadata, enabling more efficient searching of existing information, and backlinks.

Most companies are reluctant to implement <abbr title="Content Management System">CMS</abbr>, tools dedicated to workflows. In fact, they have sometimes failed to implement such solutions in the past.

What's more, one of the great advantages of DITA XML is that it can be integrated directly into existing information systems. For software publishers in particular, nothing could be easier than grafting onto the existing source management system, whether it's Git, Subversion or SourceSafe. On a shoestring budget. All the more reason not to invest time and money in a <abbr title="Content Management System">CMS</abbr>. The spectacular productivity gains reported by some companies following the implementation of a <abbr title="Content Management System">CMS</abbr> DITA XML are, however, food for thought. Epson America, for example, has been able to reuse up to 90% of existing content on new projects.

If you opt for a <abbr title="Content Management System">CMS</abbr>, it must clearly support DITA XML: you can't manage a set of information bricks like a monolithic document. So farewell SharePoint or Alfresco, and turn to dedicated solutions such as Componize or DocZone.

Whatever the initial choice, it is possible to change strategy at any time, without jeopardizing the existing system. DITA XML architecture is not tied to any particular repository. So there's no reason why you can't start managing your projects without <abbr title="Content Management System">CMS</abbr>, and then switch to a DITA XML solution if the benefits of doing so become apparent.

**See also**
- [Git: from file to content](../../tech-writing-process/reference/git-from-file-to-content)
