---
title: "Validation and quality control"
description: "The content must be validated before delivery."
---

:::note

Technical writing material must undergo rigorous quality control before being sent to its various targets.
:::

Content must be validated before delivery. This may seem obvious, but it requires that the people in charge of validation be involved from the outset. Ideally, the validation phase takes place in parallel with the creation phase: the earlier modifications are made, the less costly they are. An enterprise content management tool such as Alfresco may seem an interesting way of setting up workflows, on paper at least. In reality, however, such a solution can be cumbersome. It is also incompatible with certain source formats based on modular, non-monolithic documents, and with version management software (the Componize project, however, proposes to manage DITA XML projects under Alfresco). However, it remains imperative to set up validation stages throughout the project. Combined with a version management system, comparison tools are very useful for validating updates. For example, a "tagged" version of a DITA XML project and the current version can be exported in RTF format, then compared in a word processor. This is far less tedious than a comparative re-reading. Comparing information modules directly in the version management system is not enough, as they are only the "building blocks" of the final document.

## Creation and validation workflow

A process for creating and updating technical documentation that relies on the memory of human actors is unreliable. A **technical editor** may be tired, unwell, on vacation, forget data when saturated with information, or have left the company. Information between two people can also flow badly, or be misunderstood. Man has created tools to compensate for these weaknesses. On the other hand, they are creative, unlike machines.

Given this state of affairs, we need an information management system for the evolution of documentation that is tolerant of human error. This means either :

- implement *workflows* under a <abbr title="Content Management System">CMS</abbr>,
- use the ticket management system used to manage new features of the documented product (e.g. Trac):
  - creation of a ticket by a developer,
  - implementation of the ticket by a **technical editor**,
  - ticket closure by the ticket creator,
  - publication of documentation when all critical tickets have been closed.

The main functions of a <abbr title="Content Management System">CMS</abbr> are as follows:

- metadata management,
- workflows,
- traceability,

Whatever the tracking system, it must offer full visibility and traceability of changes made to technical documentation (what, who, when).

This system must be unique and exhaustive: it must centralize all requests for changes to technical documentation.

If the document is available in several languages, each ticket must be duplicated for each language or, in the case of a <abbr title="Content Management System">CMS</abbr>, each language must correspond to a separate *workflow*.
