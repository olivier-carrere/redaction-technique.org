---
title: "Structured and unstructured formats"
description: "The information contained in a technical document can be categorized according to its meaning."
---

:::tip

Structured formats promote the creation of minimalist, complete and coherent documents. They enable the technical writer to concentrate on content, and improve the user experience and usability of technical documentation.
:::

The information contained in a technical document can be categorized according to its meaning. By default, DITA XML offers three basic types:

| Type | Description |
|------------|-------------------------------------------------------------------------------------------------|
| concept | Introduction or presentation of a concept.
| task | Sequential, numbered, step-by-step procedure for performing a task.
| reference | Reference information on a list of items, such as program options.

![Structured and unstructured formats](/assets/structured.svg)
**Structured and unstructured formats**

In an unstructured format such as FrameMaker's traditional format, the technical writer is under no obligation to organize the information according to its meaning. If rigorous editing rules are not scrupulously followed, the information provided to the user is likely to be unclear and difficult to navigate quickly.

With structured formats such as DITA XML, on the other hand :

- the technical writer concentrates on content,
- information is presented to the user in a coherent, predictable organization,
- access to information is sequential and rapid,
- information can be easily reorganized as required,
- the usability of the information support provided is optimal.

High-level information types such as task are divided into lower-level types, for example :

| Element | Description |
|-----------|-----------------------------------------------------------|
| prereq | List of mandatory items required to complete a task. | steps | Series of steps.
| steps | Series of procedural steps.
| stepxmp | Example of step completion.

Syntax rules prohibit the technical writer from including a step-by-step procedure in a section of any type other than task. This provides the technical writer with a real writing model to help him present information:

| Characteristic | Description |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A task section, for example, contains only prerequisites, a procedure and a few other specific elements. All conceptual or reference information is placed in separate sections.
| A task section without a procedure is not a valid DITA XML section and cannot be published. It is even possible to implement a mechanism that automatically checks for the presence of information blocks that are optional according to the DITA XML XSD schema, but which the technical editor deems mandatory, such as the result of a procedure.
| Consistent | Information of the same type is presented in the same order and with the same layout; identical blocks of information repeated in different places, such as a remark, come from the same source and are therefore strictly identical. |

## DocBook or DITA XML?

Some companies have existing content in DocBook format. Often managed by the company's most technical staff, it coexists with other content in **FrameMaker** or word-processing format. If the decision is taken to federate all corporate content in a single format, it seems natural to capitalize on the efforts made in the **DocBook** creation and publication chain, and to select this format. However, this would mean missing out on the spectacular productivity gains offered by **DITA XML**.


It's easy to generate **DocBook** from **DITA XML**. <abbr title="DITA Open Toolkit">DITA-OT</abbr> {.interpreted-text role="abbr"} offers this target format by default, just like PDF or HTML. The reverse operation cannot be fully automated. Why not?

![A non-reversible process](/assets/entropy.svg)
**A non-reversible process**

It's not possible to automatically migrate data from information-poor to information-rich formats.

Simply because content in **DITA XML** format contains more information. Switching from a richer to a poorer format is an entropic operation that can easily be automated. For example, generating a PDF from **DITA XML**. Performing the reverse operation requires the injection of intelligence, an operation that only human beings can perform today.

If your content were a photo, we could make the following analogy:

| Content format | Photo format |
|-------------------|-----------------|
| DITA XML | RAW |
| DocBook | TIFF |
| PDF | JPEG |

Switching from RAW to TIFF and from TIFF to JPEG is destructive and cannot be reversed.

![A non-reversible process](/assets/entropy-dita-docbook.svg)
**A non-reversible process**

PDF is semantically poorer than **DocBook**, itself poorer than **DITA XML**.

If your company insists on using **DocBook**, you can always generate **DocBook** content from **DITA XML** source content. As long as the source content remains in **DITA XML** format (i.e., as long as no changes to the **DocBook** content are saved), and as long as the **DocBook** format is only a step in the generation of deliverables, in the same way as the FO format, you benefit from the advanced content reuse features offered by **DITA XML**.

The effort involved in migrating from an unstructured format to **DITA XML** is a little greater than to **DocBook**, since you need to inject more semantic information. You also have to migrate the **DocBook** content to **DITA XML**, which also represents an effort, albeit a smaller one. But your content is immediately of better quality, because it's more structured. And you'll soon be able to reap the rewards of your hard work, especially if you're thinking of translating your content into a new language.

Generally speaking, it's always in a professional's interest to work on the richest format, if only to be proactive and anticipate new needs.

## FrameMaker migration to DITA XML

Migrating from **FrameMaker** to **DITA XML** is not like saving a **MS Word** document in **LibreOffice** format. There is no automatic process for migrating an unstructured document to a structured format. In the worst-case scenario, depending on the quality of your original document, this can be like turning a wasteland into a French garden. But a well-planned migration allows you to switch to the new format without disrupting the rhythm of your deliveries.

To use a metaphor, if you set yourself the goal of converting a swamp into the parterre of the Château de Versailles, you'd have to go through the English garden stage - a place that may not be strictly architectural, but that's very pleasant to live in. Good news: if the **technical editor** has consistently used a limited set of styles and rationally organized his **FrameMaker** content, he's certainly already very close to this stage.

![Migration from FrameMaker to DITA XML](/assets/framemaker-to-dita-migration.svg)
**Migration from FrameMaker to DITA XML**

By the way, if, for any reason, your migration project were to stop there, the technical writers, the company and the users would already have gained a great deal, respectively in :

- ease of updating,
- consistency and speed of publication of new versions,
- easier access to information.

### FrameMaker content restructuring

The automated part of a migration from FrameMaker to **DITA XML** consists in applying a conversion table between **FrameMaker** styles and **DITA XML** structures.

However, a significant amount of restructuring of the **FrameMaker** document must be carried out beforehand:

- restructuring of information according to the three categories *concept*, *task* and *reference*,
- elimination of *overrides* (text properties applied manually and overwriting styles; this kind of heresy is, if not impossible, at least very limited in a structured format),
- harmonization and simplification of **FrameMaker** styles to limit them and match them to the **DITA XML** tags that will be used (for example, a *note_important* style to the <note type="important" tag>; it is therefore necessary to analyze the existing content beforehand and decide which set of tags will be used from among the hundreds proposed by **DITA XML**: it is strongly inadvisable to use them all).

![Restructuring FrameMaker content and setting up the DITA XML chain](/assets/framemaker-restructure.svg)
**FrameMaker content restructuring and DITA XML string implementation**

This harmonization work can be carried out in parallel with the updating and publication of the **FrameMaker** document. The quality of this document will be all the better for it. At the same time as reorganizing your content, you can implement the complete **DITA XML** creation, management and publication chain on a sample of your content:

- set up the tools,
- creation of style sheets for the various output formats,
- training of technical editors, graphic designers and translators,
- training and awareness-raising for other company staff.

Only when the chain is reliable and accepted, and even expected by the other players in the company, can the **technical editor** consider migration.

If your documents are available in several languages, you need to modify the **FrameMaker** files and perform the migration for each language. If you're planning to translate your documents into a new language, it's best to migrate them first!

### FrameMaker to DITA XML conversion table

Once the FrameMaker files are ready for migration, and the **DITA XML** chain has been fully integrated into the company's technical and human processes, the **Technical Editor** can apply the conversion table.

You should now be able to archive the **FrameMaker** files, and then switch over completely to **DITA XML**.

![Apply conversion table from FrameMaker to DITA XML](/assets/dita-migration.svg)
**Application of a conversion table from FrameMaker to DITA XML**

Of course, you'll need to apply this process to a small set of documents, one that is not, if possible, of critical importance. After this initial success, you can apply the process to other document sets.

You can now progressively modularize and share your content in the new format to get the most out of **DITA XML**. During this phase, you can continue to publish new versions of the document; in fact, publishing should be much simpler than with **FrameMaker**.

### Migrating from FrameMaker to DITA XML

The aim of this procedure is to :

- migrate FrameMaker content to DITA XML without having to delve into the arcana of FrameMaker EDDs (small projects only!),
- manage technical documentation in DITA XML format, without using `structured` FrameMaker.

1. Restructure the content and styles of your FrameMaker content files according to DITA XML concepts.
2. Create an empty FrameMaker document and import all existing styles from the files to be migrated.
3. Apply all available styles to empty paragraphs in the empty FrameMaker document.
4. Save the empty FrameMaker document as `styles.fm`.
5. Open FrameMaker `structured 11` and create a new DITA XML topic file.
6. Choose `StructureTools` ‣ `Export element catalog as an
    as EDD` and save the new EDD as `DITA-topic-edd.fm`.
7. Open the `styles.fm` file, then choose `File` ‣ `Import element
    element definitions` and import the element definitions from `DITA-topic-edd.fm`.
8. Repeat the above three steps for the other DITA topic types <abbr title="task, reference, etc.">XML</abbr>, modifying the file names as appropriate.
9. Open the `styles.fm` file, then choose `StructureTools` ‣ `Generate conversion table`.
10. Edit the conversion file and map each FrameMaker style to a DITA XML tag.
11. Save the conversion table as `DITA2FM-conversion-table.fm`.
12. Open a FrameMaker content file under FrameMaker structured 11 and choose `StructureTools` ‣ `Utilities` ‣ `Structure current document
    document`.
13. Select `DITA2FM-conversion-table.fm` and click `Add
    structure`.
14. Save the FrameMaker content file in XML format without selecting an application.
15. Open the generated XML file in a DITA XML editor and correct the DITA XML syntax. Some aspects of this step can be scripted, but you'll also need to restructure the content manually. In particular, you'll need to place cross-references by hand, preferably in a reltable.

To generate the elements needed to build a ditamap file, you can use Perl scripts such as :

:::caution[Warning]
Only run this type of script on a copy of your files, not on the original files.
:::

```perl
#!/usr/bin/perl
open(INPUT,"<$ARGV[0]") or die;
@input_array=<INPUT‣;
close(INPUT);
$input_scalar=join(",@input_array);
# substitution
$input_scalar =~ s#\<body‣(.|\n)*?</body‣##ig;
open(OUTPUT,‣$ARGV[0]") or die;
print(OUTPUT $input_scalar);
close(OUTPUT);
```

You can also easily modularize content using the xml_split XML scissors, or use the Perl XML::Twig module, or this Bash one-liner to rename `.dita` files after their title:

```bash
$ ack "<title‣" *.dita| sed "s# #_#g;" |
tr '[:upper:]' '[:lower:]' |
sed -E "s#(.*.dita)#mv \1#g;" |
sed -E "s#\.dita.*<title‣(.*)</title‣#.dita \1.dita#g;"
```

