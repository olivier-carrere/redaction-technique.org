---
title: "Using branches in source management systems."
description: "Create branches in a source manager to manage divergent projects and documentation translations."
proofreading: IA
---
Source management systems offer the option of creating branches for a project. If a project splits into two incompatible projects, a branch is created from the main project. This allows the **technical writer** to manage various translations of technical documentation.

In theory, the branch system can be used to manage:

- different translations of technical documentation
- different variations of the same technical documentation

In practice, however, it is preferable to manage variations of the same documentation using section sharing and conditional text filtering mechanisms provided by documentation tools.

On the other hand, the branch management system is more or less suited for managing translations, depending on the source control system used.

The main difference between Git and Subversion is the way they handle branches. Creating a branch in Subversion is equivalent to duplicating a directory. The files in these directories then evolve independently. In Git, however, branches can be created without duplicating data. Within the same local directory, you can use a command to switch between branches.

Creating a translation of documentation involves forking or branching from the initial document. When using Git, the options are:

- Copy the source language directory
- Create a branch from the source language directory

In theory, branching allows for cherry-picking and makes it easier to apply changes affecting only the project's XML code to all target languages.

For example, a change from:

```xml
<image href="filter.png" placement="break"/>
```

to

```xml
<image href="filter.png" placement="break" scalefit="yes"/>
```

in the English version of the documentation can easily be applied to the Chinese, French, German, or other versions if it has been committed separately. In practice, this operation can be complex and is only useful if managing a large number of different language versions. Nevertheless, the branch solution allows such operations, while the directory solution does not. However, it is more challenging for the **technical editing** team to understand and use.

**See also**
- [Git: from file to content](../git-from-file-to-content)
