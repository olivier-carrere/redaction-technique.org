---
title: "Version management systems - rustic but reliable"
description: "Managing text documentation with a version control system (Git, Subversion, SourceSafe) like code."
---

Working with source files in text format, rather than binary, is an opportunity for the **technical writer** to manage his content as developers manage their code: under a source management system such as Git, Subversion or SourceSafe.

These :

- encourage group work,
- eliminate duplicate copies of files and
- reduce the risk of data loss to almost zero.

On text files, not binary ones, a version control system offers superior functionality:

- no risk of data loss in the event of network failure,
- advanced off-line working capabilities,
- files are not locked by the team members who opened them.
- very fine-grained restoration capabilities, both in terms of time (since the file was last deposited on the repository) and in terms of workload.

![The versioning system retains the history of modifications](/assets/versioning-system.svg)
**The versioning system keeps a history of changes.

Graphical user interfaces allow these tools, originally designed for command-line use, to be used directly under file managers. However, the paradigm on which they are based is sometimes difficult to grasp for less technophile audiences.

Source management systems use the following concepts:

| Element | Description |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Trunk | Main repository holding all versions of files placed over time by the **technical editor** (or more frequently, the developer). |
| Secondary repository created from the main version of the source code.
| Tag | A snapshot of the trunk or branch at a given time. Allows you to easily freeze a version, e.g. the published version, and create an archive. |

If you take the trouble, it's also possible to misuse version management systems and lose data. In practice, however, with the same level of effort and skill, the risk of losing data is much lower if the **technical editor** manipulates text files under a version manager rather than binary files on a shared directory.

Source code management systems have a proven track record of reliability, managing millions of lines of code. Like file systems (Ext4, Btrfs, etc.), they evolve slowly, following a conservative policy, and are only offered in production once they have been exhaustively debugged. If the biggest IT development projects, such as GNU/Linux, trust them, why not also entrust them with **technical documentation**?

One drawback, however: these tools are not specifically designed for the XML format and perform line-by-line comparisons between files, rather than node-by-node comparisons, which unnecessarily multiplies conflicts between commits or branches.

**See also
- Git: from file to content](../git-from-file-to-content)
