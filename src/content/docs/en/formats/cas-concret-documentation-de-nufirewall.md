---
title: "Case study: NuFirewall documentation"
description: "NuFirewall's documentation, which was perceived by the press as one of the product's strong points, was produced using DITA XML."
---

NuFirewall's documentation, which was perceived by the press as one of the product's strong points, was produced using **DITA XML**.

If I hadn't used a format that encourages the reuse of information as much as possible, I wouldn't have been able to devote as much time to the essential: the content.

## Sharing atomic blocks of information with conref

When the **technical editor** wants to reuse **DITA XML** information blocks smaller than a section, he must share them at the level of *dita* content files and not in *ditamap* table of contents structures, thanks to the conref mechanism.


The *conref* principle is simple: when a *conref* is mentioned at the level of a given XML node, all the content of the target node is replaced by the content of the source node.

![Sharing of large granularity information blocks between ditamaps](/assets/ditamap.svg)
*Sharing of wide granulometry information blocks between* ditamap

One notable difference between the *conref* mechanism and the XML xinclude mechanism is that the source node must conform to the XSD schema of the source *and* target file. This rigorous formalism, while less flexible and sometimes requiring a bit of acrobatics, makes *conref* much more readable than *xinclude* and encourages its use.

![Sharing fine-grained information blocks between DITA XML sections](/assets/conref.svg)
**Sharing of fine-grain information blocks between DITA XML sections** (/assets/conref.svg)

### Centralize conref in a single file

:::note

To promote the use of conref within a team of technical writers, and also to simplify conref maintenance, it proves very effective to centralize all conref in a dedicated DITA XML file.
:::

A priori, it's easier to reuse content from an existing DITA XML file by pointing to that content without extracting it from its original context. However, one of the main principles of content reuse is to decontextualize content. It is therefore ultimately much more efficient for the technical writer to extract reused content from its original file and place it in a file containing only conref sources. In fact, it's much easier to place all source elements in a single repository than to have to search for the various sources in a multitude of files.

![Decentralized conref management is inefficient](/assets/conref-non-centralized.svg)
*Managing *conref* in a decentralized way is not very efficient.

Conref are resolved at compile time even if the files containing the source values are not referenced in the ditamap file used to generate the deliverable (which also means that the files containing the conref source values may be located in a higher-level directory than the ditamap).

![Good conref management](/assets/conref.svg)
*Good conref management

Content files referenced in ditamap structures therefore contain only target conref values, and a central file federates all source conref values; it may also contain some internal references to target conref values.

This central file must be of the same type (task, concept, reference, etc.) as the content files, or at least of the composite type, which accepts all types of DITA XML structures. For organizational reasons, I personally find it efficient to create a central file for each type of DITA XML topic, and therefore of the same type, to share the information specific to each type. I reserve the composite type for a central catch-all file containing information shared between different topic types.

All source conref in a given file must have a unique ID in that file; make sure you use explicit names for humans, otherwise your dita files containing target conref will quickly become unreadable!

### Use the lowest-level XML node

The **technical editor** must use the lowest-level **DITA XML** node containing the information to be shared as the conref source.


Since the purpose of *conref* is to manage small blocks of information, it makes sense to manipulate them at the level of the smallest XML structure encapsulating the information, even if this structure, to be compatible with the XSD schema of the **DITA XML** section in which it occurs, must itself be included in larger XML structures.

![Conref placement on lowest-level XML node](/assets/conref-low-level.svg)
*Placement of the *conref* on the lowest-level XML node.

For example, you might want to reuse the phrase *Click OK.* However, you can't just specify the following code in the file containing the source *conref*:

```xml
<Click OK.
```

To comply with the XSD schema, your code must at least be structured as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA 1.2 Task//EN"
/usr/share/dita-ot/dtd/technicalContent/dtd/task.dtd">
<task id="shared" xml:lang="fr-fr">
  <title>Conref source</title>
  <taskbody>
    <steps>
      <step>
        <cmd>
          Click on OK.
        </cmd>
      </step>
    </steps>
  </taskbody>
```

Now it's a matter of placing an ID on an XML structure so that you can reuse the contents of that structure. In this case, it's a single step comprising a single command that you want to reuse.

It's best to use the following syntax:

```xml
<step>
  <cmd id="click-ok">
    Click on OK.
  </cmd>
</step>
```

rather than the following:

``` xml
<step id="click-ok">
  <cmd>
    Click on OK.
  </cmd>
</step>
```

Indeed, in the first case, you'll be able to use the *conref* even if the top node (`<step>`{.interpreted-text role="samp"}) contains nodes other than `<step>`{.interpreted-text role="samp"} (for example `<info>`{.interpreted-text role="samp"}).

![Placement of the conref on the highest-level XML node](/assets/conref-high-level.svg)
*Placement of *conref* on top-level XML node.

In the 2nd case, the entire content of the `<step>`{.interpreted-text role="samp"} node will be replaced by the value of the source *conref*. For example, in the following case, all node content will be absent from the deliverables:

```xml
<step id="click-ok">
  <cmd/>
  <info>
    If you can't read, this is the green button.
  </info>
</step>
```

### Take translation constraints into account

The smallest DITA XML information unit is the `<ph>` node. However, the technical writer must take care to apply the conref mechanism to it only for a complete sentence or a term that will never be translated (for example, the name of the company or a product). Otherwise, major problems arise when translating into other languages.

Sentences break up differently in different languages](/assets/translation-conref.svg)
**Sentences break up differently in different languages.

Example

If you decide to push the granularity down to the sentence segment level and define the following conref :

```xml
<ph id="click">Click the</ph>

<ph id="blue">blue</ph>

<ph id="arrow">arrow</ph>
```

You can now use the following code:

```xml
<p>
  <ph conref="shared.dita/click"/>
  <ph conref="shared.dita/blue"/>
  <ph conref="shared.dita/arrow"/>.
</p>
```

to generate the phrase Click the blue arrow.

Let's now try to create a French version of this sentence. We translate the conref as follows:

```xml
<ph id="click">Click on the</ph>

<ph id="blue">blue</ph>

<ph id="arrow">arrow</ph>
```

We then get the sentence Click on the blue arrow.

To overcome this problem, you'd have to rearrange the order of the conref in the translated DITA XML file, which is difficult to manage and loses all interest in the mechanism. Not to mention the fact that problems worse than this can lead to the conref used in the source language being completely abandoned in the target language (I have no concrete example to offer, as I've always avoided falling into this kind of trap).

### Imbricate conref

For reasons of ease of updating and maintenance of **DITA XML** content, the **technical editor** must limit the Russian doll effect and avoid nesting conref too much. A single level of nesting (one *conref* nested within another) seems to me to be the threshold beyond which content can quickly become unmanageable.


In the example below, the source *conref* *see-admin-guide* contains the target *conref* *admin-guide-title* :

**Example**

```xml
<p id="see-admin-guide">
  For further information, see the <ph
  conref="shared.dita/admin-guide-title"/>.
</p>
```

This level of complexity is manageable. But if the source *conref* *admin-guide-title* itself contains a target *conref*, the **DITA XML** code becomes a veritable dish of spaghetti (not to mention the risks of circular references). Theoretically, *conref* can be combined ad infinitum, but the practical problems this entails can also be infinite!

Nesting conref on several levels: powerful, but dangerous](/assets/imbriquer-conref.svg)
*Multi-level nesting of *conref*: powerful, but dangerous!

To sum up the situation:

- It's perfectly possible to nest multiple *conref* sources. The only negative side-effect is on the readability of the file containing the *conref*.
- Nesting source and target *conref* is possible, but quickly unmanageable.
- Target *conref* cannot be nested: the contents of the *conref* at the top level will overwrite the values of the *conref* at the bottom level.

### Maximizing the use of conref to reduce costs

:::tip

Using conref is the best way for the **technical editor** to dramatically reduce costs and publication times for his **DITA XML** content, especially for multilingual documents.
:::

Due to the nature of the information they contain, *task* sections have a higher rate of content reuse than *concept* or *reference* sections.

![Conref modularize small blocks of information](/assets/maximize-conref.svg)
*Conref* modularize small blocks of information.

As in the example below, it's not uncommon to quickly obtain files whose only unique value is the title, with the rest of the content, which is *unique* (because it uniquely assembles non-unique blocks of information), being generated by *conref*.

**Example**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA 1.2 Task//EN"
"/usr/share/dita-ot/dtd/technicalContent/dtd/task.dtd">
<task id="display-trends" xml:lang="fr-fr">
  <title>Display trends</title>
  <taskbody>
    <context audience="basic">
      <note type="restriction" audience="advanced">
        <ul>
          <li>
            <ph conref="shared.dita/ip-control"/>
          </li>
        </ul>
        <ph conref="../../shared/shared.dita/see-user-guide"
        audience="no-user-guide"/>
      </note>
    </context>
    <steps>
      <step>
        <cmd audience="basic">
          <menucascade>
            <uicontrol conref="shared.dita/logs"/>
          </menucascade>
        </cmd>
        <choices audience="advanced">
          <choice>
            <ph conref="shared.dita/physical-appliance"/>
            <menucascade>
              <uicontrol conref="shared.dita/logs"/>
            </menucascade>
          </choice>
          <choice>
            <ph conref="shared.dita/virtual-appliance"/>
            <menucascade>
              <uicontrol conref="shared.dita/server"/>
              <uicontrol conref="shared.dita/logs"/>
            </menucascade>
          </choice>
        </choices>
      </step>
      <step>
        <cmd>
          <menucascade>
            <uicontrol conref="shared.dita/all"/>
            <uicontrol conref="shared.dita/editfile"/>
          </menucascade>
        </cmd>
        <info>
          <ul conref="shared.dita/drill-down">
            <li/>
          </ul>
          <note conref="shared.dita/randomnames"/>
        </info>
      </step>
    </steps>
  </taskbody>
</task>
```

Only the text in black needs to be translated. Translating this type of **DITA XML** content file therefore consists of translating only the section title and the entirety of the source *conref*. When translating a set of information units placed loosely in a file, however, the translator is sorely lacking in context. The creator of the original content must therefore provide constant assistance. The most effective method is to have the translator work on site. An additional advantage is that the translator is able to question not only the **technical editor**, but also the product designers.

:::note
Don't think that this is a constraint specifically induced by the advanced modularization of content. Having attended a translation school based on the simple but effective principle of the *meaning triangle* (the translator must understand the source text in order to reformulate it in the target text, not transcribe a series of words from one language to another) and having practiced technical translation for several years, I know that any successful translation project relies on effective collaboration between designers, copywriters and translators.
:::

It's also possible to factor structural elements, rather than content, such as table headings, in this way. In this way, you can present information of the same type in a homogeneous way at lower cost, i.e. without resorting to specialization.

### Protect confidential information

<a id="protect-confidential-information"></a>

:::tip

The powerful conref mechanism of **DITA XML** lends itself to applications other than cost reduction. For example, the **technical editor** can hide information in the source code.
:::

Here's an original use case for *conref*: imagine you need to translate a file containing confidential information that must not appear in the translated version, and to which the translator must not have access (a confidentiality clause forbids clients from distributing the information in their possession).

What to do? Filtering using the *ditaval* mechanism is designed to exclude information from deliverables, not to hide it in source files. Are you going to have to create two sets of source files, some containing confidential information, others not? Then goodbye *single-sourcing* and content reuse, which is why you chose **DITA XML**!

Hide confidential information from translators](/assets/confidentiel.svg)
**Hide confidential information from translators** (/assets/confidential.svg)

By placing the confidential content in a file that you call `confidential.dita`, for example, and placing *conref* with a filter key in the file to be translated, you've solved your problem: the translator will only translate the non-confidential text, and the deliverable generated in the target language will not contain the confidential text, noted as conditional and explicitly excluded by the *ditaval* file passed as an argument during compilation.

## Provide targeted information with ditaval conditional text

A ditaval file is like the glasses you wear to view a 3D film: the left lens masks one half of the image, the right lens masks the other half. But only the **technical editor** has 3D glasses and a complete view of the information contained in the **DITA XML** project.


The recipients of the information have glasses with two left or two right lenses. So they only see part of the information. Far from being disadvantaged by this, they have better access to the information. The profiling carried out hides from each audience the information they don't need, which for them would just be noise. Each audience therefore benefits from better access to the information that concerns it, in line with the famous minimalist concept of less is more.

![Conditional text with DITA XML](/assets/ditaval.svg)
**Conditional text with DITA XML**

In concrete terms, the ditaval mechanism is based on binary operators: you mark a block of information with an attribute and a value, then include or exclude this block in the deliverable by passing an operand at compile time (the block is included by default if no operand is specified). This is the principle of conditional text.

Thanks to this mechanism, there's no need to create two different files when their contents contain only minor variations. It's yet another tool designed to reduce redundancy in source content.

You can apply serial filter keys (condition and) by specifying several values separated by spaces in the product, audience or other attributes.

Example

To indicate that a remark is intended for both electricians and advanced users, by profiling the information according to the following audiences:

- non-electricians,
- beginner electricians,
- expert electricians.

You can use the following structure:

```xml
<step audience="electricians advanced">
  <cmd> Bring the intensity below the lethal dose of 150mA. </cmd>
</step>
```

:::caution[Warning]
An incorrectly positioned filter key can lead to a compilation error. Indeed, if the unfiltered code conforms to the XSD DITA XML schema, the filtered code may not.
:::

Example

The following code is correct before filtering:

```xml
<thead>
  <row product="a>
    <entry>Order</entry>
    <entry>Description</entry>
  </row>
</thead>
```

After filtering, on the other hand, we get the following code:

```xml
<thead>
</thead>
```

Now, according to the XSD schema, array headers must contain at least one line:

```xml
<!ENTITY % thead.content "((%row;)+)>
```

This code is therefore incorrect and causes the compilation to fail.

