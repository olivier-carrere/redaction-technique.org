---
title: "Using branches in source management systems."
description: "Create branches in a source manager to manage divergent projects and documentation translations."
---

Source management systems offer the option of creating branches of a project: if at any point a project splits into two incompatible projects, a branch is created from the main project. The **technical editor** can thus manage the various translations of technical documentation.

In theory, the branch system can be used to manage:

- different translations of technical documentation,
- different variations of the same technical documentation.

In practice, however, it is better to manage variations of the same documentation using the section sharing and conditional text filtering mechanisms of documentation tools.

On the other hand, the branch management system is more or less suited to managing translations, depending on the source manager used.

The main difference between the Git and Subversion source management systems is the way they handle branches. Creating a branch in Subversion is equivalent to duplicating a directory. The files in the two directories then evolve separately. In Git, on the other hand, branch creation is carried out without duplicating data. On the same local directory, a command can be used to change branches.

Creating a translation of a documentation consists in forking, or branching, the initial document. When using Git, the choice is between:

- copy the source language directory,
- create a branch on the source language directory.

In theory, the branch solution allows you to perform cherry-picking and easily apply changes affecting only the project's XML code to all target languages.

For example, a change to

```xml
<image href="filter.png" placement="break"/>
```

at

``` xml
<image href="filter.png" placement="break" scalefit="yes"/>
```

of the English version of the documentation can easily be applied to the Chinese, French, German or other versions if it has been the subject of a separate commit. In practice, however, this operation can be tricky, and only really useful if you need to manage a large number of different language versions. In any case, the branch solution allows such operations, while the directory solution does not. It is, however, more difficult for the **technical editing** team to grasp and use.

**See also**
- [Git: from file to content](../git-from-file-to-content)
