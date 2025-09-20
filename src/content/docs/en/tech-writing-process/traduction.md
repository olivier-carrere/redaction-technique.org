---
title: "Translation"
description: "Translation constraints must be taken into account upstream of the editorial process."
---

Translation constraints must be taken into account upstream of the editorial process. They have implications for both editorial style and repository organization.

There is no magic formula: delivering information in several languages requires constant monitoring. But taking into account constraints upstream and using an appropriate methodology can improve quality and reduce costs and delivery times for multilingual versions. Translation must be integrated into the document workflow. It is also important to ensure that the various players involved - technical writers, engineers, experts and designers - communicate with the translators.

If the documentation is based on a set of modules, translation can be carried out in parallel with writing, thus reducing delivery times.

![Parallel editing and translation](/assets/parallel-translation.svg)
**Parallelization of copywriting and translation**

With regard to the source file repository, is it better to place the language directories upstream or downstream of the document project directories? In other words, is it better to adopt the following structure :

- english
  - product 1
  - product 2
- french
  - product 1
  - product 2

or the following :

- product 1
  - english
  - french
- product 2
  - english
  - english

In most cases, it's best to place the distinction between languages as far upstream as possible. To use software development terminology, creating a translation of a set of information is equivalent to creating a branch of that set. As it is easier to manipulate a branch by its root than by its branches, in practice it is much easier to manipulate complete directories, if only to provide them to translators, than a set of sub-directories.

Once the translation has been completed, changes made to either the source or translated version cannot be automatically applied to the other. To continue in the terminology of the software world, the new branch is a fork: changes made to one cannot be automatically applied to the other. To provide the same information in different languages, it is therefore crucial to effectively track updates to the original version.
